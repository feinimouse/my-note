package applets

import (
	"fmt"
)

//使用range遍历string获得的是int32的rune编码串，下标指向的字节位置
//len(string)获取的是字符串的字节数量
//utf8.RuneCountInString(string)可以获得确切的字符数量
//使用[]byte(string)可以获得每一个字节
// 使用[]rune(string)可以获得每一个字符


func GetMaxChildString(aim string) []byte {
	maxLong := 0
	maxStart := 0
	nowStart := 0
	OccurredMap := make(map[byte]int)

	for i, now := range []byte(aim) {
		if occurred, has := OccurredMap[now]; has && occurred >= nowStart {
			nowStart = occurred + 1
		} else if length := i - nowStart + 1; length > maxLong {
			maxStart = nowStart
			maxLong = length
		}
		OccurredMap[now] = i
	}

	fmt.Println(maxStart, maxLong)

	result := []byte(aim)[maxStart : maxStart+maxLong]

	for _, v := range result {
		fmt.Println(string(v))
	}

	return result
}
