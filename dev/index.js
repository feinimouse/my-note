import { genNav, genNavListListener } from './js/nav-list.js';

window.onload = () => {
    const taskList = [
        genNav,
        genNavListListener,
    ];
    taskList.forEach(task => (typeof task === 'function' ? task() : ''));
};
