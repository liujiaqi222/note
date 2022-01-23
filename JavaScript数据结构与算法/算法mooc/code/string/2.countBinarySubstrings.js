let s =  "00110011"
function countingBinaryStr(s) {
  let index = 0, n = s.length;
  const counts = []; //记录字符出现的次数
  while (index < n) {
    let count = 0; 
    // 获取当前的字符
    const char = s.charAt(index);
    // 当字符与此时比较的字符相同时，index+1，count也加1
    // 这里至少能够进入下面的while循环一次，因为当前的字符和自己相同
    while (index<n &&  char === s.charAt(index)) {
      index++;
      count++;
    }
    counts.push(count);
  }
  let result = 0;
  for (let i = 0; i < counts.length - 1; i++){
    // 取不同字符出现次数的最小值
    result += Math.min(counts[i],counts[i+1])
  }
  return result;
}

