/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`// let url2 = `${protocol}//127.0.0.1/domino`
let url2 = `${http.localURL}/domino`



export default  {
  
  // 登录
  login(params) {
    return http.post(
      `${url2}/login`, params
    )
  },
  
}
