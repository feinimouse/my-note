# ROW_NUMBER

## 简介

在MySQL 8.0及更高版本中，ROW_NUMBER() 是一个窗口函数，它为查询结果集中的每一行分配一个唯一的顺序编号（整数），编号从1开始递增。当你需要对查询结果进行逻辑上的行编号或者分页时，这个函数非常有用。例如，你可以按照特定的排序条件对行进行编号。

一般配合over()使用

## 示例1

实现只对第一个字段去重，其他字段按照指定排序取第一个，解决distinct只能查询一个字段的问题

```sql
SELECT org_code, org_name FROM (
    SELECT org_code, org_name, update_time
    ROW_NUMBER() OVER (
        PARTITION BY org_code -- 根据org_code进行分组标号
        ORDER BY update_time DESC -- 标号根据update_time进行排序，即相同org_code的行中，update_time最新的排序为1
    ) AS sort
    FROM org_info
) AS org_order WHERE sort = 1;


```

## 示例2

假设有一个orders表，包含order_id, customer_id, order_date等字段，现在想要查询每个客户下的最新10个订单记录，可以使用ROW_NUMBER()配合PARTITION BY来实现分页查询：

```sql
SELECT *
FROM (
  SELECT 
    order_id, 
    customer_id, 
    order_date, 
    ROW_NUMBER() OVER (
        PARTITION BY customer_id -- 对重复customer_id的进行分组计数
        ORDER BY order_date DESC -- 在分组中根据order_date进行排序
    ) as row_num
  FROM orders
) AS ordered_orders
WHERE row_num <= 10;
```


