

# react中一些实用的npm包

by 菲尼莫斯 2018年7月27日

---

## cross-env

用于跨开发环境在命令行输入全局变量
例如我们想指定```NODE_ENV```环境变量，我们只需这么写
```bash
cross-env NODE_ENV=xxxx(变量值) xxxx xxxx(主命令)
```

## webpack-merge

用于合并两份webpack配置，如：
```js
//配置1
const config1 = {
  output: {
    path: '../dist/test',
    publicpath:'/public/'
  }
}


//配置2
const config2 = {
  output: {
    path: '../dist/',
    filename: '[name].[hash].js'
  }
}

//合并配置
//第二份文件会覆盖第一份文件的重复内容
const config3 = webpackMerge(config1,config2);

//合并结果
{
  output: {
    path: '../dist/',
    publicpath:'/public/',
    filename: '[name].[hash].js'
  }
}

```


