
# 常用DOM操作

by 菲尼莫斯 2019年9月26日

---

## 基础

第一个标签： `<!DOCTYPE html>`

获取URL：`document.documentURI` 或 `Node.baseURI`

获取cookie：`document.cookie`

Node的类型：Text（内联文本）、Element（常规节点如div）、Comment（注释）

记住Element继承于Node

## 创建

**document.createElement('HTML标签名')** 创建一个DOM节点

**document.createAttribute('属性名')** 创建一个HTML属性，通常用setAttribute代替


## 查询

**document.getElementById(id)** 根据id属性查询

**document.getElementsByName(name)** 根据name属性查询，通常用于表单

**document.querySelector(selector)** 根据CSS选择器查询，获取第一个

**document.querySelectorAll(selector)** 同上，获取全部

**document.body** 返回body对象

## Node操作

**Node.setAttribute(key, value)** 设置属性

**Node.children** 返回该Node的所有子Element（不含Text）

**Node.childNodes** 返回该Node的所有子Node

**Node.parentNode** 返回父Node

**Node.cloneNode(deep)** 克隆节点，传入值指定是否深拷贝

**Node.append(Obj)** 追加，可以是文本或Node

**Node.insertBefore(Obj)** 插入到该Node的前面

**Node.contains(Node)** 该节点中是否包含传入的子节点，深度遍历

**Node.hasChildNodes(Node)** 同上，浅遍历

**Node.removeChild(Node)** 删除子节点

**Node.replaceChild(new, old)** 替换节点

## Element操作

**Element.attributes** 返回包含所有属性的Map

**Element.classList** 获得该元素的Class对象
* add(name) remove(name) contains(name) replace(old, new) 增删查改元素拥有的class
* toggle(name) 有则去除，无则添加

**Element.innerHTML** 元素的内部html文本，可以直接设置新的html

**Element.innerText** 获取元素内部的纯文本，也可以直接设置新的纯文本内容

**Element.addEventListener(type, callback(event), options)** 注册监听器

**Element.getAttribute(name)** 返回属性值

**Element.getAttributeNames()** 返回所有属性值name

**Element.hasAttribute(name)** 判断是否含该属性

**Element.removeAttribute(name)** 删除某个属性

**Element.setAttribute(name, value)** 设置某个属性

**Element.dataset** 返回该元素的“data-”属性对象

## 例子

### 监听表单提交
```html
<body class="test">
    <div class="container">
        <form action="./index.html" class="form" method="GET">
            <label class="item">
                <span class="label">输入</span>
                <input type="text" name="text" class="text">
            </label>
            <label class="item">
                <span class="label">选择</span>
                <select name="select" class="select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </label>
            <button>提交</button>
        </form>
    </div>
</body>
<script type="text/javascript">
    const form = document.querySelector('.form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('onsubmit', e);
        // 直接校验
        if (e.target.text.value === '') {
            console.error('no empty text');
            return;
        }
        // 通过FromData对象来获取数据
        const formData = new FormData(myForm);
        const select = formData.get('select');
        // 插入自定义数据
        formData.set('user', 'Feinimouse');
    });
</script>
```