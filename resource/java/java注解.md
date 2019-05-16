---
title: java注解
author: 菲尼莫斯
date: 2019-03-22
tags:
- 基础
categories:
- java
---

# java注解

by 菲尼莫斯 2019年3月22日

---

## 基本

* 注解并不是程序，但可以对程序作出解释并能被编译器等其他程序读取，并进行相应的处理

* 语法详见 /code/java/Annotation/

## 内置注解

* @Override：重写，若方法在父类不存在则报错

* @Deprecated：表示不鼓励使用该方法

* @SuppressWarnings：抑制编译时的警告信息

## 元注解（注解的注解）

* @Target：用于描述注解的适用范围
    * PACKAGE、TYPE（类、接口等）、CONSTRUCTOR、FIELD（域）、METHOD、LOCAL_VARIABLE（局部变量）、PARAMETER（参数）

* @Retention：注解的保留策略（生命周期）
    * SOURCE：在源文件中有效
    * CLASS：在class文件中有效
    * RUNTIME：在运行时有效，可以被反射读取


