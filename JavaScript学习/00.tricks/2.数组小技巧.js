console.log(new Array(7)); //生成含有7个空元素的数组

// 给数组中填充7个5
console.log(new Array(7).fill(5)); //[5,5,5,5,5,5,5]

const arr = ['hello', 'world', 'word', 'word', 'excel', 'excel'];
const unique = Array.from(new Set(arr));
console.log(unique); //[ 'hello', 'world', 'word', 'excel' ]

const unique2 = [...new Set(arr)]; //[ 'hello', 'world', 'word', 'excel' ]


const nums = [1, 2, 3, 4, 5, 6];
nums.length = 3;
console.log(nums);  //[1,2,3]


const numbers = [1, 2, 3, 4, 5, 6, 7];
console.log(numbers.slice(1,3)); //[ 2, 3 ]
console.log(numbers.slice(-1)); //[7] 
console.log(numbers.slice(-3)); //[ 4, 5, 6 ]