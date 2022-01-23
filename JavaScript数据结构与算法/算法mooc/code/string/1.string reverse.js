let str = "Let's take LeetCode contest";

function reverseWords(str) {
  return str.split(' ').map(item => {
    return [...item].reverse().join('');
  }).join(' ');
}

console.log(reverseWords(str));

module.exports = reverseWords;