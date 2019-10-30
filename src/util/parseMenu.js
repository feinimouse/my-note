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
