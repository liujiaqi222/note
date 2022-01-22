import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  state = {
    count: 0,
  };
  
  render() {
    console.warn('生命周期钩子函数：render');
    return (
      <div>
        {/* 条件渲染 */}
        {this.state.count > 3 ? '豆豆被打死了' : <Counter count={this.state.count}></Counter>}
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }
}

class Counter extends React.Component {
  render() {
    console.warn('子组件的render')
    return <h1 id='title'>统计次数:{this.props.count}</h1>
  }
  componentDidMount() {
    // 开启定时器
    this.timer = setInterval(() => {
      console.log('定时器正在被执行');
    },200)
  };
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate被调用了');
    // 获取DOM
    const title = document.getElementById('title');
    console.log(title);
    // 注意：如果要调用setState()更新状态，则必须放在一个if条件中
    // 比较更新前后的props是否相同，来决定是否重新渲染组件。
    console.log('上一次的props:', prevProps, '当前的props:', this.props);
    if (prevProps.count !== this.props.count) {
      this.setState({});
    }
  }
  componentWillUnmount() {
    console.log('组件被卸载了');
    clearInterval(this.timer);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
