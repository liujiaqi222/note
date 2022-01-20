import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';

const App = props => {
  console.log(props);
  return (
    <ul>
    </ul>
  )
}

// 添加校验
App.propTypes = {
  a: PropTypes.number,
  fn: PropTypes.func.isRequired,
  tag: PropTypes.element,
  filter: PropTypes.shape({
    name: PropTypes.string,
    age:PropTypes.number
  })
} 


// 给组件传递参数和子节点
ReactDOM.render(<App fn={()=>1} ></App>, document.getElementById('root'));
