import axios from 'axios'; // 引入axios
//https://mingtsing.cn/api
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 10000; //设置请求超时

// 请求拦截器
axios.interceptors.request.use(
    config => {
        config.headers["Content-Type"] = "application/json"
        // const token = localStorage.getItem("token");
        // token && (config.headers["token"] = token);
        return config;
    },
    error => {
        // return Promise.error(error);
        console.log(error);
        
    }
)


// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log(response);
        const res = response.data;
        // console.log(response.headers["content-disposition"], "Res");
        // const disposition = response.headers["content-disposition"];
        // 获取数据成功
        if (res.code === 200) {
        return res.result;
        }
        
    },
);


export const get = (url:string, params: object) => {
    return axios.get(url, {
        params,
    });
}
export const post = (url:string, params: object) => {
    return axios.post(url, JSON.stringify(params));
}