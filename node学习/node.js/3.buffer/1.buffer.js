// buffer是Nodejs全局对象上的一个类，是一个专门用于存储字节数据的类
// Nodejs提供了操作计算机底层的api，而计算机底层只能识别0和1
// 所以就提供了一个专门用于存储字节数据的类

import { Buffer } from "buffer";

// 1. 创建一个buffer对象
//Buffer.alloc(size[, fill[, encoding]])
let buf = Buffer.alloc(5,12)

// Note: 通过console.log()输出buffer，会自动将存储的内容转换为16进制再输出
console.log(buf) //<Buffer 0c 0c 0c 0c 0c>

// 2. 也可以根据数组或者字符串创建一个buffer对象
console.log(Buffer.from('abc')) //<Buffer 61 62 63> 转换成十进制就是97 98 99
console.log(Buffer.from([1,2,3])) //<Buffer 01 02 03>

// 3. buffer的本质是数组
console.dir(buf) //Buffer(5) [Uint8Array] [ 12, 12, 12, 12, 12 ]

// 因此可以像数组一样来修改buffer
buf[0] =1
console.log(buf) //<Buffer 01 0c 0c 0c 0c>




