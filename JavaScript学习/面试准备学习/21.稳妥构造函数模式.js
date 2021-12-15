function Person(name, age, job) {
  const obj = new Object();
  obj.sayName = function () {
    console.log(name);
  }
  return obj
}

const jiaqi =  Person('jiaqi', 22, 'nojob');
jiaqi.sayName();