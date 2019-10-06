const fs = require('fs').promises;
const $path = require('path');

const createFile = require('../util/createFile');

const path = $path.resolve(__dirname, './a/b/c/d/e.html');
// fs.writeFile(path, 'qwer')
//     .catch(async e => {
//         // console.log(e);
//         const { root, dir } = $path.parse(path);
//         const exec = async dirName => {
//             if (dirName !== root) {
//                 try {
//                     await fs.mkdir(dirName);
//                 } catch (err) {
//                     await exec($path.dirname(dirName));
//                     await fs.mkdir(dirName);
//                 }
//             }
//         };
//         await exec(dir);
//         await fs.writeFile(path, 'qwer');
//     });

// createFile(path, 'qwer').catch(e => console.log(e));
