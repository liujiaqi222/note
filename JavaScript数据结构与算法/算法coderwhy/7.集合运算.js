// 并集：包含2个集合所有元素的新集合
// 交集：返回1个包含2个集合所共用元素的新集合
// 差集：返回一个存在第一个但不存在第2个集合的元素的新集合
// 子集：验证一个给定集合是否是另外一个集合的子集

class Set {
  constructor() {
    this.items = {};
  }
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
    }
    return this;
  }
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  has(element) {
    // 没有使用this.items.hasOwnProperty(elment)
    // 因为不是所有对象都继承自Object.prototype
    // 而且即使继承了，也可能会被覆盖
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  clear() {
    this.items = {};
  }
  get size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.values(this.items);
  }
  //   A∪B
  union(otherSet) {
    //创建一个并集set
    const unionSet = new Set();
    this.values().forEach((item) => unionSet.add(item));
    otherSet.values().forEach((item) => unionSet.add(item));
    return unionSet;
  }
  //   A∩B
  interSection(otherSet) {
    const interSectionSet = new Set();
    const values = this.values();
    values.forEach((item) => {
      if (otherSet.has(item)) {
        interSectionSet.add(item);
      }
    });
    return interSectionSet;
  }
  //   A-B
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach((item) => {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    });
    return differenceSet;
  }
  //   A⊆B
  isSubsetof(otherSet) {
    if (this.size > otherSet.size) return false;
    return this.values().every((item) => otherSet.has(item));
  }
}

const set = new Set();
set.add(2);
console.log(set);

const setB = new Set();
setB.add(3).add(4).add(6).add(2);
console.log(setB);

console.log(set.interSection(setB));
console.log(set.union(setB));
console.log(set.difference(setB));
console.log(set.isSubsetof(setB))
