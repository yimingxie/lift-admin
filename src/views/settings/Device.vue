<template>
  <div id="Device">
    <div class="container">
      <div class="device-data clearfix">
        <div class="device-data-box lift-sum clearfix">
          <div class="ddb-img">
            <img src="../../assets/images/xym/sum-lift.png" alt="">
          </div>
          <div class="ddb-p">
            <h4>{{elev_count}}</h4>
            <p>电梯总数</p>
          </div>
        </div>
        <div class="device-sn clearfix">
          <div class="device-data-box device-sum clearfix">
            <div class="ddb-img">
              <img src="../../assets/images/xym/sum-device.png" alt="">
            </div>
            <div class="ddb-p">
              <h4>{{dev_count}}</h4>
              <p>设备总数</p>
            </div>
          </div>

          <div class="device-oo clearfix">
            <div class="device-oo-box">
              <div class="device-oo-line"></div>
              <div class="doo-num">{{online_count}}</div>
              <div class="doo-p">
                <span class="doo-p-name doo-p-name1">● 在线设备</span>
                <em class="doo-p-line">|</em>
                <span class="doo-p-per">{{online_count_per}}%</span>
              </div>
            </div>
            <div class="device-oo-box">
              <div class="doo-num">{{offline_count}}</div>
              <div class="doo-p">
                <span class="doo-p-name doo-p-name2">● 离线设备</span>
                <em class="doo-p-line">|</em>
                <span class="doo-p-per">{{offline_count_per}}%</span>
              </div>
            </div>
          </div>

        </div>
        

      </div>

      <div class="lift-list">
        <div class="lift-list-title">设备列表</div>
        <div class="ll-choose">
          <div class="ll-choose-top clearfix">
            <!-- 省市联动筛选 -->
            <div class="llct-area">
              <city-choose @childVal="citySelect"></city-choose>
            </div>

            <div class="llct-line"></div>

            <div class="llct-type clearfix">
              <em>在线状态：</em>
              <radio-group :items="exceptItem" :value.sync="exceptValue" style="display: inline-block"></radio-group>
            </div>
            
          </div>

          <div class="ll-choose-bottom clearfix">
            <div class="llcb-operate">
              <div class="llcb-btn info" @click="dialogAddDevice = true">+ 添加设备</div>
            </div>
            <!-- 搜索 -->
            <div class="llcb-search">
              <search-code @childCode="searchLift"></search-code>
            </div>
          </div>
          
        </div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">电梯注册代码</div>
              <div class="llt-th">区域-片区</div>
              <div class="llt-th">详细地址</div>
              <div class="llt-th">在线/设备</div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">
        
            <div class="llt-tr clearfix" v-for="(item, i) in list" :key="i" :class="activeRegCode == item.reg_code ? 'on' : ''">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">{{item.reg_code}}</div>
                <div class="llt-td">{{item.local_area}}</div>
                <div class="llt-td">{{item.address}}</div>
                <div class="llt-td">
                  <p class="llt-td-device" @click="goLiftDevice(item.reg_code)"><span class="llt-td-a">{{item.device_online}}</span>/{{item.device_count}}</p>
                  <div class="llt-td-arrow" @click="showDrop(item.reg_code)"></div>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="goLiftDevice(item.reg_code)">所有设备</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a" @click="itemAddDevice(item.reg_code)">添加设备</span>
                </div>
              </div>
              

              <div class="llt-drop" :class="item.children && item.children.length > 5 ? 'heightFix' : 'heightAuto'">
                <div class="llt-drop-wrap">
       
                  <div class="llt-drop-box" v-for="(childItem, childI) in item.children" :key="childI">
                    <div class="ldrop-left">
                      <div class="ldrop-title">{{childItem.dev_name}}</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● {{childItem.bonline}}</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:{{childItem.dev_eui}}</div>
                        <div class="idd-project"><span>监测项：</span>{{childItem.monitor_obj}}</div>
                        <div class="idd-project"><span>监测内容：</span>{{childItem.monitor_val}}</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a" @click="goDetail(childItem.nativeMonitor_obj, childItem.nativeMonitor_val, item.reg_code)">设备详情</div>
                  </div>

                </div>
              </div>

            </div>
            
          </div>
          
        </div>

      </div>


    </div>

    <footer-temp></footer-temp>


    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogAddDevice" title="添加设备" :show-close="false" width="690px" @closed="dialogClosed">
      <div>
        <!-- <div class="dia-title">添加设备</div> -->
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
import RadioGroup from '../../components/RadioGroup'
import Footer from '../common/fotter'
import CityChoose from '../../components/CityChoose'
import SearchCode from '../../components/SearchCode'


export default {
  data() {
    return {
      dataValue: '',
      dialogAddDevice: false,
      exceptItem: [
        {label: '全部', value: -1},
        {label: '在线', value: 1},
        {label: '离线', value: 0},
  
      ],
      exceptValue: -1,
      list: [],
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
      modelContentList: {},
      nativeMonitor_obj: '',
      nativeMonitor_val: '',
      liftParams: {
        "page": {"offset": 1, "limit": 10},
        "query": {}
      },
      liftDeviceParams: {
        // "page": {"offset": 1, "limit": 10},
        "query": {"bonline": -1}
      },
      activeRegCode: '',
      elev_count: 0,
      dev_count: 0,
      online_count: 0,
      offline_count: 0,
      online_count_per: 0,
      offline_count_per: 0,


    }
  },
  mounted() {
    
    // 重组监测内容表
    this.transformMonitorVal()

    // 查询维保设备统计
    this.getStatistics()

    // 获取电梯列表
    this.getLiftList()

    // 加载检测项下拉
    this.getMoniObjOptions()
    
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

    // 区域筛选
    citySelect(cityArr) {
      this.activeRegCode = ''
      this.liftParams.query.area_code = cityArr[cityArr.length-1]
      this.getLiftList()
    },

    // 查询电梯列表
    getLiftList() {
      api.device.getLiftList(JSON.stringify(this.liftParams)).then(res => {
        let liftList = res.data.data.records
        this.list = res.data.data.records
      })
    },

    // 查询维保设备统计
    getStatistics() {
      api.lift.getStatistics().then(res => {
        let stat = res.data.data
        this.dev_count = stat.dev_count
        this.online_count = stat.online_count
        this.elev_count = stat.elev_count
        this.offline_count = this.dev_count - this.online_count
        this.online_count_per = (this.online_count / this.dev_count).toFixed(2) * 100
        this.offline_count_per = 100 - this.online_count_per
      })
    },

    // 搜索
    // 监听子组件获取注册码，发送请求搜索并重新渲染列表
    searchLift(reg_code) {
      this.activeRegCode = ''
      this.liftParams.query.reg_code = reg_code
      this.getLiftList()
    },

    // 单部电梯设备列表下拉
    showDrop(reg_code) {
      let that = this
      // 控制收缩展开
      if (this.activeRegCode == reg_code) {
        this.activeRegCode = ''
        return
      }
      this.activeRegCode = reg_code
      this.list.forEach((item, i) => {
        if (item.reg_code == reg_code) {

          // 根据电梯注册码查询设备列表
          api.lift.getLiftDevice(item.reg_code, JSON.stringify(this.liftDeviceParams)).then(res => {
            let liftDeviceList = []
            
            if (res.data.data.records) {
              liftDeviceList = res.data.data.records
            }
            console.log('777', liftDeviceList)

            let children = []
            liftDeviceList.forEach((item, i) => {
              console.log(item.bonline)

              let bonline = item.bonline === 1 ? '在线' : '离线'
              let monitor_obj = xymFun.changeMonitorObj(item.monitor_obj).join('-')
              
              children.push({
                dev_name: item.dev_name,
                bonline: bonline,
                dev_eui: item.dev_eui,
                monitor_obj: monitor_obj,
                monitor_val: this.modelContentList[item.monitor_val],
                nativeMonitor_obj: item.monitor_obj,
                nativeMonitor_val: item.monitor_val,
              })

            })
  
            that.$set(item, 'children', children)
            
          })

        }
      })

    },

    // 加载检测项下拉
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

    // 检测项选中值
    moniObjChange(monitor_obj) {
      this.ruleForm.monitor_obj = monitor_obj.join(':')
    },

    // 搜索通用后台设备，填充数据
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

    // 提交，维保平台新增设备
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

    // 关闭弹窗，重置表单
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

    goLiftDevice(reg_code) {
      this.$router.push({
        path: '/lift-device',
        query: {
          reg_code: reg_code
        }
      })
    }
    

  },
  watch: {
    // 在线离线状态筛选
    exceptValue(val, oldVal) {
      this.activeRegCode = ''
      this.liftDeviceParams.query.bonline = val
      this.getLiftList()
    }
  },
  components: {
    'radio-group': RadioGroup,
    'footer-temp': Footer,
    'city-choose': CityChoose,
    'search-code': SearchCode,
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'
#Device{
  .container{
    line-height 1;
  }
  .device-data{
    padding: 20px;
  }
  .device-data-box{
    float left;
    height 96px;
  }
  .lift-sum{
    width 23%;
    border-radius: 8px;
    background-image: linear-gradient(90deg, #4272FF 0%, #6159FF 100%);
    box-shadow: 0 8px 20px -10px rgba(27,69,191,0.60);
  }
  .device-sn{
    float left;
    margin-left 2%;
    width 75%;
    background #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .device-sum{
    width 33%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-image: linear-gradient(90deg, #72EEB4 0%, #78D2A7 100%);
    box-shadow: 8px 0 20px -10px rgba(144,191,27,0.60);
  }
  .ddb-img{
    float left;
    width 40px;
    height 40px;
    margin-top 26px;
    margin-left 40px;
  }
  .ddb-p{
    float left;
    margin-left 20px;
  }
  .ddb-p h4{
    font-size 30px;
    color #fff;
    margin-top 20px;
  }
  .ddb-p p{
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    margin-top 10px;
  }
  .device-oo{
    float left;
    width 67%;
  }
  .device-oo-box{
    position relative;
    float left;
    width 50%;
    height 96px;
    border-radius: 8px;
    text-align center;
  }
  .device-oo-line{
    position absolute;
    right 0;
    top 26px;
    width 1px;
    background #D8DDDF;
    height 48px;
  }
  .doo-num{
    font-weight bold;
    font-size: 30px;
    color: #34414C;
    margin-top 20px;
  }
  .doo-p{
    font-size 14px;
    margin-top 10px;
  }
  .doo-p-name1{
    color: #4272FF;
  }
  .doo-p-name2{
    color: #E9645D;
  }
  .doo-p em{
    vertical-align middle;
    font-style normal;
    display inline-block;
    margin 0 8px;
    color #919EA5;
    font-size 12px;
    margin-top -4px;
  }
  .doo-p-per{
    color: #34414C;
  }

  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 15%;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 12%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 16%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 43%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 14%;
  }
  .llt-drop-wrap{
    width 48.8%;
  }
  .el-form-item{
    margin-bottom 14px !important;
  }
  
}

</style>
