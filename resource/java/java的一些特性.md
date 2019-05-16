

# java一些特性

by 菲尼莫斯 2019年3月14日

---

## 枚举类

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

## 可变长参数

`function([class name]... [var name])`

* 可变长参数会被解析为一个数组

* 只能作为最后一个形参使用

```java
public void deal(int... var) {
    int[] values = var;
    for (int i : values) {
        System.out.println(i);
    }
}
int a = 0, b = 1, c = 3;
// 一次放入三个参数
deal(a, b, c);
// 不放入参数
deal();
```


