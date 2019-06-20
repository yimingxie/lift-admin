// 电梯接口
import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url1 = `${protocol}//iot.gidomino.com`
let url1 = `${protocol}//192.168.100.89:8080`


export default {
  // 查询数字电梯列表
  getLiftList(params) {
    let url = `${url1}/number/elevators?params=` + JSON.stringify(params)
    console.log('查询电梯列表url', url)
    let uri = encodeURI(url)
    return http.get(uri)
  },

  // 查询电梯设备列表
  getLiftDevice(reg_code, params) {
    // let url = `${url1}/elevator/${reg_code}/devices?params={"query":{"bonline":"-1"}}`
    let url = `${url1}/elevator/${reg_code}/devices?params=` + params
    console.log('查询电梯设备列表url', url)
    let uri = encodeURI(url)
    return http.get(uri)
  },

  // 查询电梯详情
  getLiftResult(reg_code) {
    let url = `${url1}/elevator/` + reg_code
    console.log('查询电梯详情url', url)
    return http.get(url)
  },

  // 搜索框
  // 搜索电梯下拉提示
  showSearchList(code) {
    let url = `${url1}/elevator/search?title=` + code
    console.log('搜索电梯下拉提示url', url)
    return http.get(url)
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
    return http.delete(`${url1}/mainten/elevator`, params)
  },

  //查询维保设备统计
  getStatistics() {
    return http.get(`${url1}/elevator/device/statistics`)
  },
}