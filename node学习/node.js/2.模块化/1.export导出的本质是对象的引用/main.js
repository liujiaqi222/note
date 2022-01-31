const bar = require('./bar.js'); 
// 本质是 bar = exports，变量bar是对bar.js文件中exports对象的浅拷贝

console.log(bar.name,2); //jiaqicoder

bar.name ='jiaqi'; //修改了bar.name
