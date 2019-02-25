import { LinkNode } from './linkArray';

export default class Stack {
    head = new LinkNode();
    count = 0;
    release() {
        if (!this.head.next) {
            while (this.head.next) {
                this.head.next = this.head.next.next;
            }
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
        return temp;
    }
    push(value) {
        const node = new LinkNode();
        node.value = value;
        node.next = this.head.next;
        this.head.next = node;
    }
}

function moveLastToTop(stack) {
    if (stack.isEmpty()) {
        return;
    }
    const top = stack.pop();
    if (!stack.isEmpty()) {
        moveLastToTop(stack);
        const temp = stack.pop();
        // 交换相邻的项
        stack.push(top);
        stack.push(temp);
    } else {
        // 最后一项不做交换
        stack.push(top);
    }
}

function moveMaxToTop(stack) {
    if (stack.isEmpty()) {
        return;
    }
    const top = stack.pop();
    if (!stack.isEmpty()) {
        moveMaxToTop(stack);
        // 将大的项向上排列
        if (stack.top > top) {
            const temp = stack.pop();
            stack.push(top);
            stack.push(temp);
            return;
        }
    } else {
        stack.push(top);
    }
}

function sortStack(stack) {
    if (!stack.isEmpty()) {
        moveMaxToTop(stack);
        const max = stack.pop();
        sortStack(stack);
        stack.push(max);
    }
}

// 判断乳栈顺序

// 存储最小值的双栈

export {
    moveLastToTop,
    moveMaxToTop,
    sortStack,
}