<font size="4">

# eos入门

by 菲尼莫斯 2019年01月30日

---

## eos的特性

* eos中用户能使用的网络资源、算力和存储空间和其持有的eos占全网的比例相关

* 通过“抵押”eos获得资源使用率，从而在eos网络中不再收取运行手续费

* eos中内置了IPFS从而保证了存储问题

* eos中不同的智能合约是在**账户层**并行处理的，即每个账户的所有智能合约享有一个线程

* 跨账户（线程）的智能合约通信也是并行的

* eos中内置并规定了所有DApp的标准化，类似于IOS系统规定了文件系统、账户、权限等，应用必须强制遵循这些标准

* 使用DPos共识，能够有效的升级整个系统

* 底层内置**自定义级的轻量化节点**，智能合约底层内置**权限系统**，底层内置**跨链通信机制**

* 出块时间：0.5s，一天的区块头数据：2M，证明数据：200B

* eos可以人为治理，冻结异常账户（不太赞同该理念）

## eosio的安装

* eosio是eos的官方实现，类似于客户端

* 直接从[github](https://github.com/EOSIO/eos)下载release版进行安装

* 详细操作可以阅读[官方开发者文档](https://developers.eos.io/eosio-home/docs/)

* eosio1.6.0由以下几个组件构成
    * nodeos : eos节点的守护进程
    * cleos : 控制eos的官方命令行工具，[官方文档](https://developers.eos.io/eosio-cleos/docs)
    * keosd : 对公私钥和钱包进行管理的工具
    * eosio-cpp : eosio.cdt的一部分，将c++合约编译为WASM（WebAssembly）

## 启动eosio

* 启动keosd : `keosd &`

* 启动单节点测试网络 : 
1. 在开发目录下的eosio目录中使用工作目录进行区块链数据和配置。这里我们分别使用eosio / data和eosio / config
2. 运行Nodeos。此命令加载所有基本插件，设置服务器地址，启用CORS(Cross-Origin Resource Sharing)并添加一些合同调试和日志记录。
3. 允许所有CORS跨域请求（请不要在公网环境下使用）

```shell
nodeos -e -p eosio \
--plugin eosio::producer_plugin \
--plugin eosio::chain_api_plugin \
--plugin eosio::http_plugin \
--plugin eosio::history_plugin \
--plugin eosio::history_api_plugin \
--access-control-allow-origin='*' \
--contracts-console \
--http-validate-host=false \
--verbose-http-errors \
--filter-on='*' >> nodeos.log 2>&1 &
```

* 查看nodeos的日志（出块信息） :  `tail -f nodeos.log`

* 查看钱包信息 : `cleos wallet list`

* 查看RPC(Remote Procedure Call) API 远程调用接口 : `curl http://localhost:8888/v1/chain/get_info`

</font>
