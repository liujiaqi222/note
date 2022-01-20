import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.warn('生命周期钩子函数：constructor');
  }
  componentDidMount() {
    console.warn('生命周期钩子函数：componentDidMount');
    console.log(document.getElementById('btn'));
  }
  render() {
    console.warn('生命周期钩子函数：render');
    return (
      <div>
        <h1>统计打豆豆被打的次数：</h1>
        <button id="btn">打豆豆</button>
      </div>
    )
  }
  
}



ReactDOM.render(<App />, document.getElementById('root'));
