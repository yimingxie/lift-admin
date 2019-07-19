<template>
<div class="main-wrap" id="mission">
  <div class="row" >

    <div class="panel" style="padding-bottom:0">
      <div class="title"><div class="label1">作业计划</div></div>
      <div class="subSelect" :class="open ? 'openSel' :''">
  
       <radio-group :items="periods1" :value.sync="period1" >
          <span slot="label">筛选电梯：</span>
        </radio-group>
        <span class="splitLine" v-if="!open">|</span>
        <radio-group :items="periods2" :value.sync="period2">
          <span slot="label">处理进度：</span>
        </radio-group>
        <span class="splitLine" v-if="!open">|</span>
        <radio-group :items="periods3" :value.sync="period3">
          <span slot="label">作业类型：</span>
        </radio-group>
        
        <span class="openBtn" @click="openSelect()"><span class="dot" v-text="open ? '':'…'"></span>{{open ? '收起选项':'展开选项'}}</span>
      </div>
      <div class="subSelect" v-if="openCondition1 || openCondition2 || openCondition3">
        已选条件：
        <span>
          <el-tag class="conTag"
            :key="tag.label"
            v-for="tag in conditions1"
            closable
            :disable-transitions="true"
            @close="handleClose1(tag)">
            {{tag.label}}
          </el-tag>
          <el-tag class="conTag"
            :key="tag.label"
            v-for="tag in conditions2"
            closable
            :disable-transitions="true"
            @close="handleClose2(tag)">
            {{tag.label}}
          </el-tag>
          <el-tag class="conTag"
            :key="tag.label"
            v-for="tag in conditions3"
            closable
            :disable-transitions="true"
            @close="handleClose3(tag)">
            {{tag.label}}
          </el-tag>
        </span>
        <span class="openBtn" @click="clearCondition">清空筛选</span>
      </div>
      <div class="subBtns">
        <button class="btn blueBtn">创建计划</button>
        <button class="btn whiteBtn">立即派单</button>
        <button class="btn whiteBtn" >导出计划</button>
        <!-- <button class="btn whiteBtn" >全选</button> -->
        <span style="margin: 5px 10px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkbox16">全选</el-checkbox>
        </span>
        <search-input v-model.trim="searchKey" placeholderValue="搜索电梯注册代码/详细地址">
          <span slot="btn" class="search_btn" @click="searchAccount()" @keyup.enter.native="searchAccount()"></span>
        </search-input>
      </div>

    </div>
    
  </div>
  <div class="row" >
    <div style="float:left">
      <div class="panel" style="padding:0">
        {{checkedDate}}
        <calendar :todos="todos" :snycCheckedDate.sync="checkedDate">

          <template slot-scope="slotProps" >
            <!-- <span v-if="slotProps.todo.isComplete">✓</span> -->
            <span class="ratio"><span>{{slotProps.todo.msg}}</span>/{{slotProps.todo.total}}</span>
            <span v-if="slotProps.todo.overtime" class="overtime">
              <el-progress type="circle" :show-text="false" :percentage="slotProps.todo.msg / slotProps.todo.total * 100" color="#4272FF" :stroke-width="4" :width="49"></el-progress>
            </span>
            <span v-else >
              <el-progress type="circle" :show-text="false" :percentage="slotProps.todo.msg / slotProps.todo.total * 100" color="#4272FF" :stroke-width="4" :width="49"></el-progress>
            </span>
            <i v-if="slotProps.todo.msg === 6" class="dispatch labelSize labelPosition"></i>
            <i v-if="slotProps.todo.overtime" class="warning labelSize labelPosition"></i>
          </template>
        </calendar>

      </div>
      <div class="panel" style="padding: 2px 0 4px 25px;">
        <div class="title missionTitle " style="border-bottom:0">
          <span class="taskTotal">124</span>
          <span class="taskTotalText">任务总数</span>
          <span class="splitLine" style="margin: 0 11px;">|</span>
          <span>维保总数：4</span>
          <span class="splitLine" style="margin: 0 11px;">|</span>
          <span>故障处理：23</span>
          <span class="splitLine" style="margin: 0 11px;">|</span>
          <span>事件救援：4</span>
        </div>
      </div>
    </div>
    <div style="margin-left:527px">
      <div class="panel">

        <!-- 任务总数等一些统计数据 -->
        <div class="title missionTitle">
          <span class="taskTotal">8</span>
          <span class="taskTotalText">任务总数</span>
          <span class="splitLine">|</span>
          <span>未创建维保计划：13</span>
          <span class="splitLine">|</span>
          <span>未派单：4</span>
          <span class="splitLine">|</span>
          <span>即将逾期：<i style="color: #FFC60B;">1</i></span>
          <span class="splitLine">|</span>
          <span>已逾期：<i style="color: #FA4F43;">4</i></span>
        </div>
        <!-- 任务总数等一些统计数据 end-->

        <!-- //创建计划 -->
        <div class="creatPlan">
          <div>
            <span class="titlePlan">创建计划</span>
            <span class="btns">
              <i class="btnBlue">保存</i>
              <span class="splitLine">|</span>
              <i class="btnGray" @click="cancel">取消</i>
            </span>
          </div>
          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form> -->
          <el-form ref="form" :model="formInline" label-width="84px" >
            <el-form-item label="作业电梯：">
              <el-select v-model="formInline.user" clearable placeholder="请选择">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业信息：">
              <el-date-picker 
                class="regionPicker"
                prefix-icon="test-icon" 
                format="MM-dd HH:mm"
                v-model="formInline.region"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
              <span class="splitLine">|</span>

              <el-select v-model="formInline.region" clearable placeholder="请选择" class="regionPicker">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- //创建计划 end-->

        <!-- //任务列表 -->
        <div class="missionTable">
          <div v-for="(mission,index) in missionList" :key="index" class="missionTr" >
            <p :style="{opacity:(nowTr !== mission.lift && nowTr !== ''?'0.3':'1')}">
              <i class="dispatch labelSize"></i>
              <i class="history labelSize"></i>
              <span class="lift">作业电梯：{{mission.lift}}</span>
              <span v-if="nowTr === ''" class="addMission" @click="addMission(mission.lift)"></span>
              <span class="address">南山区-南油  南光城市花园1栋B座</span>
            </p>
            <div style="line-height:40px;margin-top: -10px;" v-if="nowTr === mission.lift">
              <el-date-picker 
                class="regionPicker"
                prefix-icon="test-icon" 
                format="MM-dd HH:mm"
                v-model="checkTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
              <span class="splitLine">|</span>

              <el-select v-model="checkTpye" clearable placeholder="请选择" class="regionPicker">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="btns">
                <i class="btnBlue">保存</i>
                <span class="splitLine">|</span>
                <i class="btnGray" @click="cancel">取消</i>
              </span>
            </div>
            <p v-for="(order, index1) in mission.workOrder" :key="index1" class="order">
              <el-checkbox-group :disabled="nowTr !== ''" style="display:inline-block" v-model="checkedStaffs" @change="handleCheckedStaffsChange">
                <el-checkbox :label="order.id" :key="index1">{{nonetext}}</el-checkbox>
              </el-checkbox-group>
              <i style="color:#FFC60B;margin-right:2px">●</i>
              <span :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                <span>工单编号：{{order.order}}</span>
                <span class="splitLine">|</span>
                <span>{{order.time}}</span>
                <span class="splitLine">|</span>
                <span>月度维保</span>
                <span class="splitLine">|</span>
                <span>{{order.person}}</span>
              </span>
              <span class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                <i class="btnBlue">派单</i>
                <span class="splitLine">|</span>
                <i class="btnBlue">修改</i>
                <span class="splitLine">|</span>
                <i class="btnRed">删除</i>
              </span>
              

            </p>
          </div>
        </div>
        <!-- //任务列表 end-->

      </div>
    </div>
    
    
  </div>
  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import calendar from "../../components/DateContainer";


export default {
  data() {
    return {
      formInline: {
          user: '',
          region: ''
        },
      checkedDate:'',
      todos: [
        {date: 1,msg: 4, total:6,overtime:2},
        {date: 2,msg: 2, total:5},
        {date: 3, msg: 4,total:8},
        {date: 4,msg: 6,total:8},
        {date: 6,msg: 4,total:8},
        {date: 12,msg: 2,total:8},
        {date: 16,msg: 3,total:12,overtime:2},
        {date: 26,msg: 5,total:7},
        {date: 31,msg: 6,total:9},
      ],
      totalPageSize:0, // 总页数
      queryParam:{
        // pageNo: 1,
        // pageSize: 100,
        offset:1,
        limit:10,
        column: "create_time",
        order: false,
        queryStr: "",
        corpId:window.localStorage.getItem('corpId')
      },
      getAllAccountJson: [],
      
      searchKey:'',
      period1:"-1",
      periods1: [
        { label: '全部', value: "-1" },
        { label: '已创建计划', value: "7" },
        { label: '待创建计划', value: "30", color:'#76DDAC' },
      ],
      period2:"-1",
      periods2: [
        { label: '全部', value: "-1" },
        { label: '待派单', value: "0", color:'#FFA90B'},
        { label: '已派单', value: "1", color:'#34414C' },
        { label: '已接单', value: "2", color:'#9FB9F7' },
        { label: '已完成', value: "3", color:'#4272FF' },
        { label: '已超时', value: "4", color:'#FA4F43' },
        { label: '已关闭', value: "5", color:'#C2C7CC' },
      ],
      period3:"-1",
      periods3: [
        { label: '全部', value: "-1" },
        { label: '例行维保', value: "0" },
        // { label: '月度维保', value: "1" },
        // { label: '季度维保', value: "2" },
        // { label: '年度维保', value: "3" },
        // { label: '故障处理', value: "4" },
        // { label: '事故救援', value: "5" },
      ],
      open:false,
      conditions1:[],
      conditions2:[],
      conditions3:[],
      openCondition1:false,
      openCondition2:false,
      openCondition3:false,

      missionList:[],
      checkAll: false,
      checkedStaffs: [],
      isIndeterminate: false,
      checkedAllStaff:[],
      nonetext:'',
      checkTime:'',
      checkTpye:'',
      tpyeOptions: [
        { label: '例行维保', value: "0" },
        { label: '月度维保', value: "1" },
        { label: '季度维保', value: "2" },
        { label: '年度维保', value: "3" },
        { label: '故障处理', value: "4" },
        { label: '事故救援', value: "5" },
      ],
      nowTr:''
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
    'calendar':calendar
  },
  watch:{
    period1(val){
      this.conditions1 = []
      this.openCondition1 = false
      if(val !== "-1"){
        this.conditions1 = this.periods1.filter(item => item.value === val )
        this.openCondition1 = true
      }
    },
    period2(val){
      
      this.conditions2 = []
      this.openCondition2 = false
      if(val !== "-1"){
        this.conditions2 = this.periods2.filter(item => item.value === val )
        // this.conditions2.push(con1[0].label)
        // console.log("con1s" + con1[0].label)
        this.openCondition2 = true
      }
    },
    period3(val){
      this.conditions3 = []
      this.openCondition3 = false
      if(val !== "-1"){
        this.conditions3 = this.periods3.filter(item => item.value === val )
        this.openCondition3 = true
      }
    }
  },
  mounted() {
    // this.getAllAccountData()
   
    for(var i= 0; i<10 ; i++){
      var mission = {
        lift:i,
        address:'南山区-南油 南光城市花园1栋B座',
        workOrder:[{
            id:'1',
            order:'12345678901234',
            time:'06-10 09:00',
            type:'月度维保',
            person:'覃一，林都晨'
          },{
            id:'2',
            order:'12345678901234',
            time:'06-10 09:00',
            type:'月度维保',
            person:'覃一，林都晨'
        }]
        
      }
      this.missionList.push(mission)
    }
    // console.log("asfg" + JSON.stringify(this.missionList))
  },
  methods: {
    cancel(){
      this.nowTr = ''
    },
    // JS获取n至m随机整数
    randomNumber(lower,upper){
      return Math.floor(Math.random()*(upper-lower+1))+lower;
    },
    // 添加任务
    addMission(index){
      this.nowTr = index
    },
    // 全选，非全选
    handleCheckAllChange(val) {
      this.checkedStaffs = val ? this.checkedAllStaff : [];
      this.isIndeterminate = false;
      console.log("check:" + this.checkedStaffs)
    },
    // 点击多选框
    handleCheckedStaffsChange(value) {
      console.log("check:" + value)
      console.log("Allcheckop:==" + this.checkedAllStaff)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.getAllAccountJson.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.getAllAccountJson.length;
    },
    // 清空筛选
    clearCondition(){
      this.openCondition1 = false
      this.openCondition2 = false
      this.openCondition3 = false
      this.period1 = "-1"
      this.period2 = "-1"
      this.period3 = "-1"
    },
    // 关闭标签
    handleClose1(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.period1 = '-1'
    },
    // 关闭标签
    handleClose2(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.period2 = '-1'
    },
    // 关闭标签
    handleClose3(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.period3= '-1'
    },
    // 展开选项
    openSelect(){
      this.open = !this.open
      if (this.open) {
        this.periods3 = [
          { label: '全部', value: "-1" },
          { label: '例行维保', value: "0" },
          { label: '月度维保', value: "1" },
          { label: '季度维保', value: "2" },
          { label: '年度维保', value: "3" },
          { label: '故障处理', value: "4" },
          { label: '事故救援', value: "5" },
        ]
      } else {
        this.periods3 = [
          { label: '全部', value: "-1" },
          { label: '例行维保', value: "0" }
        ]
      }
      
    },
    // 查询所有账户
    getAllAccountData(){
      api.accountApi.getAccounts(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          this.totalPageSize = res.data.data.total

        } else {
          this.getAllAccountJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
  

    // 每页条数变化
    handleSizeChange(val) {
      this.queryParam.limit = val
      // console.log(`每页 ${val} 条`);
      this.getAllAccountData()
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.queryParam.offset = val
      // console.log(`当前页: ${val}`);
      this.getAllAccountData()
    },
    

    // 搜索真实姓名/手机号
    searchAccount(){
      this.queryParam.queryStr = this.searchKey
      this.getAllAccountData()
    }

  },
}
</script>

<style lang="stylus">
#mission
  .subSelect
    transition all 0.3s
  .dot
    color: #7E8A95;
    padding: 0 14px;
  .openSel
    height 131px
    .btn-group
      display: block;
  .openBtn
    color: #4272FF;
    position absolute
    bottom: 4px;
    right: 0;
    cursor pointer
  .ratio
    position absolute
    font-size: 12px;
    color: #7E8A95;
    // top: 15px;
    width: 49px;
    height: 49px;
    line-height 48px
    text-align: center;
    span
      font-size: 16px;
      color: #34414C;
  .highlight
    .ratio
      color: rgba(255,255,255,0.65);
      span
        color: #FFFFFF;
  .highlight .el-progress /deep/ path:first-child {
    stroke: #8196FF;
  }
  .highlight .el-progress /deep/ path:nth-child(2) {
    stroke: #fff;
  }
  .overtime .el-progress /deep/ path:first-child {
    stroke: #FA4F43;
  }
  .dispatch
    background url('../../assets/images/hs/dispatch.png') no-repeat center;
  .warning
    background url('../../assets/images/hs/warningRed.png') no-repeat center;
  .history
    background url('../../assets/images/hs/history.png') no-repeat center;
  .labelSize
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: -2px;
  .labelPosition
    position: absolute
    top: -37px;
    right: 4px;
  .missionTitle
    padding: 12px 0 11px 26px
    .taskTotal
      font-size: 24px;
      color: #4272FF;
    .taskTotalText
      font-size: 14px;
      color: #4272FF;
    .splitLine
      margin: 0 3px
  .btns
    float:right;
  .btnRed
    color: #E9645D;
    cursor pointer
  .btnBlue
    cursor pointer
    color: #4272FF;
  .btnGray
    color: #7E8A95;
    cursor pointer
  .missionTable
    p:nth-child(1)
      margin-bottom:12px
    .missionTr
      border-bottom: 1px solid #E8E8E8;
      line-height 24px;
      padding: 18px 0 12px;
    .lift
      font-size: 16px;
      color: rgba(0,0,0,0.65);
      font-weight: 600;
    .address
      float:right
    .addMission
      width 14px 
      height 14px
      display:inline-block 
      background url('../../assets/images/hs/addMission.png') no-repeat center;
      margin-left: 5px
      cursor: pointer
    
    .order
      color: #7E8A95;
      margin-left: 43px;
    .splitLine
      margin: 0 3px
    
  .regionPicker .el-cascader__label, .regionPicker .el-input__inner {
    padding: 0 !important;
  }
  .creatPlan
    padding 25px 0
    .titlePlan
      font-size: 20px;
    .splitLine
      margin: 0 3px
    .btns
      line-height: 31px;
</style>
