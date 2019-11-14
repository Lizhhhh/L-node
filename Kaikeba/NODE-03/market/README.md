# 使用events传送数据
- 源代码 /market/event.js
- 栗子: 每一秒钟执行一次
````javascript
const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();
event.on("some_event", num => {
  console.log("event:" + num);
})

let num =0;
setInterval(()=>{
  event.emit("some_event", num++);
}, 1000);
````
- 栗子: 只接受一次.
````javascript
event.once("some_event", num =>{
  console.log("event:" + num);
})
````

# express监听浏览器3000端口的请求,返回本地的inde.html文件
````javascript
const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res)=>{
  res.sendFile(path.resolve("./index.html"));
})

app.listen(3000, async ()=>{
  console.log("[Server] server is running at http://localhost:3000");
})
````

# express获取get请求参数
- /api/list?page=${this.page}
````javascript
app.get("/api/list", async (req,res)=>{
  console.log(req.query);
})
````