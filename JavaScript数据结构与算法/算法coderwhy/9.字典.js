class Dictionary {
  constructor(toStrFn = defaultToString) {
    // table[key] = {key,value}
    this.table = {};
    this.toStrFn = toStrFn;
  }
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      // 我们将key转换成了字符串，而为了保存信息的需要，我们同样要保存原始的key。
      this.table[tableKey] = new valuePair(key, value);
    }
    return this;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  hasKey(key) {
    return this.table[this.toStrFn(key)] !== null;
  }
  get(key) {
    const valuePair = this.table[this.toStrFn[key]];
    return valuePair == null ? undefined : valuePair.value;
  }
  clear() {}
  isEmpty() {}
  keys() {
    return this.keyValues().map((item) => item.key);
  }
  values() {
    return this.keyValues().map((item) => item.value);
  }

  keyValues() {
    return Object.values(this.table);
  }

  forEach(callbackFn){
    const valuePairs = this.keyValues();
    for(let i=0;i<valuePairs.length;i++){
      const result = callbackFn(valuePairs[i].key,valuePairs[i].value);
      if(result === false){
        break;
      }
    }
  }
  get size(){
    return this.keyValues().length;
  }
  isEmpty(){
    return this.size === 0;
  }
  clear(){
    this.table = {}
  }

  toString(){
    if(this.isEmpty()) return '';
    const valuePairs = this.keyValues();
    let str = valuePairs[0].toString();
    for(let i=1;i<valuePairs.length;i++){
      str = `${str}, ${valuePairs[i].toString()}`;
    }
    return str;
  }

}

class valuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[${this.key}:${this.value}]`;
  }
}

function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEIFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}


const dic = new Dictionary();
dic.set(1,'hi');
dic.set(2,'die');

console.log(dic.hasKey(1))
console.log(dic.size)
console.log(dic.remove(1))
console.log(dic.keyValues())
