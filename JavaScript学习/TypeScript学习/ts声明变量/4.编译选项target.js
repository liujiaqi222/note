async function getStuff(url) {
    const res = await fetch(url);
    const result = await res.json();
    // 获取到结果后，然后再导入模块
    const hi = await import('./5.模块化');
    console.log(hi);
    return result;
}
let url = 'https://api.wmdb.tv/api/v1/top?skip=0&limit=10';
console.log(getStuff(url));
export default getStuff;
