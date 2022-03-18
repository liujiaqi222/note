const fs = require("fs");

// 获取文件的信息 异步
fs.stat(__filename, (err, stats) => {
  //   判断是文件还是文件夹
  if (stats.isFile()) {
    console.log("当前路径对应的是文件");
  }
});

// 同步
console.log(fs.statSync(__filename));