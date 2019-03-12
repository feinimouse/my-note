package main

import "fmt"

func main() {
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	// 切片[:]是对数组的view映射
	fmt.Println("[2:6]", arr[2:6])
	fmt.Println("[2:]", arr[2:])
	// [:6]实际上只取了下标0-5
	fmt.Println("[:6]", arr[:6])
	fmt.Println("[:]", arr[:])

	// 切片的值和数组一一对应，对切片的修改会直接影响到数据本身
	updateSlice(arr[:], 1, 100)
	fmt.Println("updateSlice:", arr)

	//修改切片的1号位影响到了数组的5号位
	updateSlice(arr[5:], 1, 100)
	fmt.Println("updateSlice:", arr)

	// 切片自身也可以形成切片
	s1 := arr[:]
	s2 := s1[2:]
	s3 := s2[:5]
	fmt.Println("reslice:", s3)
	// 切片创建时可以扩展(cap(s3)=6)出原切片范围(len(s3)=5 )，但不得超过原数组的范围
	// 此时的s3[2 3 4 5 100]的6号位是不存在，切片创建时直接从原数组获取
	// 但直接获取s3[6]的值是无法做到的，只有切片可以
	s4 := s3[4:6]
	fmt.Println("outslice:", s4)

	//当扩展切片的长度超出原数组时，切片将映射一个新的数组
	s5 := append(s1, 100, 200)
	fmt.Println("扩展1:", s5)
	fmt.Println("原数组:", arr)

	//切片长度不超过原数组时，扩展将直接反映到原数组上
	s6 := append(s3, 99)
	fmt.Println("扩展2:", s6)
	fmt.Println("原数组:", arr)

	fmt.Print("\n \n \n \n")

	sliceOperate()
}

func sliceOperate()  {
	// go语言会为每个声明的变量初始化，切片的初始化值为nil
	var s1 []int
	for i:=0;i<10;i++{
		s1=append(s1,i*2+1)
	}
	s2 := []int{1,2,3,4}
	// 参数： 切片类型；切片长度；cap值（底层数组长度）
	s3 := make([]int,8,34)

	printSlice(s1)
	printSlice(s2)
	printSlice(s3)

	// 复制切片
	fmt.Println("复制切片:")
	copy(s1,s2)
	// 此时s1直接被替换为复制后新的切片
	printSlice(s1)

	fmt.Println("删除切片指定位置:")
	removeByIndex(s1,5)
	printSlice(s1)



}

func updateSlice(arr []int, p int, aim int) {
	arr[p] = aim
}

func printSlice(s []int)  {
	fmt.Printf("len = %d ; cap = %d", len(s),cap(s))
	fmt.Println(s)
}

func removeByIndex(s []int,i int)  {
	// 和js6类似s[]...表示将数组转化为一列单个参数输入
	printSlice(s[:i])
	printSlice(s[i+2:])
	s = append(s[:i],s[i+2:]...)
	printSlice(s)
}

