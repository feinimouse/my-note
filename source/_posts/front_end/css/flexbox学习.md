# flexbox学习

by 菲尼莫斯 2018年12月12日

---

## 关键属性

* flex-direction: 横轴方向，默认：**row**左到右

* justify-content：横向对齐方式，默认：**flex-start**左对齐

* align-content：纵向对齐方式，默认**flex-start**上对齐

* align-items：行内横向对齐基线，默认**flex-start**上对齐

## flex的基础

* 给父级元素添加 `display: flex` 属性，其子元素将可以使用flex属性

* 子元素将无法使用 `float` 和 `vertical-align` 特性

* `display: inline-flex` 可以使行内元素具备flex特性

## 基本用法

### 排布（父元素）

`flex-flow: ${flex-direction} ${flex-wrap}`

* 排布方向：flex-direction
  * row 从左到右
  * column 从上到下
  * row-reverse 从右到左
  * column-reverse 从下到上

* 换行方式: flex-wrap
  * nowrap 不换行
  * warp 换行

### 布局

子元素在flex-direction的对齐方式： **justify-content**
  * flex-start：左对齐
  * flex-end：右对齐
  * center：居中对齐
  * space-between：两端对齐
  * space-arround：不贴边的两端对齐

子元素竖向对齐方式： **align-items**
* 以下属性和vertical-align相似
  * flex-start、flex-end
  * center、baseline
* stretch：占满整个容器高度

当子元素换行时，子元素的行间对齐方式： **align-content**
  * 属性值和效果和justify-content一致
  * stretch：每一行高平均分配占满整个容器高度

## 子元素用法

* order：子元素的排序，序号越小的子元素将越靠前显示

`flex: ${flex-grow} ${flex-shrink} ${flex-basis}`:

* flex-grow：
  * 具有该属性的子元素将在flex-direction放大直到填满父元素的剩余空间
  * 默认值为0表示不进行放大
  * 多个具备该属性的元素将按照数值大小平均分配空间

* flex-shrink：
  * 具有该属性的元素将在空间不够时按照值的比例缩小
  * 默认值为1，值为0表示不缩小

* flex-basis：
  * 如果没有设置flex-basis属性，那么flex-basis的大小就是项目的width属性的大小
  * 如果没有设置width属性，那么flex-basis的大小就是项目内容(content)的大小
  * flex-basis会覆盖子元素的width，但无法覆盖max-width和min-width

* align-self: 覆盖父元素的align-items，改变自身的垂直对齐方式


