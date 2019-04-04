package name.feinimouse.study;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

class ThreadTest {
    /**
     * 只有使用AtomicInteger类型才能保证基本类型的变量和包装类的程序锁能锁住
     * 原因是Integer和String类型等包装类每次赋值实际是换了一个新对象，所以无法锁住 atomicInteger是非阻塞线程安全的Integer包装类
     */
    AtomicInteger num = new AtomicInteger(100);

    // 模拟一个需要同步调用的对象
    class MyData {
        int num;
        // 使用lock来代替synchronized，使代码更加灵活和便捷，且性能更高 ！！
        ReentrantLock lock = new ReentrantLock();

        boolean flag = true;

        // 用于方法上的synchronized，若调用此函数，则MyData实例则会被锁死
        synchronized void add() {
            try {
                if (!flag) {
                    wait();
                }
                num++;
                setFlag(false);
                System.out.println("add to: " + num + " flag is " + flag);
                Thread.sleep(500);
                notify();
            } catch (InterruptedException e) {
                    e.printStackTrace();
            }
        }

        void reduce() {
            num--;
        }

        // 使用ReentrantLock来代替synchronized锁
        void initNum() {
            lock.lock();
            num = 10;
            System.out.println("init to: " + num + " flag is " + flag);
            lock.unlock();
        }

        public boolean isFlag() {
            return flag;
        }

        public void setFlag(boolean flag) {
            this.flag = flag;
        }
        int getNum() {
            return num;
        }
    }

    void testMyData() {
        MyData myData = new MyData();
        AtomicBoolean stop = new AtomicBoolean(false);
        Thread t1 = new Thread(() -> {
            while (!stop.get()) {
                try {
                    // 用于对象上的synchronized，每次执行该语句时MyData实例会被锁死
                    synchronized (myData) {
                        if (myData.isFlag()) {
                            // 使用flag和wait以及notify来保证字符打印的交替进行
                            myData.wait();
                        }
                        myData.reduce();
                        myData.setFlag(true);
                        System.out.println("reduce to: " + myData.getNum() + " flag is " + myData.isFlag());
                        // 防止打印速度过快
                        Thread.sleep(500);
                        myData.notify();
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        t1.start();
        Thread t2 = new Thread(() -> {
            while (!stop.get()) {
                // 这里的add()已在方法上定义了synchronized锁
                myData.add();
            }
        });
        t2.start();
        myData.initNum();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        stop.set(true);
    }

    /**
     * 使用callable创建线程
     */
    void testCallable() {
        // 创建1个线程
        ExecutorService service = Executors.newFixedThreadPool(1);
        // 执行线程并返回线程执行结果
        Future<String> future = service.submit(() -> {
            Character[] res = new Character[10];
            for (int i = 0; i < 10; i++) {
                res[i] = (char)(50 + i);
                // 该接口的方法会自动抛出异常
                // 外部能够捕获线程抛出的异常
                Thread.sleep(100);
            }
            // 该接口能够返回值
            return LambdaUtils.join(res, " , ");
        });
        // 获得线程的返回值
        try {
            // 这里要睡眠一段时间，让子线程先运行完才能获得结果
            Thread.sleep(2000);
            String res = future.get();
            System.out.println(res);
        } catch(Exception e) {
            e.printStackTrace();
        }
        // 停止线程
        service.shutdownNow();
    }

    void run() {
        testMyData();
        testCallable();
    }
}


