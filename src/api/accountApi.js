/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`
let url2 = `${http.localURL}/domino`


export default  {
  
  // 创建维保管理员的账户
  createAccount(params) {
    return http.post(
      `${url2}/manage/staff`, params
    )
  },
  // 根据账户列表模糊查询 仅限account
  getAccounts(params){
    return http.post(
      `${url2}/manage/staff/list`, params
    )
  },
  
  // 修改账号的enable 状态 禁用
  // {
  //   "userId":"账号id",
  //   "valid":"状态: false:禁用;true:启用;"
  // }
  enableAccount(params){
    return http.put(
      `${url2}/manage/staff/valid`, params
    )
  },
  // // 修改账号的enable 状态 启用
  // pickAccount(params){
  //   return http.put(
  //     `${url2}/account/pick`, params
  //   )
  // },
  // 修改用户账号
  editAccount(params){
    return http.put(
      `${url2}/manage/staff/name`, params
    )
  },
  // 删除用户账号
  deleteAccount(id){
    return http.delete(
      `${url2}/manage/staff/${id}`
    )
  },
  // 重置账户密码
  // params:{userId:""}
  resetAccount(params){
    return http.put(
      `${url2}/manage/staff/reset-p`,params
    )
  },
  // 账户绑定角色
  accountBindRole(params){
    return http.put(
      `${url2}/manage/staff/role`,params
    )
  },
  getAccountDetail(){
    return http.get(
      `${url2}/user/center`
    )
  },
  // 用戶中心修改密码
  editPsd(params){
    return http.put(
      `${url2}/user/center/p`, params
    )
  },

  // ------------------------部门管理--------------------------------
  // 创建员工的账号
  createDepartment(params) {
    return http.post(
      `${url2}/department`, params
    )
  },
  // 获取部门列表
  getDepartments(params){
    return http.post(
      `${url2}/department/list`, params
    )
  },
  // 编辑部门
  editDepartment(params){
    return http.put(
      `${url2}/department`, params
    )
  },
  // 删除部门
  deleteDepartment(id){
    return http.delete(
      `${url2}/department/${id}`
    )
  },
  // ------------------------员工管理--------------------------------

  // 添加员工
  createStaff(params) {
    return http.post(
      `${url2}/staff`, params
    )
  },
  // 获取员工列表
  getStaffs(params){
    return http.post(
      `${url2}/staff/list`, params
    )
  },
  // 查询员工信息详情
  getStaffDetails(staffId){
    return http.get(
      `${url2}/staff/${staffId}`
    )
  },
  // 编辑员工
  editStaff(params){
    return http.put(
      `${url2}/staff`, params
    )
  },
  // 员工账号停启
  // {
  //   "staffId":"员工id",
  //   "enable":"0:禁用,1:启用"
  // }
  enableStaff(params){
    return http.put(
      `${url2}/staff/enable`, params
    )
  },
  // 批量重置密码
  resetPsd(params){
    return http.put(
      `${url2}/staff/reset-password-list`, params
    )
  },
  // 删除员工
  deleteStaff(id){
    return http.delete(
      `${url2}/staff/${id}`
    )
  },
  /**
   * 根据所选择的管辖区域电梯
   */
  getElevatorByArea(corpId,areaCode){
    return http.get(
      `${url2}/staff/${corpId}/${areaCode}/elevator`
    )
  },
  uploadPic(params){
    return http.post(
      `${url2}/upload/image`, params
    )
  },
  // 查看图片
  viewPic(picName){
    return `${url2}/view/image?filename=${picName}`
    
  }
}








  

