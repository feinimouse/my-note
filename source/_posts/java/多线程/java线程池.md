# java线程池

by 菲尼莫斯 2019年9月25日

---

## ThreadPoolExecutor

ExecutorService 是线程池的核心接口，有抽象实现类 AbstractExecutorService ，大部分线程池都继承于该抽线类

ThreadPoolExecutor 时线程池的主要使用类，继承于 AbstractExecutorService ，其构造函数的参数如下：

**corePoolSize**： 核心池的大小。

* 一般情况下，线程池创建后是没有线程的，只有在任务到来时才会创建线程。

* 即便线程池中有线程空闲，也会一直创建到线程数量达到 corePoolSize 。

* 使用 prestartCoreThread() 方法可以为线程池预创建线程。

**maximumPoolSize**： 线程池所允许的最大线程数量。

* 当任务数量超过 corePoolSize 核心数量时，若存在空闲线程则优先使用空闲线程

* 若已存在的线程中没有空闲，则将醒来了的任务加入阻塞队列 workingQueue 中

* 阻塞队列不为空表示该线程池没有空闲的线程

* 若阻塞队列已满，则新的线程会被被创建，直到达到 maximumPoolSize 。

* 超过 maximumPoolSize 时，线程将不会被创建，任务将被拒绝。

**keepAliveTime**： 当超出 corePoolSize 时，若有线程空闲，则经过keepAliveTime的时间后会终止该进程，直到线程数量达到corePoolSize。

**workingQueue**： 当超出 corePoolSize 时，且没有空闲线程时，用于缓存任务的队列：

* SynchronousQueue ：单容量队列，一个写操作对应一个读操作，否则就阻塞

* LinkedBlockingQueue ：链式读写分离阻塞队列

* ConcurrentLinkedQueue ：无锁并发队列

**RejectedExecutionHandler**： 当拒绝处理任务时的处理方案

* AbortPolicy： 丢弃任务并抛出异常

* DiscardPolicy： 丢弃任务但不抛出异常

* DiscardOldestPolicy： 丢弃阻塞队列的第一个任务

* CallerRunsPolicy： 由任务发起线程自己创建线程

**threadFactory**： 线程的创建者
