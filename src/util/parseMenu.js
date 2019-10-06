const ejs = require('ejs');
const path = require('path');

/**
 * 将输入的json菜单转为html
 * @param {*} str json菜单，必须是数组或json数组的string类型
 * 输入样例：[
    {
        title: 'JAVA开发',
        id: '1',
        children: [
            {
                title: 'JAVA多线程',
                id: '1-1',
                url: '1-1.html',
            },
            {
                title: 'JAVA虚拟机',
                id: '1-2',
                children: [
                    {
                        title: '内存',
                        id: '1-2-1',
                        url: '1-2-1.html',
                    },
                ],
            },
        ],
    },
];
 */
const parseMenu = async menuArr => {
    if (!Array.isArray(menuArr)) {
        throw new Error('input menu must be a Array !!');
    }
    const result = await ejs.renderFile(
        path.resolve(__dirname, '../template/menu.ejs'),
        { menu: menuArr },
    );
    return result;
};

module.exports = parseMenu;
