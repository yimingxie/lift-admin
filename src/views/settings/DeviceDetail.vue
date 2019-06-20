<template>
  <div id="DeviceDetail">
    <div class="container">
      <div class="bread-nav">
        <span>设备管理</span>
        <em>/</em>
        <span class="on">设备详情</span>
      </div>
      <div class="device-detail-info clearfix">
        <div class="ddi-img">
          <img v-if="bonline == 1" src="../../assets/images/xym/device.png" alt="">
          <img v-else src="../../assets/images/xym/device-offline.png" alt="">
          <h3 :class="bonline == 0 ? 'offline' : ''">{{bonline == 1 ? '在线' : '离线'}}</h3>
          <p>{{dev_name}}</p>
        </div>
        <div class="ddi-data">
          <div class="ddi-data-wrap">
            <div class="ddi-data-icon clearfix">
              <div class="ddid-icon-del" @click="deleteDevice"></div>
              <div class="ddid-icon-line">|</div>
              <div class="ddid-icon-edit" @click="editDevice"></div>
            </div>
            <div class="ddi-data-id">设备ID：{{dev_eui}}</div>
            <div class="ddi-table clearfix" style="margin-top: 10px;">
              <div class="ddi-td"><span>设备型号：</span>{{dev_model}}</div>
              <div class="ddi-td"><span>监测内容：</span>{{monitor_val}}</div>
              <div class="ddi-td"><span>设备品牌：</span>{{dev_brand}}</div>
              <div class="ddi-td"><span>安装人员：</span>{{assemb_id}}</div>
              <div class="ddi-td"><span>安装时间：</span>{{assemb_time}}</div>
            </div>
            <div class="ddi-table clearfix" style="margin-top: 10px;border-top: 1px dashed #D8DDDF;padding-top: 10px;">
              <div class="ddi-td"><span>关联电梯：</span><em style="color: #4272FF;font-style: normal;">{{reg_code}}</em></div>
              <div class="ddi-td"><span>城市区域：</span>{{local_area}}</div>
              <div class="ddi-td"><span>使用地址：</span>{{address}}</div>
            </div>
            <div class="ddi-table clearfix">
              <div class="ddi-td"><span>监测项：</span>{{monitor_obj}}</div>
            </div>
          </div>
          
        </div>

      </div>

      <div class="lift-list">
        <div class="lift-list-title">离线记录</div>
     
        <div class="ll-table" style="border-top: none;padding-bottom: 30px;">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">离线时间</div>
              <div class="llt-th">恢复时间</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="llt-tr clearfix" v-for="(item, i) in lineListPart" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">{{item.offlineTime}}</div>
                <div class="llt-td">{{item.onlineTime}}</div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="list-page">
            <el-pagination
              @size-change="pageSizeChange"
              @current-change="currentPageChange"
              :current-page="currentPage"
              :page-sizes="[10, 2, 4]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="totalPage">
            </el-pagination>
          </div>
            
        </div>

        

      </div>

    </div>

    <footer-temp></footer-temp>

    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogEditDevice" :show-close="false" width="690px">
      <div>
        <div class="dia-title">编辑设备</div>
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head">基础信息</div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备ID：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="dev_eui">
                    <el-input v-model="ruleForm.dev_eui" size="small" placeholder="请输入设备ID"></el-input>
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
                
              <!-- 检测项联动 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">检测项：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="monitor_obj">
                    <el-cascader ref="moniCascader" placeholder="请选择" :options="moniObjOptions" v-model="selectedMoniObjOptions" size="small" @change="moniObjChange" style="width: 100%;"></el-cascader>
                  </el-form-item>
                </div>
              </div>
              <!-- 检测内容联动 -->
              <!-- <div class="dia-citem clearfix">
                <div class="dia-citem-label">检测内容：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="monitor_val">
                    <el-select v-model="selectedMoniValOptions" placeholder="请选择" size="small">
                      <el-option v-for="item in moniValOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div> -->


              
        
            </div>

          </el-form>
        </div>

        <div class="dia-btn-con">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消" @click="dialogEditDevice = false">
          <input class="dia-btn dia-btn-submit" type="button" value="确认" @click="submit">
        </div>
      </div>


    </el-dialog>

  </div>
</template>

<script>
import codec from '../../utils/codec_v1.json'
import api from '../../api'
import xymFun from '../../utils/xymFun'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      modelContentList: {},
      bonline: "",
      dev_eui: "",
      dev_model: "",
      monitor_val: "",
      dev_brand: "",
      assemb_id: "",
      assemb_time: "",
      reg_code: "",
      local_area: "",
      address: "",
      monitor_obj: "",
      dev_type: "",
      dev_name: "",
      nativeMonitor_obj: '',
      nativeMonitor_val: '',
      dialogEditDevice: false,
      ruleForm: {
        dev_eui: "设备ID",
        monitor_obj: "监测项(区域:零部件:检测对象)",
        assemb_id: "安装人员，user_id",
        assemb_time: "安装时间",
        reg_code: "电梯注册代码"
      },
      rules: {
        // dev_eui: [
        //   { required: true, message: '请输入电梯注册代码', trigger: 'blur' },
        // ],
      },
      moniObjOptions: [],
      selectedMoniObjOptions: [],
      // moniValOptions: [],
      // selectedMoniValOptions: [],
      lineList: [], // 总数据
      lineListPart: [], // 用于分页展示
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

    }
  },
  mounted() {
    // 获取所有监测内容表，重组表
    this.transformMonitorVal()

    // 获取详细信息
    this.getDetail()

    // 加载检测项下拉
    this.getMoniObjOptions()



  },
  methods: {
    // 获取所有监测内容表，重组表，其中的id与设备类型中的监测内容对应
    transformMonitorVal() {
      api.device.getMonitorVal().then(res => {
        this.modelContentList = {}
        this.moniValOptions = []
        res.data.data.forEach((item, i) => {
          this.modelContentList[item.id] = item.monitor_val
        })
      })
    },

    // 获取设备详情
    getDetail() {
      let that = this
      let query = {
        monitor_obj: this.$route.query.monitor_obj,
        monitor_val: this.$route.query.monitor_val,
        reg_code: this.$route.query.reg_code
      }

      api.device.getDetailMainten(JSON.stringify(query)).then(res => {
        let detail = res.data.data
        this.dev_name = detail.dev_name
        this.bonline = detail.bonline
        this.dev_eui = detail.dev_eui
        this.dev_model = detail.dev_model
        this.monitor_val = that.modelContentList[detail.monitor_val]
        this.dev_brand = detail.dev_brand
        this.assemb_id = detail.assemb_id
        this.assemb_time = detail.assemb_time
        this.reg_code = detail.reg_code
        this.local_area = detail.local_area
        this.address = detail.address
        this.monitor_obj = xymFun.changeMonitorObj(detail.monitor_obj).join('-')

        this.nativeMonitor_obj = detail.monitor_obj
        this.nativeMonitor_val = detail.monitor_val

        // 查询设备上下线记录
        this.getDeviceBonline()
      })

    },

    // 查询设备上下线记录
    getDeviceBonline() {
      api.device.getDeviceBonline(this.dev_eui).then(res => {
        console.log('上下线记录', res.data)
        let tempArr = res.data.data
        // 数组开头加离线时间--
        tempArr.unshift({rec_time: "--", bonline: 0, dev_id: ""})

        // 如果数组末尾为离线时间，则恢复时间待定为--
        if (tempArr[tempArr.length-1].bonline == 0) {
          tempArr.push({rec_time: "--", bonline: 1, dev_id: ""})
        }
        this.lineList = []
        for (var i = 0; i < tempArr.length - 1; i += 2) {
          let itemArr = []
          let itemObj = {}
          if (tempArr[i].bonline == 1) {
            itemObj.onlineTime = tempArr[i].rec_time
            itemObj.offlineTime = tempArr[i+1].rec_time
          } else {
            itemObj.offlineTime = tempArr[i].rec_time
            itemObj.onlineTime = tempArr[i+1].rec_time
          }

          this.lineList.unshift(itemObj)
        }

        // 用于分页
        this.totalPage = this.lineList.length
        this.lineListPart = this.lineList.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
        
      })
    },

    // 分页切换
    currentPageChange(currentPage) {
      console.log(currentPage)
      // 1 [0, 2]   2 [2, 4]    3 [4, 6]   4 [6, 8]
      this.lineListPart = this.lineList.slice((currentPage-1)*this.pageSize, (currentPage-1)*this.pageSize+2)
    },

    // 分页大小切换
    pageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getDeviceBonline()
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

    // 编辑设备
    editDevice() {
      let that = this
      this.dialogEditDevice = true

      // 赋旧值
      this.ruleForm.dev_eui = this.dev_eui
      this.ruleForm.assemb_time = this.assemb_time
      this.ruleForm.assemb_id = this.assemb_id
      this.ruleForm.reg_code = this.reg_code
      this.ruleForm.monitor_obj = this.nativeMonitor_obj
      this.selectedMoniObjOptions = []
      // 字符串元素转为数字
      this.selectedMoniObjOptions.push(parseInt(this.nativeMonitor_obj.split(':')[0]), parseInt(this.nativeMonitor_obj.split(':')[1]), parseInt(this.nativeMonitor_obj.split(':')[2]))

      this.ruleForm.monitor_val = this.nativeMonitor_val

    },

    // 删除设备（维保企业）
    deleteDevice() {
      let that = this
      let params = {
        monitor_obj: this.nativeMonitor_obj,
        monitor_val: this.nativeMonitor_val,
        reg_code: this.reg_code
      }
      api.device.deleteDeviceMainten(params).then(res => {
        if (res.data.code == '200') {
          that.$message.success(`${res.data.message}`)
          that.$router.push({path: '/device'})
        } else {
          that.$message.error(`${res.data.message}`)
        }
      })

    },

    // 提交
    submit() {
      let that = this
      let submitJson = {
        old: {
          dev_eui: this.dev_eui,
          monitor_obj: this.nativeMonitor_obj,
          monitor_val: this.nativeMonitor_val,
          assemb_id: this.assemb_id,
          assemb_time: this.assemb_time,
          reg_code: this.reg_code
        },
        new: {
          dev_eui: this.ruleForm.dev_eui,
          monitor_obj: this.ruleForm.monitor_obj,
          monitor_val: this.ruleForm.monitor_val,
          assemb_id: this.ruleForm.assemb_id,
          assemb_time: this.ruleForm.assemb_time,
          reg_code: this.ruleForm.reg_code
        }
      }
      console.log(submitJson)

      api.device.editDeviceMainten(this.dev_eui, submitJson).then(res => {
        console.log('成功', res)
        if (res.data.code == '200') {
          that.$message.success(`${res.data.message}`)
          // that.$router.push({path: '/lift-list'})
        } else {
          that.$message.error(`${res.data.message}`)
        }
        // this.$router.go(0)
      })

    }



  },
  components: {
    'footer-temp': Footer


  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'

#DeviceDetail{
  .container{
    line-height 1;
  }
  .device-detail-info{
    background #fff;
  }
  .ddi-img{
    float left;
    height 186px;
    text-align center;
    width 14%;
    box-shadow: 8px 0 20px -12px rgba(66,114,255,0.30);
  }
  .ddi-img img{
    padding-top 28px;
  }
  .ddi-img h3{
    font-size: 20px;
    color: #4272FF;
    margin-top 16px;
  }
  .ddi-img h3.offline{
    color #C2C2C7;
  }
  .ddi-img p{
    font-size: 14px;
    color: #7E8A95;
    text-align: center;
    line-height: 22px;
    margin-top 10px;
  }
  .ddi-data{
    box-sizing border-box;
    float left;
    width 86%;
    height 186px;
    padding: 0 30px;
  }
  .ddi-data-id{
    font-size: 20px;
    color: #34414C;
    line-height: 28px;
    padding-top 20px;
  }
  .ddi-td{
    float left;
    box-sizing border-box;
    overflow hidden;
    text-overflow ellipsis;
    white-space nowrap;
    font-size: 14px;
    color: #34414C;
    line-height: 22px;
    padding 5px 10px 5px 0;
  }
  .ddi-table .ddi-td:nth-child(1){
    width 21%;
  }
  .ddi-table .ddi-td:nth-child(2){
    width 21%;
  }
  .ddi-table .ddi-td:nth-child(3){
    width 25%;
  }
  .ddi-table .ddi-td:nth-child(4){
    width 15%;
  }
  .ddi-table .ddi-td:nth-child(5){
    width 18%;
    text-align right;
  }
  .ddi-td span{
    color: #7E8A95;
  }
  .llt-tr .llt-th:nth-child(1),.llt-tr .llt-td:nth-child(1){
    width 20%;
  }
  .llt-tr .llt-th:nth-child(2),.llt-tr .llt-td:nth-child(2){
    width 80%;
  }
  .ddi-data-wrap{
    position relative;
  }
  .ddi-data-icon{
    position absolute;
    top 16px;
    right 0;
  }
  .ddid-icon-del{
    width 24px;
    height 24px;
    float left;
    background url('../../assets/images/xym/device-del.png') no-repeat center center;
    cursor pointer;
  }
  .ddid-icon-line{
    float left;
    color #D8DDDF;
    margin 5px 10px 0;
  }
  .ddid-icon-edit{
    width 24px;
    height 24px;
    float left;
    background url('../../assets/images/xym/device-edit.png') no-repeat center center;
    cursor pointer;
  }
}

</style>
