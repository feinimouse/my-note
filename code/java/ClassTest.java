import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
class ClassTest {
    class Happy {
        String happy = "hello happy world";
        Happy() {
            happy = "hello happy world";
        }
        String getHappy(String say) {
            return say + " " + happy;
        }
        @Override
        public String toString() {
            return getHappy("my");
        }
    }
    /**
     * Class
     */
    void runReflect() {
        try {
            // 获取一个Class对象，注意：内部类使用$标记
            Class<?> c = Class.forName("ClassTest$Happy");

            // 通过Class类获取Happy的构造函数
            // 注意，这是一个内部类，因此构造函数必然会带有一个父类的形参
            Constructor<?> con = c.getDeclaredConstructor(new Class[]{this.getClass()});

            // 通过构造函数创建实例，返回是一个Object类型，需要自行转换
            Object o = con.newInstance(this);
            // 对于非内部类可以通过newInstance方法直接调用无参构造函数
            // Object o = c.newInstance();
            System.out.println(o.toString());

            // Declared表示获取当前类中存在的所有public和私有方法，但不包括父类
            // 没加declared表示获取当前类及其父类的所有public不包括私有方法
            Method m = c.getDeclaredMethod("getHappy", new Class[]{String.class});

            // 通过创建出的Happy实例执行获取到的方法
            // invoke方法接收一个方法所属类的实例，以及要调用方法的形参，返回是一个Object类型
            String result = (String)m.invoke(o, "oh God");
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 动态代理
     */
    class ProxyHappy implements InvocationHandler {
        private Happy happy;
        ProxyHappy(Happy happy) {
            this.happy = happy;
        }
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println("do something before method:" + method.getName());
            // do proxy
            method.invoke(happy, args);
            System.out.println("do something after method:" + method.getName());
            return null;
        }
    }
    /**
     * TODO 动态代理，该方法目前存在问题
     */
    void runProxy() {
        // 被动态代理的类实例和类对象
        Happy happy = new Happy();
        Class<?> hClass = happy.getClass();

        // 先由被代理的类生成一个调用处理器
        InvocationHandler happyHandler = new ProxyHappy(happy);

        // 通过调用处理器生成一个代理类（其实这是一个被代理类的子类）
        Happy pHappy = (Happy)Proxy.newProxyInstance(hClass.getClassLoader(), hClass.getInterfaces(),happyHandler);

        System.out.println(pHappy.toString());
    }
    void run() {
        runReflect();
        // runProxy();
    }
}