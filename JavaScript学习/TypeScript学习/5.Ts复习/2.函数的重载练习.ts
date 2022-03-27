// 联合类型
function getLength(args:string | any[]){
    return args.length;
}

// 函数重载
function getLength2(args:string):number;
function getLength2(args:any[]):number;

function getLength2(args:any):any{
    return args.length
}

// 如果通过联合类型能更加简单的实现函数功能的时候，应该使用联合类型


export {};

