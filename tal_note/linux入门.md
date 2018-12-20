<font size = "4">

# linux入门

by 菲尼莫斯 2018年10月31日

---

## 推荐安装

* chrome : 前端必备，官网下载，apt可能可以直接安装

* 搜狗输入法 : 看个人习惯，官网下载，设置输入法为Fcitx布局

* Remmina : 远程桌面Linux版，方便连接云服务器和windows电脑

* vim : linux下的进行编程的IDE

* atom & vscode : 方便结构浏览和代码预览，也可以直观的处理一些目录层级关系

* uget : 传说中的迅雷linux版，用于加快速度下载java、python、mysql、mongodb等

* ondrive-d : onedrive linux版，用于同步onedrive数据（百度云和icloud用户可以忽略）

## vim推荐插件

* pathogen.vim : 可以便捷的添加和管理vim的各类插件

* emmet-vim : 快速创建html: 输入类似“html5:”,“div.#idname\>ul.className\>li.class$\*3”的命令，使用快捷键ctrl+y，和“，”来自动生成代码。

* vim-multiple-cursors : 可以对内容进行多行编辑的插件，[详见此处](https://github.com/terryma/vim-multiple-cursors)

* NERDTree : 可以显示项目的结构树,切换文件更方便，[详情见此](https://github.com/scrooloose/nerdtree)

* vim-airline & vim-bufferline: 对buffer和tab的管理更加方便

* YouCompleteMe : 强烈推荐自动代码补全插件

* markdown-instant : 用于markdown的预览插件

## 基本操作

* touch {name} : 创建文件

* mkdir {name} : 创建文件夹

* mv {old} {new} : 移动文件或文件夹,经常用于重命名文件  

* rm {name} : 删除文件
  * -r(递归删除)
  * -f(强制删除) 一般使用-rf

* cp {name} {location} : 复制文件
	* -a(粘贴所有目录)
	* -i(询问是否覆盖)
	* -u(以新文件替换旧文件)

* pwd 查看当前文件夹的绝对路径

* 多命令：使用&&隔开

* 换行输入命令：使用"\\ + enter"


## 常用命令

### find : 搜索

`find ${path} -${option}`

* path 表示要搜索的文件路径，默认为当前文件夹

* 简单示例: find ./path -name "学习.md"

* -name xx: 文件名符合xx的文件

* -amin xx, -atime xx: 在过去xx分钟/xx天内被读取过的文件

* -cmin xx, -ctime xx: 在过去xx分钟/xx天内被修改过的文件

* -type 
    * d: 匹配目录
    * f: 一般文件 

* 待补充

### grep : 搜索字符串

`grep -${type} "${字符}" ${文件名}`

* -r : 递归搜索，可以搜索文件夹

* -E ：开启扩展（Extend）的正则表达式。

* -i ：忽略大小写（ignore case）。

* -v ：反过来（invert），只打印没有匹配的，而匹配的反而不打印。

* -n ：显示行号

* -w ：被匹配的文本只能是单词，而不能是单词中的某一部分，如文本中有liker，而我搜寻的只是like，就可以使用-w选项来避免匹配liker

* -c ：显示总共有多少行被匹配到了，而不是显示被匹配到的内容，注意如果同时使用-cv选项是显示有多少行没有被匹配到。

* -o ：只显示被模式匹配到的字符串。

* --color :将匹配到的内容以颜色高亮显示。

* -A  n：显示匹配到的字符串所在的行及其后n行，after

* -B  n：显示匹配到的字符串所在的行及其前n行，before

* -C  n：显示匹配到的字符串所在的行及其前后各n行，context

### ls : 显示目录结构
* -a 显示隐藏文件
* -l 列出详细信息
* -r 将文件以相反次序显示(原定依英文字母次序)
* -t 将文件依建立时间之先后次序列出
* -A 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
* -F 在列出的文件名称后加一符号；例如可执行档则加 "\*", 目录则加 "/"
* -R 若目录下有文件，则以下之文件亦皆依序列出

### tar 压缩包管理

* -c: 建立压缩档案
* -x：解压
* -t：查看内容
* -r：向压缩归档文件末尾追加文件
* -u：更新原压缩包中的文件
* -z：有gzip属性的
* -j：有bz2属性的
* -Z：有compress属性的
* -v：显示所有过程
* -O：将文件解开到标准输出

**最常用参数：** -f：表示对某文件进行操作，加了该参数其后才可以跟文件名。


### chmod 改变权限

**基本使用：** `chown [-cfhvR] [--help] [--version] user[:group] file`

* user : 新的文件拥有者的使用者 ID
* group : 新的文件拥有者的使用者组(group)
* -c : 显示更改的部分的信息
* -f : 忽略错误信息
* -h :修复符号链接
* -v : 显示详细的处理信息
* -R : 处理指定目录以及其子目录下的所有文件
* --help : 显示辅助说明
* --version : 显示版本

### curl 下载和上传

利用url进行文件传输的工具，或利用url进行http操作

[详情见此](https://www.cnblogs.com/duhuo/p/5695256.html)

### 进程管理

* ps : 显示当前的用户进程 
    * 列表项：pid 表示进程编号
    * 列表项：tty 表示进程的位置
    * 列表项：cmd 表示进程名

* ps -a : 显示所有的进程，-ax : 显示没有终端的进程

* ps -u {username} : 根据用户过滤进程

* ps -ef : 显示所有进程，以全格式显示

* pstree : 显示进程树

* top : 实时显示进程对资源的运用情况，htop : 更加强版的任务管理器

* kill {pid} : 结束进程
    * -9 : 强制结束

## 一些实用操作

* 在vim中 : ctrl + z 返回终端

* 在终端中 : jobs 查看运行中的任务

* 在终端中 ： fg + 任务num 返回正在运行的任务

## cat命令

* cat filename: 将整个文件打印至终端

* cat > filename: 将之后的键盘输入内容保存至新文件中，在空行用ctrl + c结束输入

* cat file1 > file2: 将file1内容追加至file2末尾，在cat后使用-s以删除两行以上的空白行

* cat file1 file2 > newfile: 将file1，file2合并至新文件file中

</font>
