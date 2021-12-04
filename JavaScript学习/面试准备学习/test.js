let ob1 = Object.create({ x: 1, y: 2 });

console.log(ob1.__proto__);
console.log(Object.getPrototypeOf(ob1));

console.log(ob1.x + ob1.y);

let ob2 = Object.create(null);
console.log(ob2.__proto__);

let point = {
  x: 3,
  y: 4,
  valueOf() {
    return Math.hypot(this.x, this.y);
  }
}
console.log(Number(point));