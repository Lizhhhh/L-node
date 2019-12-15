const Mar = require('./Mar');
const app = new Mar();

app.use(ctx => {
    ctx.body = 'Hello Marron';
});

app.listen(3000);