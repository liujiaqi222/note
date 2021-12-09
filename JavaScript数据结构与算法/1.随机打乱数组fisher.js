// fisher_yates_shuffle

let arr = [1, 2, 3, 4];

function fisher_yates_shuffle(arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++){
    const j = i + Math.floor(Math.random() * (length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

console.time('用时');
let t = 0;
for (let i = 0; i <= 10000000; i++){
  let result = fisher_yates_shuffle(arr)[0];
  if (result === 1) {
    t++;
  }
}

console.log(t / 10000000);
console.timeEnd('用时');
// 差不多是0.25，也就是答案是正确的
