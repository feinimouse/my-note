package main

import (
	"fmt"
	"com.bupt317/study1/tree"
)

func main() {

	var root tree.Node

	// 通过属性名来初始化赋值
	root = tree.Node{Value: 3}
	root.Left = &tree.Node{}
	root.Left.Right = &tree.Node{Value:7, Left: tree.CreateTreeNode(8)}
	// 直接按照属性顺序初始化赋值不用写属性名
	root.Right = &tree.Node{5, nil, nil}
	// 使用new创建不用去取指针
	root.Right.Left = new(tree.Node)

	// 结构体切片
	nodes := []tree.Node{
		{},
		{Value:9},
		root,
	}

	fmt.Println("结构体切片：",nodes)

	fmt.Println("root的遍历:")
	root.Traverse()
	fmt.Println()

	fmt.Println("root的后序遍历:")
	myRoot := tree.MyNode{Node:&root}
	myRoot.PostOrder()
	fmt.Println()

	count:=0
	root.TraverseFunc(func(n *tree.Node) {
		count++
	})
	fmt.Printf("一共有%d个节点",count)

}
