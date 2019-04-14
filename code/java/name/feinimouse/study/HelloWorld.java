package name.feinimouse.study;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import name.feinimouse.study.annotation.Band;
import name.feinimouse.study.annotation.ResloveBand;

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
        // LambdaUtils.testLambda();
    }
    static void jvmTest() {
        var jvmTest = new JVMTest();
        jvmTest.run();
    }
    static void classTest() {
        var classTest = new ClassTest();
        classTest.runProxy();
    }
    static void genericTest() {
        var genericTest = new GenericTest();
        genericTest.run();
    }
    static void extendsTest() {
        /**
         * 静态方法new非静态内部类时必须先new外部类
         */
        var extendsTest = new ExtendsTest();
        var b = extendsTest.new B();
        b.printA();
    }
    static void threadTest() {
        System.out.println("\n here is Thread test \n");
        var threadTest = new ThreadTest();
        threadTest.run();
    }
    static void annotationTest() {
        var band = new Band();
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
