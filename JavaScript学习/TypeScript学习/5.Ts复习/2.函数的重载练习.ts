function getLength(args:string | any[]){
    return args.length;
}

console.log(getLength('abc'));
console.log(getLength([1,2,3,4,4]));

export {};

