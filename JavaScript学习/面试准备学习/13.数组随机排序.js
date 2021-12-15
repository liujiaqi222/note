const arr = [1, 25,22, 43, 31, 13,19,26];

// 法一：
//  缺点：每个元素被派到新数组的位置不是随机的，原因是 sort() 方法是依次比较的。

function shuffle1(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 法二：
//Fisher and Yates
function shuffle2(arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++){
    let randomI = Math.floor(Math.random() * (length - i)) + i;
    [arr[i], arr[randomI]] = [arr[randomI],arr[i]];
  }
  return arr;
}

// 法三：
// 随机从原数组抽取一个元素，加入到新数组
function shuffle3(arr) {
  const result = [];
  while (arr.length) {
    const index = Math.floor(Math.random() * arr.length);
    result.push(arr[index]);
    arr.splice(index,1);
  }
  return result;
}




function shuffleTest(fn, arr) {
  console.time('用时');
  // 调用函数 10000000 次，判断arr的第一位是否是第一位
  let count = 0;
  for (let i = 0; i < 10000000; i++){
    const arrTest = [...arr];
    const arrResult = fn(arrTest);
    if (arrResult[0] === 1) {
      count++;
    }
  }
  console.log(count / 10000000);
  console.timeEnd('用时')
}


shuffleTest(shuffle1, arr); //一点也不准，期望结果为0.125
shuffleTest(shuffle2, arr); 
shuffleTest(shuffle3, arr); 

// 0.2215048
// 用时: 5.146s
// 0.1250291
// 用时: 1.051s
// 0.1250722
// 用时: 3.887s






