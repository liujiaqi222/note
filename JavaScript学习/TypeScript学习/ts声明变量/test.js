let num = 100;
let arr = [] // 结果数组
let i = 2;
while (i <= num && i * i <= num) { // 没有这个判断超时 i * i <= num
  if (num % i === 0) {
    arr.push(i)
    num /= i
    i = 2
  } else {
    i++
  }
}

if (num != 1) {
  arr.push(num)
}

console.log(arr);
console.log(180/4/9);