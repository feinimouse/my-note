<font size = "4">

# js学习

by 菲尼莫斯 2018年11月12日

---

## 类型相关

* flase: `false(boolean)`、`null`、`undefined`、`''或""`、`0`、`NaN`

* a = b && c : 当b为假时返回b，否则返回c

* a = b || c : 当b为真时返回b，否则返回c

## 对象相关

* 对象都继承于Object.prototype；

* 函数都继承于Function.prototype；

* 调用对象的属性或者方法时，查找顺序为：对象属性 -\> prototype -\> 原型的prototype -\> Object.prototype

* 可以使用delete删除对象的属性，注意：delete无法删除原型链的属性

* 数字都继承于Number.prototype；

* 字符串都继承于String.prototype；

* 布尔值都继承于Boolean.prototype；

* 数组（除了argument）都继承于Array.prototype；（因此基本类型都有方法可以调用）

* Number、String、Boolean、Undefined、Object、Function可以被typeof识别（null和数组为Object、NaN为number）

* Array 可以被Array.isArray()识别；NaN可以被Number.isNaN()识别

## 函数相关

* 函数本质是一个对象，继承于Function对象，有两个隐藏属性保存了其运行的上下文和执行代码。

* 函数都具有prototype.constructor属性，并指向函数的对象自身

## 函数的调用:

### 函数式调用：

`kasumi()`、`var love = kasumi()`

特点：

```javascript

// 特点：函数式调用时执行中的this必定指向global
var kasumi = function(){};

kasumi(); // 此处kasumi()中的this指向gloal

popipa.tae = function(){

    this; // 此处的this指向popipa

    var saaya = function(){}

    saaya(); // 此处saaya()中的this却也指向global

}
```

### 方法式调用：

`popipa.kasumi()`、`var love = popipa.kasumi()`

    * 上面的例子中，调用了popipa对象中的kasumi()函数

    * 此时函数中的this绑定到了popipa

    * 对this的取值发生在函数调用this的时候

* 构造器调用：`new kasumi()` 、`var loce = new kasumi()`

特点：

```javascript

// 此类函数用 大写字母 开头，表示为一个类及其构造函数
var Kasumi = function(){
    this.band = 'popipa';
}

// 用new调用函数时会创建一个新的kasumi对象，且将this指向这个新对象
var kasumi = new Kasumi();

// this指向了kasumi，band变为了kasumi的属性，不会污染到global
kasumi.band;

// 若用以下这两种方式来调用构造函数，this则会污染到其他位置
Kasumi(); // band指向了global
popipa.kasumi = Kasumi;
popipa.kasumi(); // band指向了popipa

```

特别说明：

```JavaScript

// 假设Kasumi()函数没有return

Kasumi(); // 函数的返回值为undefined

new Kasumi(); // 函数的返回值为一个指向新建的Kasumi对象的this

```

### call和apply调用：

`kasumi.call(tae,rimi,arisa)`、`popipa.kasumi.apply(saaya,[rimi,arisa])`

    * call和apply是Function原型链的函数

    * call和apply可以改变当前运行函数的this指向

    * call和apply的第一个参数将被替换为运行函数的this

    * call的其他参数将被当做运行函数的形参传入，apply的第二个参数为一个数组，数组中的参数按照顺序当做运行函数的形参传入

    * call函数的实现:

```javascript

Function.call(that,va) = function(){

    // 将this（指向调用的Function，是一个函数对象），绑定到输入的对象that上
    that.func = this;

    // 使用方法式调用that对象上的func方法，即调用了Function
    var result = that.func(va);

    // 调用成功后删除that上的func
    delete that.func;

    // 返回运行结果
    return result;
}

```

## 继承

### 伪类继承

```js

var Father = function(){}

var Child = function(){}

Child.prototype = new Father();

var child = new Child();

```

### 原型继承

```js

var father = {};

var child = {};

child.prototype = father;

```

### 函数式继承

```js

// init 类似于父类的构造函数
var father = function(init){

    var child = {};

    // 这里是父类中的私有属性
    var father_attr;

    // 这里是父类中的私有方法
    var father_func = function(){};

    // 这里是公有属性
    child.attr = init.public;

    // 这里是公有方法
    child.func = function(){
        
        // 其中可以对父类中的私有成员进行操作
        father_attr = 'father\'s attr';

        // 也可以对init中的属性进行操作，这样做的话这个init属性将会变为私有属性
        return init.private;
    }

    return child;
}

// 通过函数创建一个子类
var child = father({
    public:'public',
    private:'private'
});

// 在此处对child进行自定义
child.child_func = function(){};

// 实现supper
child.func = function(){

    var supper = this;

    var supper_func = supper.func;

    return function(){

        // 这里执行了原来的func方法，即supper操作
        // 考虑到supper_func中可能会用到this，因此必须用apply来执行
        var supper_var = supper_func(supper,arguments);

        //可以对supper后的值进行自定义操作
        return someOperate(new_var);
    }
}

```

## 一些关键基础函数

* isNaN : 判断是否为NaN（NaN是一个数值）

* Math.floor : 向下取整；Math.ceil : 向上取整；

</font>
