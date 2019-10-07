const fs = require('fs').promises;
const $path = require('path');

/**
 * @description 将符合条件的文件以路径的形式放入一个数组中
 * @param {
 * folder 要寻找的文件夹
 * test 寻找规则
 * depp 是否深度查找
 * } options 配置项
 */
const findFileList = async ({
    path = './',
    test = new RegExp(),
    deep = true,
}) => {
    // 如果不是绝对路径则转换为绝对路径
    const folderPath = $path.resolve(path);
    let result = [];
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    // 待扫描的子文件夹
    const childFolders = [];
    files.forEach(file => {
        if (file.isDirectory() && deep) {
            // 将扫描到的子文件夹添加到待扫描列表中
            childFolders.push(findFileList({
                folder: $path.resolve(folderPath, file.name), test,
            }));
            return;
        }
        if (file.isFile() && test.test(file.name)) {
            result.push($path.resolve(folderPath, file.name));
        }
    });
    // 扫描子文件夹，并拼合列表
    (await Promise.all(childFolders)).forEach(childFiles => {
        result = result.concat(childFiles);
    });
    return result;
};

/**
 * @description 将符合条件的文件编号并放入一棵树中，编号从1开始
 * @param {
 * folder 要寻找的文件夹
 * test 寻找规则
 * depp 是否深度查找
 * exProps 树的额外属性，输入的值应是对象，对象的属性名为额外的属性名，属性值为一个函数用于计算该额外属性
 * { propName: function({
 *      roots ([])所在的每层父文件夹名
 *      name (string)文件名,
 *      path (string)路径,
 *      isFolder (boolean)是否是文件夹,
 *      sort ([])该文件在遍历中每一层级的排序,
 * }) }
 * onFind 每个符合条件的文件被找到后触发的回调，传入值为该文件的属性和额外属性
 * } options 配置项
 */
const findFileTree = async ({
    path = './',
    test = new RegExp(),
    deep = true,
    exProps = null,
    onFind = null,
}) => {
    const folder = $path.resolve(path);
    // 用于往固有属性中添加额外属性
    const addExProps = args => {
        const ex = {};
        if (exProps && typeof exProps === 'object') {
            Object.keys(exProps).forEach(key => {
                if (typeof exProps[key] === 'function') {
                    const value = exProps[key](args);
                    if (typeof value !== 'undefined') {
                        ex[key] = value;
                    }
                }
            });
        }
        return { ...args, ...ex };
    };
    const exec = async folderMsg => {
        const { path: folderPath, sort: preSort } = folderMsg;
        const files = await fs.readdir(folderPath, { withFileTypes: true });
        // 所有符合要求的文件以及文件夹
        const result = [];
        // 待扫描的子文件夹列表
        const childTree = [];
        let id = 1;
        files.forEach(file => {
            if (file.isFile() && test.test(file.name)) {
                // 添加额外属性
                const resFile = addExProps({
                    dir: folderMsg,
                    sort: [...preSort, id++],
                    path: $path.resolve(folderPath, file.name),
                    isFolder: false,
                });
                // 执行找到文件的回调
                if (typeof onFind === 'function') {
                    onFind(resFile);
                }
                result.push(resFile);
            }
            if (deep && file.isDirectory()) {
                const folderPreSort = [...preSort, id++];
                const childFolderPath = $path.resolve(folderPath, file.name);
                const childFolder = addExProps({
                    dir: folderMsg,
                    sort: folderPreSort,
                    path: childFolderPath,
                    isFolder: true,
                });
                result.push(childFolder);
                // 这里解析每个子文件夹是异步执行的，因此会先把整个文件夹扫描完再扫描子文件夹
                // 将子文件夹添加到待扫描列表中，扫描完成后将其挂到父文件夹的children上
                childTree.push(exec(childFolder)
                    .then(children => { childFolder.children = children; }));
            }
        });
        // 解析子文件夹
        await Promise.all(childTree);
        return result;
    };
    return exec({
        sort: [],
        dir: null,
        path: folder,
        isFolder: true,
    });
};

module.exports = {
    findFileList,
    findFileTree,
};
