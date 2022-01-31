const name = 'jiaqicoder';

module.exports.name = name; 
console.log(module.exports.name,1); //jiaqicoder

setTimeout(() => {
    console.log(exports.name,3); // jiaqi
}, 1000);

