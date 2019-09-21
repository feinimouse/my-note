const showdown = require('showdown');
const findAndRead = require('./findFile').findAndRead;

showdown.setOption('noHeaderId', true);

const convert = new showdown.Converter();
const convertHtml = async ({
    folder = '',
    test = /.md$/,
    deep = true,
}) => {
    const mds = await findAndRead({ folder, test, deep });
    return mds.map(md => ({ ...md, html: convert.makeHtml(md.content) }));
};

module.exports = convertHtml;
