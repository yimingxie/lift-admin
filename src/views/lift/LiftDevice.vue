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
            <h3>{{elevName}} {{inNum}}</h3>
            <p>{{localArea}} {{address}} &nbsp;&nbsp;&nbsp; 注册代码：{{regCode}}</p>
          </div>
          <div class="llcb-btn info" @click="itemAddDevice(regCode)">+ 添加设备</div>
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
                <div class="llt-td">{{item.devType}}-{{item.devName}}</div>
                <div class="llt-td">{{item.monitorObj}}</div>
                <div class="llt-td">{{item.monitorVal}}</div>
                <div class="llt-td">{{item.devEui}}</div>
                <div class="llt-td">
                  <div class="lift-device-status"><span>●</span>{{item.bonline}}</div>
                </div>
                <div class="llt-td">{{item.assembTime}}</div>
                <div class="llt-td">{{item.assembId}}</div>
                <div class="llt-td">
                  <p class="llt-td-device">{{item.replaceCount}}</p>
                  <div class="llt-td-arrow" @click="showDrop(item.nativemonitorObj, item.nativemonitorVal, item.regCode, i)"></div>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="goDetail(item.nativemonitorObj, item.nativemonitorVal, item.regCode)">查看详情</span>
                </div>
              </div>

              <!-- 下拉 -->
              <div class="llt-drop" :class="item.children && item.children.length > 5 ? 'heightFix' : 'heightAuto'">
                <div class="lift-device-tr clearfix" v-for="(childItem, childI) in item.children" :key="childI">
                  <div class="ld-td"></div>
                  <div class="ld-td"></div>
                  <div class="ld-td"></div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;">{{childItem.devEui}}</div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;"></div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;">{{childItem.assembTime}}</div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;">{{childItem.assembId}}</div>
                  <div class="ld-td" style="border-bottom: 1px solid #E8E8E8;"></div>
                  <div class="ld-td"></div>
                </div>
       
              </div>
            </div>

            
          </div>

          <!-- 分页 -->
          <div class="list-page">
            <el-pagination
              @size-change="pageSizeChange"
              @current-change="currentPageChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
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
                  <el-form-item prop="devEui">
                    <el-input v-model="ruleForm.devEui" size="small" placeholder="请输入设备ID" @blur="searchDevEui"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">安装日期：</div>
                <div class="dia-citem-ib" style="position: relative;width: 220px;">
                  <div class="dwc-date-icon"></div>
                  <el-form-item prop="assembTime">
                    <el-date-picker v-model="ruleForm.assembTime" type="date" placeholder="选择日期" prefix-icon="test-icon" size="small" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </div>
              </div>

              <!-- TODO 人员搜索下拉 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">安装人员：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="assembId">
                    <el-input v-model="ruleForm.assembId" size="small" placeholder="安装人员"></el-input>
                  </el-form-item>
                </div>
              </div>

            </div>
            <div class="dia-con-head" style="padding-top: 6px;">安装电梯信息</div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">电梯注册代码：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="regCode">
                    <el-input v-model="ruleForm.regCode" size="small" placeholder="电梯注册码"></el-input>
                  </el-form-item>
                </div>
              </div>
                

              <!-- 联动 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">检测项：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="monitorObj">
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
      regCode: this.$route.query.regCode,
      elevName: '',
      inNum: '',
      localArea: '',
      address: '',
      liftDeviceList: [],
      modelContentList: {},
      activeRegCode: '',
      ruleForm: {
        devEui: '',
        assembTime: '',
        assembId: '',
        regCode: '',
        monitorObj: '',
        monitorVal: '',
      },
      rules: {
        // regCode: [
        //   { required: true, message: '请输入电梯注册代码', trigger: 'blur' },
        // ],
      },
      moniObjOptions: [],
      selectedMoniObjOptions: [],
      liftDeviceParams: {
        "limit": 10,
        "offset": 1,
        "bonline": -1,
        "regCode": ""
      },
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

    }
  },
  created() {
  },
  mounted() {
    console.log('66666', this.$route.query.regCode)

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
          this.modelContentList[item.id] = item.monitorVal
        })
      })
    },

    // 获取电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.regCode).then(res => {
        let detail = res.data.data
        this.elevName = detail.elevName
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address
      })


    },

    // 获取电梯设备列表
    getLiftDevice() {
      this.liftDeviceParams.regCode = this.regCode
      api.lift.getLiftDevice(this.liftDeviceParams).then(res => {
        console.log('单部电梯设备列表', res.data)
        this.liftDeviceList = res.data.data.records
        this.liftDeviceList.forEach((item, i) => {
          item.nativemonitorObj = item.monitorObj
          item.nativemonitorVal = item.monitorVal
          item.monitorObj = xymFun.changeMonitorObj(item.monitorObj).join('-')
          item.monitorVal = this.modelContentList[item.monitorVal]
          item.bonline = item.bonline == 1 ? '在线' : '离线'
        })
      })

    },

    // 当前分页改变
    currentPageChange(current) {
      this.liftDeviceParams.offset = current
      this.getLiftDevice()
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.liftDeviceParams.limit = size
      this.getLiftDevice()
    },

    // 设备详情跳转
    goDetail(monitorObj, monitorVal, regCode) {
      this.$router.push({
        path: '/device-detail',
        query: {
          monitorObj: monitorObj,
          monitorVal: monitorVal,
          regCode: regCode
        }
      })
    },

    // item添加设备
    itemAddDevice(regCode) {
      this.dialogAddDevice = true
      this.ruleForm.regCode = regCode
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
    moniObjChange(monitorObj) {
      this.ruleForm.monitorObj = monitorObj.join(':')
    },

    // （弹窗）关闭弹窗，重置表单
    dialogClosed() {
      this.$refs.diaForm.resetFields()
      this.ruleForm = {
        devEui: '',
        assembTime: '',
        assembId: '',
        regCode: '',
        monitorObj: '',
        monitorVal: '',
      }
      this.dialogAddDevice = false
    },

    // （弹窗）搜索通用后台设备，填充数据
    searchDevEui() {
      let that = this
      let devEui = this.ruleForm.devEui

      api.device.searchDevEui(devEui).then(res => {
        // alert('搜索中')
        if (!res.data.data) {
          alert('设备ID不存在')
          this.$refs.diaForm.resetFields();
          this.ruleForm.devEui = devEui
          return
        }
        console.log(res.data)
        alert('设备存在，请继续填写')

        let list = res.data.data
        this.ruleForm.monitorVal = list.monitorVal

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
    showDrop(monitorObj, monitorVal, regCode, i) {
      console.log(monitorObj, monitorVal, regCode, i)
      let that = this
      // 控制收缩展开
      if (this.activeRegCode === i) {
        return this.activeRegCode = ''
      }
      console.log(this.activeRegCode)
      let params = {
        monitorObj: monitorObj,
        monitorVal: monitorVal,
        regCode: regCode
      }

      api.device.deviceChangeLog(params).then(res => {
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

#LiftDevice{
  @import '../../assets/stylus/xymStyle.styl'

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

/* 适配 */
@media screen and (max-width: 1550px) {
  #LiftDevice{
    .llt-td{
      font-size 12px;
    }
    .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
      width 16%;
    }
    .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
      width 13%;
    }
    .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
      width 10%;
    }
    .llt-thead .llt-th:nth-child(6),.llt-tbody .llt-td:nth-child(6){
      width 11%;
    }
    .llt-thead .llt-th:nth-child(9),.llt-tbody .llt-td:nth-child(9){
      width 10%;
    }
  }

}


@media screen and (max-width: 1360px) {
  #LiftDevice{
    min-width: 1360px;
  }
}



</style>
