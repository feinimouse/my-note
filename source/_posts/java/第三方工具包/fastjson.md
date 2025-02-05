## 反序列化问题

版本：1.2.83

若反序列化的bean的属性存在**非基本对象**，且json字符中该属性的赋值为**空串**，则反序列化后的Bean属性会自动赋值为**null**，并**忽略默认值**。

假设有如下对象：
```java
@Data
public class Bean implements Serializable {
    private Date date = new Date();
    private BigInteger amount = BigInteger.valueOf(99L);
    private Integer num = 777;
    private int count = 888;
}
```

用如下json字符串反序列化：
```json
{
    "date":"",
    "amount":"",
    "num":"",
    "count":""
}
```

得到的结果为

```json
{
    "date": null,
    "amount": null,
    "num": null,
    "count": 888
}
```
