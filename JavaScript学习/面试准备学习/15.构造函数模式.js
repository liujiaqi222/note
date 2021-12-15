// 构造函数模式
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = ()=>{
    console.log(this.name);
  }
}

const jiaqi = new Person('jiaqi', 22);
// console.log(jiaqi instanceof Person); //true
// console.log(jiaqi instanceof Object);
// console.log(jiaqi.constructor === Person); //true

jiaqi.sayName();
