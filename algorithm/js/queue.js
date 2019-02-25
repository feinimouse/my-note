/**
 * js实现队列
 */

class Queue {
    headNode = null;
    endNode = null;
    size = 0;
    isEmpty() {
        return Boolean(!this.headNode);
    }
    get head() {
        return this.headNode ? this.headNode.value : null;
    }
    set head(value) {
        const temp = new LinkNode();
        temp.value = value;
        if (this.isEmpty) {
            this.headNode = temp;
            this.endNode = temp;    
        } else {
            temp.next = this.headNode;
            this.headNode = temp;
        }
        this.size ++;
    }
    get end() {
        return this.endNode ? this.endNode.value : null;
    }
    set end(value) {
        this.in(value);
    }
    out() {
        if (!this.isEmpty()){
            const temp = this.headNode;
            this.headNode = this.headNode.next;
            this.size --;
            return temp.value;
        }
        return null;
    }
    in(value) {
        const temp = new LinkNode();
        temp.value = value;
        if (this.isEmpty()) {
            this.endNode = temp;
            this.headNode = temp;
        } else {
            this.endNode.next = temp;
            this.endNode = temp;
        }
        this.size ++;
    }
    release() {
        this.headNode = null;
        this.endNode = null;
    }
    print() {
        if (this.isEmpty()) {
            console.log('空队列');
            return;
        }
        let cur = this.headNode;
        const list = [];
        while (cur) {
            list.push(cur.value);
            cur = cur.next;
        }
        console.log(list);
    }
}

