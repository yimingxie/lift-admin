<template>
<div class="main-wrap" id="mission">
  <div class="row" >

    <div class="panel" style="padding-bottom:0">
      <router-link to="/missionDetail">
        <span>任务详情</span>
      </router-link>
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
        <button class="btn blueBtn" @click="createAPlan" v-if="checkedDate.length > 8 && parseInt(checkedDate.substring(5,7)) >= parseInt(NowMonth)">创建计划</button>
        <button class="btn whiteBtn">立即派单</button>
        <button class="btn whiteBtn">导出</button>
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
  <div class="row" style="min-height: 600px;">
    <div style="position: absolute;">
      <div class="panel" style="padding:0">
        <div style="position: absolute;z-index:999;right:2px;top:15px">
          <!-- {{NowMonth}}
          {{checkedDate}} -->
          <!-- {{ checkedDate.length === 7}}
          {{(checkedDate.substring(5,7) != NowMonth && checkedDate.length === 7)}} -->
          <!-- 月视图本月才会出现 -->
          <button class="btn whiteBtn" :class="(parseInt(checkedDate.substring(5,7)) < parseInt(NowMonth) || checkedDate.length !== 7)? 'disableWhiteBtn' :''">生成任务工单</button>
          <!-- <button class="btn whiteBtn" :class="(parseInt(checkedDate.substring(5,7)) < parseInt(NowMonth) || checkedDate.length !== 7)? 'disableWhiteBtn' :''">生成维保计划</button> -->
        </div>
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
          <!-- <span>未创建维保计划：13</span>
          <span class="splitLine">|</span> -->
          <span>未派单：4</span>
          <span class="splitLine">|</span>
          <span>已完成：1</span>
          <span class="splitLine">|</span>
          <span>已超时：<i style="color: #FA4F43;">4</i></span>
        </div>
        <!-- 任务总数等一些统计数据 end-->

        <!-- //创建计划 -->
        <div class="creatPlan" v-if="showCreatePlan">
          <div style="margin-bottom: 25px">
            <span class="titlePlan">创建计划</span>
            <span class="btns">
              <i class="btnBlue" @click="addMission2">保存</i>
              <span class="splitLine" style="margin:0 3px">|</span>
              <i class="btnGray" @click="cancelCreatePlan">取消</i>
            </span>
          </div>
          
          <el-form ref="form" :model="createPlanParam" label-width="84px" >
            <!-- <el-form-item label="作业电梯：">
              <el-input v-model="createPlanParam.elevCode"></el-input>
            </el-form-item> -->
            <el-form-item label="作业电梯：">
              <search-code @childCode="searchLift"></search-code>
            </el-form-item>
            <el-form-item label="作业信息：" v-if="showCreatePlan2">

              <!-- <el-date-picker
                style="width:135px!important"
                v-model="createPlanParam.beginTime"
                prefix-icon="test-icon" 
                class="regionPicker"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker> -->

              <!-- 作业时间 -->
              {{checkedDate}}
              <el-time-picker
                class="regionPicker"
                style="width:85px!important"
                v-model="value2"
                placeholder="任意时间点"
                prefix-icon=""
                value-format='HH:mm:ss'>
              </el-time-picker>

              <span class="splitLine">|</span>

              <!-- 作业类型 -->
              <el-select v-model="createPlanParam.type" placeholder="作业类型" class="regionPicker">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="splitLine">|</span>

              <!-- 作业人员 -->
              <!-- <el-cascader 
                :filterable="true" 
                class="regionPicker" 
                :options="personOptions" 
                v-model="selectPersons" 
                @change="handleChange" 
                @active-item-change="handleItemChange"
                :show-all-levels="false"
                placeholder="作业人员">
              </el-cascader> -->
              <choiceindex
                class="regionPicker personMutiPicker" 
                clearable 
                :selectedLabels="selectedPersonsLabels" 
                @change="handleChange" 
                :is-two-dimension-value="false" 
                v-model="selectPersons" 
                :data="personOptions"
                :only-last="true"
                placeholder="作业人员">
              </choiceindex>

              
            </el-form-item>
            <div v-if="!showCreatePlan2" class="errorTip">该电梯暂无负责人，请先绑定维保人员</div>
          </el-form>
        </div>
        <!-- //创建计划 end-->
        
        <!-- //任务列表 -->
        <div class="missionTable">

          <!-- 未创建计划 列表 -->
          <div v-for="(item,i) in noPlan" :key="i + 'noPlan'" class="missionTr" >
            <p :style="{opacity:(nowTr !== item.lift && nowTr !== ''?'0.3':'1')}">
              <i class="dispatch labelSize"></i>
              <i class="history labelSize"></i>
              <span class="lift">作业电梯：{{item.elevCode}}</span>
              <span v-if="parseInt(checkedDate.substring(5,7)) >= parseInt(NowMonth) && nowTr === ''" class="addMission" @click="addMission(item.elevCode)"></span>
            </p>
            
            <p>该电梯暂无维保记录，请手动创建下次维保计划</p>
          </div>
          <!-- 未创建计划 列表 end-->

          <!-- 计划列表 -->
          <div v-for="(mission,index) in missionList" :key="index + 'plan'" class="missionTr" >
            <p :style="{opacity:(nowTr !== mission.lift && nowTr !== ''?'0.3':'1')}">
              <i class="dispatch labelSize"></i>
              <i class="history labelSize"></i>
              <span class="lift">作业电梯：{{mission.elevCode}}</span>
              <span v-if="parseInt(checkedDate.substring(5,7)) >= parseInt(NowMonth) && nowTr === ''" class="addMission" @click="addMission(mission.elevCode)"></span>
              <span class="address">南山区-南油  南光城市花园1栋B座</span>
            </p>
            
            <!-- 新建某梯计划 -->
            <div style="line-height:40px;margin-top: -10px;" v-if="nowTr === mission.lift">
              <!-- <el-date-picker 
                class="regionPicker"
                prefix-icon="test-icon" 
                format="MM-dd HH:mm"
                v-model="checkTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker> -->
              <el-date-picker
                style="width:135px!important"
                v-model="createPlan.time"
                prefix-icon="test-icon" 
                class="regionPicker"
                format="MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <span class="splitLine">|</span>

              <!-- <el-select v-model="checkTpye" clearable placeholder="请选择" class="regionPicker">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="splitLine">|</span> -->

              <el-select v-model="createPlan.type" clearable placeholder="作业类型" class="regionPicker">
                <el-option
                  v-for="(item,i) in tpyeOptions"
                  :key="i + 'type'"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="splitLine">|</span>

              <el-select v-model="createPlan.person" clearable placeholder="作业人员" class="regionPicker">
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
            <!-- 新建某梯计划 end-->

            <!-- <p v-for="(order, index1) in mission.workOrder" :key="index1" class="order"> -->
              <el-checkbox-group :disabled="nowTr !== ''" style="display:inline-block" v-model="checkedStaffs" @change="handleCheckedStaffsChange">
                <el-checkbox :label="mission.id" :key="index">{{nonetext}}</el-checkbox>
              </el-checkbox-group>
              <span v-if="mission.id == currentEditPlanId">
                <el-date-picker
                  style="width:135px!important"
                  v-model="createPlan.time"
                  prefix-icon="test-icon" 
                  class="regionPicker"
                  format="MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
                <span class="splitLine">|</span>
                <el-select v-model="createPlan.type" clearable placeholder="作业类型" class="regionPicker">
                  <el-option
                    v-for="item in tpyeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="splitLine">|</span>

                <el-select v-model="createPlan.person" clearable placeholder="作业人员" class="regionPicker">
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
                  <i class="btnGray" @click="cancelEditPlan">取消</i>
                </span>
              </span>

              <span v-else>
                <i style="color:#FFC60B;margin-right:2px">●</i>
                <span :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                  <span v-if="mission.order">工单编号：{{mission.order}}</span>
                  <span v-else>工单编号：--</span>
                  <span class="splitLine">|</span>
                  <span>{{mission.planTime}}</span>
                  <span class="splitLine">|</span>
                  <span>{{mission.type}}</span>
                  <span class="splitLine">|</span>
                  <!-- <span>{{mission.person}}</span> -->
                  <!-- <span>处理进度：{{mission.status}}</span> -->
                  <span>{{mission.major}}</span>
                  <span>{{mission.minor}}</span>
                </span>
                <span class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                  <i class="btnBlue" @click="createTask(mission)">派单</i>
                  <span class="splitLine">|</span>
                  <i class="btnBlue" @click="editPlan(mission.id)">修改</i>
                  <!-- <span class="splitLine">|</span>
                  <i class="btnRed">删除</i> -->
                </span>
              </span>

            <!-- </p> -->

          </div>
          <!-- 计划列表end -->


          <!-- 工单列表 -->
          <div v-for="(task,ii) in taskList" :key="ii * 111 + 222" class="missionTr" >
            <p>
              <i class="dispatch labelSize"></i>
              <i class="history labelSize"></i>
              <span class="lift">作业电梯：{{task.elevCode}}</span>
            </p>
           
            <!-- <el-checkbox-group :disabled="nowTr !== ''" style="display:inline-block" v-model="checkedStaffs" @change="handleCheckedStaffsChange">
                <el-checkbox :label="mission.id" :key="index">{{nonetext}}</el-checkbox>
            </el-checkbox-group> -->
            <i style="color:rgb(52, 65, 76);margin-right:2px">●</i>
            <span :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
              <span v-if="task.id">工单编号：{{task.id}}</span>
              <span v-else>工单编号：--</span>
              <span class="splitLine">|</span>
              <span>{{task.beginTime}}</span>
              <span class="splitLine">|</span>
              <span>{{task.taskType}}</span>
              <span class="splitLine">|</span>
              <span>{{task.major}}</span>
              <span class="splitLine">|</span>
              <span>{{task.minor}}</span>
              <span class="splitLine">|</span>
              <span>{{task.person}}</span>
              <span>处理进度：{{task.status}}</span>
            </span>
            <span class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
              <i class="btnBlue" @click="gotoDetail(task.id)">详情</i>
              <!-- <span class="splitLine">|</span>
              <i class="btnRed">删除</i> -->
            </span>


          </div>
          <!-- 工单列表 end-->
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
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
import SearchCode1 from '../../components/SearchCode1'


export default {
  data() {
    return {
      showCreatePlan2:true,
      selectedPersonsLabels:[],
      selectPersons:[],
      personOptions:[],
      value2:"09:00:00",
      showCreatePlan:false,
      createPlanParam: {
        elevCode:'123',
        type: '',
        beginTime: '2019-08-06 09:00:00',
        staffIds:[]
      },
      checkedDate:'',
      todos: [
        // {date: 1,msg: 4, total:6,overtime:2},
        // {date: 2,msg: 2, total:5},
        // {date: 3, msg: 4,total:8},
        // {date: 4,msg: 6,total:8},
        // {date: 6,msg: 4,total:8},
        // {date: 12,msg: 2,total:8},
        // {date: 16,msg: 3,total:12,overtime:2},
        // {date: 26,msg: 5,total:7},
        // {date: 31,msg: 6,total:9},
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
      noPlan:[],
      checkAll: false,
      checkedStaffs: [],
      isIndeterminate: false,
      checkedAllStaff:[],
      nonetext:'',
      checkTime:'',
      checkTpye:'',
      // tpyeOptions: [
      //   { label: '例行维保', value: "0" },
      //   { label: '月度维保', value: "1" },
      //   { label: '季度维保', value: "2" },
      //   { label: '年度维保', value: "3" },
      //   { label: '故障处理', value: "4" },
      //   { label: '事故救援', value: "5" },
      // ],
      tpyeOptions: [
        { label: '例行维保', value: "例行维保" },
        { label: '月度维保', value: "月度维保" },
        { label: '季度维保', value: "季度维保" },
        { label: '年度维保', value: "年度维保" },
        { label: '故障处理', value: "故障处理" },
        { label: '事故救援', value: "事故救援" },
      ],
      nowTr:'',
      NowMonth: 0,
      taskList:[],
      currentEditPlanId:'0'
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
    'calendar':calendar,
    choiceindex, //级联
    'search-code': SearchCode1,

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
    },
    checkedDate(date){
      if(date.length > 9){
        // 获取日视图列表
        this.getdayTaskPlan(date)
      } else {
        // 获取月视图列表
        this.getMissionList(date)
      }
    }
  },
  mounted() {
    // this.getAllAccountData()
    // 获取现在月份
    this.getDate()
    // 获取任务列表
    this.getMissionList()
    // 获取日历数据
    this.getRiliList()
    // 获取部门列表
    this.getdeps()
  },
  methods: {
    // 搜索
    // 监听子组件获取注册码，发送请求搜索并重新渲染列表
    searchLift(regCode) {
      this.createPlanParam.elevCode = regCode
      api.taskApi.getLiftDetail(regCode).then((res) => {
        this.selectPersons = []
        if (res.data.message == '无负责人,请先绑定电梯相关人员'){
          this.showCreatePlan2 = false
          return
        } else {
          this.showCreatePlan2 = true
          this.selectPersons.push(res.data.data.elevatorPerson.major)
          if(res.data.data.elevatorPerson.major !== res.data.data.elevatorPerson.minor){
            this.selectPersons.push(res.data.data.elevatorPerson.minor)
          }
        }
        
        if(res.data.data.plan){
          this.tpyeOptions = [
            { label: '故障处理', value: "故障处理" },
            { label: '事故救援', value: "事故救援" },
          ]
          this.createPlanParam.type = '故障处理'

        }else {
          this.tpyeOptions = [
            { label: '例行维保', value: "例行维保" },
            { label: '月度维保', value: "月度维保" },
            { label: '季度维保', value: "季度维保" },
            { label: '年度维保', value: "年度维保" },
            { label: '故障处理', value: "故障处理" },
            { label: '事故救援', value: "事故救援" }
          ]
          this.createPlanParam.type = '例行维保'
        }

      }).catch((res) => {
        
      })
    },
    // 获取公司下的部门
    getdeps(){
      api.accountApi.getCorpDepartments(window.localStorage.getItem('corpId')).then((res) => {
     
        var depData = res.data.data || []
        if(depData.length > 0){
          
          depData.forEach(item =>{
            var obj = {
              label:'',
              value:'',
              children:[]
            }
            obj.label = item.depName
            obj.value = item.id
            this.personOptions.push(obj)
            this.handleItemChange(item.id)
          })
          console.log("personOptions===" + this.personOptions)
        }
        


      }).catch((res) => {
        
      })
      
    },
    // 点击部门加载员工
    handleItemChange(val) {
      console.log('active item:', val);

      api.accountApi.getDepStaffs(val).then((res) => {
        var staffData = res.data.data || []
        if(staffData.length > 0){
          var obj2 = []
          staffData.forEach(item =>{
            var obj = {
              label:'',
              value:'',
            }
            obj.label = item.name
            obj.value = item.id
            obj2.push(obj)
            

            // this.personOptions.push(obj)
            console.log("obj==" + JSON.stringify(obj))
          })
          this.personOptions.forEach((option, i) => {
            if (option.value === val) {
              option.children = obj2 ;
            }
          });
          console.log("personOptions===" + JSON.stringify(this.personOptions))
        }

      }).catch((res) => {
        
      })

    },
    // 切换选择人员
    handleChange(){
      console.log("this.selectPersons===" + this.selectPersons)
      this.selectedPersonsLabels = []
      this.selectPersons.forEach(personId =>{

        this.personOptions.forEach(item =>{
          console.log("item" + item)
          item.children.forEach(item2 =>{
            if(item2.value === personId){
              this.selectedPersonsLabels.push(item2.label)
            }
          })
        })
      })
      
    },
    // 编辑计划
    editPlan(planId){
      this.currentEditPlanId = planId
    },
    cancelEditPlan(){
      this.currentEditPlanId = 0
    },
    // 跳转到工单详情
    gotoDetail(id){
      this.$router.push({name: 'missionDetail', params: {'id': id}})
    },
    // 派单
    createTask(mission){
      var param = {
        'elevCode': mission.elevCode,
        'staffIds': ['8cfe6ec58499da8337926ab47f2de704', '5d3beb332a8c607734b66efe6ea1c05a'],
        // 'minor': mission.minorId,
        'planId':mission.id,
        'beginTime':mission.planTime,
        'type':mission.type
      }
      // 派单
      api.taskApi.createTask(param).then((res) => {
        if(res.data.code == 200){
          this.$message.success('派单成功！');
          // 获取任务列表
          this.getMissionList()
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
    },
    getdayTaskPlan(date){
      api.taskApi.dayTaskPlan({'corp': window.localStorage.getItem('corpId'),'queryDate':date + ' ' + '00:00:00'}).then((res) => {
        this.missionList = res.data.data.plan || []
        this.noPlan = res.data.data.noPlan || []
        this.taskList = res.data.data.task || []
      }).catch((res) => {
        
      })
    },
    getRiliList(){
      api.taskApi.riliLista().then((res) => {
        var rili = res.data.data
        rili.forEach(element => {
          for(var key in element){　//遍历对象的所有属性，包括原型链上的所有属性
          // if(obj.hasOwnProperty(key)){ //判断是否是对象自身的属性，而不包含继承自原型链上的属性
            if(key.substring(0,7) == '2019-08'){
              var item ={
                'date': parseInt(key.substr(8)),
                'msg': 1, 
                'total':parseInt(element[key])
              }
              this.todos.push(item)
            }
            
          }
        });
        console.log("this.todos==="+ JSON.stringify(this.todos))

      }).catch((res) => {
        
      })
    },
    getMissionList(){
      this.nowTr = '' // 关闭新建某梯计划
      this.showCreatePlan = false // 关闭新建计划
      this.missionList = []
     
      api.taskApi.monthTaskPlan({'corp': window.localStorage.getItem('corpId')}).then((res) => {
          // this.totalPageSize = res.data.data.total
          this.missionList = res.data.data.plan || []
          this.noPlan = res.data.data.noPlan || []
          this.taskList = res.data.data.task || []
          // console.log("missionList----" + JSON.stringify(this.missionList))
      }).catch((res) => {
        
      })
    },
    // 获取现在月份
    getDate() {
      var newDate = new Date();
      this.NowMonth = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1); //常量 不变
    },
    
    // 创建某梯计划
    addMission(code){
      alert(code)

      
      // this.nowTr = index
    },
    // 创建计划
    createAPlan(){
      // 显示创建计划
      this.showCreatePlan = true
      // 显示作业信息
      this.showCreatePlan2 = true

      this.value2 = "09:00:00"
      this.createPlanParam.type = ''
      this.selectPersons = []
      // console.log("this.value2---" + this.checkedDate + " " + this.value2)
      // this.createPlanParam.beginTime = + '09:00:00'
    },
    // 取消创建计划
    cancelCreatePlan(){
      this.showCreatePlan = false
    },
    // 创建计划
    addMission2(){
      // elevCode:'123',
        // type: '',
        // beginTime: '2019-08-06 09:00:00',
        // staffIds:[]
      this.createPlanParam.beginTime = this.checkedDate + ' ' + this.value2
      this.createPlanParam.staffIds = this.selectPersons
      console.log("this.createPlanParam==" + JSON.stringify(this.createPlanParam))
      if(this.createPlanParam.type == '故障处理' || this.createPlanParam.type == '事故救援'){
        api.taskApi.createTask(this.createPlanParam).then((res) => {
          if(res.data.code == 200){
            this.$message.success('派单成功！');
            // 获取任务列表
            this.getMissionList()
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((res) => {
          
        })
      } else {
        api.taskApi.createPlan(this.createPlanParam).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('创建计划成功！');
            // 获取任务列表
            this.getMissionList()
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((res) => {
          
        })
      }
      
    },
    // 取消创建某梯计划
    cancel(){
      this.nowTr = ''
    },
    // JS获取n至m随机整数
    randomNumber(lower,upper){
      return Math.floor(Math.random()*(upper-lower+1))+lower;
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
    padding 20px 0 0 0
    border-bottom: 1px solid #e8e8e8;
    .titlePlan
      font-size: 20px;
      
    .splitLine
      margin: 0 5px 0 -6px
    .btns
      line-height: 31px;
    .el-form-item 
      margin-bottom: 10px!important
  .personMutiPicker
    width:150px!important
    display: inline-block;
  .errorTip
    color:rgb(250, 79, 67);
    margin:10px 0
</style>
