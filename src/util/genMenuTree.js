
const $path = require('path');
const { findFileTree } = require('./findFile');

module.exports = async (articleFolder = './', articleTest = /\.md$/) => {
    // 将所有文章整理到一个数组中
    const articles = [];
    // 生成菜单树
    const catalog = await findFileTree({
        path: articleFolder,
        test: articleTest,
        exProps: {
            id({ sort }) {
                return sort.join('-');
            },
            rootsId({ sort, dir }) {
                return dir && Array.isArray(dir.rootsId)
                    ? dir.rootsId.concat(sort.join('-'))
                    : [sort.join('-')];
            },
            url({ path, isFolder, sort }) {
                const name = $path.basename(path);
                if (!isFolder) {
                    return `${name.replace('.md', '')}${sort.join('')}.html`;
                }
                return undefined;
            },
        },
        async onFind(article) {
            articles.push(article);
        },
    });
    return {
        articles,
        catalog,
    };
};
