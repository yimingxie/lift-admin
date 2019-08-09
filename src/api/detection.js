import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol

// let url1 = `${protocol}//iot.gidomino.com`
// let url1 = `${protocol}//iot.gidomino.com/arctic`
// let url1 = `${protocol}//192.168.100.2/arctic`
let url1 = `${http.localURL}/arctic`


export default {
  // 获取异常告警列表
  getWarnList(params) {
    return http.post(`${url1}/elevator/diagninfo/list`, params)
  },

  // 获取实时电梯运行状态
  getElevatorData(regCode) {
    return http.get(`${url1}/elevator/monitorData/${regCode}`)
  },

  // 获取异常详情
  getDiagnInfo(diagnId) {
    return http.get(`${url1}/elevator/diagnInfo/${diagnId}`)
  },

  // 获取实时监测数据
  getMonitorData(params) {
    return http.post(`${url1}/elevator/monitorData/list`, params)
  },

  // 获取所有基础规则
  getPolicy(params) {
    return http.get(`${url1}/diagn/policy/list`, params)
  },

  // 获取（通用添加的）所有监控模板
  getAllMonitorTemplate(params) {
    // return http.get(`${url1}/diagn/monitor_template/list?offset=${params.offset}&limit=${params.limit}`)
    return http.get(`${url1}/diagn/monitor_template/list`, params)
  },

  // 获取指定ID的监控模板
  getOneMonitorTemplate(id) {
    return http.get(`${url1}/diagn/monitor_template/${id}`)
  },

  // 获取指定维保公司的所有监控列表
  getMaintenTemplate(params) {
    return http.get(`${url1}/diagn/diagn_monitor/list`, params)
  },

  // 获取维保公司指定ID的模板
  getMaintenOneTemplate(id) {
    return http.get(`${url1}/diagn/diagn_monitor/${id}`)
  },

  // 添加监测（添加到维保公司的已设监测）
  addMonitorMainten(params) {
    return http.post(`${url1}/diagn/diagn_monitor`, params)
  },

  // 编辑/更新监测（维保公司的已设监测编辑）
  editMonitorMainten(params) {
    return http.put(`${url1}/diagn/diagn_monitor`, params)
  },

  // 删除监测（维保公司）
  deleteMonitorMainten(dmId) {
    return http.delete(`${url1}/diagn/diagn_monitor/${dmId}/delete`)
  },

  // 更改记录
  changeLog(params) {
    return http.get(`${url1}/diagn/monitor_change_log/nice_list`, params)
  },

  // 查询阈值
  // /arctic/diagn/threshold/query
  getThreshold(params) {
    return http.post(`${url1}/diagn/threshold/query`, params)
  }



}