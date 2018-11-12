/*
 * js学习.js
 *
 * by 菲尼莫斯 2018年11月12日
 *
 * description: 存放一些js学习中遇到的关键代码
 *
 * */

// 函数构造器
Function.prototype.method = function (name,func){
    this.prototype[name] = func;
    return this;
}

// 使用for in 遍历对象时，应检查遍历出的属性来自原型链还是对象成员
var testO = {};
testO.name = 'kasumi';
testO.prototype.wife = 'arisa';
for(key in testO){
    if(testO.hasOwnProperty(key)){
        // do something
    }
}

// 继承并创建一个子类
if(typeof Object.beget !== 'function'){
    Object.create = function(father){
        var Child = function(){};
        Child.prototype = father;
        return new Child();
    };
}
var child = Object.create(father);

