// fs.writeFile(file, data[, options], callback)
const fs = require('fs');
const path = require('path');

let str= path.join(__dirname,'data.txt');

// 如果文件不存在，则node会帮我创建这个文件
fs.writeFile(str,'hahha','utf8',(err)=>{
    if(err) throw new Error(err);
    console.log('写入数据成功');
})


// 写入buffer 
let buf = Buffer.from('刘嘉55琪');
// 然后我发现写入是字符串
fs.writeFile('./hello.txt',buf, console.log);