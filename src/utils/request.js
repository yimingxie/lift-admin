import axios from 'axios'
import jsonp from 'jsonp'
import {Message, Loading} from 'element-ui'

// 设置baseURL
if (process.env.NODE_ENV === 'development') {
  // axios.default.baseURL = 'http://192.168.100.9'
  axios.default.baseURL = 'http://localhost'
} else if (process.env.NODE_ENV === 'production') {
  axios.default.baseURL = 'https://iot.gidomino.com'
}

// 设置请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Accept = 'application/json'
  // config.headers.Authorization = location.getItem('user-token')
  return config
})

// 封装请求
export const http = (method, url, params, auto_err = true) => {
  const args = {
    "method": method,
    "url": url,
    "data": params
  }

  return new Promise((resolve, reject) => {
    axios(args)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (auto_err) {
          Message({
            message: '网络异常',
            type: 'error'
          })
        }

        reject(err)
      })
  })
}

// 封装跨域请求
export const myJsonp = (url, options) => {
  return new Promise((resolve, reject) => {
    jsonp(url, options, function (err, data) {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })
}
