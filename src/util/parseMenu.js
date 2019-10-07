/**
 * 将输入的json菜单转为html
 * @param {*} menuArr 菜单的树状表达
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

const childMenu = ({ id, title, childHtml }) => `<li data-id="${id}">
 <span>${title}</span>
 <ul>
     ${childHtml}
 </ul>
</li>`;

const link = ({ id, url, title }) => `<li data-id="${id}">
<a href="${url}">${title}</a>
</li>`;

const parseMenu = menuArr => {
    if (!Array.isArray(menuArr)) {
        return '';
    }
    const result = menuArr.map(item => {
        if (item.children) {
            const childHtml = parseMenu(item.children);
            return childMenu({ ...item, childHtml });
        }
        return link(item);
    });
    return result.join('');
};

module.exports = parseMenu;
