/** 
 * api接口统一管理
 */
import http from '../utils/http'
import baseURL from '../consts/baseURL'
export default  {
  /**
     * 修改告警规则
     * @param  {String} 告警规则id
     * @param  {Object} 告警规则参数
     * @return {Promise}
     */
  // 创建建筑
  createBuilding(params) {
    return http.post(
      `${baseURL.url2}/elevator/building/`, params
    )
  },
 
  getBuilding(buildingId) {
    return http.get(
      `${baseURL.url2}/elevator/building/${buildingId}`
    )
  },
  // 查询建筑列表
  getBuildings(pageIndex,pageSize) {
    return http.get(
      `${baseURL.url2}/elevator/building?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  // 创建公司
  createCorp(params) {
    return http.post(
      `${baseURL.url2}/elevator/corp/`, params
    )
  },
  // 查询公司列表
  getCorps(pageIndex,pageSize) {
    return http.get(
      `${baseURL.url2}/elevator/corp?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  // 创建电梯
  createLift(params) {
    return http.post(
      `${baseURL.url2}/elevator/lift`, params
    )
  },
  // 查询电梯列表
  getLifts(pageIndex,pageSize) {
    return http.get(
      `${baseURL.url2}/elevator/lift?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  },
  // 创建报警
  createAlarm(params) {
    return http.post(
      `${baseURL.url2}/elevator/alarm`, params
    )
  },
  // 查询报警列表
  getAlarms(pageIndex,pageSize) {
    return http.get(
      `${baseURL.url2}/elevator/alarm?pageIndex=${pageIndex}&pageSize=${pageSize}`
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