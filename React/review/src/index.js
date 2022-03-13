import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Hello extends React.Component{
  constructor(props){
    super(props);
    console.log(props)
  }
  render(){
    return (
      <div>
        接收到的数据：{this.props.age}
      </div>
    )
  }
}

ReactDOM.render(<Parent/>, document.getElementById("root"));
