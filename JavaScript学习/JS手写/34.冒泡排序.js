const arr = [12, 33, 23, 83, 25, 1, 18, 14];

// function sort(arr) {
//   const length = arr.length;
//   for (let i = 0; i < length - 1; i++) {
//     for (let j = 0; j < length-i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }
//   return arr
// }

// 优化版
function sort(arr) {
  const length = arr.length;
  for (let i = 0; i < length-1; i++){
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++){
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (!flag) {
      break;
    }
  }
  return arr
}


console.log(sort(arr));