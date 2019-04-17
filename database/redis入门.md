# Redis入门

by 菲尼莫斯 2019年4月17日

---

(待总结)

## 引用

Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于内存亦可持久化的日志型、Key-Value 数据库，并提供多种语言的 API的非关系型数据库。

redis是单线程多路复用IO来保证高并发的

数据能够设置过期时间以保证热点数据的更新，可以淘汰已存在的热点数据更新缓存，淘汰策略如淘汰有过期时间的数据中访问最少的数据

CAP原则：
C - Consistent ，一致性A - Availability ，可用性P - Partition tolerance ，分区容错性

强一致性，最终一致性，原子性

同步原则：一个模块负责写，一个模块负责读，定期进行数据同步

数据类型：
字符串、键值对、列表、集合、有序集合

持久化：

RDB：redis data base快照

AOF：append-only file，保存了所有可能修改 Redis 内存数据的命令（也就是写命令），那么根据这些保存的写命令，我们可以重新恢复 Redis 的内存状态。

1、aof文件比rdb更新频率高，优先使用aof还原数据。

2、aof比rdb更安全也更大

3、rdb性能比aof好

4、如果两个都配了优先加载AOF

分布式框架redis-cluster，所有节点异步备份；
Twemproxy主从redis数据库，由监控节点来负责替换和管理

缓存穿透：大量请求没缓存的key，从而对后端造成压力；解决：缓存空key，或缓存从后端取回的数据或保存一张key表进行过滤

redis session：
解决并发下的session，又保障了存取速度，实现单点登录，持久化，管理在线用户，运用redis的过期时间管理session

在redis中存储session的键值对
