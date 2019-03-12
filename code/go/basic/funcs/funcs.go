package main

import (
	"fmt"
	"reflect"
	"runtime"
)

func getDiv(a, b int) (q, r int) {
	// 在函数的返回值处定义好返回值的变量名和类型，可以在函数中直接使用
	q = a / b
	r = a % b
	// 直接调用return可以返回即可返回值
	return
	// return q,r
}

// 形参可以是函数
func apply( operate func(int,int) (int,int),a,b int )(int,bool)  {
	//获取函数的指针
	pointer := reflect.ValueOf(operate).Pointer()
	//根据指针在runtime中获取函数名
	opName:=runtime.FuncForPC(pointer).Name()
	r := 0
	s := false
 	if r,_=operate(a,b); r > 0 {
 		s = true
 		fmt.Printf("calling function %s with args (%d , %d) success \n", opName , a, b)
	}
	return r,s
}

//可以传入可变参数列表
func sum(ints ...int )int  {
	s:=0
	for i:=range ints {
		s+=ints[i]
	}
	return s
}

func main() {
	q1, r := getDiv(17, 5)
	// 用 _ 表示只接受一个返回值
	q2, _ := getDiv(29, 6)
	fmt.Println(q1, r, q2)
	fmt.Println(apply(getDiv,99,7))
	fmt.Println(sum(1,2,3,4,5,6))
}
