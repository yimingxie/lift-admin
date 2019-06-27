/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
let url2 = `${protocol}//192.168.100.2/domino`

export default  {
  
  // 创建需要管理的权限接口信息
  // params:{
  //   "code":"",
  //   "url":"",
  //   "description":"",
  //   "version":""
  // }
  createApi(params) {
    return http.post(
      `${url2}/api`, params
    )
  },

  // 角色列表查询 仅限code
  //   params:{
  //     "pageNo": 1,
  //     "pageSize": 10,
  //     "column": "id",
  //     "order": true,
  //     "queryStr": "g"
  // }

  getApis(params){
    return http.post(
      `${url2}/api/list`, params
    )
  },
  
  // 删除接口 根据接口id
  deleteApi(apiId){
    return http.delete(
      `${url2}/api/${apiId}`
    )
  },

  
}
