package main

import (
	"net/http"
	"com.bupt317/study1/errorDeal/webSev/filelisting"
	"os"
	"log"
)

// 定义一个返回error的，controller函数接口
type appHandler func(writer http.ResponseWriter,
	request *http.Request) error

// 自定义ERROR类型
type userError interface {
	error            // 要求实现一个error接口
	// 这里的 Message() 一定要用public类型，否则在实现接口的其他方法时无法调用
	Message() string // 要求实现一个message函数
}

// 用错误处理函数包裹controller，运行controller，若返回的error，则进行处理
func errWrapper(handler appHandler) func(writer http.ResponseWriter,
	request *http.Request) {
	return func(writer http.ResponseWriter,
		request *http.Request) {

		// 运行controller，捕获错误
		err := handler(writer, request)
		if err != nil {

			// 处理自定义错误类型，用户可见 400错误
			if userError,ok := err.(userError);ok {
				http.Error(writer, userError.Message(),http.StatusBadRequest)
				return
			}

			// 处理用户不可见的错误
			code := http.StatusOK
			switch {
			case os.IsNotExist(err):
				code = http.StatusNotFound
				// 没有权限 403
			case os.IsPermission(err):
				code = http.StatusForbidden
			default:
				code = http.StatusInternalServerError
			}
			// 让http服务器自动返回错误信息
			http.Error(writer,
				// 根据错误类型生成错误的提示消息
				http.StatusText(code), code)
			// 打印错误日志
			log.Printf("\033[0m [Error] Server get a %d error: \n %s \n", code, err.Error())
		}

		// 当发生致命（运行时）错误时，保护服务器不停止运行
		defer func() {
			// recover只能在defer中运行，起作用是捕获panic，并进行处理，相当于try catch
			if r := recover(); r != nil {
				log.Printf("\033[0m [Error] Server panic whith error: \n %v \n", r)
				http.Error(writer,
					http.StatusText(http.StatusInternalServerError),
					http.StatusInternalServerError,
				)
			}
		}()
	}
}



func main() {
	const prefix = "/"
	http.HandleFunc(
		// 代理地址的前缀
		prefix,
		// 运行controller
		errWrapper(filelisting.HandlerFileListing))

	// 开启服务
	err := http.ListenAndServe(":8866", nil)
	if err != nil {
		panic(err)
	}
}
