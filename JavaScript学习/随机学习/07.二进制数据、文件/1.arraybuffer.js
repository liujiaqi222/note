// 创建一个长度为16的array buffer
let buffer = new ArrayBuffer(16);

const view = new Uint8Array(buffer);

console.log(view.length);