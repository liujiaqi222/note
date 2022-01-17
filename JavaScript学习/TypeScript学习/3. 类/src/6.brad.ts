let info: [number, string][];
info = [
  [1, '嘉琪'],
  [2, '小王'],
  [3, '小黑']
]

let pid: number | string

pid = 20

pid = '22'

enum Directions {
  Up = 2,
  Down = 1, Left,
  Right,

}


type user = { name: string, id: number };

let user: user = {
  name: 'jiaqi',
  id: 23,
}

let hello: any = '嘉琪';
let p: string = <string>hello;

// 接收2个number类型的变量，且返回值也是number类型
function addNum(x: number, y: number): number {
  return x + y;
}


function log(msg: string | number) {
  console.log(msg);
}


interface UserInterface {
  readonly id: number,
  name: string,
  age?: 32,
}
const user1: UserInterface = { id: 1, name: 'jiaqi' }
// user1.id = 32;

interface MathFunc {
  (x:number,y:number):number
}

const add: MathFunc = (x: number, y: number): number => x + y;
const subtract: MathFunc = (x: number, y: number): number => x - y;

interface PersonInterface {
  id: number,
  name: string,
  register():string,
}

class Person implements PersonInterface{
  id: number;
  name: string;
  constructor(id:number,name:string) {
    this.id = id;
    this.name = name;
  }
  register(): string {
    return `${this.name} is registered`;
  }
}

const jiaqi2 = new Person(1, 'jiaqi')


class Employee extends Person {
  position: string
  constructor(id:number,name:string,position:string) {
    super(id, name);
    this.position = position;
  }
}

const emp = new Employee(3, 'jiaqi', 'developer');
console.log(emp.name);
console.log(emp.register());

// generics

function getArray<T>(items: T[]): T[]{
  return items;
}

const numArray = getArray<number>([1, 2, 3, 4]);
const strArray = getArray<string>(['jaiqi', 'string']);

export default { };