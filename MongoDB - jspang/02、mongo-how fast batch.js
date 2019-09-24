const starttime = (new Date()).getTime();
const db = connect('log');
// for (let i = 0; i < 10000; i++) {
//     db.test.insert({ "num": 1 });
// }

let batchArr = [];
for (let i = 0; i < 10000; i++) {
    batchArr.push({ num: 1 });
}
db.test.insert(batchArr);


const endttime = (new Date()).getTime();
print(`[demo]This run is ${endttime - starttime} ms`);