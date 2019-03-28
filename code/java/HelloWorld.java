import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import annotation.Band;
import annotation.ResloveBand;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        System.out.println("path: " + System.getProperty("java.class.path"));
        System.out.println("Hello Happy World !!");
        System.out.println(Arrays.toString(args));
        // genericTest();
        // extendsTest();
        // threadTest();
        // classTest();
        // annotationTest();
        // testJs();
        // jvmTest();
        LambdaUtils.testLambda();
    }
    static void jvmTest() {
        JVMTest jvmTest = new JVMTest();
        jvmTest.run();
    }
    static void classTest() {
        ClassTest classTest = new ClassTest();
        classTest.runProxy();
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
    static void annotationTest() {
        Band band = new Band();
        ResloveBand.reslove(band);
    }
    static void testJs() {
        try {
            JavaScriptInJava.run("helloWorld.js");
            System.out.println(JavaScriptInJava.eval("Math.round(3 * 2 + 7);"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
