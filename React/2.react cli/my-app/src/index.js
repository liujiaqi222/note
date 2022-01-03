// 1.导入react
import React from 'react';
import ReactDOM from 'react-dom';

// // 使用JS表达式
// const name = '嘉琪';
// // 2.创建react元素
// // 使用JSX语法
// const title = (
//   <h1 className='hello'>
//     Hello {name}
//   </h1>
// )
// let isLoading = false;

// const loadData = () => {
//   if (isLoading) return <div>loading中</div>;
//   return <h1>我是数据，加载完了</h1>
// }

// const title = <div>{ loadData()}</div>



// const list = [
//   {id:1,name:'🍞'},
//   {id:2,name:'👍'},
//   {id:3,name:'🪧'},
// ];

// const ul = (
//   <ul>{list.map(item => <li key={item.id}>{item.name}</li>)}</ul>
// )

// const title =(
//   <h1 style={{ color: 'red', backgroundColor: 'skyblue' }}>你好啊</h1>
// )
// 引入css文件
// import './index.css'
// const title = (
//   <h1 className='title'>JSX的样式</h1>
// )


// // 函数组件
// function Hello() {
//   return (
//     <div>这是一个组件</div>
//   )
// }


// 创建类组件

class Hello extends React.Component{
  render() {
    return <h1>hello</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('root'))
