import axios from 'axios'
import qs from 'qs';
import 'whatwg-fetch'
import 'es6-promise'

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式


// 发送 post 请求
export function post(url, paramsObj) {
   const result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: paramsObj
    });

    return result;
}

// 默认端口
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
axios.defaults.transformRequest = [(data) => {
    return qs.stringify(data)
}]
axios.defaults.baseURL = 'http://tapi.52shuxue.com/sso/'
// 请求超时(0表示无超时时间)
// 请求超时超过"timeout"的时间，请求将被终端
axios.defaults.timeout = 20000;

axios.defaults.withCredentials = false;


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8';

export const getData = (url, param) => {
    return (
        axios.get(`${url}`)
    )
}
export const postData = (url, param) => {
    return (
        axios.post(`${url}`, param)
    )
}

export const allData = (arr) => {
    return (
        axios.all(arr)
    )
}

export const spreadCallBack = (func) => {
    return (
        axios.spread(func)
    )
}