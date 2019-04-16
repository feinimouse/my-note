<font size="4">

# java多线程进阶

by 菲尼莫斯 2019年4月8日

---

## 本地线程ThreadLocal

ThreadLocal<T>

用于为每一个线程都维护了自己独有的变量拷贝，每个线程在访问该变量时，读取和修改的，都是自己独有的那一份变量拷贝，不会被其他线程访问，变量被彻底封闭在每个访问的线程中。

## 信号量：

Semaphore类可以维护**一组**许可证（一个锁的多把钥匙），多线程去调用一套资源时，只有获得许可证的线程可以调用，否则便会阻塞，等待许可证的释放。

通常用于如下场景：如银行（资源）只提供一定数量的窗口（许可证锁）供业务办理，但办理业务的人（线程）有很多

* `new Semaphore(int permits, boolean fair)`：构建一个信号量，参数：许可证数量、是否为公平锁。

* `semaphore.acquire(int xx)`：申请xx个许可证，默认该阻塞是可中断的，使用`semaphore.acquireUninterruptibly`方法来使得阻塞不可中断。

* `semaphore.release(int xx)`：释放xx个许可证

## 计划任务Timer

```java
Timer timer = new Timer();
// 参数：执行内容、执行时间、执行周期(若不传入则只执行一次)
timer.schedule(() -> {
    System.out.println("...");
}, new Date(System.currenTimeMillis() + 1000)
, 1000);
```

也可以使用开源插件quartz进行计划任务


</font>
