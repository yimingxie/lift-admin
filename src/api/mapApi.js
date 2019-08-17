/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/arctic`
// let url2 = `${protocol}//127.0.0.1/arctic`
let url2 = `${http.localURL}/arctic`
let url3 = `${http.localURL}/domino`



export default  {
  
  // 创建需要管理的权限接口信息
  // params:{
  //   "code":"",
  //   "url":"",
  //   "description":"",
  //   "version":""
  // }
  getAllMapLifts(params) {
    return http.post(
      `${url2}/map/abnormal/statistics`, params
    )
  },
  /**
   * 
   * @param params:
   *  {'regCode':val,'triggleTime':this.date}
   * 
   */
  getLiftDetails(params) {
    return http.post(
      `${url2}/map/abnormal/elevator/details`, params
    )
  },
  getAbnormalDates(date){
    return http.post(
      `${url2}/map/abnormal/undone`, date
    )
  },
  //维保作业
  getMap3TotalData(corpId){
    return http.post(
      `${url3}/map/task/info/count`, corpId
    )
  },
  // 获取地图所有点
  getMap3AllDots(params){
    return http.post(
      `${url3}/map/task/info`, params
    )
  },
  getMap3Details(params){
    return http.post(
      `${url3}/map/task/elev/details`, params
    )
  },
}
