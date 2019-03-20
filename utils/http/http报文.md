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

|方法   |含主体    |作用                     |
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
    * 100 continue：客户端在向服务端发送一个大的实体前，会先用首部的 `Expect: 100 Continue` 对服务器进行询问，通常服务器要以100 continue状态回应，该状态码存在很多的问题
    * 101 switching protocols：服务端正在根据客户端的请求切换为可用的协议

* 2：成功
    * 200：成功，请求数据在主体中
    * 201：created：资源或对象已创建
    * 202：accepted：请求已被接收，但还没进行任何动作
    * 203：non-authoritation information：服务器有资源副本，资源不源于该服务器
    * 204：no content：没有主体部分
    * 205：reset content：清除当前页中所有html表单元素
    * 206：partial content：range请求（即只请求文档的某一部分）成功

* 3：重定向（用location首部指示要转移的地址）
    * 300：multiple choices：该资源包含多个版本，并给出首选版本
    * 301：moved permanently：永久重定向
    * 302：Found：临时重定向
    * 303：see other：在http1.1中，允许post请求响应将客户端重定向，即先post再get
    * 304：not modified：资源未被修改
    * 305：use proxy：必须使用某个代理才能访问本服务器，代理的位置在location中给出
    * 307：在http 1.1中，使用该状态码取代302的临时重定向

* 4：客户端错误
    * 400：bad request：发送了错误的请求
    * 401、407：unauthorized：未授权的请求
    * 403：forbidden：请求被服务器拒绝，通常不会说明原因
    * 404：not found：未找到URL
    * 405：method not allowed：使用了不支持的方法，通常在首部的allow中返回支持的方法
    * 408：request timeout：请求超时

* 5：服务端错误
    * 500：internal server error
    * 501：no implemented：请求超出能力范围
    * 502：bad gateway：作为代理服务器收到了一条伪响应，无法连接到父网关
    * 503：service unavailable：服务器维护中
    * 504：gateway timeout：网关或代理等待服务器响应超时

</font>