import React from 'react';
import ReactDOM from 'react-dom';

// React事件处理

class App extends React.Component{
  // 事件处理程序
  handleClick() {
    console.log('单击事件触发了');
  }
  render() {
    return <button onclick={this.handleClick}>点我点我</button>
  }
}



ReactDOM.render(<App/>,document.getElementById('root'));

