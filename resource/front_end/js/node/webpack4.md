---
title: webpack4
author: 菲尼莫斯
date: 2019-04-06
tags:
- node
categories:
- 前端
---

# webpack4

by 菲尼莫斯 2019年4月6日

---

## 基本

webpack4和spring boot一样采用了约定大于配置的思想，因此我们只需将文件放在规定的位置即可

核心包：
* 核心文件`webpack`
* 命令行工具`webpack-cli`

启动命令：`webpack`

## 配置

* 基本选项：

```js
module.exports = {
    mode: 'development' // production模式将会开启代码压缩
    plugins: [], // 插件，需要使用new对象的形式
    module: { // loader
        rules: [
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: '/node_modules'}
        ]
    },
}
```

* 默认入口：`/src/index.js`
* 默认出口：`/dist/main.js`

## babel

核心包：
* `babel-core`：核心文件
* `babel-loader`：webpack配套loader
* `babel-plugin-transform-runtime`：运行时解析转换（配合开发服务器热更替）

语法包：
* `babel-preset-env`：能够加载一些指定情景下的默认配置，（配合webpack env）
* `babel-preset-react`：用于转换react的jsx语法
* `babel-preset-stage-0`：使用一些实验性的js语法

.babelrc.js：配置文件
```js
module.exports = {
    presets: [], // 所有带有preset的babel插件
    plugins: [], // 所有带有plugins的babel插件
}
```

## 插件

* webpack-dev-server：检测js更改动态打包的开发服务器
    * 安装后运行`webpack-dev-server`命令能直接使用
    * 打包后的文件默认保存在内存中，并保存在服务器的根目录
    * 配置参数：`--open chrome`自动打开浏览器
    * `--port 3000`：端口号
    * `--hot`：热更替
    * `--host 127.0.0.1`：指定域名
    * 默认打开首页下的index.html

* html-webpack-plugin：动态打包html文件（单页页面）的插件
    * 在内存中自动生成index.js
    * 能自动把打包好的js引入到html中
```js
module.exports = {
    htmlPlugin: new HtmlWebpackPlugin({
        template: // 打包的源html位置
        filename： // 打包生成的文件名
    })
}
```


