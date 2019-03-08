<font size="4">

# MySql乱码问题

by 菲尼莫斯 2019年3月8日

---

问题原因分析：

* JSP页面编码未设置为utf8：会导致前端传输过来的数据就是乱码

* servlet request 或 response 的 characterset 要为utf8

* springMVC或者web.xml或者项目的编码未设置为utf8

* mybatis或jdbc的数据库链接没有指定编码格式，记得加上：characterEncoding=utf8

`jdbc.url=jdbc:mysql://localhost:3306/linxia?useSSL=false&amp;useUnicode=true&amp;characterEncoding=utf8`

* mysql中的数据库编码格式未设置成utf8，或者表的字段编码格式未设置成utf8

* （最常见）mysql的配置编码未设置为utf8

登录mysql自带命令行，使用如下命令：

`show variables like 'character%';`

可以看到当前数据库的编码情况：

```
+--------------------------+---------------------------------------------------------+
| Variable_name            | Value                                                   |
+--------------------------+---------------------------------------------------------+
| character_set_client     | utf8                                                    |
| character_set_connection | utf8                                                    |
| character_set_database   | utf8                                                    |
| character_set_filesystem | binary                                                  |
| character_set_results    | utf8                                                    |
| character_set_server     | utf8                                                    |
| character_set_system     | utf8                                                    |
| character_sets_dir       | C:\Program Files\MySQL\MySQL Server 5.7\share\charsets\ |
+--------------------------+---------------------------------------------------------+
```

除了 filesystem 外应该都设为utf8

设置方法为找到系统的**programData**文件夹中的mysql目录下的my.ini，修改其中的两条配置：

`default-character-set=utf8`

`character-set-server=utf8`

这两条语句的位置比较特殊，如果错误修改将会导致mysql编辑器闪退，推荐使用编辑器搜索到关键词相应位置后取消原来的注释

</font>