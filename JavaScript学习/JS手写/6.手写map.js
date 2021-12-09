function map(arr, fn) {
  // 结果是一个新的数组
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

const arr = [1, 2, 3, 4, 5];
console.log(map(arr, (item) => {
  return item * 10;
}));