import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PropTypes from 'prop-types';


function App(props){
  const lis = props.colors.map(item => <li key={item}>{item}</li>)
  return (
    <div>
      HI {props.colors}
      {props.pageSize}
      <ul>{lis}</ul>
    </div>
  );
}

App.propTypes = {
  colors:PropTypes.array
}
App.defaultProps = {
  pageSize:10
}


ReactDOM.render(<App colors={['red','blue']}/>, document.getElementById("root"));
