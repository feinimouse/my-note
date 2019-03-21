class GenericTest {
    /**
     * 泛型类的使用
    */
    class MyData <Type> {
        private Type obj;
        public void setObj(Type obj) {
            this.obj = obj;
        }
        public Type getObj() {
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
    <Type> String getType(Type obj) { 
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
    class MySupperData1 <Type extends Number> extends MyData<Type> {}
    void func4() {
        MySupperData1<Integer> data = new MySupperData1<Integer>();
        // data.setObj("aaa"); // 报错
        data.setObj(1); 
        System.out.println(data.getObj().toString());
    }

    void run() {
        func1();
        func2();
        func3();
        func4();
    }
}