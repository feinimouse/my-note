const ejs = require('ejs');
const path = require('path');

const parseMenu = async str => {
    let menuArr = str;
    if (typeof str === 'string') {
        menuArr = JSON.parse(str);
    }
    if (!Array.isArray(menuArr)) {
        throw new Error('input menu json can not be parsed !!');
    }
    const result = await ejs.renderFile(
        path.resolve(__dirname, '../template/menu.ejs'),
        { menu: menuArr },
    );
    return result;
};

// const menuJson = require('../template/menu');
// parseMenu(menuJson);

module.exports = {
    parseMenu,
};
