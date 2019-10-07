const $path = require('path');
const genMenuTree = require('../util/genMenuTree');

module.exports = () => genMenuTree($path.resolve(__dirname, './md'));
