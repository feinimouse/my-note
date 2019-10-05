/* eslint-disable import/no-extraneous-dependencies */
const KOA = require('koa');
const koaStatic = require('koa-static');
const route = require('koa-route');
const path = require('path');

const testAPI = require('./test');

const app = new KOA();
const source = koaStatic(path.join(__dirname, '../dev'));

app.use(source);
app.use(route.get('/', ctx => {
    ctx.response.redirect('./index.html');
}));

// node 的控制台结果看起来不方便，这里将test的结果导出到chrome控制台
testAPI('/api/test').forEach(api => app.use(api));

app.listen(3000);
console.log('listening port: 3000 ...');
