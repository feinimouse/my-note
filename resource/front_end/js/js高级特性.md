<font size="4">

# js高级特性

by 菲尼莫斯  2019年3月29日

---

## proxy代理

创建一个对象的代理，类似于一个中介，可以在对象的各种行为前进行一系列的操作，实际执行还是原对象来执行

### 使用方法

`const proxy = new Proxy(target, handler)`

* target：要代理的目标对象
* handler：对要代理的属性的设置
* proxy：代理后所生成的对象

### 其他

* proxy可以作为其他对象的原型（Object.create(proxy)），当从原型读取属性时便可以触发proxy代理机制

* 需要牢记 func.propertype.contructor === func

### handler支持的属性

* `get: function(target, key, receiver)`
    * 在获取对象的属性时执行的操作
    * target：原对象
    * key：当前要获取的属性
    * receiver：proxy对象
    > 关于receiver：当返回值是Reflect.get时，且目标属性是getter，这个参数是否传给Reflect.get，结果会不一样。具体来说，将参数三作为Reflect.get的参数三使用，遇见getter在取子属性时，会触发代理，而若没有，则不触发代理。

    ```js
    const o = { a: { b: 1 }, d: 2 };
    const proxy = new Proxy(o, {
        get(target, key, receiver) {
            console.log(key);
            console.log(target === o);
            console.log(receiver === proxy);
            return target[key];
        }
    });
    console.log(proxy.d);
    // 打印结果：d true true 2
    // 注意以下这种情况
    console.log(proxy.a.b);
    // 打印结果：a true true 1
    // 此时先触发o.a的代理，因此target, key, receiver都对应的上
    // 返回的target[key]实际上是o.a这个{b: 1}对象，之后再调用o.a.b，由于代理只对第一层对象生效，因此无法将b也代理
    ```

* `set: boolean function(target, key, value, receiver)`
    * 在为属性重新赋值时执行的操作
    * vlaue表示要赋予的值
    * set方法应该返回一个布尔值，返回true代表此次设置属性成功了，返回false则会抛出TypeError异常

</font>
