const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

app.use(async (ctx) => {
    const url = ctx.request.url;
    const html = await router(url);
    ctx.body = html;
});
app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
});

async function router(url) {
    let page = '404.html';
    switch (url) {
        case '/':
            page = 'index.html';
            break;
        case '/index':
            page = 'index.html';
            break;
        case '/todo':
            page = 'todo.html';
            break;
        case '/404':
            page = '404.html';
            break;
        default:
            break;
    }
    let html = render(page);
    return html
}

function render(page) {
    return new Promise((resolve, reject) => {
        const pageUrl = `./pages/${page}`;
        fs.readFile(pageUrl, 'binary', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}