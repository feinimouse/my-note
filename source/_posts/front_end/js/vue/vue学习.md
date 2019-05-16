---
title: vue学习
author: 菲尼莫斯
date: 2018-10-14
tags:
- vue
categories:
- 前端
---

# vue学习

by 菲尼莫斯  2018年10月14日

---

## vue 生命周期

* beforeCreate: 在实例初始化之前

* created：在实例初始化后,模板渲染之前

* beforeMount：在模板渲染完成之后，挂载之前

* mounted：挂载之后

* beforeUpdate：数据更新后，重新渲染并挂载之前

* updated：当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

![生命周期](./vue生命周期.png)

## vue入门

* 组件（vue实例）的创建：

```js
// 创建实例
var app = new Vue({});
// 创建全局组件
var app = Vue.component({});

// 传入参数
var setting =  {


    // 指定挂载的位置
    // 如果 render 函数和 template 属性都不存在，挂载 DOM 元素的 HTML 会被提取出来用作模板，此时，必须使用 Runtime + Compiler 构建的 Vue 库。
    el:"#app",


    // 指定绑定的数据，可直接通过 app.value或者app.$data.value来访问
    data:{
        message:"Hello Happy World !"
    },


    // 挂载的内容
    // 会用template覆盖挂载容器的所有内容
    template:`<div>{{message}}</div>`,


    // 接收来自父组件的参数
    props：{
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0
        }
      }
    },


    // 实例所包含的方法
    methods: {
      // 不能使用箭头函数，否则this将指向undefined而不是vue实例本身
    plus: function () {
      this.a++
    }
  },


  // 用于渲染.vue文件，或者js化的html
  // Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
  // 简写 render:h=>h(compponent)
  render: function (createElement) {
    return createElement(
      // 挂载一个h(level)级的标题
      'h' + this.level,   // 标签名称
      // 标题中包含一个<slot></slot>插槽组件
      this.$slots.default // 子元素数组
    )
  },

}
```


* 使用vue控制一个div容器：

> 摘自[vue官网](https://cn.vuejs.org/v2/guide/)


```html
<div id="app">
</div>

<script>
// vue的初始化（实例化一个vue对象）
const app = new Vue({
    el:"#app",
    // vue中使用{{}}来书写变量和js语句
    template:`<div>{{message}}</div>`,
  // 指定容器中绑定的变量
    data:{
        message:"Hello Happy World !"
    }
})
</script>
```

## vue指令

### 常用属性

#### v-bind：绑定vue中的数据或者js表达式到元素

动态地绑定一个或多个特性，或一个组件 prop 到表达式。

在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。

示例：

```html
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">

<!-- 缩写 -->
<img :src="imageSrc">

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定一个有属性的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- 通过 prop 修饰符绑定 DOM 属性 -->
<div v-bind:text-content.prop="text"></div>

<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>

<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

#### v-for：循环

```html
<!--对items数组进行循环-->
<div v-for="(item, index) in items">
  {{item}} - {{index}}
</div>
<!--对对象进行循环-->
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>
```
与kek属性配合使用，提高vue的稳定性

```HTML
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>
```

#### v-on：监听元素事件

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event 属性：v-on:click="handle('ok', $event)"。

可监听默认事件：如click、keyup

示例：

```html
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
```

可用修饰符：

  * .stop - 调用 event.stopPropagation()。

  * .prevent - 调用 event.preventDefault()。

  * .capture - 添加事件侦听器时使用 capture 模式。

  * .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

  * .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。

  * .native - 监听组件根元素的原生事件。

  * .once - 只触发一次回调。

  * .left - (2.2.0) 只当点击鼠标左键时触发。

  * .right - (2.2.0) 只当点击鼠标右键时触发。

  * .middle - (2.2.0) 只当点击鼠标中键时触发。

  * .passive - (2.3.0) 以 { passive: true } 模式添加侦听器。




### 填充元素内容

#### v-text : 给元素填充一段不解析html的文字

```html
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```
#### v-html : 给元素填充一段解析为html的内容

**注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译, scoped 的样式也不会应用在 v-html 内部** 。如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。

> 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。


### 隐藏和展示

* v-show：根据表达式之真假值，切换元素的 display CSS 属性。


* v-if：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定或组件被销毁并重建。如果元素是 \<template\> ，将提出它的内容作为条件块。

* v-else和v-else-if ：搭配v-if使用的条件判断



