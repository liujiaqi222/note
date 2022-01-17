// 也可以直接使用字面量进行类型声明
var p; //表示p的类型是10
p = 10;
// p = 11; //p的类型是10，不能再对它进行修改了
// 可以使用 | 来连接多个类型
var b;
// 此时b可以赋值male或者female
b = 'male';
var c;
c = 'hello';
c = true;
// // any表示任意类型
// let d: any; //显示声明any类型
// d = true;
// let s: string = d; //把布尔值赋值给string类型的变量竟然没有报错
// let m: unknown = 'hello';
// let s: string;
// if (typeof m === 'string') {
//   s = m;
// }
var m;
m = 'hello';
// 类型断言
var s;
s = m; //写法一
s = m; //写法二
// void用来表示为空，以函数为例，表示没有返回值或者返回null或者undefined。
function fn() {
    return null;
}
// never 表示永远不会返回结果
// 因为只要一调用就会报错，所以永远都不会有返回结果
function fn2() {
    throw new Error('报错了！');
}
