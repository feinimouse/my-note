/**
 * LRU（Least Recently Used）队列的实现
 * 使用一个队列记录下最近访问的页面
 * 并将其最近访问的页面存到缓存
 */
class LRUjs {
    constructor(maxMemery = 5, resourceApi = item => item) {
        this.max = maxMemery;
        this.api = resourceApi;
        this.memeryMap = new Map();
        this.queueHead = null;
        this.queueEnd = null;
        this.size = 0;
    }
    getQueue() {
        return {
            queueEnd,
            queueHead,
            size,
        }
    }
    save(key, value) {
        const temp = new DouLinkNode();
        temp.value = key;
        if (this.max === 1) {
            this.queueEnd = temp;
            this.queueHead = temp;
            this.memeryMap.clear();
            this.memeryMap.set(key, value);
            return;
        }
        if (this.size >= this.max) {
            const oldKey = this.queueEnd.value;
            this.queueEnd.pre.next = null;
            this.queueEnd = this.queueEnd.pre;
            this.memeryMap.delete(oldKey);
            this.size --;
        }
        if (!this.queueHead) {
            this.queueEnd = temp;
        } else {
            temp.next = this.queueHead;
            this.queueHead.pre = temp;
        }
        this.queueHead = temp;
        this.memeryMap.set(key, { value, node: temp });
        this.size ++;
    }
    get(key) {
        if (this.max < 1) {
            return this.api(key);
        }
        if (this.memeryMap.has(key)) {
            if (this.max !== 1) {
                const node = this.memeryMap.get(key).node;
                // 在第一位（index = 0）则保持不动
                if (node != this.queueHead) {
                    if (node.next) {
                        node.pre.next = node.next
                        node.next.pre = node.pre;
                    } else {
                        this.queueEnd = node.pre;
                        this.queueEnd.next = null;
                    }
                    node.next = this.queueHead;
                    this.queueHead.pre = node;
                    node.pre = null;
                    this.queueHead = node;
                }
            }
            return this.memeryMap.get(key).value;
        }
        const value = this.api(key);
        this.save(key,value);
        return value;
    }
}
