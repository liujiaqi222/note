function* generator() {
    yield 1;
    yield 2
    yield 3;
}


const obj = generator();

console.log([...obj]);
for (let value of obj) {
    console.log(value);
}