import navList from './js/nav-list.js';
import { init as storage } from './js/storage.js';

window.onload = () => {
    const taskList = [
        storage,
        navList,
    ];
    taskList.forEach(task => task());
};
