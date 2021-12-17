// function object(o) {
//   function F() { };
//   F.prototype = o;
//   return new F();
// }

let jiaqi = {
  name: 'jiaqi',
  hobbies:['coding','reading']
}

// let anotherPerson = object(jiaqi);
// anotherPerson.name = 'Jack';
// anotherPerson.hobbies.push('singing');
// console.log(anotherPerson.hobbies); //[ 'coding', 'reading', 'singing' ]
// console.log(anotherPerson.name); //Jack
// console.log(jiaqi.hobbies); //[ 'coding', 'reading', 'singing' ]

// const anotherPerson = Object.create(jiaqi);
// anotherPerson.name = 'Jack';
// anotherPerson.hobbies.push('singing');
// console.log(anotherPerson.hobbies); //[ 'coding', 'reading', 'singing' ]
// console.log(anotherPerson.name); //Jack
// console.log(jiaqi.hobbies); //[ 'coding', 'reading', 'singing' ]

const anotherPerson = Object.create(jiaqi, {
  name: {
    value:'Jack'
  },
  age: {
    value: 33,
    writable: true,
    enumerable: true,
    configurable:true,
  }
})
console.log(anotherPerson); // {age:33}

