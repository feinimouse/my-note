

# java反射和代理

by 菲尼莫斯 2019年3月19日

---

## 运行时对象

### RTTI

RTTI（Run Time Type Identification）

JVM加载一个类A并生成A对应的Class类，用于存储A的结构信息，之后便能够在Java运行时维护对A的操作

RTTI是基于**Class类**来实现的，是多态的基础

RTTI和反射之间的区别在于：RTTI是编译器在编译时打开和检查.class文件；反射是编译器在运行时打开和检查.class文件

RTTI可以理解为使用类、方法、属性的字面量来进行编程操作（即在编译时调用类）

### 对Class类的操作（反射）

即可以在运行时加载并使用在编译时完全未知的类

* Java中每个实例对象都有相应的Class类对象，该Class对象保存了实例对象在内存中真正所属的类的信息，Class对象保存在.class文件中

* 每装载一个新类时，Java虚拟机就会基于这个类创建一个Class实例

* 同一个类的不同实例的Class对象始终相同

* 无论实例对象的引用怎么转换，实例对象本身对应的Class类对象都不变，getName()始终是转换前的类。

* Java通过实例的Class类找到实例对象真正的方法实现，从而可以通过父类执行子类Class所指的正确的方法调用

* 相比RTTI，使用反射机制操作对象会使java的性能降低，耗时增加30倍

* 使用setAccessible控制java的安全检查机制，若关闭java的安全检查可以提高反射的运行速度，相比RTTI耗时增加7倍

>当Java创建某个类的对象，比如Human类对象时，Java会检查内存中是否有相应的Class对象。

>如果内存中没有相应的Class对象，那么Java会在.class文件中寻找Human类的定义，并加载Human类的Class对象。

>在Class对象加载成功后，其他Human对象的创建和相关操作都将参照该Class对象。

* 获取Class有三种方法，如下：

```java
// 对于内部类需要使用$符号：package.ClassName$InnerClass
Class c1 = Class.forName("Integer");
// 该方法不会初始化该Class类所表示对象的静态构造函数
Class c2 = Integer.class;

Class c3 = new Integer().getClass();

```

* **注意：使用一个非静态内部类的Class时，获取的构造函数必定是有参的，且第一个参数必然是一个外部类的实例**

* Class类方法：
    * getName()：获取类名
    * getPackage()：获取包名
    * newInstance()：默认调用无参构造函数创建实例
    * Field[] getFields()：获取类的所有成员变量
    * Methods[] getMethods()：获取类的所有方法
    * Constructors<?>[] getDeclaredConstructors()：获取类的所有构造方法

* 详细使用见 /code/java/ClassTest.java

## 代理

即通过代理类来访问目标类的方法和属性，通常发生在不能直接或不想直接引用一个对象，因此需要应用代理对象来起到中介作用

### 静态代理

优点：较为简单，方便实现

缺点：
* 代理对象的一个接口只服务于一种类型的对象，即每一种方法都会进行代理，如果要代理多种方法则工作量会大大加大
* 代理的方法不方便扩展

```java
class Orgin {
    void request() {}
}
class Proxy extends Orgin {
    private Orgin orgin;
    Proxy(Orgin o) {orgin = o;}
    @Override
    void request() {
        // do something proxy
        orgin.request();
        // do something proxy
    }
}
```
### 动态代理

主要使用Proxy类来实现动态代理

**注意：动态代理只能针对接口**

> JDK动态代理的原理是根据定义好的规则，用传入的接口创建一个新类，这就是为什么采用动态代理时为什么只能用接口引用指向代理，而不能用传入的类引用执行动态类。

关联调用处理器：InvocationHandler（接口），实现该接口的 `invoke(Object proxy, Method m, Object[] args)`方法
* proxy：动态代理实例，**注意：在invoke方法中调用proxy对象的方法会触发递归操作，应该使用被代理对象的方法，而不是直接操作proxy对象，或加入判断及时跳出递归**
* method：代理对象调用的方法
* args：输入的参数

`InvocationHandler Proxy.getInvocationHandler(Object proxy)`：
* 获得一个已生成的动态代理对象的关联调用处理器

`Class Proxy.getProxyClass(ClassLoader loader, Class[] interfaces)`：
* 获取关联于指定类装载器和一组接口的动态代理类的Class对象

`boolean Proxy.isProxyClass(Class c)`：
* 判断是否是动态代理类

`Object Proxy.newProxyInstance(ClassLoader loader, Class[] interfaces, InvocationHandler h)`：
* 生成动态代理实例，通过指定类装载器和一组接口以及调用处理器

详见 /code/java/ClassTest.java

## 动态编译

使用JavaCompiler类提供的API进行动态编译

```java
JavaCompiler c = ToolProvider.getSystemJavaCompiler();
int result = c.run(null, null, null, "HelloWorld.java");
```

* 参数1：inputStream为java编译器提供的参数，若为空则为System.in
* 参数2：outputStream得到Java编译器的输出信息，若为空则为System.out
* 参数3：outputStream接收编译器的错误信息，若为空则为System.err
* 参数4：可变长String或数组，传入多个Java源文件
* 返回值：0表示编译成功，否则失败

通过反射动态运行编译好的类

```java
URL url = new URL("file:/" + "E:/workspace/my-note/code/java/");
URLClassLoader loader = new URLClassLoader(new URL[]{url});
Class helloWorld = loader.loadClass("HelloWorld");
// invoke调用静态方法时可以传入一个空的执行对象，注意此时将String数组转为了Object
c.getMethod("main", String[].class)
    .invoke(null, (Object)new String[]{});
```


