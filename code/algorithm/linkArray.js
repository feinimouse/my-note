/**
 * js实现链表，及链表的逆序
 */
class LinkNode {
    constructor() {
        this.value = null;
        this.next = null;
    }
    getLast() {
        let last = this;
        while (last.next) {
            last = last.next;
        }
        return last;
    }
    push(value) {
        const temp = new LinkNode();
        temp.value = value;
        this.getLast().next = temp;
    }
    print() {
        if (this.next) {
            const printList = []
            for (let cur = this.next; cur; cur = cur.next) {
                printList.push(cur.value);
            }
            console.log(printList);
        } else {
            console.log('空链表');
        }
    }
}

class DouLinkNode {
    constructor() {
        this.value = null;
        this.next = null;
        this.pre = null;
    }
}

const linkArraryUtils = {
    // 创建一个指定大小的链表
    createLinkArrary(count) {
        const head = new LinkNode();
        for (let i = 1; i < (count + 1); i++) {
            head.push(i);
        }
        return head;
    },

    // 使用递归逆转链表
    reverseByRecursive(head) {
        if (!head) {
            return;
        }
        // 无头节点
        if (head.value !== 'HEAD') {
            const cur = head;
            const adj = head.next;
            if (adj) {
                const nowhead = this.recursive(head.next);
                adj.next = cur;
                cur.next = null;
                // 返回最后一个节点作为头结点
                return nowhead;
            }
            return cur;
        }
        // 有头节点，直接取下一个节点做无头递归
        if (head.next) {
            // 将递归结果赋给头结点
            head.next = this.recursive(head.next);
        }
        return head
    },

    // 使用插入法逆转链表
    reverseByInsert(head) {
        if (!head || !head.next) {
            return;
        }
        let cur = head.next.next;
        head.next.next = null;
        for (let last; cur;) {
            // 记录下一个值
            last = cur.next;
            // 将当前值指向原来的第一个值
            cur.next = head.next;
            // 将当前值变为第一个值
            head.next = cur;
            // 切换到下一个值
            cur = last;
        }
        return head;
    },

    // 删除重复的节点
    deleteDupNormal(head) {
        if (!head || !head.next) {
            return;
        }
        for (let cur = head.next; cur; cur = cur.next) {
            for (let [comp, preComp] = [cur.next, cur]; comp && comp; comp = preComp.next) {
                if (comp.value === cur.value) {
                    // 要删除的节点失去了preComp的引用，又在下次遍历中又失去了comp的引用，节点将自动释放
                    preComp.next = comp.next;
                } else {
                    preComp = comp;
                }
            }
        }
    },

    // 使用HashSet删除重复的节点
    deleteDupBySet(head) {
        if (!head || !head.next) {
            return;
        }
        const set = new Set();
        for (let cur = head.next; cur; cur = cur.next) {
            if (!set.has(cur.value)) {
                set.add(cur.value);
            } else {
                cur.next = cur.next.next;
            }
        }
    },

    // 找出倒数第k个元素
    findLastK(head, k) {
        if (!head || !head.next) {
            return;
        }
        let fast = head.next;
        for (let i = 0; i < k; i++) {
            if (!fast) {
                return;
            }
            fast = fast.next;
        }
        let slow = head.next;
        while (fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    },

    // 逆序打印
    printReverse(head) {
        if (!head) {
            return;
        }
        this.printReverse(head.next)
        console.log(head.value);
    },

    // 合并链表
    mergeLink(head1, head2) {
        if (!head1 || !head1.next) {
            return head2;
        }
        if (!head2 || !head2.next) {
            return head1;
        }
        const head = new LinkNode();
        let cur1 = head1.next;
        let cur2 = head2.next;
        let temp = head;
        while (cur1 && cur2) {
            if (cur1.value > cur2.value) {
                temp.next = cur2;
                temp = cur2;
                cur2 = cur2.next;
            } else {
                temp.next = cur1;
                temp = cur1;
                cur1 = cur1.next;
            }
        }
        if (cur1 !== null) {
            temp.next = cur1;
        }
        if (cur2 !== null) {
            temp.next = cur2;
        }
        return head;
    },

}
