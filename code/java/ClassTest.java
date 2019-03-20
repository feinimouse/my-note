import java.lang.reflect.Method;
class ClassTest {
    class Happy {
        String happy;

        Happy(String h) {
            happy = h;
        }
        Happy() {
            happy = "hello happy world";
        }
        String getHappy(String say) {
            return say + happy;
        }

        @Override
        public String toString() {
            return getHappy("my");
        }
    }

    void run() {
        try {
            // 获取一个Class对象
            Class<?> c = Class.forName("Happy");

            // 通过Class类创建一个Happy对象
            Object o = c.newInstance();
            System.out.println(o.toString());

            // 生成一个参数类型数组，代表着方法的形参类型，String.class也是一种获取Class对象的方法
            Class[] parms = new Class[]{String.class};

            // 通过Class对象获取Happy中的方法getHappy
            Method happyMethod = c.getMethod("getHappy", parms);

            // 通过创建出的Happy实例执行获取到的方法
            String result = (String)happyMethod.invoke(o, "oh God");
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}