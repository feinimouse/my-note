

# git使用小结

by 菲尼莫斯 2018年11月12日

---

## git的初始化

* `git init` : 以当前文件夹作为根文件夹，并进行git初始化

* .gitignore文件 : 该文件规定了不被纳入git版本控制的文件或文件夹，运用`#`进行注释

## 将文件纳入版本管理

* `git add {文件名}` : 将指定的新文件或修改后的文件纳入git版本管理

* `git add -A` : 将所有新的或修改后的文件纳入版本管理

* `git rm {文件名}` : 撤销add添加的文件

## 提交修改

* `git status` : 查看git add的文件和未add的文件，及其修改状态

* `git commit` : 将所add后的文件进行提交，git将进入新版本

## 修改恢复

* `git log` : 查看提交记录

* `git reset {commit id} {版本号}` : 将add的和commit的内容恢复到本地，保留本地修改的文件

* `git reset {commit id} --soft {版本号}` : 保留add的内容,将commit的内容恢复为add，保留本地修改的文件

* `git reset {commit id} --hard {版本号}` : 恢复到指定提交，并删除改变的文件

* `git reset {commit id} {版本号} {文件名}` : 对某个文件执行以上操作

* `git reset HEAD` : 撤销上一次add

* `git checkout -- {文件名}` : 将指定文件恢复为修改前（上一次commit）时的状态

## 分支

* `git branch` : 查看分支

* `git branch {分支名}` : 创建新分支

* `git checkout {分支名}` : 切换分支

* `git merge {分支名}` : 将目标分支合并到当前分支

* `git branch -d {分支名} : 删除指定分支

## 拉取

* `git clone {远程地址} {目标路径}` : 将远程仓库的整个拉取到本地，需要在本地还没有项目的时候使用
    * --recursive : 同时拉取项目中所依赖的所有子git模块 （git中的git）

* `git pull origin {远程分支}` : 将远程远程仓库的指定分支的commit下载到本地，并和当前分支执行merge

* `git fetch origin {远程分支}` : 将远程仓库的指定分支（默认master）下载到本地仓库

* `git fetch orgin {远程分支}:{新建本地分支}` : 拉取远程仓库的分支到新建的一个本地分支

## 合并

* `git merge {要合并的分支}` : 将指定分支内容合并当前分支，完成后本分支将成为最新

* `git rebase {要rebase的分支}` : 将当前分支的所有commit重放到要rebase的分支上

## 连上github

1. 使用ssh_genkey命令生成本机的秘钥（windows下需使用使用git提供的MSysGit包）

`ssh-keygen -t rsa -C "yourEmail@your-email.com"`

2. 密钥公钥默认生成在：`~/.ssh/id\_rsa.pub` 文件中

3. 如果设置了密码，则在每次使用该秘钥的时候都需要输入密码

4. 将id_rsa.pub中的公钥添加到你的github账号下的ssh中

ps : 记得安装git的时候配置email和name，这样在使用github的时候才会自动访问配置好的秘钥：

```bash
 git config --global user.name "your name"

 git config --global user.email "your e-mail"
```


