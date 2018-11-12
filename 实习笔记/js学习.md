<font size = "4">

# js学习

by 菲尼莫斯 2018年11月12日

---

## 类型相关

* flase: `false(boolean)`、`null`、`undefined`、`''或""`、`0`、`NaN`

* a = b && c : 当b为假时返回b，否则返回c

* a = b || c : 当b为真时返回b，否则返回c

## 对象相关

* {}都继承于Object

* 调用对象的属性或者方法时，查找顺序为：对象属性 -\> prototype -\> 原型的prototype -\> Object.prototype

* 可以使用delete删除对象的属性，注意：delete无法删除原型链的属性

## 函数相关

* 函数本质是一个对象，继承于Function对象，有两个隐藏属性保存了其运行的上下文和执行代码。

* 函数都具有prototype.constructor属性，并指向函数的对象自身

### 函数的调用:

* 函数式调用：`kasumi()`、`var love = kasumi()`

特点说明：

```javascript

//特点：函数式调用时执行中的this必定指向global

var kasumi = function(){};
// kasumi()中的thisz指向gloal
kasumi();
popipa.tae = ()=>{
    // 此处的this指向popipa
    this;
    var saaya = function(){}
    // saaya()中的this却也指向global
    saaya();
}
```

* 方法式调用：`popipa.kasumi()`、`var love = popipa.kasumi()` 
    
    * 上面的例子中，调用了popipa对象中的kasumi()函数
   
    * 此时函数中的this绑定到了popipa

    * 对this的取值发生在函数调用this的时候

* 构造器调用：`new kasumi()` 、`var loce = new kasumi()`

特点说明：

```javascript

// 此类函数用 大写字母 开头，表示为一个类及其构造函数 
var Kasumi = function(){
    this.band = 'popipa';
}

// 用new调用函数时会创建一个新的kasumi对象，且将this指向这个新对象
var kasumi = new Kasumi();

// this指向了kasumi，band变为了kasumi的属性，不会污染到global
kasumi.band;

// 若用一下这两种方式来调用构造函数，this则会污染到其他位置
Kasumi(); // band指向了global
popipa.kasumi = Kasumi;
popipa.kasumi(); // band指向了popipa

```

## 一些关键基础函数

* isNaN : 判断是否为NaN（NaN是一个数值）



</font>
