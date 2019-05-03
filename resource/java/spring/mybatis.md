# Mybatis

by 菲尼莫斯 2019年4月17日

---

(待完善)

半ORM（对象关系映射）框架，它**内部封装了JDBC**，开发时只需要关注SQL语句本身，不需要花费精力去处理**加载驱动**、**创建连接**、**创建statement**等繁杂的过程。

xml动态编写sql

减少jdbc代码量

与数据库兼容性好

sql语句编写工作量大，依赖于数据库类型

mapper十分依赖数据库结构

Hibernate对象/关系映射能力强，无需编写sql，数据库无关性好，对于关系模型要求高的软件，如果用hibernate开发可以节省很多代码，提高效率。

`#{}`可以消除sql注入，调用了PreparedStatement的set方法， PreparedStatement利用预编译的机制将sql语句的主干和参数分别传输给数据库服务器,从而使数据库分辨的出哪些是sql语句的主干哪些是参数,这样一来即使参数中带了sql的关键字,数据库服务器也仅仅将他当作参数值使用,关键字不会起作用,从而从原理上防止了sql注入的问题。由于使用了预编译机制,执行的效率要高于Statement
`${}`直接拼接了字符串

Mapper 接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Mapper接口生成代理对象proxy，代理对象会拦截接口方法，转而执行MapperStatement所代表的sql，然后将sql执行结果返回。


先生成一个sqlsession对象： sqlsession = sqlsessionfactory.opensession(executortype.batch);

使用sqlsession访问mapper接口生成一个mapper：namemapper mapper = sqlsession.getmapper(namemapper.class);

使用mapper进行数据库操作，自增长的主键会自动设置到输入的参数对象中

在resultMap中配置association来引用其他pojo

嵌套查询是先查一个表，根据这个表里面的结果的 外键id，去再另外一个表里面查询数据,也是通过association配置，但另外一个表的查询通过select属性配置。

在session中使用一级缓存，使用HashMap且默认打开

二级缓存可自定义存储源，作用域为mapper，在mapper中设置cache开启，默认不开启，需要实现序列化
