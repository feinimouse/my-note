const $path = require('path');
const fs = require('fs').promises;

const mkdirDeep = async path => {
    const _path = $path.resolve(path);
    const { root } = $path.parse(_path);
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
    await mk(_path);
};

const createFile = async (path, content) => {
    const _path = $path.resolve(path);
    try {
        await fs.writeFile(_path, content);
    } catch (err) {
        if (!err.code === 'ENOENT') {
            throw err;
        }
        await mkdirDeep($path.dirname(_path));
        await createFile(_path, content);
    }
};

module.exports = {
    createFile,
    mkdirDeep,
};
