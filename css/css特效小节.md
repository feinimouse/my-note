<font size="4">

# css特效小节

by 菲尼莫斯  2018年9月27日

---

## box-shadow 阴影

```css
.d1{
  margin:100px;
  background-color: #FFFFFF;
  height: 100px;
  width: 100px;
  /* 参数： x轴偏移，y轴偏移，模糊的像素大小，扩展的像素大小，颜色 */
  box-shadow: 0 10px 10px 10px #AAAAAA;
  /*内阴影 inset: 注意内阴影的偏移值和外阴影相反*/
  box-shadow: inset 0 10px 10px 10px darkslategray;
}
```

## text-shadow 文字阴影

```css
.d1{
  margin:auto;
  background-color: #FFFFFF;
  font-size: 100px;
  /* 参数： x轴偏移，y轴偏移，模糊的像素大小，颜色 */
  text-shadow: 10px 10px 10px gray;
}
```

## border-radius 圆角

```css
.d1{
  margin:100px;
  background-color: #FFFFFF;
  height: 100px;
  width: 100px;
  /*常用圆角*/
  border-radius: 8px;
  /*圆*/
  border-radius: 50%;
  /*部分圆角 在水平方向的圆角为10px，在处置方向的圆角为20px*/
  border-radius: 10px 10px 10px 10px / 20px 20px 20px 20px;
}

```

</font>
