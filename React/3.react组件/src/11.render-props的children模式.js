import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }
  render() {
    return this.props.children(this.state);
  }
componentWillUnmount() {
  window.removeEventListener('mousemove',this.handleMouseMove)
}
}

Mouse.propTypes = {
  children:PropTypes.func.isRequired
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
<Mouse>{ mouseState => <p>鼠标当前的位置：{mouseState.x} {mouseState.y}</p>}</Mouse>
        <Mouse>{mouseState => <img src={cat} style={{ width: '20%', position: 'absolute', top: mouseState.y, left: mouseState.x }} />}</Mouse>
      </div >
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
