import path from "path";

// 1. path.parse(path);
//用于将路径转换成对象
let obj = path.parse("/foo/bar/quux.html"); //
/* 
{
  root: '/',
  dir: '/foo/bar',
  base: 'quux.html',
  ext: '.html',
  name: 'quux'
} 
*/
console.log(obj);

// 2. path.format(pathObject);
// 将对象转换成对象
console.log(path.format(obj)); ///foo/bar\quux.html

// 3.path.join([...paths])
// 用于拼接路径
let str = path.join('a/b','c'); // \a\b\c
console.log(str)

// 4.path.normalize(path)
// 规范化路径
let res = path.normalize('/b/a//b///d.html');
// \b\a\b\d.html
console.log(res)

// 5.path.relative(from,to);
// 计算相对路径，找到第一个路径和第二个路径之间的相对路径
// ..\..\impl\bbb
console.log(path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb"));


// 6.path.resolve([...paths])
// 用于解析出绝对路径
console.log(path.resolve('/foo/bar', './baz')); //C:\foo\bar\baz
console.log(path.resolve('/foo/bar', '/tmp/file/')); //C:\tmp\file
