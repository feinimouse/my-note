import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

class ThreadTest {
    /**
     * 只有使用AtomicInteger类型才能保证程序锁能锁住，Integer类型每次赋值实际是换了一个新对象，所以无法锁住 
     * atomicInteger是非阻塞线程安全的Integer包装类
     *  */ 
    AtomicInteger num = new AtomicInteger(100);
    boolean numAdded = false;
    int time = 0;
    int max = 10;

    class SyncData {
        int myNum;
        boolean isAdded = false;
        int myTime = 0;
        int myMax = 10;
        // 使用lock来代替synchronized，使代码更加灵活和便捷，且性能更高 ！！
        ReentrantLock lock = new ReentrantLock();

        SyncData(int myNum) {
            this.myNum = myNum;
        }
        synchronized boolean shouldStop() {
            return myTime > myMax;
        }
        void timeGoOn() {
            // synchronized 此处没有使用synchronized也方便地完成了加锁操作
            lock.lock();
            myTime ++;
            lock.unlock();
        }
        // 若要对基本数据类型使用线程锁，则应该使用线程锁方法
        synchronized void add() throws InterruptedException {
            if (isAdded) {
                wait();
            }
            this.myNum++;
            isAdded = true;
            notify();
            System.out.println("add myNum: " + this.myNum);
        }

        synchronized void reduce() throws InterruptedException {
            if (!isAdded) {
                wait();
            }
            this.myNum--;
            isAdded = false;
            notify();
            System.out.println("reduce myNum: " + this.myNum);
        }
    }

    class Th1 implements Runnable {
        private SyncData data;

        Th1(SyncData data) {
            this.data = data;
        }

        @Override
        public void run() {
            // 为变量num添加线程锁，注意添加线程锁的必须是一个应用对象，不能使基本数据类型
            while (!data.shouldStop()) {
                try {
                    data.add();
                    data.timeGoOn();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    class Th2 implements Runnable {
        private SyncData data;

        Th2(SyncData data) {
            this.data = data;
        }

        @Override
        public void run() {
            while (!data.shouldStop()) {
                try {
                    data.reduce();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    class Th3 implements Runnable {
        @Override
        public void run() {
            while (time < max) {
                synchronized (num) {
                    if (numAdded) {
                        try {
                            num.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    num.incrementAndGet();
                    num.notify();
                    System.out.println("add num: " + num.get());
                    time++;
                }
            }
        }
    }

    class Th4 implements Runnable {
        @Override
        public void run() {
            while (time < max) {
                synchronized (num) {
                    if (!numAdded) {
                        try {
                            num.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    num.decrementAndGet();
                    num.notify();
                    System.out.println("reduce num: " + num.get());
                    time++;
                }
            }
        }
    }
    void run() {
        SyncData data = new SyncData(50);
        Th1 th1 = new Th1(data);
        Th2 th2 = new Th2(data);
        Th3 th3 = new Th3();
        Th4 th4 = new Th4();
        new Thread(th1, "A").start();
        new Thread(th2, "B").start();
        new Thread(th3, "C").start();
        new Thread(th4, "D").start();
    }
}