import http from '../utils/http'
import baseURL from '../consts/baseURL'

export default {
  // 获取单个电梯的全部设备
  getAllDevices(liftId) {
    return http.get(`${baseURL.url1}/iotsqu/lift/${liftId}/devices`)
  },

  // 添加设备
  addDevice(params) {
    return http.post(`${baseURL.url1}/iotsqu/lift/device`, params)
  },

  // 查询设备
  checkDevice(deviceId) {
    return http.get(`${baseURL.url1}/iotsqu/lift/device/${deviceId}`)
  },

  // 设置设备
  setDevice(params) {
    return http.put(`${baseURL.url1}/iotsqu/lift/device`, params)
  }



}