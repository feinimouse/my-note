const $path = require('path');

// 路径相对于根目录
const config = {
    input: './src/test/md',
    test: /\.md$/,
    template: './src/template/index.ejs',
    output: './src/test/out',
    articleUrl: '/article',

    version: '0.0.1',
    logoUrl: '/img/logo-name.png',
    cssUrl: '/index.css',
    jsUrl: '/index.js',
    homeUrl: '/index.html',

    exProps: {
        id({ sort }) {
            return sort.join('-');
        },
        rootsId({ sort, dir }) {
            return dir && Array.isArray(dir.rootsId)
                ? dir.rootsId.concat(sort.join('-'))
                : [sort.join('-')];
        },
        output({ path, isFolder, sort }) {
            if (!isFolder) {
                const name = $path.basename(path, $path.extname(path));
                return $path.resolve(config.output, `${name}${sort.join('')}.html`);
            }
            return undefined;
        },
        url({ path, isFolder, sort }) {
            if (!isFolder) {
                const name = $path.basename(path, $path.extname(path));
                return `${config.articleUrl}/${name}${sort.join('')}.html`;
            }
            return undefined;
        },
        title({ path }) {
            return $path.basename(path, $path.extname(path));
        },
    },
};

module.exports = config;
