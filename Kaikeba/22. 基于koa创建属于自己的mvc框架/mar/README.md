# 实现MVC分层架构
- 目标是创建约定大于配置、开发效率高、可维护性强的项目架构
- 路由处理
  - 规范
    - 所有路由,都要放在routes文件夹中
    - 若导出路由对象,使用 动词+空格+路径 作为key, 值是操作方法
    - 若导出函数, 则函数返回第二条约定格式的对象
  - 路由定义:
    - 新建 `router/index.js`, 默认`index.js`没有前缀
    ````javascript
    module.exports = {
      'get /':async ctx => {
        ctx.body = '首页'
      },
      'get /detail': ctx => {
        ctx.body = '详情页面'
      }
    }
    ````
    - 新建 `router/user.js`路由前缀是`/user`
    ````javascript
    module.exports = {
    'get /': async ctx => {
        ctx.body = '用户首页'
    },
    'get /detail': async ctx => {
        ctx.body = '用户详情页面'
    }
}
    ````

# 读取某个目录下的文件名
````javascript
const path = require('path');
const fs = require('fs');
const load = async (dir, cb) =>{
  // 获取绝对路径
  const url = path.resolve(__dirname, dir);
  // 读取目录
  const files = fs.readdirSync(url);
  files.forEach((filename) =>{
    console.log(filename);
  });
}
````

# 去掉文件的扩展名
````javascript
// 假设文件名称存放在files数组中,去掉`.js`扩展名
const removeJS = (files) =>{
  files.forEach((filename) =>{
    filename = filename.replace('.js', '');
  })
}
````