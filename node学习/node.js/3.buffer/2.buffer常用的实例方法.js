// 1. 将二进制数据转换成字符串
let buf = Buffer.from([97,98,99]);
console.log(buf.toString()); //abc
console.log(buf.toString('hex')); // '616263'
console.log(buf.toString('base64')); // 'YWJj'

// 2. 往buffer中写入数据
// buf.write(string[, offset[,length[,encoding]])
buf = Buffer.alloc(5);
let len = buf.write('abcdefg'); //len为5
console.log(buf,buf.toString()); //<Buffer 61 62 63 64 65>  abcde
//只会保留前5位，因为只分配了5位的空间


// 3.从指定位置截取新的buffer
// buf.slice([start[, end]])
buf = Buffer.from('abcde');
console.log(buf);//<Buffer 61 62 63 64 65>
console.log(buf.slice(2,4)); //<Buffer 63 64> 

