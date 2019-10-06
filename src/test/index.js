const route = require('koa-route');
const testGenFileFlow = require('./testGenFileFlow');
const testCreateFile = require('./testCreateFile');

const testMap = {
    testCreateFile,
    testGenFileFlow,
};

module.exports = preUrl => Object.keys(testMap)
    .map(key => route.get(`${preUrl}/${key}`, async ctx => {
        const data = await testMap[key]();
        if (typeof data === 'object') {
            ctx.response.body = JSON.stringify(data);
        } else {
            ctx.response.body = data;
        }
    }));
