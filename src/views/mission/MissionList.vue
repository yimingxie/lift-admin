<template>
<div class="main-wrap" id="mission">
  <div class="row" >

    <div class="panel" style="padding-bottom:0">
      <!-- <router-link to="/missionDetail">
        <span>任务详情</span>
      </router-link> -->
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
        <!-- <button class="btn blueBtn" @click="createAPlan" v-if="checkedDate.length > 8 && parseInt(checkedDate.substring(5,7)) >= parseInt(NowMonth)">创建计划</button> -->
        <button class="btn whiteBtn" @click="multiCreateTask">立即派单</button>
        <button class="btn whiteBtn">导出</button>
        <!-- <button class="btn whiteBtn" >全选</button> -->
        <span style="margin: 5px 10px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkbox16">全选</el-checkbox>
        </span>
        <!-- <search-input v-model.trim="searchKey" placeholderValue="搜索电梯注册代码/详细地址">
          <span slot="btn" class="search_btn" @click="searchAccount()" @keyup.enter.native="searchAccount()"></span>
        </search-input> -->
        <!-- 搜索 -->
        
      </div>
      <div style="position:absolute;bottom:20px;right:20px;display:inline-block;width:320px">
        <!-- <search-code @childCode="searchLiftRegCode"></search-code> -->
        <!-- <search-code :code="parentCode" @childCode="searchLiftRegCode"></search-code> -->
        <search-code @childCode="searchLiftRegCode" @clearCode="clearSearch"></search-code>
      </div>
    </div>
    
  </div>
  <div class="row" style="min-height: 600px;z-index:1">
    <div style="float: left;">
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
        <!-- {{checkedDate}} -->

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
            <!-- <i v-if="slotProps.todo.msg === 6" class="dispatch labelSize labelPosition"></i>
            <i v-if="slotProps.todo.overtime" class="warning labelSize labelPosition"></i> -->
          </template>
        </calendar>

      </div>
      <div class="panel" style="padding: 2px 0 4px 25px;">
        <div class="title missionTitle " style="border-bottom:0;padding:12px 0 11px 16px">
          <span class="taskTotal">{{totalStatis.numta}}</span>
          <span class="taskTotalText">任务总数</span>
          <span class="splitLine" style="margin: 0 11px;">|</span>
          <span>维保总数：{{totalStatis.numwb}}</span>
          <span class="splitLine" style="margin: 0 11px;">|</span>
          <span>故障处理：{{totalStatis.numgz}}</span>
          <span class="splitLine" style="margin: 0 11px;">|</span>
          <span>事件救援：{{totalStatis.numjy}}</span>
        </div>
      </div>
    </div>
    <div style="margin-left:527px">
      <div class="panel">

        <!-- 任务总数等一些统计数据 -->
        <div class="title missionTitle">
          <span class="taskTotal">{{monthTotal.total}}</span>
          <span class="taskTotalText">任务总数</span>
          <span class="splitLine">|</span>
          <!-- <span>未创建维保计划：13</span>
          <span class="splitLine">|</span> -->
          <span>未派单：{{monthTotal.not}}</span>
          <span class="splitLine">|</span>
          <span>已完成：{{monthTotal.complete}}</span>
          <span class="splitLine">|</span>
          <span>已超时：<i style="color: #FA4F43;">{{monthTotal.timeout}}</i></span>
        </div>
        <!-- 任务总数等一些统计数据 end-->

        <!-- //创建计划 -->
        <!-- <div class="creatPlan" v-if="showCreatePlan">
          <div style="margin-bottom: 25px">
            <span class="titlePlan">创建计划</span>
            <span class="btns">
              <i class="btnBlue" @click="addMission2">保存</i>
              <span class="splitLine" style="margin:0 3px">|</span>
              <i class="btnGray" @click="cancelCreatePlan">取消</i>
            </span>
          </div>
          
          <el-form ref="form" :model="createPlanParam" label-width="84px" >
          
            <el-form-item label="作业信息：" v-if="showCreatePlan2">

              <el-time-picker
                class="regionPicker"
                style="width:85px!important"
                v-model="value2"
                placeholder="任意时间点"
                prefix-icon=""
                value-format='HH:mm:ss'>
              </el-time-picker>

              <span class="splitLine">|</span>

              <el-select v-model="createPlanParam.type" placeholder="作业类型" class="regionPicker">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="splitLine">|</span>

              <choiceindex
                class="regionPicker personMutiPicker" 
                clearable 
                :selectedLabels="selectedPersonsLabels" 
                @change="handleChange" 
                :is-two-dimension-value="false" 
                v-model="selectPersons" 
                :data="personOptions"
                :only-last="true"
                placeholder="作业人员"
                :disabled="selectPersonsDisabled">
              </choiceindex>

              
            </el-form-item>
            <div v-if="!showCreatePlan2" class="errorTip">该电梯暂无负责人，请先绑定维保人员</div>
          </el-form>
        </div> -->
        <!-- //创建计划 end-->
        
        <!-- //任务列表 -->
        <div class="missionTable" v-if="missionList.length > 0">

          <!-- 工单列表 -->
          <div v-for="(taskList, ii) in missionList" :key="ii * 111 + 222" class="missionTr" >
            <p :style="{opacity:(nowTr !== taskList.elevCode && nowTr !== ''?'0.3':'1')}">
              <i class="dispatch labelSize"></i>
              <i class="history labelSize"></i>
              <span class="lift">作业电梯：{{taskList.elevCode}}</span>
              <span v-if="parseInt(checkedDate.substring(5,7)) >= parseInt(NowMonth) && nowTr === ''" class="addMission" @click="openAddLiftMission(taskList.elevCode)"></span>

              <span style="max-width:300px;float:right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{taskList.localArea}}{{taskList.address}}</span>
            </p>
            <!-- 新建计划或任务 -->
            <div class="addmissionDiv" v-if="nowTr === taskList.elevCode">
              <!-- 作业时间 -->
              <el-date-picker
                v-model="value2"
                prefix-icon="test-icon" 
                class="regionPicker"
                format="MM-dd HH:mm:ss"
                value-format='yyyy-MM-dd HH:mm:ss'
                type="datetime"
                placeholder="选择日期时间"
                :picker-options="pickerOptions">
              </el-date-picker>
              <span class="splitLine">|</span>

              <!-- 作业类型 -->
              <el-select v-model="selectType" placeholder="作业类型" class="regionPicker">
                <el-option
                  v-for="item in tpyeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <span class="splitLine">|</span>
              <!-- 作业人员 -->
              <choiceindex
                class="regionPicker personMutiPicker" 
                clearable 
                :selectedLabels="selectedPersonsLabels" 
                @change="handleChange" 
                :is-two-dimension-value="false" 
                v-model="selectPersons" 
                :data="personOptions"
                :only-last="true"
                placeholder="作业人员"
                :disabled="selectPersonsDisabled">
              </choiceindex>

              <span class="btns">
                <i class="btnBlue" @click="addMission2">保存</i>
                <span class="splitLine">|</span>
                <i class="btnGray" @click="cancel">取消</i>
              </span>

            </div>
            <!-- 新建 -->

            <!-- 任务列表 -->
            <div v-for="(task) in taskList.data" :key="task.id" class="taskDiv">
              <!-- <el-checkbox-group v-model="checkedStaffs" @change="handleCheckedStaffsChange">
                <el-checkbox :label="account.id" :key="index" class="checkbox16">{{nonetext}}</el-checkbox>
              </el-checkbox-group> -->

              <div style="position:absolute;" v-if="task.status !== '无计划'">
                <el-checkbox-group v-model="checkedTasks" @change="handleCheckedStaffsChange">
                  <el-checkbox :label="task.id" :key="task.id" class="checkbox16">{{nonetext}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div v-if="task.status !== '无计划' && currentEditPlanId !== task.id" class="taskListStyle">
                <i :style="{'color':getStatusColor(task.status)}" style="margin-right:2px">●</i>
                <span :style="{opacity:(nowTr !== '' ?'0.3':'1')}" >
                  <span v-if="task.status !== '未派单' && task.status !== '可派单'">工单编号：{{ task.id }}</span>
                  <span v-else>工单编号：--</span>
                  <span class="splitLine">|</span>
                  <span>{{task.beginTime.substring(5)}}</span>
                  <span class="splitLine">|</span>
                  <span>{{task.type}}</span>
                  <!-- <span>{{task.major}}</span>
                  <span>{{task.minor}}</span> -->
                  <span class="splitLine">|</span>
                  <span>{{task.persons}}</span>
                  <span class="splitLine">|</span>
                  <span :style="{'color':getStatusColor(task.status)}">{{task.status}}</span>
                </span>
                <span v-if="task.status == '可派单'" class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                  <i class="btnBlue" @click="openPaidanDialog(task)">派单</i>
                  <span class="splitLine">|</span>
                  <i class="btnBlue" @click="openEditPlan(task)">修改</i>
                </span>
                <span v-if="task.status == '已派单'" class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                  <i class="btnBlue" @click="gotoDetail(task.id)">修改</i>
                  <span class="splitLine">|</span>
                  <i class="btnBlue" @click="openCloseDislog(task)">关闭</i>
                </span>
                <span v-if="task.status == '已接单'" class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                  <i class="btnBlue" @click="gotoDetail(task.id)">详情</i>
                  <span class="splitLine">|</span>
                  <i class="btnBlue" @click="openCloseDislog(task)">关闭</i>
                </span>
                <span v-if="task.status == '已完成' || task.status == '已超时' || task.status == '已关闭'" class="btns" :style="{opacity:(nowTr !== '' ?'0.3':'1')}">
                  <i class="btnBlue" @click="gotoDetail(task.id)">详情</i>
                </span>
              </div>

              <!-- 修改计划 -->
              <div class="addmissionDiv" v-if="currentEditPlanId == task.id">
                
                <!-- 作业时间 -->
                <el-date-picker
                  v-model="value3"
                  prefix-icon="test-icon" 
                  class="regionPicker"
                  format="MM-dd HH:mm:ss"
                  value-format='yyyy-MM-dd HH:mm:ss'
                  type= "datetime"
                  placeholder="选择日期时间"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <span class="splitLine">|</span>

                <!-- 作业类型 -->
                <el-select v-model="editPlanParam.type" placeholder="作业类111型" class="regionPicker">
                  <el-option
                    v-for="item in tpyeOptions2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <span class="splitLine">|</span>
                <span>{{task.persons}}</span>
                <span class="btns">
                  <i class="btnBlue" @click="confirmEditPlan">修改</i>
                  <span class="splitLine">|</span>
                  <i class="btnGray" @click="cancelEditPlan">取消</i>
                </span>

              </div>
              <!-- 修改计划 -->

              <div v-if="task.status == '无计划'" style="color: #C2C7CC;"  class="taskListStyle">
                <i style="color:#76DDAC;margin-right:2px">●</i>
                该电梯暂无维保记录，请手动创建下次维保时间
              </div>
            </div>
            
          </div>
          <!-- 分页 Start -->
          <div class="pagination_block" v-if="checkedDate.length > 9 && !searchMode">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="dateTaskListParam.limit"
              :current-page="dateTaskListParam.offset + 1"
              layout="prev, pager, next, jumper"
              :total="totalPageSize">
            </el-pagination>
          </div>
          <div class="pagination_block" v-if="checkedDate.length < 10 && !searchMode">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="monthTaskListParam.limit"
              :current-page="monthTaskListParam.offset + 1"
              layout="prev, pager, next, jumper"
              :total="totalPageSize">
            </el-pagination>
          </div>
          <div class="pagination_block" v-if="searchMode">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :page-size="searchLiftListParams.limit"
              :current-page="searchLiftListParams.offset + 1"
              layout="prev, pager, next, jumper"
              :total="searchTotalPageSize">
            </el-pagination>
          </div>
          <!-- 分页 End -->

          <!-- 工单列表 end-->
        </div>
        <div class="missionTable" v-if="missionList.length == 0">
          <div style="border-top-left-radius: 0;border-top-right-radius: 0; padding:20px 13px 4px;margin-top: 0;">
            <div class="noData">暂无查询数据</div>
          </div>
        </div>

        <!-- //任务列表 end-->

      </div>
    </div>

    
    
  </div>
  <!-- 添加是否确认派单对话框 -->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="paidanModelDialog">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/xym/dia-question.png" alt="">
        </div>
        <div class="dia-con-p">
          <h4>是否确认派单</h4>
          <p>派单后不可复原，请谨慎操作</p>
        </div>

        <div style="margin:20px 0 30px">
          <div style="font-size: 20px;margin-bottom: 10px">作业信息</div>
          <el-row style="border-bottom: 1px solid #bdc3d1;">
            <el-col :span="6"><div class="grid-content bg-purple">电梯注册代码</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">作业时间</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">作业类型</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">作业人员</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">{{confirmCreateTask.elevCode}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCreateTask.beginTime}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">{{confirmCreateTask.type}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCreateTask.persons}}</div></el-col>
          </el-row>
        </div>
      </div>
      
    </div>
    <div slot="footer"  class="dialog-footer tac">
      <el-button @click="cancelCreateTask()" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="createTask(confirmCreateTask)" class="dialogSure">确 认</el-button>
    </div>
  </el-dialog>
  <!-- 关闭确认 弹窗-->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="closeModelDialog">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/xym/dia-warn.png" alt="">
        </div>
        <div class="dia-con-p">
          <h4>是否确认关闭任务？</h4>
          <p>关闭后不可复原，请谨慎操作</p>
        </div>
      </div>
      <div style="margin:20px 0 40px" class="tac">
        <div style="font-size: 20px;margin-bottom: 10px">任务信息</div>
        <el-row style="border-bottom: 1px solid #bdc3d1;">
          <el-col :span="6"><div class="grid-content bg-purple">电梯注册代码</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">作业时间</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">作业类型</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">作业人员</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">{{confirmCloseTask.elevCode}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCloseTask.beginTime}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">{{confirmCloseTask.type}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCloseTask.persons}}</div></el-col>
        </el-row>
      </div>
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="cancelCloseTask()">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="closeTask(confirmCloseTask.id)">确认</div>
      </div>
    </div>
  </el-dialog>
  <!-- 关闭确认 弹窗 end-->
  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
// import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import calendar from "../../components/DateContainer";
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
// import SearchCode1 from '../../components/SearchCode1'
import SearchCode from '../../components/SearchCode'
// import { reject } from 'q';


export default {
  data() {
    
    return {
      pickerOptions: { // 工单时间不让选择今天以前的
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      parentCode:'',
      showCreatePlan2: true,
      selectedPersonsLabels:[],
      selectPersons:[],
      selectPersonsDisabled: false,
      personOptions:[],
      value2: this.timeDefault + '09:00:00',
      showCreatePlan:false,
      createPlanParam: {
        elevCode:'123',
        type: '',
        timestamp: Date.parse(new Date()),
        staffIds:[],
        corp: window.localStorage.getItem('corpId')
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
      period1:"",
      periods1: [
        // { label: '全部', value: "-1" },
        { label: '已创建计划', value: "" },
        { label: '待创建计划', value: "'无计划'", color:'#76DDAC' },
      ],
      period2:"",
      periods2: [
        { label: '全部', value: "" },
        { label: '待派单', value: "'可派单','未派单'", color:'#FFA90B'},
        { label: '已派单', value: "'已派单'", color:'#34414C' },
        { label: '已接单', value: "'已接单'", color:'#9FB9F7' },
        { label: '已完成', value: "'已完成'", color:'#4272FF' },
        { label: '已超时', value: "'已超时'", color:'#FA4F43' },
        { label: '已关闭', value: "'已关闭'", color:'#C2C7CC' },
      ],
      period3:"",
      periods3: [
        { label: '全部', value: "" },
        { label: '例行维保', value: "例行维保" },
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
      
      checkTime:'',
      checkTpye:'',
      // 新增计划类型
      tpyeOptions: [
        { label: '例行维保', value: "例行维保" },
        { label: '季度维保', value: "季度维保" },
        { label: '半年维保', value: "半年维保" },
        { label: '年度维保', value: "年度维保" },
        { label: '故障处理', value: "故障处理" },
        { label: '事故救援', value: "事故救援" },
      ],
      // 修改工单类型
      tpyeOptions2: [
        { label: '例行维保', value: "例行维保" },
        { label: '季度维保', value: "季度维保" },
        { label: '半年维保', value: "半年维保" },
        { label: '年度维保', value: "年度维保" }
      ],
      nowTr:'', // 创建某梯计划
      NowMonth: 0,
      selectType:'',
      monthTotal:[],
      monthTaskListParam: {
        corp: window.localStorage.getItem('corpId'),
        limit: 10,
        offset: 0,
        stat: "",
        type: '',
        timestamp: 0
      },
      dateTaskListParam: {
        corp: window.localStorage.getItem('corpId'),
        limit: 10,
        offset: 0,
        stat: "",
        type: "",
        timestamp: 0
      },
      editPlanParam:{
        planId: "",
        type: "",
        timestamp: 0
      },
      currentEditPlanId:'',
      value3:'',
      searchLiftListParams:{
        elevCode: "",
        limit: 10,
        offset: 0
      },
      searchMode:false,
      searchTotalPageSize:0,
      searchRegCode:'',
      paidanModelDialog: false,
      confirmCreateTask:[],
      totalStatis:{
        numta:0,
        numwb:0,
        numgz:0,
        numjy:0
      },
      closeModelDialog:false,
      confirmCloseTask:[],

      checkAll: false,
      checkedTasks: [],
      checkedTasksName:[], //确认弹窗显示数据
      isIndeterminate: false,
      checkedAllTasks:[],
      nonetext:'',
      currentTotalPage:0
    }
  },
  components: {
    'radio-group': RadioGroup,
    // 'search-input': SearchInput,
    'fotter': fotter,
    'calendar':calendar,
    choiceindex, //级联多选
    // 'search-code1': SearchCode1,
    'search-code': SearchCode,

  },
  computed: {
    // 获取今天日期
    timeDefault() {
      var date = new Date(); 
      date.setTime(date.getTime()); 
      var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' '; 
      return s1; 
    } 
  },
  watch:{
    // period1为空时，stat参数取period2（全部："";未派单，可派单;已派单;已接单;已完成;已超时;已关闭）
    // period1为无计划时，stat参数取"'无计划'"
    period1(val){
      this.searchMode = false
      this.conditions1 = []
      this.openCondition1 = false
      if(val !== ""){ //无计划
        this.conditions1 = this.periods1.filter(item => item.value === val )
        this.openCondition1 = true
        this.period2 = ""
        this.monthTaskListParam.stat = val
        this.monthTaskListParam.offset = 0
        this.getMissionList()
      } else { // 已创建计划
        if(this.checkedDate.length > 9) {
          // 获取日视图列表
          this.dateTaskListParam.offset = 0
          this.dateTaskListParam.stat = this.period2
          this.getdayTaskPlan(this.checkedDate)
        } else {
          // 获取月视图列表
          this.monthTaskListParam.offset = 0
          this.monthTaskListParam.stat = this.period2
          this.getMissionList()
        }
      }
      
    },
    // 处理进度
    period2(val){
      this.searchMode = false
      this.conditions2 = []
      this.openCondition2 = false
      if(val !== ""){ //筛选进度
        this.conditions2 = this.periods2.filter(item => item.value === val )
        this.openCondition2 = true
        this.period1 = ""
        if(this.checkedDate.length > 9) {
          // 获取日视图列表
          this.dateTaskListParam.offset = 0
          this.dateTaskListParam.stat = val
          this.getdayTaskPlan(this.checkedDate)
        } else {
          // 获取月视图列表
          this.monthTaskListParam.offset = 0
          this.monthTaskListParam.stat = val
          this.getMissionList()
        }
      } else { //全部
        if(this.checkedDate.length > 9) {
          // 获取日视图列表
          this.dateTaskListParam.offset = 0
          this.dateTaskListParam.stat = this.period1
          this.getdayTaskPlan(this.checkedDate)
        } else {
          // 获取月视图列表
          this.monthTaskListParam.offset = 0
          this.monthTaskListParam.stat = this.period1
          this.getMissionList()
        }
      }
      
    },
    // 作业类型
    period3(val){
      this.searchMode = false
      this.conditions3 = []
      this.openCondition3 = false
      if(val !== ""){
        this.conditions3 = this.periods3.filter(item => item.value === val )
        this.openCondition3 = true
      }
      if(this.checkedDate.length > 9){
        // 获取日视图列表
        this.dateTaskListParam.offset = 0
        this.dateTaskListParam.type = val
        this.getdayTaskPlan(this.checkedDate)
      } else {
        // 获取月视图列表
        this.monthTaskListParam.offset = 0
        this.monthTaskListParam.type = val
        this.getMissionList()
      }
    },
    // 判断是否为日视图
    checkedDate(date){
      this.searchMode = false
      if(date.length > 9){
        // 获取日视图列表
        this.period1 = "" // 只能获取有维保计划的电梯
        this.dateTaskListParam.offset = 0
        this.dateTaskListParam.stat = this.period2
        this.dateTaskListParam.type = this.period3
        this.getdayTaskPlan(date)
      } else {
        // 获取月视图列表
        this.monthTaskListParam.offset = 0
        this.monthTaskListParam.stat = this.period2
        this.monthTaskListParam.type = this.period3
        this.getMissionList()
        // 获取日历数据
        this.getRiliList()
      }
    },
    selectType(type){
      if(type == '故障处理' || type == '事故救援'){
        this.selectPersonsDisabled = false
      } else {
        this.selectPersonsDisabled = true
      }
    },
    searchRegCode(code){
      this.searchLiftListParams.offset = 0
      this.searchLiftListParams.limit = 10
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
    // 获取统计数据
    this.getTotalStatis()
  },
  methods: {
    
    // 全选，非全选
    handleCheckAllChange(val) {
      this.checkedTasks = val ? this.checkedAllTasks : [];
      this.isIndeterminate = false;
      // console.log("check:" + this.checkedStaffs)
    },
    // 点击多选框
    handleCheckedStaffsChange(value) {
      // console.log("check:" + value)
      // console.log("Allcheckop:==" + this.checkedAllStaff)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.currentTotalPage
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.currentTotalPage;
    },
    // 获取统计数据
    getTotalStatis(){
      api.taskApi.getTotalStatis(window.localStorage.getItem('corpId')).then((res) => {
        // this.totalStatis = res.data.data || {numta:0,numwb:0,numgz:0,numjy:0}
        if(res.data.data !== null){
          this.totalStatis.numta =  res.data.data.numta || 0
          this.totalStatis.numwb =  res.data.data.numwb || 0
          this.totalStatis.numgz =  res.data.data.numgz || 0
          this.totalStatis.numjy =  res.data.data.numjy || 0
        }
        
      })
    },
    // 清空搜索框
    clearSearch(){
      this.searchMode = false
      this.period1 = ''
      this.period2 = ''
      this.period3 = ''
      // 获取月视图统计数据
      this.getMonthTotalData()
      // 获取月视图任务列表
      this.getMissionList()
    },
    // 搜索电梯
    searchLiftRegCode(regCode) {
      this.nowTr = '' // 关闭新建模式
      this.currentEditPlanId = ''// 关闭修改模式
      this.searchMode = true // 搜索模式列表
      // console.log("reg_code==" + regCode)
      this.searchLiftListParams.elevCode = regCode 
      this.searchRegCode = regCode
      api.taskApi.getLiftTaskList(this.searchLiftListParams).then((res) => {
        // 获取统计数据
        this.monthTotal = {
          'total': res.data.data.total,
          'complete': res.data.data.complete,
          'not': res.data.data.not,
          'timeout': res.data.data.timeout,
        }
        this.searchTotalPageSize = res.data.data.total
        var missionArr = res.data.data.list || []

        // 人员数组加persons 字段便于展示
        missionArr.forEach(item => {
          // item.data.forEach(item2 => {
            var persons = []
            if(item.mps) {
              item.mps.forEach(item2 => {
                persons.push(item2.staffName)
                
              })
              Vue.set(item, 'persons', persons.join(','))
            } else if(item.mp){
              item.mp.forEach(item2 => {
                persons.push(item2.name)
              })
              Vue.set(item, 'persons', persons.join(','))
            }
          // })

        })

        // 用作全选总数
        this.currentTotalPage = missionArr.length
        // 重置多选
        this.checkedAllTasks = []
        this.checkedTasks = []
        this.checkAll = false
        this.isIndeterminate = false
        missionArr.forEach(item => {
          this.checkedAllTasks.push(item.id)
        })

        // 将相同电梯数据汇合在一起
        this.missionList = this.mergeArrayList(missionArr)
      })
      
    },
    getStatusColor(status){
      var color = ''
      if(status == '未派单' || status == '可派单'){
        color = 'rgb(255, 169, 11)'
      } else if(status == '已派单'){
        color = 'rgb(52, 65, 76)'
      } else if(status == '已接单'){
        color = 'rgb(159, 185, 247)'
      } else if(status == '已完成'){
        color = 'rgb(66, 114, 255)'
      } else if(status == '已超时'){
        color = 'rgb(250, 79, 67)'
      } else if(status == '已关闭'){
        color = 'rgb(194, 199, 204)'
      }
      return color
    },
    // 打开确认关闭工单弹窗
    openCloseDislog(task){
      this.closeModelDialog = true
      this.confirmCloseTask = task
    },
    // 取消关闭工单
    cancelCloseTask(){
      this.closeModelDialog = false
      this.confirmCloseTask = []
    },
    // 关闭工单
    closeTask(id){
      api.taskApi.closeTask(id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('关闭工单成功！');
          if(this.searchMode){
            // 获取搜索电梯列表
            this.searchLiftRegCode(this.searchLiftListParams.elevCode)
          } else if(this.checkedDate.length > 9) {
            // 获取日视图列表
            this.getdayTaskPlan(this.checkedDate)
          } else if(this.checkedDate.length < 10){
            // 获取月视图列表
            this.getMissionList()
          }
          this.closeModelDialog = false
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
    },
    // 月视图统计数据
    getMonthTotalData(){
      let timestamp = this.transformTimestamp(this.checkedDate)
      api.taskApi.monthTotal(window.localStorage.getItem('corpId'),timestamp).then((res) => {
        this.monthTotal = res.data.data
      })
    },
    // 相同属性的数据合并处理
    mergeArrayList(arrData){
      var map = {},
      dest = [];
      for(var i = 0; i < arrData.length; i++){
        var ai = arrData[i];
        if(!map[ai.elevCode]){
          dest.push({
            elevCode: ai.elevCode,
            localArea: ai.localArea,
            address: ai.address,
            data: [ai]
          });
          map[ai.elevCode] = ai;
        }else{
          for(var j = 0; j < dest.length; j++){
            var dj = dest[j];
            if(dj.elevCode == ai.elevCode){
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest
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
          // console.log("personOptions===" + this.personOptions)
        }
        


      }).catch((res) => {
        
      })
      
    },
    // 点击部门加载员工
    handleItemChange(val) {
      // console.log('active item:', val);

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
            // console.log("obj==" + JSON.stringify(obj))
          })
          this.personOptions.forEach((option, i) => {
            if (option.value === val) {
              option.children = obj2 ;
            }
          });
          // console.log("personOptions===" + JSON.stringify(this.personOptions))
        }

      }).catch((res) => {
        
      })

    },
    // 切换选择人员
    handleChange(){
      // console.log("this.selectPersons===" + this.selectPersons)
      this.selectedPersonsLabels = []
      this.selectPersons.forEach(personId =>{

        this.personOptions.forEach(item =>{
          // console.log("item" + item)
          item.children.forEach(item2 =>{
            if(item2.value === personId){
              this.selectedPersonsLabels.push(item2.label)
            }
          })
        })
      })
      
    },
    // 编辑计划
    openEditPlan(plan) {
      this.currentEditPlanId = plan.id
      this.editPlanParam.planId = plan.id
      this.editPlanParam.type = plan.type
      this.value3 = plan.beginTime
    },
    // 确认编辑 1161174926778949633
    confirmEditPlan() {
      this.editPlanParam.timestamp = this.transformTimestamp(this.value3)
      // console.log("this.editPlanParam===" + JSON.stringify(this.editPlanParam))
      api.taskApi.editPlan(this.editPlanParam).then((res) => {
        if(res.data.code == 200){
          this.$message.success('修改成功！');
          // 获取任务列表
          this.currentEditPlanId = '' 
          // if(this.checkedDate.length > 9){
          //   // 获取日视图列表
          //   this.getdayTaskPlan(this.checkedDate)
          // } else {
          //   // 获取月视图列表
          //   this.getMissionList()
          // }
          // 获取任务列表
          if(this.searchMode){
            // 获取搜索电梯列表
            this.searchLiftRegCode(this.searchLiftListParams.elevCode)
          }
          else if(this.checkedDate.length > 9){
            // 获取日视图列表
            this.getdayTaskPlan(this.checkedDate)
          } else if(this.checkedDate.length < 10){
            // 获取月视图列表
            this.getMissionList()
          }
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    cancelEditPlan() {
      this.currentEditPlanId = ''
    },
    // 跳转到工单详情
    gotoDetail(id){
      this.$router.push({name: 'missionDetail', params: {'id': id}})
    },
    // 打开确认派单弹窗
    openPaidanDialog(plan){
      this.paidanModelDialog = true
      this.confirmCreateTask = plan
      // console.log("this.confirmCreateTask====" + JSON.stringify(this.confirmCreateTask))
    },
    // 取消派单
    cancelCreateTask(){
      this.paidanModelDialog = false
      this.confirmCreateTask = []
    },
    // 维保计划派单
    createTask(plan){
      console.log("plan===" + JSON.stringify(plan))
      var persons = []
      // 获取派单人员集合
      if(plan.mps) {
        plan.mps.forEach(item2 => {
          persons.push(item2.id)
        })
      } else if(plan.mp){
        plan.mp.forEach(item2 => {
          persons.push(item2.id)
        })
      }
      var param = {
        'elevCode': plan.elevCode,
        'staffIds': persons,
        'planId': plan.id,
        'timestamp': this.transformTimestamp(plan.beginTime),
        'type': plan.type
      }
      // console.log("mission===" + JSON.stringify(param))
      // 派单
      api.taskApi.createTask(param).then((res) => {
        if(res.data.code == 200){
          this.$message.success('派单成功！');

          // // 获取任务列表
          // if(this.checkedDate.length > 9){
          //   // 获取日视图列表
          //   this.getdayTaskPlan(this.checkedDate)
          // } else {
          //   // 获取月视图列表
          //   this.getMissionList()
          // }
          // 获取任务列表  
          if(this.searchMode){
            // 获取搜索电梯列表
            this.searchLiftRegCode(this.searchLiftListParams.elevCode)
          } else if(this.checkedDate.length > 9){
            // 获取日视图列表
            this.getdayTaskPlan(this.checkedDate)
          } else if(this.checkedDate.length < 10){
            // 获取月视图列表
            this.getMissionList()
          }
          // 日历数据
          this.getRiliList()
          this.paidanModelDialog = false
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
    },
    // 批量派单
    multiCreateTask(){

    },
    // 获取日历数据
    getRiliList(){
      api.taskApi.rili({'corp': window.localStorage.getItem('corpId'),'timestamp':this.transformTimestamp(this.checkedDate)}).then((res) => {
        var fenzi = res.data.data.denominator
        var fenmu = res.data.data.molecule
        this.todos = []
        fenmu.forEach(element => {
          // for(var key in element){　//遍历对象的所有属性，包括原型链上的所有属性
          // if(obj.hasOwnProperty(key)){ //判断是否是对象自身的属性，而不包含继承自原型链上的属性
              var date = new Date(element.time.replace(/-/g, '/')).getDate();
              // console.log("date======" + date)
              var item = {
                'date': parseInt(date),
                'msg': 0, 
                'total':parseInt(element.nums)
              }
              this.todos.push(item)
            
          // }
        });
        fenzi.forEach(item2 => {
          var date = new Date(item2.time.replace(/-/g, '/')).getDate();
          this.todos.forEach(todo => {
            if(parseInt(date) == todo.date) {
              todo.msg = parseInt(item2.nums)
            }
          })
        })
        

      }).catch((res) => {
        
      })
    },
    // 月视图 查询任务列表
    getMissionList(){
      this.nowTr = '' // 关闭新建模式
      this.currentEditPlanId = ''// 关闭修改模式
      this.showCreatePlan = false // 关闭新建计划
      this.missionList = []
      this.monthTaskListParam.timestamp = this.transformTimestamp(this.checkedDate)
      // 获取月视图统计数据
      this.getMonthTotalData()
      
      api.taskApi.monthTaskPlan(this.monthTaskListParam).then((res) => {
        
        this.totalPageSize = res.data.data.count
        if(res.data.data.monthList){
          var missionArr = res.data.data.monthList || []
          
          // 人员数组加persons 字段
          missionArr.forEach(item => {
            // item.data.forEach(item2 => {
              var persons = []
              if(item.mps) {
                item.mps.forEach(item2 => {
                  persons.push(item2.staffName)
                  
                })
                Vue.set(item, 'persons', persons.join(','))
              } else if(item.mp){
                item.mp.forEach(item2 => {
                  persons.push(item2.name)
                })
                Vue.set(item, 'persons', persons.join(','))
              }
            // })

          })
        } else if(res.data.data.list){ 
          var missionArr = res.data.data.list || []
        }

        // 用作全选总数
        this.currentTotalPage = missionArr.length
        // 重置多选
        this.checkedAllTasks = []
        this.checkedTasks = []
        this.checkAll = false
        this.isIndeterminate = false
        missionArr.forEach(item => {
          this.checkedAllTasks.push(item.id)
        })

        // 将相同电梯数据汇合在一起
        this.missionList = this.mergeArrayList(missionArr)
        
      }).catch((res) => {
        
      })
    },
    // 日视图 查询任务列表
    getdayTaskPlan(date) {
      this.nowTr = '' // 关闭新建模式
      this.currentEditPlanId = ''// 关闭修改模式
      this.dateTaskListParam.timestamp = this.transformTimestamp(date)
      // console.log("this.dateTaskListParam.timestamp===" + JSON.stringify(this.dateTaskListParam))

      api.taskApi.dayTaskPlan(this.dateTaskListParam).then((res) => {

        this.totalPageSize = res.data.data.count
        var missionArr = res.data.data.dayList || []
        // 获取统计数据
        this.monthTotal = {
          'total': res.data.data.total,
          'complete': res.data.data.complete,
          'not': res.data.data.not,
          'timeout': res.data.data.timeout,
        }
        // console.log("this.monthTotal::" + JSON.stringify(this.monthTotal))
        missionArr.forEach(item => {
          var persons = []
          if(item.mps) {
            item.mps.forEach(item2 => {
              persons.push(item2.staffName)
            })
            Vue.set(item, 'persons', persons.join(','))
          } else if(item.mp){
            item.mp.forEach(item2 => {
              persons.push(item2.name)
            })
            Vue.set(item, 'persons', persons.join(','))
          }

        })

        // 用作全选总数
        this.currentTotalPage = missionArr.length
        // 重置多选
        this.checkedAllTasks = []
        this.checkedTasks = []
        this.checkAll = false
        this.isIndeterminate = false
        missionArr.forEach(item => {
          this.checkedAllTasks.push(item.id)
        })

        // 将相同电梯数据汇合在一起
        this.missionList = this.mergeArrayList(missionArr)
      }).catch((res) => {
        
      })
    },
    // 获取现在月份
    getDate() {
      var newDate = new Date();
      this.NowMonth = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1); //常量 不变
    },
    
    
    // 创建计划
    createAPlan(){
      // 显示创建计划
      this.showCreatePlan = true
      // 显示作业信息
      this.showCreatePlan2 = true

      this.value2 = this.timeDefault + "09:00:00"
      this.createPlanParam.type = ''
      this.selectPersons = []
      this.selectPersonsDisabled = true
      // console.log("this.value2---" + this.checkedDate + " " + this.value2)
      // this.createPlanParam.beginTime = + '09:00:00'
    },
    // 取消创建计划
    cancelCreatePlan() {
      this.showCreatePlan = false
    },
    // 创建某梯计划
    openAddLiftMission(code){
      // 获取该电梯绑定负责人以及是否已创建计划
      this.searchLift(code)

      this.value2 = this.timeDefault + '09:00:00'
    },
    // 根据regcode 获取电梯负责人以及是否创建过计划
    searchLift(regCode) {
      // this.nowTr = '' // 关闭新建模式
      // this.currentEditPlanId = ''// 关闭修改模式
      this.createPlanParam.elevCode = regCode
      api.taskApi.getLiftDetail(regCode).then((res) => {
        this.selectPersons = []
        // console.log("res.data.data.plan--------" + this.selectPersons)
        if (res.data.message == '无负责人,请先绑定电梯相关人员'){
          // this.showCreatePlan2 = false
          this.$message.error("该电梯暂无负责人，请先绑定维保人员")
        } else {
          this.nowTr = regCode
          // this.showCreatePlan2 = true
          this.selectPersons.push(res.data.data.elevatorPerson[0].id)
          if(res.data.data.elevatorPerson.length > 1 && res.data.data.elevatorPerson[0].id !== res.data.data.elevatorPerson[1].id){
            this.selectPersons.push(res.data.data.elevatorPerson[1].id)
          }
          if(res.data.data.plan){
            this.tpyeOptions = [
              { label: '故障处理', value: "故障处理" },
              { label: '事故救援', value: "事故救援" },
            ]
            this.selectType = '故障处理'
          } else {
            this.tpyeOptions = [
              { label: '例行维保', value: "例行维保" },
              { label: '季度维保', value: "季度维保" },
              { label: '半年维保', value: "半年维保" },
              { label: '年度维保', value: "年度维保" },
              { label: '故障处理', value: "故障处理" },
              { label: '事故救援', value: "事故救援" }
            ]
            this.selectType = '例行维保'
          }
        }

        

      }).catch((res) => {
        
      })
    },
    // 日期转化为时间戳
    transformTimestamp(date){
      let time = date.replace(/-/g, '/') // 把所有-转化成/
      let timestamp = new Date(time).getTime()
      return timestamp
    },
    // 创建维保计划 或者 事故故障派单
    addMission2(){
      // elevCode:'123',
        // type: '',
        // beginTime: '2019-08-06 09:00:00',
        // staffIds:[]
      // console.log("this.value2;;;;;" + this.value2)
      this.createPlanParam.timestamp = this.transformTimestamp(this.value2)
      // console.log("this.createPlanParam.timestamp----" + this.createPlanParam.timestamp)
      this.createPlanParam.staffIds = this.selectPersons
      this.createPlanParam.type = this.selectType
      // console.log("this.createPlanParam==" + JSON.stringify(this.createPlanParam))
      // 派单
      if(this.createPlanParam.type == '故障处理' || this.createPlanParam.type == '事故救援'){
        api.taskApi.createTask(this.createPlanParam).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('派单成功！');
            // 获取任务列表
            if(this.searchMode){
              // 获取搜索电梯列表
              this.searchLiftRegCode(this.searchLiftListParams.elevCode)
            }
            else if(this.checkedDate.length > 9){
              // 获取日视图列表
              this.getdayTaskPlan(this.checkedDate)
            } else if(this.checkedDate.length < 10){
              // 获取月视图列表
              this.getMissionList()
            }
            // 日历数据
            this.getRiliList()

          } else {
            this.$message.error(res.data.message);
          }
        }).catch((res) => {
          
        })
      } else { // 创建计划
        api.taskApi.createPlan(this.createPlanParam).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('创建计划成功！');
            // 获取任务列表
            if(this.searchMode){
              // 获取搜索电梯列表
              this.searchLiftRegCode(this.searchLiftListParams.elevCode)
            }
            else if(this.checkedDate.length > 9){
              // 获取日视图列表
              this.getdayTaskPlan(this.checkedDate)
            } else if(this.checkedDate.length < 10){
              // 获取月视图列表
              this.getMissionList()
            }
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
    
    // 清空筛选
    clearCondition(){
      this.openCondition1 = false
      this.openCondition2 = false
      this.openCondition3 = false
      this.period1 = ""
      this.period2 = ""
      this.period3 = ""
    },
    // 关闭标签
    handleClose1(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.period1 = ''
    },
    // 关闭标签
    handleClose2(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.period2 = ''
    },
    // 关闭标签
    handleClose3(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.period3= ''
    },
    // 展开选项
    openSelect(){
      this.open = !this.open
      if (this.open) {
        this.periods3 = [
          { label: '全部', value: "" },
          { label: '例行维保', value: "例行维保" },
          { label: '季度维保', value: "季度维保" },
          { label: '半年维保', value: "半年维保" },
          { label: '年度维保', value: "年度维保" },
          { label: '故障处理', value: "故障处理" },
          { label: '事故救援', value: "事故救援" },
        ]
      } else {
        this.periods3 = [
          { label: '全部', value: "" },
          { label: '例行维保', value: "例行维保" }
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
      
      // checkedDate(date){
      if(this.checkedDate.length > 9){
        // 获取日视图列表
        this.dateTaskListParam.limit = val
        this.getdayTaskPlan(this.checkedDate)
      } else {
        // 获取月视图列表
        this.monthTaskListParam.limit = val
        this.getMissionList(date)
      }
      this.nowTr = ''
      this.currentEditPlanId = ''
    },

    // 当前页变化
    handleCurrentChange(val) {
      if(this.checkedDate.length > 9){
        // 获取日视图列表
        this.dateTaskListParam.offset = val - 1
        this.getdayTaskPlan(this.checkedDate)
      } else {
        // 获取月视图列表
        this.monthTaskListParam.offset = val - 1
        this.getMissionList()
      }
      this.nowTr = ''
      this.currentEditPlanId = ''
    },
      // 搜索模式 
    handleSizeChange2(val) {
      this.searchLiftListParams.limit = val
      this.searchLiftRegCode(this.searchLiftListParams.elevCode)
      this.nowTr = ''
      this.currentEditPlanId = ''
    },

    // 搜索模式 翻页
    handleCurrentChange2(val) {
      this.searchLiftListParams.offset = val - 1
      this.searchLiftRegCode(this.searchLiftListParams.elevCode)
      this.nowTr = ''
      this.currentEditPlanId = ''
    },


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
      margin-bottom:18px
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
  .taskDiv
    margin:13px 0 5px;
  .taskListStyle
    padding-left: 45px;
  .addmissionDiv
    line-height: 40px;
    margin: -10px 0 0 46px;
  .bg-purple {
    background: #d3dce6;
    padding:5px 0
  }
  .bg-purple-light {
    background: #e5e9f2;
    padding:5px 0
  }
  .pagination_block
    height 40px;
    margin-top:30px;
</style>
