<font size="4">

# java流

by 菲尼莫斯 2019年3月15日

---

## 基本

节点流：从数据源读入，往目的地写出

处理流：对数据进行处理

面向字节的流：InputStream、OutputStream

* 处理非文本数据（输入输出为2进制数据），读取和存储更快

* 如System.out和System.in

* 常用Scanner来处理标准输入流，能将输入流的数据转变为基本类型

* `DataOutputStream(new BufferOutputStream(OutputStream stream))`
    * OutputStream 为最基本的流，只有原生的方法
    * BufferOutputStream buffer内存缓冲可以让写入更快
    * DataOutputStream 提供了写的方法 

* DataOutputStream常用方法：
    * void flush()：清空流的缓冲区，使流中的数据写出
    * void close()：调用flush()，并关闭流
    * void skip(int s)：往前或往后跳指定字节
    * int size()：表示已写出字节数
    * void write / writeByte(int b)：向流中写入int的最低位的8位的数据（1字节），size加1
    * void writeChar(char c)：向流中写入一个char数据（2字节），size加2

面向字符的流：Reader、writer

* 用于处理文本，使用 char 类型（两字节Unicode）

## 序列化

* 将内存中的对象保存在硬盘上，从而防止数据丢失

* 对象若需要使用序列化功能则必须实现serializable接口

* 若想实现自定义序列化过程（如加密等）需实现externalizable接口，并实现writeExternal和readExternal方法

* 用transient和static修饰的成员不会被序列化

* 使用 ObjectInputStream & ObjectInputStream 来实现序列化

</font>