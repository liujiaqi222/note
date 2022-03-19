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
      return <WrappedComponent {...this.state} {...this.props}/>;
    }
  }
  // 设置dispayName
  Mouse.displayName = `withMouse${getDisplayName(WrappedComponent)}`;
  return Mouse;
}

const Position = props => {
  console.log(props)
  return (
    <p>
    
      鼠标当前位置：(x:{props.x},y:{props.y})
    </p>
  );
}

function getDisplayName(WrappedComponent){
 return WrappedComponent.displayName || WrappedComponent.name ||'Component';
}



class App extends React.Component{
  render(){
    return (
      <div>
        <MousePosition a='1' />
        <CatP/>
      </div>
    );
  } 
}

const CatC = props =>{
  return (
    <img src = {cat} style={{ width:'5%',position:'absolute',top:props.y,left:props.x}} />
  )
}

const CatP = withMouse(CatC);

const MousePosition = withMouse(Position);

ReactDOM.render(<App />, document.getElementById("root"));
