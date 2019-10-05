const path = require('path');
const { findFileTree } = require('../util/findFile');

const mdFolder = path.resolve(__dirname, './md');
const fileTest = /\.md$/;

module.exports = () => findFileTree({
    folder: mdFolder,
    test: fileTest,
});
