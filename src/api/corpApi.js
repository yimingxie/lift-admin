/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
let url2 = `${protocol}//192.168.100.7:8080`

export default  {
  
  // 创建需要管理的权限接口信息
  // params:{
  //   "code":"",
  //   "url":"",
  //   "description":"",
  //   "version":""
  // }
  createCorp(params) {
    return http.post(
      `/domino/corp`, params
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

  getCorps(params){
    return http.post(
      `/domino/corp/list`, params
    )
  },
  
  // 删除接口 根据接口id
  deleteCorp(corpId){
    return http.delete(
      `/domino/corp/${corpId}`
    )
  },

  
}
