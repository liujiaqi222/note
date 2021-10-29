// 单例模式
export default class SocketService {
    static instance = null;
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocketService();
        }
        return this.instance;
    }
    ws = null;
    // 记录重试次数
    connectRetryCount = 0;
    // 定义连接服务器的方法
    connect() {
        // 判断浏览器是否支持websocket
        if (!window.WebSocket) {
            return console.log('您的浏览器不支持websocket代码');
        }
        this.ws = new WebSocket('ws://localhost:9998');
        // 连接服务端成功
        this.ws.onopen = () => {
            console.log('连接服务端成功了...');
            this.connected = true;
            this.connectRetryCount = 0;
        }
        // 连接服务端失败
        this.ws.onclose = () => {
            console.log('连接服务端失败...');
            this.connected = false;
            this.connectRetryCount++;
            setTimeout(() => {
                this.connect();
            },500*this.connectRetryCount)
        }
        // 传到服务器端发送过来的数据
        this.ws.onmessage = msg => {
            console.log('从服务端获取了数据');
            const recvData = JSON.parse(msg.data);
            // 判断回调函数是否存在
            if (this.callBackMapping[recvData.socketType]) {
                if (recvData.action === 'getData') {
                    // 调用回调函数传值
                    this.callBackMapping[recvData.socketType](JSON.parse(recvData.data))
                } else if (recvData.action === 'fullScreen') {

                } else if (recvData.action === 'themeChange') {

                }
            }
        }


    }
    // 存储回调函数
    callBackMapping = {}
    registerCallBack(socketType, callback) {
        this.callBackMapping[socketType] = callback;
    }
    // 取消某一个回调函数
    unRegisterCallBack(socketType) {
        this.callBackMapping[socketType] = null;
    }
    // 标识是否连接成功
    connected = false;
    // 记录重试的次数

    sendRetryCount = 0;
    // 发送数据的方法
    send(data) {
        // 判断此时是否连接成功
        if (this.connected) {
            this.ws.send(JSON.stringify(data));
            this.sendRetryCount = 0;
        } else {
            this.sendRetryCount++;
            // 延时500ms后再次调用send()
            setTimeout(() => {
                this.send(data);
            },500*(this.sendRetryCount+1))
        }
    }
}

