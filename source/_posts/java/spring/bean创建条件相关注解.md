## spring auto config

* @ConditionalOnBean:                 仅在当前上下文中存在某个bean时，才会实例化这个Bean
* @ConditionalOnClass:                某个class位于类路径上，才会实例化这个Bean    
* @ConditionalOnExpression:           当表达式为true的时候，才会实例化这个Bean        
* @ConditionalOnMissingBean:          仅在当前上下文中不存在某个bean时，才会实例化这个Bean        
* @ConditionalOnMissingClass:         某个class在类路径上不存在的时候，才会实例化这个Bean        
* @ConditionalOnNotWebApplication:    不是web应用时才会实例化这个Bean                
* @AutoConfigureAfter:                在某个bean完成自动配置后实例化这个bean    
* @AutoConfigureBefore:               在某个bean完成自动配置前实例化这个bean    


## spring starter 原理

详见此文(https://blog.csdn.net/a1405/article/details/123177177)