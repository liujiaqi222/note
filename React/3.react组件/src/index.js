import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发' },
      { id: 2, name: 'rose', content: '厉害' },
      { id: 3, name: 'tom', content: '板凳' },
    ]
  }
  render() {
    return (
      <div className='app'>
        <div>
          <input type="text" className='user' placeholder='请输入评论人' />
          <br />
          <textarea className='content'></textarea>
          <br />
          <button>发布评论</button>
        </div>
        <div className='no-comment'></div>
        <ul>
          {this.state.comments.map(({id,name,content}) => (
            <li key={id}>
              <h3>评论人：{ name}</h3>
              <p>评论内容：{ content}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

