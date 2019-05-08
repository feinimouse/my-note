# spring-aop

by 菲尼莫斯 2019年4月14日

---

## 基本spring aop

核心包：
* org.springframework/spring-aop
* org.aspectj/aspectjweaver


面向切面：通过**预编译**和**运行期动态代理**的方式实现程序功能的统一维护；在每一个子模块中都要实现一个不同情景的相同的功能，我们称之为切面，如日志等。

常用功能：日志、性能统计、安全控制、事务和异常控制

具体实例：由spring来代替开发人进行数据库连接的统一开启和管理等

AOP实现手段：
* 预编译：AspectJ，代价较为昂贵
* 运行期间动态代理的方式：
    * JDK动态代理（有接口代理）：运行时创建实现代理类所有接口的实现类类
    * CGLib动态代理（无接口代理）：运行时创建代理类的子类

1、如果目标对象实现了接口，默认情况下会采用JDK的动态代理实现AOP
2、如果目标对象实现了接口，可以强制使用CGLIB实现AOP
3、如果目标对象没有实现了接口，必须采用CGLIB库，spring会自动在JDK动态代理和CGLIB之间转换

## pointcut（切入点）：

### 使用方法

```xml
<aop:config>
    <!--要使用的切面的方法实现类-->
    <aop:aspect id="pasPalAspect" ref="pasPalOffice">
        <!--配置一个通用的切点，通过pointcut-ref来引用-->
        <aop:pointcut
            id="displayPointcut"
            expression="execution(* name.feinimouse.study.bandparty.band.impl
                .PastelPalettes.display())"
        />
        <!--切入点的引用-->
        <aop:before method="beforeDisplay" pointcut-ref="displayPointcut" />
    </aop:aspect>
</aop:config>
```

### 切入点表达式

execution：用于匹配方法执行的连接点：
* `execution(public * * (..))`：执行所有public方法时
* `execution(* set*(..))`：执行所有set开头方法时
* `execution(* name.feinimouse.study.Test.*(..))`：执行Test类的所有方法时
* `execution(* name.feinimouse.study..(..))`：执行study包下的所有方法时
* `execution(* name.feinimouse.study...(..)`：执行study包及其子包下所有方法时

within：用于匹配指定类型内的方法执行：
* `within(com.xyz.service.*)`：在service包里的任意方法
* `within(com.xyz.service..*)`：在service包或者子包里的任意方法

以下方法不太明确，需要慎重：

this：用于匹配当前AOP代理对象类型的执行方法；注意是AOP代理对象的类型匹配，这样就可能包括引入接口也类型匹配；
* `this(com.xyz.service.AccountService)`：实现了 AccountService 接口的代理对象的任意方法

target：用于匹配当前目标对象类型的执行方法；注意是目标对象的类型匹配，这样就不包括引入接口也类型匹配；
* `target(com.xyz.service.AccountService)`：实现了 AccountService 接口的目标对象的任意方法

args：用于匹配当前执行的方法传入的参数为指定类型的执行方法；
* `args(java.io.Serializable)`：接受一个实现了Serializable接口的参数

@target：用于匹配当前目标对象类型的执行方法，其中目标对象持有指定的注解；
* `@target(name.feinimouse.study.anno.Band)`：带有Band注解的目标对象的任意方法

@within：用于匹配所以持有指定注解类型内的方法；
* `@within(name.feinimouse.study.anno.Band)`：任何一个带有Band注解的对象声明的类型的任意方法

@annotation：用于匹配当前执行方法持有指定注解的方法；
* `@annotation(name.feinimouse.study.anno.Band)`：任何一个带有Band注解的方法

bean：Spring AOP扩展的，AspectJ没有对于指示符，用于匹配特定名称的Bean对象的执行方法；

## AOP Aspect类型：

### 常规通知

* after：在方法执行结束后一定会进行的通知（相当于finally）
* after-returning：方法执行return后的通知，抛出异常时不会触发
* before：在方法运行前的通知
* after-throwing：只有在异常抛出后才会有的通知

**使用方法：**

```xml
<aop:config>
    <aop:aspect id="pasPalAspect" ref="pasPalOffice">
        <aop:after
            method="afterActivity"
            pointcut="execution(* name.feinimouse.study.bandparty.band.impl
                .PastelPalettes.*(..))"
        />
    </aop:aspect>
</aop:config>
```


### around环绕通知

在方法执行前后可以进行任意操作

```xml
<aop:config>
    <aop:aspect id="pasPalAspect" ref="pasPalOffice">
    <!--环绕通知，这里截取了方法输入的参数-->
        <!--注意args的参数的名字一定要和切面类的方法的参数名一致（不是类型名）-->
        <aop:around
            pointcut="execution(* name.feinimouse.study.bandparty.band.impl
                .PastelPalettes.display(String)) and args(song)"
            method="display"
        />
    </aop:aspect>
</aop:config>
```

```java
/**
* 环绕通知
* 注意带参的切面的“参数名”一定要和aop中声明的args名一致
*/
public Object display(ProceedingJoinPoint joinPoint, String song) throws Throwable {
    // 执行之前
    beforeDisplay();
    System.out.println("Song" + song + " has been selected ...");
    // 方法执行
    Object result = joinPoint.proceed();
    // 执行之后
    afterDisplay();
    return result;
}
```

### Introduction通知

declare-parents：给与一个接口A和它的实现类B，切面在处理目标类C时，可以让C强制以B的实现方式来实现接口A，从而可以使用B来代理目标类C进行使用

```xml
 <aop:config>
    <aop:aspect id="pasPalAspect" ref="pasPalOffice">
        <!--Introduction通知：让PastelPalettes类以PasPalOffice的方法实现了Support接口-->
        <aop:declare-parents
            types-matching="name.feinimouse.study.bandparty.band.impl.PastelPalettes"
            implement-interface="name.feinimouse.study.bandparty.support.Support"
            default-impl="name.feinimouse.study.bandparty.support.PasPalOffice"
        />
    </aop:aspect>
</aop:config>
```

```java
public interface Support {
    String getSupportName();
}
public class PasPalOffice implements Support {
    @Override
    public String getSupportName() {
        return "Pastel Palettes Office";
    }
}
public void test() {
    var pasPal = (PastelPalettes)context.getBean("pastelPalettes");
    // 这里能够直接强行转为Support类型
    System.out.println(((Support)pasPal).getSupportName());
}
```

## 纯注解AOP（AspectJ）

spring aop（xml形式）不依赖于AspectJ，但支持AspectJ的切入点配置


