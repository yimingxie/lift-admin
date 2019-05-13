<template>
  <div id="TestDeviceDetail">
    <div class="container">
      <h1>详情页</h1>
      <div class="detail-basic">
        <h2>基础信息</h2>
        <table style="width: 100%;background: white;">
          <tr>
            <td style="width: 25%">设备ID：{{deviceInfo.devEUI}}</td>
            <td style="width: 25%">设备类型：{{deviceInfo.devType}}</td>
            <td style="width: 25%">设备型号：{{deviceInfo.devModel}}</td>
            <td style="width: 25%">设备名称：{{deviceInfo.devName}}</td>
          </tr>
          <tr>
            <td style="width: 25%">监测数据：{{monitorContent}}</td>
            <td style="width: 25%">是否在线：{{deviceInfo.theOnline ? "是" : "否"}}</td>
            <td style="width: 25%">安装日期：{{deviceInfo.installDate}}</td>
          </tr>
          
        </table>
      </div>


    </div>

  </div>
</template>

<script>
import HTTP from '../../utils/http.js'
import codec from './codec_v1.json'

export default {
  data() {
    return {
      devEUI: '',
      deviceInfo: {},
      monitorContent: ''

    }
  },
  mounted() {
    this.devEUI = this.$route.query.id
    this.$store.commit('SWITCH_LAYOUT', 'admin')

    this.getDevice()



  },
  methods: {

    // 获取单个设备
    getDevice() {
      let url = 'http://192.168.100.89:9090/gi/test/device/' + this.devEUI
      var encodedURL = encodeURI(url)
      console.log(encodedURL)

      HTTP.get(encodedURL).then(res => {
        console.log(res)
        this.deviceInfo = res.data.result

        // 遍历字符串
        let monitorStr = this.deviceInfo.monitorObject + ':' + this.deviceInfo.monitorContent
        let monitorArr = monitorStr.split(':')
        this.monitorContent = this.formatCodec(monitorArr)[3]

      })

    },

    // 遍历级联json结构
    // 传入数组 ['1', '2', '0', '0']，返回 ['机房', '空间', '环境', '温度']
    formatCodec(monitorArr) {

      console.log(monitorArr)

      let arr = []

      codec.contents.forEach((item, i) => {
        console.log(item)

        // 一级循环
        if (item.id == monitorArr[0] ) {
          arr.push(item.cn_name)

          // 二级循环
          item.subs.forEach((secondItem, secondI) => {
            if (secondItem.id == monitorArr[1]) {
              arr.push(secondItem.cn_name)

              // 三级循环
              secondItem.subs.forEach((thirdItem, thirdI) => {
                if (thirdItem.id == monitorArr[2]) {
                  arr.push(thirdItem.cn_name)

                  // 四级循环
                  thirdItem.subs.forEach((fourthItem, fourthI) => {
                    if (fourthItem.id == monitorArr[3]) {
                      arr.push(fourthItem.cn_name)
                    }
                  })
                }
              })
            }
          })
        }
      })

      console.log(arr)


      return arr // arr = ['机房', '空间', '环境', '温度']
    }


  },
  components: {

  }
}
</script>

<style lang="stylus">
#TestDeviceDetail{
  .container{
    padding: 100px 20px 20px 240px;
  }
  .detail-basic table td {
    padding: 10px;
  }
}

</style>
