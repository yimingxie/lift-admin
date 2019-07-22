import codec from './codec_v1.json'
import api from '../api'


export default {
  /**
   * 格式化时间戳
   * @param {number} timestamp 时间戳
   * @return {string} "2019-4-16 15:50:30"
   */
  dateFormat(timestamp) {
    // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
    var dateObj = new Date(timestamp)
    var year = dateObj.getFullYear(),
      month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
      date = ("0" + dateObj.getDate()).slice(-2),
      hour = ("0" + dateObj.getHours()).slice(-2),
      minute = ("0" + dateObj.getMinutes()).slice(-2),
      second = ("0" + dateObj.getSeconds()).slice(-2);

    var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    return result;
  },

  /**
   * 转化监测对象
   * '0:0:0' => ['监测对象1', '监测对象2', '监测对象3']
   */
  changeMonitorObj(moString) {
    if (moString == null || moString == undefined || moString == '') {
      return []
    }
    let contents = codec.contents
    let moArr = moString.split(':')
    let firstIndex = moArr[0]
    let secondIndex = moArr[1]
    let thirdIndex = moArr[2]
    let firstEle = contents[firstIndex]
    let secondEle = firstEle.subs[secondIndex]
    let thirdEle = secondEle.subs[thirdIndex]

    let resultArr = []
    resultArr.push(firstEle.cn_name, secondEle.cn_name, thirdEle.cn_name)

    return resultArr
  },

  /**
   * 深拷贝 
   * （用于echarts配置封装）
   */
  deepClone(obj) {
    var result = Array.isArray(obj) ? [] : {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = this.deepClone(obj[key]) // 递归复制
        } else {
          result[key] = obj[key]
        }
      }
    }
    return result
  },
  
  /**
   * 返回检测项下拉选项
   * （用于element级联）
   */
  getMoniObjOptions() {
    let options = []
    // 一级循环，加载省市下拉选项
    codec.contents.forEach((item, i) => {
      let obj = {
        value: item.id,
        label: item.cn_name,
        children: []
      }

      if (item.subs) {
        // 二级循环
        item.subs.forEach((secondItem, secondI) => {
          let secondObj = {
            value: secondItem.id,
            label: secondItem.cn_name,
          }

          if (secondItem.subs) {
            secondObj.children = []

            // 三级循环
            secondItem.subs.forEach((thirdItem, thirdI) => {
              let thirdObj = {
                value: thirdItem.id,
                label: thirdItem.cn_name,
              }

              // if (thirdItem.children) {
              //   thirdObj.children = []

              //   // 四级循环
              //   thirdItem.children.forEach((fourthItem, fourthI) => {
              //     let fourthObj = {
              //       value: fourthItem.code,
              //       label: fourthItem.name,
              //     }
              //     this.newFormat[fourthItem.code] = fourthItem.name

              //     thirdObj.children.push(fourthObj)
              //   })
              // }

              secondObj.children.push(thirdObj)

            })

          }
          obj.children.push(secondObj)
        })
      }
      options.push(obj)

    })
    return options

  },

  /**
   * 基础规则重组
   * 根据规则id查询相应规则（如检测项、监测内容、阈值、条件类型、条件内容等），转换重组
   * （返回基础规则json对象，key为基础规则id，CN结尾的为重组后的中文）
   */
  transformPolicy() {
    return new Promise((resolve, reject) => {
      // 基础规则监测内容对应表，也许会有更改
      let policyMonitorVal = {
        0: '电压',
        1: '电流',
        2: '距离',
        3: '转速',
        4: '转圈计数',
        5: '温度',
        6: '湿度',
        7: '振动速度',
        8: '振动位移',
        9: '振动加速度',
        10: '风速',
        11: '开/关',
      }
      let params = {
        offset: 1,
        limit: 200
      }
      api.detection.getPolicy(params).then(res => {
        if (!res.data.data.records.length) return
        let list = res.data.data.records

        let json = {}
        list.forEach((item, i) => {
          json[item.id] = {
            "id": item.id,
            "description": item.description,
            "code": item.code,
            "codec": item.codec,
            "calcMethod": item.calcMethod, // 计算方法（见下边计算方法说明）,如: 1 - 瞬时值, 2 - 平均值, 3 - 变化值， 4 - 持续值, 5 - 多次值
            "calcTimeInSeconds": item.calcTimeInSeconds,
            "calcOperator": item.calcOperator,
            "calcValueType": item.calcValueType,
            "calcThreshold": item.calcThreshold,
            "calcUnit": item.calcUnit,
            "conditionFreqency": item.conditionFreqency,
            "conditionDurationInSec": item.conditionDurationInSec,
            "calcThresholdDesc": item.calcThresholdDesc,
            "extensions": item.extensions,
            "monitorObj": "",
            "monitorVal": "",
            "monitorValCN": "",
            "calcOperatorCN": "",
            "calcTimeCN": ""

          }
          // 特殊处理
          // 监测项
          let monitorArr = json[item.id].code.split(':')
          let monitorString = parseInt(monitorArr[0]) + ':' + parseInt(monitorArr[1]) + ':' + parseInt(monitorArr[2])
          json[item.id].monitorObj = monitorString
          json[item.id].monitorObjCN = this.changeMonitorObj(monitorString).join('-')
          // 监测内容
          json[item.id].monitorVal = parseInt(monitorArr[3])
          json[item.id].monitorValCN = policyMonitorVal[parseInt(monitorArr[3])]
          // 比较符号
          if (json[item.id].calcOperator == 1) {
            json[item.id].calcOperatorCN = '大于'
          } else if (json[item.id].calcOperator == 2) {
            json[item.id].calcOperatorCN = '小于'
          } else if (json[item.id].calcOperator == 3) {
            json[item.id].calcOperatorCN = '大于等于'
          } else if (json[item.id].calcOperator == 4) {
            json[item.id].calcOperatorCN = '小于等于'
          } else if (json[item.id].calcOperator == 5) {
            json[item.id].calcOperatorCN = '不等于'
          } else {
            json[item.id].calcOperatorCN = '等于'
          }
          // 时间语言转换
          if (json[item.id].calcMethod === 1) {
            json[item.id].calcTimeCN = '' // 瞬间值
          } else if (json[item.id].calcMethod === 2) {
            json[item.id].calcTimeCN = `${json[item.id].calcTimeInSeconds}秒内` // 平均值
          } else if (json[item.id].calcMethod === 3) {
            json[item.id].calcTimeCN = `${json[item.id].calcTimeInSeconds}秒内` // 变化值
          } else if (json[item.id].calcMethod === 4) {
            json[item.id].calcTimeCN = `持续${json[item.id].calcTimeInSeconds}秒` // 持续值
          } else if (json[item.id].calcMethod === 5) {
            json[item.id].calcTimeCN = `${json[item.id].calcTimeInSeconds}秒内` // 持续值
          }

        })

        // 返回基础规则json
        resolve(json)
      })
    })

  },


  /**
   * TODO 模板重组
   * 根据模板id查询相应信息（如监测名称、监测类型、异常情况应用基础规则的id、消息通知、执行条件）
   * 返回json对象
   */



}
