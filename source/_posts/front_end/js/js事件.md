---
title: js事件
author: 菲尼莫斯
date: 2019-03-29
tags:
- js
categories:
- 前端
---

# js事件

by 菲尼莫斯 2019年3月29日

---

## 事件流

* 事件捕获阶段
    * 从最顶层元素doucment -> html -> body -> ... -> 触发元素的父级

* 事件冒泡阶段
    * 从触发元素 -> 触发元素父级 -> ... -> body -> html ->document
    * 最底层元素不会触发事件捕获，只触发冒泡

## 捕获事件

* 从html捕获：`on[事件名]` 用在html元素上
    * `<input type="button" onclick="console.log(event, this, type)" />`
    * 会生成一个封装元素属性的函数和作用域，该作用域包含`event事件`局部变量，`this`指向该html对象，`this`中的属性可以直接使用，就如同`with(this){}`

* （DOM0）从document中获取该元素的对象，添加`on[事件名]`名的函数，该函数和html事件直接写入的函数相同
    * 使用getElementById等方法获取元素
    * 通过设置null移除监听

* （DOM2）使用观察者模式监听并截获事件
    * 从document中获取元素对象，通过`元素.addEventListener(事件名，事件函数，事件阶段)`添加监听器
    * 事件阶段：true（捕获阶段）、false（冒泡阶段）
    * 通过removeEventListener移除监听
    * 事件函数：该函数和html事件直接写入的函数相同

* 使用event.stopPropagation()阻止向上冒泡和向下捕获

* 使用event.preventDefault()阻止默认事件，使用事件响应函数return false阻止默认事件


