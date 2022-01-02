// 使用class关键词定义一个类

// 直接定义的属性是实例属性，只有实例才能使用
// 使用static关键词定义的属性，只有类才能使用
class Person {
  // 定义实例属性 实例化后的对象都会有这些属性
  name: string = '嘉琪';
  age: number = 23;
  // 使用static定义类属性（静态属性），即不需要实例化就可以使用的属性，属于类的属性
  static personName: string = 'jiaqicoder';
  // 只读属性
  readonly hobby: string = 'coding';
  // 定义实例方法
  sayHello() {
    console.log('hello 大家好');
  }
  // 定义类方法
  static eat() {
    console.log('I love food!');
  }
}

console.log(Person.personName); //jiaqicoder

const per = new Person();
per.name = 'tom';
console.log(new Person()); //{ name: '嘉琪', age: 23, hobby: 'coding' }

Person.eat();
new Person().sayHello();