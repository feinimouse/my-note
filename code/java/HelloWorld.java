import java.util.Arrays;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello Happy World !!");
        System.out.println(Arrays.toString(args));
        genericTest(); 
        extendsTest();
        // threadTest();
        classTest();
    }
    static void genericTest() {
        GenericTest genericTest = new GenericTest();
        genericTest.run();
    } 
    static void extendsTest() {
        /**
         * 静态方法new非静态内部类时必须先new外部类
         */
        ExtendsTest extendsTest = new ExtendsTest();
        ExtendsTest.B b = extendsTest.new B();
        b.printA();
    }
    static void threadTest() {
        System.out.println("\n here is Thread test \n");
        ThreadTest threadTest = new ThreadTest();
        threadTest.run();
    }
    static void classTest() {
        ClassTest classTest = new ClassTest();
        classTest.run();
    }
}