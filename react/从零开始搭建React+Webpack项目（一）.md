<font size="4">

# 从零开始搭建React+Webpack项目（一）

by 菲尼莫斯 2018年7月19日

---

## 建立一个空项目

1. 在IDEA中新建一个static web项目

2. 进入项目，在IDEA控制台键入```npm init```引入包管理器，选项一路默认即可

3. 可以看到项目中多出了一个package.json文件


## 引入项目的基础依赖包

在IDEA控制台键入：

1. 安装webpack：```npm install webpack```

2. 安装react：```npm install react```

3. 安装react-dom：```npm install react-dom -S```

4. 安装babel全家桶:

```bash
# babel核心
npm install babel-core -D
# babel对webpack的支持
npm install babel-loader -D
# babel对jsx的支持
npm install babel-preset-react-app --save-dev
```

5. 安装html-webpack-plugin：```npm install html-webpack-plugin -D```

## 构建基础目录

1. 根目录创建src文件夹，作为主要工作目录，文件夹下创建 **app.js** 和 **App.jsx** 作为入口文件

2. 根目录创建build文件夹，作为配置文件目录，文件夹下创建 **webpack.config.js** 文件作为webpack的配置文件

3. 根目录创建 **.babelrc** 文件，作为babel的配置文件

4. 根目录创建 **.gitignore** 文件，作为git管理的忽略文件的配置

## 编写基础webpack配置

webpack.config.js

```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 设置环境变量：开发环境development，生产环境production，测试环境test
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
module.exports = {
  entry: {
    //打包入口文件的路径
    app: path.join(__dirname,'../src/app.js')
  },
  output: {
    //打包生成文件的名字（name为原文件名，hash为根据文件内容生成hash值）
    filename: "[name].[hash].js",
    //打包文件生成的路径
    path: path.join(__dirname,'../dist'),
    //在html页面中的前缀引用地址，如以'/react'作为publicPath则在html的引用变为：'/react/app.hash.js'
    publicPath: "/dist"
  }，
  module: {
    //配置各类loader，使webpack能够识别非常规格式的文件
    rules: [
      {//能够编译react的loader
        test: /.jsx$/,
        loader: "babel-loader",
      },
      {//能够编译es6的loader
        test: /.js$/,
        loader: "babel-loader",
        //把node modules下的内容排除
        exclude: [
          path.join(__dirname, '../node_modules'),
        ],
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin(),
  ],
};
```

## 编写.babelrc的配置文件

```json
{
  "presets": [
    "react-app"
  ]
}
```

**以下为老版本配置**
```js
{
  //presets可以配置babel支持的编译文件类型
  "presets": [
    //当前env配置项已经替代并包含了了es2015、es2017等presets
    ["env", {
      //表示将模块化工作交由webpack去做
      "modules": false,
      //目标浏览器的类型
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    //可解析react的babel
    "react"
  ]
}
```

## 为npm添加build命令

package.json
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config build/webpack.config.js"
},
```

## 编写.gitignore文件

```yml
# IntelliJ project files
.idea
*.iml
out
gen

# node modules
/node_modules

# npm run build
/dist
```

</font>
