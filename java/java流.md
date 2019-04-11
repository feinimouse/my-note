<font size="4">

# java流

by 菲尼莫斯 2019年3月15日

---

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

处理流：对数据进行处理，以提高处理效率专用的流如 BufferedInputStream

转换流：将字节流转为字符流

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
// 将流中的数据推出到另一端，即执行写入
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

## 序列化

* 将内存中的对象保存在硬盘上，从而防止数据丢失

* 对象若需要使用序列化功能则必须实现serializable接口

* 若想实现自定义序列化过程（如加密等）需实现externalizable接口，并实现writeExternal和readExternal方法

* 用transient和static修饰的成员不会被序列化

* 使用 ObjectInputStream & ObjectInputStream 来实现序列化

</font>
