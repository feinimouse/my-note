import { handelHistoryOpen, handelOpenListener } from './js/nav-list.js';
import { init as storage } from './js/storage.js';

window.onload = () => {
    const taskList = [
        storage,
        handelOpenListener,
        handelHistoryOpen,
    ];
    taskList.forEach(task => task());
};
