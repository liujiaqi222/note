import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const App = props => {
  console.log(props);
  return (
    <div>
      <h1>组件的子节点标签</h1>
      {props.children}
    </div>
  )
}


// 给组件传递参数和子节点
ReactDOM.render(<App name='嘉琪'><h2>hahahaha</h2></App>, document.getElementById('root'));
