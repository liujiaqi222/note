// function SuperType() {
//   this.colors = ['red', 'blue', 'green'];
// }

// function SubType() {
//    //继承superType
//   SuperType.call(this);
// }

// let obj1 = new SuperType();
// obj1.colors.push('black');
// console.log(obj1.colors); //[ 'red', 'blue', 'green', 'black' ]


// let obj2 = new SubType();
// console.log(obj2.colors); //[ 'red', 'blue', 'green' ]


function Person(name) {
  this.name = name;
}

function PersonInfo(name,age) {
  // 继承父类并传参
  Person.call(this, name);
  this.age = age;
}

const jiaqi = new PersonInfo('jiaqi', 22);
console.log(jiaqi.age,jiaqi.name); //22 jiaqi