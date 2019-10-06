const $path = require('path');
const fs = require('fs').promises;
const marked = require('marked');
const ejs = require('ejs');
const highlightJs = require('highlight.js');

const { findFileTree } = require('../util/findFile');
const parseMenu = require('../util/parseMenu');
const { createFile } = require('../util/createFile');

const template = $path.resolve(__dirname, '../template/index.ejs');
const mdFolder = $path.resolve(__dirname, './md');
const fileTest = /\.md$/;
const matchTitle = /^# (\S+)\n$/m;

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight(code) {
        return highlightJs.highlightAuto(code).value;
    },
    gfm: true,
    smartLists: true,
    smartypants: false,
});

const deal = async () => {
    const articles = [];
    const catalog = await findFileTree({
        path: mdFolder,
        test: fileTest,
        exProps: {
            id({ sort }) {
                return sort.join('-');
            },
            rootsId({ sort }) {
                const rootsId = [];
                sort.forEach((item, i) => {
                    rootsId.push(sort.slice(0, i).join('-'));
                });
                rootsId.shift();
                return rootsId;
            },
            url({ name, isFolder, sort }) {
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
    await Promise.all(articles.map(async ({ path, roots, url, rootsId }) => {
        const content = await fs.readFile(path, 'utf8');
        const output = $path.resolve(__dirname, './output', `./${roots.join('/')}`, url);
        const data = {
            title: matchTitle.exec(content),
            prePath: '.',
            cssName: 'index.css',
            jsName: 'index.js',
            version: '0.0.1',
            menu: await parseMenu(catalog),
            article: marked(content),
            rootsId: JSON.stringify(rootsId),
        };
        const result = await ejs.renderFile(template, data);
        await createFile(output, result);
    }));
};

module.exports = deal;

deal();
