<template>
  <div id="DetectionAdd">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">编辑监测</span>
      </div>

      <div class="detAdd-content">
        <div class="lift-list-title">编辑监测</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="detAdd-item-con">
          
            <div class="detAdd-item">
              <div class="detAdd-item-wrap">
                <div class="detAdd-item-title">设置名称与类型</div>
                <div class="detAdd-box">
                  <div class="detAdd-box-label clearfix">
                    <span class="detAdd-label-span detAdd-label-span-blue">1</span><em>监测名称：</em>
                  </div>
                  <div class="detAdd-box-inp">
                    <el-form-item prop="name" class="detAdd-form-item">
                      <el-input v-model="ruleForm.name" size="small" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="detAdd-box">
                  <div class="detAdd-box-label clearfix">
                    <span class="detAdd-label-span detAdd-label-span-yellow">2</span><em>监测类型：</em>
                  </div>
                  <div class="detAdd-box-inp">
                    <el-form-item prop="diagnType" class="detAdd-form-item">
                      <el-select v-model="ruleForm.diagnType" placeholder="请选择" size="small" style="width: 100%;">
                        <el-option v-for="item in diagnTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="detAdd-box">
                  <div class="detAdd-box-label clearfix">
                    <span class="detAdd-label-span detAdd-label-span-green">3</span><em>监测描述：</em>
                  </div>
                  <div class="detAdd-box-inp">
                    <el-form-item prop="detail" class="detAdd-form-item">
                      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.detail"></el-input>
                    </el-form-item>
                  </div>
                </div>


              </div>
            </div>

            <div class="detAdd-item">
              <div class="detAdd-item-wrap">
                <div class="detAdd-item-title">如果发生以下异常情况</div>
                <!-- <div class="detAdd-abnormal-btn">+ 添加异常情况</div> -->
                <div class="detAdd-abnormal-ul">
                  <div class="detAdd-abnormal-li clearfix" v-for="(item, i) in special.conditionsView" :key="i">
                    <span class="detAdd-label-span detAdd-label-span-blue">{{i+1}}</span>
                    <div class="detAdd-abul-p">
                      {{item.monitorObjCN}}的{{item.monitorValCN}}{{item.calcTimeCN ? '/' + item.calcTimeCN + '秒' : ''}}/{{item.calcOperatorCN}}/{{item.calcThreshold}}{{item.calcUnit}}
                    </div>
                    <div class="detAdd-abul-edit" @click="openDialog(item.id, i)"></div>
                  </div>
                </div>
                <div class="detAdd-item-title">就发送消息通知</div>
                <div class="detAdd-msg-content">
                  <el-checkbox-group v-model="special.checkedUserTypes" @change="changeUserTypes">
                    <el-checkbox v-for="(item, i) in userTypesOptions" :label="item.value" :key="i">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>

            </div>

            <div class="detAdd-item">
              <div class="detAdd-item-wrap">
                <div class="detAdd-item-title">执行条件</div>
                <div class="detAdd-box">
                  <div class="detAdd-box-label clearfix">
                    <span class="detAdd-label-span detAdd-label-span-blue">1</span><em>满足：</em>
                  </div>
                  <div class="detAdd-box-inp" style="padding-left: 82px;">
                    <el-select size="small" v-model="special.jw" placeholder="请选择" disabled>
                      <el-option v-for="(item, i) in jwOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>

            </div>

            <div class="detAdd-item" style="border-bottom: none;">
              <div class="detAdd-item-wrap">
                <div class="detAdd-item-title">预览</div>
                <div class="detAdd-preview">
                  <div v-for="(item, i) in special.conditionsView" :key="i">
                    <span v-if="special.conditionsView.length > 1 && i !== 0">{{special.jw == 1 ? '或' : '且'}}</span>
                    {{item.monitorObjCN}}的{{item.monitorValCN}}{{item.calcTimeCN ? '/' + item.calcTimeCN + '秒' : ''}}/{{item.calcOperatorCN}}/{{item.calcThreshold}}{{item.calcUnit}}，
                  </div>
                  <div>
                    就{{special.tasksView.notiTypesCN}}{{special.tasksView.userTypesCN}}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-btn">
              <input class="la-btn la-btn-cancel" type="button" value="取消" @click="goSetModel">
              <input class="la-btn la-btn-submit" type="button" value="保存" @click="submit">
            </div>
          </div>
            
        </el-form>
        
      </div>

    </div>

    <!-- 底部 -->
    <footer-temp></footer-temp>

    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogDetSet" title="编辑异常情况" :show-close="false" width="690px">
      <div class="dia-content">
        <el-form :model="ruleFormDialog" :rules="rulesDialog" ref="diaForm">
          <div class="dia-con-head">监测项与内容</div>
          <div class="dia-clist">
            <!-- 联动 -->
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">检测项：</div>
              <div class="dia-citem-ib">
                <el-form-item prop="monitorObj">
                  <el-cascader ref="moniCascader" :disabled="true" placeholder="请选择" :options="moniObjOptions" v-model="specialRuleFormDialog.monitorObj" size="small" @change="moniObjChange" style="width: 100%;"></el-cascader>
                </el-form-item>
              </div>
            </div>
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">监测内容：</div>
              <div class="dia-citem-ib">
                <el-form-item>
                  <el-select size="small" :disabled="true" v-model="ruleFormDialog.monitorVal" placeholder="请选择">
                    <el-option v-for="(item, i) in monitorValOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="dia-con-head">异常条件</div>
          <div class="dia-clist">
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">条件类型：</div>
              <div class="dia-citem-ib">
                <el-form-item>
                  <el-select size="small" :disabled="true" v-model="ruleFormDialog.calcMethod" placeholder="请选择">
                    <el-option v-for="(item, i) in calcMethodOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">条件内容：</div>
              <div class="dia-citem-ib">
                <!-- 瞬时 -->
                <!-- <div class="detAddDia-citem-ib2" v-if="ruleFormDialog.calcMethod == 2 || ruleFormDialog.calcMethod == 3 || ruleFormDialog.calcMethod == 5"> -->
                <!-- <div class="detAddDia-citem-ib2">
                  <div class="detAddDia-citem-ib2-select">
                    <el-form-item>
                      <el-select size="small" v-model="ruleFormDialog.dTimeUnit" placeholder="请选择">
                        <el-option v-for="(item, i) in dTimeUnitOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item prop="calcTimeInSeconds">
                    <el-input v-model="ruleFormDialog.calcTimeInSeconds" size="small"></el-input>
                  </el-form-item>
                </div> -->

                <!-- 新瞬时值 -->
                <div class="detAddDia-citem-ib2 clearfix">
                  <div class="detAddDia-citem-ib2-box">
                    <el-form-item prop="minute">
                      <el-input v-model="specialRuleFormDialog.minute" @input="minSecChange" size="small"></el-input>
                    </el-form-item>
                    <div class="detAddDia-citem-ib2-unit">分</div>
                  </div>
                  <div class="detAddDia-citem-ib2-box" style="float: right">
                    <el-form-item prop="second">
                      <el-input v-model="specialRuleFormDialog.second" @input="minSecChange" size="small"></el-input>
                    </el-form-item>
                    <div class="detAddDia-citem-ib2-unit">秒</div>
                  </div>
                </div>

                <!-- 新持续时间 -->
                <div class="detAddDia-citem-ib2 clearfix" v-if="ruleFormDialog.calcMethod == 4">
                  <div style="float: left; line-height: 32px;margin-right: 20px;">持续</div>
                  <div class="detAddDia-citem-ib2-box" style="width: 42%">
                    <el-form-item prop="minute">
                      <el-input v-model="specialRuleFormDialog.minute" @input="minSecChange" size="small"></el-input>
                    </el-form-item>
                    <div class="detAddDia-citem-ib2-unit">分</div>
                  </div>
                  <div class="detAddDia-citem-ib2-box" style="float: right;width: 42%">
                    <el-form-item prop="second">
                      <el-input v-model="specialRuleFormDialog.second" @input="minSecChange" size="small"></el-input>
                    </el-form-item>
                    <div class="detAddDia-citem-ib2-unit">秒</div>
                  </div>
                </div>




                <!-- 持续时间 -->
                <!-- <div class="detAddDia-citem-ib2" v-if="ruleFormDialog.calcMethod == 4"> -->
                <!-- <div class="detAddDia-citem-ib2">
                  <div class="detAddDia-citem-ib2-title">持续</div>
                  <div class="detAddDia-citem-ib2-select">
                    <el-form-item>
                      <el-select size="small" v-model="ruleFormDialog.dTimeUnit" placeholder="请选择">
                        <el-option v-for="(item, i) in dTimeUnitOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item prop="calcTimeInSeconds" class="dTime-item">
                    <el-input v-model="ruleFormDialog.calcTimeInSeconds" size="small"></el-input>
                  </el-form-item>
                </div> -->

                

                <!-- 次数 -->
                <!-- <div class="detAddDia-citem-ib2" v-if="ruleFormDialog.calcMethod == 5"> -->
                <div class="detAddDia-citem-ib2">
                  <el-form-item prop="conditionFreqency" class="occ-item">
                    <el-input v-model="ruleFormDialog.conditionFreqency" size="small"></el-input>
                  </el-form-item>
                  <div class="detAddDia-citem-ib2-unit">次</div>
                </div>

                <div class="detAddDia-citem-ib2">
                  <div class="detAddDia-citem-ib2-select2">
                    <el-form-item>
                      <el-select size="small" :disabled="true" v-model="ruleFormDialog.calcOperator" placeholder="请选择">
                        <el-option v-for="(item, i) in calcOperatorOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item prop="calcThreshold" class="threshold-item">
                    <el-input v-model="ruleFormDialog.calcThreshold" size="small"></el-input>
                  </el-form-item>
                  <div class="detAddDia-citem-ib2-unit">{{ruleFormDialog.calcUnit}}</div>
                </div>
                
              </div>
            </div>

          </div>

          <div class="dia-con-head">预览</div>
          <div class="dia-clist">
            <div class="dia-clist-preview">
              {{dialogPreview.monitorObjCN}}的{{dialogPreview.monitorValCN}}{{specialRuleFormDialog.minSec ? '/' + specialRuleFormDialog.minSec + '秒' : ''}}/{{dialogPreview.calcOperatorCN}}/{{ruleFormDialog.calcThreshold}}{{dialogPreview.calcUnit}}，
            </div>
          </div>

          <div class="form-btn" style="border-top: none;padding-bottom: 60px;">
            <input class="la-btn la-btn-cancel" type="button" value="取消" @click="dialogDetSet=false">
            <input class="la-btn la-btn-submit" type="button" value="确认" @click="submitDialog">
          </div>

        </el-form>

        
      </div>
    </el-dialog>


    

  </div>
</template>

<script>
import api from '../../api.js'
import xymFun from '../../utils/xymFun'
import Footer from '../common/fotter'
export default {
  data() {
    return {
      parentMonitorId: 0,
      diagnMonitorId: 0,
      editType: '',
      dialogDetSet: false,
      ruleForm: {
        "maintenId": "", // 企业ID - 维保企业可以不填，后台会获取当前登录用户所属企业ID
        "name": "",
        "diagnType": 0, // 监测类型: 0-事故,1-故障,2-违规,3-预警
        "elevId": "", // 绑定电梯的ID
        "templateId": "", // 模板ID - 指对应 MonitoreTemplate的ID
        "conditions": "", // 用户实际设定的参数，包含多条件
        "userConditions": "", // 用户自定义规则条件， JSON String
        "tasks": "", // 执行的任务
        "enabled": 1, // 0 - 停用, 1 - 启用
        "detail": "", // 描述
        "extensions": "" // 扩展用JSON String
      },
      // 需要特殊处理的字段
      // 用于页面展示
      special: {
        jw: 0,
        checkedUserTypes: [],
        conditionsView: [],
        tasksView: {}
      },
      rules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
      },
      
      // 对话框的参数和校验规则
      ruleFormDialog: {
        monitorObj: '',
        monitorVal: '',
        calcMethod: '',
        calcUnit: '',
        calcTimeInSeconds: 0,
        dTimeUnit: '秒',
        conditionFreqency: '',
        calcOperator: '',
        calcThreshold: 0,
      },
      // 对话框预览
      dialogPreview: {},
      // 对话框需要特殊处理的字段
      specialRuleFormDialog: {
        monitorObj: [],
        minute: 0,
        second: 0,
        minSec: 0,
      },
      rulesDialog: {

      },
      dTimeUnitOptions: [
        {value: '秒', label: '秒'},
        {value: '分', label: '分'},
      ],
      calcOperatorOptions: [
        {value: 0, label: '等于'},
        {value: 1, label: '大于'},
        {value: 2, label: '小于'},
        {value: 3, label: '大于等于'},
        {value: 4, label: '小于等于'},
        {value: 5, label: '不等于'},
      ],
      moniObjOptions: [],
      selectedMoniObjOptions: [],
      diagnTypeOptions: [
        {value: 0, label: '事件'},
        {value: 1, label: '故障'},
        {value: 2, label: '违规'},
        {value: 3, label: '预警'},
      ],
      userTypesOptions: [
        {value: 0, label: '维保经理'},
        {value: 1, label: '维保主管'},
      ],
      jwOptions: [
        {value: 0, label: '全部异常'},
        {value: 1, label: '任意一个异常'},
      ],
      monitorValOptions: [],
      calcMethodOptions: [
        {value: 1, label: '瞬间大于等于/小于等于/等于/不等于预设值'},
        {value: 2, label: '一段时间内，平均值大于等于/小于等于/等于/不等于预设值'},
        {value: 3, label: '一段时间内骤增骤减达到预设值'},
        {value: 4, label: '持续一段时间大于等于/小于等于/不等于/等于预设值'},
        {value: 5, label: '一段时间内出现多次大于等于/小于等于/不等于/等于预设值'},
      ],
      policyJson: {}, // 基础规则重组对应表
      dialogPolicyId: 0, // 用于给弹窗传递id


    }
  },
  created() {
    this.parentMonitorId = this.$route.query.monitorId
    this.diagnMonitorId = this.$route.query.id // 维保模板id
    this.ruleForm.elevId = this.$route.query.elevid
    this.ruleForm.templateId = this.$route.query.monitorId
    this.editType = this.$route.query.editType
    if (this.$route.query.editType == 'mainten' && this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
    }
  },
  mounted() {
    // 加载检测项下拉选项
    this.getMoniObjOptions()


    // 加载监测内容下拉选项
    this.getMonitorValOptions()

    this.getData()

  },
  methods: {
    // 获取表单内容
    getData() {
      const that = this
      let interfaceApi = ''
      // 判断是基础模板编辑还是维保公司编辑，从而使用不同接口
      if (that.editType == 'gi') {
        interfaceApi = api.detection.getOneMonitorTemplate(that.parentMonitorId)
      } else if (that.editType == 'mainten') {
        console.log(111)
        interfaceApi = api.detection.getMaintenOneTemplate(that.diagnMonitorId)
      }

      interfaceApi.then(res => {
        console.log('res.data', res.data)
        let detail = res.data.data
        that.ruleForm.name = detail.name
        that.ruleForm.diagnType = detail.diagnType
        that.ruleForm.detail = detail.detail

        // 字段特殊处理
        // 处理条件
        that.special.conditionsView = []
        let conditions = JSON.parse(detail.conditions)
        that.ruleForm.conditions = conditions
        that.special.jw = conditions.jw
        // 异步，获取重组规则对象
        xymFun.transformPolicy().then(json => {
          that.policyJson = json // 保存重组后的规则对象
          conditions.items.forEach((item, i) => {
            let policyIdOne = item.policyId
            let policyOneObj = that.policyJson[policyIdOne]
            policyOneObj.calcThreshold = item.threshold;
            policyOneObj.calcTimeCN = item.timeInSeconds;
            policyOneObj.conditionFreqency = item.freqency;

            that.special.conditionsView.push(policyOneObj)
          })

          console.log('that.special', that.special)

        })


        // 处理任务
        that.ruleForm.tasks = JSON.parse(detail.tasks)
        let tasks = JSON.parse(detail.tasks)[0] // 特殊处理，只取数组第一个值，也许会有变动
        that.special.checkedUserTypes = tasks.userTypes
        let userTypesCNTemp = []
        tasks.userTypes.forEach(userItem => {
          if (userItem === 0) {
            userTypesCNTemp.push('维保经理')
          } else if (userItem === 1) {
            userTypesCNTemp.push('维保主管')
          }
        })
        that.special.tasksView.userTypesCN = userTypesCNTemp.join('、')
        let notiTypesTemp = []
        tasks.notiTypes.forEach(notiItem => {
          if (notiItem === 0) {
            notiTypesTemp.push('后台通知')
          } else if (notiItem === 1) {
            notiTypesTemp.push('手机短信通知')
          }
        })
        that.special.tasksView.notiTypesCN = notiTypesTemp.join('、')

      })
    },

    // 监听发送消息通知多选框
    changeUserTypes(arr) {
      console.log('kjshdlkfj', arr)
      this.special.tasksView.userTypesCN = []
      let userTypesCNTemp = []
      arr.forEach(userItem => {
        if (userItem === 0) {
          userTypesCNTemp.push('维保经理')
        } else if (userItem === 1) {
          userTypesCNTemp.push('维保主管')
        }
      })
      this.special.tasksView.userTypesCN = userTypesCNTemp.join('、')
      this.$forceUpdate() // 强制更新视图
    },

    // 打开弹窗，编辑异常情况
    openDialog(policyId, i) {
      this.dialogPolicyId = policyId
      this.dialogDetSet = true
      let policyDetail = this.policyJson[policyId]
      console.log('policyDetail', policyDetail)

      this.ruleFormDialog.monitorVal = policyDetail.monitorVal
      this.ruleFormDialog.calcMethod = policyDetail.calcMethod
      this.ruleFormDialog.calcOperator = policyDetail.calcOperator
      this.ruleFormDialog.calcUnit = policyDetail.calcUnit
      this.ruleFormDialog.conditionFreqency = policyDetail.conditionFreqency
      this.ruleFormDialog.calcTimeInSeconds = policyDetail.calcTimeCN ? policyDetail.calcTimeCN : policyDetail.calcTimeInSeconds
      this.ruleFormDialog.calcThreshold = policyDetail.calcThreshold

      // 处理特殊字段
      this.specialRuleFormDialog.monitorObj = []
      let tempMoObjArr = policyDetail.monitorObj.split(':')
      this.specialRuleFormDialog.monitorObj.push(parseInt(tempMoObjArr[0]), parseInt(tempMoObjArr[1]), parseInt(tempMoObjArr[2]))
      this.specialRuleFormDialog.minute = parseInt(this.ruleFormDialog.calcTimeInSeconds / 60)
      this.specialRuleFormDialog.second = parseInt(this.ruleFormDialog.calcTimeInSeconds % 60)
      this.specialRuleFormDialog.minSec = this.ruleFormDialog.calcTimeInSeconds

      // 加载预览
      this.dialogPreview = this.special.conditionsView[i]
      console.log('this.dialogPreview', this.dialogPreview)

      console.log('this.ruleFormDialog', this.ruleFormDialog)
      console.log('this.specialRuleFormDialog', this.specialRuleFormDialog)
      
    },

    // 修改异常情况
    submitDialog() {
      // this.dialogPolicyId 为弹窗记录的规则id
      console.log(this.special.conditionsView)
      // 修改页面展示异常情况conditions值
      this.special.conditionsView.forEach(item => {
        if (item.id == this.dialogPolicyId) {
          item['calcTimeInSeconds'] = this.ruleFormDialog.calcTimeInSeconds
          item['calcTimeCN'] = this.ruleFormDialog.calcTimeInSeconds
          item['calcThreshold'] = this.ruleFormDialog.calcThreshold
          item['conditionFreqency'] = this.ruleFormDialog.conditionFreqency
        }
      })
      // console.log('this.special.conditionsView', this.special.conditionsView)

      // 修改提交表单异常情况conditions值
      this.ruleForm.conditions.items.forEach((item, i) => {
        if (item.policyId == this.dialogPolicyId) {
          item['timeInSeconds'] = this.ruleFormDialog.calcTimeInSeconds
          item['calcTimeCN'] = this.ruleFormDialog.calcTimeInSeconds
          item['threshold'] = this.ruleFormDialog.calcThreshold
          item['freqency'] = this.ruleFormDialog.conditionFreqency
        }
      })

      this.dialogDetSet = false
    },

    // 修改分秒
    minSecChange() {
      let min = this.specialRuleFormDialog.minute ? parseInt(this.specialRuleFormDialog.minute) : 0
      let sec = this.specialRuleFormDialog.second ? parseInt(this.specialRuleFormDialog.second) : 0
      this.specialRuleFormDialog.minSec = min * 60 + sec
      this.ruleFormDialog.calcTimeInSeconds = this.specialRuleFormDialog.minSec
    },


    // 获取检测项下拉选项
    getMoniObjOptions() {
      this.moniObjOptions = xymFun.getMoniObjOptions()
    },
    
    // 获取监测内容下拉选项
    getMonitorValOptions() {
      api.device.getMonitorVal().then(res => {
        this.monitorValOptions = []
        res.data.data.forEach((item, i) => {
          this.monitorValOptions.push({
            value: item.id,
            label: item.monitorVal,
          })
        })
      })
    },

    // 检测项选中值
    moniObjChange(monitorObj) {
      this.ruleFormDialog.monitorObj = monitorObj.join(':')
    },

    // 取消，返回模板页面
    goSetModel() {
      this.$router.push({
        path: '/detection-set-model',
        query: {
          regCode: this.ruleForm.elevId
        }
      })
    },

    // 提交，给维保公司添加模板
    submit() {
      console.log('special.tasksView', this.special.tasksView)
      // 处理特殊字段
      // 处理tasks
      this.ruleForm.tasks[0].userTypes = this.special.checkedUserTypes
      this.ruleForm.conditions = JSON.stringify(this.ruleForm.conditions)
      this.ruleForm.tasks = JSON.stringify(this.ruleForm.tasks)
      console.log('ruleForm11', this.ruleForm)
      api.detection.editMonitorMainten(this.ruleForm).then(res => {
        console.log('sub', res)
        
        if (res.data.code == 400) {
          this.$message.error(`${res.data.message}`)
        } else {
          this.$message.success(`${res.data.message}`)
          this.$router.push({
            path: '/detection-set-model',
            query: {
              regCode: this.ruleForm.elevId
            }
          })
        }

        
      })
    },

  },
  components: {
    'footer-temp': Footer,


  }
}
</script>

<style>
#DetectionAdd .dTime-item{
  padding-left: 56px;
}
#DetectionAdd .threshold-item{
  padding-left: 96px;
}
</style>


<style lang="stylus" scoped>
#DetectionAdd{
  @import '../../assets/stylus/xymStyle.styl'
}

</style>
