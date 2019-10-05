const path = require('path');
const fs = require('fs').promises;
const marked = require('marked');
const highlightJs = require('highlight.js');
const { findListAndRead } = require('../util/findFile');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight(code) {
        return highlightJs.highlightAuto(code).value;
    },
    gfm: true,
    smartLists: true,
    smartypants: false,
});

const mdName = /^java的一些特性.md$/;
const matchTitle = /^# (\S+)\n$/m;

findListAndRead({ folder: __dirname, test: mdName, deep: false })
    .then(arr => {
        const { content } = arr[0];
        const [, title] = matchTitle.exec(content);
        const html = marked(content);
        fs.writeFile(path.resolve(__dirname, 'testHtml.html'), html);
    });
