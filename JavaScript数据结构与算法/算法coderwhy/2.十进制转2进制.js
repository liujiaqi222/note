const Stack = require('./1.实现栈.js');

function dec2bin(decNumber) {
  const stack = new Stack;
  // 当十进制不等于0的时候
  while (decNumber) {
    // 把余数推进栈中
    stack.push(decNumber % 2);
    decNumber = parseInt(decNumber / 2);
  }
  // 从栈出打印出结果
  console.log(stack.toString().split(' ').join(''));
}

dec2bin(100);