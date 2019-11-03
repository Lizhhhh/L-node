const buf1 = Buffer.alloc(10);  // 分配10字节的内存
// console.log(buf1);

const buf2 = Buffer.from([1,2,3]);  // 二进制的01 02 03
// console.log(buf2);

const buf3 = Buffer.from('Buffer创建方法');
console.log(buf3.toString());

buf1.write('hello');
console.log(`buff1:${buf1}`);

const buf4 = Buffer.concat([buf1, buf3]).toString();
console.log(`buf4:${buf4}`);