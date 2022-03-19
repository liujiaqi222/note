import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cat from './image/cat.png'

// 高阶组件
function withMouse(WrappedComponent){
  // 该组件提供复用的状态逻辑
  class Mouse extends React.Component {
    // 鼠标状态
    state = {
      x: 0,
      y: 0,
    };
    componentDidMount() {
      window.addEventListener("mousemove", this.handleMouseMove);
    }
    componentWillUnmount(){
      window.removeEventListener('mousemove',this.handleMouseMove);
    }
    handleMouseMove = e=>{
      this.setState({
        x:e.clientX,
        y:e.clientY
      })
    }
    render(){
      return <WrappedComponent {...this.state}/>;
    }
  }
  return Mouse;
}

const Position = props => {
  return (
    <p>
      鼠标当前位置：(x:{props.x},y:{props.y})
    </p>
  );
}

const MousePosition = withMouse(Position);

ReactDOM.render(<MousePosition />, document.getElementById("root"));
