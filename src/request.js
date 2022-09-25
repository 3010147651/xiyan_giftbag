import axios from "axios";


const service = axios.create({
    baseURL:"http://119.188.210.64:6780/",  //接口请求地址
    timeout:15000        //请求超时时间
})


const service2 = axios.create({
    baseURL:"http://101.34.213.251/",  //接口请求地址
    timeout:15000       //请求超时时间
})

const service3 = axios.create({
 //  baseURL:"http://112.74.108.223:8087/", 
 //  baseURL:"http://124.223.103.14:8187/", 
 // baseURL:"http://112.74.108.223:8187/", 
//   baseURL:"http://api.goxwo.com:8087", 
  baseURL:"http://127.0.0.1:8088",

    timeout:25000        //请求超时时间
})


const service4 = axios.create({
    baseURL:"http://qr.rjk66.cn/",  //权限二维码
    timeout:15000        //请求超时时间
})

const service5 = axios.create({
    baseURL:"https://ptlogin2.qq.com/",  //qq相关的api
    timeout:15000        //请求超时时间
})


const service6 = axios.create({
    baseURL:"http://127.0.0.1:8088/",  //qq相关的api
    timeout:5000        //请求超时时间
})
//导出模块，全局模块导出
export {service,service2,service3,service4,service5,service6}