---
title: 从零开始搭建React+Webpack项目（二）
author: 菲尼莫斯
date: 2018-07-25
tags:
- react
categories:
- 前端
---

# 从零开始搭建React+Webpack项目（二）

by 菲尼莫斯 2018年7月25日

---

## 安装开发辅助插件

用于方便开发时实时查看效果的开发服务器
**webpack-dev-server：**```npm install webpack-dev-server -D ```

用于适应不同系统环境的全局变量设置
**cross-env：**```npm install cross-env -D```

用于删除文件的插件
**rimraf：**```npm install rimraf -D```

在package.json中添加新的启动命令
启动开发服务器：```"dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js"```
清理编译残留文件：```"clear": "rimraf dist" ```

## 配置webpack

webpack.config.js:

```js

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const myConfig = require('./myConfig');
//自定义路径
const outputPath = myConfig.outputPath;
const publicPath = myConfig.publicPath;

// 判断当前环境，开发环境development，生产环境production，测试环境test
const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    //打包入口文件的路径
    app: path.join(__dirname, '../src/app.js')
  },
  output: {
    //打包生成文件的名字（name为原文件名，hash为根据文件内容生成hash值）
    filename: "[name].[hash].js",
    //打包文件生成的路径
    path: outputPath,
    //在html页面中的前缀引用地址，如以'/react'作为publicPath则在html的引用变为：'/react/app.hash.js'
    publicPath: publicPath,
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
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../src/app.html')
    }),
  ],

};


if (isDev) {
  //开发环境的下的浏览服务器配置
  config.devServer = {
    //服务器地址，0.0.0.0表示运行于本地，可以用任何地址访问
    host: '0.0.0.0',
    //端口号
    port: '8888',
    //服务器根目录位置
    contentBase: outputPath,
    //启动热部署模块
    //hot: true,
    //在发生错误时直接黑屏显示错误信息
    overlay: {
      errors: true,
    },
    //资源文件路径
    publicPath: publicPath,
    //将首页地址映射为publicPath + '/index.html'，并且404返回首页
    historyApiFallback: {
      //注意：由于使用的是url路径，此处不能用path拼接
      index: publicPath + '/index.html'
    }
  }
}

module.exports = config;


```

## 启动服务器

```npm run dev```


