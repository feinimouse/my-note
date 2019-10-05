const showdown = require('showdown');
const { findListAndRead } = require('./findFile');

// header不添加ID属性
showdown.setOption('noHeaderId', true);

const convert = new showdown.Converter();
const convertHtml = async ({
    folder = '',
    test = /.md$/,
    deep = true,
}) => {
    const mds = await findListAndRead({ folder, test, deep });
    return mds.map(md => ({ ...md, html: convert.makeHtml(md.content) }));
};

module.exports = convertHtml;
