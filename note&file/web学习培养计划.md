# web学习培养计划

by 菲尼莫斯 于2019年3月27日重排（2018年6月版本，未修订）

---

## 必备技能

---

### web语言基础

* html基本语法
* Java基本语法
* JavaScript基本语法

### 代码风格

* **类名、组件和常量** 以大驼峰式命名：如UserManager、ArticleTitleIndex
* **变量** 以小驼峰式命名：如userManger、articleTitleIndex
* **资源文件、配置文件、文件夹** 以小写英文单词加"-"命名: 如user-manger、article-title-index
* 模块化编程，**将系统功能抽取出来建立多个文件（模块），通过引用的方式进行连接**，一个文件的代码尽量控制在300行以内
* 多运用文件夹和包将代码或资源归类

### 代码管理

* 掌握IDE的安装、使用和配置（推荐使用IDEA或MyEclipse）
* 深刻理解什么是SVN，及其存在的意义
* 学会将SVN配置于IDE

>也可使用git代替SVN

### html基础

**学习内容：**

* 常用基本语法掌握
* 了解html页面的基本结构
* 深刻理解相对路径和绝对路径
* 了解div、form、table、a、input、button标签
* 了解文字显示相关标签
* 了解head标签下的常用配置

---

## 后端

---

### JAVA基础

**学习内容：**

* jdk和jre的安装和基本配置（推荐用1.8）
* **常用基本语法掌握**
* **全面贯彻落实面向对象的编程思想**
* 作用域、继承、接口、重载的理解

### mysql基础

**学习内容：**

* mysql的安装和连接和基本配置
* **基本的SQL语法掌握**
* 了解联合查询
* 了解模糊查询
* 学会使用Navicat

### Java Web基础

**学习内容：**

* tomcat的安装和基本配置（推荐用8.0）
* 结合tomcat深刻理解什么是服务器
* 将tomcat配置于IDE
* 熟练掌握Java Web 项目的创建
* 了解Java Web 项目的基本结构和关键文件
* 了解JavaBean的使用 (pojo)
* 了解JSP基础和使用方式
* **熟练掌握** Servlet的使用，深刻理解request,response,session
* 了解JDBC和DataSource
* 了解el表达式基础用法
* **深刻理解** get和post
* **熟练掌握** json的使用

### maven基础

* maven的安装和基本配置
* 深刻理解maven是什么及其作用
* 将maven配置于IDE

### spring boot/mvc基础

**学习内容：**

>该部分建议观看spring+mybatis结合使用的视频资料
> 建议选择boot和mvc一种来使用

* MVC上手难，维护难，但功能强大，积累丰富
* boot上手容易，针对性强，但相关积累少，特定功能实现有难度

#### 1. 入门：

* 了解什么是spring mvc和spring boot，知道两者间的区别和联系
* 熟练掌握spring boot\mvc项目的创建
* 了解spring boot项目的基本目录结构和关键文件
* **boot：** 了解xxxApplication类和application.properties
* **mvc：** 了解web.xml和springMVC.xml等配置文件
* 掌握pom文件的基本结构和其中的内容

#### 2. controller既是关键

* 熟练使用RequestMapping配置路由地址和接收模式
* 熟练掌握controller方法中形参和返回值的各种写法
* 能够返回静态页面
* 能够返回json
* **mvc：** 用JSP返回动态页面
* **boot：** 用thymeleaf返回动态页面
* 了解spring中如何将访问静态资源和请求controller分开
* 熟练掌握controller其他功能的各种使用

#### 3. mybatis：

* 了解mybatis的工作原理
* 熟练掌握mybatis generater的使用
* 熟练使用generater生成的mapper进行各种增删改查
* 熟练使用service接口，以及@Autowired

#### 4. 推荐学习内容：

* 使用.properties和@Configuration、@Value标签进行参数配置
* 登录操作
* 权限管理
* json的各种花式使用
* 图片、文件的上传、保存与下载
* 生成excle表格

---

## 前端

---

### css基础

**学习内容：**

* 常用基本语法掌握
* 熟练使用css选择器
* 常用属性掌握（位置调整，内外边距，浮动，display，字体等）

###js基础

**学习内容：**

* 常用基本语法掌握
* 了解es6新语法
* jQuery基本语法掌握
* 熟练掌握js或jQuery修改dom元素
* 熟练掌握ajax
* **学会寻找实现特定功能的js插件和模板**

### 前端框架

#### 前言

**前端框架分为两种：**

* 传统框架，大部分基于jquery的框架如layui、bootstrap等
* MVVM框架，如react、vue、angular等

名称    | 难度  | 流行度 |维护性|性能 |复用性|积累|
- | :-: | :-:|:-:|:-:|:-:|:-:|:-:|
传统框架 |  3*  | 6*    | 3*   | 6* | 5*   | 10*|
MVVM    |  8*  | 10*    | 8*  | 8*  |  10*|  4*|

简而言之：
* MVVM框架各方面都很优秀但就一个字 **难**
* 传统框架 **简单易用** ，若没有一定的规范，容易使代码臃肿杂乱 **难以维护**

> 建议所有成员选择一种来学习

#### layui基础（传统框架）

**学习内容：**

* layui常用css的使用（布局和常用组件样式、icon等）
* layui js 的基本使用方式
* **学会熟练复用官网的代码**
* 熟练掌握layui table、form、文件上传
* 学会寻找实现特定功能的layui模板
* 了解其他高级功能

#### vue基础（MVVM框架）

**学习内容：**

* **node.js** 的安装，和基础使用
* 深刻理解npm是什么及其作用
* **掌握** npm的使用
* **掌握** vue项目的创建（vue-cli）
* **深刻理解** vue项目的结构
* 深刻理解MVVM模式，以及数据绑定的编程思想
* **vue基本常用语法掌握**
* **掌握** vue-router和vue-resource的使用
* 了解[Vue编程风格](https://cn.vuejs.org/v2/style-guide/#%E8%A7%84%E5%88%99%E5%BD%92%E7%B1%BB)
* 了解webpack在vue中的使用
* **学会熟练复用官网的代码**
* **学会寻找实现特定功能的vue插件和模板**
* 了解其他高级功能

### 推荐学习内容

* 富文本编辑器的使用
* scss的基本语法及使用
* bootstrap css，js基本使用
* ztree的基本使用
* echart的基本使用
* datatable的基本使用

---

## 强烈推荐

---

### 记笔记

**推荐学习内容：**

* 学习markdown，掌握基本语法
* 学习一款好用的记笔记软件（参考软件：Atom）
* 掌握一个好用的截图软件（参考软件：Snagit）

### GitHub

**推荐学习内容：**

* 注册一个自己的GitHub账号
* 熟悉GitHub的基本功能
* 熟悉Git的使用
* 随时随地发现最新代码
* 创造自己的代码
