const $path = require('path');
const fs = require('fs').promises;

module.exports = async (path, content) => {
    try {
        fs.writeFile(path, content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            const { root, dir } = $path.parse(path);
            const mk = async dirName => {
                if (dirName !== root) {
                    try {
                        await fs.mkdir(dirName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            await mk($path.dirname(dirName));
                            await fs.mkdir(dirName);
                        }
                    }
                }
            };
            await mk(dir);
            await fs.writeFile(path, content);
        }
    }
};
