/**
 * 使用js实现字典树
 */

class TrieTree {
    constructor() {
        this.value;
        this.child = {};
    }
    insert(tire, value) {
        let cur = this;
        tire.forEach(item => {
            if (typeof item === 'string' || typeof item === 'number') {
                if (cur.child[item]) {
                    cur = cur.child[item];
                } else {
                    cur.child[item] = new TrieTree();
                    cur = cur.child[item];
                }
            } else {
                throw 'Trie only can be String or Number';
            }
        });
        cur.value = value;
    }
    find(tire) {
        let cur = this;
        let hasValue = true;
        tire.forEach(item => {
            if (!cur.child[item]) {
                hasValue = false;
                return false;
            }
            cur = cur.child[item];
        });
        return hasValue ? cur.value : undefined;
    }
}
