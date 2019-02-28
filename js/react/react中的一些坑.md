<font size="4">

# react中的一些坑

by 菲尼莫斯 2018年7月29日

---

## 在JSX中，触发函数的this指向问题

必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

或者使用箭头函数来锁定this的指向

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this);
    }

    handleClick2 = () => console.log(this);

    render() {
        return (
          <button onClick={this.handleClick}>btn1</button>
          <button onClick={this.handleClick2}>btn2</button>
        );
    }
}
```

## react router 和 mobx 同时使用的冲突

数据层mobx的 **@observer** 与 react router的 **Link** 组件同时使用时，会导致router触发地址变化，但无法刷新页面的情况。具体症状就是点了连接，而页面没反应的情况，后台也无报错。

如下面一段代码，link的跳转完全失效：

```js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Index1,
  Test1,
  Test2,
} from '../config/router';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import { State } from '../store/app-state';

@inject('state')
@observer
export default class App extends React.Component {
  propTypes ={
    state: PropTypes.instanceOf(State).isRequired,
  };

  render() {
    const { state } = this.props;
    return [
      <div>
        <h1>{state.title}</h1>
        <hr />
      </div>,
      <div>
        <Link to="/">首页</Link><br />
        <Link to="/test1">测试页1</Link>
        <Link to="/test2">测试页2</Link>
      </div>,
      <div>
        <Route path="/" component={Index1} />
        <Route path="/test1" component={Test1} />,
        <Route path="/test2" component={Test2} />,
      </div>,
    ];
  }
}

```

**问题原因：**

@observer 注解重写了react的render相关的某些方法来保证mobx的数据能够实时更新到页面上，而link控制页面跳转需要用到用到这些方法，导致冲突。具体解释如下：

> observer重写了shouldComponentUpdate，shouldComponentUpdate拦截了后续render过程，导致没有触发到后续Route组件的shouldComponentUpdate过程。

[详情原因见该文章](https://yq.aliyun.com/articles/147474?t=t1)

**解决方案：**

将@observer的使用放到子组件中进行：

将运用到mobx的本分代码新建一个组件并替换

```js
//抽离出这部分代码
<div>
  <h1>{state.title}</h1>
  <hr />
</div>,

//新建一个TitleMain组件，state的数据在该组件中获取
<TitleMain />,
<div>
  <Link to="/">首页</Link><br />
  <Link to="/test1">测试页1</Link>
  <Link to="/test2">测试页2</Link>
</div>,
<div>
  <Route path="/" component={Index1} />
  <Route path="/test1" component={Test1} />,
  <Route path="/test2" component={Test2} />,
</div>,

```
顶层的组件中尽量不要出现mobx的相关操作，react是一个单向的数据流，中间层起到嵌套的作用，应该到最底层显示数据是再进行@observer进行数据绑定

</font>
