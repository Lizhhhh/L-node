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

# 设置全局合适的字体大小
  - 获取屏幕的宽度
```
let screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
screenWidth = screenWidth > 750? 750 : screenWidth
```
  - 获取html dom元素,并设置字体大小
```
const htmlDom = document.getElementbyTagName('html')[0];
htmlDom.style.fontSize = screenWidth / 20 + 'px';
```

# 首页设置
  1. 根据需求创建组件
     - /src/components/pages/ShoppingMall.vue
  2. 添加默认路由
     - /src/router/index.js
```
import ShoppingMall from '@/components/pages/ShoppingMall'
export default new Router({
  routes:[{
    path: '/',
    name: 'ShoppingMall',
    component: ShoppingMall
  }]
})
```

# 快速创建Vue组件的工具
  - Vue VSCode Snippets
  - 快速生成 vue 的基本结构
```
vbs + tab
```
  - 快速生成 data
```
vdata + tab
```

# Vant 布局的使用
  - /src/main.js
  - 导入
```
import {Row,Col} from 'Vant'
Vue
   .use(Row)
   .use(Col)
```
  - 使用
  - 注:vant中的布局,一行分为24份
```
<van-row class="text-row">
    <van-col :span="8">span:8</van-col>
    <van-col :span="8">span:8</van-col>
    <van-col :span="8">span:8</van-col>
</van-row>
```

# 图标
  1. 登录 http://www.iconfont.cn 选择图标,并下载
  2. 下载图标保存在 /src/assets/images下
  3. 导入
     + 推荐使用如下的方式导入
     ```
     <img :src="icon" width="100%"/>

     data(){
       return {
         locationIcon: require('../../assets/images/location.png')
       }
     }
     ```

# 轮播图
  1. 导入&挂载
  ```
  import {Swipe, SwipeItem} from 'vant'

  Vue.use(Swipe, SwipeItem)
  ```
  2. 使用
     - autoplay: 多少毫秒后滑动
  ```
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
      <img :src="banner.imageUrl" width="100%" />
    </van-swipe-item>
  </van-swipe>
  ```
    - 可以通过设置最大高度,超出隐藏,来解决网速过慢,轮播图控制点偏下的bug

# 图片的懒加载
  1. 导入&挂载
  ```
  import {Lazyload} from 'vant'

  Vue.use(Lazyload)
  ```
  2. 使用
     - 将 :src 属性改为 v-lazy
  ```
  <img v-lazy="" width="100%">
  ```

# 使用 easy mock 模拟发送数据
  - 登录easy mock 官网: https://www.easy-mock.com
  - 右下角加号创建项目
  - 点击新建的项目进入该项目
  - 新建接口
  - 复制链接即可模仿接口

# 使用 axios 获取数据
  - 安装
  ```
  npm install axios --save
  ```
  - 导入
  ```
  import axios from 'axios'
  ```
  - 使用
  ```
  created(){
    axios({
      url:'https://www.easy-mock.com/mock/5d89f50298fe8f6134b63b54/smileVue/index',
      method:'get'
    })
    .then(response=>{
      console.log(response)
    })
    .catch(error=>{
      console.log(error);
    })
  }
  ```

# easy mock 太慢替代方案
    - 在根目录下创建 data.json
    - 根据需要从 http://www.jspang.com/posts/2018/04/28/vue-koa2.html#%E7%AC%AC07%E8%8A%82%EF%BC%9Aeasymock%E5%92%8Caxios%E7%9A%84%E4%BD%BF%E7%94%A8 复制需要的数据到data.json中
    - 使用json-server 进行监听
    ```
    json-server --watch data.json
    ```
    - 改进:在package.json中添加一个启动server命令
    ```
    "scripts":{
      "server":"json-server --watch data.json"
    }
    ```
    - 改进后,另开一个线程,使用以下命令启动
    ```
    npm run server
    ```

# flex布局,按行排列,不换行
```
.type-bar{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow:scroll;
}
```






# 图片不整齐解决方案
  - 找到大多数的图片尺寸,使用rem表示
  ```
  .type-bar div img{
    width: 3.1rem;
    height: 3.1rem;
  }
  ```


# flex布局,使字体靠左
  - 字体大小一般是14px
  ```
  .recommend-title{
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
  }
  ```
