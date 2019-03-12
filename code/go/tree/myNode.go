package tree

type MyNode struct {
	Node *Node
}

func (mine *MyNode) PostOrder()  {
	if mine == nil || mine.Node ==nil{
		 return
	}
	left:=MyNode{mine.Node.Left}
	left.PostOrder()
	right:=MyNode{mine.Node.Right}
	right.PostOrder()
	mine.Node.Print()
}
