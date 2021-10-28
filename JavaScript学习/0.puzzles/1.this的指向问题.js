const jiaqi = {
    age: 22,
    gender:'female'
}

jiaqi.aging = function () {
    console.log(this); //(1)
    return {
        current: this.age, //(2)
        next() {
            return ++this.current; //(3)
        }
    }
}

console.log(jiaqi.aging().next()); //(4)


// ===========================
//根据4处的调用，请问1,2,3处的this分别指向什么？
// 1和2的this指向jiaqi
// 3处的this指向aging函数返回的对象，因此这里使用了current来保存jiaqi的age

// 这里很容易混淆的地方在于2和3的this的指向竟然不是一个！
// 但是聪明的你，看到4处是如何调用的就应该知道为什么
// aging函数的调用对象是jiaqi，故1和2中的this指向jiaqi
// 而next的调用为jiaqi.age()返回的对象，故3中的this便指向aging返回的对象了

