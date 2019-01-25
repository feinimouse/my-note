<font size="4">

# Docker入门.md

by 菲尼莫斯 2019年01月12日

---

## 最新ubuntu安装docker

1. 引用国内最新最快的源

2. `sudo apt install docker`

## docker启动流程

* 检查本地是否存在指定的镜像,不存在就从公有仓库下载;
* 利用镜像创建一个容器,并启动该容器;
* 分配一个文件系统给容器,并在只读的镜像层外面挂载一层可读写层;
* 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中;
* 从网桥的地址池配置一个 IP 地址给容器;
* 执行用户指定的应用程序;
* 执行完毕后容器被自动终止。

## docker命令:镜像

通用参数：`--no-trunc`：控制台打印是否对过长的内容进行截断

### pull拉取镜像

`docker pull [仓库名/][镜像名][:镜像TAG]` 

* 若不填仓库名则默认从docker hub拉取镜像

* 若不填镜像Tag则默认为latest，拉取最新的镜像

* 示例`docker pull ubuntu:14.04`

### images查看镜像

* `docker images`：默认查看所有镜像

* `docker images -a`：查看所有镜像，包括临时文件

### tag添加标签（别名）

`docker tag [镜像:tag] [新名字:tag]`


### inspect查看详情

`docker inspect [镜像]`

### history查看镜像具体每层的组成

`docker history [镜像]`

### search搜索远程仓库中的镜像

`docker search [关键字]`

### rmi删除镜像

`docker rmi [镜像:tag 或 镜像ID]`

* 应先删除镜像的容器再删除镜像本身，无法删除有容器运行的镜像

* 有多个tag的镜像，删除时只会删除该tag不会删除镜像本身

### commit基于容器创建镜像

`docker commit [option] [已有镜像:tag 或 已有镜像ID] [镜像:tag 或 镜像ID]`

* -a, --author="":作者信息;
* -c, --change=[]:提交的时候执行 Dockerfile指令,包括CMD|ENTRYPOINT|ENV|EXPOSE|LABEL|ONBUILD|USER|VOLUME|WORKDIR等;
* -m, --message="":提交消息;
* -p, --pause=true:提交时暂停容器运行。

### 基于模版创建镜像

导入容器快照：`docker import [option] [file] [name:tag]`

### save导出镜像

`docker save -o ubuntu_14.04.tar ubuntu:14.04`

### load导入镜像

`docker load --input ubuntu_14.04.tar`

## docker命令:容器

容器在镜像之上运行，不会改变镜像的内容，所有改变在容器层进行

### 创建容器

* `create [option] [镜像]`：创建容器但不启动

* `相关设置：docker create --help`

* start命令启动容器

* run命令 = create + start

* 常用命令：
    * -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；

    * **-d: 后台运行容器，并返回容器ID；**
     
    * **-i: 以交互模式运行容器，通常与 -t 同时使用；**
     
    * **-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；**

    * **-p: 端口映射，格式为：主机(宿主)端口:容器端口**

    * **-v: 文件映射，将容器的指定文件路径映射到宿主机文件路径，格式为：宿主机文件路径:容器文件路径**

    * **--rm: 运行结束后自动删除容器**

    * **--expose:** 暴露容器的端口，可以直接访问容器ip下的该端口
     
    * --name="nginx-lb": 为容器指定一个名称；
     
    * --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
     
    * --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
     
    * -h "mars": 指定容器的hostname；
     
    * -e username="ritchie": 设置环境变量；
     
    * --env-file=[]: 从指定文件读入环境变量；
     
    * --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
     
    * -m :设置容器使用内存最大值；
     
    * --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
     
    * --link=[要链接容器名]: 添加链接到另一个容器；
        * 在当前容器中可以通过 `env | grep [要链接的容器名]` 查看链接的状态
        * link链接后当前容器会自动将 **域名** [要链接的容器名]映射到目标容器，可使用`ping [要链接的容器名]`等类似的网络操作
     
    * --expose=[]: 开放一个端口或一组端口；

### 容器的状况

`docker ps -a`：查看所有容器

`docker logs [容器ID]`：打印后台运行容器的日志

`docker stop [容器ID]`：终止一个容器的执行

`docker start [容器ID]`：启动一个终止的容器

`docker restart [容器ID]`：先终止容器再启动容器

`docker rm [容器ID]`：删除容器

`docker port [容器ID]`：查看指定容器的端口配置

* -f 强制删除
* -v 删除挂载的数据卷
* -l 删除链接但保留容器

### 进入容器

`docker attach [option] [容器ID]`：同步打开容器，使用`ctrl + p && crtl + q`退出，并使其继续运行

`docker exec [option] [容器ID]`：异步打开容器

`docker exec -it ftpd_server /bin/bash`：此时容器仍在运行其程序，但可以进入bash进行操作

* -i,--interactive=true| false:打开标准输入接受用户输入命令,默认为false;

* -t,--tty=true| false:分配伪终端,默认为false;

* - u,--user="":执行命令的用户名或ID。

* --privileged=true| false:是否给执行命令以高权限,默认为false;

### 导出容器

`docker export -o [导出的文件.tar] [容器]`

## dockerfile入门

### go环境docker示例：

```dockerfile
# from表示docker基于的基础镜像，如ubuntu
FROM buildpack-deps:jessie-scm

# maintainer 表示创建者信息
MAINTAINER image_creator@docker.com

# run 表示在基础镜像的基础上运行的命令，每一个run会为镜像添加一层
RUN apt-get update && apt-get install -y --no-install-recommends \

# run命令使用 && 来分割， \ 来换行
    g++ \
    gcc \
    libc6-dev \
    make \
&& rm -rf /var/lib/apt/lists/*

# env 可以设置环境变量，该环境变量在创建使用后仍可调用
ENV GOLANG_VERSION 1.6.3
ENV GOLANG_DOWNLOAD_URL https://golang.org/dl/go$GOLANG_VERSION.linux-amd64.tar.gz
ENV GOLANG_DOWNLOAD_SHA256 cdde5e08530c0579255d6153b08fdb3b8e47caabbe717bc7bcd
    7561275a87aeb
RUN curl -fsSL "$GOLANG_DOWNLOAD_URL" -o golang.tar.gz \
    && echo "$GOLANG_DOWNLOAD_SHA256 golang.tar.gz" | sha256sum -c - \
    && tar -C /usr/local -xzf golang.tar.gz \
    && rm golang.tar.gz
ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH
RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

# workdir为后续的RUN、CMD和ENTRYPOINT 指令配置工作目录
WORKDIR $GOPATH

# cmd表示容器的启动命令（会被docker run的命令覆盖）
COPY go-wrapper /usr/local/bin/

```

### 其他命令

* EXPOSE 22 8080 8843 
声明docker要使用并暴露的端口，需要在运行容器时使用-p来进行外部端口映射

* `ADD ~/workspace/docker/*.cpp /code/`
将宿主机指定目录（若为相对路径，则相对位置为dockerfile的位置；还可以是url和tar文件的自动解压）下的文件复制到容器的指定位置

* COPY命令和ADD命令相同，只能对本地文件进行操作，不能使用url

* CMD命令启动容器会被`docker run`命令覆盖，而使用ENTRYPOINT命令则不会覆盖，但会被`docker run--entrypoint`覆盖；`docker run`和CMD还可以向其中传递参数；

* `VOLUME ["/data"]`创建一个挂载点

* `ARG [name] [=<default value>]` 指定一些局部变量，这些值可以在docker build时使用 `--build-arg [name]=[value]`来进行赋值

### 编译dockerfile

`docker build [option] [路径]`
`docker build -t feinimouse/ubuntu:first ~/workspace/docker/ubuntu` 扫描整个路径下的dockerfile并创建镜像feinimouse/ubuntu:first

## docker 间的互联

### 通过宿主机分配ip直连

```bash
# 服务器暴露80端口
root@container:/$ docker run -itd --name=server --expose=80 --rm test:server /bin/bash
# 服务器使用命令获取ip 172.17.0.2 (ifconfig命令在包net-tools中）
root@server:/$ ifconfig
# 客户端使用ip进行访问 (ping命令在包inetutils-ping中)
root@client:/$ ping 172.17.0.2
```
### 通过`--link`桥接

```bash
# 服务器直接启动
root@container:/$ docker run -itd --name=server --rm test:server /bin/bash
# 客户端通过--link链接服务端容器
root@container:/$ docker run -itd --name=client --link=server --rm test:client /bin/bash
# 客户端使用容器名进行访问
root@client:/$ ping server
```
### 通过自定义网络进行桥接

```bash
# 创建一个测试网络
root@container:/$ docker network create test
# 查看已有的docker网络
root@container:/$ docker network ls
# 将服务端和客户端都加入测试网络
root@container:/$ docker run -itd --name=server --net=test --rm test:server /bin/bash  
root@container:/$ docker run -itd --name=client --net=test --rm test:client /bin/bash
# 客户端使用容器名进行访问
root@client:/$ ping server
```

</font>
