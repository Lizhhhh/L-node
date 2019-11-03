const fs = require('fs');

// // 同步读取数据
// const data = fs.readFileSync('./package.json');
// console.log(data.toString());

// // 异步读取数据
// fs.readFile('./package.json',(err,data)=>{
//   console.log(data.toString());
// })


// // 使用promisify将异步读取包装成Promise函数
// const { promisify } = require('util');
// const readFile = promisify(fs.readFile);
// readFile('./package.json')
//     .then(data => {
//         console.log(data.toString());
//     }, err => {
//         console.log(err);
//     })
