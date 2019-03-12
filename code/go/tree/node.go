package tree

import (
	"fmt"
)
// 一个文件夹只能有一个包
// 一个go程序只能有一个main包，只有main包下的main方法才能运行
// 方法和属性命名规则：相对于包的 private：小驼峰   public：大驼峰
// 结构名不应包含package名，应采用更简洁的命名法
type Node struct {
	Value       int
	Left, Right *Node
}

// 类的构造函数需要在外部重开新的函数
func CreateTreeNode(value int) *Node {
	return &Node{Value:value}
}

// 类的方法也需定义在外部，重开新的函数
// 在函数名前通过（）定义对this的引用名
// 注意(mine Node)是值传递，需使用(mine *Node)才能使set方法有效
func (mine *Node) Print()  {
	fmt.Print(" ",mine.Value)
}
func (mine *Node) SetValue(value int)  {
	mine.Value = value
}

func (mine *Node) Traverse()  {
	if mine == nil {
		return
	}
	mine.Left.Traverse()
	mine.Print()
	mine.Right.Traverse()
}

func (mine *Node) TraverseFunc(f func(n *Node))  {
	if mine == nil {
		return
	}
	mine.Left.TraverseFunc(f)
	f(mine)
	mine.Right.TraverseFunc(f)
}
