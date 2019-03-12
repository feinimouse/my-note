package filelisting

import (
	"os"
	"net/http"
	"io/ioutil"
	"log"
	"strings"
)

const prefix = "/list/"

// 自定义错误类型
type userError string
// 实现error接口
func (mine userError) Error()string  {
	return mine.Message()
}
// 实现userError接口
func (mine userError) Message()string  {
	return string(mine)
}

func HandlerFileListing(writer http.ResponseWriter,
	request *http.Request) error {

	// 如果访问的地址不以"/list/"开头则返回错误
	if strings.Index(request.URL.Path, prefix) != 0 {
		return userError("path must start with " + prefix)
	}

	// 运用切片去掉访问路径前的"/list/"
	path := request.URL.Path[len(prefix):]

	log.Printf("\033[0m [Info] Visit the address: \033[33m %s", path)

	//打开文件
	file, err := os.Open(path)
	defer file.Close()
	if err != nil {
		return err
	}

	//读取内容
	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return err
	}

	//将内容写入response
	writer.Write(bytes)

	return nil
}
