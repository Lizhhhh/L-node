const nunjucks = require('koa-nunjucks-2')
app.use(
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  })
)
