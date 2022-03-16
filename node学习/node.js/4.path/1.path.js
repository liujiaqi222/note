import path from "path";

// 1. path.basename(path[, ext])
// 返回路径的最后一个组成部分，ext的意思是过滤掉拓展名
console.log(path.basename("/foo/bar/quux.html")); // quux.html
console.log(path.basename("/foo/bar/quux.html", ".html")); // quux

// 2. path.dirname(path)
// 返回一个路径前面的文件夹名，除了最后一个部分
console.log(path.dirname("/foo/bar/quux")); // /foo/bar


// 3. path.extname(path)
// 返回路径中以.开头的拓展文件名，如果最后的部分没有.则返回空
console.log(path.extname("/foo/bar/quux.html"));  // .html
console.log(path.extname("/foo/bar/quux.md"));  // .md
console.log(path.extname("/foo/bar/quux"));  // ''

// 4. path.isAbosolute(path)
// 判断某个路径是否为绝对路径
console.log(path.isAbsolute('/foo/bar')); //true
console.log(path.isAbsolute('/foo/bar')); //true
console.log(path.isAbsolute('./foo/bar')); //false
console.log(path.isAbsolute('.')); //false
// 区分操作系统：在Linux中/开头就是绝对路径
// 在windows系统中，盘符开头就是绝对路径
console.log(path.isAbsolute('c:\\users\\jiaqi')); //true

// 5. path.sep用于获取当前操作系统中的路径分割符
// 在Linux操作系统中路径的分隔符是左斜杠/
// 在windows操作系统中的分隔符是右斜杠\
console.log(path.sep); // \ 

// 6. path.delimiter用于获取当前操作系统环境变量的分隔符
// 在Linux中是:
// 在windows中是;
console.log(path.delimiter); // ;



