const koa = require('koa');
const app = new koa();
const router = require('./router');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
router(app);


app.listen(3000, async ()=>{
  console.log('Server is running at http://localhost:3000');
})

