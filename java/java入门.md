<font size="4">

# java入门

by 菲尼莫斯 2019年3月12日

---

## java的基本数据类型

**基本类型的传递使用的是值传递（直接复制）**

### 整数：

* **byte**：1字节，-2^7 ~ 2^7 - 1

* **short**：2字节，-2^15 ~ 2^15 - 1

* **int**：4字节

* **long**：8字节 字面量必须通过后缀L表示（1000L）

* 二进制字面量：0b（0b1011001）

* 十六进制字面量：0x（0x1AEEC98）

* 字面量可以通过下划线来分割（`int i = 0b1000_1010_1111`）

* 强制高位向低位转换时：高位数余上低位所能表示的范围（`(byte)258 = 258 % 256`，`(byte)253 = -3`）

* 表达式中有不同数据类型时，所有的数据会提升成最高位的数进行计算（`4 + 8L` int 4 会提升为long类型）

* **默认值为 0**

### 浮点数：

* **float**：4字节，7位有效数字，字面量必须通过后缀f表示（1.89f）

* **double**：8字节，15位有效数字，可以使用科学计数法E+x（1.34E+5，67.8E-5）

* **默认值为 0.0**

### 字符：

* **char**：2字节，Unicode，使用0 ~ 65535赋值，使用单引号表示字面量且只能有一位（'a'）

* 常用转义符号：`\n`换行、`\r`回车、`\f`换页

* **默认值为 0**

### 布尔：

* **boolean**

* **默认值为 false**

### 基本类型的存储方案

基本数据类型都存储在java的**虚拟机栈**中

特点：容量小、速度快

```java
// 在虚拟机栈中开辟一块内存，a指向该内存
int a;
// 将该内存赋值为10
a = 10;
```

## 引用类型

* Object 对象不是基本数据类型，对象的传递采用引用传递（指针）

* 对象的内存分配为动态分配，内存的回收也为自动回收

* **默认值为 null**

* 类是对对象的描述，对象是类的实例

* String是对象类型，因此采用引用传递

* java中数组是一个对象，因此数组本身为引用，若数组中是基本数据类型则采用复制的值，对象则为引用

* new命令为对象动态分配了一块内存，并将类进行实例化

### 枚举类

* 可以包括方法和变量

* 构造方法必须为包保护或私有

* values() 获取所有枚举值

* 在定义枚举类时自动调用私有构造方法进行构造

```java
public enum GirlsBand {
    // 此处自动调用了构造函数
    POPIPA("pink"),
    ROSELIA("blue");

    private final String color;

    private GirlBand(color) {
        this.color = color;
    }
    public String getColor() {
        return this.color;
    }
}
public static void main(String[] args) {
    // 可以直接调用某个枚举的方法
    System.out.println(GirlsBand.POPIPA.getColor());
    // 遍历所有枚举
    for (GirlsBand i : GirlsBand.values()) {
        System.out.println(i.getColor());
    };
}

```

## 命令行参数args

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(args));
    }
}
```

```bash
$ javac Main
$ java Main Happy Lucky Smile Yeah
Main Happy Lucky Smile Yeah
```

</font>