const fs = require('fs').promises;
const path = require('path');

const findFile = async ({
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
            childFolders.push(findFile({
                folder: path.resolve(folderPath, file.name), test,
            }));
            return;
        }
        if (file.isFile && test.test(file.name)) {
            result.push(path.resolve(folderPath, file.name));
        }
    });
    (await Promise.all(childFolders)).forEach(childFiles => {
        result = result.concat(childFiles);
    });
    return result;
};

const findAndRead = async ({
    folder = '',
    test = new RegExp(),
    deep = true,
}) => {
    const files = await findFile({ folder, test, deep });
    return Promise.all(files.map(async file => {
        const content = await fs.readFile(file, 'utf8');
        return { path: file, content };
    }));
};

module.exports = {
    findFile,
    findAndRead,
};
