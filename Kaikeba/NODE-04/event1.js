// console.time("start");
// setImmediate(function() {
//     console.log(1);
// });
// setTimeout(function() {
//     console.log(2);
// }, 10);
// new Promise(function(resolve) {
//     console.log(3);
//     resolve();
//     console.log(4);
// }).then(function() {
//     console.log(5);
//     console.timeEnd("start")
// });
// console.log(6);
// process.nextTick(function() {
//     console.log(7);
// });
// console.log(8);

// 栗子2
// new Promise(resolve=>{
//   resolve()
// }).then(()=>{
//   console.log("promise then");
// })

// process.nextTick(()=>{
//   console.log("nextTick");
// })


// // 栗子3
// setTimeout(() => {
//     console.log('setTimeout');
// }, 0);

// setImmediate(() => {
//     console.log('setImmediate');
// })

// // 栗子4
// console.time("start");
// const fs = require('fs');
// fs.readFile(__dirname, () => {
//     setTimeout(() => {
//         console.log("setTimeout");
//     }, 0);

//     setImmediate(() => {
//         console.log("setImmediate");
//     });
//     console.timeEnd("start");
// })

// 栗子5
console.time("start");

setTimeout(() => {
    console.log(2);
}, 10);

setImmediate(function(){
  console.log(1);
});

new Promise(function (resolve){
  console.log(3);
  resolve();
  console.log(4);
}).then(function(){
  console.log(5);
  console.timeEnd("start")
});

console.log(6);

process.nextTick(function(){
  console.log(7);
});
console.log(8);