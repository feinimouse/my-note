package main

import (
	"fmt"
	"math/cmplx"
	"math"
)

//可以使用括号批量定义变量
var (
	aa string
	// uint表示无符号整数
	// int表示有符号整数
	// int8表示8位二进制有符号整数
	// uintptr表示整数指针
	bb uint8 = 3
)

// rune 即char类型
// float32 float64 浮点数
// complex64 complex128 复数 如：var f = 3 + 4i
// 常量 const a,b = "aaa" , 5
// 若不规定常量的类型，量b既可以用作字符串string又可以用作int或float使用

func variable() {
	var i1, i2 int = -100, +5
	var s1 string
	// 可以省略变量类型直接创建
	var s2, b, i3 = "Happy Lucky", false, 99
	// 函数内可以使用:=代替var ， 注意全局变量不能使用:=代替var
	t1, t2, t3, t4 := 1, 2, true, "Smile"
	// %d表示正常整数输出，%q表示字符串输出带引号
	fmt.Printf("%d %q \n", i1, s1)
	fmt.Println(i2, s2, b, i3)
	fmt.Println(t1, t2, t3, t4)
}

func euler() {
	// cmlpx为go语言的数学计算工具包,exp表示e为底的指数，pow表示指数，abs表示绝对值
	// math包中有常用的数学常量
	e := cmplx.Exp(1i * math.Pi)
	//欧拉公式 // .3f表示浮点数保留3位小数
	fmt.Printf("%.3f \n", e+1)
}

func transType() {
	a, b := 3, 4
	var c int
	// 所有的数据类型必须强制转换，不能自动转换
	c = int(math.Sqrt(float64(a*a + b*b)))
	fmt.Println(c)
}

func iotaUse() {
	// iota表达式代表数字由0自增
	const (
		a = iota + 1
		b
		// "_" 可以跳过某个自增数
		_
		c
		d
	)
	fmt.Println(a, b, c, d)
}

func main() {
	fmt.Println("Hello Happy World")
	variable()
	aa = "Happy Luck Smile Yeah"
	fmt.Println(aa, bb)

	euler()
	transType()
	iotaUse()
}
