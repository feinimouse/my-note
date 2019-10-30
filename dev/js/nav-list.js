const opened = new Set();

export function genNav() {
    const navList = document.getElementById('nav-list');
    const selected = document.getElementById('markdown-body')
        .dataset.rootsid.split(',');

    // 上一页中展开的项
    const openedArr = JSON.parse(sessionStorage.getItem('opened'));
    if (Array.isArray(openedArr)) {
        openedArr.forEach(open => opened.add(open));
    }
    // 将当前地址所在目录添加到需要展开的目录中
    if (Array.isArray(selected)) {
        selected.forEach(open => opened.add(open));
    }

    // 生成导航菜单
    function genNavDOM(catalog) {
        const fra = document.createDocumentFragment();
        catalog.forEach(({ id, children, url, title }) => {
            const li = document.createElement('li');
            if (opened.has(id)) {
                li.classList.add('nav-open');
            }
            if (selected === id) {
                li.classList.add('nav-select');
            }
            li.dataset.id = id;
            if (children) {
                const span = document.createElement('span');
                span.innerText = title;
                const ul = document.createElement('ul');
                li.append(span);
                li.append(ul);
                ul.append(genNavDOM(children));
                fra.append(li);
            } else {
                const a = document.createElement('a');
                a.setAttribute('href', url);
                a.innerText = title;
                li.append(a);
                fra.append(li);
            }
        });
        return fra;
    }

    const catalog = JSON.parse(sessionStorage.getItem('catalog'));
    if (Array.isArray(catalog) && catalog.length > 0) {
        navList.append(genNavDOM(catalog));
        return;
    }
    fetch(new Request('/catalog.json')).then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                sessionStorage.setItem('catalog', JSON.stringify(data));
                navList.append(genNavDOM(data));
            });
        }
    });
}

export function genNavListListener() {
    const navList = document.getElementById('nav-list');
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
