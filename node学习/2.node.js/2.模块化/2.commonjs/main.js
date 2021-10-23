const bar = require('./bar.js'); 
// 本质是 bar = exports，变量bar是对bar.js文件中exports对象的浅拷贝

console.log(bar.myName); // jiaqicoder

setTimeout(() => {
    // 打印jiaqi
    console.log(bar.myName); 
    // exports中的myName修改后，此时打印的myName也将被修改
}, 1500);