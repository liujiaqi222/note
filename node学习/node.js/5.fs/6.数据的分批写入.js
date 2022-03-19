const fs = require("fs");

// 注意：写入流写入完成后，需要手动断开连接

// 创建一个写入流
let writeStream = fs.createWriteStream("hello.txt", {
  encoding: "utf-8",
});

writeStream.on('open',()=>{
    console.log('表示数据流和文件建立关系成功')
})
writeStream.on('error',()=>{
    console.log('表示数据流和文件建立关系失败')
})
writeStream.on('close',()=>{
    console.log('表示数据流断开了和文件的关系')
})

let data = '今天天气真好，深圳好热';
let index = 0;
let timerId = setInterval(()=>{
    writeStream.write(data[index]);
    index++;

    if(index === data.length){
        clearInterval(timerId);
        writeStream.end()
    }
},1000);

