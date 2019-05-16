

# css文字小节

by 菲尼莫斯  2018年9月20日

---

## 字体
font

 * 字体族
```css
.custom-font {
  /* SansSerif 无衬线字体 ；monospace 等宽字体*/
  font-family: "Microsoft YaHei UI Light" ,SansSerif monospace;
}
```

 * 自定义字体
```css
@font-face {
    font-family: custom-font;
    src: url("./custom.ttf");
}
.custom-font {
    font-family: custom-font;
}
```

## 行高
line-hight

* 不影响inline元素的高度和对齐
* 会改变外部容器的高度
* inline元素在过高的line-height时默认垂直居中
* inline元素默认基于 **基线** 对齐
* 用vertical-alin可以改变 **某一个** inline元素的对齐方式
* 底线和顶线指的是inline元素的顶部和底部，不是文字的顶部和底部

## 滚动条

```css
.test{
    /*自动隐藏滚动条*/
    overflow: auto;
    /*显示滚动条*/
    overflow: scroll;
    /*隐藏超出的文字*/
    overflow: hidden;
    /*超出的部分溢出*/
    overflow: visible;
}
```

## icon

* 从 http://www.iconfont.cn 挑选想要的icon
* 网站会将所有选中的icon自动编译打包，下载iconfont的压缩包
* 将字体文件放入一个文件夹，并用css引用
* 引用方式：（icon对应的值可在网站上查看）
```less
// 该部分可以从iconfont的压缩包的iconfont.css中直接复制
@font-face {font-family: "iconfont";
  src: url('../../font/iconfont.eot?t=1538051959182'); /* IE9*/
  src: url('../../font/iconfont.eot?t=1538051959182#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:....') format('woff'),
  url('../../font/iconfont.ttf?t=1538051959182') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../../font/iconfont.svg?t=1538051959182#iconfont') format('svg'); /* iOS 4.1- */
}

// @icon处填上图标对应的值即可
.iconfont{
  font-size: @font-size;
  font-family: "iconfont", sans-serif !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:before {
    content: @icon;
  }
}
```

## 多余部分显示省略号

* 元素必须具有block属性
* 元素必须有有宽度的限制
* 元素内的文字不能换行
* css:

```css
.contain{
  /* 文字不换行，除非遇到<br> */
  white-space: nowrap;
  /* 超出部分文字隐藏 */
  overflow: hidden;
  /* 超出部分显示省略号 */
  text-overflow: ellipsis;
}
```

* 关于white-space：

声明建立布局过程中如何处理元素中的空白符

| 可用值 |属性|
| ----- | ----- |
| nowrap | 遇到 `<br>` 前，文本不会换行。|
|normal|忽略空白|
|pre-wrap|保留空白|
|inherit|继承|


