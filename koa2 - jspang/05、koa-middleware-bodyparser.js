const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === "GET") {
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
        ctx.body = ctx.request.body;
    } else {
        ctx.body = `<h1>404 Not Found!</h1>`
    }
})
app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})