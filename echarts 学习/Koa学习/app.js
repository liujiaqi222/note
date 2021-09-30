// 1.创建koa的对象
const koa = require('koa');
const app = new koa();
// 2.编写响应函数（中间件）
// ctx 上下文 ctx.request,ctx.response
// next 下一个中间件是否能够被执行，取决于这个next函数有没有被调用
app.use((ctx,next)=>{
  console.log('第一层中间件');
  ctx.response.body = 'hello world';
  next();
  console.log('第一层中间件...1');
})
// 第二层中间件
app.use(async(ctx,next)=>{
  console.log('第二层中间件');
  let data= await next();
  console.log(data); //Promise { 'I want to sleep' }
  console.log('第二层中间件...2');
})
// 第三层中间件
app.use((ctx,next)=>{
  console.log('第三层中间件');
  return 'I want to sleep'
})

// 3.监听端口
app.listen(3000);



