<font size="4">

# uri入门

by 菲尼莫斯  2019年3月14日11:39:55

---

## 基本概况

语法：`[协议] :// [user] : [password] @ [服务器域名或ip] : [port] / [path] ; [params] ? [查询语句] # [frag] `

* params 为名值对，和路径间以 **;** 分割，每一个路径间都可以带参数：

`ftp://ftp.github.com;param=2765`

`http://foes.com/human;sale=false/index.html;graph=true`

* 查询语句为名值对，和路径间用 **?** 分割，查询语句间用 **&** 分割：`http://google.com?search=12345`

* frag不会发送到服务器端，通常由浏览器处理，指向了资源的特定部分（如指向文章的首部，或某个标签点）

</font>