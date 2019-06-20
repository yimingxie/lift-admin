<template>
  <div id="LiftDevice">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">设备列表</span>
      </div>

      <div class="lift-list">
        <div class="lift-device-head">
          <div class="lift-dh-p">
            <h3>{{elev_name}} {{in_num}}</h3>
            <p>{{local_area}} {{address}} &nbsp;&nbsp;&nbsp; 注册代码：{{reg_code}}</p>
          </div>
          <div class="llcb-btn info" @click="itemAddDevice(reg_code)">+ 添加设备</div>
        </div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">设备类型-名称</div>
              <div class="llt-th">检测项</div>
              <div class="llt-th">检测内容</div>
              <div class="llt-th">设备ID</div>
              <div class="llt-th">在线状态</div>
              <div class="llt-th">安装时间</div>
              <div class="llt-th">安装人员</div>
              <div class="llt-th">更换记录</div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">

            <div class="llt-tr clearfix"  :class="[activeRegCode === i ? 'on' : '', item.bonline == '在线' ? '' : 'offline']" v-for="(item, i) in liftDeviceList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">{{item.dev_type}}-{{item.dev_name}}</div>
                <div class="llt-td">{{item.monitor_obj}}</div>
                <div class="llt-td">{{item.monitor_val}}</div>
                <div class="llt-td">{{item.dev_eui}}</div>
                <div class="llt-td">
                  <div class="lift-device-status"><span>●</span>{{item.bonline}}</div>
                </div>
                <div class="llt-td">{{item.assemb_time}}</div>
                <div class="llt-td">{{item.assemb_id}}</div>
                <div class="llt-td">
                  <p class="llt-td-device">{{item.replace_count}}</p>
                  <div class="llt-td-arrow" @click="showDrop(item.nativeMonitor_obj, item.nativeMonitor_val, item.reg_code, i)"></div>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="goDetail(item.nativeMonitor_obj, item.nativeMonitor_val, item.reg_code)">查看详情</span>
                </div>
              </div>

              <!-- 下拉 -->
              <div class="llt-drop" :class="item.children && item.children.length > 5 ? 'heightFix' : 'heightAuto'">
                <div class="lift-device-tr clearfix" v-for="(childItem, childI) in item.children" :key="childI">
                  <div class="ld-td"></div>
                  <div class="ld-td"></div>
                  <div class="ld-td"></div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;">{{childItem.dev_eui}}</div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;"></div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;">{{childItem.assemb_time}}</div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;">{{childItem.assemb_id}}</div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;"></div>
                  <div class="ld-td"></div>
                </div>
       
              </div>
            </div>

            
          </div>
          
        </div>

      </div>

    </div>

    <footer-temp></footer-temp>

    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogAddDevice" :show-close="false" width="690px" @closed="dialogClosed">
      <div>
        <div class="dia-title">添加设备</div>
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head">基础信息</div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备ID：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="dev_eui">
                    <el-input v-model="ruleForm.dev_eui" size="small" placeholder="请输入设备ID" @blur="searchDevEui"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">安装日期：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="assemb_time">
                    <el-date-picker v-model="ruleForm.assemb_time" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </div>
              </div>

              <!-- TODO 人员搜索下拉 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">安装人员：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="assemb_id">
                    <el-input v-model="ruleForm.assemb_id" size="small" placeholder="安装人员"></el-input>
                  </el-form-item>
                </div>
              </div>

            </div>
            <div class="dia-con-head" style="padding-top: 6px;">安装电梯信息</div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">电梯注册代码：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="reg_code">
                    <el-input v-model="ruleForm.reg_code" size="small" placeholder="电梯注册码"></el-input>
                  </el-form-item>
                </div>
              </div>
                

              <!-- 联动 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">检测项：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="monitor_obj">
                    <el-cascader ref="moniCascader" placeholder="请选择" :options="moniObjOptions" v-model="selectedMoniObjOptions" size="small" @change="moniObjChange" style="width: 100%;"></el-cascader>
                  </el-form-item>
                </div>
              </div>
        
            </div>

          </el-form>

        </div>
        <div class="dia-btn-con">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消" @click="dialogClosed">
          <input class="dia-btn dia-btn-submit" @click="submit" type="button" value="确认">
        </div>

      </div>

  
    </el-dialog>

  </div>
</template>

<script>
import api from '../../api'
import codec from '../../utils/codec_v1.json'
import xymFun from '../../utils/xymFun'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      dialogAddDevice: false,
      reg_code: this.$route.query.reg_code,
      elev_name: '',
      in_num: '',
      local_area: '',
      address: '',
      liftDeviceList: [],
      modelContentList: {},
      activeRegCode: '',
      ruleForm: {
        dev_eui: '',
        assemb_time: '',
        assemb_id: '',
        reg_code: '',
        monitor_obj: '',
        monitor_val: '',
      },
      rules: {
        // reg_code: [
        //   { required: true, message: '请输入电梯注册代码', trigger: 'blur' },
        // ],
      },
      moniObjOptions: [],
      selectedMoniObjOptions: [],
      liftDeviceParams: {
        "query": {"bonline": "-1"}
      }

    }
  },
  mounted() {
    // 重组监测内容表
    this.transformMonitorVal()

    // 加载检测项下拉
    this.getMoniObjOptions()

    // 获取电梯详情
    this.getLiftDetail()

    // 获取电梯设备列表
    this.getLiftDevice()
  },
  methods: {
    // 获取所有监测内容表，重组表，其中的id与设备类型中的监测内容对应
    transformMonitorVal() {
      api.device.getMonitorVal().then(res => {
        this.modelContentList = {}
        res.data.data.forEach((item, i) => {
          this.modelContentList[item.id] = item.monitor_val
        })
      })
    },

    // 获取电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.reg_code).then(res => {
        let detail = res.data.data
        this.elev_name = detail.elev_name
        this.in_num = detail.in_num
        this.local_area = detail.local_area
        this.address = detail.address
      })


    },

    // 获取电梯设备列表
    getLiftDevice() {
      api.lift.getLiftDevice(this.reg_code, JSON.stringify(this.liftDeviceParams)).then(res => {
        this.liftDeviceList = res.data.data.records
        this.liftDeviceList.forEach((item, i) => {
          item.nativeMonitor_obj = item.monitor_obj
          item.nativeMonitor_val = item.monitor_val
          item.monitor_obj = xymFun.changeMonitorObj(item.monitor_obj).join('-')
          item.monitor_val = this.modelContentList[item.monitor_val]
          item.bonline = item.bonline == 1 ? '在线' : '离线'
        })
      })

    },

    // 设备详情跳转
    goDetail(monitor_obj, monitor_val, reg_code) {
      this.$router.push({
        path: '/device-detail',
        query: {
          monitor_obj: monitor_obj,
          monitor_val: monitor_val,
          reg_code: reg_code
        }
      })
    },

    // item添加设备
    itemAddDevice(reg_code) {
      this.dialogAddDevice = true
      this.ruleForm.reg_code = reg_code
    },

    // （弹窗）加载检测项下拉
    getMoniObjOptions() {

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
        this.moniObjOptions.push(obj)

      })
    },

    // （弹窗）检测项选中值
    moniObjChange(monitor_obj) {
      this.ruleForm.monitor_obj = monitor_obj.join(':')
    },

    // （弹窗）关闭弹窗，重置表单
    dialogClosed() {
      this.$refs.diaForm.resetFields()
      this.ruleForm = {
        dev_eui: '',
        assemb_time: '',
        assemb_id: '',
        reg_code: '',
        monitor_obj: '',
        monitor_val: '',
      }
      this.dialogAddDevice = false
    },

    // （弹窗）搜索通用后台设备，填充数据
    searchDevEui() {
      let that = this
      let dev_eui = this.ruleForm.dev_eui

      api.device.searchDevEui(dev_eui).then(res => {
        // alert('搜索中')
        if (!res.data.data) {
          alert('设备ID不存在')
          this.$refs.diaForm.resetFields();
          this.ruleForm.dev_eui = dev_eui
          return
        }
        console.log(res.data)
        alert('设备存在，请继续填写')

        let list = res.data.data
        this.ruleForm.monitor_val = list.monitor_val

      })
      .catch(err => {
        alert('网络错误')
      })
    },

    // （弹窗）提交，维保平台新增设备
    submit() {
      let that = this
      this.$refs.diaForm.validate(valid => {
        if (valid) {
          alert('submit')
          console.log(this.ruleForm)
          api.device.addDeviceMainten(this.ruleForm).then(res => {
            if (res.data.code == '200') {
              that.$message.success(`${res.data.message}`)
              this.$router.go(0)
            } else {
              that.$message.error(`${res.data.message}`)
            }
          })
        }
      })
    },

    // 更换记录下拉
    showDrop(monitor_obj, monitor_val, reg_code, i) {
      console.log(monitor_obj, monitor_val, reg_code, i)
      let that = this
      // 控制收缩展开
      if (this.activeRegCode === i) {
        return this.activeRegCode = ''
      }
      console.log(this.activeRegCode)
      let params = {
        monitor_obj: monitor_obj,
        monitor_val: monitor_val,
        reg_code: reg_code
      }

      api.device.deviceChangeLog(JSON.stringify(params)).then(res => {
        this.activeRegCode = i // 请求成功则展开
        console.log('更换记录', res.data)
        // 添加下拉，根据索引
        this.liftDeviceList[i].children = res.data.data
      })

    }


  },
  components: {
    'footer-temp': Footer,


  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'

#LiftDevice{
  .lift-device-head{
    position relative;
    padding: 20px;
  }
  .lift-dh-p{
    padding-right 160px;
  }
  .lift-dh-p h3{
    font-size: 20px;
    color: #34414C;
    line-height: 28px;
    font-weight normal;
  }
  .lift-dh-p p{
    font-size: 14px;
    color: #7E8A95;
    margin-top 8px;
  }
  .lift-device-head .llcb-btn{
    position absolute;
    top 26px;
    right 20px;
  }
  .llt-tr .llt-th:nth-child(1),.llt-tr .llt-td:nth-child(1),.lift-device-tr .ld-td:nth-child(1){
    width 12%;
  }
  .llt-tr .llt-th:nth-child(2),.llt-tr .llt-td:nth-child(2),.lift-device-tr .ld-td:nth-child(2){
    width 19%;
  }
  .llt-tr .llt-th:nth-child(3),.llt-tr .llt-td:nth-child(3),.lift-device-tr .ld-td:nth-child(3){
    width 9%;
  }
  .llt-tr .llt-th:nth-child(4),.llt-tr .llt-td:nth-child(4),.lift-device-tr .ld-td:nth-child(4){
    width 12%;
  }
  .llt-tr .llt-th:nth-child(5),.llt-tr .llt-td:nth-child(5),.lift-device-tr .ld-td:nth-child(5){
    width 11%;
  }
  .llt-tr .llt-th:nth-child(6),.llt-tr .llt-td:nth-child(6),.lift-device-tr .ld-td:nth-child(6){
    width 12%;
  }
  .llt-tr .llt-th:nth-child(7),.llt-tr .llt-td:nth-child(7),.lift-device-tr .ld-td:nth-child(7){
    width 9%;
  }
  .llt-tr .llt-th:nth-child(8),.llt-tr .llt-td:nth-child(8),.lift-device-tr .ld-td:nth-child(8){
    width 9%;
  }
  .llt-tr .llt-th:nth-child(9),.llt-tr .llt-td:nth-child(9),.lift-device-tr .ld-td:nth-child(9){
    width 7%;
  }
  .llt-drop{
    // max-height 270px;
  }
  .llt-tr.on .llt-drop.heightFix{
    height 270px;
  }
  .llt-td-arrow{
    right auto;
    left 60px;
  }
  .llt-tr.offline .llt-tr-container .llt-td:nth-child(1){
    color #c2c7cc;
  }
  .llt-tr.offline .llt-tr-container .llt-td:nth-child(2){
    color #c2c7cc;
  }
  .llt-tr.offline .llt-tr-container .llt-td:nth-child(3){
    color #c2c7cc;
  }
  .llt-tr.offline .llt-tr-container .llt-td:nth-child(4){
    color #c2c7cc;
  }
  .llt-tr.offline .llt-tr-container .llt-td:nth-child(5){
    color #c2c7cc;
  }
  .llt-tr.offline .lift-device-status span{
    color #C2C7CC;
  }

}



</style>
