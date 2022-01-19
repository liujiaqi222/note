import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发' },
      { id: 2, name: 'rose', content: '厉害' },
      { id: 3, name: 'tom', content: '板凳' },
    ],
    // 评论人
    userName: '',
    // 评论内容
    comment:''
  }
  // 渲染评论列表
  renderList() {
    const { comments } = this.state;
    if (comments.length === 0) {
      return <div className='no-comment'>暂无评论，快去评论吧！</div>
    }
    return (
      <ul>
        {comments.map(({ id, name, content }) => (
          <li key={id}>
            <h3>评论人：{name}</h3>
            <p>评论内容：{content}</p>
          </li>
        ))}
      </ul>)
  }
  handleChange=e=> {
    const target = e.target;
    this.setState({
      [target.name]:target.value
    })
    console.log(this.state);
  }
  postComment=()=> {
    const { comment, userName,comments } = this.state;
    if (comment.trim() && userName.trim()) {
      const newComments = [{id:Math.random(),name:userName,content:comment},...comments];
      this.setState({
        comments: newComments,
        userName: '',
        comment:''
      })
      
      
    } else {
      alert('请先填写完整表单');
    }
  }
  render() {
    return (
      <div className='app'>
        <div>
          <input type="text" name ='userName' onChange={this.handleChange} value={this.state.userName} className='user' placeholder='请输入评论人' />
          <br />
          <textarea className='content' name='comment' onChange={this.handleChange} value={this.state.comment}></textarea>
          <br />
          <button onClick={this.postComment}>发布评论</button>
        </div>
        {/* 条件渲染内容 */}
        {this.renderList()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

