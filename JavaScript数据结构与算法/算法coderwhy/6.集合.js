// 集合是由一组无序且唯一（即不能重复）的项组成的。
class Set{
    constructor(){
        this.items = {};
    }
    add(element){
        if(!this.has(element)){
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false;
    }
    has(element){
        // 没有使用this.items.hasOwnProperty(elment)
        // 因为不是所有对象都继承自Object.prototype
        // 而且即使继承了，也可能会被覆盖
        return Object.prototype.hasOwnProperty.call(this.items,element);
    }
    clear(){
        this.items = {}
    }
    get size(){
        return Object.keys(this.items).length;
    }
    values(){
        return Object.values(this.items);
    }
}

const set  = new Set();
set.add(1);
console.log(set.has(1))
set.add(3);
console.log(set.size)
set.delete(1);

console.log(set)

