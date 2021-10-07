const fs = require('fs').promises;
//读取文件内容的方法
module.exports.getData = async filePath => {
    // 根据文件的路径，读取文件的内容
     const data = await fs.readFile(filePath,'utf-8').catch(err=>{
         return '读取文件内容失败，文件资源不存在';
     });
     return data;
}