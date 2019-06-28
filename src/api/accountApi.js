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
      `${url2}/account`, params
    )
  },
  // 根据账户列表模糊查询 仅限account
  getAccounts(params){
    return http.post(
      `${url2}/account/list`, params
    )
  },
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
  },
  // 修改用户账号
  editAccount(params){
    return http.put(
      `${url2}/account`, params
    )
  },
  // 删除用户账号
  deleteAccount(id){
    return http.delete(
      `${url2}/${id}/del`
    )
  },
  // 重置账户密码
  // params:{id:""}
  resetAccount(params){
    return http.put(
      `${url2}/account/reset`,params
    )
  },
  // 账户绑定角色
  accountBindRole(params){
    return http.post(
      `${url2}/account/bind`,params
    )
  },









  searchBuilding (params){
    return http.post(
      `/searchBuilding`, params
    )
  },
  
  getData() {
    return http.get('/api/emojis')
  },
  getBuilding(buildingId) {
    return http.get(
      `${url2}/elevator/building/${buildingId}`
    )
  },
  // 查询建筑列表
  getBuildings(pageIndex,pageSize) {
    return http.get(
      `${url2}/elevator/building?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  // 创建公司
  createCorp(params) {
    return http.post(
      `${url2}/elevator/corp/`, params
    )
  },
  // 查询公司列表
  getCorps(pageIndex,pageSize) {
    return http.get(
      `${url2}/elevator/corp?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  // 创建电梯
  createLift(params) {
    return http.post(
      `${url2}/elevator/lift`, params
    )
  },
  // 查询电梯列表
  getLifts(pageIndex,pageSize) {
    return http.get(
      `${url2}/elevator/lift?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  // 创建报警
  createAlarm(params) {
    return http.post(
      `${url2}/elevator/alarm`, params
    )
  },
  // 查询报警列表
  getAlarms(pageIndex,pageSize) {
    return http.get(
      `${url2}/elevator/alarm?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  searchBuilding (params){
    return http.post(
      `/searchBuilding`, params
    )
  }
}

// import api from '../api';// 导入我们的api接口
// export default {  
//  name: 'Address', 
//  created () {
//   this.onLoad();
//  },
//  methods: {   
//   // 获取数据   
//   onLoad() {
//    // 调用api接口，并且提供了两个参数    
//    api.corp.apiAddress({     
//     type: 0,     
//     sort: 1    
//    }).then(res => {
//     // 获取数据成功后的其他操作
//     ………………    
//    })
//   }  
//  }
// }