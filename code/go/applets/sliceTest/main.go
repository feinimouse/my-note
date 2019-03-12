package main

import "fmt"

func main() {

	fmt.Println("测试:")
	var st []int
	for i:=0;i<12;i++{
		st=append(st,i)
	}

	fmt.Println("原切片:")
	fmt.Println(st)

	fmt.Println("删除切片指定头:")
	test1(&st,2)
	fmt.Println(st)


	fmt.Println("删除切片指定位置:")
	test2(&st,5)
	fmt.Println(st)

	st = append(st[:3],st[4:]...)
	fmt.Println(st)

}

// 去除切片头,测试切片是否为引用传递？
func test1(s *[]int,i int){
	*s = (*s)[i:]
}

//去除中间
func test2(s *[]int,i int)  {
	// 和js6类似s[]...表示将数组转化为一列参数输入
	*s = append((*s)[:i],(*s)[i+2:]...)
}
