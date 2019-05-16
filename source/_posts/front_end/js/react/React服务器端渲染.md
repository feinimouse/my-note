---
title: React服务器端渲染
author: 菲尼莫斯
date: 2018-07-19
tags:
- react
categories:
- 前端
---

# React服务器端渲染

by 菲尼莫斯 2018年7月19日

---

## 安装express服务器

,```npm install express -S```

## 创建一个react入口

app-server.js
```js
import React from 'react'
import App from 'App.jsx'

export default <App/>

```

## 将react打包为适配nodejs服务器的包

webpack.config.server.js
```js
const path = require('path');

module.exports  = {
  //让打包出来的代码可以直接在node环境中执行
  target: "node",
  entry: {
    //打包入口文件为server入口
    app: path.join(__dirname, '../src/app-server.js')
  },
  output: {
    //服务端运行的文件不需要加hash值
    filename: "app-server.js",
    path: path.join(__dirname, '../dist'),
    publicPath: '',
    libraryTarget: "commonjs2",
  },

  module: {
    //配置各类loader，使webpack能够识别非常规格式的文件
    rules: [
      {//能够识别react的loader
        test: /.jsx$/,
        loader: "babel-loader",
      },
      {//能够识别es6的loader
        test: /.js$/,
        loader: "babel-loader",
        exclude: [
          path.join(__dirname, '../node_modules'),
        ],
      },
    ]
  },

};
```


## 编写服务器端渲染

```js
const express = require('express');
const fs = require('fs');
const path = require('path');

//引入react服务端渲染
const ReactSSR = require('react-dom/server');
//引入渲染内容，注意：读取的文件是经过webpack打包后的
const appServer = require('../dist/app-server').default;

//启动一个express服务器
const app = express();
//首先加载react的容器页面
const appPage = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8');
//设置资源路径为/public，并映射到/
app.use('/public',express.static(path.join(__dirname,'../dist')));

//拦截所有get请求
app.get('*', function (req, res) {
  //服务器端渲染，返回字符串形式的渲染结果
  const renderResult = ReactSSR.renderToString(appServer);
  //服务器端将渲染结果替换到页面容器
  res.send(appPage.replace('<App/>',renderResult));
});

//开启服务器，并监听3000端口
app.listen(3000, function () {
  console.log('express server is listen on 3000');
});
```

# 服务器端和客户端配合

将app.js中的render方法改为hydrate方法：

```js
ReactDOM.hydrate(<App/>,document.getElementById('App'));
```
