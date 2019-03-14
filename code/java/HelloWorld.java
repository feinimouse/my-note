import java.util.Arrays;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello Happy World !!");
        System.out.println(Arrays.toString(args));
        genericTest(); 
    }
    static void genericTest() {
        GenericTest genericTest = new GenericTest();
        genericTest.func1();
        genericTest.func2();
        genericTest.func3();
        genericTest.func4();
    } 
}