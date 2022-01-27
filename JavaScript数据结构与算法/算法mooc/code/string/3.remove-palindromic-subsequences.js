var removePalindromeSub = function(s) {
  let index = 0,length=s.length,lastIndex=0;
  let count=0;
  while(index<length){
      while(s.slice(lastIndex,index+1)=== s.slice(lastIndex,index+1).split('').reverse().join('')){
          index++;
      }
      count++;
      lastIndex = index;
  }
  return count;
};

console.log(removePalindromeSub('abba'));