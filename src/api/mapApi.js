/** 
 * api接口统一管理
 */
import http from '../utils/http'

// let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.7:8080`

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
      `/test02/map/abnormal/statistics`, params
    )
  },
  getLiftDetails(params) {
    return http.post(
      `/test02/map/abnormal/elevator/details`, params
    )
  },
  getAbnormalDates(date){
    return http.post(
      `/test02/map/abnormal/undone/`, date
    )
  },
  // 企业列表查询 仅限code
  //   params:{  
  //     "pageNo": 1,
  //     "pageSize": 10,
  //     "column": "id",
  //     "order": true,
  //     "queryStr": "g"
  // }

 

  
}
