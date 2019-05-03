<font size="4">

# 为安装文件夹创建映射节省空间

by 菲尼莫斯  2018年9月14日

---

当C盘的数据容量不够，但其中的数据文件又不方便迁移的时候，我们可以采取如下手段

如C盘下，装有用geth同步的默认以太坊全部区块，十分占用空间。然而geth的数据存储路径改起来比较麻烦，我们希望保持默认路径不变，但又可以把区块迁移到D盘下。

**注意：所有操作需要用cmd完成，powershell会出现找不到命令的情况**

区块及相关数据默认的存放路径为

``` cmd
C:\Users\Quwer\AppData\Roaming\Ethereum
```

首先我们更改区块存储文件夹的名字为```Ethereum-backup```

```cmd
C:\Users\Quwer\AppData\Roaming>
ren Ethereum Ethereum-backup
```

接着在D盘创建一个迁移后的目录```Ethereum```

```cmd
C:\Users\Quwer\AppData\Roaming>
mkdir D:\Ethereum
```

将原位置的```Ethereum```目录映射到D盘的迁移目录

```cmd
C:\Users\Quwer\AppData\Roaming>
mklink /D Ethereum D:\Ethereum
```

可以看到Roaming文件夹内出现了一个Ethereum文件的快捷方式

我们只需把```Ethereum-backup```下的文件剪切到迁移目录```D:\Ethereum```下即可



</font>
