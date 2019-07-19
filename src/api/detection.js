import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
let url1 = `${protocol}//iot.gidomino.com`
// let url2 = `${protocol}//192.168.100.89:8080`
// let url2 = `${protocol}//192.168.100.7:8080`


// let url2 = `${protocol}//iot.gidomino.com/arctic`
// let url2 = `${protocol}//192.168.100.2/arctic`
let url2 = `${http.localURL}/arctic`


export default {
  // 获取异常告警列表
  getWarnList(params) {
    // let url = `${url2}/elevator/${reg_code}/diagninfo?params=` + params
    // console.log('获取异常告警列表url', url)
    // let uri = encodeURI(url)
    // return http.get(uri)
    // return http.post(`${url2}/elevator/${reg_code}/diagninfo`, params)
    return http.post(`${url2}/elevator/diagninfo/list`, params)

  },
















  // 电梯实时数据
  getCurrent(id) {
    return http.get(`${url1}/iotsqu/liftposition/${id}`)
  },

  // 机房温度
  getD1(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/1?time=${time}`)
  },

  // 机房湿度
  getD2(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/2?time=${time}`)
  },

  // 机房风速
  getD3(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/3?time=${time}`)
  },

  // 机房水浸
  getD4(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/4?time=${time}`)
  },

  // 空调排气扇
  getD5(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/5?time=${time}`)
  },

  // 电动机电压
  getD6(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/6?time=${time}`)
  },

  // 电动机电流
  getD7(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/7?time=${time}`)
  },

  // 电动机温度
  getD8(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/8?time=${time}`)
  },

  // 电动机振动
  getD9(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/9?time=${time}`)
  },

  // 制动器线圈温度
  getD10(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/10?time=${time}`)
  },

  // 制动器刹车片温度
  getD11(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/11?time=${time}`)
  },

  // 制动器电压
  getD12(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/12?time=${time}`)
  },

  // 制动器电流
  getD13(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/13?time=${time}`)
  },

  // 曳引轮磨损
  getD14(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/14?time=${time}`)
  },

  // 限速轮转速
  getD15(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/15?time=${time}`)
  },

  // 层门开合
  getD16(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/16?time=${time}`)
  },

  // 轿门开合
  getD17(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/17?time=${time}`)
  },

  // 轿厢振动
  getD18(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/18?time=${time}`)
  },

  // 轿厢位置
  getD19(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/19?time=${time}`)
  },

  // 轿厢负荷
  getD20(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/20?time=${time}`)
  },

  // 机房安全回路
  getD21(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/21?time=${time}`)
  },














  // 电梯id: test001
  // 驱动辊转速
  getD22(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/22?time=${time}`)
  },

  // 从动辊转速
  getD23(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/23?time=${time}`)
  },

  // 电动机电流
  getD24(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/24?time=${time}`)
  },

  // 开关信号电流
  getD25(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/25?time=${time}`)
  },

  // 下料口微型拖辊铁架振动
  getD26(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/26?time=${time}`)
  },

  // 联轴器振动
  getD27(id, time) {
    return http.get(`${url1}/iotsqu/lift/${id}/historyData/27?time=${time}`)
  }
}