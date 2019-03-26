import java.util.Random;

class JVMTest {
    JVMTest() {
        System.out.println("-------JVM start-------");
    }
    void run() {
        System.out.println("--------do run------");
        System.out.println(JVMA.c);
        System.out.println(JVMA.d);
        System.out.println(JVMA.f);
        System.out.println(JVMA.e);
        System.out.println(JVMA.o);
        System.out.println(JVMA.a);
        System.out.println(JVMA.b);
        System.out.println("--------do run finished--------");
    }
}

class JVMA {
    static {
        System.out.println("A is init");
        b = JVMB.getRandom("b");
    }
    static final int a = JVMB.getRandom("a");
    static int b;
    static final String c = "1214";
    static final Integer d = 99;
    static final int e = JVMC.getNum();
    static final int f = JVMC.a;
    static final JVMC o = new JVMC();
}

class JVMB {
    static {
        System.out.println("B is init");
    }
    static final Random r = new Random();
    static int getRandom(String name) {
        System.out.println("get random " + name);
        return r.nextInt();
    }
}

class JVMC {
    static final Integer a = 713;
    static {
        System.out.println("C is init");
    }
    static int getNum() {
        return a + 44;
    }
    @Override
    public String toString() {
        return "This is C";
    }
}
