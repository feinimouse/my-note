

# es6学习

by 菲尼莫斯 2018年12月13日

---

## const 和 let 使用习惯

* let和const不会发生变量提升

* let和const不能重复声明同名变量

* 在for循环中每循环一次生成一个作用域

* const不是严格的敞亮，const数组和对象中的属性是可变的

* 使用Object.freeze()函数可以将一个对象的第一层属性变为不可变的常亮

## 箭头函数

* 箭头函数的this无法被call()或apply()改变

* 箭头函数直接返回对象时应用括号包裹 `()=>({})`

* 以解构对象作为输入参数时应用括号包裹 `({happy,lucky}) => happy + lucky`、`([happy,lucky]) => happy + lucky`

### 函数中的this指向

* 普通函数

```js
function f1() {
    // this指向global
    return this;
}

function f2() {
    "use strict";
    // this指向undefined
    return this;
}
```

* 对象中的this

```js
this.happy = 'yeah';
const hhw = {
    happy: 'lucky',
	smile: function(){
        // 在函数中使用this，指向定义函数的类
		return this.happy;
    },
    member:{
        // 直接在类属性上使用this，指向最外层定义类的上下文
        kkr: this.happy,
		msk: 'dj',
        kanon: function(){
            // 此处也指向定义函数的类
            return this.msk;
        }
    }
}

```

* 箭头函数的this指向是在定义函数时就绑定了，而function则是在运行时才进行绑定，因此apply和call方法对箭头函数无效

```js
function HHW() {
    setTimeout(() => {
        // 此处的this在定义时就绑定了HHW对象
        console.log(this);
    }, 1000);
}
function HHW() {
    setTimeout(function(){
        // 此处的this在定时函数启动时才进行this的绑定，此时this已经指向了global
        console.log(this);
    }, 1000);
}

```

## 对象

* 使用`__proto__`属性来继承一个父类

```js
const child = {
  __proto__: new Father(),
}
```

* class的使用

```js
// 用class代替传统的function声明一个类
class HHW{
    // constructor表示构造函数，同传统function类的函数体
    constructor (happy,lucky) {
        // 这里的this指向class
        this.happy = happy;
        this.lucky = lucky;
    }

    // 直接定义类所拥有的方法，同prototype.simle = function(){...}
    simle(){
        console.log(`this is happy: ${this.happy}, and that is lucky: ${this.lucky}.`);
    }
}

```

* class定义方法时不能使用箭头函数，否则函数内的this将会指向定义class所在的上下文

* extends继承

```js
class Band {
    constructor(name) {
        this.name = name;
    }
    paly() {
        return `${this.name} is playing`;
    }
}

class HHW extends Band {
    construtor(name, vocal){
        // 使用super来调用父类的构造函数
        super(name);
        // 需要在super之后才能使用this
        this.vocal = vocal;
    }
    // 重写父类的方法
    play() {
        return `${this.vocal} is singing`;
    }
}
```

* get 与 set 的使用

类似于vue的computed，可以在class定义和对象定义中使用

```js
const hhw = {
    slogan:[],
    set slogan(word){
        this._slogan.push(word);
    },
    get vocal(){
        return 'kkr';
    },
}

// 直接调用get获取函数的返回值
console.log(hhw.vocal);
// 直接调用set对内部数组进行扩充
hhw.slogan('happy');

```

* static 的使用类似于java中的static

    * 静态属性在继承时直接引用不进行复制

    * 静态方法可以直接用类调用，不用新建类

    * 静态方法中不能出现this或其他外部变量

## 解构

* 使用`[]`来动态计算属性名

```js
const hhw = {
  ['hello' + 'happy' + 'world']: 'hlsy!',
}
```

* 解构未成功时的默认值为：undefined

* 默认值在解构中使用：

```js
// a的默认值为3：
const [a = 3] = []
```

* 默认值在函数中使用：

```js
// b的默认值为3：
function test(b = 3) {
    // ... //
}
```

  * 默认值配合别名使用：

```js
// happy的默认值为3：
const{a, b:happy = 3} = {a:1}
```

* 解构中别名的使用

```js
// 将lucky赋值给常量smile
const {happy, smile: lucky} = {happy: 1, lucky: 2}
```

* 深度解构

```js
// 深度解构赋值vocal和guitar两个常量
const {
        name,
        hhw: { vocal, guitar },
    } = {
        name: 'happy',
        hhw: { vocal: 'kkr', guitar: 'kor' },
    }
```

* 解构在遍历中的使用

```js
const arr = [
    { name: 'hhw', vocal: 'kkr'},
    // ... //
];

arr.forEach(({name, vocal}) => {
    // ... //
});

for (const {name, cocal} of arr) {
    // .. //
}
```

* 剩余参数

```js
function test( arg, ...args) {
    // args会自动转换为一个数组，包含了除了arg外的其他参数
}
```

* 在箭头函数中arguments会绑定到上层作用域

* 将数组作为参数传入函数

```
function hhw(happy, lucky){};

// 传统传参
hhw(1,2);

// 使用数组传参
hhw(...[1, 2]);
```

## symbol用法

### 基本用法

`const s = Symbol();` 创建一个symbol对象

* `s === Symbol(); // false`

* `console.log(s); // Symbol()`

`const s2 = Symbol('kasumi')` 创建一个带描述的symbol对象

* `s2 === Symbol('kasumi') // false`

* `console.log(s2); // Symbol(kasumi)`

`const s3 = Symbol.for('arisa')` 创建一个全局通用的symbol对象

* `s3 === Symbol.for('arisa'); // true`

* `console.log(s3); // Symbol(arisa)`

* `Symbol.keyFor(s3); // arisa`

### symbol内置的对象与对象行为控制

## Proxy对象与元编程

## 字符串的操作

* 码元操作
    * 对于js中的utf-16来说，一个字符可能是16位（1个码元）或是32位（2个码元）
    * String.charCodeAt() : 返回指定字符的码元
    * String.codePointAt() : 返回指定码元位置的码元
    * String.fromCodePoint() : 将某个码元提取为字符

* String.includes( {search}, {start} ) : 在给定文本存在于字符串中的任意位置时会返回 true ,否则返回false

* String.startsWith( {search}, {start} ) & endsWith( {search}, {start} ) : 在给定文本出现在字符串起始处&结尾处时返回 true ,否则返回 false

* String.repeat( {times} ) : 返回一个将String重复times次的字符串

* 获取未被转义的模版字符串 : String.raw()

```js
let m1 = `Happy \n Lucky \n Smile \n Yeah`
console.log(m1);
// "Happy \n Lucky \n Smile \n Yeah"

let m2 = String.raw`Happy \n Lucky \n Smile \n Yeah`
console.log(m2);
/*
"Happy
 Lucky
 Smile
 Yeah"
*/
```

## 函数

* 块级作用域的函数
    * 块级函数指的是在if块，for块等位置声明的函数
    * 在严格模式下，在块中声明的函数拥有块级作用域
    * 在非严格模式下，块中声明的函数会被提升至块的上一个合法的作用域

* 对箭头函数this的再次明确：
    * 普通函数的this在调用时进行绑定
    * 箭头函数的this永远指向代码编写时声明函数的上下文

* 创建动态函数

```js
let temp = 666;

var add = new Function("a", "b", `return a + b + ${temp}`);

console.log(add(1, 1)); // 2

var pickFirst = new Function("...args", "return args[0]");

console.log(pickFirst(1, 2, 3, 4)); // 1

```

## 一些新方法

* Array.map(fnc(){return newItem}) : function内的返回值将组成一个新的数组

* Array.sort(fnc(a,b){return c})
    * c < 0 则a排在b前面
    * c > 0 则b排在a前面
    * c = 0 则a和b的相对位置不变

* Array.reduce((x, y) => z) :
    * 第一次循环，ｘ位数组第一项，ｙ为第二项
    * 第n次循环，ｘ为上一次循环中传出的ｚ，ｙ为第n+1项


## 其他

* forEach、filter等方法的第二个参数可以为回调函数指定一个上下文，其默认值为调用时的上下文



