const path = require('path');
const fileUtils = require('../utils/file_utils.js');


const ws = require('ws');

const wss = new ws.Server({
    port: 9998
})

// 服务端开启监听
module.exports.listen = () => {
    wss.on('connection', client => {
        console.log('客户端成功连接');
        client.on('message', async msg => {
            let payload = JSON.parse(msg);
            if (payload.action === 'getData') {
                // 拼接路径
                let filePath = '../data/' + payload.chartName + '.json';
                filePath = path.join(__dirname, filePath);
                // 读取数据
                const data = await fileUtils.getData(filePath);
                // 在服务器端获取的数据基础上增加一个data字段
                payload.data = data;
                client.send(JSON.stringify(payload)); //发送数据
            } else {
                // 原封不动地将接收的数据转发给每一个处于连接状态的客户端
                // wss.clients 代表所有正在连接的client
                wss.clients.forEach(client => {
                    client.send(JSON.stringify(payload));
                })
            }
            console.log('客户端发送的信息为' + msg);
            // client.send('hello from backend')
        })
    })
}

