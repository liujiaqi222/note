import axios  from "axios"; 
// 请求主体传递给服务器的数据格式：
// FormData、x-www-form-urlencoded、json字符串、普通文本、buffer

// FormData上传方式
let fm = new FormData();
fm.append('文件','文件名');
// 通过axios上传数据的时候需要设置好请求头
axios.post('http://localhost:8888/upload_single',fm,{
    headers:{
        'Content-Type':'multipart/form-data'
    }
})

