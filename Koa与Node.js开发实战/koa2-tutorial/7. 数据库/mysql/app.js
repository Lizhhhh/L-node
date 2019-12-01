const {
    getAllCustomers,
    getCustomerById,
    getCustomerByName,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('./db');
const koa = require('koa');
const app = new koa();
const router = new require('koa-router')();
const bodyParser = require('koa-bodyparser');

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (ex) {
        // ctx.type = jsonMIME;
        ctx.body = {
            status: -1,
            message: ex.message
        }
    }
})


router.get('/customer', async ctx => {
    const customers = await getAllCustomers();
    // ctx.type = jsonMIME;
    ctx.body = {
        status: 0,
        data: customers
    };
});

router.get('/customer/:id', async ctx => {
    const customer = await getCUstomerById(ctx.params.id);
    // ctx.type = jsonMIME;
    ctx.body = {
        status: 0,
        data: customer
    };
});

router.get('/customer/name/:name', async ctx => {
    const customer = await getCUstomerByName(ctx.params.name);
    // ctx.type = jsonMIME;
    ctx.body = {
        status: 0,
        data: customer
    };
});

router.post('/customer', async ctx => {
    const customer = ctx.body;
    await createCustomer(customer);
    // ctx.type = jsonMIME;
    ctx.body = {
        status: 0
    };
});

router.put('/customer/:id', async ctx => {
    const id = ctx.params.id;
    const customer = ctx.body;
    await updateCustomer(id, customer);
    // ctx.type = jsonMIME;
    ctx.body = {
        status: 0
    };
});

router.delete('/customer/:id', async ctx => {
    await deleteCustomer(ctx.params.id);
    // ctx.type = jsonMIME;
    ctx.body = {
        stauts: 0
    };
});


app.use(bodyParser());
app.use(router.routes());

app.listen(3000, async () => {
    console.log('Server is running at http://localhost:3000');
})