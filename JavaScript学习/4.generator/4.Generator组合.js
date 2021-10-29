// Generator 组合（composition）是 generator 的一个特殊功能。
// 它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。

function* generateSequence(start, end) {
    for (let i = start; i < end; i++){
        yield i;
    }
}

// 现在，我们想重用它来生成一个更复杂的序列：
// 首先是数字 0..9（字符代码为 48…57），
// 接下来是大写字母 A..Z（字符代码为 65…90）
// 接下来是小写字母 a...z（字符代码为 97…122）

// 在常规函数中，要合并其他多个函数的结果，我们需要调用它们，存储它们的结果，最后再将它们合并到一起。

// 对于 generator 而言，我们可以使用 yield* 这个特殊的语法来将一个 generator “嵌入”（组合）到另一个 generator 中：

function* generatePassword() {
    // 0...9
    //  yield* 这个特殊的语法来将一个 generator “嵌入”（组合）到另一个 generator 中
    yield* generateSequence(48, 57);

    // A...Z
    yield* generateSequence(65, 90);
    
    // a...z
    yield* generateSequence(97,122);
}

const generator = generatePassword();

// 遍历generator对象
// for (let code of generator) {
//     console.log(code);
// }

let str = '';
for (let code of generator) {
    // 使用String.fromCharCode()生成字符码对应的字符
    str += String.fromCharCode(code) + ' ';
}

console.log(str);
// 0 1 2 3 4 5 6 7 8 A B C D E F G H I J K L M N O P Q R S T U V W X Y a b c d e f g h i j k l m n o p q r s t u v w x y

// 不得不说，非常厉害，wtf！

// 请记住这句话 
// Generator 组合（composition）是将一个generator流插入到另外一个generator流的自然方法，它不需要一个额外的内存来存储中间的结果


