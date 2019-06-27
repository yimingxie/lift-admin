/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
let url2 = `${protocol}//192.168.100.2/domino`

export default  {
  
  // 为指定公司创建角色
  createRole(params) {
    return http.post(
      `${url2}/role`, params
    )
  },
  // 查询角色列表
  getRoles(params){
    return http.post(
      `${url2}/role/list`, params
    )
  },
  // 根据ID查询角色详情
  getRole(id){
    return http.get(
      `${url2}/role/${id}`
    )
  },
  // 修改角色名称
  editRole(params){
    return http.put(
      `${url2}/role`, params
    )
  },
   // 绑定模块
   bind(params){
    return http.post(
      `${url2}/role/bind`, params
    )
  },
  // 删除模块
  deleteRole(id){
    return http.delete(
      `${url2}/role/${id}`
    )
  },
  // 查询角色下已绑定的模块
  roleGetmodule(id){
    return http.get(
      `${url2}/${id}/module`
    )
  },
}
