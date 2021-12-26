// [1,2,3, 5, 9, 10, 11, 12,] => [[1,3], [5], [9, 12]]

const arr = [2,  3, 5, 9, 10, 11, 12,28,32,33,34,35];
function sortT(arr) {
  const result = [];
  arr.forEach((item,index) => {
    if ((item - arr[index-1]) === 1) {
      if (result[result.length - 1].length >= 2) {
        result[result.length - 1].pop();
      }
      result[result.length - 1].push(item);


    } else {
      result.push([item]);
    }
  })
  return result;
}

console.log(sortT(arr));

console.log(1-void 0);