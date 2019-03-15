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
}