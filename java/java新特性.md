<font size="4">

# java新特性

by 菲尼莫斯 2019年4月4日

---

## java 1.7

**try自动释放资源：**

try括号内的资源会在try语句结束后自动释放，前提是这些可关闭的资源必须实现 java.lang.AutoCloseable 接口。

```java
try (
    InputStream in = new FileInputStream(src);
    OutputStream out = new FileOutputStream(target);
) {
    // do something with Stream
} catch (Excption e) {
    e.printStackTrace();
}
```

</font>
