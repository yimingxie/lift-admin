<template>
  <div id="DeviceAddGi">
    <el-button type="primary" @click="dialogAddDevice = true">通用平台添加设备</el-button>


    <div>
      <table class="temp-table">
        <tr>
          <th>SN</th>
          <th>ID</th>
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
          <td>{{item.dev_sn}}</td>
          <td>{{item.dev_eui}}</td>
          <td>{{item.mod_type}}</td>
          <td>{{item.dev_model}}</td>
          <td>{{item.monitor_val}}</td>
          <td>{{item.dev_name}}</td>
          <td>{{item.dev_type}}</td>
          <td>{{item.dev_brand}}</td>
          <td>{{item.man_id}}</td>
          <td>{{item.create_time}}</td>
        </tr>
      </table>
    </div>

    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogAddDevice" :show-close="false" width="690px">
      <div>
        <div class="dia-title">添加设备</div>
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head"> </div>
            <div class="dia-clist">
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备sn：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="dev_sn">
                    <el-input v-model="ruleForm.dev_sn" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备模组id：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="dev_eui">
                    <el-input v-model="ruleForm.dev_eui" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">模组类型：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="mod_type">
                    <el-input v-model="ruleForm.mod_type" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备型号：</div>
                <div class="dia-citem-ib">
                  <el-form-item>
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
                    <el-checkbox v-for="(item, i) in moniObjList" :label="item.id" :key="i">{{item.monitor_val}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">设备名称：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="dev_name">
                    <el-input v-model="ruleForm.dev_name" size="small"></el-input>
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
                  <el-form-item prop="dev_brand">
                    <el-input v-model="ruleForm.dev_brand" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">制造商id：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="man_id">
                    <el-input v-model="ruleForm.man_id" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="dia-citem clearfix">
                <div class="dia-citem-label">扩展属性：</div>
                <div class="dia-citem-ib">
                  <el-form-item prop="extend">
                    <el-input v-model="ruleForm.extend" size="small"></el-input>
                  </el-form-item>
                </div>
              </div>
       
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
        dev_sn: '',
        dev_eui: '',
        mod_type: '',
        dev_model: '',
        monitor_val: '',
        dev_name: '',
        dev_type: '',
        dev_brand: '',
        man_id: '',
        extend: '',
      },
      ruleForm: {
        dev_sn: '',
        dev_eui: '',
        mod_type: '',
        dev_model: '',
        monitor_val: '',
        dev_name: '',
        dev_type: '',
        dev_brand: '',
        man_id: '',
        extend: '',
      },
      rules: {
        // reg_code: [
        //   { required: true, message: '请输入电梯注册代码', trigger: 'blur' },
        // ],
        // dev_eui: [
        //   { required: true, message: '请输入电梯注册代码', trigger: 'blur' },
        // ],
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
        // {"monitor_val": "温度", "id": 1},
      ],
      checkedMoniObj: [],
      typeOptions: [
        {label: '传感器'},
        {label: '控制器'},
      ],
      typeValue: '',

      // 重组监测类型和内容对应表
      modelContentList: {},
      deviceListGi: []


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
          this.modelContentList[item.id] = item.monitor_val
        })
        console.log('监测内容重组表', this.modelContentList)
      })
    },

    // 查询通用设备列表
    getDeviceListGi() {
      api.device.getDeviceListGi().then(res => {
        console.log(res)
        this.deviceListGi = res.data.data.records
      })

    },

    // 获取设备型号下拉选中值，渲染监测内容多选框
    modelChange(dev_model) {
      let that = this
      console.log(dev_model)
      this.ruleForm.dev_model = dev_model
      this.checkedMoniObj = [] // 重置已选择的选项
      // 设备型号与监测内容相绑定
      // 1.发起请求，获取监测内容id（多条）    2. 匹配监测内容表，将id对应的中文内容展示
      api.device.getMonitorValByModel(dev_model).then(res => {
        this.moniObjList = []
        let list = res.data.data
        list.forEach((item, i) => {
          this.moniObjList.push({
            "id": item.monitor_val,
            "monitor_val": that.modelContentList[item.monitor_val]
          })

        })
        console.log('监测内容多选框', this.moniObjList)
      })
      
    },

    // 获取监测内容多选框的选中值
    checkboxChange(monitor_val) {
      this.ruleForm.monitor_val = monitor_val.join(',')
    },

    // 获取设备类型下拉框的选中值
    typeChange(dev_type) {
      this.ruleForm.dev_type = dev_type
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
              that.$router.go(0)
            } else {
              that.$message.error(`${res.data.message}`)
            }
            // 清空表单
            that.$refs.diaForm.resetFields()
            that.ruleForm = that.ruleFormBlank
            that.dialogAddDevice = true
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
@import '../../assets/stylus/xymStyle.styl'
#DeviceAddGi{
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


</style>
