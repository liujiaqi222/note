console.log(process.argv[2]);

console.clear();

function foo(){
    bar();
}
function bar(){
    console.trace();
}
foo();