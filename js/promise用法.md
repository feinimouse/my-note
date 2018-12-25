<font size="4">

# promise用法

by 菲尼莫斯  2018年10月17日

---

## 基本概念

> Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。简单点说，它就是用于处理异步操作的，异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。

* Promise示例接受一个执行函数

* 在执行函数中：调用resolve()将该实例的状态置为fulfilled，即已完成的，如果失败，可以调用reject()将该实例的状态置为rejected，即失败的

* Promise对象含有then方法，then()调用后返回一个Promise对象，意味着实例化后的Promise对象可以进行链式调用，而且这个then()方法可以接收两个函数，一个是处理成功后的函数，一个是处理错误结果的函数。

## 常规用法

```js
new Promise(
    function(resolve, reject) {

        /* **业务代码** */

        // 业务成功时执行resolve()
        resolve(success返回值)
        // 业务失败时执行reject()
        reject(failed返回值)
    }
).then(
  function(success返回值){
    // 若promise中resolve执行成功，则运行此处
  },
  function(failed返回值){
    // 若promise中reject执行成功，则运行此处
  }
).then(...)
```

## then的链式调用

then默认的执行状态为成功（即resolve或fulfilled）

then接收的值为最近一次调用resolve或reject的赋值

```js
var promise2 = new Promise(function(resolve, reject) {
  // 2秒后置为接收状态
  setTimeout(function() {
    resolve('success');
  }, 2000);
});

promise2
  .then(function(data) {
    // 上一个then()调用了resolve，置为fulfilled态
    console.log('第一个then');
    console.log(data);
    return '2';
  })
  .then(function(data) {
    // 此时这里的状态也是fulfilled, 因为上一步返回了2
    console.log('第二个then');
    console.log(data);  // 2

    return new Promise(function(resolve, reject) {
      reject('把状态置为rejected error'); // 返回一个rejected的Promise实例
    });
  }, function(err) {
    // error
  })
  .then(function(data) {
    /* 这里不运行 */
    console.log('第三个then');
    console.log(data);
    // ....
  }, function(err) {
    // error回调
    // 此时这里的状态也是fulfilled, 因为上一步使用了reject()来返回值
    console.log('出错：' + err); // 出错：把状态置为rejected error
  })
  .then(function(data) {
    // 没有明确指定返回值，默认返回fulfilled
    console.log('这里是fulfilled态');
});
```

## [更多用法详见此处](https://segmentfault.com/a/1190000011652907)

# 一些细节

* then()、catch()会自动返回一个promise对象

* then()或catch()的返回值

    * 无返回值：自动返回一个成功状态的无传递参数的promise

    * promise对象：返回该promise对象

    * 非promise对象：返回成功状态的promise，并将传递参数置为该值

    * throw err：返回失败状态的promise，并将传递参数置为err

</font>
