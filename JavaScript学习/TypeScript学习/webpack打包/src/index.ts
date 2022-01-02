import {hi} from './m1'

function sum(a: number, b: number): number{
  return a + b;
}

const name = { nameP: 'jaiqi' }
name.nameP ='halo'
console.log(name);
console.log(sum(3, 3));
console.log(hi);

Promise.resolve('你好啊 Promise').then(res => {
  console.log(res);
})