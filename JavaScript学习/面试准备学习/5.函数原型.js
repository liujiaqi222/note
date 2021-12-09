// Function.prototype.defer = function (ms) {
//   console.log(this);
//   setTimeout(this, ms);
// };

// function a() {
//   console.log('hello');
// }



// a.defer(1000)

Function.prototype.defer = function (ms) {
  return (...args) => {
    setTimeout(() => {
      this(...args);
    }, ms);
  }
}

function a(a,b) {
  console.log(a+b);
}


a.defer(1000)(1,2)