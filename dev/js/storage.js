export const opened = new Set();

export function init() {
    const openedArr = JSON.parse(sessionStorage.getItem('opened'));
    if (Array.isArray(openedArr)) {
        openedArr.forEach(open => opened.add(open));
    }
}
