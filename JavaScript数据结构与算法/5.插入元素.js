function insert(arr, x) {
  // p指向下一个需要比较的元素
  // p+1指向空位
  let p = arr.length - 1;
  while (p >= 0 && arr[p] > x) {
    arr[p + 1] = arr[p];
    p--;
  }
  arr[p + 1] = x;
  return arr;
}

const arr = [2, 4, 7, 9, 13]; //原数组
const x = 8; //需要插入的元素
console.log(insert(arr,8));
