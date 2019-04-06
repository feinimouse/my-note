<font size="4">

# react入门

by 菲尼莫斯 2019年4月6日

---

## 虚拟dom

* DOM是**浏览器**用于表示页面上的元素的js对象，提供了对元素进行操作的API

* 虚拟DOM是用**react**用js对象模拟出的页面元素，拥有自己的API，能够方便的进行DOM嵌套和数据传递，可以通过新旧DOM对比实现对浏览器DOM的高效更新

传统的dom更新方案中，通常需要重绘整个页面，而react实现了按需绘制页面的能力

react通过虚拟DOM树的比较来实现按需更新
* 浏览器传统方法是根据请求到的HTML，在内存中解析为DOM结构，渲染出DOM树，并呈现在页面上
* react未使用浏览器的API，而是自己用js对象模拟了自身所维护的DOM的嵌套关系，实现了自己的虚拟DOM树
* 每次渲染前，react会比较两颗新旧虚拟DOM树的差别，只更新改变的部分

## Diff算法

react用于对比新旧虚拟DOM树的算法

* tree diff：对两颗DOM树逐层的对比，从而找到需要更新的所有元素

* component diff：逐层对比时，在每一层中执行的组件级别的对比。原则是，组件类型相同则**暂时**不更新，然后进行元素对比；组件不同则移除旧组件，并创建和追加新组件。

* element diff：**相同类型组件**对比时，则比较两个组件间的元素。

## 基本使用

核心包：
* `react`：用于创建组件的虚拟DOM，管理组件的生命周期
* `react-dom`：用于进行浏览器dom操作，将虚拟DOM在浏览器DOM中渲染

基本使用：
```js
// 这里React和ReactDOM的名称不能使用别的
import React from 'react';
import ReactDOM from 'react-dom';
// 用原生react创建虚拟DOM，参数：DOM类型、属性、...子虚拟DOM
const ele = React.createElement('div', {id: 'div', title: 'div'}, 'Hello World');
// 使用jsx创建虚拟DOM，需要配合babel使用，将jsx语法转为上方的原生形式
const jsx = <div id="home">{ele}</div>;
// 在浏览器DOM上挂载虚拟DOM
ReactDOM.render(jsx, document.getElementById('app'));
```



</font>
