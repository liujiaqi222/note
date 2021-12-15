function Person() {
}

Person.prototype.name = 'jiaqi';
Person.prototype.age = 22;
Person.prototype.sayName = function () {
  console.log(this.name);
}

let person1 = new Person();
let person2 = new Person();

console.log(person1.sayName === person2.sayName);

console.log(person1);

for (let i in person1) {
  console.log(i);
}




