// 原生方法
function insert(arr, x) {
  const idx = arr.findIndex(a => a > x);
  // 如果 idx 为-1，则表示所有元素都比x小
  arr.splice(idx === -1 ? arr.length : idx, 0, x)
  return arr
}

const arr = [2, 4, 7, 9, 13]; //原数组
const x = 8; // 需要被插入的元素
console.log(insert(arr, x));

