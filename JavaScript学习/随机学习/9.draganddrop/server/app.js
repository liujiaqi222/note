const express = require("express");
const fs = require('fs');


const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

let writeStream = fs.createWriteStream('./img.jpg');
app.post("/upload", (req, res) => {

  req.on("data", (data) => {
    // ... do your stuff here
    console.log(data);
    writeStream.write(data); 
  });
  writeStream.on("open", () => {
    console.log("表示数据流和文件建立关系成功");
  });
  writeStream.on("error", () => {
    console.log("表示数据流和文件建立关系失败");
  });
  writeStream.on("close", () => {
    console.log("表示数据流断开了和文件的关系");
  });
});

app.listen(3000, () => {
  console.log("running at http://localhost:3000");
});
