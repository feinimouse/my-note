const readline = require('readline');

const opre = new Promise(res => {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    interface.on('line', data => {
        res({data, interface});    
    });
    interface.on('close', () => {
        process.exit(0);
    });
});

opre.then(({data, interface}) => {
    /**
     * do something
     */
    console.log(data);
    interface.close();
});
