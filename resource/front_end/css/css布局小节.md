<font size="4">

# css布局小节

by 菲尼莫斯  2018年9月21日

---


## display

### block

* 占据整行
* 可以设置宽高

### inline  

* 不占据一行
* 宽高不能设置，由内容决定
* 可修改元素垂直对齐方式


### inline-block

* 不占据一行
* 可以设置宽高
* 可修改元素垂直对齐方式

### flex

* 性质同block
* 指定在该元素中使用flex布局
* 子元素使用flex属性调整其在父元素中的占比

### visibility:hidden和display:none的区别

* display:none是完全消失，页面hover不到，并且造成其他属性没有效果

* visibility:hidden也是消失，但是存在于页面上，也hover不到，并不会影响别的属性。

* visibility:hidden 一般配合opacity和position使用，即要从消失到可以慢慢显现，必须用visibility而不是display



## postition

### static

* 默认方式
* 按html的文档流排列

### relative

* 按html的文档流排列
* 可设置left top等属性偏离原位置
* 偏离原位置时，不会改变原空间
* 偏离原位置时，不影响其他元素的位置，不影响其他元素的内容

### absolute

* 脱离html文档流
* 不和影响其他元素的位置，不影响其他元素的内容
* 定位相对于 relative 或 absolut 父级元素
* 通过设置left top等属性，设置其相对于父级元素（0,0）点的位置

### fixed

* 脱离html文档流
* 不和影响其他元素的位置，不影响其他元素的内容
* 定位相对于浏览器屏幕
* 通过设置left top等属性，设置其相对于浏览器屏幕（0,0）点的位置



## z-index

* 指定元素堆叠的层级
* 数值越小，元素置于越底层
* 子元素默认位于父元素上方
* 只对有 relative、 absolute、 fixed 属性的元素生效
* 文档流后的元素默认于文档流前的元素上方
* 子元素继承父元素的z-index, 且永不会超越

* **举个例子：**

```html
<div class="r1">
    <div class="d1">
        <span class="s"></span>
    </div>
</div>
<div class="r2"></div>
```

当样式为如下时：

```css
// 注意：以下css中均省略了position属性
.r1 {
    z-index: 1;
}

.r2 {
    z-index: 2;
}

.d1 {
    z-index: 0;
}

.d1::before {
    z-index: -1;
}

.d1 .s {
    // 注意：此时的r1子元素的z-index大于r2
    z-index: 3;
}
```

此时的效果为：

* r1 r2 决定了其子元素基础的z-index
* r2r2和其子元素永远位于r1上
* r1 < d1 < d1::before < s < r2
* 详细说明：

1. 子元素永远位于父元素上层，除非：

```css
.父元素{
  // 不设置z-index（不为负也不为0，直接不设置即可）
}

.子元素{
  // 设置z-index小于0
  z-index: -1;
}
```

2. before和after元素相当于子元素，但永远位于其他子元素上层，除非：

```css
// 此时before和子元素均位于父元素上层，但子元素大于before

.父元素{
  z-index: 0;
}
.子元素{
  // 大于0
  z-index: 1;
}
.父元素::before{
  // 小于0
  z-index: -1;
}

```

3. 当不设置z-index元素的默认层叠次序如下所示：

    d3 > d2 after > d2 before > d2 > d4 > d1

```html
<div class="d1">
    <div class="d2"></div>
    <div class="d3"></div>
    <div class="d4"></div>
</div>
```
```css
.d1{
    width: 100px;
    height: 100px;
    background-color: red;
}
    .d2{
        position: absolute;
        width: 50px;
        height: 50px;
        top:20px;
        left: 20px;
        background-color: green;
    }
    .d2:before{
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        bottom: -10px;
        left: 0;
        background-color: gray;
    }
    .d2:after{
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        bottom: -25px;
        left: 20px;
        background-color: pink;
    }
    .d3{
        position: relative;
        width: 50px;
        height: 50px;
        background-color: yellow;
    }
    .d4{
        width: 50px;
        height: 50px;
        background-color: blue;

    }
```



## float

### 性质

* 相对于父元素浮动
* 脱离html文档流，不占据父元素空间
* 不影响其他元素的位置
* **会对周围的inline元素造成影响** 从而影响其他元素的空间
* 带有该属性的inline元素可以设置宽高
* 在父容器宽度满足时，float元素会靠最左（右）和最上排列

### 父级元素清除浮动

* 设置overflow属性
* 在末尾添加，具有clear: both的子元素

## margin & padding

* 设置元素的外边距和内边距
* 当box-size设置为content-box时,padding的设置会直接改变元素整体的宽高
* 当box-size设置为border-box时，padding不会改变元素的宽高，而是压缩元素中的内容
* 当子父元素在同一个方向上有margin时，会发生margin的重叠
* 当同级元素之间相互有margin时，会发生margin重叠，例如：

```html
<style>
  .d1{
    margin-top: 10px;
  }
  .d2{
    margin-top: 5px;
  }
</style>

<!--此时d1的margin将覆盖d2的margin，只展现出10px的效果-->
<div class="d1">
  <div class="d2">
  </div>
</div>

```

解决方法有：

* 在父元素和子元素中加入一个过渡元素

```css
.father::before{
  display: table;
  content: " "
}
```

* 或在该方向上为父元素设置padding



</font>
