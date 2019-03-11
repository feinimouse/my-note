const readline = require('readline');
const opre = new Promise(res => {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    let count = 0;
    let now = -1;
    const list = [];
    interface.on('line', data => {
        now ++;
        if (now === 0) {
            count = data;
            return;
        }
        list.push(data);
        if (now >= count) {
            res({list, interface});
        }
    });
    interface.on('close', () => {
        process.exit(0);
    })
});



opre.then(({list, interface}) => {
    /**
     * do something
     */
    console.log(list);
    interface.close();
})