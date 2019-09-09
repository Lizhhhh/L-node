const HomeService = require('../service/home')
module.exports = {
  login: async (ctx, next) => {
    let { name, password } = ctx.request.body
    let data = await HomeService.login(name, password)
    ctx.response.body = data
  },
  user: async (ctx, next) => {
    ctx.response.body = `
    <form action="/user/login/" method="post">
    <input name ="name" type="text" placeholder="请输入用户名: ikcamp" />
    <br />
    <input name ="password" type="text" placeholder="请输入密码: 123456" />
    <br />
    <button>GoGoGo</button>
    </form>
    `
  }
}
