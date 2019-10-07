const genMenuTree = require('./util/genMenuTree');
const parseMenu = require('./util/parseMenu');
const createMdHtml = require('./util/createMdHtml');
const { createFile } = require('./util/createFile');

const configDev = require('./config.dev');

const run = async config => {
    const {
        input, test, template, exProps, output,
    } = config;
    // 初始化模板生成器
    await createMdHtml.init(template);
    // 生成目录信息，和扫描到的文章列表
    const { catalog, articles } = await genMenuTree(input, test, exProps);
    // 生成目录html
    const menu = parseMenu(catalog);
    // 生成首页
    const home = createMdHtml.fromStr('', { ...config, menu, title: 'Home', rootsId: '[]' });
    createFile(`${output}/index.html`, home);
    // 生成子页面
    await Promise.all(articles.map(async art => {
        const html = await createMdHtml.fromFile(art.path, { ...config, ...art, menu });
        createFile(art.output, html);
    }));
};

if (process.env === 'development') {
    run(configDev);
}
