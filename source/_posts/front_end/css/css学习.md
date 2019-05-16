---
title: css学习
author: 菲尼莫斯
date: 2018-12-12
tags:
- css
categories:
- 前端
---

# css学习

by 菲尼莫斯 2018年12月12日

---

## min-content

该值指向了元素内 **最宽的不可折行的子元素** 的宽度

```css
div{
  max-width: 300px;
  max-width: min-content;
  margin-auto;
}

```

## margin: auto的替代

* 常规写法：使用margin: auto使得外包块container自动居中

```html
<footer>
  <div class="container"></div>
</footer>

<style>
  .class{
    max-width: 1000px;
    margin: auto;
  }
</style>
```
* 替代写法：内容通过padding内容自动居中

```html
<footer></footer>

<style>
  footer{
    padding: 1em calc(50% - 500px);
  }
</style>
```

## 浏览器是否支持某属性

思路：检查浏览器的element.style上是否存在该style的属性

```JavaScript

// 检查是否可用textshadow属性
if ('textShadow' in document.documentElement) {
    // 可以使用textshadow
} else {
    // 不能使用textshadow
}

```

```JavaScript

// 通用性方法改造
function test(property) {
    return new Promise((res,rej) => {
        if (property in document.documentElement) {
            res();
        } else {
            rej();
        }
    });
}

```

检查浏览器是否支持某属性中的某一具体值：

思路：创建一个隐藏元素并为该隐藏元素赋予该属性值，若浏览器不支持该属性值，将无法完成赋值操作，该值将为空。

```JavaScript

// 创建一个p元素，并为其style赋予要测试的属性值，若浏览器不支持，将无法完成赋值
function test(styleName,property) {
    return new Promise((res,rej) => {
        var temp = document.createElement('p');
        temp.style[styleName] = property;
        if (temp.style[styleName]){
            res();
        } else {
            rej();
        }
    });
}

```

## 使用半透明遮罩

在不使用预处理器进行数值计算时，需要对一个特定主题颜色的组件进行变色处理。为减少工作量，无需计算出目标主题色的所有配合色，而只改变主题色，其他配合色通过对主题色进行半透明的遮罩或者黑白叠加来实现。

```css

button{
    background-color: #c00;
    /* 半透明的黑色遮罩 */
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 0.5em 0.25em rgba(0,0,0,0.5);
    text-shadow: 0 -0.5em 0.5em rgba(0,0,0,0.5);
}

```

## 响应式的一些建议

* 使用vw(视口宽百分比）和百分比来控制组件的宽度

* 设置max-width适应大分辨率的屏幕

* img、video、ifream等替换型元素如果不设置 `max-width: 100%;` 很可能会直接超出父容器的范围

* 准备多个分辨率条件下的切图，而不是过分依赖css来改变页面上的图片显示大小（体会：在用户上传图片时，不要嫌麻烦，一定要进行存储大小的转换或限制，若一个icon的原图是一张1mb的图片，浏览器的缩放会让图片模糊成你不期望的样子，其对加载速度和带宽也会造成巨大的影响。）

* 固定组件的宽度，让视口的大小来控制每列显示的组件数量（虽然减少了代码量，但有时会出现右侧空间余留过多的问题）

## border-box、padding-box、content-box

* border-box: 盒子的width的计算包含border和padding

* padding-box: 盒子的width的计算包含padding但不包含border

* content-box: 盒子的width、padding、border单独计算

### 默认值

* background-clip: border-box 即背景图范围包括了边框和padding

background-clip表示背景图被裁剪的范围，content-box就表示裁剪掉content以外的背景

* background-origin: padding-box 即背景的原点为padding的左上角

background-origin表示背景图平铺的位置，如border-box即表示从边框的左上角开始平铺

* box-sizing: content-box 即盒子的宽高不包括边框和padding


## 其他

* 简写属性会覆盖之前的其他属性，使用在简写之后非简写的方式来达到某些属性的定制


