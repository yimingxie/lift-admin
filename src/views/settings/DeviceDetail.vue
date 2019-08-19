<template>
  <div id="DeviceDetail">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/device')">设备管理</span>
        <em>/</em>
        <span class="on">设备详情</span>
      </div>
      <div class="device-detail-info clearfix">
        <div class="ddi-img">
          <img v-if="bonline == 1" src="../../assets/images/xym/device.png" alt="">
          <img v-else src="../../assets/images/xym/device-offline.png" alt="">
          <h3 :class="bonline == 0 ? 'offline' : ''">{{bonline == 1 ? '在线' : '离线'}}</h3>
          <p>{{devName}}</p>
        </div>
        <div class="ddi-data">
          <div class="ddi-data-wrap">
            <div class="ddi-data-icon clearfix">
              <div class="ddid-icon-del" @click="dialogDelete=true"></div>
              <div class="ddid-icon-line">|</div>
              <div class="ddid-icon-edit" @click="editDevice"></div>
            </div>
            <div class="ddi-data-id">设备ID：{{devEui}}</div>
            <div class="ddi-table clearfix" style="margin-top: 10px;">
              <div class="ddi-td"><span>设备型号：</span>{{devModel}}</div>
              <div class="ddi-td"><span>监测内容：</span>{{monitorVal}}</div>
              <div class="ddi-td"><span>设备品牌：</span>{{devBrand}}</div>
              <div class="ddi-td"><span>安装人员：</span>{{assembName}}</div>
              <div class="ddi-td"><span>安装时间：</span>{{assembTime}}</div>
            </div>
            <div class="ddi-table clearfix" style="margin-top: 10px;border-top: 1px dashed #D8DDDF;padding-top: 10px;">
              <div class="ddi-td"><span>关联电梯：</span><em style="color: #4272FF;font-style: normal;">{{regCode}}</em></div>
              <div class="ddi-td"><span>城市区域：</span>{{localArea}}</div>
              <div class="ddi-td"><span>使用地址：</span>{{address}}</div>
            </div>
            <div class="ddi-table clearfix">
              <div class="ddi-td"><span>监测项：</span>{{monitorObj}}</div>
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

    <!-- 编辑设备弹窗 -->
    <el-dialog :visible.sync="dialogEditDevice" title="编辑设备" :show-close="false" width="690px">
      <div>
        <!-- <div class="dia-title">编辑设备</div> -->
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head">基础信息</div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备ID：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="devEui">
                    <el-input v-model="ruleForm.devEui" size="small" placeholder="请输入设备ID"></el-input>
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

              <!-- 人员搜索下拉 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">安装人员：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="assembId">
                    <el-cascader ref="assembIdCascader" placeholder="请选择" :options="assembIdOptions" v-model="selectedAssembIdOptions" filterable clearable @change="assembIdChange" size="small" style="width: 100%;"></el-cascader>
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
                
              <!-- 检测项联动 -->
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">检测项：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="monitorObj">
                    <el-cascader ref="moniCascader" placeholder="请选择" :options="moniObjOptions" v-model="selectedMoniObjOptions" size="small" @change="moniObjChange" style="width: 100%;"></el-cascader>
                  </el-form-item>
                </div>
              </div>


              <!-- 检测内容联动 -->
              <!-- <div class="dia-citem clearfix">
                <div class="dia-citem-label">检测内容：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="monitorVal">
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

    <!-- 删除设备弹窗 -->
    <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="dialogDelete">
      <div class="dialog-delete">
        <div class="dia-heading">
          <div class="dia-con-pic">
            <img src="../../assets/images/xym/dia-warn.png" alt="">
          </div>
          <div class="dia-con-p">
            <h4>是否确认删除此设备</h4>
            <!-- <p>删除后不可复原，请谨慎操作</p> -->
          </div>
        </div>

        <div class="diaN-btn-con clearfix" style="margin-top: 20px;">
          <div class="diaN-btn diaN-btn-cancel" @click="dialogDelete=false">取消</div>
          <div class="diaN-btn diaN-btn-red" @click="deleteDevice">确认</div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import codec from '../../utils/codec_v2.json'
import api from '../../api'
import xymFun from '../../utils/xymFun'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      dialogDelete: false,
      modelContentList: {},
      bonline: "",
      devEui: "",
      devModel: "",
      monitorVal: "",
      devBrand: "",
      assembId: "",
      assembName: "",
      assembTime: "",
      regCode: "",
      localArea: "",
      address: "",
      monitorObj: "",
      devType: "",
      devName: "",
      nativemonitorObj: '',
      nativemonitorVal: '',
      dialogEditDevice: false,
      ruleForm: {
        devEui: "设备ID",
        monitorObj: "监测项(区域:零部件:检测对象)",
        assembId: "安装人员，user_id",
        assembTime: "安装时间",
        regCode: "电梯注册代码"
      },
      rules: {
        // devEui: [
        //   { required: true, message: '请输入电梯注册代码', trigger: 'blur' },
        // ],
      },
      moniObjOptions: [],
      selectedMoniObjOptions: [],
      assembIdOptions: [],
      selectedAssembIdOptions: [],
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
    // this.getDetail()

    // 加载检测项下拉
    this.getMoniObjOptions()

    // 获取安装人员下拉
    this.getDepStaffOptions()


  },
  methods: {
    // 获取所有监测内容表，重组表，其中的id与设备类型中的监测内容对应
    transformMonitorVal() {
      api.device.getMonitorVal().then(res => {
        this.modelContentList = {}
        this.moniValOptions = []
        res.data.data.forEach((item, i) => {
          this.modelContentList[item.id] = item.monitorVal
        })
        // 获取详细信息
        this.getDetail()
      })
    },

    // 获取设备详情
    getDetail() {
      let that = this
      let query = {
        monitorObj: this.$route.query.monitorObj,
        monitorVal: this.$route.query.monitorVal,
        regCode: this.$route.query.regCode
      }

      api.device.getDetailMainten(query).then(res => {
        let detail = res.data.data
        this.devName = detail.devName
        this.bonline = detail.bonline
        this.devEui = detail.devEui
        this.devModel = detail.devModel
        this.monitorVal = that.modelContentList[detail.monitorVal]
        this.devBrand = detail.devBrand
        this.assembId = detail.assembId
        this.assembName = detail.assembName
        this.assembTime = detail.assembTime
        this.regCode = detail.regCode
        this.localArea = detail.localArea
        this.address = detail.address
        this.monitorObj = xymFun.changeMonitorObj(detail.monitorObj).join('-')

        this.nativemonitorObj = detail.monitorObj
        this.nativemonitorVal = detail.monitorVal

        

        // 查询设备上下线记录
        this.getDeviceBonline()
      })

    },

    // 查询设备上下线记录
    getDeviceBonline() {
      api.device.getDeviceBonline(this.devEui).then(res => {
        console.log('上下线记录', res.data)
        let tempArr = res.data.data
        // 数组开头加离线时间--
        tempArr.unshift({recTime: "--", bonline: 0, devId: ""})

        // 如果数组末尾为离线时间，则恢复时间待定为--
        if (tempArr[tempArr.length-1].bonline == 0) {
          tempArr.push({recTime: "--", bonline: 1, devId: ""})
        }
        this.lineList = []
        for (var i = 0; i < tempArr.length - 1; i += 2) {
          let itemArr = []
          let itemObj = {}
          if (tempArr[i].bonline == 1) {
            itemObj.onlineTime = tempArr[i].recTime
            itemObj.offlineTime = tempArr[i+1].recTime
          } else {
            itemObj.offlineTime = tempArr[i].recTime
            itemObj.onlineTime = tempArr[i+1].recTime
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
      this.lineListPart = this.lineList.slice((currentPage-1)*this.pageSize, currentPage*this.pageSize)
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
    moniObjChange(monitorObj) {
      this.ruleForm.monitorObj = monitorObj.join(':')
    },

    // 编辑设备
    editDevice() {
      let that = this
      this.dialogEditDevice = true

      // 赋旧值
      this.ruleForm.devEui = this.devEui
      this.ruleForm.assembTime = this.assembTime
      this.ruleForm.assembId = this.assembId
      this.ruleForm.regCode = this.regCode
      this.ruleForm.monitorObj = this.nativemonitorObj
      this.selectedMoniObjOptions = []
      // 字符串元素转为数字
      this.selectedMoniObjOptions.push(parseInt(this.nativemonitorObj.split(':')[0]), parseInt(this.nativemonitorObj.split(':')[1]), parseInt(this.nativemonitorObj.split(':')[2]))
      this.ruleForm.monitorVal = this.nativemonitorVal

      this.selectedAssembIdOptions = []
      // 通过员工id获取员工详情（部门）
      api.accountApi.getStaffDetails(this.assembId).then(staffRes => {
        let departmentName = staffRes.data.data.departmentName
        this.selectedAssembIdOptions.push(departmentName, this.assembId)
        console.log('id', this.selectedAssembIdOptions)
      })

    },

    // 删除设备（维保企业）
    deleteDevice() {
      let that = this
      let params = {
        monitorObj: this.nativemonitorObj,
        monitorVal: this.nativemonitorVal,
        regCode: this.regCode
      }
      api.device.deleteDeviceMainten(params).then(res => {
        if (res.data.code == '200') {
          that.$message.success(`${res.data.message}`)
          that.$router.push({
            path: '/lift-device',
            query: {
              regCode: that.regCode
            }
          })
        } else {
          that.$message.error(`${res.data.message}`)
        }
      })

    },

    // 获取安装人员下拉
    getDepStaffOptions() {
      api.device.getDepStaff().then(res => {
        this.assembIdOptions = []
        console.log('res.data', res.data)
        for (var key in res.data.data) {
          let obj = {}
          obj.value = key
          obj.label = key
          obj.children = []
          // console.log('key', key)
          res.data.data[key].forEach((item, i) => {
            let tempObj = {}
            tempObj.value = item.id
            tempObj.label = item.name
            obj.children.push(tempObj)
          })

          this.assembIdOptions.push(obj)
          
        }

        console.log('this.assembIdOptions', this.assembIdOptions)
        
      })

    },

    // 下拉人员选中值
    assembIdChange(arr) {
      this.ruleForm.assembId = arr[arr.length-1] // 取数组最后一个值赋值
    },

    // 提交
    submit() {
      let that = this
      let submitJson = {
    
        oldDevEui: this.devEui,
        oldMonitorObj: this.nativemonitorObj,
        oldMonitorVal: this.nativemonitorVal,
        oldAssembId: this.assembId,
        oldAssembTime: this.assembTime,
        oldRegCode: this.regCode,
  
        newDevEui: this.ruleForm.devEui,
        newMonitorObj: this.ruleForm.monitorObj,
        newMonitorVal: this.ruleForm.monitorVal,
        newAssembId: this.ruleForm.assembId,
        newAssembTime: this.ruleForm.assembTime,
        newRegCode: this.ruleForm.regCode
  
      }
      console.log(submitJson)

      api.device.editDeviceMainten(submitJson).then(res => {
        console.log('成功', res)
        if (res.data.code == '200') {
          that.$message.success(`${res.data.message}`)
          // that.$router.push({path: '/lift-list'})
          setTimeout(function() {
            that.$router.push({
              path: '/lift-device',
              query: {
                regCode: that.regCode
              }
            })
          }, 500)
        } else {
          that.$message.error(`${res.data.message}`)
        }
      })

    }



  },
  components: {
    'footer-temp': Footer


  }
}
</script>

<style lang="stylus" scoped>

#DeviceDetail{
  @import '../../assets/stylus/xymStyle.styl'

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
    line-height: 20px;
    margin-top 10px;
    padding: 0 10px;
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
  .dwc-date-icon{
    top: -4px;
  }
}

@media screen and (max-width: 1360px) {
  #DeviceDetail{
    min-width: 1360px;
  }
}

</style>
