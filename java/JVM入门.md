<font size="4">

# JVM入门

by 菲尼莫斯 2019年3月18日

---

## 基本

为java语言深度优化的虚拟硬件模拟软件，拥有处理器、指令系统、堆栈和寄存器

* 每个java程序使用一个java虚拟机
  
* 虚拟机的运行开始于main()方法，为程序的初始线程且不为守护线程

* 在对应权限下调用exit()方法能够终止程序执行

* 类加载子系统（class loader）负责加载类和接口
    * 类和接口是在类和接口第一次使用的时候被动态加载进JVM的，如创建了一个对该类静态成员的引用

* 执行引擎（execution engine）负责执行加载类中的指令

* 基本数据类型(int，char，double，boolean)、不能使用的（return value）数据类型，引用数据类型（class、interface、数组）

* 内存分配 
    * 线程共享区：方法区（常量、静态变量、类信息、.class字节码）、堆（存储对象实例）
    * 线程私有：虚拟机栈（类的方法调用）、本地方法栈（非java方法调用）、程序计数器（行数）

* 类的加载和链接是在运行时进行的：loading（运行时数据结构）、verification（规范、版本、安全等）、preparation（分配内存、常量初始化）、resolution（符号引用转为直接引用）、initialization（类变量）、using（主被动引用）、unloading（卸载）

</font>