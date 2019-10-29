const $path = require('path');

const { createFile } = require('../util/fileUtils');

const path = $path.resolve(__dirname, './a/b/c/d/e.html');

createFile(path, 'qwer').catch(e => console.log(e));
