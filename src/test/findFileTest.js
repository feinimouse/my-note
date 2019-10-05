const path = require('path');
const { findFileTree } = require('../util/findFile');

const mdFolder = path.resolve(__dirname, './md');
const fileTest = /\.md$/;

module.exports = () => findFileTree({
    path: mdFolder,
    test: fileTest,
    exProps: {
        testId({ sort }) {
            return sort.join('-');
        },
        url({ name, sort, isFolder }) {
            if (!isFolder) {
                return `${name.replace('.md', '')}${sort.join('')}.html`;
            }
            return undefined;
        },
    },
});
