// 使用mongoose连接mongoDB
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test",{
  useNewUrlParser: true
});
const conn = mongoose.connection;
conn.on("error", ()=>console.error("连接数据库失败"));
conn.once("open", ()=>console.log("连接数据库成功"));