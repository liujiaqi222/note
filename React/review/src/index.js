import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import pic from "./mouse.png";
import PropTypes from "prop-types";

class App extends React.Component {
  render() {
    return (
      <div>
        
        <Mouse>
          {(mouse) => <img src={pic} style={{ position:'absolute',top:mouse.y,left:mouse.x, width:'10%'}}/> }
        </Mouse>
      </div>
    );
  }
}

// render props模式

// 创建可复用的组件
class Mouse extends React.Component {
  // 鼠标位置state
  state = {
    x: 0,
    y: 0,
  };
  // 监听鼠标移动事件
  // 此钩子函数可以获取到dom
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    return this.props.children(this.state);
  }
  componentWillUnmount(){
    window.removeEventListener('mousemove',this.handleMouseMove);
  }
}

Mouse.propTypes = {
  children:PropTypes.func.isRequired,
}


ReactDOM.render(<App />, document.getElementById("root"));
