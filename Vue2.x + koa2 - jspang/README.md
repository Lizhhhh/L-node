# lzhhc-vue2koa2

# 重要(important!)
  - 下载项目后,需要按照如下方式启动
```
// 1.
npm run dev
// 2.
npm run server
// 3.
mongod
// 4.
cd service
node index.js
```


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

# swiper的使用(详细版)
  - github: https://github.com/surmon-china/vue-awesome-swiper
  - 轮播循环
  - 安装
```
npm install vue-awesome-swiper --save
```
  - 导入(在需要的页面)
  - /src/components/pages/ShoppingMall.vue
```
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
```
  - 挂载到Vue
```
export default{
  data(){
    ...
  },
  components:{
    swiper,
    swiperSlide
  }
}
```
  - 使用
  - 滑动组件的选项 :options
```
<swiper-slide :options="swiperOption">
    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
        <div class="recommend-item">
            <img :src="item.image" width="80%">
            <div>{{item.goodsName}}</div>
            <div>￥{{item.price}}(商城￥{{item.mallPrice}})</div>
        </div>
    </swiper-slide>
</swiper>
<script>
export default{
  data(){
    return {
      swiperOption:{
        slidesPerView:3    // 每一个页面展示3项!
      }
    }
  }
}
</script>
```

# 快速生成Swiper组件
  - 熟悉体验vue-awesome-swiper组件
  - 项目源代码 /src/components/swiper/swiperDefault.vue
  - 1.快速生成一个vue模板(Vue2 Snippets)
```
vbs + tab
```
  - 2.局部(部分)导入
  - /src/components/swiper/swiperDefault.vue
```
<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default{
  data(){
    return {
      ...
    }
  },
  components:{
    swiper,
    swiperSlide
  }
}
</script>
```
  - 3.使用
```
<template>
    <div>
        <swiper>
            <swiper-slide v-for="(item,index) in slide" :key="index">
                Slide {{item}}
            </swiper-slide>
        </swiper>
    </div>
</template>
```
  - 4.作为其他页面的子组件使用
  - /src/components/pages/ShoppongMall.vue
```
<script>
import swiperDefault from '../swiper/swiperDefault.vue'
export default{
  data(){
    return{
      ...
    }
  },
  components:{
    swiperDefault
  }
}
</script>
```
  - 使用
```
<swiper-default></swiper-default>
```

# swiper 的导入(简版)
  - header
```
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
```
  - swiperOption
  - 在data中
```
swiperOption:{
  pagination:{
    el:'.class'
  }
}
```
  - components
```
components:{
  swiper,
  swiperSlide
}
```
  - template
```
<swiper class="" :options="swiperOption">
  <swiper-slide class="" v-for="(item,index) in slides" :key="index">
    Slide {{item}}
  <swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
```

# swiper 组件的带分页器
  - 导入如上
  - 注意:
  - :options="swiperOption"
```
<swiper :options="swiperOption">
    <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
        Slide{{item}}
    </swiper>
    <div class="swiper-pagination" slot="pagination">
</swiper-slide>

<script>
export default{
  data(){
    return{
      swiperOption{
        pagination:{
          el:'.swiper-pagination'
        }
      }
    }
  }
}
</script>
```
  - 可点击的分页器
  - clickable
```
<script>
export default{
  data(){
    return{
      swiperOption{
        pagination:{
          el:'.swiper-pagination',
          clickable:true
        }
      }
    }
  }
}
</script>
```
  - 循环滚动
  - loop:true
```
<script>
export default{
  data(){
    return{
      swiperOption:{
        loop:true,
        pagination:{
          el:'.swiper-pagination',
          clickable:true
        }
      }
    }
  }
}
</script>
```

# swiper 组件带分页器的垂直显示
  - direction: 'vertical'
  - 源代码 /src/components/swiper/swiperDefault3.vue
```
<swiper class="swiper" :options="swiperOption">
  <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
    Slide {{item}}
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>

<script>
export default{
  data(){
    return {
      swiperOption{
        direction:'vertical',
        pagination:{
          el:'.swiper-pagination'
        }
      }
    }
  }
}
</script>

<style scoped>
.swiper{
  height:7rem;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}
.swiper-slide{
  height:6rem;
  text-align:center;
  line-height: 6rem;
}
</style>
```
  - 让字体在垂直方向居中
```
.class{
  height:6rem;
  line-height:6rem;
}
```

# swiper 区域滚动效果
  - 源代码 src/components/swiper/swiperText.vue
  - swiperOption
```
swiperOption:{
  direction: 'vertical',  // 竖直方向
  slidesPerView: 'auto',  // 每页显示的数量
  freeMode: true,      // 无间隔滑动(否则按item一项一项的滑动)
  mousewheel: true     // 打开鼠标滚轮效果
}
```
 - 限制swiper的高度(一般竖直都规定高度)
```
.swiper{
  height: 18.75rem;
  overflow: hidden;
}
```
 - 长篇文字(垂直方向)居中显示样式问题解决方案(盒布局)
```
.text{
  font-size: 14px;
  text-align: left;
  padding: 30px;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
```



# flex 布局
  - 让多个div框呈1行排列
```
.floor-regular{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```

# 盒布局
  - 限制div的宽度
```
.floor-regular div{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
```

# 从父组件向子组件传数据
  - 以floorComponent为例
  - 首先在父组件中写好样式和数据
  - 新建一个.vue文件,将要封装的代码复制到 floorComponent.vue
  - 挂载与使用
  - 父组件 ShoppingMall.vue
```
import floorComponent from '../component/floorComponent.vue'
components:{
  floorComponent
}
```
  - 数据传递
  - 父组件中右floor1
  - 子组件中右floorData
  - 子组件使用props:['fromFloor1']接受父组件的数据
```
// 父组件<template>
<floor-component :fromFloor1="floor1"></floor-component>

// 子组件
props:['fromFloor1'],
data(){
  return {
    floorData0:{},
    floorData1:{},
    floorData2:{}
  }
},
created(){
  this.floorData0 = this.fromFloor1[0];
  this.floorData1 = this.fromFloor1[1];
  this.floorData2 = this.fromFloor1[2];
}
```

# 全局过滤器
  - src目录下新建filter文件夹(用于存放过滤器的函数)
  - 编写filter方法toMoney并导出
```
export function toMoney(money = 0){
  return money.toFixed(2);
}
```
  - 在需要使用到的页面如 /src/pages/ShoppingMall/vue 中导入并挂载
```
import { toMoney } from '@/filter/moneyFilter.js'

export default{
  data(){
    return {
      ...
    }
  },
  filters:{
    moneyFilter(money){
      return toMoney(money);
    }
  }
}
```
  - 在需要的位置使用
```
<div>￥{{ item.price | moneyFilter }} (￥{{ item.mallPrice | moneyFilter }})</div>
```

# 使用mongoose连接MongoDB
  - npm install --save mongoose
  - 导入mongoose
  - 暴露接口给index连接
  - /service/database/init.js
```
const mongoose = require('mongoose');
const db = 'mongodb://localhost/smile-db';

exports.connect = () =>{
  // 连接数据库
  mongoose.connect(db);

  // 断开执行函数
  mongoose.connection.on('disconnected', () =>{
    console.log('[disconnected] 数据库断开连接... ');
    mongoose.connect(db);
  })

  mongoose.connection.on('error', ()=>{
    console.log('[error] 数据库出错');
    mongoose.connect(db);
  })

  mongoose.connection.once('open', () =>{
    console.log('[ok] MongoDB connected successfully');
  })
}
```
  - /service/index.js读取接口,执行连接操作
```
const { connect } = require('./database/init.js');

(async () => {
  await connect()
})()
```

# 设置数据库连接失败,断线重连的次数
  - /service/init.js
```
exports.connect = () =>{
  mongoose.conncet(db);

  let maxConnectTimes = 0;

  return new Promise((resolve,reject)=>{
    mongoose.connection.on('disconnected',(err)=>{
      if(maxConnectTimes <= 3){
        maxConnectTimes++;
        mongoose.connect(db);
        console.log(`正在尝试第${maxConnectTimes}次连接...`);
      } else{
        reject(err);
        throw new Error('数据库连接失败... 请检查 /database/init.js 代码');
      }
    })
  })
}
```

# mongoose的三个定义
  - schema: 用来定义表的模板,实现和MongoDB数据库的映射.
  - model: 具备表操作能力的一个集合,是mongoose的核心能力
  - entity:类似记录,由Model创建的实体

# 创建Schema
  - String: 字符串类型
  - Number: 数字类型
  - Date: 日期类型
  - Boolean: 布尔类型
  - Buffer: NodeJs的 Buffer类型
  - ObjectId: 主键,一种特殊的类型
  - Mixed: 混合类型
  - Array: 集合类型
```
// 主键(对外)
let ObjectId = Schema.Types.ObjectId;

// 创建UserSchema
const UserSchema = new Schema({
    UserId: { type: ObjectId },
    userName: {
        unique: true, // 不重复
        type: String // 字符串类型
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }
})
```
  - 发布模型
  - 下面的User要和数据库表中的名字一样
```
mongoose.model('User', userSchema);
```

# Schema对数据的插入和查询
  - 安装glob
  - glob:允许你使用*等符号,来写一个glob规则
  - /service
```
npm install --save glob
```
  - 导入glob
```
const glob = require('glob');
```
  - 使用glob对引入所有的 Schame
  - 假设/service/database/schema下有以下Schema
  - User.js
  - Company.js
  - ...
```
const glob = reqire('glob');
const { resolve } = require('path');

exports.initSchemas = () =>{
  glob.async(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}
```
  - 首先要找到此时的数据库,
  - 当在shell执行 node index.js时
  - 与数据库有关的立即执行函数执行了2个方法
  - initSchemas() 来自init. 它连接了 mongodb://localhost/smile-db
    + 即smile-db数据库
  - mongoose.model('User') 表示 连接到 User集合中.
    + 通过Robo 3T 可以在users 集合中找到插入的数据
  - 插入的数据:oneUser
  - 如何插入:oneUser.save()
```
const User = mongoose.model('User');
let oneUser = new User({
  userName:'lzhhc',
  password:'123456'
})

oneUser.save().then(()=>{console.log("插入成功")});
```
  - 下面是查询
  - 查询一个: findOne
  - /service/index.js
```
let user = await User.findOne({}).exec();
console.log(user);
```

# 密码的处理
  - 加密处理
  - 在线调试: http://www.atool9.com/hash.php
  - bcrypt: 加密工具
  - 安装 && 使用
```
npm install --save bcrypt

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  UserId: {type: ObjectId},
  password: String
})

UserSchema.pre('save',(next)=>{
  bcrypt.genSalt(SALT_WORK_FACTOR,(err, salt) =>{
    if(err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) =>{
      if(err) return next(err);
      this.password = hash;
      next();
    })
  })
})
```
  - UserSchema.pre:每次在保存数据时,先进行的函数
  - bcrypt.genSalt: 加盐处理
  - bcrypt.hash: 加密处理



# 使用Koa-router进行路由管理
  - npm install --save koa-router
```
const Router = require('koa-router');
let router = new Router();
router.get('/', async (ctx)=>{
  ctx.body = '用户操作首页'
})
```


# 路由模块化
  - 在appApi下面创建需要模块化的文件
  - 如:home.js、user.js
```
const Router = reuiqre('koa-router');
let router = new Router();
router.get('/home', async (ctx)=>{
  ctx.body = 'home'
})

module.exports = router
```
  - 导入
  - /service/index.js
```
const Koa = require('koa');
const app = new Koa()
const Router = require('koa-router');
let home = require('./appApi/.home.js');
let router = new Router();
router.use('/user', user.routes());

app.use(router.routes());
app.use(router.allowedMethods());
```

# 使用body-parser解析post请求
  - 安装
  - service/index.js
```
npm install --save koa-bodyparser
```
  - 导入
```
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser)
```
  - 准备请求的url
  - 全局配置
  - src/serviceAPI.config.js
```
const LOCALURL ='http://localhost:3001/';
const URL = {
  registerUser = LOCALURL + 'user/register',
}
module.exports = URL;
```
  - 准备POST请求
  - src/components/component/pages/Register.vue
```
import axios from 'axios'
import url from '@serviceAPI.config.js'

export default{
  data(){
    username:'',
    password:''
  },
  methods:{
    axiosRegisterUser(){
      axios({
        url: url.registerUser,
        method: 'post',
        data:{
          username: this.username,
          password: this.password
        }
      })
      .then(response =>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }
}
```
  - 后端接受post请求中的参数
  - service/user.js
```
const Router = require('koa-router');

let router = new Router();
router.post('./register', async(ctx)=>{
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
})

module.exports = router;
```

# 设置后台允许解决跨域(简单版)
  - 中间件: koa2-cors
```
npm install --save koa2-cors
```
  - 引入:
  - service/index.js
```
const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');

app.use(cors())
```

# koa与数据库交互
  - 首先在负责某个模块的路由中引入mongoose
  - 安装mongoose:mongoDB在node中实现
```
npm install --save mongoose
```
  - 安装body-parser:解析Post请求
```
npm install --save body-parser
```
  - service/appApi/user.js
```
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

app.user(bodyParser())

let router = new Router();
router.post('/',async(ctx)=>{
  const User = mongoose.model('User');
  // 将获取的数据命名为newUser
  let newUser = new User(ctx.request.body);

  // 将newUsr存入数据库中
  await newUser.save().then(()=>{
    ctx.body = {
      code:200,
      message:'注册成功'
    }
  }).catch(error=>{
    ctx.body={
      code:500,
      message:error
    }
  })
})
```
  - 数据库的初始化
```
npm install glob --save

const glob = require('glob');
const initSchemas = () =>{
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}
```
  - 数据库的连接
```
const connect = ()=>{
  mongoose.connect(db);
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) =>{
    mongoose.connection.on('disconnected', (err) =>{
      if(maxConnectTimes < =3 ){
        maxConnectTimes++;
        mongoose.connect(db);
        console.log(`正在第${maxConnectTimes}次连接数据库....`);
      } else {
        reject(err);
        throw new Error('数据库出现问题,程序无法搞定,请认真....');
      }
    });

    mongoose.connection.on('error', () =>{
      console.log('[error] 数据库出错');
      mongoose.connect(db);
    })

    mongoose.connection.once('open', () => {
      console.log('[ok] MongoDB connected successfully');
      resolve();
    })
  })
}
```

# 前端处理后台返回的数据
  - 使用vant的Toast作为提示消息的函数
  - Vant->Toast: https://youzan.github.io/vant/#/zh-CN/toast
```
import { Toast } from 'vant'
```
  - 状态码200:返回成功
  - 假设axiosRegisterUser()是axios的Post方法请求数据库的数据
```
axiosRegisterUser(){
  axios({
    url:url.registerUser,
    method:'POST',
    data:{
      username:this.username,
      password:this.password
    }
  })
  .then(response =>{
    console.log(response);

    if(response.data.code === 200){
      Toast.success(response.data.message);
    } else{
      console.log(response);
      Toast.fail('注册失败');
    }
  })
  .catch((error) =>{
    console.log(error);
  })
}
```

# 向数据库插入一条数据
```
const User = mongoose.model('User');
let oneUser = new User({
  userName: 'lzhhc',
  password: '123456'
})
oneUser.save().then(() =>{
  console.log('插入成功!');
})
```

# 按钮的防重复点击事件
  - :loading属性
  - 当loading = true时:按钮会显示一个旋转的圆圈.此时的按钮是无法点击的
  - 当loading = false时:按钮重新变为可点击的状态
  - 可以通过使用一个变量来控制按钮的可点击性,当提交时,按钮不可点击,提交完毕后,按钮可以点击
```
<van-button :loading="openLoading">提交</van-button>

data(){
  return {
    openLoading:false
  },
  methods:{
    axiosRegisterUser(){
      this.openLoading = true;
      axios({
        url: ...,
        method:'post',
        data:{
          userName: this.username,
          password: this.password
        }
      })
      .then(response=>{
        if(success){
          // 跳到首页
          this.$router.push('/')
        } else{
          Toast.fail('注册失败');
          this.openLoading = false;
        }
      })
    }
  }
}
```

# 前端、后端联系知识梳理
  - 以打开浏览器,访问login为栗
  - 打开浏览器,访问localhost:8080/#/login
  - src/router/index.js 会根据 /login 找到对应的Login(src/components/pages/Login.vue)组件, 然后渲染到浏览器
  - 当输入用户名和密码,点击登录按钮后
  - 根据Login组件中配置的axios请求向后端发送请求.
  - 请求的url是: http://localhost:3001/login
  - 后端监听该url的代码如下
```
const Router = require('koa-router');
let router = new Router();

router.post('/login', async(ctx)=>{
  // 此处是逻辑实现代码
})
```
  - 后端监听到该路由请求后,会用请求的参数和数据库进行比对.
  - 使用mongoose连接数据库的代码如下
```
const mongoose = require('mongoose');
const { resolve } = require('path');
const db = 'mongodb://localhost/smile-vue'

exports.connect = () =>{
  mongoose.connect(db);
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) =>{
    mongoose.connection.on('disconnected', (err) =>{
      // 断线重连,最大重连次数3次
      if(maxConnectTimes <= 3){
        maxConnectTImes++;
        mongoose.connect(db);
      } else{
        reject(err);
        throw new Error('[connect error] 数据库连接失败')
      }
    });

    // 失败
    mongoose.connection.in('error', () =>{
      console.log('[error] 数据库出错');
      mongoose.connect(db);
    })

    // 成功打开
    mongoose.connection.once('open', () =>{
      console.log('[ok] MongoDB connected successfully');
      resovle();
    })
  })
}
```
  - 导入各个集合规则
  - 使用glob
```
const glob = require('glob');
const { resolve } = require('path');

export.initSchemas = () =>{
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}
// 此时,会连接到数据库,并初始化各个表的规则.
```
  - 使用mongoose查找数据
```
const User = mongoose.model('User');

User.findOne({ userName: username }).exec().then(async (result) =>{
  console.log(result);
})
```
  - koa返回数据给前端
```
ctx.body = {
  code:200,
  message:msg
}
```

# 前端实现登录逻辑
  - 假设账号,密码正确,后端会返回 { code:200, message:true}
  - 1.根据给定的接口发送http请求,
  - 2.判断返回的数据是否正确.
  - 3.如果通过验证,则弹出登录成功,跳转到首页路由
    - vue中使用this.$router.push('/')来实现路由跳转
  - 4.如果未通过验证,则提示登录失败,将openLoading的值置为false

# 前端登录状态存储
  - 当返回数据成功后,使用一个promise函数,将登录返回的token放到LocalStorage里面
  - 后续和登录一样
  - 再生命周期中的created中,新增一个判断是否登录的代码如下
```
if(localStorage.userInfo){
  Toast.success('登录成功');
  this.$router.push('')
}
```

# 使用fs模块提纯json中的数据
  - 首先准备一个5W条数据的json文件:https://github.com/shenghy/SmileVue/blob/master/service/data_json/goods.json, 将该数据存到本地的 goods.json中
  - fs读取文件
```
const fs = require('fs');
fs.readFile('./goods.json','utf8',(err,data)=>{
  const newData = JSON.parse(data);
  let i =0;
  newData.RECORDS.map((value,index)=>{
    if(value.IMAGE1 !== null){
      pushData.push(value);
    }
  })
})
```
  - 写文件操作
  - 假设数据都在pushData数组中
```
fs.writeFile('./newsGoods.json', JSON.stringify(pushData), (err)=>{
  if(err) console.log('写文件操作失败')
  else console.log('写文件操作成功')
})
```

# 使用mongoose写一个集合的规则
  - 首先要设计数据结构
  - 下面是newGoods.json里面的一条数据
```
 {
    "ID": "ff89cf2e14e143dc9e49ad75f7bc7bb0",
    "GOODS_SERIAL_NUMBER": "6901844910651",
    "SHOP_ID": "402880e860166f3c0160167897d60002",
    "SUB_ID": "2c9f6c94609a62be0160a024fff1001d",
    "GOOD_TYPE": 0,
    "STATE": 0,
    "IS_DELETE": 1,
    "NAME": "味好美番茄沙司(特惠装)340gx2/份",
    "ORI_PRICE": 15.5,
    "PRESENT_PRICE": 9.9,
    "AMOUNT": 10000,
    "DETAIL": '<div>Hi Mongoose</div>',
    "BRIEF": null,
    "SALES_COUNT": 0,
    "IMAGE1": "http://images.baixingliangfan.cn/shopGoodsImg/20180223/20180223091019_7384.jpg",
    "IMAGE2": null,
    "IMAGE3": null,
    "IMAGE4": null,
    "IMAGE5": null,
    "ORIGIN_PLACE": null,
    "GOOD_SCENT": null,
    "CREATE_TIME": 1512208899918,
    "UPDATE_TIME": 1519725197992,
    "IS_RECOMMEND": 0,
    "PICTURE_COMPERSS_PATH": "http://images.baixingliangfan.cn/compressedPic/20180223091019_7384.jpg"
}
```
  - 1.导入mongoose
  - 2.使用mongoose提供的Schema
  - 3.设计的goodsSchema
  - 4.暴露goodsSchema,供其他使用
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
    ID: { unique: true, type: String },
    GOODS_SERIAL_NUMBER: String,
    SHOP_ID: String,
    SUB_ID: String,
    GOOD_TYPE: Number,
    STATE: Number,
    NAME: String,
    ORI_PRICE: Number,
    PRESENT_PRICE: Number,
    AMOUNT: Number,
    DETAIL: String,
    BRIEF: String,
    SALES_COUNT: Number,
    IMAGE1: String,
    IMAGE2: String,
    IMAGE3: String,
    IMAGE4: String,
    IMAGE5: String,
    ORIGIN_PLACE: String,
    GOOD_SCENT: String,
    CREATE_TIME: String,
    UPDATE_TIME: String,
    IS_RECOMMEND: Number,
    PICTURE_COMPRESS_PATH: String
}, {
    collections: 'Goods'
})

// 将建立的规则发布到model上面
mongoose.model('Goods', goodsSchema);
```


# 数据库的初始化操作
  - 连接的数据库的名称
  - 包含连接数据库
  - 初始化所有的Schemas
  - 暴露给其他页面使用的接口
```
const mongoose = require('mongoose');
const db = 'mongodb://localhost/smile-vue'
const glob = require('glob');
const { resolve } = require('path');

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}

exports.connect = () => {
    // 连接数据库
    mongoose.connect(db);
    // 最大连接次数...
    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        // 增加数据库监听事件
        mongoose.connection.on('disconnected', (err) => {
            if (maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);
                console.log(`正在第${maxConnectTimes}次连接数据库...`);
            } else {
                reject(err);
                throw new Error('数据库出现问题,程序无法搞定,请认为修理....');
            }
        });

        mongoose.connection.on('error', () => {
            console.log('[error] 数据库出错');
            mongoose.connect(db);
        })

        mongoose.connection.once('open', () => {
            console.log('[ok] MongoDB connected successfully');
            resolve()
        })
    })
}
```

# 导入大量数据到mongoDB
  - 假设数据在newGoods.json文件中
  - 假设数据在MongoDB中的model是Goods
```
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo', async (ctx)=>{
  fs.readFile('./newGoods.json', 'utf8', (err, data)=>{
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = mongoose.model('Goods');
    data.map((value, index) =>{
      console.log(value);
      let newsGoods = new Goods(value);
      newGoods.save()
      .then(()=>{
        saveCount++;
        console.log(`成功${saveCount}`);
      })
      .catch(error=>{
        console.log(MediaStreamErrorEvent);
      })
    })
  })
  ctx.body ='开始导入数据'
})
```

# koa-router查找mongoDB中的数据,并返回
  - findOne接口
```
const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');

router.post('/getDetailGoodsInfo', async (ctx) =>{
  const goodsId = ctx.request.body.goodsId;
  const Goods = mongoose.model('Goods');
  await Goods.findOne({ID: goodsId}).exec()
  .then(async (result)=>{
    ctx.body = {
      code:200,
      message: result
    }
  })
  .catch(error =>{
    console.log(error);
    ctx.body ={
      code:500,
      message:error
    }
  })
})
```

# 热卖商品,点击跳转复习
  - 点击页面中的热卖商品,跳转到热卖商品的详情页
  - 在父组件(ShoppingMall.vue)中使用<goods-info>导入子组件(goodsInfoComponent.vue)
  - 父组件通过 :goodsId 向子组件传递信息,传递的信息为 item.goodsId
  - 子组件中: 监听点击事件 goGoodsPage方法.
  - goGoodsPage方法中,有一个this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
  - 会跳到name为Goods的组件(在router/index.js中可以找到),同时会传递goodsId信息给子组件

# Toast 引入
```
import { Toast } from 'vant'
```

# 过滤器的引用
  - filter文件夹下面有一个 moneyFilter.js里面是规范价格的过滤函数
  - vue中有一个filters属性,用来注册过滤器
  - 在需要的页面导入moneyFilter.js,然后注册过滤函数即可使用过滤器
```
import { toMoney } from '@/filter/moneyFilter.js'

export default{
  data(){
    return{
      ...
    }
  },
  filters:{
    moneyFilter(money){
      return toMoney(money)
    }
  }
}
```

# 使用vant中的 tabs和tab 进行布局
  - 由于全局都可能会用到,首先在全局中按需导入
```
// main.js
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
Vue
.use(Tab)
.use(Tabs)
```
  - 使用基本模板
```
<div>
  <van-tab title="商品详情">商品详情</van-tab>
  <van-tab title="评论">评论</van-tab>
</div>
```

# 导航栏反白效果制作
  - 类如下
```
.categoryActice {
  background-color: #fff;
}
```
  - ul如下
```
<ul>
  <li v-for ="(item, index) in category" :key="index" @click="clickCategory(index)" :class="{categortActice:categoryIndex === index}">
  </li>
</ul>
```
  - data和点击方法
```
data() {
  return {
    categoryIndex: 0]
  }
},
methods: {
  clickCategory(index) {
    this.categoryIndex = index;
  }
}

```



