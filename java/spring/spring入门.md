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

**核心包：**
* org.springframework/spring-beans
* org.springframework/spring-context
* org.springframework/spring-test

beans包中的BeanFactor提供了IOC配置结构和基本功能，加载并初始化bean

context包中的ApplicationContext提供了bean对象的存储容器，以及在spring获取、注入和管理等

**scope：作用域**

单例模式：single一个容器只存在一份

原型模式：prototype每次获取实例都会创建一份新的实例

web模式：
  * request：每次http请求中创建一个实例
  * session：每个session中一个独立的实例
  * global session：在一个web平台的不同的应用中的session维护一个实例

**proxyMode：代理模式**

试想一种情况：公司bean和临时工bean；临时工是非单例模式，在不同的情境下有不同的实例，单列模式的公司中引用了临时工对象，那么如何保证公司在不同情境运行时，每次都能使用正确的临时工？此时就需要对临时工进行代理，该代理表现出和临时工一样的对外接口，但使用时会根据情境调遣真正的临时工来完成业务。
* ScopedProxyMode.INTERFACES 当返回的bean的是一个多态接口时，直接实现一个该接口的静态代理即可。
* ScopedProxyMode.TARGET_CLASS 若返回的bean是一个类，必须使用CGLib来生成基于类的代理。

**bean的定义：**使用注解或者xml文件进行定义

**bean的初始化：**为bean指定init-method方法，当bean初始化时自动调用，或实现InitializingBean接口

**bean的销毁：**为bean指定destroy-method方法，当bean销毁时自动调用，或实现DisposableBean接口

```xml
<beans
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd"
    <!-- 自动搜索并调用每个bean名叫init的方法进行创建后的初始化 -->
    default-init-method="init"
    <!-- 自动搜索并调用每个bean名叫destroy的方法进行销毁前的资源释放 -->
    default-destroy-method="destroy"
>
    <bean
        id="guitar"
        class="name.feinimouse.study.xxx"
        scope="session"
        <!-- 对每个bean指定特定的构造方法，会覆盖default-init-method -->
        init-method="init"
    />
    <!-- 使用CGLib进行代理 -->
    <aop:scoped-proxy />
</beans>
```

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

自动注入：
```xml
<beans
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd"
    <!--通过bean的id匹配其他bean中的同名属性进行注入  -->
    default-autowire="byName"
    <!--通过bean的类型匹配其他bean的属性的同类型进行注入  -->
    default-autowire="byType"
    <!--通过bean的类型匹配其他bean的属性的同类型构造函数进行注入  -->
    default-autowire="constructor"
></bean>
```

### resource资源的加载

applicationContext.getResource(String path)

路径的几种种形式：
* `classpath:xxx/xxx`：从classpath中加载
* `file:C:\\xxx\\xxx`：通过url从文件系统中加载
* `url:http://xxx/xxx`：通过网络加载配置文件
* `/xxx/xxx`：从applicationContext的配置文件的加载路径进行加载


### Aware接口：

实现以Aware结尾的接口，可以在bean中获取IOC容器相关的核心信息，这些信息会以设值注入的方式注入到bean中。如ApplicationContextAware可以在bean中获取IOC容器对象本身，BeanNameAware可以在bean中获取自己在运行时容器中的id。

### 引用资源文件

使用`${}`的形式调用.properties文件中的属性

```xml
<context:property-placeholder location="classpath:xxx.properties" />
<bean>
<!-- 注意：${}中间不能有空格 -->
    <property name="xxx" value="${mybean.xxx}" />
</bean>
```

### IOC的注解实现

用注解代替xml

1. 用`@Component`代替`<bean />`，Component是一个通用的bean注解，bean的id默认为类名首字母小写

2. `@Repository`、`@Service`、`@Controller`分别用于注解持久层（DAO）、服务层和MVC控制层的bean

3. 用`@Autowired`或`@Inject`或`@Resource`来代替`<bean><property /></bean>`对对象的属性进行注入，可以用于私有属性且不需要set方法

4. 使用`@Qualifier(id)`或`@Named(id)`或`@Resource(name="xxx")`来指定要注入的对象的id

5. 使用`@configuration`和`@Bean`来创建一个bean的生产工厂（即java代替xml）

```java
@Configuration
public class Config {
    // 返回的对象即是供IOC容器管理的bean对象，注意默认的id为方法的名称，通过name参数重置id
    @Bean(name="myObject", initMethod="init")
    public MyObject myObject() {
        var o = new  MyChildObject();
        o.setName("my Name");
        return o;
    }
}
```

6. 使用`@Scope`声明作用域和代理模式

```java
    @Bean
    // 使用非单例的session模式，即在session中单例
    // proxyMode表示当该非单例drum被其他单例的band引用时，如何实现一个该非单列drum的代理
    // 代理会对其进行懒解析并将调用委任给session作用域内真正的drum，保证单例band的有效运行
    // INTERFACES表示直接实现drum的静态代理作为接口，若drum不是一个接口则应使用ScopedProxyMode.TARGET_CLASS
    @Scope(value = "session", proxyMode = ScopedProxyMode.INTERFACES)
    public Drum drum() {
        /* ... */
    }
    // 该bean默认是单例的
    @Bean
    public Band band() {
        var o = new Band();
        // 使用设值注入来使用drum对象
        o.setDrum(drum());
        return o;
    }
```

**(待补充其他注解)**

## AOP

面向切面：通过**预编译**和**运行期动态代理**的方式实现程序功能的统一维护；在每一个子模块中都要实现一个不同情景的相同的功能，我们称之为切面，如日志等。

常用功能：日志、性能统计、安全控制、事务和异常控制

具体实例：由spring来代替开发人进行数据库连接的统一开启和管理等

AOP实现手段：
* 预编译：AspectJ，代价较为昂贵
* 运行期间动态代理的方式：
    * JDK动态代理（有接口代理）：运行时创建实现代理类所有接口的实现类类
    * CGLib动态代理（无接口代理）：运行时创建代理类的子类

### pointcut表达式：

* `execution(public * * (..))`：执行所有public方法时
* `execution(* set*(..))`：执行所有set开头方法时
* `execution(* name.feinimouse.study.Test*(..))`：执行Test类的所有方法时
* `execution(* name.feinimouse.study..(..))`：执行study包下的所有方法时
* `execution(* name.feinimouse.study...(..)`：执行study包及其子包下所有方法时

within：
* `within(com.xyz.service.*)`：在service包里的任意方法
* `within(com.xyz.service..*)`：在service包或者子包里的任意方法

其他：
* `this(com.xyz.service.AccountService)`：实现了 AccountService 接口的代理对象的任意方法

* `target(com.xyz.service.AccountService)`：实现了 AccountService 接口的目标对象的任意方法

* `args(java.io.Serializable)`：接受一个实现了Serializable接口的参数

* `@target(name.feinimouse.study.anno.Band)`：带有Band注解的目标对象的任意方法

* `@within(name.feinimouse.study.anno.Band)`：任何一个带有Band注解的对象声明的类型的任意方法

* `@annotation(name.feinimouse.study.anno.Band)`：任何一个带有Band注解的方法

### AOP类型：

Introduction：给与一个接口A和它的实现类B，切面在处理目标类C时，可以让C强制以B的实现方式来实现接口A，从而可以使用B来代理目标类C进行使用
