<font size="4">

# java反射和代理

by 菲尼莫斯 2019年3月19日

---

## 运行时对象

即识别运行时的对象是什么类型

RTTI（Run Time Type Identification）能够在Java运行时维护类的相关信息

RTTI是基于**Class类**来实现的，是多态的基础

RTTI和反射之间的区别在于：RTTI是编译器在编译时打开和检查.class文件；反射是编译器在运行时打开和检查.class文件

* Java中每个实例对象都有相应的Class类对象，该Class对象保存了实例对象在内存中真正所属的类的信息，Class对象保存在.class文件中

* 每装载一个新类时，Java虚拟机就会基于这个类创建一个Class实例

* 无论实例对象的引用怎么转换，实例对象本身对应的Class类对象都不变。

* Java通过实例的Class类找到实例对象真正的方法实现，从而可以通过父类执行子类Class所指的正确的方法调用

>当Java创建某个类的对象，比如Human类对象时，Java会检查内存中是否有相应的Class对象。

>如果内存中没有相应的Class对象，那么Java会在.class文件中寻找Human类的定义，并加载Human类的Class对象。

>在Class对象加载成功后，其他Human对象的创建和相关操作都将参照该Class对象。

* 获取Class有三种方法，如下：

```java

Class c1 = Class.forName("Integer");

// 该方法不会初始化该Class类所表示对象的静态构造函数
Class c2 = Integer.class;

Class c3 = new Integer().getClass();

```

* Class类方法：
    * getName()：获取类名
    * getPackage()：获取包名
    * newInstance()：默认调用无参构造函数创建实例
    * Field[] getFields()：获取类的所有成员变量
    * Methods[] getMethods()：获取类的所有方法
    * Constructors<?>[] getDeclaredConstructors()：获取类的所有构造方法

## JAVA反射

在运行时动态地，对于任意一个类都能知道该类的所有属性和方法，对于任意一个实例都能调用它的所有属性和方法

</font>