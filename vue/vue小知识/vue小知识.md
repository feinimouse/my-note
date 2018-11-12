#vue小知识

标签（空格分隔）： 前端

---

##1. vue+webpack中动态绑定图片路径的3种方法
```html
<img  :src="mysrc" />
```

###（1） 把图片放到src同级的static目录

```JavaScript
data() {
      return {
          mysrc:‘/static/icon/icon.png’
          }
      }
```

###（2） 用require加载

```JavaScript
data() {
      return {
          mysrc:require("../assets/img/icon.png")
          }
      }
```

###（3） 引用远程地址

```JavaScript
data() {
      return {
          mysrc:'http://xxx/img//2018/05/03/1525320695737407.jpg'
          }
      }
```

## 2. webpack路径映射设置
### （1）项目的目录结构如下图所示

![图1](1.png)

### （2）webpack配置
* 我们要映射assets资源文件夹的路径，方便我们引用
* 我们为assets文件夹取别名为~assets
* 在webpack.config.js文件中,在resolve属性下写入如下配置

```JavaScript
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~assets':path.join(process.cwd(),'./src/assets')
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
```
### （3）在项目中进行引用：
* 达到了避免使用麻烦的相对路径的目的
```JavaScript

  import filter from '~assets/js/myFilter';

  export default {
    name: "cart",
    data() {
      return {
        init: filter.join(['1', '2', '3'], '::')
      }
    }
  }
```
