import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    count: 1,
  };
  handleClick = () => {
    this.setState(
      (state, props) => {
        return {
          count: state.count + 1,
        };
      },
      () => {
        console.log("状态更新完成", this.state.count);
        console.log(document.getElementById("title").innerText);
      }
    );
  };
  shouldComponentUpdate(nextProps,nextState){
    console.log(nextProps,nextState);
    return true;
  }
  render() {
    console.log("render");
    return (
      <div>
        <h1 id="title">计数器：{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}




ReactDOM.render(<App />, document.getElementById("root"));
