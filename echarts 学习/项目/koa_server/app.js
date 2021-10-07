//  服务器的入口文件
const koa = require('koa');

const app = new koa();

// 绑定中间件
// 绑定第一层中间件
app.use(require('./middleware/koa_response_duration.js'));
// 绑定第二层中间件
app.use(require('./middleware/koa_response_header.js'));
// 绑定第三层中间件
app.use(require('./middleware/koa_response_data.js'));


app.listen(80,()=>{
    console.log('running at http://localhost');
});
