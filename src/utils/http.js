/**
 * 封装请求
 */

//引入axios
import axios from 'axios'
import router from '../router-config'
let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
// axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
//     //发起请求时，取消掉当前正在进行的相同请求
//     if (promiseArr[config.url]) {
//         promiseArr[config.url]('操作取消')
//         promiseArr[config.url] = cancel
//     } else {
//         promiseArr[config.url] = cancel
//     }
//       return config
// }, error => {
//     return Promise.reject(error)
// })

// //响应拦截器即异常处理
// axios.interceptors.response.use(response => {
  // 对响应数据做点什么
//   if (response.status === 200) {   
//     return Promise.resolve(response);  
//   } else {   
//     return Promise.reject(response);  
//   } 
// }, err => { // 服务器状态码不是200的情况 
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           err.message = '错误请求'
//           break;
//         case 401:
//           err.message = '未授权，请重新登录'
//           break;
//         case 403:
//           err.message = '拒绝访问'
//           break;
//         case 404:
//           err.message = '请求错误,未找到该资源'
//           break;
//         case 405:
//           err.message = '请求方法未允许'
//           break;
//         case 408:
//           err.message = '请求超时'
//           break;
//         case 500:
//           err.message = '服务器端出错'
//           break;
//         case 501:
//           err.message = '网络未实现'
//           break;
//         case 502:
//           err.message = '网络错误'
//           break;
//         case 503:
//           err.message = '服务不可用'
//           break;
//         case 504:
//           err.message = '网络超时'
//           break;
//         case 505:
//           err.message = 'http版本不支持该请求'
//           break;
//         default:
//           err.message = `连接错误${err.response.status}`
//       }
//     } else {
//       err.message = "连接到服务器失败"
//     }
//     message.err(err.message)
//       return Promise.resolve(err.response)
// })


//请求拦截器

axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  let token = window.localStorage.getItem('accessToken')
  // console.log(token)
  if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    // config.headers.token = `${token}`;
    // console.log("config==" + JSON.stringify(config))
    config.headers['G-Token'] = `${token}`;
  }
  return config;
}, err => {
    return Promise.reject(err);
});
// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // console.log('response===', response); 
  if(response.data.code === '401000' || response.data.code === 401000) {
    
    // alert('token失效，请重新登录');
    // window.location.href = '/';
    // router.push('/');
  }
  return response;
}, error => {
  //对响应数据错误做操作
  console.log('请求error', error.message);
  return Promise.reject(error);
})

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// axios.defaults.baseURL = '/api'


let iot
let devURL
let xiaohuURL
let shupingURL
let localURL


// if (process.env.NODE_ENV == 'development') {
//   iot = `${protocol}//iot.gidomino.com`
//   devURL = `${protocol}//192.168.100.2`
//   xiaohuURL = `${protocol}//192.168.100.89:8080`
//   shupingURL = `${protocol}//192.168.100.7:8080`
//   localURL = `${protocol}//127.0.0.1`
// } else if (process.env.NODE_ENV == 'production') {
// axios.defaults.baseURL = `${protocol}//iot.gidomino.com`
  localURL = iot = devURL = xiaohuURL = shupingURL = `${protocol}//192.168.100.7:8080`
// }

// let AUTH_TOKEN=(function(){
//   return window.localStorage.getItem('accessToken')
// })();
//设置默认请求头
axios.defaults.headers = {
  "Content-Type": "application/json; charset=utf-8",
  // "Content-Type": "application/x-www-form-urlencoded",
  // 'Content-Type':'text/html; charset=utf-8',
  // 'X-Requested-With': 'XMLHttpRequest',
  // 'Access-Token': window.localStorage.getItem('accessToken')
  // 'G-Token': AUTH_TOKEN
  // "Access-Control-Allow-Credentials": true
}
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
axios.defaults.timeout = 10000

export default {
  iot,
  devURL,
  xiaohuURL,
  shupingURL,
  localURL,
  //get请求
  get (url,param) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {   
        reject(err.data)  
      }) 
    })
  },
  //post请求
  post (url,param) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {   
        reject(err.data)  
      }) 
    })
  },
  put(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  delete(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}
