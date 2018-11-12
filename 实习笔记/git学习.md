<font size="4">

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

## 分支

* `git branch` : 查看分支

* `git branch {分支名}` : 创建新分支

* `git checkout {分支名}` : 切换分支

* `git merge {分支名}` : 将目标分支合并到当前分支

* `git branch -d {分支名} : 删除指定分支
</font>
