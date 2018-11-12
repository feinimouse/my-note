# vue3-simple

> 该项目为vue的学习项目

## 1. Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 2. 接口说明
```JavaScript
# 首页地址 : /home  
# 接口地址：HTTP GET /api/home
# 返回数据的json格式：
{     
  announce: '武林秘籍大甩卖',  //快讯
  slides: [
    {
      id: 1,  //图书编号
      img_url: '/static/img/sp1.jpg'  //图书封面
    }
  ],
  myBooks: [
    {
      id: 1,              //图书编号
      name: '辟邪剑谱',   //图书名称
      price: 40,         //图书价格
      author: ['东方不败', '岳不群'],  //作者
      img_url: require('../assets/img/book1.jpg') //图书封面
    }
  ]
}
```
