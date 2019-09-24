# lzhhc-vue2koa2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 初始化一个vue项目
```
vue init webpack
```
   - 注释掉以下内容
   - build/webpack.base.conf.js
```
// ...(config.dev.useEslint ? [createLintingRule()] : []),
```

# vant
  - 官网: https://youzan.github.io/vant/#/zh-CN/intro
  - 安装:
  - 太慢可以使用淘宝的源: npm install vant --save --registry=https://registry.npm.taobao.org
```
cnpm i vant -S
```
  - 引入(全局)
```
import Vant from 'vant';
import 'vant/lib/vant-css/index.css'
Vue.use(Vant)
```
  - 按钮的使用
  - src/components/HelloWorld.vue
```
<van-button type="primary">主要按钮</van-button>
```

# babel-plugin-import
  - 作用：按需引入第三方库中的文件
  - 安装
```
npm i babel-plugin-import -D
```
  - 设置 .babelrc
```
"plugins":[
  "transform-vue-jsx",
  "transform-runtime",
  ["import",{"libraryName":"vant","style":true}]
]
```
  - 导入
  - 以导入按钮为例
```
import { Button } from 'vant'
Vue.use(Button)
```

# iphone 5 以下几条是等价的
  - 1rem
  - 16px
  - font-size:16px

# 获取屏幕当前的大小
```
const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
```
  - 设置全局字体的大小
```
const htmlDom = document.getElementbyTagName('html')[0];
htmlDom.style.fontSize = screenWidth / 20 + 'px';
```

