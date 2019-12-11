const Mar = require('./mar');
const app = new Mar();
// app.use((req, res) => {
//     res.writeHead(200);
//     res.end('Hi Marron');
// })

app.use(ctx=>{
  ctx.body = 'hi Marron';
})



app.listen(3000, async () => {
    console.log('[Mar] server is running at http://localhost:3000');
});


// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('Hi Marron');
// })
// server.listen(3000);