package main

import (
	"com.bupt317/study1/interfaces/retriever/impl"
	"fmt"
)

const url = "http://www.baidu.com"

type Poster interface {
	Post(url string, form map[string]string) string
}

type Geter interface {
	Get(url string) string
}

func post(p Poster) {
	p.Post("http://www.baidu.com",
		map[string]string{
			"name": "百度",
			"type": "搜索引擎",
			"do":   "test go",
		})
}

// 接口功能的组合
type Require interface {
	Poster
	Geter
}

func session(r Require) string {
	p :=r.Post(url,
		map[string]string{
			"name": "百度",
			"type": "搜索引擎",
			"do":   "test go",
		})
	fmt.Println(p)
	return r.Get(url)
}


func main() {
	var r Require
	r = &impl.RetrieverDemo{Content:"错误"}
	fmt.Println(session(r))
	fmt.Println(r)
}
