// 工厂模式
function createPerson(name, age, job) {
  const obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.job = job;
  return obj;
}

const person = createPerson('嘉琪', 22, 'noJob');





