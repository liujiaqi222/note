// 前面的读取和写入都是一次性进行的，一次性将数据读取到内存中或者一次性写入到文件中
// 但是如果数据比较大，直接将所有数据都读到内存中会导致计算机内存溢出
// 所以对于较大的文件应该分批读取和写入

const fs = require("fs");

// fs.createReadStream(path[, options])

let readStream = fs.createReadStream("./data.txt", {
  encoding: "utf-8",
  highWaterMark: 2000,
});

readStream.on("open", () => {
  console.log("表示数据流和文件建立关系成功");
});

readStream.on("error", () => {
  console.log("表示数据流和文件建立关系失败");
});

readStream.on("data", (data) => {
  console.log("表示通过读取流从文件中读取到了数据");
  console.log(data);
});
readStream.on("close", () => {
  console.log("表示数据流断开了和文件的关系，并且数据已经读取完毕了");
});
