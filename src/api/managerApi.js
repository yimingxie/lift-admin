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
  createApi(params) {
    return http.post(
      `/test02/domino/api`, params
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
      `/test02/domino/api/list`, params
    )
  },
  
  // 删除接口 根据接口id
  deleteApi(apiId){
    return http.delete(
      `/test02/domino/api/${apiId}`
    )
  },

  
}
