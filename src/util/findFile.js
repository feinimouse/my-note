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
    const childFolders = [];
    files.forEach(file => {
        if (file.isDirectory() && deep) {
            childFolders.push(findFileList({
                folder: $path.resolve(folderPath, file.name), test,
            }));
            return;
        }
        if (file.isFile() && test.test(file.name)) {
            result.push($path.resolve(folderPath, file.name));
        }
    });
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
 * preId 文件编号的前缀
 * join 不同层级间编号的间隔符
 * exProps 树的额外属性，输入的值应是对象，对象的属性名为额外的属性名，属性值为一个函数用于计算该额外属性
 * onFind 每个符合条件的文件被找到后触发，传入值为该文件的属性和额外属性
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
    const addExProps = args => {
        const ex = {};
        if (exProps && typeof exProps === 'object') {
            Object.keys(exProps).forEach(key => {
                if (typeof exProps[key] === 'function') {
                    ex[key] = exProps[key](args);
                }
            });
        }
        return { ...args, ...ex };
    };
    const exec = async (folderPath, preSort) => {
        const files = await fs.readdir(folderPath, { withFileTypes: true });
        const result = [];
        const childTree = [];
        let id = 1;
        files.forEach(file => {
            if (file.isFile() && test.test(file.name)) {
                const resFile = addExProps({
                    name: file.name,
                    sort: [...preSort, id++],
                    path: $path.resolve(folderPath, file.name),
                    isFolder: false,
                });
                if (typeof onFind === 'function') {
                    onFind(resFile);
                }
                result.push(resFile);
            }
            if (deep && file.isDirectory()) {
                const folderPreSort = [...preSort, id++];
                const childFolderPath = $path.resolve(folderPath, file.name);
                const childFolder = addExProps({
                    name: file.name,
                    sort: folderPreSort,
                    path: childFolderPath,
                    isFolder: true,
                });
                result.push(childFolder);
                childTree.push(exec(childFolderPath, folderPreSort)
                    .then(children => { childFolder.children = children; }));
            }
        });
        await Promise.all(childTree);
        return result;
    };
    return exec(folder, []);
};

/**
 * 搜寻并读取文件的内容，该方法使用 api findFileList
 * @param {*} param0
 */
const findListAndRead = async ({
    path = '',
    test = new RegExp(),
    deep = true,
}) => {
    const files = await findFileList({ path, test, deep });
    return Promise.all(files.map(async file => {
        const content = await fs.readFile(file, 'utf8');
        return { path: file, content };
    }));
};

module.exports = {
    findFileList,
    findFileTree,
    findListAndRead,
};
