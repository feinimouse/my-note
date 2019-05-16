

# import和export

by 菲尼莫斯  2018年9月21日

---


## export导出

```js

// 直接导出变量
const name="小明";
const age=20;
export {name,age};

// 导出函数
export function getName(){
	return name;
}

// 默认导出，每个js只能有一个默认导出
export default {
  test:'test'
  func(){
    return 'func'
  }
}

```

## import导入

```js

// 普通导入
import {name,age} from './export.js'
// 全部导入
import * as input from './export.js'
// 默认导入，即导入export default的内容
import test './export.js'

console.log(name,age)
console.log(input.getName())

console.log(test.test,test.func())

```




