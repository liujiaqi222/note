import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = props => {
  console.log(props);
  return (
    <div>
      <h1>此处展示的props默认值：{ props.pageSize}</h1>
    </div>
  )
}

// 添加props的默认值
App.defaultProps = {
  pageSize:10,
}

// 给组件传递参数和子节点
ReactDOM.render(<App fn={()=>1} ></App>, document.getElementById('root'));
