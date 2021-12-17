// Object 表示对象
let a: object; //用处不大

// 一般设置对象的属性
// {} 用来指定对象中可以包含哪些属性
// 语法：{属性名:属性类型}
let b: { name: string,age?:Number };
b = { name: '嘉琪coder'};

let c: {name: string,[propName:string]:any};
c = { name: 'jiaqi', a: 1, b: 'hello' }

// 设置函数的结构类型声明
let d: (a: number, b: number) => number;
d = (n1:number, n2:number) =>{
  return n1+ n2;
}

// string[]表示字符串数组
let e: string[];
e = ['a', 'b'];
let f: number[];

let g: Array<number>;


// 元组是固定长度的数组
let h: [number, number];
h = [1, 2];//固定长度，只能是2个元素

// 枚举
enum Gender{
  Male,Female
}

let i: { name: string, gender: Gender }
i = {
  name: 'jiaqi',
  gender:Gender.Female,
}

console.log(i.gender === Gender.Female);

// &表示同时
// j要有name和age两个属性
let j: { name: string } & { age: number };
j = {name:'jiaqi',age:12}

// k的值是1~5中的一个
let k: 1 | 2 | 3 | 4 | 5;
// 与此同时p的取值也和k一样，因此可以给类型起个别名

type myType = 1 | 2 | 3 | 4 | 5;

let p: myType;
p = 1;
export { };