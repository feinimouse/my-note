const fs = require('fs').promises;
const path = require('path');

/**
 * @description 将符合条件的文件以路径的形式放入一个数组中
 * @param {
 * folder 要寻找的文件夹
 * test 寻找规则
 * depp 是否深度查找
 * } options 配置项
 */
const findFileList = async ({
    folder = '',
    test = new RegExp(),
    deep = true,
}) => {
    if (!folder) {
        throw new Error('错误的文件夹名称');
    }
    // 如果不是绝对路径则转换为绝对路径
    const folderPath = path.resolve(folder);
    let result = [];
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    const childFolders = [];
    files.forEach(file => {
        if (file.isDirectory() && deep) {
            childFolders.push(findFileList({
                folder: path.resolve(folderPath, file.name), test,
            }));
            return;
        }
        if (file.isFile() && test.test(file.name)) {
            result.push(path.resolve(folderPath, file.name));
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
 * } options 配置项
 */
const findFileTree = async ({
    folder = '',
    test = new RegExp(),
    deep = true,
    preId = '',
    join = '-',
}) => {
    const folderPath = path.resolve(folder);
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    const result = [];
    let id = 1;
    files.forEach(async file => {
        if (file.isFile() && test.test(file.name)) {
            result.push({
                fileName: file.name,
                id: preId ? `${preId}${join}${id}` : id,
                path: path.resolve(folderPath, file.name),
            });
            id++;
        }
        if (deep && file.isDirectory()) {
            result.push({
                fileName: file.name,
                id: preId ? `${preId}${join}${id}` : id,
                path: path.resolve(folderPath, file.name),
                children: await findFileTree({
                    folder: path.resolve(folderPath, file.name),
                    test,
                    deep,
                    join,
                    preId: preId ? `${preId}${join}${id}` : id,
                }),
            });
            id++;
        }
    });
    return result;
};

const findListAndRead = async ({
    folder = '',
    test = new RegExp(),
    deep = true,
}) => {
    const files = await findFileList({ folder, test, deep });
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
