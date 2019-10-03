import { opened } from './storage.js';

export default function() {
    const navList = document.getElementById('nav-list');

    // 打开缓存中打开的菜单和选中项
    const selected = document.URL.split('/').pop().split('.').shift();
    const liList = [].slice.call(navList.getElementsByTagName('li'));
    // 将当前地址所在目录添加到需要展开的目录中
    const needOpen = selected.split('-').map((t, i, arr) => arr.slice(0, i).join('-'));
    needOpen.shift(); // 第一个记录为空
    needOpen.forEach(open => opened.add(open));
    // 展开及标记当前所在的目录
    liList.forEach(li => {
        if (opened.has(li.dataset.id)) {
            li.classList.add('nav-open');
        }
        if (selected === li.dataset.id) {
            const navHome = document.getElementById('nav-home');
            navHome.classList.remove('nav-select');
            li.classList.add('nav-select');
        }
    });
    navList.addEventListener('click', e => {
        // 打开菜单
        if (e.target && e.target.tagName === 'SPAN' && e.target.parentElement) {
            const li = e.target.parentElement;
            li.classList.toggle('nav-open');
            const { id } = li.dataset;
            // 记下打开的菜单
            if (typeof id === 'string') {
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
