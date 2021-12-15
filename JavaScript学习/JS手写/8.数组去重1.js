const arr = [1, 2, 2, 3, 3, 5, 5];

function unique(arr) {
  const result = [];
  // 遍历数组
  arr.forEach(item => {
    if (!result.includes(item)) {
      result.push(item);
    }
  })
  return result
}

console.log(unique(arr));