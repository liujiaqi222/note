function reduce(arr, fn, initialValue) {
  let result = initialValue;
  for (let i = 0; i < arr.length; i++) {
    if (result === undefined && i === 0) {
      result = arr[i];
      continue; // 太妙了
    }
    result = fn(result, arr[i], i, arr);
  }
  return result;
}



const arr = [1, undefined, 3, 4];

arr.reduce((acc, cur, index) => {
  console.log(acc, cur, index);
  return acc+cur
})
