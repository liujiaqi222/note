
function unique2(arr) {
  const result = [];
  // 声明空对象
  const obj = {};
  arr.forEach(item => {
    if (!obj[item]) {
      obj[item] = true;
      result.push(item);
    }
  })
  return result;
}

let arr = [4, 3, 3, 2, 3, 21, 1, 3];

console.log(unique2(arr));