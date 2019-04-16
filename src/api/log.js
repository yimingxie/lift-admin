/** 
 * api接口统一管理
 */
import http from '../utils/http'
import baseURL from '../consts/baseURL'
export default  {
  // 登录
  auth (params) {
    return http.post(
      `${baseURL.url3}/sys/login`, params
    )
  },
  /**
   * 添加成员
  */
  addMember (params) {
    return http.post(
      `${baseURL.url3}/sys/user/add`, params
    )
  },
   /**
   * 查询所有账户
  */
  getAllAccount (pageNo,pageSize) {
    return http.get(
      `${baseURL.url3}/sys/user/list?pageNo=${pageNo}&pageSize=${pageSize}&column=createTime&order=aes`
    )
  },
   /**
   * 查询所有角色
  */
  getAllRole () {
    return http.get(
      `${baseURL.url3}/sys/role/list?pageNo=1&pageSize=100&column=createTime&order=aes`
    )
  },
  /**
   * 查询用户角色
  */
  getAccount_Role (userId) {
    return http.get(
      `${baseURL.url3}/sys/user/queryUserRole?userId=${userId}`
    )
  },
  /**
   * 通过id查询用户
  */
  getUser (userId) {
    return http.get(
      `${baseURL.url3}/sys/user/queryById?id=${userId}`
    )
  },
  /**
   * 查询用户的权限
  */
  getUser_pers (username) {
    return http.get(
      `${baseURL.url3}/sys/permission/queryByUser?username=${username}`
    )
  },
  /**
   * 查询角色授权
  */
  queryRolePermission (roleId) {
    return http.get(
      `${baseURL.url3}/sys/permission/queryRolePermission?roleId=${roleId}`
    )
  },
}

