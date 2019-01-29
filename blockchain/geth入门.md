<font size="4">

# geth入门

by 菲尼莫斯 2019年01月29日

---

## geth安装

* github地址：https://github.com/ethereum/go-ethereum

* 本地编译需要有go语言环境以及c++编译环境

* 最简安装方法：
```bash
git clone https://github.com/ethereum/go-ethereum.git

cd  go-ethereum

# master是最新的不稳定版本
# git checkout {你想要的版本}

make geth

make all

# 查看geth版本
geth version
```

## 构建创世区块

### 创世区块配置

构建一个创世区块的初始化文件`genesis.json`

* chainId: 该条区块链的编号

* alloc: 初始化时区块中已存在的账户信息，可以为预设账户发放以太币

* coinbase: 私有链挖矿的收益账户

* difficulty: 初始的挖矿难度，越小难度越低

* gasLimit: 每个区块所包含的交易，消耗Gas的限制，用来限制每个区块能包含的交易信息总和，在私有链中可以填最大值

* mixhash: 与nonce配合用于挖矿，由上一个区块的一部分生成的hash。注意他和nonce的设置需要满足以太坊的Yellow paper中的条件

* timestamp: 创世区块的时间戳

* nonce: 挖矿时的辅助随机数

```json
{
    "config": {
        "chainId": 713,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "coinbase"   : "0x0000000000000000000000000000000000000000",
    "difficulty" : "0x400",
    "extraData"  : "",
    "gasLimit"   : "0x2fefd8",
    "nonce"      : "0x0000000000000042",
    "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp"  : "0x00",
    "alloc"      : {
        "0xb962f56ce7f476a845a062be2fb7c745a3ff1cff": {"balance": "4000000000000000000"},
        "0xe1b6036b384ddcf91cb9b1cde7fbe88d1ad39f07": {"balance": "5000000000000000000"}    
    }
}

```

### 创建账户

* 新建一个账户文件夹 `mkdir kasumi`

* 调用geth命令生成一个账户 `geth --datadir "./kasumi" account new` 

* 输入两次密码进行确认（密码不能修改）

* geth将会创建一个keystore文件夹，存储了用户的公私钥

* 创建成功后会返回用户地址

### 初始化创世区块

```bash
# feinimouse @ thinkpad-x270 in ~/workspace/eth-account [11:38:33] 
$ geth init ./kasumi/genesis.json --datadir ./kasumi/chain
INFO [01-29|11:39:49.768] Maximum peer count                       ETH=25 LES=0 total=25
INFO [01-29|11:39:49.788] Allocated cache and file handles         database=/home/feinimouse/workspace/eth-account/kasumi/chain/geth/chaindata cache=16 handles=16
INFO [01-29|11:39:49.901] Writing custom genesis block 
INFO [01-29|11:39:49.902] Persisted trie from memory database      nodes=3 size=409.00B time=234.956µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [01-29|11:39:49.903] Successfully wrote genesis state         database=chaindata                                                          hash=0e5c4c…bcf45a
INFO [01-29|11:39:49.903] Allocated cache and file handles         database=/home/feinimouse/workspace/eth-account/kasumi/chain/geth/lightchaindata cache=16 handles=16
INFO [01-29|11:39:50.019] Writing custom genesis block 
INFO [01-29|11:39:50.020] Persisted trie from memory database      nodes=3 size=409.00B time=194.026µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [01-29|11:39:50.021] Successfully wrote genesis state         database=lightchaindata                                                          hash=0e5c4c…bcf45a
```

* 该命令在kasumi下生成了一个创世区块，并将数据保存在kasumi/chain中

</font>
