const name = 'jiaqicoder';

module.exports.name = name; 
console.log(module.exports.name,1);

setTimeout(() => {
    console.log(exports.name,3);
}, 1000);

