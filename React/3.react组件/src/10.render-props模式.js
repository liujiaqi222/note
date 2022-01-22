import React from 'react';
import ReactDOM from 'react-dom';

import cat from './image/cat.png'

// 创建Mouse组件
class Mouse extends React.Component {
  state = {
    x: 0,
    y: 0
  }
  // 监听鼠标位置的改变
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }
  handleMouseMove = e => {
    console.log(e);
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }
  render() {
    return this.props.render(this.state);
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
        <Mouse render={mouseState => <p>鼠标当前的位置：{mouseState.x} {mouseState.y}</p>} />
        <Mouse render={mouseState => <img src={cat} style={{ width: '20%', position: 'absolute', top: mouseState.y, left: mouseState.x }} />} />
      </div >
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
