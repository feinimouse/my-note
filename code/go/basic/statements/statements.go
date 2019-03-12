package main

import (
	"fmt"
	"strconv"
	"io/ioutil"
	"os"
	"bufio"
	"io"
)

func classifier(items ...interface{}) {
	for i, x := range items {
		// .(type)方法可以对接口的类型进行筛选，返回值是接口所指向的的实现类的本体
		switch v:=x.(type) {
		case bool:
			fmt.Printf("Param #%v is a bool\n", v)
		case float64:
			fmt.Printf("Param #%v is a float64\n", v)
		case int, int64:
			fmt.Printf("Param #%v is a int\n", x)
		case nil:
			fmt.Printf("Param #%v is a nil\n", i)
		case string:
			fmt.Printf("Param #%v is a string\n", i)
		default:
			fmt.Printf("Param #%T is unknown\n", i)
		}
	}
}

func grade(sore int) (result string, err error) {
	// switch可以没有筛选对象，以及default
	err = nil
	switch {
	case sore < 0 || sore > 100:
		// printf返回返回写入的字节数和写入错误
		// Sprintf返回format后的字符串
		// Errorf可以返回一个error对象
		err = fmt.Errorf("wrong scroe with %d\n", sore)
		// switch不需要break
	case sore < 60:
		result = "miss"
	case sore < 70:
		result = "bad"
	case sore < 80:
		result = "good"
	case sore < 90:
		result = "great"
	case sore <= 100:
		result = "perfect"
	}
	return
}

func convertToBin(a int) string {
	if a == 0 {
		return "0"
	}
	result := ""
	// for可以省略起始条件
	for ; a > 0; a /= 2 {
		lsb := a % 2
		// strconv.Itoa 可以将int转为string类型
		result = strconv.Itoa(lsb) + result
	}
	return result
}

func readFileNomr(filename string) {
	// if 语句的条件判断前可以跟多条语句作为局部变量
	// 此时语句之间需要加分号
	if contents, err := ioutil.ReadFile(filename); err != nil {
		fmt.Println(err)
	} else {
		// 此时的err和contents都是只能在if语句中使用的局部变量
		fmt.Printf("%s\n", contents)
	}
}

func readFileByLine(filename string) {
	if file, err := os.Open("./basic/statements/"+filename); err != nil {
		// panic表示中断运行并抛出错误
		fmt.Println(os.Getwd())
		panic(err)
	} else {
		// File类实现了Reader的接口，因此File类可以当Reader使用
		// go语言中只要实现了接口的方法，一个类可以当多个接口使用
		printByReader(file)
	}
}

func printByReader(reader io.Reader)  {
	scanner := bufio.NewScanner(reader)
	// for可以省略起始条件（左）和递增条件（右），只保留结束条件（中）
	// for省略所有条件表示无限循环
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}

func main() {
	const filename = "vocal.txt"

	readFileNomr(filename)

	readFileByLine(filename)

	for i := 51; i < 100; i += 10 {
		result, _ := grade(i)
		fmt.Println(result)
	}

	fmt.Println(grade(-1))

	fmt.Println(
		convertToBin(5),  //101
		convertToBin(10), //1010
	)

	classifier(true,false,3,4,5)

}
