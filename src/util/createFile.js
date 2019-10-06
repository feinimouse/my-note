const $path = require('path');
const fs = require('fs').promises;

const mkdirDeep = async path => {
    const { root } = $path.parse(path);
    const mk = async dirName => {
        if (dirName !== root) {
            try {
                await fs.mkdir(dirName);
            } catch (e) {
                if (e.code === 'EEXIST') {
                    return;
                }
                if (!e.code === 'ENOENT') {
                    throw e;
                }
                await mk($path.dirname(dirName));
                await mk(dirName);
            }
        }
    };
    await mk(path);
};

const createFile = async (path, content) => {
    try {
        await fs.writeFile(path, content);
    } catch (err) {
        if (!err.code === 'ENOENT') {
            throw err;
        }
        await mkdirDeep($path.dirname(path));
        await createFile(path, content);
    }
};

module.exports = {
    createFile,
    mkdirDeep,
};
