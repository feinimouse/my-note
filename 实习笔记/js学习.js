/*
 * js学习.js
 *
 * by 菲尼莫斯 2018年11月12日
 *
 * description: 存放一些js学习中遇到的关键代码
 *
 * */

// tips 1
// 函数构造器，为函数对象的原型链添加一个方法
// 以后可以将obj.prototype[name] = func简写为obj.method(name,func)
Function.prototype.method = function (name,func){
    this.prototype[name] = func;
    return this;
}

// tips 2
// 使用for in 遍历对象时，应检查遍历出的属性来自原型链还是对象成员
var testO = {};
testO.name = 'kasumi';
testO.prototype.wife = 'arisa';
for(key in testO){
    if(testO.hasOwnProperty(key)){
        // do something
    }
}

// tips 3
// 继承并创建一个子类
if(typeof Object.beget !== 'function'){
    Object.create = function(father){
        var Child = function(){};
        Child.prototype = father;
        return new Child();
    };
}
var child = Object.create(father);

// tips 4
// 避免在循环中创建函数
var aim = []

// 错误的做法
for(var i = 0;i<8;i++){
    aim[i] = function(){
        alter(i);
    }
}

// 正确的做法
function alte(j){
    alter(j);
}
for(var i = 0;i<8;i++){
    aim[i] = alte(i);
}

// 为replace传入函数
// str：匹配到的字符串，cs1：正则表达式中的子串，index：匹配到的位置
'a111ba222b'.replace(/a([0-9]+)b/g,function(str,cs1,index){
    console.log(str);
    console.log(cs1);
    console.log(index);
    return 'rep';
});
