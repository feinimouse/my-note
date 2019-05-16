---
title: MongoDB入门
author: 菲尼莫斯
date: 2019-04-12
tags:
- mongodb
categories:
- 数据库
---

# MongoDB入门

by 菲尼莫斯 2019年4月12日

---

## NoSql基本

优点：
* 能够高并发读写
* 能够支持海量数据的存储和访问
* 高可扩展性和高可用性（大数据）
* 低成本

数据库类型：
* 键值对数据库：可以通过key快速查询
* 列存储数据库：方便存储结构化和半结构化数据，方便做数据压缩，对针对某一列或者某几列的查询有非常大的IO优势。
* 文档数据库：类json的格式存储，可以对某些字段建立索引
* 图形数据库

分布式支持：
* 高可靠性和容错性：一台服务器的奔溃不会影响到另一台
* 高可扩展性：能根据需要增加服务器
* 资源共享更为便利
* 高灵活性：安装、调试和扩展新的服务更为容易
* 性能、速度和计算能力更强

* 故障诊断和排除更难
* 网络负载更高，对通信质量要求更高
* 安全性下降

CAP原则：
* 数据一致性
* 系统可用性：高效，高并发
* 分区容忍性：系统中任意信息的丢失或失败不会影响系统的继续运作

## MongoDB基础

表在MongoDB中用集合（collection）来表示，一行则用一条文档（document）来表示

**文档中的字段是有序的，不能有重复的字段**

Capped collections 是固定大小的集合，结构是有序的，效率相对较高。

_id是文档的默认主键，可以是任何类型，默认为`ObjectId()`生成的对象

数据类型：
* String
* Integer
* Boolean
* Double
* Date
* Null
* 正则表达式

启动服务：`mongod --config [配置文件位置]`
* 安装为windows服务：
    * `--install`：install Windows service
    * `--remove`：remove Windows service
    * `--reinstall`：reinstall Windows service (equivalent to --remove followed by --install)
    * `--serviceName "Mongodb"`
    * `--serviceDisplayName "MongoDB"`

配置文件mongodb.conf

```properties
#日志文件位置
logpath=E:\ProgramData\mongo\log\mongodb.log

# 以追加方式写入日志
logappend=true

# 是否以守护进程方式运行
# fork =true

# 端口默认是27017
# port =27017

# 数据库文件位置
dbpath=E:\ProgramData\mongo\db

# 开启用户验证
auth=true

# 绑定服务端所有ip地址
bind_ip_all=true
ipv6=true
```

## 用户管理

查看当前数据库的用户：`show users`

创建用户：
* 创建管理员用户：`db.createUser({user:"root",pwd:"123456",roles:["root"]})`
* 创建其他用户：
```js
{
    user: "用户名",
    pwd: "密码",
    customData: {}, // 用户自定义的数据
    roles: [ // 权限级别
        { role: "操作权限", db: "数据库名" },
        "特定角色权限"
    ],
    authenticationRestrictions: [
        {
            clientSource: [], // 指定可连接服务器的访问用户的ip地址列表
            serverAddress: [] // 指定可连接服务器的服务器ip地址列表
        }
    ]
}
```

特定角色权限：
* read：可读当前数据库所有集合
* readAnyDatabase：可读所有数据库
* readWriteAnyDatabase：可读写任何数据库
* dbAdminAnyDatabase：可读写任何数据库以及清理、修改、压缩、获取统计信息和执行检查
* userAdminAnyDatabase：用户能够在任何数据库中创建和修改用户账户
* dbOwner：当前数据库的以上权限
* clusterAdmin：让用户能够管理MongoDB，包括连接、集群、复制、列出数据库、创建数据库、和删除数据库
* root：结合以上所有权限

修改用户：
* 改密码：`db.changeUserPassword(username, password)`
* 增加权限：`db.grantRolesToUser(username, [roles])`
* 删除权限：`db.revokeRolesFromUser( username, [ roles ])`

## 数据库操作：

连接：`mongodb://<用户名>:<密码> @ <host>:<port>, <host2>:<port> / <数据库名> ? <附加选项>`

数据库：
* 查看所有数据库：`show dbs`
* 查看当前数据库：`db`
* 切换/创建指定数据库：`use [数据库名（小写）]`
* 删除当前数据库：`db.dropDatabase()`

插入：`db.数据库名.insert({})`

查询：`db.数据库名.find(查询对象, 选项)`

更改：`db.数据库名.update(查询对象, 更新对象, 选项)`

## spring mongodb注解

spring-data-mongodb中的实体映射是通过MongoMappingConverter这个类实现的。它可以通过注释把java类转换为mongodb的文档。

它有以下几种注释：

@Id - 文档的唯一标识，在mongodb中为ObjectId，它是唯一的，通过时间戳+机器标识+进程ID+自增计数器（确保同一秒内产生的Id不会冲突）构成。

@Document - 把一个java类声明为mongodb的文档，可以通过collection参数指定这个类对应的文档。@Document(collection="mongodb") mongodb对应表

@DBRef - 声明类似于关系数据库的关联关系。ps：暂不支持级联的保存功能，当你在本实例中修改了DERef对象里面的值时，单独保存本实例并不能保存DERef引用的对象，它要另外保存，如下面例子的Person和Account。

@Indexed - 声明该字段需要索引，建索引可以大大的提高查询效率。

@CompoundIndex - 复合索引的声明，建复合索引可以有效地提高多字段的查询效率。

@GeoSpatialIndexed - 声明该字段为地理信息的索引。

@Transient - 映射忽略的字段，该字段不会保存到mongodb。

@PersistenceConstructor - 声明构造函数，作用是把从数据库取出的数据实例化为对象。该构造函数传入的值为从DBObject中取出的数据
