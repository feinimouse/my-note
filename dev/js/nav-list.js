export default function() {
    const navList = document.getElementById('nav-list');
    navList.addEventListener('click', e => {
        if (e.target && e.target.tagName === 'SPAN' && e.target.parentElement) {
            const li = e.target.parentElement;
            li.classList.toggle('nav-open');
        }
    });
}
