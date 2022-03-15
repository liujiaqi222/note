// 1.判断buffer支持哪种编码方式
let res = Buffer.isEncoding('utf8')
console.log(res);

// 2.判断是否为buffer
let obj = {};
console.log(Buffer.isBuffer(obj));