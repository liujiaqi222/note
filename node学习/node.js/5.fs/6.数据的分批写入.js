const fs = require("fs");

// 创建一个写入流
let writeStream = fs.createWriteStream("hello.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});


