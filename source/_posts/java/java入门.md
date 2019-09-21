---
title: java入门
author: 菲尼莫斯
date: 2019-03-12
tags:
- 基础
categories:
- java
---

# java入门

by 菲尼莫斯 2019年3月12日

---

## java相关名词

JDK：Java Development Kit；Java开发工具
* J2SE：standard edition标准版
* J2EE：enterprise edition企业版
* J2ME：micro edition移动版

JRE：Java Runtime Enviroment；Java运行环境

JVM：Java Virtual Machine：Java虚拟机

DI：Dependency Injection 依赖注入

**IOC**：Inversion of Control 控制反转

**AOP**：Aspect Oriented Programming 面向切面编程（事务管理、日志等系统事务独立）

ORM：Object Relational Mapping 对象关系映射（解决面向对象与关系数据库存在的互不匹配的现象的技术）

JPA：Java Persistence API；Java持久层关系映射

OXM：Object Xml Mapping 对象XML关系映射

JMS：Java Message Service；Java 消息服务（用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信）

JDBC：Java Data Base Connection；java数据库连接

MVC：Model View Controller 模型-视图-控制器

MVVM：Model View ViewModel 模型-视图-视图模型

## java的基本数据类型

### 整数：

* **byte**：1字节，-2^7 ~ 2^7 - 1

* **short**：2字节，-2^15 ~ 2^15 - 1

* **int**：4字节

* **long**：8字节 字面量必须通过后缀L表示（1000L）

* 二进制字面量：0b（0b1011001）

* 十六进制字面量：0x（0x1AEEC98）

* 字面量可以通过下划线来分割（`int i = 0b1000_1010_1111`）

* 整数的**字面量默认均为int类型**，小数的为double

* **整数进行加减乘除运算时默认会转为int类型**，小数计算时连同整数都会转为double

```java
byte a = 1, b = 2;
byte c = a + b; // 此处会报类型转换错误，此时a+b已经转为了int类型，需要强制转为byte
```

* 强制高位向低位转换时：高位数余上低位所能表示的范围（`(byte)258 = 258 % 256`，`(byte)253 = -3`）

* 表达式中有不同数据类型时，所有的数据会提升成最高位的数进行计算（`4 + 8L` int 4 会提升为long类型）

* **默认值为 0**

### 浮点数：

* **float**：4字节，7位有效数字，字面量必须通过后缀f表示（1.89f）

* **double**：8字节，15位有效数字，可以使用科学计数法E+x（1.34E+5，67.8E-5）

* **默认值为 0.0**

### 字符：

* **char**：2字节，Unicode，使用0 ~ 65535赋值

* 使用**单引号**表示字面量，且只能有一位（'a'）

* 常用转义符号：`\n`换行、`\r`回车、`\f`换页

* **默认值为 0**

### 布尔：

* **boolean**：不能和其他基本类型进行转换

* **默认值为 false**

### 其他说明

* **基本类型的传递使用的是值传递（直接复制）**

* **注意：包装类型Integer、Boolean等赋值和取值不是采用引用传递，Integer值改变后实际是创建了一个新对象**

* 包装类与包装类间的`==`操作符会比较两个包装类的指针地址，因此很容易出现不相等的情况，包装类应使用`equals()`。

* 基本数据类型的数据和引用都是存储在栈中的

> 编译器先处理int a = 3；首先它会在栈中创建一个变量为a的引用，然后查找有没有字面值为3的地址，没找到，就开辟一个存放3这个字面值的地址，然后将a指向3的地址。接着处 理int b = 3；在创建完b的引用变量后，由于在栈中已经有3这个字面值，便将b直接指向3的地址。这样，就出现了a与b同时均指向3的情况。

* “==”操作符对于基本数据类型来说是比较基本数据类型的值是否相同

* 基本类型的存储方案
    * 基本数据类型都存储在java的**虚拟机栈**中
    * 特点：容量小、速度快

```java
// 在虚拟机栈中开辟一块内存，a指向该内存
int a;
// 将该内存赋值为10
a = 10;
```

## 引用类型

* Object 对象不是基本数据类型，对象的传递采用引用传递（指针）

* 对象的内存分配为动态分配，内存的回收也为自动回收

* 引用类型的指针引用是存储在栈中，实例数据是存储在堆中的

* **默认值为 null**

* 类是对对象的描述，对象是类的实例

* java中数组是一个对象，因此数组本身为引用，若数组中是基本数据类型则采用复制的值，对象则为引用

* new命令为对象动态分配了一块内存，并将类进行实例化

### 特殊的对象String

* String是对象类型，因此采用引用传递

**String使用字面量和new来创建，其过程是不一样的**

* `String str = "abc"`
    * 编译器首先会创建一个String类型的引用str
    * 之后在栈中查找是否存在"abc"的地址，如果没有则开辟一块内存来存放
    * 在堆中创建一个String实例对象o，将o指向栈这块内存，并在这块内存中也记录下o
    * 将引用str指向o
    * 再有相同的字符串创建时，直接将引用指向o，而不会创建一个新的String对象
    * str -> o堆对象 <-> "abc"栈中数据

* `String str = new String("abc")`
    * 编译器首先会创建一个String类型的引用str
    * 编译器直接在堆中开辟一块内存创建String对象o'，并将o指向了"abc"字面量对象o。
    * 将引用str指向该对象
    * str -> o'堆对象 -> o堆对象 <-> "abc"栈中数据

* **String和其他包装类一样是值不可修改的，只要改变其值就会新创建一个对象**，因此经常更换String值的时候，使用StringBuffer可以提高效率

* 因此基于字面量创建的String和其他包装类可以使用"=="来判断是否相等（即地址指向是否一样），**而equals则是判断字面量是否相等**

* **注意：以下代码，a指向的是存在栈中的字面量，而b指向的是存在堆中的new String的对象，因此两者并不指向同一地址**

#### 常用工具类

* StringBuilder: 快速但线程不安全

* StringBuffer：线程安全

### 遍历

* string.toCharArray();
* string.length();
* string.charAt(int index);
* string.substring(int from, int to);

```java
String a = "a";
String b = new String("a");
String c = "a";
String d = new String("a");
a == b; // false
a == c; // true
b == d; // false
```

### 类型转换

* 对于引用来说，转换不改变对象本身的类型，只改变引用的类型

* 转换前：引用类型A（指针类型） -> 对象类型A（内存中实际的类型）

* 转换后：引用类型B -> 对象类型A

* 注意：**转换后的对象对外表现为B，实际上却是A对象在工作**

    * 此时只能使用引用类型B中规定的方法

    * 此时若调用 **静态方法**，则会**无视实际类型A中的重写调用引用类型B中方法**

    * 此时若调用普通 **实例方法**，则会**调用实际类型A中重写的方法**


* 向上转型：

    * 从实现类转为其接口

    * 从子类转为父类或父类实现的接口

* 向下转型： 若该对象的引用指向一个和引用类型不一致的对象类型时，只能转为该对象的引用所指向的对象的类型

* 一般情况下是一个子类转为了父类，又可以转回来。但直接的一个父类不能转为子类

* 隐式转换：

    * 从容量小的基本类转为容量大基本类

    * 从子类转为父类或实现的接口

* 显示转换：隐式以外的都必须使用显式转换


## 异常处理

错误处理类：

```
Throwable
    |-- >Error
    |-- >Exception
            |-- >RuntimeException
```

Error：故障发生于虚拟机自身，可以被try-catch，但应该直接终止运行的致命错误，如ThreadDeath

Exception：必须被捕获错误并执行错误的处理，如IOException

RuntimeException：可以不被try-catch的干扰错误，如NullPointerException，IndexOutOfBoundsException等

try可以捕获所有Throwable，一般情况下只捕获Exception

return的使用：
* 如果try和catch中有返回值，就把返回值保存到局部变量中；
* 执行jsr指令跳到finally语句里执行；
* 执行完finally语句后，返回之前保存在局部变量表里的值。
* 若finally中有return则抛弃try和catch中的return

## 管道

管道实际上是一种固定大小的缓冲区，管道对于管道两端的进程而言，就是一个文件，但它不是普通的文件，它不属于某种文件系统，而是自立门户，单独构成一种文件系统，并且只存在于内存中。
* 可以实现双向的数据传输，即匿名管道只能单向；命名管道可以双向
* 同一个时刻只能最多有一个方向的传输，即可以有多个进程对其读，也可以有多个进程写，但不能同时写
* 管道的容量大小受内存大小限制。
* 当管道满时，进程在写管道会被阻塞，而当管道空时，进程读管道会被阻塞


