// 设备接口
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url1 = `${protocol}//iot.gidomino.com`
let url1 = `${protocol}//192.168.100.89:8080`



export default {

  // 获取设备管理中的电梯列表
  getLiftList(params) {
    let url = `${url1}/elevators?params=` + params
    console.log('设备管理中的电梯列表url', url)
    let uri = encodeURI(url)
    return http.get(uri)
  },
  
  // 获取设备检测内容表
  getMonitorVal() {
    return http.get(`${url1}/elevator/device/monitorval`)
  },

  // 查询通用设备列表
  getDeviceListGi() {
    return http.get(`${url1}/devices`)
  },

  // 获取（通用）设备详情
  searchDevEui(dev_eui) {
    return http.get(`${url1}/elevator/device/${dev_eui}`)
  },

  // 获取（维保后台）设备详情
  // 需要monitor_obj monitor_val reg_code 参数确定设备唯一性
  getDetailMainten(query) {
    let url = `${url1}/elevator/device/?query=` + query
    console.log('获取（维保后台）设备详情url', url)
    let uri = encodeURI(url)
    return http.get(uri)
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
  editDeviceMainten(dev_eui, ruleForm) {
    return http.put(`${url1}/elevator/device/${dev_eui}`, ruleForm)
  },

  // 删除设备（维保）
  deleteDeviceMainten(params) {
    return http.delete(`${url1}/elevator/device/unbind`, params)
  },

  // 设备更换记录
  deviceChangeLog(params) {
    let url = `${url1}/elevator/device/record?query=` + params
    console.log('设备更换记录url', url)
    let uri = encodeURI(url)
    return http.get(uri)
  },

  // 根据设备类型获取监测内容id（多条）
  // 设备类型和监测内容相互绑定
  // 可以结合“监测内容表”获取id对应的中文内容
  getMonitorValByModel(dev_model) {
    return http.get(`${url1}/elevator/devicemodel/${dev_model}`)
  },

  // 查询设备上下线记录
  getDeviceBonline(dev_eui) {
    return http.get(`${url1}/elevator/device/${dev_eui}/bonline`)
  },
  


}