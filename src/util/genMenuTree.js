const { findFileTree } = require('./fileUtils');

const genCatalog = catalog => catalog.map(({ id, url, title, children }) => ({
    id, url, title,
    children: Array.isArray(children) ? genCatalog(children) : undefined,
}));

module.exports = async (path = './', test = /\.md$/, exProps = {}) => {
    // 将所有文章整理到一个数组中
    const articles = [];
    // 生成菜单树
    const catalog = await findFileTree({
        path,
        test,
        exProps,
        async onFind(article) {
            articles.push(article);
        },
    });
    return {
        articles,
        catalog: genCatalog(catalog),
    };
};
