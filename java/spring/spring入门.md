# spring入门

by 菲尼莫斯 2019年4月14日

---

## spring全家桶

spring framework（核心）

spring web flow（SWF）：是一个spring MVC的扩展，它允许你使用一个高阶域定义语言来定义控制器。这个语言用来建模用户交互，需要多次请求到服务器来完成，并可能涉及不同的内容。

spring boot：是一些spring库的集合，它能够被任意项目的构建系统所使用，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。

spring cloud：将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等。

spring data：用于简化数据库访问，支持NoSQL和关系数据库存储。其主要目标是使数据库的访问变得方便快捷。

spring security：一个能够为基于Spring的企业应用系统提供声明式的安全访问控制解决方案的安全框架。

spring integration：基于Spring的应用程序中实现轻量级消息传递，并支持通过声明适配器与外部系统集成。

spring batch：一个轻量级的、完善的批处理框架,旨在帮助企业建立健壮、高效的批处理应用。

spring expression language （Spring EL）：用于解析java表达式语言

## 概况

核心：**轻量级**的IOC（控制反转）和AOP（面向切面）的**容器**框架

通过IOC达到**松耦合**，通过AOP进行分离应用**业务逻辑**和**系统服务**的内聚性开发，通过容器包含和**管理对象**的配置和生命周期，通过框架来省去连接细节直接进行组件装配形成大型应用。

## IOC

即对象的控制权转移

IOC的作用是创建并管理要使用的对象，并使用依赖注入（Dependency Injection）的方式来组织对象间的关系

应用本身只负责业务逻辑的实现，不负责业务依赖对象的创建和维护，这些对象则由外部容器来创建和维护，应用只需向容器申请一个现成的对象来使用即可。

即我们建立一个对象简单描述（POJO）和一份配置元数据文件交由spring容器，从而达到自动生产出目的的对象的作用。

核心：**不用关心对象的创建、配置和销毁等一系列过程**

### Bean

核心包：
* org.springframework/spring-beans
* org.springframework/spring-context
* org.springframework/spring-test

beans包中的BeanFactor提供了IOC配置结构和基本功能，加载并初始化bean

context包中的ApplicationContext提供了bean对象的存储容器，以及在spring获取、注入和管理等

scope：作用域
* 单例模式：single一个容器只存在一份
* 原型模式：prototype每次获取实例都会创建一份新的实例
* web模式：
    * request：每次http请求中创建一个实例
    * session：每个session中一个独立的实例
    * global session：在一个web平台的不同的应用中的session维护一个实例

bean的定义：使用注解或者xml文件进行定义

bean的初始化：为bean指定init-method方法，当bean初始化时自动调用，或实现InitializingBean接口

bean的销毁：为bean指定destroy-method方法，当bean销毁时自动调用，或实现DisposableBean接口

### 注入

在bean初始化时，就将bean中依赖的对象进行反射赋值为其他bean

设值注入:
```xml
<bean id="hhw" class="name.feinimouse.study.HelloHappyWorld">
    <!-- bean hhw的内部必须要有set方法 -->
    <property name="guitar" ref="guitar"></property>
</bean>
<bean id="guitar" class="name.feinimouse.study.Kasumi"></bean>
```

构造器注入：
```xml
<bean id="hhw" class="name.feinimouse.study.HelloHappyWorld">
    <!-- bean hhw的内部必须要有传入该参数的构造方法 -->
    <constructor-arg name="guitar" ref="guitar"></constructor-arg>
</bean>
<bean id="guitar" class="name.feinimouse.study.Kasumi"></bean>
```

Aware接口：实现以Aware结尾的接口，可以在bean中获取IOC容器相关的核心信息，这些信息会以设值注入的方式注入到bean中。如ApplicationContextAware可以在bean中获取IOC容器对象本身，BeanNameAware可以在bean中获取自己在运行时容器中的id。
