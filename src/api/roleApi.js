/** 
 * api接口统一管理
 */
import http from '../utils/http'

// let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.7:8080`

export default  {
  
  // 为指定公司创建角色
  createRole(params) {
    return http.post(
      `/test02/domino/role`, params
    )
  },
  // 查询角色列表
  getRoles(params){
    return http.post(
      `/test02/domino/role/list`, params
    )
  },
  // 根据ID查询角色详情
  getRole(id){
    return http.get(
      `/test02/domino/role/${id}`
    )
  },
  // 修改角色名称
  editRole(params){
    return http.put(
      `/test02/domino/role`, params
    )
  },
   // 绑定模块
   bind(params){
    return http.post(
      `/test02/domino/role/bind`, params
    )
  },
  // 删除模块
  deleteRole(id){
    return http.delete(
      `/test02/domino/role/${id}`
    )
  },
  // 查询角色下已绑定的模块
  roleGetmodule(id){
    return http.get(
      `/test02/domino/${id}/module`
    )
  },
}
