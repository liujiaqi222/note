const sendBtn = document.querySelector('.send-btn');
const joinBtn = document.querySelector('.join-btn');
const msg = document.getElementById('msg');
const room = document.getElementById('room');
const displayMsgDom = document.querySelector('.display-messgae')

import { io } from 'socket.io-client'
// 连接后端
const socket = io('http://localhost:3001');

// 判断是否连接成功
socket.on('connect', () => {
  // 自定义触发事件，可以传递任意多的参数
  // socket.emit('custom-event', 'hi', 'hell32o');

})
socket.on('receive-message', data => {
  displayMsg(data);
})
function displayMsg(msg) {
  const p = document.createElement('p');
  p.innerHTML = msg;
  displayMsgDom.appendChild(p);
}

sendBtn.addEventListener('click', e => {
  e.preventDefault();
  if (!msg.value) return;

  displayMsg(msg.value);
  socket.emit('send-msg', msg.value);
  msg.value = ''
})



