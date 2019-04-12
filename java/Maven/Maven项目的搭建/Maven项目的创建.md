# Maven项目的创建

2018-01-08 19:26:31

重编 by 菲尼莫斯 2019年4月12日19:55:23

---

本文以Maven War工程为例，介绍如何在MyEclipse中搭建Maven项目

## 0. Maven 的安装

1. 下载maven：http://maven.apache.org

2. 解压到安装目录

3. 在安装目录的`config/setting.xml`中修改如下配置

```xml
<!-- 在mirrors元素中添加以下内容，阿里的镜像 -->
<mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
<!-- 在settings元素中中添加以下内容，本地仓库位置 -->
<localRepository>E:\这里填写你的资源下载路径</localRepository>
```

4. 在系统环境变量中添加M2_HOME环境变量，指向Maven的安装目录

5. 在系统的Path变量中添加`%M2_HOME%/bin`路径

6. 保存后在命令行测试`mvn -v`命令是否能正常显示maven版本

## 1. 选择Maven项目

打开MyEclipse2015，左上角依次选择：

**File**-->**New**-->**Project**-->**Maven4MyEclipse**-->**Maven project**

{% asset_img 2018-01-11_10-09-36.png  %}

****

## 2. Maven项目预配置

在第一个窗口中勾选**Create a simple project**以及**Use default Workspace location**。

Create a simple project勾选后将跳过MyEclipse提供的Maven依赖原型的选择，有需要使用Maven原型的同学可以不勾选此项。一般在学习阶段，为了熟悉Maven的使用，我们将在项目创建完成后，根据需求手动添加依赖。

###  注：<font color='red'>某些版本的MyEclipse若不勾选Create a simple project直接进入下一步，将会造成MyEclipse在后台疯狂加载Maven仓库，大概率会导致系统卡顿，以及MyEclipse未响应报错重启。</font>

{% asset_img 2018-01-11_10-56-40.png  %}

****

## 3. Maven项目信息的填写

###  Artifact部分：

**Group Id**：必填，可以理解为组织名，代表开发者组织和身份的名称。

**Artifact Id**：必填，项目的名称，由于不同组织可以有相同的项目，maven仓库将根据这两个名称来区分项目种类。

**Version**：必填，项目的版本号，默认为0.0.1-SNAPSHOT，可以根据需要自行修改，同一项目可以有不同的版本。

**Packaging**：必填，项目的类型，可供选择的有jar，pom，war；

- jar：即普通的纯java项目
- pom：Maven聚合工程，本身可以没有任何功能，但其中能包含多个子模块即Maven Module。子模块可以是jar、pom和war工程中的一种，其自动继承父pom工程，并能够独立依赖及实现功能。
- war：即常用的java web工程
<br>

**Compiler Level**：非必填，编译的版本号，可以理解为java jdk的版本。

**Name**：非必填，可以理解为项目的口头名称，一般和Artifact Id相同

**Description**：非必填，项目描述

###  Parent Project部分：

该部分标识了当前Maven项目所要继承的父Maven项目，继承可以让当前项目使用父工程的所有依赖、插件以及jar类，很大程度上方便了复杂开发环境的搭建，以及对已有项目的扩展。对于新建Maven Project来说该部分内容为选填，对于Maven Module来说该部分为必填。

我们要是没有需要继承的父工程的话，该部分直接略过即可。

注意：填写的Group Id，Artifact Id，Version三项均为父工程的组织名，项目名及版本号，都需要唯一确定。

###  一切填好准备就绪，点击Finish完成项目的创建

{% asset_img 2018-01-11_15-50-14.png  %}

###  注：<font color='red'>某些版本的MyEclipse无法选择Compiler Level，或者是选择后无法创建项目,可以采用以下方法解决</font>

**首先我们要完成项目的创建：**

- 创建项目时，清空或不选择Compiler Level中的内容直接点击Finish创建项目

**由于某些MyEclipse自带的JDK版本或者默认的Maven版本过低，因此我们需要修改项目的默认JDK版本：**

- 右击创建好的项目，选择properties

- 弹出的窗口中依次选择Java Build Path -> Libraries -> JRE System Library -> Edit -> Execution environment

- 将Execution environment选择为自己需要的版本

{% asset_img 2018-01-11_20-00-04.png  %}

- 以防万一，检查Java Compiler中的JDK版本是否正确

{% asset_img 2018-01-11_20-08-40.png  %}

**最后我们需要告诉我们新建的Maven项目，在编译时需要使用JDK1.8的编译器来编译。具体的做法是引入一个Maven的官方插件“maven-compiler-plugin”**

- 在新建的Maven项目根目录下的pom.xml文件中，build 下的plugins标签中添加新的plugin标签,其内容具体如下：

```xml
  <build>
  	<plugins>
  		<!-- java编译插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.5.1</version>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
  	</plugins>
  </build>
```
****

## 4. 添加War编译和资源文件编译

**1. 一般情况下Maven War项目在刚创建好的时候，我们的项目是没有指定War的版本的，因此我们还需要添加一个Maven的官方插件：maven-war-plugin，一方面指明版本另一方面帮助我们将War解析为Java Web项目。**
**2. 当前创建的是一个war工程，而考虑到Java Web中经常需要使用额外的静态资源文件，因此我们需要引入一个插件专门来帮助我们整理、过滤和打包这些资源，即maven-resources-plugin**

- 在新建的Maven项目根目录下的pom.xml文件中，build 下的plugins标签中添加新的plugin标签,其内容具体如下：

```xml
 <build>
    <plugins>
		<!-- war编译插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-war-plugin</artifactId>
			<version>2.6</version>
			<configuration>
				<version>3.0</version>
			</configuration>
		</plugin>
		<!-- 资源文件管理插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-resources-plugin</artifactId>
			<version>2.7</version>
			<configuration>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
  	</plugins>
  </build>
```

**3. 一般来说，在引入插件后，我们的项目是不会立即用上的，因此我们需要对项目进行手动更新：**

- 右击项目选择Maven4MyEclipse -> Update Project

{% asset_img 2018-01-11_20-42-11.png  %}

- 勾选如图所示选项，执行项目更新

{% asset_img 2018-01-11_20-45-32.png  %}

## 5. 至此一个Maven War工程创建完成





