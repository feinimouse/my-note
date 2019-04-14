<font size="4">

# java新特性

by 菲尼莫斯 2019年4月4日

---

## java 1.5

* 泛型

* `for(String s : list)`：可以通过该方式遍历实现了Iterator的接口，如`List<String>`

* 包装类，如Integer、Character

* 枚举类enum

* java.util.concurrent线程管理包，如重入锁、线程通信等

## java 1.6

* JAXB、JAXP等XML相关操作

* java编译器Compiler类，用于动态编译java源文件的API（如服务器的热部署）

* 注解Annotations

* 脚本语言解析引擎javax.script

## java 1.7

* 二进制字面量`0b`和数值中添加下划线`_`

```java
int a = 0b1000_1000
```

* try()自动释放资源：

```java
// try括号内的资源会在try语句结束后自动释放，前提是这些可关闭的资源必须实现 java.lang.AutoCloseable 接口。
try (
    InputStream in = new FileInputStream(src);
    OutputStream out = new FileOutputStream(target);
) {
    // do something with Stream
} catch (Excption e) {
    e.printStackTrace();
}
```

* catch可以一次捕获多个异常：`catch(IOException | SQLException e)`

* switch case支持String类型

## java 1.8

* interface 中对方法添加default关键字，可以为接口添加默认方法

* DateTimeFormatter日期格式化工具`DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss").format(LocalDateTime.now());  `

* Stream对象：类似于js的Array，有forEach、map、filter和collect（转为指定的集合）等方法

* Optional对象：用于包装一个对象，比直接使用泛型或Object更为便捷

* **Lambda表达式**

* **`::`关键字**

```java
/**
 * ：：表达式可以引用某一对象的方法
 * 并允许我们使用匿名接口函数的形式承载该方法
 * （小细节：接口函数都请加上`@FunctionalInterface`注解）
 */
public class Band {
    private String name;
    public String getName() {
        return name;
    }
    public static void display() {
        System.out.println("we are display !!");
    }
    public Band(String s) {
        name = s;
        System.out.println(s + " is Formed !");
    }
    public static void main(String[] args) {
        // 使用SingelParaConstructor接口承载构造方法
        SingelParaConstructor<String, Band> createBand = Band :: new;
        // 运行构造方法
        Band band = createBand.run("Hello Happy World");
        // 使用NoParaFunc承载非静态方法
        NoParaFunc<String> getName = band :: getName;
        // 运行非静态方法
        System.out.println("The band name is " + getName.run());
        // 用Runnable接口获取静态方法并运用于Thread中
        // 相当于new Thread(() -> {...}).start();
        new Thread(Band :: display).start();
    }
}
@FunctionalInterface
interface NoParaFunc <T> {
    public T run();
}
@FunctionalInterface
interface SingelParaConstructor <P, O> {
    public O run(P p);
}
```

## java 1.9 (2017年)

* java模块化按需加载

> Modularity提供了类似于OSGI框架的功能，模块之间存在相互的依赖关系，可以导出一个公共的API，并且隐藏实现的细节，Java提供该功能的主要的动机在于，减少内存的开销，在JVM启动的时候，至少会有30～60MB的内存加载，主要原因不管其中的类是否被classloader加载，第一步整个jar都会被JVM加载到内存当中去，模块化可以根据模块的需要加载程序运行需要的class。
>
> 在引入了模块系统之后，JDK 被重新组织成 94 个模块。Java 应用可以通过新增的 jlink 工具，创建出只包含所依赖的 JDK 模块的自定义运行时镜像。这样可以极大的减少 Java 运行时环境的大小。使得JDK可以在更小的设备中使用。采用模块化系统的应用程序只需要这些应用程序所需的那部分JDK模块，而非是整个JDK框架了。

* jshell命令行工具，使用类似node，可以直接执行java脚本

* 生成不可变集合，例如List可用`List<String> list = List.of("aaa", "bbb")`来创建，对元素的操作会抛出`UnsupportedOperationException`异常

* interface可以定义私有方法并在default方法中使用

* 将原来的GC垃圾收集器替换为了G1

## java 10 (2018)

* 局部变量可用`var`来指定匿名参数类型，编译器将自动推断。
    * 必须进行初始化
    * 可用于for循环
    * 形参和返回值无法使用
    * 类成员属性无法使用
    * 初始化为接口函数对象无法使用

* 为G1添加了一个并行的垃圾收集器，以提高长等待时间时的性能

</font>
