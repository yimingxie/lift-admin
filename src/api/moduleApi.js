/** 
 * api接口统一管理
 */
import http from '../utils/http'

// let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.7:8080`

export default  {
  
  // 创建维保管理员的账户
  createModule(params) {
    return http.post(
      `/test02/domino/funcs`, params
    )
  },
  // 查找所属公司模块集合
  // getModules(corpId){
  //   return http.get(
  //     `domino/${corpId}/module`
  //   )
  // },
  getModules(params){
    return http.post(
      `/test02/domino/funcs/list`,params
    )
  },
  // 修改模块
  editModule(params){
    return http.put(
      `/test02/domino/funcs`, params
    )
  },
  deleteModule(id){
    return http.delete(
      `/test02/domino/funcs/${id}`
    )
  },
  bindApi(params){
    return http.post(
      `/test02/domino/funcs/bind`, params
    )
  },
  // 查询模块下已绑定的接口
  moduleGetApis(id){
    return http.get(
      `/test02/domino/${id}/api`
    )
  },
  // getCorpModule(params){
  //   return http.put(
  //     `/domino/module`, params
  //   )
  // },


  // 修改账号的enable 状态 禁用
  banAccount(params){
    return http.put(
      `/test02/domino/account/ban`, params
    )
  },
  // 修改账号的enable 状态 启用
  pickAccount(params){
    return http.put(
      `/test02/domino/account/pick`, params
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