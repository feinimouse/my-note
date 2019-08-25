---
title: html学习
author: 菲尼莫斯
date: 2018-11-06
tags:
- html
categories:
- 前端
---

# html学习

by 菲尼莫斯 2018年11月06日

---

## 一个html5的构成

```html
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>html5</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--响应式-->
        <meta name=viewport content="width=device-width, initial-scale=1"/>
        <!--设置元素的默认属性，这里将a标签的目标为打开新窗口，base还可以指定该页面相对url的基础url-->
        <base target="_blank"/>
        <link rel="stylesheet" type="text/css" href="mystyle.css" />
        <script type="text/javascript" charset="utf-8" src="index.js"></script>
        <style>
            body {
                padding: 0;
            }
        </style>
    </head>
    <html>
    <body>
        <header></header>
        <main></main>
        <footer></footer>
    </body>
</html>
```

## 易忽略的元素

列举了一些学习中发现的，在以前的实践中很少用到，甚至根本没用到的元素

### 上标和下标

sup: 内联元素，为文字添加上标。

多用于数学公式中，如 x<sup>2</sup>+y<sup>2</sup>=(x+y)(x-y)写为如下：

```html
x<sup>2</sup>+y<sup>2</sup>=(x+y)(x-y)
```

与之对应的是内联元素 sub 表示下标

### 引用

blockquote: 块级元素，表示一大段引用文字，浏览器默认样式为缩进。

该元素有明确的语义，不应该为了样式表现而使用该元素，在layui框架中，该元素有一个漂亮的样式。然而在2.0版本之前，官网的示例文档中将其作为标题的样式，以至于很长的一段时间，作者都在使用blockquote作为标题的展示，其实这是十分不正确的做法，我们应该用css来控制样式，充分地考虑html的语义化。

与之对应的是q元素，是一个表示引用的内联元素


这两个元素都具备一个cite属性，指明了引用的来源。

当然cite自己本身也是一个元素，签通常表示它所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题。

接下来我们就来引用一段文字试试：

>按照惯例，引用的文本将以斜体显示。
>用 \<cite\> 标签把指向其他文档的引用分离出来，尤其是分离那些传统媒体中的文档，如书籍、杂志、期刊，等等。如果引用的这些文档有联机版本，还应该把引用包括在一个 \<a\> 标签中，从而把一个超链接指向该联机版本。
>\<cite\> 标签还有一个隐藏的功能：它可以使你或者其他人从文档中自动摘录参考书目。我们可以很容易地想象一个浏览器，它能够自动整理引用表格，并把它们作为脚注或者独立的文档来显示。\<cite\> 标签的语义已经远远超过了改变它所包含的文本外观的作用；它使浏览器能够以各种实用的方式来向用户表达文档的内容。


### 语义化的装饰

* ins: 内联元素，表示填上(插入)的内容，表现为下划线

* del: 内联元素，表示删除的内容，通常和ins配合使用，表示更正，表现为一条穿过文字的线，作为s元素的替代

* em: 内联元素，表示强调，表现为斜体，作为i元素的替代（作者喜欢把i元素用作iconfont的图标）



