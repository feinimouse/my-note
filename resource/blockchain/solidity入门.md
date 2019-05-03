<font size="4">

# Solidity入门

by 菲尼莫斯 2018年12月20日

---

目前，以六种不同语言编写的以太坊协议有六个主要实现：Go（Geth），Rust（parity），C ++（cpp-ethereum），Python（pyethereum），Scala（mantis）和Java（harmony）

## 基本原理

* 以太坊地址分为外部地址eoa（Externally Owned Account 由人或者钱包操作）以及智能合约地址

* 以太坊合约是控制货币的程序，运行在名为EVM的虚拟机内。

* 将交易发到外部地址则进行普通的交易，若发到合约地址则会在EVM中执行合约

* 交易包含的数据将作为合约的输入，包含eth或其他数据，合约中的函数可以调用输入的参数

* 在区块链上注册合约涉及创建一个特殊交易，其目标是地址0x0000000000000000000000000000000000000000，也称为_zero address_。零地址是一个特殊的地址，告诉以太坊区块链你想注册一个合约。

## Solidity语言

### 一个简单的合约

```solidity
// version of solidity
pragma solidity ^0.4.19;

contract Faucet {
    function withdraw(uint amout) public {
        
        // limit condition
        require(amout <= 100000000000000000);
        
        // send ether
        msg.sender.transfer(amout);
    }
    
    // default function to receive eth
    function () public payable {}
    
}

```

* require(test)：为Solidity内部函数，test为真时程序将会继续运行，否则程序将会自动报错退出

* contract：类似class，声明一个合约

* msg：包含了交易的信息
    * sender：包含了交易请求者的信息
    * transfer函数表示将一定量的eth发送给交易请求者

* payable：表示该函数接受交易中的eth，或调用该函数要花费eth

* 无名函数为合约中的默认运行函数，称为fallbacke函数

* 交易中接受的eth将存到合约的地址中

* 在合约中执行的交易称为内部交易（也称message，不记在链上？）

</font>
