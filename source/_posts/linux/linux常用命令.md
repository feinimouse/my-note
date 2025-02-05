## 常用命令

### 磁盘占用排查

`du -h --max-depth=1 ${目录名}` 查看指定目录下个文件和目录的磁盘占用

`df -h` 查看各个系统目录的磁盘占用

### 系统配置

`lscpu` 查看cpu类型核数等信息

`free -h` 查看系统的内存大小

`vmstat 1` 实时查看cpu使用率和内存使用率

### 运维

`curl` 发送http请求
* `-v` 显示请求和返回的详情
* `-H '${请求头名称}: ${请求头值}'` 设置请求头
* `-X POST` 指定http请求方法
* `-d '${请求体}'` 指定请求体内容

`wc -l` 查看文件的行数

`top` 查看资源占用
* `M` 按照内存使用降序
* `P` 按照cpu使用降序
* `top -Hp <pid>` 查看某个进程下所有线程的资源使用情况
  * `-H` 显示进程内部的线程
  * `-p` 只查看特定pid的进程

### iptable

拒绝入访： `iptable -A INPUT -p tcp -s 10.0.168.1 --sport 443 -j REJECT`
* `-A INPUT` 入访
* `-p tcp` 指定tcp协议
* `-s ${ip}` 来源ip
* `--sport ${端口}` 来源ip的端口
* `-j REJECT` 拒绝请求
  * `-j DROP` 丢弃相关包

拒绝出访 `iptable -A OUTPUT -p tcp -d 10.0.168.2 --dport 8080 -j REJECT`
* `-A OUTPUT` 出访
* `-d ${ip}` 目标ip
* `--sport ${端口}` 目标ip的端口