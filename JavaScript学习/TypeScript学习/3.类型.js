"use strict";
exports.__esModule = true;
// Object 表示对象
var a; //用处不大
// 一般设置对象的属性
// {} 用来指定对象中可以包含哪些属性
// 语法：{属性名:属性类型}
var b;
b = { name: '嘉琪coder' };
var c;
c = { name: 'jiaqi', a: 1, b: 'hello' };
// 设置函数的结构类型声明
var d;
d = function (n1, n2) {
    return n1 + n2;
};
// string[]表示字符串数组
var e;
e = ['a', 'b'];
var f;
var g;
// 元组是固定长度的数组
var h;
h = [1, 2]; //固定长度，只能是2个元素
// 枚举
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
var i;
i = {
    name: 'jiaqi',
    gender: Gender.Female
};
console.log(i.gender === Gender.Female);
// &表示同时
// j要有name和age两个属性
var j;
j = { name: 'jiaqi', age: 12 };
// k的值是1~5中的一个
var k;
var p;
p = 1;
