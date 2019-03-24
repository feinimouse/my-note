import java.util.Arrays;

class ExtendsTest {
    class A {
        A() {
            printA();
            printB();
        }
        public void printA() {
            System.out.println("aaa");
        }
        private void printB() { System.out.println("there is no B");}
    }
    class B extends A {
        /**
         * 此时b的赋值发生在A的构造函数调用之后因此，打印出b的值为0
         * 运行new B() -> 调用A()进行初始化(此时B还未初始化，b = 0) -> 运行B.printA() -> 给b赋值，初始化B
         */
        int b = 2;
        B() {
            printB();
        }
        @Override
        public void printA() {
            System.out.println(b);
        }
        private void printB() {System.out.println("I have B");}
    }

    abstract class Band {
        String Leader;
        abstract String getProducer();
    }
    class HHW extends Band implements Voicalable {
        HHW() {
            this.Leader = "kokoro";
        }
        @Override
        String getProducer() {
            return this.Leader;
        }
        @Override
        public String getVocal() {
            return this.Leader;
        }
    }
    interface Voicalable {
        /**
         * interface的成员变量默认为 final static
         */
        boolean hasVocal = true;
        String getVocal();
    }
    /**
     * 接口的默认方法
     */
    interface LiveHouse {
        default void getLocation() {
            System.out.println("花咲川女子中学");
        }
    }
    interface BreadShop {
        default void getLocation() {
            System.out.println("羽丘女子中学");
        }
    }
    /**
     * 当默认接口重复时必须进行重写，
     * 当基类和接口中的默认方法具有相同方法签名的函数时，
     * 子类优先继承基类中的函数实现，而不是父接口中的默认方法
     */
    class ShopStreet implements LiveHouse, BreadShop {
        @Override
        /**
         * 指定使用某父类的默认接口
         */
        public void getLocation() {
            LiveHouse.super.getLocation();
        }
    }
    /**
     * 箭头函数lambda表达式的使用
     * 只能用于接口函数，即只有一个抽象函数的接口
     */
    interface TheOperate <T> {
        void run(T[] list);
    }
    <T> void opreateList(T[] list, TheOperate<T> operate) {
        operate.run(list);
    }
    void testLambda() {
        Integer[] theList = new Integer[] {1, 2, 3, 4, 5};
        System.out.println(Arrays.toString(theList));
        opreateList(theList, list -> {
            for (int i = 0; i < list.length; i++) {
                list[i] = list[i] + 1;
            }
        });
        System.out.println(Arrays.toString(theList));
    }
}
