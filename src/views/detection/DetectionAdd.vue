<template>
  <div id="DetectionAdd">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/lift-list')">数字电梯</span>
        <em>/</em>
        <span class="on">新增监测</span>
      </div>

      <div class="detAdd-content">
        <div class="lift-list-title">添加监测（仅对开发开放）</div>
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
                    <el-form-item prop="moniName" class="detAdd-form-item">
                      <el-input v-model="ruleForm.moniName" size="small"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="detAdd-box">
                  <div class="detAdd-box-label clearfix">
                    <span class="detAdd-label-span detAdd-label-span-yellow">2</span><em>监测类型：</em>
                  </div>
                  <div class="detAdd-box-inp">
                    <el-form-item prop="moniType" class="detAdd-form-item">
                      <el-select v-model="ruleForm.moniType" placeholder="请选择" size="small" style="width: 100%;">
                        <el-option v-for="item in moniTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="detAdd-box">
                  <div class="detAdd-box-label clearfix">
                    <span class="detAdd-label-span detAdd-label-span-green">3</span><em>监测描述：</em>
                  </div>
                  <div class="detAdd-box-inp">
                    <el-form-item prop="moniDec" class="detAdd-form-item">
                      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.moniDec"></el-input>
                    </el-form-item>
                  </div>
                </div>


              </div>
            </div>

            <div class="detAdd-item">
              <div class="detAdd-item-wrap">
                <div class="detAdd-item-title">如果发生以下异常情况</div>
                <div class="detAdd-abnormal-btn">+ 添加异常情况</div>
                <div class="detAdd-abnormal-ul">
                  <div class="detAdd-abnormal-li clearfix">
                    <span class="detAdd-label-span detAdd-label-span-blue">1</span>
                    <div class="detAdd-abul-p">机房-电动机-外壳的温度/持续5分钟/大于/50℃</div>
                    <div class="detAdd-abul-edit" @click="dialogDetSet=true"></div>
                  </div>
                  <div class="detAdd-abnormal-li clearfix">
                    <span class="detAdd-label-span detAdd-label-span-yellow">2</span>
                    <div class="detAdd-abul-p">机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃</div>
                    <div class="detAdd-abul-edit" @click="dialogDetSet=true"></div>
                  </div>
                </div>
                <div class="detAdd-item-title">就发送消息通知</div>
                <div class="detAdd-msg-content">
                  <el-checkbox-group v-model="checkedMsgList">
                    <el-checkbox v-for="(item, i) in msgOptions" :label="item.value" :key="i">{{item.label}}</el-checkbox>
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
                    <el-select size="small" v-model="carryValue" placeholder="请选择">
                      <el-option v-for="(item, i) in carryOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>

            </div>

            <div class="detAdd-item" style="border-bottom: none;">
              <div class="detAdd-item-wrap">
                <div class="detAdd-item-title">预览</div>
                <div class="detAdd-preview">
                  机房-电动机-外壳的温度/持续5分钟/大于/50℃，
                  <br>
                  或机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃，
                  <br>
                  就发送通知给维保经理、维保主管
                </div>
              </div>
            </div>

            <div class="form-btn">
              <input class="la-btn la-btn-cancel" type="button" value="取消">
              <input class="la-btn la-btn-submit" type="button" value="保存">
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
                  <el-cascader ref="moniCascader" placeholder="请选择" :options="moniObjOptions" v-model="selectedMoniObjOptions" size="small" @change="moniObjChange" clearable style="width: 100%;"></el-cascader>
                </el-form-item>
              </div>
            </div>
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">监测内容：</div>
              <div class="dia-citem-ib">
                <el-form-item>
                  <el-select size="small" v-model="ruleFormDialog.monitorVal" placeholder="请选择">
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
                  <el-select size="small" v-model="ruleFormDialog.condition" placeholder="请选择">
                    <el-option v-for="(item, i) in conditionOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">条件内容：</div>
              <div class="dia-citem-ib">
                <div class="detAddDia-citem-ib2">
                  <div class="detAddDia-citem-ib2-title">持续</div>
                  <div class="detAddDia-citem-ib2-select">
                    <el-form-item>
                      <el-select size="small" v-model="ruleFormDialog.dTimeUnit" placeholder="请选择">
                        <el-option v-for="(item, i) in dTimeUnitOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item prop="durationTime" class="dTime-item">
                    <el-input v-model="ruleFormDialog.durationTime" size="small"></el-input>
                  </el-form-item>
                </div>
                <div class="detAddDia-citem-ib2">
                  <el-form-item prop="occ" class="occ-item">
                    <el-input v-model="ruleFormDialog.occ" size="small"></el-input>
                  </el-form-item>
                  <div class="detAddDia-citem-ib2-unit">次</div>
                </div>

                <div class="detAddDia-citem-ib2">
                  <div class="detAddDia-citem-ib2-select2">
                    <el-form-item>
                      <el-select size="small" v-model="ruleFormDialog.thresholdSign" placeholder="请选择">
                        <el-option v-for="(item, i) in thresholdSignOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item prop="threshold" class="threshold-item">
                    <el-input v-model="ruleFormDialog.threshold" size="small"></el-input>
                  </el-form-item>
                  <div class="detAddDia-citem-ib2-unit">℃</div>
                </div>
                
              </div>
            </div>

          </div>

          <div class="dia-con-head">预览</div>
          <div class="dia-clist">
            <div class="dia-clist-preview">持续5秒内，出现xxxx</div>
          </div>

          <div class="form-btn" style="border-top: none;padding-bottom: 60px;">
            <input class="la-btn la-btn-cancel" type="button" value="取消">
            <input class="la-btn la-btn-submit" type="button" value="确认">
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
      dialogDetSet: false,
      ruleForm: {
        moniName: '',
        moniType: '',
        moniDec: '',
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
        condition: '',
        dTimeUnit: '秒',
        occ: '',
        threshold: '',
        thresholdSign: '',
      },
      rulesDialog: {

      },
      dTimeUnitOptions: [
        {value: '秒', label: '秒'},
        {value: '分', label: '分'},
      ],
      thresholdSignOptions: [
        {value: 0, label: '大于等于'},
        {value: 1, label: '等于'},
        {value: 2, label: '小于等于'},
      ],
      moniObjOptions: [],
      selectedMoniObjOptions: [],
      moniTypeOptions: [
        {value: '预警', label: '预警'},
        {value: '事件', label: '事件'},
        {value: '故障', label: '故障'},
        {value: '违规', label: '违规'},
      ],
      checkedMsgList: [],
      msgOptions: [
        {value: '0', label: '维保经理'},
        {value: '1', label: '维保主管'},
      ],
      carryOptions: [
        {value: '0', label: '任意一个异常'},
        {value: '1', label: '全部异常'},
      ],
      carryValue: '',
      monitorValOptions: [],
      conditionOptions: [
        {value: 0, label: '瞬间大于等于/小于等于/等于/不等于预设值'},
        {value: 1, label: '一段时间内，平均值大于等于/小于等于/等于/不等于.预设值'},
        {value: 2, label: '一段时间内骤增骤减达到预设值'},
        {value: 3, label: '持续一段时间大于等于/小于等于/不等于/等于预设值'},
        {value: 4, label: '一段时间内出现多次大于等于/小于等于/不等于/等于预设值'},

      ],


    }
  },
  mounted() {
    // 加载检测项下拉选项
    this.getMoniObjOptions()

    // 加载监测内容下拉选项
    this.getMonitorValOptions()

  },
  methods: {
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
