function bsearch(arr, x) {
  let l = 0, //查找范围左边界
    r = arr.length - 1,//查找范围右边界
    guess;  //参测位置
  while (l <= r) {
    guess = Math.floor((l + r) / 2);
    // 循环不变式
    // guess 为于 1,r 的中间位置
    // l：查找范围的左 r：查找范围的右侧
    if (x === arr[guess]) return guess;
    // 待查找的x比中间数小 则猜测右边缘位置向左移动
    else if (arr[guess] > x) {
      r = guess - 1;
    }
    else {
      // x比中间数大，猜测的左边缘向右移动
      l = guess + 1;
    }
  }
  return -1;
}

let arr = [1, 2, 3, 5, 10, 22, 33, 67];
console.log(bsearch(arr, 2));