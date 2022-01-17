"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class Person{
//   name: string;
//   private age: number;
//   constructor(name:string,age:number) {
//     this.name = name;
//     this.age = age;
//   }
//   getAge() {
//     return this.age;
//   }
//   setAge(age:number) {
//     this.age = age;
//   }
// }
// class Person {
//   name: string;
//   _age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this._age = age;
//   }
//   get age() {
//     return this._age;
//   }
//   set age(age: number) {
//     if (age > 0) {
//       this._age = age;
//     }
//   }
// }
// const jiaqi = new Person('jiaqi', 22);
// console.log(jiaqi.age); //22
// class A {
//   protected num: number;
//   constructor(num: number) {
//     this.num = num;
//   }
// }
// class B extends A {
//   // 可以在子类中访问的protected修饰的属性
//   test() {
//     console.log(this.num);
//   }
// }
// const b = new B(22);
// // 但是不能在实例中访问
// console.log(b.num);
class C {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
//就相当于
class D {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
