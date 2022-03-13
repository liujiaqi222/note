var longestPalindrome = function (s) {
  const n = s.length;
  if (n < 2) return s;
  let begin = 0;
  let maxLength = 0;
  //初始化dp
  let dp = Array.from(Array(n).fill(false), () => Array(n).fill(false));
  // 对角线的元素一定是true 即 i===j
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }
  //在s[i]===s[j]下 dp[i][j]参考dp[i+1][j-1]的值
  // i+1是i的下侧，j-1是j的左侧，即dp[i][j]参考左下角的元素
  //因此遍历的时候先列后行
  for (let j = 1; j < n; j++) {
    //由于对角线已经赋值了，所以此处是i<j
    for (let i = 0; i < j; i++) {
      if (s[i] === s[j]) {
        if (j - i < 3) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      }
      //因为前面初始化数组时，已经填了false
      //因此当s[i]!==s[j] dp[i][j]默认就是false

      //如果dp[i][j]为真，且子串的长度大于当前最大的子串长度
      if (dp[i][j] && j - i + 1 > maxLength) {
        begin = i;
        maxLength = j - i + 1;
      }
    }
  }
  return s.slice(begin, begin + maxLength);
};

console.log(longestPalindrome("ac"));