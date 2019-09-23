const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // 显示表单页面
        const html = `
        <h1>栗子 koa2 request POST</h1>
        <form method = "POST" action="/">
             <p>userName</p>
             <input name="userName" /> <br/>
             <p>age</p>
             <input name="age" /> <br/>
             <p>website</p>
             <input name="webSite" /> <br/>
             <br/>
             <button type="submit">submit</button>
        </form>
        `
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        ctx.body = parseQueryStr(await parsePostData(ctx));
    } else {
        ctx.body = "<h1>404 not found!</h1>"
    }
})

function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data;
            })
            ctx.req.on('end', () => {
                resolve(postdata);
            })
        } catch (error) {
            reject(error);
        }
    })
}

function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for (let [i, v] of queryStrList.entries()) {
        let item = v.split('=');
        queryData[item[0]] = decodeURIComponent(item[1]);
    }
    return queryData
}

app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})