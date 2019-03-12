package main

import (
	"com.bupt317/study1/interfaces/retriever/impl"
	"fmt"
	"time"
)

type Retriever interface {
	Get(url string) string
}

func download(r Retriever, url string) string {
	return r.Get(url)
}

func main() {
	var r Retriever
	r = impl.RetrieverDemo{Content:"kokoro"}
	fmt.Printf("%T %v\n",r,r)


	// 注意此处的impl.Retriever接口类的方法时对自身的引用this（接收者）是*Retrieve不是Retrieve
	// func (r *Retriever) Get(url string) string
	// 因此r变量传入的实现类必须是一个指针才能完成实现类中的相应操作（若this接收者是值，则传入需要是值）
	// 当接口方法中需要用到指针类型的this时，接口会自动变为指针类型，但不需要显示的用*来表示这是一个指针
	// go语言中大部分情况下指针和以当值用，但值绝对不能当指针用
	r = &impl.Retriever{UserAgent:"misaki",TimeOut:time.Minute}
	fmt.Printf("%T %v\n",r,r)

	// 从接口中获取它的实现类
	// 输入参数*impl.Retriever一定要对应当前接口所指向的实现类类名，否则获取不出来
	// r.(*impl.Retriever)返回获取的实现类的指针或者值（由this的类型决定），以及是否获取成功
	if rImpl,ok := r.(*impl.Retriever);ok{
		fmt.Println(rImpl)
	}else {
		fmt.Println("接口实现类不匹配")
	}

	// r.(xxx)实质是对其所属类型的强制转换，将接口类转换为其实现类
	// 更常用的用法如下
	var intf interface{}
	intf = 99
	// 等于将object类转换为int类使用
	fmt.Println(intf.(int)+100)

	// fmt.Println(rImpl.Get("http://www.baidu.com/"))
	// fmt.Println(download(r, "https://www.baidu.com/"))

}
