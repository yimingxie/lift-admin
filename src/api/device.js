// 设备接口
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url1 = `${protocol}//iot.gidomino.com`
// let url1 = `${protocol}//192.168.100.89:8080`
// let url1 = `${protocol}//192.168.100.7:8080`
let url1 = '/test02'



export default {

  // 获取设备管理中的电梯列表
  getLiftList(params) {
    // let url = `${url1}/elevators?params=` + params
    // console.log('设备管理中的电梯列表url', url)
    // let uri = encodeURI(url)
    // return http.get(uri)
    return http.post(`${url1}/elevator/list`, params)
  },
  
  // 获取设备检测内容表
  getMonitorVal() {
    return http.get(`${url1}/elevator/device/monitorval`)
  },

  // 查询通用设备列表
  getDeviceListGi(params) {
    // return http.get(`${url1}/devices`)
    // let url = `${url1}/devices?params=` + params
    // console.log('查询通用设备列表url', url)
    // let uri = encodeURI(url)
    // return http.get(uri)
    return http.post(`${url1}/devices/all`, params)
  },

  // 获取（通用）设备详情 √
  searchDevEui(devEui) {
    return http.get(`${url1}/elevator/device/${devEui}`)
  },

  // 获取（维保后台）设备详情 √
  // 需要monitorObj monitorVal regCode 参数确定设备唯一性
  getDetailMainten(params) {
    // let url = `${url1}/elevator/device/?query=` + query
    // console.log('获取（维保后台）设备详情url', url)
    // let uri = encodeURI(url)
    // return http.get(uri)
    return http.post(`${url1}/elevator/device/detail`, params)
  },

  // 新增设备（维保平台）
  // 只有在“通用”添加了设备，才能在维保添加
  addDeviceMainten(ruleForm) {
    return http.post(`${url1}/elevator/device`, ruleForm)
  },

  // 新增设备（通用）
  addDeviceGi(ruleForm) {
    return http.post(`${url1}/device`, ruleForm)
  },

  // 编辑设备（维保）
  editDeviceMainten(ruleForm) {
    // return http.put(`${url1}/elevator/device/${devEui}`, ruleForm)
    return http.put(`${url1}/elevator/device/edit`, ruleForm)
  },

  // 删除设备（维保）
  deleteDeviceMainten(params) {
    return http.delete(`${url1}/elevator/device/unbind`, params)
  },

  // 设备更换记录
  deviceChangeLog(params) {
    // let url = `${url1}/elevator/device/record?query=` + params
    // console.log('设备更换记录url', url)
    // let uri = encodeURI(url)
    // return http.get(uri)
    return http.post(`${url1}/elevator/device/record`, params)

  },

  // 根据设备型号获取监测内容id（多条）
  // 设备型号和监测内容相互绑定
  // 可以结合“监测内容表”获取id对应的中文内容
  getMonitorValByModel(devModel) {
    return http.get(`${url1}/elevator/devicemodel/${devModel}`)
  },

  // 查询设备上下线记录
  getDeviceBonline(devEui) {
    return http.get(`${url1}/elevator/device/${devEui}/bonline`)
  },
  


}