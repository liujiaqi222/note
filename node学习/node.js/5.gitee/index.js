import fs from 'fs';
import path from 'path';
const dirPath = 'C:\\Users\\liujiaqi\\桌面\\博客\\hexo-blogs\\source\\_posts';
const gitee = 'https://gitee.com/zyxbj/image-warehouse/raw';
const github = 'https://raw.githubusercontent.com/liujiaqi222/images';

function findMd(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (let fileName of files) {
    const filePath = path.join(dirPath, fileName);
    //根据文件路径获取文件信息
    const stats = fs.statSync(filePath);
    // 如果是文件夹就继续递归
    if (stats.isDirectory()) {
      // 如果文件夹名字是node_modules或者.github 则忽略
      if (fileName === 'node_modules' || fileName === '.github') {
        continue;
      }
      // 其他的文件夹继续递归遍历
      findMd(filePath);
    }
    // 如果是文件就判断他的后缀是否为md
    else if (path.extname(fileName) === '.md') {
      replaceGitee(filePath);
    }
  }
}




findMd(dirPath);


function replaceGitee(filePath) {
  let str = fs.readFileSync(filePath, 'utf-8');
 const result =  str.replaceAll(gitee, github);
  fs.writeFile(filePath, result, 'utf-8', (err) => {
    if (err) throw new Error(err);
    console.log('写入数据成功');
  })

}

