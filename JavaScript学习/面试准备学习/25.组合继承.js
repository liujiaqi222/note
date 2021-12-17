function Animal(type) {
  this.type = type;
  this.actions = ['eat', 'move'];
}

Animal.prototype.printType = function () {
  console.log(this.type);
}

function People(name, age) {
  // 继承属性
  Animal.call(this, '人类');
  this.name = name;
  this.age = age;
}

// 继承方法
People.prototype = new Animal();

People.prototype.sayHi = function () {
  console.log(`Hi, my name is ${this.name}, I'm ${this.age}.`);
}


const dog = new Animal('🐶');
dog.actions.push('bark');
console.log(dog.actions); //['eat', 'move','bark']

const jiaqi = new People('嘉琪', 99);
jiaqi.sayHi(); //Hi, my name is 嘉琪, I'm 99.
jiaqi.printType(); //人类
jiaqi.actions.push('sleep');
console.log(jiaqi.actions); //[ 'eat', 'move', 'sleep' ]
