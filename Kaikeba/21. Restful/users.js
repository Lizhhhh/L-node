const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

// 文件上传服务
const upload = require("koa-multer")({ dest: './public/images' });

app.use(cors());
app.use(bodyParser());

const users = [{ id: 1, name: "tom" }, { id: 2, name: "jerry" }];

// 文件上传
router.post("/upload", upload.single('file'), ctx=>{
  console.log('file', ctx.req.file);
  console.log('body', ctx.req.body);
  ctx.body = '上传成功'
})


// 查找数据  ?name = xx
router.get("/", ctx => {
    console.log("GET /users");
    const { name } = ctx.query; // ?name = xx
    let data = users;
    if (name) {
        data = users.filter(u => u.name === name);
    }
    ctx.body = { ok: 1, data };
});

// 查找数据  /users/1   id = 1
router.get("/:id", ctx => {
    console.log("GET /users/:id");
    const { id } = ctx.params; // /users/1
    const data = users.find(u => u.id == id);
    ctx.body = { ok: 1, data };
});

// 新增用户
router.post("/", ctx => {
    console.log("POST /users");
    const { body: user } = ctx.request; // 请求body
    user.id = users.length + 1;
    users.push(user);
    ctx.body = { ok: 1 };
});


router.put("/", ctx => {
    console.log("PUT /users");
    const { body: user } = ctx.request; // 请求body
    const idx = users.findIndex(u => u.id == user.id);
    if (idx > -1) {
        users[idx] = user;
    }
    ctx.body = { ok: 1 };
});

// 删除用户 /users/1  删除id为1
router.delete("/:id", ctx => {
    console.log("DELETE /users/:id");
    const { id } = ctx.params;
    const idx = users.findIndex(u => u.id === id);
    if (idx > -1) {
        users.splice(idx, 1);
    }
    ctx.body = { ok: 1 };
});

app.use(router.routes());
app.listen(3000, () => {
    console.log("[Server] Server is running at http://localhost:3000");
})