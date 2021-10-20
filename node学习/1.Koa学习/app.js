// 1.创建koa的对象
const koa = require('koa');
const json = require('koa-json');
const app = new koa();

app.use(json());
app.use(async ctx=>ctx.body ={msg:'hello'} );


app.listen(80,()=>{
  console.log('running at http://localhost');
});




