import { LinkNode } from "./linkArray";

export default class Queue {
    headNode = null;
    endNode = null;
    size = 0;
    isEmpty() {
        return Boolean(this.headNode);
    }
    get head() {
        return this.headNode ? this.headNode.value : null;
    }
    get end() {
        return this.endNode ? this.endNode.value : null;
    }
    out() {
        if (!this.isEmpty()){
            const temp = this.headNode;
            this.headNode = this.headNode.next;
            return temp.value;
        }
        return null;
    }
    add(value) {
        const temp = new LinkNode();
        temp.value = value;
        if (this.isEmpty()) {
            this.endNode = temp;
            this.headNode = temp;
        } else {
            this.endNode.next = temp;
            this.endNode = temp;
        }
    }
    release() {
        this.headNode = null;
        this.endNode = null;
    }
}