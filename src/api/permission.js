/** 
 * api接口统一管理
 */
import http from '../utils/http'
import baseURL from '../consts/baseURL'
export default  {
 
  /**
   * 添加权限
  */
  addPermission (params) {
    return http.post(
      `${baseURL.url3}/sys/permission/add`, params
    )
  },
  getAllPermission (){
    return http.get(
      `${baseURL.url3}/sys/permission/list`
    )
  },
  tree (){
    return http.get(
      `${baseURL.url3}/sys/permission/queryTreeList`
    )
  },
  // 新增角色
  addRole(params){
    return http.post(
      `${baseURL.url3}/sys/role/add`, params
    )
  },
  // 保存角色授权
  saveRolePer(params){
    return http.post(
      `${baseURL.url3}/sys/permission/saveRolePermission`, params
    )
  }
}

