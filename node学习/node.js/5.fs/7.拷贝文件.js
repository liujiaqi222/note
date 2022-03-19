const fs = require("fs");

// 创建一个读取流
let readStream = fs.createReadStream("./video.mp4");

// 创建一个写入流
let writeStream = fs.createWriteStream("./abc.mp4");

// 监听读取流的事件
readStream.on("open", () => {
  console.log("表示数据流和文件建立关系成功");
});

readStream.on("error", () => {
  console.log("表示数据流和文件建立关系失败");
});

readStream.on("data", (data) => {
  console.log("表示通过读取流从文件中读取到了数据");
  console.log(data);
  writeStream.write(data); 
});
readStream.on("close", () => {
  console.log("表示数据流断开了和文件的关系，并且数据已经读取完毕了");
  // 关闭写入流
  writeStream.end();
});

// 监听写入流的事件
writeStream.on("open", () => {
  console.log("表示数据流和文件建立关系成功");
});
writeStream.on("error", () => {
  console.log("表示数据流和文件建立关系失败");
});
writeStream.on("close", () => {
  console.log("表示数据流断开了和文件的关系");
});
