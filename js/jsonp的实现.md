<font size="4">

# http入门

by 菲尼莫斯  2019年3月13日

---

## 原理

* ajax无法进行跨域访问

* script、img、iframe的src属性可以进行跨域访问

* 远程请求的数据可以被封装到json中，且js支持原生json字面量

* 可以将客户端的执行函数名告诉跨域服务器，服务器通过json字面量将数据传入执行函数

* 执行函数对json字面量的操作就相当于对ajax的回调的操作

## 实现

客户端

```html

<script type="text/javascript">

function callback(data){
    //* do something with data *//
    doSomething(data);
}

</script>

<script 
    type="text/javascript" 
    src="http://my.jsonp.com/jsonp?query=test&callback=callback"
></script>

```

服务端

```java

@ResponseBody
@RequestMapping("/jsonp")
public String jsonp(String query, String callback) {
    //* do something with query *//
    JsonObject result = doSomething(query);
    return callback + "("  + result.toString + ");";
}

```

</font>