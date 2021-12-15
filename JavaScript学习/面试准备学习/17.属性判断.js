const obj1 = {
  happy:100
}

// 将obj1作为obj2的原型
const obj2 = Object.create(obj1);

// console.log(obj2.happy); //100 可以访问到原型的happy属性
// console.log(obj2.hasOwnProperty('happy')); //obj2 自身没有happy属性
// console.log(obj1.hasOwnProperty('happy')); //obj1拥有happy属性

console.log('happy' in obj2); //true

for (let i in obj2) {
  console.log(i); //happy
}

console.log(Object.keys(obj1));
console.log(Object.keys(obj2));

// 给obj2添加一个不可枚举的属性
Object.defineProperty(obj2, 'sad', {
  value: 0,
  enumerable:false
})

console.log(Object.keys(obj2)); // []
console.log(Object.getOwnPropertyNames(obj2)); //['sad'] 可以列举出属于对象的不可枚举属性

console.log(Object.getOwnPropertyDescriptor(obj2, 'sad'));

const obj3 = {
  name: 'jiaqi',
  age: 110,
  [Symbol('name')]:'jiaqicoder'
}

console.log(Object.getOwnPropertyNames(obj3)); //[ 'name', 'age' ]
console.log(Object.getOwnPropertySymbols(obj3)); //[ Symbol(name) ]

console.log(Object.keys(obj3)); //[ 'name', 'age' ]
for (let i in obj3) {
  console.log(i); //name , age
}

let obj4 = {
  name: 'jiaqi',
  age: 22,
  hobbies:{}
}

console.log(Object.keys(obj4)); //[ 'name', 'age', 'hobbies' ]
console.log(Object.values(obj4)); //[ 'jiaqi', 22, {} ]
console.log(Object.entries(obj4)); //[ [ 'name', 'jiaqi' ], [ 'age', 22 ], [ 'hobbies', {} ] ]

console.log(obj4.hobbies === Object.values(obj4)[2]);
console.log(obj4.hobbies === Object.entries(obj4)[2][1]);