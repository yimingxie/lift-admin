import codec from './codec_v1.json'

export default {
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
   * TODO转化监测内容
   */
  // changeMonitorVal() {

  // }

}
