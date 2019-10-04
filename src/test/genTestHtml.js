const path = require('path');
const fs = require('fs').promises;
// const showdown = require('showdown');
const marked = require('marked');
const highlightJs = require('highlight.js');
const { findAndRead } = require('../util/findFile');

// const convert = new showdown.Converter({ rawHeaderId: true });
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

findAndRead({ folder: __dirname, test: mdName, deep: false })
    .then(arr => {
        const { content } = arr[0];
        const [, title] = matchTitle.exec(content);
        const html = marked(content);
        // return { content, title, path, html };
        fs.writeFile(path.resolve(__dirname, 'testHtml.html'), html);
    });
