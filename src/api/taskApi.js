/** 
 * api接口统一管理
 */
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`
let url2 = `${http.localURL}/domino`

export default  {

  // 获取月视图的列表
  monthTaskPlan(params){
    return http.post(
      `${url2}/month/task-plan/list`, params
    )
  },
  createPlan(params) {
    return http.post(
      `${url2}/plan`, params
    )
  },
  // 日历分母 - 月视图1
  rili(params){
    return http.post(
      `${url2}/task/calendar/total`, params
    )
  },
  // 日历分子 - 月视图
  // riliLista(){
  //   return http.get(
  //     `${url2}/task/total`
  //   )
  // },
  // 点击日历查看某一个的列表
  dayTaskPlan(params){
    return http.post(
      `${url2}/day/task-plan/list`, params
    )
  },
  // 派单
  createTask(params){
    return http.post(
      `${url2}/task`, params
    )
  },
  // 获取任务详情数据
  getMissionDetail(id){
    return http.get(
      `${url2}/task/details?id=${id}`
    )
  },
  // 模糊查询电梯
  searchLift(corpId,code){
    return http.get(
      `${url2}/${corpId}/elevator/${code}/info`
    )
  },
  // 根据电梯注册码 查询详情
  getLiftDetail(code){
    return http.get(
      `${url2}/elevator/${code}/details`
    )
  },
  // 关闭订单
  closeTask(taskId){
    return http.post(
      `${url2}/task/${taskId}/close`
    )
  },
  // 统计月视图数据
  monthTotal(id, timestamp){
    return http.get(
      `${url2}/task/month/total?corp=${id}&timestamp=${timestamp}`
    )
  },
  // 统计月视图数据
  dayTotal(id){
    return http.get(
      `${url2}/task/day/total?corp=${id}`
    )
  },
  // 编辑接单人员
  editPersons(params){
    return http.put(
      `${url2}/task/change/mp`, params
    )
  },
  // 编辑计划
  editPlan(params){
    return http.put(
      `${url2}/plan`, params
    )
  },
  // 查询电梯工单列表
  getLiftTaskList(params){
    return http.post(
      `${url2}/elev/task/list`, params
    )
    
  }
  // // 删除接口 根据接口id
  // deleteCorp(corpId){
  //   return http.delete(
  //     `${url2}/corp/${corpId}`
  //   )
  // },

  
}
