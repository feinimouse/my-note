---
title: css响应式小节
author: 菲尼莫斯
date: 2018-09-21
tags:
- css
categories:
- 前端
---

# css响应式小节

by 菲尼莫斯  2018年9月21日

---

## 基本原则

* 使用适配设备宽高的理想视口
```html
<meta name="viewport" content="width=device-width" />
```
* 禁用用户缩放
```html
<meta name="viewport" content="minimum=1.0
  ,maximum=1.0,user-scalable=no" />
```

## 媒体查询

### 基本应用

当屏幕宽度低于某一阈值时进行内容隐藏

```css
@media (max-width: 640px) {
    .test{
        display: none;
    }
}
```

### 常用属性

* width & height : 视口的宽高
* device-wigth & device-height ：设备的宽高
* orientation ： 屏幕的纵向和横向
* aspect-ratio ： 视口的宽高比
* device-aspect-ratio : 设备的宽高比
* color ： 显示颜色的位数bits，8位颜色，16位颜色
* resolution: 设备分辨率 300dpi



## 单位

* rem

```css
html {
    font-size: 10px;
}

.test {
    width: 100%;
    /* 1 rem = 1 font-size = 10px */
    height: 3rem;
}
```


