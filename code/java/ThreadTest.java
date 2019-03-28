import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

class ThreadTest {
    /**
     * 只有使用AtomicInteger类型才能保证基本类型的变量和包装类的程序锁能锁住
     * 原因是Integer和String类型等包装类每次赋值实际是换了一个新对象，所以无法锁住
     * atomicInteger是非阻塞线程安全的Integer包装类
     *  */
    AtomicInteger num = new AtomicInteger(100);


    // 模拟一个需要同步调用的对象
    class MyData {
        int num = 10;
        // 使用lock来代替synchronized，使代码更加灵活和便捷，且性能更高 ！！
        ReentrantLock lock = new ReentrantLock();
        // 用于方法上的synchronized，若调用此函数，则MyData实例则会被锁死
        synchronized void add() {
            num ++;
        }
        void reduce() {
            num --;
        }
        // 使用ReentrantLock来代替synchronized锁
        void initNum() {
            lock.lock();
            num = 10;
            lock.unlock();
        }
    }

    void testMyData() {
        MyData myData = new MyData();
        new Thread(() -> {
            int i = 0;
            while (i < 10) {
                // 用于对象上的synchronized，每次执行该语句时MyData实例会被锁死
                synchronized(myData) {
                    myData.reduce();
                }
                i --;
                // 让出执行权给其他线程执行
                Thread.yield();
            }
        }).start();
        new Thread(() -> {
            int i = 0;
            while (i < 10) {
                // 这里的add()已在方法上定义了synchronized锁
                myData.add();
                i --;
                Thread.yield();
            }
        }).start();;

    }

    void run() {
        testMyData();
    }
}
