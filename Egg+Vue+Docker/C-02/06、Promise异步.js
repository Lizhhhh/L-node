// const getName = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("nodejs");
//     }, 50);
// });

const getError = Promise.reject("出错啦~");

getError.catch(console.log);

// Promise.all([getName, getName])
//     .then(console.log)
//     .catch(console.log);

// Promise.race([getName, getName])
//     .then(console.log)
//     .catch(console.log);

// getName
//     .then(name => {
//         console.log(name);
//         return 20;
//     })
//     .then(number => {
//         console.log(number);
//     });