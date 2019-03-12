package main

import (
	"com.bupt317/study1/functional"
	"fmt"
)

func main() {

	fmt.Println("普通累加")
	const base =10
	adder1 := functional.AdderNormal(base)
	for i:=0;i<10;i++{
		// 重复使用一个函数闭包进行累加
		r := adder1(i)
		fmt.Printf("初始值为%d的普通累加：%d \n",base,r)
	}

	fmt.Println()

	fmt.Println("函数式累加")
	adder2 := functional.Adder(base)
	for i:=0;i<10 ;i++  {
		var r int
		// 每次累加完成返回一个函数进行下一次累加
		r, adder2 = adder2(i)
		fmt.Printf("初始值为%d的函数式累加：%d \n",base,r)
	}

}
