const path = require('path');
const fileUtils = require('../utils/file_utils.js');

// 处理业务逻辑的中间件
module.exports = async (ctx, next) => {
    // 获取请求地址
    const url = ctx.request.url; //将/api/seller 变化为../data/seller.json
    if (url.includes('api')) {
        const filePath = path.join(__dirname, '../data', url.replace('api', '') + '.json');
        const data = await fileUtils.getData(filePath);
        ctx.response.body = data;
    }
    await next();
}