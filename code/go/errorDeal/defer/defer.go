package errorDeal

import (
	"fmt"
	"os"
	"bufio"
	"com.bupt317/study1/functional"
)

func TryDefer()  string {
	// defer相当于java里的finally，可以保证在函数结束时运行该语句
	// defer是一个栈，语句执行顺序后进先出
	defer fmt.Println(1)
	defer fmt.Println(2)
	fmt.Println(3)
	// defer将在panic前运行
	// panic("test error")
	// defer将在return前运行
	return "4"
}

// 读取文件
func WriteFile(filename string)  {
	// 穿件一个文件 写对象
	file, err := os.Create(filename)
	// 在函数结束前自动释放文件 写对象
	defer file.Close()
	if err!=nil {
		panic(err)
	}

	// 创建一个在内存中的writer
	writer := bufio.NewWriter(file)
	// 在函数结束前自动自动释放内存中的内容，并写入文件中
	defer writer.Flush()

	// 将内容输入writer中
	f:= functional.AdderNormal(10)
	for i:=0;i<20 ;i++ {
		fmt.Fprintln(writer,f(i))
	}
}