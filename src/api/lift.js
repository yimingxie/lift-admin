// 电梯接口
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url1 = `${protocol}//iot.gidomino.com`
// let url1 = `${protocol}//192.168.100.89:8080`
// let url1 = `${protocol}//192.168.100.7:8080`


let url1 = `${http.localURL}/arctic`
// let url1 = `${protocol}//iot.gidomino.com/arctic`
// let url1 = `${protocol}//192.168.100.2/arctic`



export default {
  // 查询数字电梯列表
  getLiftList(params) {
    return http.post(`${url1}/number/elevators`, params)
  },

  // 查询电梯设备列表
  getLiftDevice(params) {
    console.log('查询电梯设备列表参数', params)
    return http.post(`${url1}/elevator/devices/list`, params)
  },

  // 查询电梯详情
  getLiftResult(regCode) {
    return http.get(`${url1}/elevator/${regCode}`)
  },

  // 搜索框
  // 搜索电梯下拉提示
  showSearchList(param) {
    // let url = `${url1}/elevator/search?title=` + param
    // console.log('搜索电梯下拉提示url', url)
    return http.post(`${url1}/elevator/search`, param)
  },

  // 添加电梯
  addLift(params) {
    return http.post(`${url1}/elevator`, params)
  },

  // 编辑电梯
  editLift(params) {
    return http.put(`${url1}/elevator`, params)
  },

  // 删除电梯
  deleteLift(params) {
    return http.delete(`${url1}/elevator`, params)
  },

  // 查询维保设备统计
  getStatistics() {
    return http.get(`${url1}/elevator/device/statistics`)
  },

  // 查询数字电梯统计
  getEleStatistics() {
    return http.get(`${url1}/elevator/statistics`)
  },

  // 查询电梯负责人
  getLiftPerson(regCode) {
    return http.get(`${url1}/elevator/${regCode}/person`)
  },
}