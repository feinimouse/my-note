<font size="4">

# http报文

by 菲尼莫斯 2019年3月15日 

---

## 基本

* 报文是以流的形式传播的，报文总是从发送者流向接收者（不会流回来）

* 起始行&首部块：ASCII编码，以（CRLF）一个回车 `\f` 加一个换行符 `\n`结束一行

* 起始行：每项间用空格分割

* 首部：每个键值对占一行，键值用`:`分割，空格可选 `Content-Type: img`
    * 过长的一行键值对将换行并以空格或者tab的形式缩进
```
Server: Apache tomcat servlet
    Version 8.0.49
```

* 主体：和首部间以一个空行分割，可包含文本或二进制数据或为空

* 请求报文格式：

```
[method] [request-url] HTTP/[version]  
[header]

[body]
```

* 响应报文格式

```
HTTP/[version] [status-code] [status-message]  
[header]

[body]
```

## HTTP method

|方法   |含主体|作用                     |
| --    | --      | --                      |
|GET    |不含     |获取数据                  |
|HEAD   |不含     |只从服务器获取响应的首部    |
|POST   |含       |发送并请求处理数据         |
|PUT    |含       |发送并请求存储数据         |
|DELETE |不含     |请求删除数据               |
|OPTIONS|不含     |查询该URL可以使用哪些方法   |
|TRACE  |不含     |对请求进行环回诊断，目的服务器将在主体返回其真实收到的报文|

## status code

* 1：提示

* 2：成功
    * 200：成功，请求数据在主体中

* 3：重定向

* 4：客户端错误
    * 401：未授权需要用户名和密码
    * 404：未找到

* 5：服务端错误

</font>