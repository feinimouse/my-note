import { opened } from './storage.js';

export default function() {
    const navList = document.getElementById('nav-list');
    // 从url读取当前应该的选中项
    const selected = document.URL.split('/').pop().split('.').shift();
    // 将当前地址所在目录添加到需要展开的目录中
    selected.split('-')
        .map((t, i, arr) => arr.slice(0, i).join('-'))
        .forEach(open => opened.add(open));
    // home的菜单项
    const navHome = document.getElementById('nav-home');
    // 遍历所有菜单项
    [].slice.call(navList.getElementsByTagName('li'))
        .forEach(li => {
            // 展开需要展开的目录
            if (opened.has(li.dataset.id)) {
                li.classList.add('nav-open');
            }
            // 标记选择项
            if (selected === li.dataset.id) {
                navHome.classList.remove('nav-select');
                li.classList.add('nav-select');
            }
        });
    navList.addEventListener('click', e => {
        // 打开菜单
        if (e.target && e.target.tagName === 'SPAN' && e.target.parentElement) {
            const li = e.target.parentElement;
            li.classList.toggle('nav-open');
            // 记下打开的菜单
            if (li.dataset.id) {
                const { id } = li.dataset;
                if (opened.has(id)) {
                    opened.delete(id);
                } else {
                    opened.add(id);
                }
            }
        }
        // 跳转前记录所有打开的菜单
        if (e.target && e.target.tagName === 'A') {
            sessionStorage.setItem('opened', JSON.stringify(Array.from(opened)));
        }
    });
}
