<font size="4">

# css装饰小节

by 菲尼莫斯  2018年9月20日

---

## 背景

### 通用

```css
.test{
    /*设置背景图*/
    background-image: url("./faceicon.jpg");
    /*设置背景图重复方式*/
    background-repeat: no-repeat;
    /*设置背景图在元素中的位置*/
    background-position: 50px center;
    /*设置背景图的大小*/
    background-size: 100px,100px;
    /*保持长宽比不变，覆盖整个画面*/
    background-size: cover;
    /*完整显示图片*/
    background-size: contain;
}

```

### 简写

```css
.test{
    /*设置背景图*/
    /*设置背景图重复方式*/
    /*设置背景图在元素中的位置，容器小于背景图大小，背景图将只能显示一部分，反之会导致背景图重复*/
    background: url("./faceicon.jpg") no-repeat 50px center;
    /*设置背景图 缩放 的大小，会导致背景图拉伸*/
    background-size: 100px,100px;
}
```


### 渐变

```css
.test {
    /*三色线性渐变 transparent表示透明色*/
    background: linear-gradient(45deg, white 0, transparent 50%, gray 100%);
  }
```

## 边框

### 通用

``` css
.test{
    /*颜色、宽度、实线*/
    border: #FFFFFF 1px solid;
}
```

### 背景图边框

border-image 属性

### 三角形

* 传统三角形

``` css
.test{
    /*等腰三角形*/
    width: 0;
    height: 0;
    border-bottom: gray 10px solid;
    border-left: transparent 10px solid;
    border-right: transparent 10px solid;
 }
```

* 阴影三角形

使用transform：rotate旋转一个菱形45度，并用其他块遮住菱形下半部分

</font>
