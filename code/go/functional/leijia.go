package functional


// 函数式编程的累加器
type iAdder func(int)(int, iAdder)

func Adder(base int ) iAdder{
	return func(i int) (int, iAdder) {
		return base+i , Adder(base+i)
	}
}

//普通的累加器
func AdderNormal(base int) func(int)int  {
	sum:= base
	return func(i int)int {
		// 此处的sum引用了母函数中的sum
		// 母函数结束时sum并没有被销毁，形成返回值函数的闭包
		sum+=i
		return sum
	}
}
