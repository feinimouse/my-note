/**
 * 用js实现二叉树
 */

 class BinaryTreeNode {
    value = null;
    left = null;
    right = null;
    
    copyTree() {
        if (!this) {
            return null;
        }
        const temp = new BinaryTreeNode();
        temp.value = this.value;
        temp.left = this.left.copyTree();
        temp.right = this.right.copyTree();
        return temp;
    }

    findParent(node1, node2) {
        if (this === null || this === node1 || this === node2) {
            return this;
        }
        const left = this.left.findParent();
        const right = this.right.findParent();
        if (!left) {
            return right;
        } else if (!right) {
            return left;
        }
        return this;
    }

    // 层序遍历
    forEachByFloor(opera) {
        const queue = new Queue();
        queue.in(this);
        let cur;
        while (!queue.isEmpty()) {
            cur = queue.out();
            opera(cur);
            if (cur.left) {
                queue.in(cur.left);
            }
            if (cur.right) {
                queue.in(cur.right);
            }
        }
    }

    // 操作某一层
    forFloor(level, opera) {
        if (level < 1){
            return;
        }
        if (level === 1) {
            return opera(this);
        }
        if (this.left) {
            this.left.forFloor(level -1, opera);
        }
        if (this.right) {
            this.right.forFloor(level -1, opera);
        }
    }

    // 左度优先遍历
    forEachByLeft(opera) {
        if (this.left) {
            this.left.forEachByLeft(opera);
        }
        opera(this);
        if (this.right) {
            this.right.forEachByLeft(opera);
        }
    }

    equalOf(node) {
        if (this === null && node === null) {
            return true;
        } else if (this === null || node === null) {
            return false;
        }
        return node.value === this.value && 
            this.left.equalOf(node.left) &&
            this.right.equalOf(node.right);
    }

    static fromArray(array) {
        if(array.length < 1) {
            return null;
        }
        const cur = new BinaryTreeNode();
        if (array.length === 1) {
            [cur.value] = array;
            return cur;
        }
        cur.value = array[Math.floor(array.length / 2)];
        cur.left = BinaryTreeNode
            .fromArray(array.slice(0, array.length/2));
        cur.right = BinaryTreeNode
            .fromArray(array.slice((array.length/2) +1 , array.length));
        return cur;
    }

    getIndexOf(node) {
        let index = 1;
        if (deal(this)) {
            return index;
        } 
        return -1;
        function deal(root) {
            const cur = index;
            if (!root) {
                return false;
            }
            if (root === node ) {
                return true;
            }
            index = cur * 2;
            if (deal(root.left)) {
                return true;
            } 
            index = (cur * 2) + 1;
            if (deal(root.right)) {
                return true;
            }
            return false; 
        }
    }
    
    getNodeOf(index) {
        if (index < 1) {
            return null;
        }
        if (index === 1) {
            return this;
        }
        let result = this;
        let temp;
        // deep 为遍历的深度，即节点编号的二进制值的位数
        for(let deep = Math.floor(Math.log2(index)); deep > 0; deep--){
            // 若节点编号二进制值在除第一位的某位为1，则表示下一步要遍历右子节点，反之遍历左子节点
            // 此处使用 0b1000 与上 0bxxxx ,若结果部位0则代表xxxx第一位为1
            if (((1 << (deep -1)) & index) > 0) {
                result = result.right;
            } else {
                result = result.left;
            }
            if (!result) {
                return null;
            }
        }
        return result; 
    }

    static toLinkArray(root) {
        let head = null;
        let end = null;
        deal(root);
        return {
            head,
            end,
        };
        function deal(node) {
            if (!node) {
                return;
            }
            deal(node.left);
            node.left = end;
            if (!end) {
                head = node;
            } else {
                end.right = node;
            }
            end = node;
            deal(node.right);
        }
    }
 }