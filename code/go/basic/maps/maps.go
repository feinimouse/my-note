package main

import "fmt"

func main() {
	// map的定义
	m1:= map[string]int{
		"kokoro":1,
		"misaki":2,
		"kanon":3,
		"hagumi":4,
		"kawaru":5,
	}
	// 生成 empty map
	m2:= make(map[string]int)
	// 生成 nil
	var m3 map[string]int

	//遍历
	for k,v := range m1 {
		fmt.Println(k,v)
	}

	// 取值
	 if value,exist := m1["ksm"];exist{
	 	fmt.Printf("存在键值：ksm ：%d",value)
	 }else {
	 	fmt.Println("不存在键值 ksm")
	 }

	 //增加值
	 m1["ksm"] = 8
	 fmt.Println(m1)

	 //删除键值对
	 delete(m1,"ksm")
	 fmt.Println("ksm 删除成功")


	fmt.Println(m1,m2,m3)
}
