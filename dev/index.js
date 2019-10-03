/* eslint-disable import/extensions */
import navList from './js/nav-list.js';

window.onload = () => {
    const taskList = [
        navList,
    ];
    taskList.forEach(task => task());
};
