import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Hello extends React.Component {
  state = {
    comments: [
      { id: 1, name: "Jack", content: "沙发1" },
      { id: 2, name: "Rose", content: "沙发2" },
      { id: 3, name: "Tom", content: "沙发3" },
    ],
    // 评论人
    userName: "",
    // 评论内容
    userContent: "",
  };
  renderList() {
    if (this.state.comments.length) {
      return (
        <ul>
          {this.state.comments.map((item) => (
            <li key={item.id}>
              <h3>评论人：{item.name}</h3>
              <p>评论内容: {item.content}</p>
            </li>
          ))}
        </ul>
      );
    }
    return <div className="no-comment">暂无评论，快去评论吧</div>;
  }
  handleForm = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  addComment = (e) => {
    const { userName, userContent,comments } = this.state;
    const newComments = [
      {
        id: comments.length+1,
        name:userName,
        content:userContent,
      },...comments
    ];
    this.setState({
      comments: newComments,
    });
  };
  render() {
    const { userName, userContent } = this.state;

    return (
      <div className="app">
        <div>
          <input
            className="user"
            type="text"
            placeholder="请输入评论人"
            value={userName}
            name="userName"
            onChange={this.handleForm}
          />
          <br />
          <textarea
            className="content"
            value={userContent}
            name="userContent"
            cols="30"
            rows="10"
            placeholder="请输入评论内容"
            onChange={this.handleForm}
          ></textarea>
          <button onClick={this.addComment}>发表评论</button>
        </div>
        {/* 渲染评论列表 */}
        {this.renderList()}
      </div>
    );
  }
}

ReactDOM.render(<Hello />, document.getElementById("root"));
