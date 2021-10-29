// 在 JavaScript 中，我们可以使用 Math.random()。
// 但是如果什么地方出现了问题，我们希望能使用完全相同的数据进行重复测试。

// 为此，我们可以使用所谓的“种子伪随机（seeded pseudo-random）generator”。
// 它们将“种子（seed）”作为第一个值，然后使用公式生成下一个值。
// 以便相同的种子（seed）可以产出（yield）相同的序列，因此整个数据流很容易复现。
// 我们只需要记住种子并重复它即可。


// 这样的公式的一个示例如下，它可以生成一些均匀分布的值：
// next = previous * 16807 % 2147483647


function* pseudoRandom(seed) {
    let next =seed
    while (true) {
        next = next* 16807 % 2147483647;
        yield next;
    }
}

const g = pseudoRandom(1);

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());fdsf