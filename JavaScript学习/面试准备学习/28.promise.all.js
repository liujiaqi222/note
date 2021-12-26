// Promise.all([
//   new Promise(resolve => setTimeout(() => resolve(1),1000)),
//   new Promise(resolve => setTimeout(() => resolve(5),500)),
//   new Promise(resolve => setTimeout(() => resolve(3),100)),
// ]).then(res => {
//   console.log(res);
// })
// Promise.all([
//   new Promise(resolve => setTimeout(() => resolve(1),1000)),
//   new Promise((resolve,reject) => setTimeout(() => reject(5),500)),
//   new Promise(resolve => setTimeout(() => resolve(3),100)),
// ]).catch(err => {
//   console.log(err);
// })
Promise.allSettled([
  new Promise(resolve => setTimeout(() => resolve(1),1000)),
  new Promise((resolve,reject) => setTimeout(() => reject(5),500)),
  new Promise(resolve => setTimeout(() => resolve(3),100)),
]).then(res => {
  console.log(res);
})