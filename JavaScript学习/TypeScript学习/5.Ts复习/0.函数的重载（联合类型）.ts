/** 
 * 缺点：①需要进行多次条件判断
 *      ②函数的返回值类型依旧不确定
 *
* */

function add(num1: string | number, num2: string | number) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    } else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + num2;
    }
}

export {}