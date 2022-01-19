import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// 得到两个组件
const { Provider, Consumer } = React.createContext();

class App extends React.Component {
  render() {
    return (
      <Provider value='嘉琪'>
        <div className='App'>
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = props => {
  return (
    <div className='Node'>
      <Subnode />
    </div>
  )
}

const Subnode = props => {
  return (
    <div className='Subnode'>
      <Child />
    </div>
  )
}

const Child = props => {
  return (
    <div className='Child'>
      <Consumer>
        {data => <span>我接收到了参数--{ data}</span>}
      </Consumer>
    </div>)
}

ReactDOM.render(<App />, document.getElementById('root'));
