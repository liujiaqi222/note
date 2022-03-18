const fs = require('fs');
const path = require('path');

let pathStr = path.join(__dirname,'data.txt');
fs.readFile(pathStr,(err,data)=>{
    // 读到的数据是buffer，通过toString将其转换为字符串
    console.log(data.toString())
})

// 如果第二个参数传递了utf8，就不用上面那么麻烦了
fs.readFile(pathStr, 'utf8',(err, data) => {
  console.log(data);
});