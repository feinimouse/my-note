/* eslint-disable no-console */
const genMenuTree = require('./util/genMenuTree');
const parseMenu = require('./util/parseMenu');
const createMdHtml = require('./util/createMdHtml');
const fileUtils = require('./util/fileUtils');

const configDev = require('./config.dev');

const run = async config => {
    const {
        input, test, template, exProps, output, copy,
    } = config;
    console.log(`\n input: ${input} \n output: ${output} \n template: ${template} \n`);

    // 初始化模板生成器
    await createMdHtml.init(template);
    console.log('template has been read...');

    // 生成目录信息，和扫描到的文章列表
    const { catalog, articles } = await genMenuTree(input, test, exProps);
    console.log('md articles list has been found...');

    // 生成目录html
    const menu = parseMenu(catalog);

    // 清理已有的文件
    fileUtils.clearDir(output);
    console.log('output dir has been clear...');

    // 生成首页
    const home = await createMdHtml.fromStr('欢迎来到菲尼莫斯的博客', { ...config, menu, title: 'Home', rootsId: '[]' });
    await fileUtils.createFile(`${output}/index.html`, home);
    console.log(`home has been created to ${output}/index.html...`);

    // 生成子页面
    await Promise.all(articles.map(async art => {
        const html = await createMdHtml.fromFile(art.path, { ...config, ...art, menu });
        await fileUtils.createFile(art.output, html);
        console.log(`file has been created: ${art.output} `);
    }));

    // 复制静态文件
    await fileUtils.copyFile(copy.dir, copy.files, output);
    console.log('static file has been copied...');
};

console.log('build start...');
// console.log(JSON.stringify(process.env.NODE_ENV));
if (process.env.NODE_ENV === 'development') {
    console.log('use dev config...');
    run(configDev).then(() => console.log('build has been finished...'));
}
