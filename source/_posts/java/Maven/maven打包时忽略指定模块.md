
## delopy

1. 不上传到远端仓库的模块使用下面的plugin：

```xml
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-deploy-plugin</artifactId>
        <version>2.8.2</version>
        <configuration>
            <skip>true</skip> //deploy 时忽略此model
        </configuration>
    </plugin>
</plugins>
```