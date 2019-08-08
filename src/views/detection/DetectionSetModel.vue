<template>
  <div id="DetectionSet">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">设置监测</span>
      </div>
      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{regCode}}</li>
            <li><span>电梯负责人：</span>{{liftPerson ? liftPerson : '无'}}</li>
            <li><span>电梯地址：</span>{{localArea}} {{address}}</li>
          </ul>
        </div>
      </div>

      <div class="detAdd-content">
        <div class="detSet-t clearfix">
          <div class="detSet-tnav clearfix">
            <div class="detSet-tnav-box" :class="modelNav == 'added' ? 'on' : ''" @click="getAllMonitorTemplate('added', 'reset')">
              <div class="detSet-tnav-box-name">已设监测（{{maintenModelTotal}}）</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
            <div class="detSet-tnav-box" :class="modelNav == 'canAdd' ? 'on' : ''" @click="getAllMonitorTemplate('canAdd', 'reset')">
              <div class="detSet-tnav-box-name">可添加监测（{{giModelTotal}}）</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
            <div class="detSet-tnav-box">
              <div class="detSet-tnav-box-name" @click="goDetSet('/detection-set-log')">更改日志</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
          </div>
          <div class="detSet-ttype clearfix" v-if="modelNav == 'added'">
            <radio-group :items="exceptItem" :value.sync="exceptValue" style="display: inline-block"></radio-group>
          </div>

        </div>

        <div class="detSet-list clearfix">

          <div class="dset-box" :class="item.enabled === 0 && modelNav == 'added' ? 'dsetDisable' : ''" v-for="(item, i) in allMonitorList" :key="i">
            <div class="dset-box-heading">
              <div class="dset-box-title">
                <span>{{item.name}}</span>
                <el-tooltip class="item" effect="dark" :content="item.detail" placement="top">
                  <i class="dset-box-title-icon"></i>
                </el-tooltip>
              </div>
              <div class="dset-box-type dset-box-type" :class="item.diagnType | formatDiagnTypeClass">{{item.diagnType | formatDiagnType}}</div>
            </div>
            <div class="dset-box-info">
              <div class="dset-bi-list">
                <span>如果：</span>
                <em v-for="(consItem, i) in item.transformCons.items" :key="i">
                  <em v-if="item.transformCons.items.length > 1 && i !== 0">，{{item.transformCons.jwCN}}</em>
                  {{consItem.monitorObjCN}}的{{consItem.monitorValCN}}{{consItem.calcTimeCN ? '/' + consItem.calcTimeCN : ''}}/{{consItem.calcOperatorCN}}/{{consItem.calcThreshold}}{{consItem.calcUnit}}
                </em>
                <!-- 机房-电动机-外壳的温度/持续5分钟/大于/50℃，或机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃ -->
              </div>
              <div class="dset-bi-list">
                <span>就执行：</span>
                <em>
                  {{item.transformTasks.notiTypesCN}}{{item.transformTasks.userTypesCN}}
                </em>
                <!-- 后台通知、手机短信通知维保经理 -->
              </div>
            </div>
            <!-- 通用添加，只在通用展示 -->
            <div class="dset-box-operate clearfix" v-if="modelNav == 'canAdd'">
              <div class="dset-model-add" @click="openSetDialog(item.id)"></div>
            </div>
            <!-- 只在维保展示，操作按钮 -->
            <div class="dset-box-operate clearfix" v-if="modelNav == 'added'">
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-remove" @click="deleteMonitor(item.id)"></div>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box2">
                <el-switch v-model="item.enabled" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 @change="switchChange($event, item.id)"></el-switch>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-edit" @click="goDetEdit('mainten', item.templateId, item.id)"></div>
              </div>
            </div>
          </div>

          <div class="list-no-data" v-show="allMonitorList.length == 0">暂无数据</div>


        </div>

        <!-- 分页 -->
        <div class="detSet-pager">
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="currentPageChange"
            :current-page="currentPage"
            :page-sizes="[9, 12, 15]"
            :page-size="pageSize"
            layout="prev, pager, next, sizes, jumper"
            :total="totalPage">
          </el-pagination>
        </div>

      </div>

    </div>

    <!-- 底部 -->
    <footer-temp></footer-temp>

    <!-- 添加监测对话框 -->
    <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="detSetModelDialog">
      <div class="dialog-delete">
        <div class="dia-heading">
          <div class="dia-con-pic">
            <img src="../../assets/images/xym/dia-question.png" alt="">
          </div>
          <div class="dia-con-p">
            <h4>是否确认添加监测</h4>
            <p>修改后将按照新的规则监测电梯</p>
          </div>
        </div>
        <div class="dia-btn-con">
          <input class="dia-btn dia-btn-cancel" type="button" value="不，直接添加" @click="addTempDirect()">
          <input class="dia-btn dia-btn-submit" type="button" value="是" @click="goDetEdit('gi')">
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '../../api.js'
import RadioGroup from '../../components/RadioGroup'
import Footer from '../common/fotter'
import xymFun from '../../utils/xymFun'
export default {
  data() {
    return {
      parentCode: '',
      modelNav: 'added',
      liftPerson: '',
      detSetModelDialog: false,
      exceptItem: [
        {label: '全部', value: -1},
        {label: '事件', value: 0},
        {label: '故障', value: 1},
        {label: '违规', value: 2},
        {label: '预警', value: 3}
      ],
      exceptValue: -1,
      testSwitch: '',
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',
      detSetModelParams: {
        offset: 1,
        limit: 9,
      },
      detSetModelMaintenParams: {
        offset: 1,
        limit: 9,
        type: -1,
        elevid: 0,
      },
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      maintenModelTotal: 0,
      giModelTotal: 0,
      allMonitorList: [],
      policyJson: {},

      // 模板id和policyId对应表，用于弹窗传值
      // key为模板id，value为policyId数组
      // tempPolicyIdObj: {},
      dialogMonitorId: 0, // 模板id，用于弹窗传值

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
    this.detSetModelMaintenParams.elevid = this.$route.query.regCode
    if (sessionStorage.getItem('modelNav')) {
      this.modelNav = sessionStorage.getItem('modelNav') // 通过sessionStorage传参控制页面切换
    }
  },
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()
    
    // 获取电梯详情
    this.getLiftDetail()

    // 获取监控模板
    this.getAllMonitorTemplate(this.modelNav)

  },
  methods: {
    
    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
        let detail = res.data.data
        this.regCode = detail.regCode
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address
      })
    },

    // 获取电梯负责人
    getLiftPerson() {
      this.liftPerson = ''
      let personArr = []
      api.lift.getLiftPerson(this.parentCode).then(res => {
        if (res.data.data.personOne) {
          personArr.push(res.data.data.personOne)
        }
        if (res.data.data.personTwo) {
          personArr.push(res.data.data.personTwo)
        }
        this.liftPerson = personArr.join('、')
      })
    },

    // 获取更新数量
    getMonitorLength() {
      let detSetModelMaintenParams = {
        offset: 1,
        limit: 200,
        type: -1,
        elevid: this.parentCode,
      }
      let detSetModelParams = {
        offset: 1,
        limit: 200,
      }
      api.detection.getMaintenTemplate(detSetModelMaintenParams).then(res => {
        this.maintenModelTotal = res.data.data.records.length
      })
      api.detection.getAllMonitorTemplate(detSetModelParams).then(res => {
        this.giModelTotal = res.data.data.records.length
      })
    },


    // 获取监控模板
    // 有通用和维保公司的判断
    getAllMonitorTemplate(modelNavP, resetString) {
      const that = this
      this.modelNav = modelNavP
      sessionStorage.setItem('modelNav', modelNavP)
      this.getMonitorLength() // 更新数量
      // 重置页数
      if (resetString == 'reset') {
        this.detSetModelParams.offset = 1
        this.detSetModelMaintenParams.offset = 1
        this.detSetModelMaintenParams.type = -1
      }
      if (JSON.stringify(this.policyJson) == '{}') {
        // 获取重组后基础规则
        xymFun.transformPolicy().then(json => {
          this.policyJson = json // 保存重组后的规则对象
          getList()
        })
      } else {
        getList()
      }

      function getList() {
        // 判断，区分通用监测模板和维保监测
        let interfaceApi = ''
        if (that.modelNav == 'added') { // 维保
          console.log('3464365', that.detSetModelMaintenParams)
          interfaceApi = api.detection.getMaintenTemplate(that.detSetModelMaintenParams)
        } else { // 通用
          interfaceApi = api.detection.getAllMonitorTemplate(that.detSetModelParams)
        }

        interfaceApi.then(res => {
          console.log('gggggggggggggggggg',res)
          // 如果为空值
          if (res.data.data.records.length == 0) {
            that.currentPage = 1
            that.totalPage = 1
            that.allMonitorList = []
            return
          }
          that.allMonitorList = res.data.data.records
          that.allMonitorList.forEach((item, i) => {
            let conditions = JSON.parse(item.conditions)
            let tasks = JSON.parse(item.tasks)[0]
            // 数据处理
            item.transformCons = {} // 用于页面渲染
            item.transformCons.items = []
            item.transformTasks = {
              userTypesCN: '',
              notiTypesCN: ''
            }

            // 处理条件
            if (conditions.jw == 1) {
              item.transformCons.jwCN = '或'
            } else {
              item.transformCons.jwCN = '且'
            }
            // let tempPoArr = []
            conditions.items.forEach(secItem => {
              // tempPoArr.push(secItem.policyId)
              // that.tempPolicyIdObj[item['id']] = tempPoArr // 组装用于模板id和policyId数组对应表
              let policyOneObj = that.policyJson[secItem['policyId']] // 获取封装好的单条规则
              policyOneObj.calcThreshold = secItem.threshold;
              policyOneObj.calcTimeCN = secItem.timeInSeconds;
              policyOneObj.conditionFreqency = secItem.freqency;

              item.transformCons.items.push(policyOneObj)
              console.log('555',item.transformCons.items)

            })

            // 处理任务
            let userTypesCNTemp = []
            tasks.userTypes.forEach(userItem => {
              if (userItem === 0) {
                userTypesCNTemp.push('维保人员')
              } else if (userItem === 1) {
                userTypesCNTemp.push('维保主管')
              }
            })
            item.transformTasks.userTypesCN = userTypesCNTemp.join('、')
            let notiTypesTemp = []
            tasks.notiTypes.forEach(notiItem => {
              if (notiItem === 0) {
                notiTypesTemp.push('后台通知')
              } else if (notiItem === 1) {
                notiTypesTemp.push('手机短信通知')
              }
            })
            item.transformTasks.notiTypesCN = notiTypesTemp.join('、')
            
          })

          console.log('组好的list', that.allMonitorList)
          // 分页
          that.currentPage = res.data.data.current
          that.totalPage = res.data.data.total
      

        })

      }
    
      
    },

    // 当前分页改变
    currentPageChange(current) {
      this.detSetModelParams.offset = current
      this.detSetModelMaintenParams.offset = current
      this.getAllMonitorTemplate(this.modelNav)
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.detSetModelParams.limit = size
      this.detSetModelMaintenParams.limit = size
      this.getAllMonitorTemplate(this.modelNav)
    },
    

    // 页面跳转
    goDetSet(path) {
      this.$router.push({
        path: path,
        query: {
          regCode: this.parentCode
        }
      })
    },

    // 打开弹窗
    openSetDialog(monitorId) {
      this.detSetModelDialog = true
      this.dialogMonitorId = monitorId // 用于传给“是”
      // console.log('弹窗id', templateId)
    },

    // 弹窗跳转到监测编辑
    goDetEdit(editTypePa, monitorIdPa, mainEditId) {
      let routerParams
      let editType = editTypePa
      if (monitorIdPa) {
        this.dialogMonitorId = monitorIdPa
      }
      
      routerParams = {
        path: '/detection-edit',
        query: {
          monitorId: this.dialogMonitorId, // 通用templateId
          elevid: this.parentCode,
          editType: editType
        }
      }
      if (mainEditId) {
        routerParams.query.id = mainEditId // 维保模板id
      }
      
      this.$router.push(routerParams)
    },

    // 直接添加模板
    addTempDirect() {
      const that = this
      // console.log('this.allMonitorList', this.allMonitorList)
      // 查询单个模板参数
      api.detection.getOneMonitorTemplate(this.dialogMonitorId).then(res => {
        console.log('getOneMonitorTemplate', res.data)
        let detail = res.data.data
        let params = {               
          "name": detail.name,
          "diagnType": detail.diagnType, // 监测类型: 0-事故,1-故障,2-违规,3-预警
          "elevId": this.parentCode, // 绑定电梯的ID
          "templateId": this.dialogMonitorId, // 模板ID - 指对应 MonitoreTemplate的ID
          "conditions": detail.conditions, // 用户实际设定的参数，包含多条件
          "userConditions": "", // 用户自定义规则条件， JSON String
          "tasks": detail.tasks, // 执行的任务
          "enabled": 1, // 0 - 停用, 1 - 启用
          "detail": "", // 描述
          "extensions": detail.extensions // 扩展用JSON String
        }
        console.log('params', params)
        // 参数不修改直接添加监控
        api.detection.editMonitorMainten(params).then(resEdit => {
          if (resEdit.data.code == 400) {
            this.$message.error(`${resEdit.data.message}`)
          } else {
            this.$message.success(`${resEdit.data.message}`)
            this.$router.go(0)
            // this.getAllMonitorTemplate(this.modelNav)
          }
        })
      })
    },

    // 监测开关
    switchChange(enabledVal, id) {
      const that = this
      api.detection.getMaintenOneTemplate(id).then(res => {
        let params = res.data.data
        params.enabled = enabledVal
        api.detection.editMonitorMainten(params).then(resEdit => {
          if (resEdit.data.code == 400) {
            this.$message.error(`${resEdit.data.message}`)
          } else {
            this.$message.success('切换成功')
          }
        })
      })
    },

    // 维保公司删除监测模板
    deleteMonitor(id) {
      const that = this
      api.detection.deleteMonitorMainten(id).then(res => {
        if (res.data.code == 400) {
          this.$message.error(`${res.data.message}`)
        } else {
          this.$message.success('移除成功')
          this.getAllMonitorTemplate(this.modelNav)
          
        }
      })
    }

    
    

  },
  components: {
    'radio-group': RadioGroup,
    'footer-temp': Footer,
  },
  filters: {
    formatDiagnType: function (value) {
      // 0-事故,1-故障,2-违规,3-预警
      if (value == 1) {
        return '故障'
      } else if (value == 2) {
        return '违规'
      } else if (value == 3) {
        return '预警'
      } else {
        return '事件'
      }
    },
    formatDiagnTypeClass: function (value) {
      // 0-事故,1-故障,2-违规,3-预警
      if (value == 1) {
        return 'faultColor'
      } else if (value == 2) {
        return 'violationColor'
      } else if (value == 3) {
        return 'warningColor'
      } else {
        return 'accidentColor'
      }
    }
  },
  watch: {
    // 异常分类筛选
    exceptValue(val, oldVal) {
      this.detSetModelMaintenParams.type = val
      this.getAllMonitorTemplate(this.modelNav)
    }
  },
}
</script>

<style lang="stylus" scoped>
#DetectionSet{
  @import '../../assets/stylus/xymStyle.styl'


}

</style>
