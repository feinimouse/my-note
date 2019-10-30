const fs = require('fs').promises;
const $path = require('path');

const marked = require('marked');
const highlightJs = require('highlight.js');
const ejs = require('ejs');

// 初始化markdown生成器
marked.setOptions({
    renderer: new marked.Renderer(),
    // 语法高亮使用highlight.js插件
    highlight(code) {
        return highlightJs.highlightAuto(code).value;
    },
    gfm: true,
    smartLists: true,
    smartypants: false,
});

let _template = '';

const init = async template => {
    _template = await fs.readFile($path.resolve(template), 'utf8');
};

const fromStr = (content, data) => {
    if (!_template) {
        throw new Error('no init!!');
    }
    return ejs.render(_template, {
        content,
        // menu: data.menu,
        rootsId: data.rootsId,
        title: data.title,
        version: data.version,
        logoUrl: data.logoUrl,
        cssUrl: data.cssUrl,
        jsUrl: data.jsUrl,
        homeUrl: data.homeUrl,
    });
};

const fromFile = async (path, data) => {
    const content = await fs.readFile($path.resolve(path), 'utf8');
    const html = marked(content);
    return fromStr(html, data);
};

module.exports = {
    init,
    fromFile,
    fromStr,
};
