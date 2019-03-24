import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

class GenericTest {
    /**
     * 泛型类的使用
    */
    class MyData <T> {
        private T obj;
        public void setObj(T obj) {
            this.obj = obj;
        }
        public T getObj() {
            return this.obj;
        }
    }
    void func1() {
        MyData<Integer> data = new MyData<Integer>();
        data.setObj(1);
        int result = (Integer)data.getObj();
        System.out.println(result);
    }

    /**
     * 泛型方法的使用
    */
    <T> String getType(T obj) { 
        return obj.getClass().getName(); 
    }
    void func2() {
        Integer a = 1;
        String type = getType(a);
        System.out.println(type);
    }
    /**
     * 泛型通配符的使用
     * 当需要调用的对象为不确定对象时使用通配符？
    */
    String show(MyData<?> o) {
        return getType(o);
    }
    void func3() {
        MyData<Integer> data = new MyData<Integer>();
        data.setObj(1);
        String type = show(data);
        System.out.println(type);
    }
    /**
     * 有限制的泛型：
     * extends：只有该类或继承该类的子类，或实现该接口的类才能满要求（这里的extends即表示继承也表示implements）
     * 使用<T extends SomeClass & interface1 & interface2 & interface3>表示多实现
     * supper：只有该类或该类的父类或更上层才能满足要求
    */
    // class MyChildData2<type supper Double> extends MyData<TYpe> {}
    class MySupperData1 <T extends Number> extends MyData<T> {}
    void func4() {
        MySupperData1<Integer> data = new MySupperData1<Integer>();
        // data.setObj("aaa"); // 报错
        data.setObj(1); 
        System.out.println(data.getObj().toString());
    }

    /**
     * 使用反射操纵泛型
     */
    class Func {
        void hi(Map<Integer, MySupperData1<Integer>> map, List<String> list) {}
    }
    static void checkGeneric(Type[] ts) {
        for (Type t : ts) {
            if (t instanceof ParameterizedType) {
                System.out.println("外层泛型类：" + t);
                Type[] realTs = ((ParameterizedType)t).getActualTypeArguments();
                checkGeneric(realTs);
            } else {
                System.out.println("最终的泛型：" + t);
            }
        }
    }
    void func5() {
        try {
            Class<?> c = Func.class;
            Method m = c.getDeclaredMethod("hi", Map.class, List.class);
            Type[] ts = m.getGenericParameterTypes();
            checkGeneric(ts); 
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    void run() {
        func1();
        func2();
        func3();
        func4();
        func5();
    }
}