import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    number: 0,
  };
  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3),
      };
    });
  };
  // 如果两次生成的随机数相同，则此时不需要重新被渲染
  // shouldComponentUpdate(nextP, nextS) {
  //   return nextS.number === this.state.number;
  // }
  render() {
    return (
      <div>
        <NumberBox number={this.state.number}></NumberBox>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}

class NumberBox extends Component {
  state = {};
  render() {
    console.log("render");
    return <h1 id="title">计数器：{this.props.number}</h1>;
  }
  shouldComponentUpdate(nextP, nextS) {
    console.log(nextP, this.props);
    return nextP.number !== this.props.number;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
