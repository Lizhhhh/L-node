const Koa = require('koa')
const Router = require('koa-router')
const { sign } = require('jsonwebtoken')
const secret = 'demo'
const jwt = require('koa-jwt')({ secret })

router
  .post('/api/login', async (ctx, next) => {
    const user = ctx.request.body
    if (user && user.username) {
      let { username } = user // 取出username
      /// 生成Token, secret 作为密钥需要开发者设置,expiresln为失效时间,不要设置太久
      const token = sign({ username }, secret, { expiresIn: '1h' })

      ctx.body = {
        message: 'Get Token Success',
        code: 1,
        token
      }
    } else {
      ctx.body = {
        message: 'Param Error',
        code: -1
      }
    }
  })
  .get('/api/userInfo', jwt, async ctx => {
    ctx.body = { username: ctx.state.user.username }
  })
  .get('/api/adminInfo', jwt, admin, async ctx => {
    ctx.body = { username: ctx.state.user.username }
  })
