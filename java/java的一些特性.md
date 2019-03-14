<font size="4">

# java一些特性

by 菲尼莫斯 2019年3月14日

---

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

</font>
