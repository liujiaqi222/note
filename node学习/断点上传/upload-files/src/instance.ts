import axios  from "axios"; 
axios.defaults.baseURL = 'http://localhost:8888/';
(axios.defaults.headers as any)['Content-Type']  ='mutltipart/form-data'