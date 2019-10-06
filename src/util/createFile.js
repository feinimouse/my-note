const $path = require('path');
const fs = require('fs').promises;

module.exports = async (path, content) => {
    try {
        await fs.writeFile(path, content);
    } catch (err) {
        if (!err.code === 'ENOENT') {
            throw err;
        }
        const { root, dir } = $path.parse(path);
        const mk = async dirName => {
            if (dirName !== root) {
                try {
                    await fs.mkdir(dirName);
                } catch (e) {
                    if (!e.code === 'ENOENT') {
                        throw e;
                    }
                    await mk($path.dirname(dirName));
                    await fs.mkdir(dirName);
                }
            }
        };
        await mk(dir);
        await fs.writeFile(path, content);
    }
};
