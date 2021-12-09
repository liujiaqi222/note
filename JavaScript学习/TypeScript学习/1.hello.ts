// 声明一个变量a，并且指定它的类型为 number
let a: number;

// a的类型设置为了number，在以后的使用过程中a只能是数字类型了

a = 19;

let b: string;

// 声明变量后直接赋值
let c: boolean = true;

//JS 函数不考虑参数的类型和个数
// 有了ts就可以限制类型和个数了
// 指定返回值类型为number
function sum(a:number, b:number):number {
  return a + b;
}
// 上面的写法太啰嗦了，typescript有类型推断机制
// 它可以根据变量赋的值自动给变量设置一个类型

let d = true; //d 之后只能是布尔值了


sum(12,12)

export { };