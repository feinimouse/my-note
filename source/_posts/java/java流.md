---
title: java流
author: 菲尼莫斯
date: 2019-03-15
tags:
- 基础
categories:
- java
---

# java流

by 菲尼莫斯 2019年3月15日

---

## 流的分类

IO操作包括：**IO请求**和**IO操作**两步：

BIO：同步阻塞IO。IO操作和IO请求属于同一线程，IO请求会被阻塞到直到IO操作完成。

NIO：同步非阻塞IO。IO操作和IO请求不属于一个线程，IO请求线程完了立即释放，其他线程可以接着运行，jvm会不断的查询IO操作进程是否完成，一旦完成才进行接下来的操作。java中将将IO请求注册到一个多路复用器上，只有真正发生IO操作时，才真正起一个线程进行IO操作。

AIO：异步非阻塞，IO请求和IO操作不属于一个进程，IO请求线程完了立即释放，其他线程可以接着运行，IO操作结束后会通知jvm进行接下来的操作。

以TCP和Http来说：

BIO：每个TCP一个线程。NIO：每个Http一个线程。AIO：只有请求有效时才启动线程。

### 同步和异步

同步和异步是针对应用程序和内核的交互而言的。

同步：指的是用户进程触发IO操作并等待或者轮询的去查看IO操作是否就绪。

异步：异步是指用户进程触发IO操作以后便开始做自己的事情，而当IO操作已经完成的时候会得到IO完成的通知（异步的特点就是通知，使用异步IO时，Java将IO读写委托给OS处理，需要将数据缓冲区地址和大小传给OS）

### 阻塞和非阻塞

**阻塞方式下读取或者写入函数将一直等待，而非阻塞方式下，读取或者写入函数会立即返回一个状态值。**

阻塞：当试图进行读写时, 如果当时没有东西可读,或者暂时不可写, 程序就进入等待状态, 直到有东西可读或者可写为止

非阻塞： 如果没有东西可读, 或者不可写, 读写函数马上返回, 而不会等待。直到下一次可读写时再调用。

## 文件操作

```java
File file = new File("code/java/name/feinimouse/study")
// 文件是否存在
file.exists();
// 创建以路径为名的文件夹，过程中不存在的父级文件夹会一并创建
file.mkdirs();
// 删除文件件
file.delete();
// 创建一个新的空文件文件，若已存在则返回false
// 注意：文件的生成要配合FileOutputStream或FileWriter
file.createNewFile()

// 重命名文件
file.renameTo(File file);
// 判断是否为文件或者目录
file.isFile();
file.isDirectory();
// 列出文件夹下的所有文件和目录
file.listFiles();
// 相对路径与绝对路径
file.getPath();
file.getAbsolutePath();
```

## 字节流基本

节点流：从数据源读入，往目的地写出，即离源头最近的流

处理流：对数据进行处理，以提高处理效率专用的流如

* BufferedInputStream：在所有流外部包装一层Buffered能大幅提高运行效率

* DataInputStream：能将其他流传递的字节数据转为java基本数据类型

* ObjectInputStream：序列化与反序列化流，将对象通过流来传送

* 处理流使用的是装饰设计模式，装饰设计模式相比较于代理模式，装饰模式不具备对原对象的控制权，只能将其产出进行修缮。代理模式则能够完全控制原对象的行为，代理模式使用到极致开发就是AOP，即spring架构。

转换流：将字节流转为字符流ByteArrayInputStream

打印流：将内容转换为String加入流中

```java
// true表示自动flush
PrintStream ps = new PrintStream(new FileOutputStream(File file), true);
// 可直接将字符输出到文件中
ps.println("xxxx");
```

序列化：

* 将对象数据转为字节数据

* 对象若需要使用序列化功能则必须实现serializable接口才能进行序列化

* 若想实现自定义序列化过程（如加密等）需实现externalizable接口，并实现writeExternal和readExternal方法

* 用transient（该修饰符修饰的成员不能被序列化）和static修饰的成员不会被序列化

字节的流的基本：InputStream、OutputStream

* 处理非文本数据（输入输出为2进制数据），读取和存储更快

* 通常处理一些音频、图片和纯文本等

* 如System.out、System.in以及FileInputstream等

* 建议所有的inputstream和outputstream，reader和writer上都套一层Buffered缓冲处理流，以提高性能

* 常用Scanner来处理标准输入流，能将输入流的数据转变为基本类型

```java
Scanner scanner = new Scanner(System.in);
String write = scanner.nextLine();
```

输入流

```java
// 建立节点流
FileInputStream in = new FileInputStream(File file);
// 建立处理流
BufferedInputStream bi = new BufferedInputStream(in);
// 一次读取b.length个字节存储到b中，若原文件字节数不足则读取len个字节存到b中
// 若读取完毕则返回len = -1
int len = bi.read(byte[] b);
// 一次读取所有的字节到一个数组中
byte[] b = bi.readAllBytes();
// 关闭流
bi.close();
```

输出流

```java
// false表示覆盖原文件，否则追加
FileOutputStream out = new FileOutputStream(File file, false);
BufferedOutputStream bo = new BufferedOutputStream(out);
// 将整个字节数组写入
bo.write(byte[] b);
// 将字节数组的指定位置写入
bo.write(byte[] b, int from, int to);
// 写入一个字节
bo.write(int b);
// 强制将流缓冲中未占满的数据输出到流的另一端
// 正常情况下，为了防止多次操作IO（操作IO很费cpu时间），提供了一个缓冲区，当缓冲区满的时候，再写入文件，从而提高效率
bo.flush();
// 关闭流，同时执行flush()方法
bo.close();

```

## 字符流基本

面向字符的流：Reader、writer

* 用于处理文本数据，使用 char 类型读入（两字节Unicode）

* 操作方法同字节流，但写入和读出的对象由byte变为了char或char数组

## 转换流

编码：字符通过**编码字符集**转换为二进制文件

解码：二进制文件通过**解码字符集**转为字符

**字符集**规定了二进制数与字符串间的映射关系

**解码**决定了一串字节怎么拆分成可以进行规定字符集映射的字节，并进行映射

**编码**决定字符怎样按指定字符集映射成的二进制字节串并转换为可供保存并解码的字节串

```java
// 编码
new String(byte[] b, "utf-8");
// 解码
String data.getBytes("utf-8");

// 解码流
FileInputStream in = new FileInputStream(File file);
InputStreamReader reader = new InputStreamReader(in, "utf-8");

// 编码流
FileOutputStream out = new FileOutputStream(File file);
OutputStreamWriter writer = new OutputStreamWriter(out, "utf-8");

```


