import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 普通函数
// function Hello(){
//   return (
//     <div>这是一个函数组件</div>
//   )
// }
// 箭头函数
// const Hello = () => <div>这是一个函数组件</div>;

// 使用类组件
class Hello extends React.Component{
  render(){
    return <div>hello class Component</div>
  }
}


ReactDOM.render(<Hello />, document.getElementById("root"));
