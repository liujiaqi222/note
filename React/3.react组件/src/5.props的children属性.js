import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// Children属性 文本节点
// const App = props => {
//   console.log(props); // {name: '嘉琪', children: '你好啊'}
//   return (
//     <div>
//       <h1>组件的子节点标签</h1>
//     </div>
//   )
// }

// // 给组件传递参数和子节点
// ReactDOM.render(<App name='嘉琪'>你好啊</App>, document.getElementById('root'));


const App = props => {
  console.log(props);
  return (
    <div>
      <h1>组件的子节点标签</h1>
      {props.children}
    </div>
  )
}

const Test = ()=> <button>我是button组件</button>

// 给组件传递参数和子节点
ReactDOM.render(<App name='嘉琪'><h2>hahahaha</h2><Test/></App>, document.getElementById('root'));
