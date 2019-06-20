/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
let url2 = `${protocol}//192.168.100.7:8080`

export default  {
  
  // 登录
  login(params) {
    return http.post(
      `/domino/login`, params
    )
  },
  
}
