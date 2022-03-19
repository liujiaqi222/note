const fs = require("fs");

// 创建一个读取流
let readStream = fs.createReadStream("./abc.mp4");

// 创建一个写入流
let writeStream = fs.createWriteStream("./666.mp4");

// 实现文件的拷贝
readStream.pipe(writeStream);