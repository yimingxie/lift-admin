<template>
  <div id="TestDeviceEdit">
    <div class="container">
      <h1>编辑设备</h1>
      <div class="edit-content clearfix">
        <div class="edit-box clearfix">
          <p><span>*</span>设备ID</p>
          <div class="edit-box-input">
            <el-input v-model="deviceInfo.devEUI" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p><span>*</span>设备类型</p>
          <div class="edit-box-input">
            <el-select v-model="deviceInfo.devType" placeholder="请选择">
              <el-option v-for="item in type.list" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p><span>*</span>设备型号</p>
          <div class="edit-box-input">
            <el-input v-model="deviceInfo.devModel" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p><span>*</span>设备名称</p>
          <div class="edit-box-input">
            <el-input v-model="deviceInfo.devName" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p>安装电梯</p>
          <div class="edit-box-input">
            <el-input v-model="deviceInfo.elevatorId" placeholder="请输入注册代码"></el-input>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p>安装日期</p>
          <div class="edit-box-input">
            <el-date-picker v-model="deviceInfo.installDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>

        <div class="edit-box clearfix">
          <p><span>*</span>监测对象</p>
          <div class="edit-box-input">
            <el-cascader :options="monitorOptions" v-model="monitorObject" @change="monitorObjectChange"></el-cascader>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p><span>*</span>监测内容</p>
          <div class="edit-box-input">
            <el-select v-model="monitorContent" placeholder="请选择">
              <el-option v-for="item in monitorContentOptions" :key="item.id" :label="item.cn_name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="edit-box clearfix">
          <p>使用状态</p>
          <div class="edit-box-input" style="margin-top: 8px;">
            <el-switch v-model="deviceInfo.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </div>
        </div>
      </div>

      <div style="text-align: center;margin-top: 50px;">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="goList">取消</el-button>
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

      monitorObject: [], // 渲染到表单的监测对象
      monitorOptions: [], // 监测对象配置
      monitorContent: '', // 渲染到表单的监测内容
      monitorContentOptions: [], // 监测内容配置
      
      type: {
        value: '',
        list: [
          {name: '传感器'},
          {name: '控制器'},
          {name: '监控器'}
        ]
      }

    }
  },
  mounted() {
    this.devEUI = this.$route.query.id
    this.$store.commit('SWITCH_LAYOUT', 'admin')

    // 生成级联配置
    this.eleCodec()

    this.getDevice()


  },
  methods: {
    // 获取单个设备
    getDevice() {
      let url = 'http://192.168.100.89:9090/gi/test/device/' + this.devEUI
      var encodedURL = encodeURI(url)
      console.log(encodedURL)

      HTTP.get(encodedURL).then(res => {
        let arr = []
        console.log(res)
        this.deviceInfo = res.data.result
        
        // 渲染监测对象
        let monitorObjectArr = this.deviceInfo.monitorObject.split(':')
        // 将字符串转为数字型
        monitorObjectArr.forEach((item, i) => {
          arr.push(parseInt(item))
        })
        this.monitorObject = arr

        // 渲染监测内容
        this.getMonitorContentOptions(this.monitorObject)
        this.monitorContent = parseInt(this.deviceInfo.monitorContent)

      })

    },

    // 转化json 生成三级级联下拉配置
    eleCodec() {

      // 一级循环
      codec.contents.forEach((item, i) => {
        let obj = {
          value: item.id,
          label: item.cn_name,
          children: []
        }

        // 二级循环
        item.subs.forEach((secondItem, secondI) => {
          let secondObj = {
            value: secondItem.id,
            label: secondItem.cn_name,
            children: []
          }

          // 三级循环
          secondItem.subs.forEach((thirdItem, thirdI) => {
            let thirdObj = {
              value: thirdItem.id,
              label: thirdItem.cn_name
            }

            secondObj.children.push(thirdObj)
          })

          obj.children.push(secondObj)
        })

        this.monitorOptions.push(obj)

      })

    },

    // 生成最后一级监测对象的下拉配置
    // 传入数组 ['1', '2', '0']，生成最后一级监测对象的下拉配置
    getMonitorContentOptions(monitorArr) {

      let arr = []

      codec.contents.forEach((item, i) => {

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

                  if (thirdItem.subs.length) {
                    // 四级循环
                    thirdItem.subs.forEach((fourthItem, fourthI) => {
                      let obj = {
                        id: fourthItem.id,
                        cn_name: fourthItem.cn_name
                      }
                      this.monitorContentOptions.push(obj)
                    })

                  }

                }
              })
            }
          })
        }
      })

      console.log(arr)

      return arr 
    },


    // 级联改变时，联动第四级的监测内容
    monitorObjectChange(monitorArr) {
      console.log(monitorArr)
      this.monitorContentOptions = []
      this.getMonitorContentOptions(monitorArr)
      this.monitorContent = 0
    },

    // 返回列表页
    goList() {
      this.$router.push('test-device')
    },

    // 提交修改
    submit() {
      // monitorObject 和 monitorContent 请求的数据和渲染的有区别，需要特殊处理
      let obj = {
        "devEUI": this.deviceInfo.devEUI,
        "devType": this.deviceInfo.devType,
        "devModel": this.deviceInfo.devModel,
        "devName": this.deviceInfo.devName,
        "monitorObject": this.monitorObject.join(':'),
        "monitorContent": this.monitorContent.toString(),
        "elevatorId": this.deviceInfo.elevatorId,
        "maintenanceUnitName": this.deviceInfo.maintenanceUnitName,
        "status": this.deviceInfo.status
      }
      console.log(obj)
      HTTP.put('http://192.168.100.89:9090/gi/test/device/', obj).then(res => {
        alert('修改成功')
        this.$router.push('test-device')
      })

    }

  },
  components: {

  }
}
</script>

<style lang="stylus">
#TestDeviceEdit{
  .container{
    padding: 100px 20px 20px 240px;
  }
  .detail-basic table td {
    padding: 10px;
  }
  .edit-box{
    float: left;
    width: 50%;
    margin-top: 20px;
  }
  .edit-box p{
    float: left;
    width: 16%;
    padding: 0 3%;
    line-height: 40px;
    text-align: right;
  }
  .edit-box p span{
    color: red;
  }
  .edit-box-input{
    float: left;
    width: 70%;
  }



}

</style>
