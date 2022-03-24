// 二进制对象是 ArrayBuffer —— 对固定长度的连续内存空间的引用。
let buffer = new ArrayBuffer(16);
console.log(buffer.byteLength); //16

// 它会分配一个 16 字节的连续内存空间，并用 0 进行预填充。
console.log(buffer)
/* 
ArrayBuffer {
  [Uint8Contents]: <00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,    
  byteLength: 16
}
 */
// 将 buffer 视为一个 32 位整数的序列
let view = new Uint32Array(buffer);
console.log(Uint32Array.BYTES_PER_ELEMENT); // 每个整数 4 个字节
console.log(view.length);//4，它存储了4个整数
console.log(view.byteLength); //16 字节的大小

// 写入一个值
view[0] =323;

// 遍历view
for(let num of view){
    console.log(num); // 323 0 0 0 (总共四个值)
}

let arr8 = new Uint16Array(view);
console.log(arr8);