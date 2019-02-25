function clone(o) {
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
}
export {
    clone,
};