"use strict";
let info;
info = [
    [1, '嘉琪'],
    [2, '小王'],
    [3, '小黑']
];
let pid;
pid = 20;
pid = '22';
var Directions;
(function (Directions) {
    Directions[Directions["Up"] = 2] = "Up";
    Directions[Directions["Down"] = 1] = "Down";
    Directions[Directions["Left"] = 2] = "Left";
    Directions[Directions["Right"] = 3] = "Right";
})(Directions || (Directions = {}));
let user = {
    name: 'jiaqi',
    id: 23,
};
let hello = '嘉琪';
let p = hello;
// 接收2个number类型的变量，且返回值也是number类型
function addNum(x, y) {
    return x + y;
}
function log(msg) {
    console.log(msg);
}
const user1 = { id: 1, name: 'jiaqi' };
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is registered`;
    }
}
const jiaqi2 = new Person(1, 'jiaqi');
class Employee extends Person {
    constructor(id, name, position) {
        super(id, name);
        this.position = position;
    }
}
const emp = new Employee(3, 'jiaqi', 'developer');
console.log(emp.name);
console.log(emp.register());
// generics
function getArray(items) {
    return items;
}
const numArray = getArray([1, 2, 3, 4]);
const strArray = getArray(['jaiqi', 'string']);
