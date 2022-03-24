// 函数的重载：函数名称相同，但是参数的个数或者类型不同

// 函数的定义
function add(num1: number, num2: number): number;
function add(num1: string, num2: string): string;

// 函数的实现
function add(num1: any, num2: any): any {
    return num1 + num2;
}

add(20,30);
add('1','3');

//add(12,'323'); //会报错，不符合上面任何一个重载函数的定义
// 只能根据函数定义的类型来调用


export {}