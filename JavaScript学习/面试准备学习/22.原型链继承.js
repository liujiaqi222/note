function Animal() {
  this.eat = true;
  this.colors = ['red', 'blue', 'pink'];
}

Animal.prototype.getAnimalProp = function () {
  return this.eat;
}

function Person() {
  this.talk = true;
}

// 继承Animal
// Person函数的原型指向 Animal的实例对象
Person.prototype = new Animal();

const jiaqi = new Person();
jiaqi.eat = false;
console.log(jiaqi.eat);
console.log(new Animal().eat);
console.log(jiaqi.colors);

