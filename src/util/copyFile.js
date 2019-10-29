const fse = require('fs-extra');
const $path = require('path');

const copyList = [
    'js', 'img', 'svg',
    'index.js', 'index.css',
];
const copyDir = '../../dev';

const output = $path.resolve('../../build');

const clearOutput = () => fse.remove(output);

const copyTestFile = async () => {
    await clearOutput();
    await Promise.all(copyList.map(async path => {
        await fse.copy(
            $path.resolve(__dirname, copyDir, path),
            $path.resolve(__dirname, output, path),
        );
        console.log(`copy ${$path.resolve(__dirname, copyDir, path)}`);
    }));
};

module.exports = {
    copyTestFile,
};
