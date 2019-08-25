---
title: react入门
author: 菲尼莫斯
date: 2019-04-06
tags:
- react
categories:
- 前端
---

# react入门

by 菲尼莫斯 2019年6月27日

---

## Router基本

基本用法：

* Router: router提供的是路由的基本功能，根据在浏览器运行时路由的特征，提供了HashRouter、BrowserRouter等在web端常用的路由

* Route: route必须包裹在router中，每一个route代表一个根据特定路由渲染的组件，当属性path匹配到对应路由时，属性component中的内容将被渲染。带有冒号的path可以作为一个参数进行传递，如：`/user/:username`，将匹配路由：`/user/tom`，tom将作为参数props.params.username传递到其component中。

* Link：link是控制前端路由跳转的组件，根据属性to跳转到对应的前端路由，可以是一个location对象

* history：和router配套使用的路由管理对象，可以通过history.push(path)改变前端路由，一般由react自动生成，也可由`import createHistory from 'history/createBrowserHistory'`进行创建

```jsx
<BrowserRouter history={history}>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to={{ pathname: '/me', search: '?id=1'}}>Me</Link></li>
            <li><Link to="/user/:username">User</Link></li>
        </ul>
    </nav>
    <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/me" component={MePage} />
        <Route path="/user" component={UserPage} />
    </div>
</BrowserRouter>
```

## 配套组件

### Switch

被switch包裹的route中，只会渲染第一个匹配到的对象

exact属性表示精确匹配

```jsx
<Switch>
    { /* 若不加switch的话，运行到路由 “/” 会将两个route都渲染 */ }
    <Route path="/" exact commponent={home} />
    { /* 若不加exact的话，运行到路由 “/user” 将首先匹配 “/” 因此将不会渲染/user */ }
    <Route path="/user" commponent={user} />
</Switch>
```

### Redirect

重定向到另一个地址，通常用在所有route的最后，以保证没有匹配到路由时做404处理。

```jsx
<Redirect to="/home" />
```
