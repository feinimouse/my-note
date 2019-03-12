package main

import "fmt"

// 注意[4]int和[5]为不同的数据类型
func printArray(args [4]int)  {
	// 数组默认为值传递，即拷贝数组到函数内部，不会影响外部
	// 用指针来完成外部修改
	args[3] = 100
	// 直接由range获取下标和值
	for i,v:= range args{
		fmt.Println(i,v)
	}
}

func main() {
	//数组的定义方法
	var args1 [3]int
	args2 := [3]int{1,2,3}
	args3 := [...]int{2,4,6,8}
	var grid [3][3]int

	fmt.Println(args1,args2,grid)

	printArray(args3)

	// 传统遍历
	for i:=0;i<len(args3);i++{
		fmt.Println(args3[i])
	}

}
