# jQuery新操作

标签（空格分隔）： 前端

---

### 1. 使用on代替click

在最新版idea的jquery官方typescript注释中$().<del>clik(function)</del>事件已经过时，推荐使用on来代替:
```javascript
  $('a[data-type = "type"]').on('click',function () {
            var my =$(this).data('mainclass');
            alert(my);
        });
```
### 2. 使用this来调用元素
jquery中使用this和$(this)来调用对象：  
* 在jquery方法中直接this获取的是当前调用元素的dom对象，只能使用其原生js方法。  
* 要想使用jquery方法必须用$(this)来获取jquery对象。
```javascript
$(.class).on('click',function () {
            //这里是DOM对象
            console.log(this.innerHtml());
            //这里是jQuerey对象
            console.log($(this).html());
        });

```
### 3. 使用data属性来储存数据

在html5的dom元素中添加data-\*属性可以被浏览器和jquery直接识别，它不会影响到你的页面布局和风格，但它却是可读可写的。

```html
  <button type="button" id="test" data-my="I'm here"></button>
```

使用jquery来读取这个属性：

```javascript
var data = $('#test').data('my');
alert(data);
```

* 注意：html中所有的属性名都会被转为小写：

```html
<a data-myDream='myDream'></a>
```
```javascript
var data = $('a').data('mydream');
```

也可以使用json来表示数据,以及使用data(key,value)方法进行赋值：

```html
<div id="awesome-json" data-awesome='{"game":"on"}'></div>
<a data-myDream='win'></a>
```
```javascript
var gameStatus= $("#awesome-json").data('awesome').game;
console.log(gameStatus);
//通过.data(key,value)方法直接给"data-*" 属性赋值
$('a').data('mydream','success');

```

### 常用操作

1. 选择器+遍历

$('div').each(function (i){
   i就是索引值
   this 表示获取遍历每一个dom对象
});

2. 选择器+遍历
$('div').each(function (index,domEle){
   index就是索引值
  domEle 表示获取遍历每一个dom对象
});

3. 更适用的遍历方法
1）先获取某个集合对象
2）遍历集合对象的每一个元素
var d=$("div");
$.each(d,function (index,domEle){
  d是要遍历的集合
  index就是索引值
  domEle 表示获取遍历每一个dom对象
});
