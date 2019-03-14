<font size="4">

# path用法

by 菲尼莫斯  2018年7月19日

---

## 引入

```js
const path = require('path')
```

## join

该函数使用指定分隔符将参数中所有路径片段连接到一起，并返回normalize后的结果路径。如果连接的参数长度为0字符串，将会返回'.' , 表示当前工作目录

```js
path.join('路径1','路径2',...)

path.join('aaa','/bbb','./ccc.js');
-> 'aaa\\bbb\\ccc.js'


path.join('aaa','../bbb','ccc.js');
-> 'bbb\\ccc.js'
```

## resolve

该函数将一个路径序列或路径片段组从 **右向左依次拼接，直到构成一个绝对路径。** 如果处理完所有参数仍然没有构成一个绝对路径，就使用当前工作目录的绝对路径；结果返回的路径是经normalized后的，尾随斜线是没有的，除非是根路径；如果路径序列中没有可用的路径片段，该函数将返回当前工作目录的绝对路径；

```js


> path.resolve('aaa','bbb');
'E:\\Workspace\\Idea\\react2-study\\aaa\\bbb'

> path.resolve('aaa','/bbb');
'E:\\bbb'

> path.resolve('/aaa','../bbb');
'E:\\bbb'


```

## \__dirname和__filename

**__dirname** 指向当前执行文件所在的目录，如：'E:\\Workspace\\Idea\\react2-study\\aaa\\bbb'

**__filename** 指向当前执行文件所在完整路径：如：'E:\\Workspace\\Idea\\react2-study\\aaa\\bbb\\test.js'


</font>
