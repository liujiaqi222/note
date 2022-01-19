import React from 'react';
import ReactDOM from 'react-dom';

// const Hello = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>props:{ props.name}</h1>
//     </div>
//   )
// }

// class Hello extends React.Component {
//   constructor(props) {
//     // 需要将props传递给父类的构造函数
//     super(props);
//     console.log(props);
//   }
//   render() {
//     return (
//       <div>
//         <h1>{this.props.name}</h1>
//       </div>
//     )
//   }
// }

// 父给子传递数据
// class Parent extends React.Component {
//   state = {
//     name: '嘉琪'
//   }
//   render() {
//     return (
//       <div>传递数据给子组件：<Child name={ this.state.name}/>
//       </div>
//     )
//   }
// }

// class Child extends React.Component {
//   render() {
//     return (
//       <h3>接收来自父组件的数据：{this.props.name}</h3>
//     )
//   }
// }

// 子给父传递数据
// class Parent extends React.Component {
//   state = {
//     name: ''
//   }
//   getChildMsg = (msg) => {
//     console.log('接收到子组件传递的数据了', msg);
//     this.setState({
//       name:msg
//     })
//   }
//   render() {
//     return (
//       <div style={{ backgroundColor: 'skyblue' }}>
//         {/* 把函数传递给子组件，由子组件调用回调函数并传递参数 */}
//         我是父组件 <Child getMsg={this.getChildMsg} />
//         消息是:{this.state.name}
//       </div>
//     )
//   }
// }

// class Child extends React.Component {
//   constructor(props) {
//     super(props);
//     // 调用父组件提供的回调函数，并传递参数
//     this.props.getMsg('嘉琪');
//   }
//   render() {
//     return (
//       <h3 style={{backgroundColor:'peachpuff'}}>我是子组件，我要给父组件传递参数</h3>
//     )
//   }
// }

// 兄弟组件之间传参

class Counter extends React.Component{
  // 提供共享状态
  state = {
    count:0,
  }
  // 提供修改状态的方法
  onIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <Child1 count={this.state.count}/>
        <Child2 add={this.onIncrement}/>
      </div>
    )
  }
}

const Child1 = props => {
  return <h4>计数器：{ props.count}</h4>
}
const Child2 = props => {
  return <button onClick={props.add}>+1</button>
}


ReactDOM.render(<Counter />, document.getElementById('root'));
