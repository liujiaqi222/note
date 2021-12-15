// 一枚硬币随机抛掷一万次，正面的概率应该是 0.5

// 一个长度为4的数组，随机打乱后，第一位仍然处于第一位的概率是0.25
const arr = [1, 2, 3, 4];

function Testrandom(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

console.time('用时');
let t = 0;
for (let i = 0; i <= 10000; i++){
  let arrTest = [...arr];
  let result = Testrandom(arrTest)[0];
  if (result === 1) {
    t++;
  }
}

console.log(t / 10000);
console.timeEnd('用时');
// 差不多是0.25，也就是答案是正确的

