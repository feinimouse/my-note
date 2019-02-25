/**
 * js实现栈
 */
class Stack {
    head = new LinkNode();
    count = 0;
    release() {
        while (this.head.next) {
            this.head.next = this.head.next.next;
        }
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    top() {
        if (this.isEmpty()) {
            return null;
        }
        return this.head.next.value;
    }
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        const temp = this.head.next.value;
        this.head.next = this.head.next.next;
        this.count--;
        return temp;
    }
    push(value) {
        const node = new LinkNode();
        node.value = value;
        node.next = this.head.next;
        this.head.next = node; { }
        this.count++;
    }
    print() {
        if (this.isEmpty()) {
            console.log('空栈');
            return;
        }
        let cur = this.head.next;
        const list = [];
        while (cur) {
            list.push(cur.value);
            cur = cur.next;
        }
        console.log(list);
    }
}

const stackUtils = {

    createStack() {
        const stack = new Stack();
        for (let i = 9; i > 0; i--) {
            stack.push(i);
        }
        return stack;
    },

    moveLastToTop(stack) {
        if (stack.isEmpty()) {
            return;
        }
        const top = stack.pop();
        if (!stack.isEmpty()) {
            this.moveLastToTop(stack);
            const temp = stack.pop();
            // 交换相邻的项
            stack.push(top);
            stack.push(temp);
        } else {
            // 最后一项不做交换
            stack.push(top);
        }
    },

    moveMaxToTop(stack) {
        if (stack.isEmpty()) {
            return;
        }
        const top = stack.pop();
        if (!stack.isEmpty()) {
            this.moveMaxToTop(stack);
            // 将大的项向上排列
            if (stack.top() > top) {
                const temp = stack.pop();
                stack.push(top);
                stack.push(temp);
                return;
            }
        }
        stack.push(top);
        
    },

    sortStack(stack) {
        if (!stack.isEmpty()) {
            this.moveMaxToTop(stack);
            const max = stack.pop();
            this.sortStack(stack);
            stack.push(max);
        }
    },

}