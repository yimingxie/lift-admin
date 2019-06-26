<template>
  <div id="DeviceAddGi">
    <el-button type="primary" @click="dialogAddDevice = true">通用平台添加设备</el-button>


    <div>
      <table class="temp-table">
        <tr>
          <th>devEui</th>
          <th>是否绑定</th>
          <th>SN</th>
          <th>模组类型</th>
          <th>设备型号</th>
          <th>监测内容</th>
          <th>设备名称</th>
          <th>设备类型</th>
          <th>设备品牌</th>
          <th>制造商id</th>
          <th>创建时间</th>
        </tr>
        <tr v-for="(item, i) in deviceListGi" :key="i">
          <td>{{item.devEui}}</td>
          <td>{{item.isBind ? '是' : '否'}}</td>
          <td>{{item.devSn}}</td>
          <td>{{item.modType}}</td>
          <td>{{item.devModel}}</td>
          <td>{{item.monitorVal}}</td>
          <td>{{item.devName}}</td>
          <td>{{item.devType}}</td>
          <td>{{item.devBrand}}</td>
          <td>{{item.manId}}</td>
          <td>{{item.createTime}}</td>
        </tr>
      </table>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="添加设备" :visible.sync="dialogAddDevice" :show-close="false" width="690px">
      <div>
        <!-- <div class="dia-title">添加设备</div> -->
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head"> </div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备sn：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="devSn">
                    <el-input v-model="ruleForm.devSn" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备模组id：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="devEui">
                    <el-input v-model="ruleForm.devEui" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">模组类型：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="modType">
                    <el-input v-model="ruleForm.modType" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备型号：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="modelValue">
                    <el-select v-model="modelValue" placeholder="请选择" @change="modelChange">
                      <el-option v-for="(item, i) in modelOptions" :key="i" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix" style="padding-bottom: 20px;">
                <div class="dia-citem-label" style="line-height: 22px;">监测内容：</div>
                <div class="dia-citem-ib">
                  <el-checkbox-group v-model="checkedMoniObj" @change="checkboxChange">
                    <el-checkbox v-for="(item, i) in moniObjList" :label="item.id" :key="i">{{item.monitorVal}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备名称：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="devName">
                    <el-input v-model="ruleForm.devName" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备类型：</div>
                <div class="dia-citem-ib">
                  <el-form-item>
                    <el-select v-model="typeValue" placeholder="请选择" @change="typeChange">
                      <el-option v-for="(item, i) in typeOptions" :key="i" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备品牌：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="devBrand">
                    <el-input v-model="ruleForm.devBrand" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">制造商id：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="manId">
                    <el-input v-model="ruleForm.manId" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <!-- <div class="dia-citem clearfix">
                <div class="dia-citem-label">扩展属性：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="extend">
                    <el-input v-model="ruleForm.extend" size="small"></el-input>
                  </el-form-item>
                </div>
              </div> -->
       
            </div>

          </el-form>

        </div>
        <div class="dia-btn-con">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消">
          <input class="dia-btn dia-btn-submit" @click="submit" type="button" value="确认">
        </div>

      </div>

  
    </el-dialog>

  </div>
</template>

<script>
import api from '../../api'
export default {
  data() {
    return {
      dialogAddDevice: false,
      ruleFormBlank: {
        devSn: '',
        devEui: '',
        modType: '',
        devModel: '',
        monitorVal: '',
        devName: '',
        devType: '',
        devBrand: '',
        manId: '',
        extend: '',
      },
      ruleForm: {
        devSn: '',
        devEui: '',
        modType: '',
        devModel: '',
        monitorVal: '',
        devName: '',
        devType: '',
        devBrand: '',
        manId: '',
        extend: '',
      },
      rules: {
        devSn: [{ required: true, message: '必填', trigger: 'blur' }],
        devEui: [{ required: true, message: '必填', trigger: 'blur' }],
        modType: [{ required: true, message: '必填', trigger: 'blur' }],
        // devModel: [{ required: true, message: '必填', trigger: 'change' }],
        monitorVal: [{ required: true, message: '必填', trigger: 'blur' }],
        devName: [{ required: true, message: '必填', trigger: 'blur' }],
        devType: [{ required: true, message: '必填', trigger: 'blur' }],
        devBrand: [{ required: true, message: '必填', trigger: 'blur' }],
        manId: [{ required: true, message: '必填', trigger: 'blur' }],

        // modelValue: [{ required: true, message: '必填', trigger: 'change' }],
 
      },
      modelOptions: [
        {label: 'WS'},
        {label: 'VIB'},
        {label: 'Thermal'},
        {label: 'Tacho'},
        {label: 'Rht'},
        {label: 'Prox'},
        {label: 'LD'},
        {label: 'IRT'},
        {label: '600V&60V'},
        {label: '200A'},
      ],
      modelValue: '',
      moniObjList: [
        // {"monitorVal": "温度", "id": 1},
      ],
      checkedMoniObj: [],
      typeOptions: [
        {label: '传感器'},
        {label: '控制器'},
      ],
      typeValue: '',

      // 重组监测类型和内容对应表
      modelContentList: {},
      deviceListGi: [],
      giParams: {
        "offset": "1",
        "limit": "100",
      },


    }
  },
  mounted() {
    // 获取所有监测内容表，重组表
    this.transformMonitorVal()

    // 查询通用设备列表
    this.getDeviceListGi()

    
  },
  methods: {
    // 获取所有监测内容表，重组表，其中的id与设备类型中的监测内容对应
    transformMonitorVal() {
      api.device.getMonitorVal().then(res => {
        this.modelContentList = {}
        res.data.data.forEach((item, i) => {
          this.modelContentList[item.id] = item.monitorVal
        })
        console.log('监测内容重组表', this.modelContentList)
      })
    },

    // 查询通用设备列表
    getDeviceListGi() {
      api.device.getDeviceListGi(this.giParams).then(res => {
        console.log(res)
        this.deviceListGi = res.data.data.records
      })

    },

    // 获取设备型号下拉选中值，渲染监测内容多选框
    modelChange(devModel) {
      let that = this
      console.log(devModel)
      this.ruleForm.devModel = devModel
      this.ruleForm.modelValue = devModel
      this.checkedMoniObj = [] // 重置已选择的选项
      // 设备型号与监测内容相绑定
      // 1.发起请求，获取监测内容id（多条）    2. 匹配监测内容表，将id对应的中文内容展示
      api.device.getMonitorValByModel(devModel).then(res => {
        this.moniObjList = []
        let list = res.data.data
        list.forEach((item, i) => {
          this.moniObjList.push({
            "id": item.monitorVal,
            "monitorVal": that.modelContentList[item.monitorVal]
          })

        })
        console.log('监测内容多选框', this.moniObjList)
      })
      
    },

    // 获取监测内容多选框的选中值
    checkboxChange(monitorVal) {
      this.ruleForm.monitorVal = monitorVal.join(',')
    },

    // 获取设备类型下拉框的选中值
    typeChange(devType) {
      this.ruleForm.devType = devType
    },

    // 提交
    submit() {
      let that = this
      this.$refs.diaForm.validate(valid => {
        if (valid) {
          api.device.addDeviceGi(this.ruleForm).then(res => {
            // alert('添加成功')
            // console.log(res)
            if (res.data.code == '200') {
              that.$message.success(`${res.data.message}`)
              // 清空表单
              that.$refs.diaForm.resetFields()
              that.ruleForm = that.ruleFormBlank
              that.dialogAddDevice = true
              setTimeout(function() {
                that.$router.go(0)
              }, 500)

            } else {
              that.$message.error(`${res.data.message}`)
            }
            
          })
        }
      })
    }

  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
#DeviceAddGi{
  @import '../../assets/stylus/xymStyle.styl'

  .temp-table{
    width 100%;
    margin-top 20px;
  }
  .temp-table th{
    padding: 10px;
    border: 1px solid black;
  }
  .temp-table td{
    padding: 10px;
    border: 1px solid black;
  }

}

@media screen and (max-width: 1360px) {
  #DeviceAddGi{
    min-width: 1360px;
  }
}


</style>
