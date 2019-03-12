package main

import "fmt"

// 接收类型为指针
func swap1(a, b *int) {
	*a, *b = *b, *a
}

func swap2(a, b int) (int, int) {
	return b, a
}

func main() {
	a, b := 1, 2
	fmt.Println("交换前：",a, b)
	// 传入指针
	swap1(&a, &b)
	fmt.Println("交换后：",a, b)

	c, d := 3, 4
	fmt.Println("交换前：",c, d)
	c, d = swap2(3, 4)
	fmt.Println("交换后：",c, d)

}
