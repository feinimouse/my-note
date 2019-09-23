const KOA = require('koa');
const koaStatic = require('koa-static');
const route = require('koa-route');
const path = require('path');

const app = new KOA();
const source = koaStatic(path.join(__dirname, '../publish'));

app.use(source);
app.use(route.get('/', (ctx) => {
    ctx.response.redirect('./index.html');
}));

app.listen(3000);
console.log('listening port: 3000 ...');
