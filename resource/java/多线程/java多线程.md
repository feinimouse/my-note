---
title: java多线程
author: 菲尼莫斯
date: 2019-03-16
tags:
- 多线程
categories:
- java
---

# java多线程

by 菲尼莫斯 2019年3月16日

---

## 线程和进程

* 进程有独立的代码和数据空间，代表着**多个程序多个任务流**，进程间切换开销大，**是资源分配的单位**

* 线程是轻量的进程，共享代码和数据空间，但有独立的运行栈和计数器，代表着**一个程序多个任务流**，线程切换开销更小，**是调度和执行的单位**

## 一些概念

* 线程安全：多个线程访问同一个对象时，如果不用考虑这些线程在运行时环境下的调度和交替执行，也不需要进行额外的同步，或者在调用方进行任何其他操作，调用这个对象的行为都可以获得正确的结果，那么这个对象就是线程安全的。

* 同步：多线程并发访问共享数据时，保证共享数据再同一时刻只被一个或一些线程使用。
    * 阻塞同步：在某线程对共享数据进行操作时，其他线程暂停等待
    * 非阻塞同步：在并发环境下，某个线程对共享变量先进行操作，如果没有其他线程争用共享数据那操作就成功；如果存在数据的争用冲突，那就才去补偿措施，比如不断的重试机制，直到成功为止，这种乐观的并发策略不需要把线程挂起。

* 注意对于基本数据以及Boolean和Integer等包装类进行赋值是非线程安全的，若要保证多线程操作的原子性需要使用Atomic对象

* 守护线程（在Thread.start()前使用Thread.setDaemon(true)设置）：该线程不妨碍程序终止，只要前台还有一个线程进行，后台线程就不会结束，若前台已无线程，那所有的后台线程都会终止。

* 线程的优先级数为1~10
    * 高优先级的线程**优先调度**
    * 同优先级之间**随机调度**
    * 默认优先级为5
    * 线程创建的线程和母线程有同样的优先级，后台线程创建的线程也是后台线程。
    * **高优先级的线程进入就绪状态后，低优先级线程从CPU时间片进入就绪状态后，便难以再被CPU调度，直到高优先级的线程运行完毕**
    * **使用yield()可以让出当前的资源给其他线程执行，但仅限于同优先级的，因为高优先级的总是被优先调度**
    * 优先级不代表绝对的先后顺序

## 基础

* 实现方式：使用Thread类模拟新的CPU，运行独立的代码，能够管理独立的数据

* 线程体即为Thread的run()方法，并由start()方法所启动

* 注意：调用start()只是将线程置为就绪状态，线程不会立即运行，而是等待CPU去调度

* 一般来说，就绪状态的同优先级的子线程会**被CPU随机调度并运行**

* **如果在给定的时间片内线程没有执行完，则会回到就绪状态，CPU会调度其他线程运行**

* 线程休眠会让出全部CPU，其他线程便能够立即得到调度并运行

* 实现Runnable接口的类，该类的同一个实例所创建的不同线程会**共享这个对象的实例属性**

### 线程的互斥

即对于共享数据，同一时刻只能用一个线程访问；监视区则是同一时刻只能被一个线程执行的方法

1. 使用synchronized(共享数据 [data]) {// 进行互斥处理的操作 [deal]} 来创建一个线程锁

2. 首先运行的A线程会获得data的线程锁，并运行deal代码

3. data的线程锁只有一个，因此其他线程B必须等获得锁的A线程将锁释放才能运行deal操作

4. 此时B会被放到data的**lock线程池**中

5. 当获得线程锁的A线程将deal运行完毕后，便会释放data的线程锁

6. 此时data的**lock线程池**中的B若获得data的线程锁将重新回到**就绪状态**

7. 经CPU调度重新B运行deal

注意：

* 也可以为**data对象的某个方法**加上synchronized关键字，从而保证该方法执行时对该对象触发线程锁

* **线程休眠时不会释放线程锁**

* 一条线程可以获得多个锁，锁中也能获得锁

### 线程的协作：

多个线程有条件的同时操作共享数据，允许其他线程在满足条件的情况下进入监视区

1. 方法deal被synchronized关键字修饰了

2. A线程要调用deal方法，A首先获得了deal的线程锁，紧接着A就运行deal方法

3. 线程B此时也要调用deal方法，但线程锁已被A拿走，B进入deal的**lock线程**池进行等待

4. A在deal中调用wait()方法后，A线程进入deal的**wait线程池**，此时A释放了deal的线程锁

5. deal的**lock线程池**中的B线程获得deal的线程锁，B进入了**就绪状态**

6. B经过CPU调度，并运行deal操作

7. 满足一定条件后B在deal中调用notify()操作使得（其实是随机唤醒一个等待线程）A线程被唤醒，并由deal的**wait线程池**进入deal的**lock线程池**

8. B线程deal继续运行，直到释放deal的线程锁。之后**lock线程池**中的A重新获得了线程锁，进入就绪状态。

9.  A经过CPU调度，能够继续运行wait()后的操作，由于不是立即开始运行，此时deal中还需判断环境是否适合继续运行。

注意：

* 在编程中，尽量在使用了notify/notifyAll() 后立即退出临界区，以唤醒其他线程

* notifyAll() 可以唤醒所有deal的**wait线程池**的线程进入deal的**lock线程池**

* **在使用wait和notify时必须先使用synchronized或其他方式获得该对象的线程锁**

* 当线程运行wait()方法并进入等待阻塞状态时，可由外部调用thread.interrupt()触发wait()方法抛出异常，处理异常后，**线程将继续运行try-catch块后的代码**。

### 线程的中断

每个线程中都拥有一个 interrupt 标志位，用于判断该线程是否被中断

调用`thread.interrupt()`会触发线程的如下操作:

* 若程序此时因为wait()、sleep()、join()进入阻塞。线程会立马触发一个unblock解除阻塞，并throw一个InterruptedException异常，注意：**捕获该异常会将中断标志位复原**，因此之后的程序不能再用Thread.interrupted()判断是否中断。

* 当程序未阻塞时，thread.interrupt()仅仅只是更新了status标志位。线程中可以通过Thread.isInterrrupted()进行检查，做相应的处理，比如也throw InterruptedException或者是清理状态，取消task等。注意：**调用Thread.isInterrrupted()方法会使中断标志位复原**。


## 关键方法

* 休眠：Thread.sleep(ms)，直接使线程进入阻塞

* 线程名在new Thread时传入，否则默认为“Thread-n”，n从0递增

* Thread.currentThread()：返回当前运行的线程

* Thread.yield()：使当前线程让出CPU，让其他线程开始运行（对于同优先级线程）

* thread.interrupt()：在线程外部调用该方法中断线程的死锁（sleep，wait，join），并在线程中抛出InterruptedException异常。若线程未进入阻塞状态，该操作仅仅是改变线程的中断标志位。

* Thread.interrupted()：在线程内部通过中断标志位判断当前线程的是否被中断，**该方法会将中断标志位复原**，通常用于在线程死循环时进行中断判断。

* Thread.stop()：停止线程，并释放占用的对象锁，但会导致数据不完整，不推荐使用

* thread.join()：若A线程已就绪，则等待A线程完毕才继续执行当前线程，可选参数为(long millis)，即超时时间后A还未运行完毕，则继续执行该线程，该阻塞类似于sleep()

* thread.setPriority(int p)：为线程A设置优先级

* thread.setDaemon(boolean b)：是否将线程A设置为后台守护进程，该方法必须在start()前调用

* boolean thread.isAlive()：测试线程A是否处于活动状态，即线程被启动且没有死亡

* void this.notify()、this.notifyAll()：唤醒wait当前资源的等候的线程进入就绪状态

## 使用方法

* 生命周期：
    * 诞生状态（刚被创建）
    * 就绪状态（调用start()后不是立即运行，此时需要等待cpu调度资源）
    * 运行状态（根据CPU的时间片切换就绪和运行状态）
    * 阻塞状态
        * thread.join() **等待指定的线程执行完**，继续执行该线程
        * Thread.yield() **让出当前线程CPU**，但也可能会被cpu再次调度到
        * Thread.sleep() **指定让出该线程CPU一定时间**，但不会让出线程锁
        * this.wait() 让出线程锁进入wait池，等待其他线程唤醒，需要synchronized块或其他线程锁中使用
        * synchronized阻塞（lock池）
        * 输入输出阻塞（读取文件，等待用户输入）
        * **阻塞恢复后是进入就绪状态**
    * 死亡状态（运行完毕并结束）

* 构造线程：
    * 继承Thread类并重写run()方法

    ```java
    class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("it's a new thread");
        }
    }
    ```

    * 实现一个Runnable接口的实例，并用该实例初始化一个Thread对象

    ```java
    // 便于多个线程间共享资源，且可以继承其他的基类
    // 注意在匿名类中使用的外部变量必须是final类型，以防止闭包问题的发生
    class MyRun implements Runnable {
        // 该num会在同一个MyRun实例创建的所有线程中共享，类似于static
        private Integer num = 1;
        @Override
        public void run(){
            // 同一时间只允许一个线程操作num
            synchronized(num) {
                System.out.println(num ++);
            }
        }
    }
    Thread thread = new Thread(new MyRun());
    thread.start();
    ```


