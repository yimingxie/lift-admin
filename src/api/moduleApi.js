/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
let url2 = `${protocol}//192.168.100.2/domino`
// let url2 = `${protocol}//iot.gidomino.com/domino`


export default  {
  
  // 创建维保管理员的账户
  createModule(params) {
    return http.post(
      `${url2}/funcs`, params
    )
  },
  // 查找所属公司模块集合
  // getModules(corpId){
  //   return http.get(
  //     `domino/${corpId}/module`
  //   )
  // },
  getModules(params){
    return http.post(
      `${url2}/funcs/list`,params
    )
  },
  // 修改模块
  editModule(params){
    return http.put(
      `${url2}/funcs`, params
    )
  },
  deleteModule(id){
    return http.delete(
      `${url2}/funcs/${id}`
    )
  },
  bindApi(params){
    return http.post(
      `${url2}/funcs/bind`, params
    )
  },
  // 查询模块下已绑定的接口
  moduleGetApis(id){
    return http.get(
      `${url2}/${id}/api`
    )
  },
  // getCorpModule(params){
  //   return http.put(
  //     `/domino/module`, params
  //   )
  // },


  // 修改账号的enable 状态 禁用
  banAccount(params){
    return http.put(
      `${url2}/account/ban`, params
    )
  },
  // 修改账号的enable 状态 启用
  pickAccount(params){
    return http.put(
      `${url2}/account/pick`, params
    )
  }
  
  
}
