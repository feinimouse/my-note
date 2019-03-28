const readline = require('readline');
module.exports = {
    readlines(callback) {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const opre = new Promise(res => {
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
                    res(list);
                }
            });
        });
        return opre.then(callback).then(() => {
            interface.close();
        });

    },
    readline(callback){
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const opre = new Promise(res => {
            interface.on('line', data => {
                res(data);
            });
            interface.on('close', () => {
                process.exit(0);
            });
        });
        return opre.then(callback).then(() => {
            interface.close();
        });

    },
}
