/**
 * js实现链表，及链表的逆序
 */
class LinkNode {
    value = 'HEAD';
    next = null;
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
    pop() {
        if (!this.next) {
            return;
        }
        let last = this;
        while (last.next.next) {
            last = last.next;
        }
        const result = last.next;
        last.next = null;
        return result;
    }
    print() {
        if (this.next) {
            const printList = []
            for(let cur = this.next;cur;cur = cur.next) {
                printList.push(cur.value);
            }
            console.log(printList);
        } else {
            console.log('空链表');
        }
    }
}

// 创建一个指定大小的链表
function createLinkArrary(count) {
    const head = new LinkNode();
    for (let i = 1; i < (count +1); i++) {
        head.push(i);
    }
    return head;
}

// 使用递归逆转链表
function reverseByRecursive(head) {
    if (!head) {
        return;
    }
    // 无头节点
    if (head.value !== 'HEAD') {
        const cur = head;
        const adj = head.next;
        if (adj) {
            const nowhead = recursive(head.next);
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
        head.next = recursive(head.next);
    }
    return head
}

// 使用插入法逆转链表
function reverseByInsert(head) {
    if (!head || !head.next) {
        return;
    }
    let cur = head.next.next;
    head.next.next = null;
    for(let last;cur;) {
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
}

// 删除重复的节点
function deleteDupNormal(head) {
    if (!head || !head.next) {
        return;
    }
    for (let cur = head.next;cur;cur = cur.next) {
        for (let [comp, preComp] = [cur.next, cur];comp && comp;comp = preComp.next) {
            if (comp.value === cur.value) {
                // 要删除的节点失去了preComp的引用，又在下次遍历中又失去了comp的引用，节点将自动释放
                preComp.next = comp.next;
            } else {
                preComp = comp;
            }
        }
    }
}

// 使用HashSet删除重复的节点
function deleteDupBySet(head) {
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
}

// 找出倒数第k个元素
function findLastK(head, k) {
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
    while(fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}

// 逆序打印
function printReverse(head) {
    if (!head) {
        return;
    }
    printReverse(head.next)
    console.log(head.value);
}