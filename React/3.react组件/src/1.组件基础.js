import React from 'react';
import ReactDOM from 'react-dom';

// React事件处理

// class App extends React.Component{
//   // 事件处理程序
//   handleClick() {
//     console.log('单击事件触发了');
//   }
//   render() {
//     return <button onClick={this.handleClick}>点我点我</button>
//   }
// }

// function App2() {
//   function click() {
//     console.log('I got clicked');
//   }
//   return <button onClick={click}>Click ME</button>
// }



// // React事件对象
// class App extends React.Component{
//   handleClick(e) {
//     e.preventDefault();

//   }
//   render() {
//     return (<a href='https://jiaqicoder.com' onClick={this.handleClick}>click me</a>);
//   }
// }

// state的基本使用
// class App extends React.Component {
//   // 方式一：
//   // constructor() {
//   //   super();
//   //   // 初始化state
//   //   this.state = {
//   //     count:0,
//   //   };
//   // }
//   // 方式二：
//   state = {
//     count: 0,
//   }
//   render() {
//     return (
//       <div>
//         <h1>计数器：{this.state.count}</h1>
//         <button onClick={() => { this.setState({ count: this.state.count + 1 }) }}> 加一</button>
//       </div>)
//   }
// }
// class App extends React.Component {

//   state = {
//     count: 0,
//   }
//   // 事件处理程序
//   add() {
//     this.setState({
//        count:this.state.count+1
//      })
//    }
//   render() {
//     return (
//       <div>
//         <h1>计数器：{this.state.count}</h1>
//         <button onClick={()=>this.add()}> 加一</button>
//       </div>)
//   }
// }
// class App extends React.Component {

//   state = {
//     count: 0,
//   }
//   constructor() {
//     super();
//     this.add = this.add.bind(this);
//   }
//   // 事件处理程序
//   add() {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//   render() {
//     return (
//       <div>
//         <h1>计数器：{this.state.count}</h1>
//         <button onClick={this.add}> 加一</button>
//       </div>)
//   }
// }
// class App extends React.Component {

//   state = {
//     count: 0,
//   }

//   // 事件处理程序
//   add=()=> {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//   render() {
//     return (
//       <div>
//         <h1>计数器：{this.state.count}</h1>
//         <button onClick={this.add}> 加一</button>
//       </div>)
//   }
// }

// 表单处理
// class App extends React.Component{
//   state = { txt: '' };
//   handleChange(e) {
//     this.setState({
//       txt:e.target.value
//     })
//     // console.log(this.s);
//   }
//   render() {
//     return (
//       <input type='text' value={ this.state.txt} onChange={e=>this.handleChange(e)}/>
//     )
//   }
// }

// 文本框 富文本框 下拉框 复选框

// class App extends React.Component {
//   state = {
//     txt: '',
//     content: '',
//     city: 'bj',
//     isChecked: true,
//   }
//   handleChange = (e) => {
//     this.setState({
//       txt: e.target.value,
//     })
//   }
//   // 处理富文本框的变化
//   handleContent = (e) => {
//     this.setState({
//       content: e.target.value,
//     })
//   }
//   // 处理下拉框的变化
//   handleCity = (e) => {
//     this.setState({
//       city: e.target.value,
//     })
//   }
//   // 处理复选框的变化
//   handleCheck = (e) => {
//     this.setState({
//       isChecked: e.target.checked
//     })
//   }
//   render() {
//     return (
//       <div>
//         {/* 文本框 */}
//         <input type="text" value={this.state.txt} onChange={this.handleChange} />
//         <br />
//         {/* 富文本框 */}
//         <textarea value={this.state.content} onChange={this.handleContent}></textarea>
//         <br />
//         {/* 下拉框 */}
//         <select value={this.state.city} onChange={this.handleCity}>
//           <option value="sh">上海</option>
//           <option value="bj">北京</option>
//           <option value="gz">广州</option>
//         </select>
//         {/* 复选框 */}
//         <input type="checkbox" checked={this.state.isChecked} onChange={this.handleCheck} />
//       </div>
//     )
//   }
// }

// // 多表单组件的优化
// class App extends React.Component {
//   state = {
//     txt: '',
//     content: '',
//     city: 'bj',
//     isChecked: true,
//   }
//   handleChange = (e) => {
//     const target = e.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     this.setState({
//       [target.name]: value
//     })
//   }

//   render() {
//     return (
//       <div>
//         {/* 文本框 */}
//         <input type="text" name='txt' value={this.state.txt} onChange={this.handleChange} />
//         <br />
//         {/* 富文本框 */}
//         <textarea name='content' value={this.state.content} onChange={this.handleChange} ></textarea>
//         <br />
//         {/* 下拉框 */}
//         <select name='city' value={this.state.city} onChange={this.handleChange} >
//           <option value="sh">上海</option>
//           <option value="bj">北京</option>
//           <option value="gz">广州</option>
//         </select>
//         {/* 复选框 */}
//         <input type="checkbox" name='isChecked' checked={this.state.isChecked} onChange={this.handleChange} />
//       </div>
//     )
//   }
// }

// 非受控组件
class App extends React.Component {
  constructor() {
    super();
    // 创建ref
    this.txtRef = React.createRef();
  }
  // 获取文本框的值
  getTxt = () => {
    console.log(this.txtRef.current.value);
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef} />
        <button onClick={this.getTxt}>click me</button>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));

