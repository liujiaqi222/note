let user = {
  name: 'John',
  money: 1000,
  
  // hint 为string
  toString(){
    return `name:${this.name}`
  },
  // hint 为 number 或者 default
  valueOf(){
    return `money:${this.money}`;
  }
 }