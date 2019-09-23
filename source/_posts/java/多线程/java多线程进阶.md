---
title: java多线程进阶
author: 菲尼莫斯
date: 2019-04-08
tags:
- 多线程
categories:
- java
---

# java多线程进阶

by 菲尼莫斯 2019年4月8日

---

## 本地线程ThreadLocal

ThreadLocal<T>

用于为每一个线程都维护了自己独有的变量拷贝，每个线程在访问该变量时，读取和修改的，都是自己独有的那一份变量拷贝，不会被其他线程访问，变量被彻底封闭在每个访问的线程中。

它是为创建代价高昂的对象获取线程安全的好方法

## Callable

Callable可以创建一个拥有返回值的线程，并能够捕获该线程中的异常

使用Future来获取该异步任务的返回值，获取任务的状态
* 可以通过其get方法获取执行结果，该方法会阻塞直到任务返回结果。

Executors类提供了一些有用的方法在线程池中执行Callable内的任务。
* 较常用的有ExecutorService类

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

## LockSupport

能够让某个线程阻塞，并能被其他线程唤醒
* LockSupport.park()：阻塞当前线程
* LockSupport.unpark(Thread)：唤醒指定线程
* LockSupport.parkUntil(long)：阻塞指定的时间
* LockSupport.parkNanos(long)：阻塞指定的时间后，若没唤醒则抛出异常

## Condition

和ReentrantLock不太一样，condition能够new不同的实例，对不同的线程进行加锁

ReentrantLock则是对一个公共对象的方法或代码块进行加锁

有await()和signal()方法，类似于notify和wait。在一个Lock块中可以放置多个condition，以实现唤醒指定的线程



