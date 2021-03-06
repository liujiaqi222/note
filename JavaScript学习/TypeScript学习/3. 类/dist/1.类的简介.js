"use strict";
// 使用class关键词定义一个类
Object.defineProperty(exports, "__esModule", { value: true });
// 直接定义的属性是实例属性，只有实例才能使用
// 使用static关键词定义的属性，只有类才能使用
class Person {
    constructor() {
        // 定义实例属性 实例化后的对象都会有这些属性
        this.name = '嘉琪';
        this.age = 23;
        // 只读属性
        this.hobby = 'coding';
    }
    // 定义实例方法
    sayHello() {
        console.log('hello 大家好');
    }
    // 定义类方法
    static eat() {
        console.log('I love food!');
    }
}
// 使用static定义类属性（静态属性），即不需要实例化就可以使用的属性，属于类的属性
Person.personName = 'jiaqicoder';
console.log(Person.personName); //jiaqicoder
const per = new Person();
per.name = 'tom';
console.log(new Person()); //{ name: '嘉琪', age: 23, hobby: 'coding' }
Person.eat();
new Person().sayHello();
exports.default = {};
