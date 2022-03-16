// 1.判断buffer支持哪种编码方式
let res = Buffer.isEncoding("utf8");
console.log(res); //true

// 2.判断是否为buffer类型对象
let obj = {};
console.log(Buffer.isBuffer(obj)); //false
obj = Buffer.alloc(5);
console.log(Buffer.isBuffer(obj)); //true

// 3.获取buffer对象的实际字节长度
// Buffer.byteLength(string[, encoding])
// 注意点：一个汉字占用3个字节
let buf = Buffer.from("abc");
console.log(Buffer.byteLength(buf)); //3
buf = Buffer.from("嘉琪");
console.log(Buffer.byteLength(buf)); //6
console.log(buf.length); //6 可以直接用这种方式

// 4.合并buffer中的数据
// Buffer.concat(array[, totalLength])
let buf1 = Buffer.from("abc");
let buf2 = Buffer.from("123");
console.log(Buffer.concat([buf1,buf2])); //<Buffer 61 62 63 31 32 33>
console.log(Buffer.concat([buf1,buf2]).toString()); //abc123
