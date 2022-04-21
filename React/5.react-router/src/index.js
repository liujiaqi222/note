import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <div>
      <p>登录页面</p>
      <button onClick={handleClick}>登录</button>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  return (
    <div>
      <h2>我是后台首页</h2>
      <button onClick={handleClick}>返回</button>
    </div>
  );
};

const First = () => <h1>hello</h1>;

const App = () => (
  <Router>
    <div>
      <h1>编程式导航</h1>
      <Link to="/login">去登录页面</Link>
      <Routes>
        <Route path="*" element={<First />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  </Router>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
