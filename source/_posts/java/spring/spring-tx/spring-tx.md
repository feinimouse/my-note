# 使用示例

```xml
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

<bean id="txTemplate" class="org.springframework.transaction.support.TransactionTemplate">
    <property name="transactionManager" ref="txManager"/>
</bean>
```

```java
@Service
public class TxExampleService {
    @Resource
    private TransactionTemplate txTemplate;

    @Resource
    private ExampleDao exampleDao;

    public void exampleUse() {
        txTemplate.execute(status -> {
            exampleDao.insertSomething();

            int i = exampleDao.updateSomething();
            if (i != 1) {
                throw new BizException("更新操作影响行数不为1");
            }

            return exampleDao.selectSomething();
        });
    }
}
```

## 事务同步
TransactionSynchronization
用来监听事务操作的回调类，其中定义了在事务执行过程中，进行的拓展操作：
* beforeCommit
* afterCommit
* beforeCompletion
* afterCompletion
* suspend
* resume

如：在事务提交完成后运行一个异步监听操作，注册一个自定义的TransactionSynchronization，则可在事务执行完成后进行一个异步回调

* always

* on-actual-transaction

* never

## 暂停同步

## 继续同步
