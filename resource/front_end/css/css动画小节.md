

# css动画小节

by 菲尼莫斯  2018年10月11日

---

## 补间动画

### 支持的css属性：

* 位置变换：

  1. position: left right top bottom

  2. margin, padding

  3. transform 位置相关属性

* 透明度变换 opacity

* 颜色变换 background-color

* 其他变换：transform 旋转、缩放、线性变换

### 实例

```css
.d1{
    height: 50px;
    width: 50px;
    background-color: #FF4081;
    /*transition补间动画 */
    /*动画的延迟触发时间*/
    /*transition-delay: 0.5s;*/
    /*指定动画绑定的属性*/
    /*transition-property: width;*/
    /*动画的持续时间*/
    /*transition-duration: 1s;*/
    /*简写：*/
    transition: width 1s,height 1.5s;
    /*动画执行的速度，默认是ease（先快后慢）*/
    transition-timing-function:linear;
}

.d1:hover{
    width: 150px;
    height: 150px;
}
```

## 关键帧动画

* 实现物块的摇动：

```css
.tran-shake{
  /*调用动画名，持续时间，执行速度*/
    animation: shake 500ms linear;
    /* 动画重复次数为无限次*/
    animation-iteration-count: infinite;
    @keyframes shake {
      /*设置每一帧的变化*/
        0%,50%,100%{
            transform: rotate(0deg);
        }
        25%{
            transform: rotate(10deg);
        }
        75%{
            transform: rotate(-10deg);
        }
    }
}
```



