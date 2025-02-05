# lucene查询

**lucene中字符串不能使用单引号**
**查询的保留词（如：AND）必须全部大写**

## 简答查询

```sql
select * from user where id = '001';
```

```lucene
id:001
id:"001"
```

## 且

```sql
select * from user where floor = '7' and age > 18;
```

```lucene
floor:7 +age:18
floor:7 AND age:18
```

## 或

```sql
select * from user where floor = '7' or age = 18;
```

```lucene
floor:7 OR age:18
```

## 取反

```sql
select * from user where age = 18 and floor != '7';
```

```lucene
age:18 AND -floor:7
age:18 AND NOT floor:7
```

## 取多个值

```sql
select * from user where floor in ('7', '8', '9');
```

```lucene
floor:(7 or 8 or 9)
age:("7" "8" "9")
```
## 通配符

```sql
select * from user where name like '小%'
select * from user where name like '%华'
```

```lucene
name:小*
name:/.*华/
name:王*明
```

* `*` 匹配任意多个字符
* `?` 匹配任意单个字符

当首字符为 `*` 时，需要使用正则表达式查询，正则表达式的两头添加 `/` ，注意正则表达式中的 `*` 含义和通配符中的不相同，因此需要使用 `.*`

## 范围

```sql
SELECT * FROM products WHERE category = 'Electronics' AND price > 100
```

```lucene
category:Electronics AND price:{100 TO *}
```