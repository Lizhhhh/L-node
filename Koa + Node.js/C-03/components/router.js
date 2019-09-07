class Router {
  constructor() {
    this._routes = []
  }
  get(url, handler) {
    this._routes.push({
      url: url,
      method: 'GET',
      handler // es6 等价于 handler: handler
    })
  }
  routes() {
    return async (ctx, next) => {
      const { method, url } = ctx
      const matchedRouter = this._routes.find(
        r => r.method === method && r.url === url
      )
      if (matchedRouter && matchedRouter.handler) {
        await matchedRouter.handler(ctx, next)
      } else {
        await next()
      }
    }
  }
}
module.exports = Router
