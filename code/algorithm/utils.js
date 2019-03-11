const utils = {
    /**
     * @description 克隆一个数据对象
     * @param {*} o 
     */
    clone(o) {
        // 基本数据类型可以直接克隆
        if (o === null || typeof o !== 'object') {
            return o;
        }
        switch(Object.prototype.toString.call(o).replace(/(\[object |\])/g, '')) {
            case 'RegExp': // 正则表达式
                return new RegExp(o.source,o.flags);
            case 'Date': // 日期类型
                return new Date(o.getTime());
            case 'Function': // 函数类型(函数是特殊的对象，js可以直接进行克隆)
                return o;
            case 'Arrary': // 数组类型
                return o.map(item => clone(item));
            default:
                const root = Object.create(Object.getPrototypeOf(o));
                Object.getOwnPropertyNames(o).forEach(item => {
                    root[item] = clone(o[item]);
                });
                Object.getOwnPropertySymbols(o).forEach(item => {
                    root[item] = clone(o[item]);
                });
                return root;
        };
    },
    /**
     * @description 找出数组中唯一重复的数
     * @param {Array} array 
     */
    findRepeatInArray(array) {
        let result = 0;
        array.forEach((item, index) => {
            if (!Number.isInteger(item)) {
                throw 'the array can only contain Integer';
            }
            result ^= item;
            result ^= (index + 1); 
        })
        return result;
    },

    /**
     * @description 找到整数n中二进制数1的个数
     * 说明：
     * 如果一个整数不为0，那么这个整数至少有一位是1。如果我们把这个整数减1，
     * 那么原来处在整数最右边的1就会变为0，原来在1后面的所有的0都会变成1(如果最右边的1后面
     * 还有0的话)。其余所有位将不会受到影响。举个例子：一个二进制数1100，从右边数起第三位是
     * 处于最右边的一个1。减去1后，第三位变成0，它后面的两位0变成了1，而前面的1保持不变，因
     * 此得到的结果是1011.我们发现减1的结果是把最右边的一个1开始的所有位都取反了。这个时候
     * 如果我们再把原来的整数和减去1之后的结果做与运算，从原来整数最右边一个1那一位开始所有
     * 位都会变成0。如1100&1011=1000.也就是说，把一个整数减去1，再和原整数做与运算，会把
     * 该整数最右边一个1变成0.那么一个整数的二进制有多少个1，就可以进行多少次这样的操作。 
     */
    getNumberOf1(n) {
        var tmp = n;
        var result = 0;
        while (tmp) {
            result ++;
            tmp = tmp & (tmp - 1);
        }
        return result;
    }
};