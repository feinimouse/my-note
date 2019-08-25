---
title: css选择器
author: 菲尼莫斯
date: 2018-10-05
tags:
- css
categories:
- 前端
---

# css选择器

by 菲尼莫斯  2018年10月05日

---

## 常用选择器

* \* ：选择全部元素
* A > B：选择A元素的子元素B（不包括孙元素）
* A + B：选择和A相邻的同级B元素
* A ~ B: 选择和A之后同级的B元素

## 属性

|选择器 |作用 |
|-----|-----|
|A[attr]| 带有属性attr|
|A[attr="xxx"]| 带有属性attr,且值为xxx|
|A[attr^="xxx"]| 带有属性attr,且值前缀为xxx|
|A[attr$="xxx"]| 带有属性attr,且值后缀为xxx|
|A[attr*="xxx"]| 带有属性attr,且值 **包含** xxx|
|A[attr~="xxx"]| 带有属性attr,且值是一组 **以空格分隔** 的单词，其中有独立单词为xxx|
|A[attr\|="xxx"]| 带有属性attr,且值前缀为xxx-或xxx|

## 伪类

 **常用伪类:**

 * :link 链接

 * :visited 访问过的链接

 * :hover 鼠标悬浮时

 * :active 被激活（按下鼠标时）

 * :focus 成为焦点（如输入框输入时）

 * **表单元素状态：** :enabled,:disabled,:checked

**子元素选择：**

 1. :first-child 第一个子元素, :last-child 最后一个子元素

 2. :nth-child(2) 第二个子元素, :nth-child(2n) 第偶数个子元素， :nth-of-type(2n) 允许被其他类型的元素隔断的第偶数个子元素

 3. :only-child 唯一的子元素， :only-of-type 唯一类型的子元素

 4. :not(input) 所有不是input的元素




