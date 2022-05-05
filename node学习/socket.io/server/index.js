const io = require('socket.io')(3001, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  // 监听client的自定义事件
  socket.on('send-msg', (data) => {
    console.log(data);
    // io.emit给所有客户端都发送信息，包括发送信息的客户端
    // io.emit('receive-message', data);
    socket.broadcast.emit('receive-message', data);//给除了发送信息的客户端外发送信息
  })
})