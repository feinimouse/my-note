import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
class ClassTest {
    class Happy {
        String happy = "hello happy world";
        private String lucky = "smile";
        Happy() {
            happy = "hello happy world";
        }
        String getHappy(String say) {
            return say + " " + happy;
        }
        @Override
        public String toString() {
            return getHappy("my " + lucky);
        }
    }
    /**
     * Class类
     */
    void runReflect() {
        try {
            // 获取一个Class对象，注意：内部类使用$标记
            Class<?> c = Class.forName("ClassTest$Happy");

            // 通过Class类获取Happy的构造函数
            // 注意，这是一个内部类，因此构造函数必然会带有一个父类的形参
            Constructor<?> con = c.getDeclaredConstructor(this.getClass());

            // 通过构造函数创建实例，返回是一个Object类型，需要自行转换
            Object o = con.newInstance((Object)this);
            // 对于非内部类可以通过newInstance方法直接调用无参构造函数
            // Object o = c.newInstance();
            System.out.println(o.toString());

            // 访问并获取实例的私有属性
            Field f = c.getDeclaredField("lucky");
            // 该方法表示不做安全检查，直接控制私有属性
            f.setAccessible(true);
            // 改变私有属性
            f.set(o, "yeah");

            // Declared表示获取当前类中存在的所有public和私有方法，但不包括父类
            // 没加declared表示获取当前类及其父类的所有public不包括私有方法
            Method m = c.getDeclaredMethod("getHappy", String.class);

            // 通过创建出的Happy实例执行获取到的方法
            // invoke方法接收一个方法所属类的实例，以及要调用方法的形参，返回是一个Object类型
            // 注意在invoke中传入函数参数时一定要强制转换为Object类型，尤其是数组类型的参数
            // 如func(String[] args)如果使用invoke(o, new String[] {"aa", "bb"})会被解析为func("aa", "bb")从而报错
            String result = (String)m.invoke(o, (Object)"oh God");
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 动态代理
     * 1. 动态代理的对象是一个实例
     * 2. 该实例必须是某个接口的实现类，因为动态代理实例是基于实例实现的接口所创建的
     */
    interface Band {
        String getName();
    }
    class ProxyBand implements InvocationHandler {
        // 被代理的实例
        private Band band;
        ProxyBand(Band band) {
            this.band = band;
        }
        @Override
        /**
         * proxy：动态代理实例，注意此时调用proxy的方法会触发递归操作
         * method：代理对象调用的方法
         * args：输入的参数
         */
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println("do something before method: " + method.getName());
            // do proxy
            Object result = method.invoke(band, args);
            System.out.println("do something after method: " + method.getName());
            return result;
        }
    }
    void runProxy() {
        // 要被被动态代理的实例对象
        Band hhw = () -> "Hello Happy World";

        // 注意：这里不能使用Band.class，因为Band.class获取是原来的接口，而我们要代理却是这个接口的实现类
        Class<?> hClass = hhw.getClass();

        // 先由被代理的类生成一个调用处理器
        InvocationHandler proxyHandler = new ProxyBand(hhw);

        // 通过调用处理器生成一个动态代理实例（其实这是一个实现被代理接口的新对象）
        // 注意：第二个参数数组不能为空，可采用new Class[] { interface.class } 形式
        Band proxyHHW = (Band)Proxy.newProxyInstance(hClass.getClassLoader(), hClass.getInterfaces(),proxyHandler);

        System.out.println(proxyHHW.getName());
    }
}
