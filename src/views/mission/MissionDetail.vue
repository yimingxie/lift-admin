<template>
<div id="missionDetail" class="main-wrap">
  <div class="topPanel">
    <div class="bread-nav">
      <router-link to="/mission">
        <span>任务管理</span>
      </router-link>
      <em>/</em>
      <span class="on">任务详情</span>
      
    </div>
    <div class="missionOrder clearfix">
      <span class="orderNumber">工单编号：{{taskNo}}</span>
      <div class="tar" style="float:right;">
        <button v-if="statusText[status] =='已派单' || statusText[status] =='已接单'" class="btn whiteBtn" @click="openCloseDislog()">关闭</button>

        <!-- <button class="btn whiteBtn" style="background: #4272ff;color: #fff">修改</button> -->
        <p class="status">状态</p>
        <p class="progress" :style="{'color':getStatusColor(statusText[status])}">{{statusText[status]}}</p>
      </div>
      <div class="s_de_details">
        <ul>
          <li><span class="tie">派单人员：</span><span >{{ paidanPerson }}</span></li>
          <li><span class="tie">作业类型：</span><span>{{ typeText[taskType] }}</span></li>
          <li><span class="tie">派单时间：</span><span>{{ paidanTime }}</span></li>
          <li><span class="tie">作业时间：</span><span>{{ workTime }}</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row" >
    <div style="width:67%;float:left">
      <div class="panel" style="height: 284px;">
        <div class="title"><div class="label1">作业进度</div>
        </div>
        <div class="progressPanel">
       
          <!-- 完成状态下的 -->
          <el-steps :active="taskRecords.length - 1" v-if="statusText[status]!== '已派单' && statusText[status]!== '已接单'">
             <!-- class="chaoshiLine" -->

            <el-step :title="statusText[item.stat]" v-for="(item,index) in taskRecords" :key="index" :class="(statusText[status] == '已超时' && index == taskRecords.length - 2)?'chaoshiLine':''">
              
              <i slot="icon" class="progressIcon paidan" v-if="statusText[item.stat] == '已派单'"></i>
              <i slot="icon" class="progressIcon jiedan" v-if="statusText[item.stat] == '已接单'"></i>
              <i slot="icon" class="progressIcon wancheng" v-if="statusText[item.stat] == '已完成' || statusText[item.stat] == '已关闭'"></i>
              <i slot="icon" class="progressIcon chaoshi" v-if="statusText[item.stat] == '已超时'"></i>
              
              <div slot="description" >
                <p v-for="(list) in item.data" :key="list.time">
                  <span v-if="statusText[item.stat] !== '已完成' && statusText[item.stat] !== '已关闭' && statusText[item.stat] !== '已超时'">{{list.name}}&nbsp;</span> 
                  <span v-if="statusText[item.stat] !== '已超时'">{{list.time}}</span>
                </p>
              </div>
            </el-step>
          </el-steps>
          <!-- 未完成状态下的 显示全部进度节点-->
          <el-steps :active="taskRecords.length - 1" v-else>
            <el-step title="已派单">
              <i slot="icon" class="progressIcon paidan"></i>
              <div slot="description" >
                <p v-for="(list) in taskRecords[0].data" :key="list.time" v-if="taskRecords[0]">
                  <span>{{list.name}}&nbsp;</span>
                  <span >{{list.time}}</span>
                </p>
              </div>
            </el-step>
            <el-step title="已接单">
              <i slot="icon" class="progressIcon jiedan"></i>
              <div slot="description" v-if="statusText[status] == '已接单'">
                
                <p v-for="(list) in taskRecords[1].data" :key="list.time" >
                  <span >{{list.name}}&nbsp;</span> 
                  <span >{{list.time}}</span>
                </p>
                <!-- <p>曲丽丽 01-10 19:20:32</p> -->
              </div>
            </el-step>
            <el-step title="已完成">
              <i slot="icon" class="progressIcon wancheng"></i>
              <!-- <div slot="description">
                <p></p>
              </div> -->
            </el-step>
            
          </el-steps>
          <!-- <br> -->
          <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
        </div>
      </div>
    </div>
    <!-- 作业结论 -->
    <div style="width:33%;float:left">
      <div class="panel conclusions" style="padding:0 0 3px;min-height:282px;">
        <div class="title" style="margin:0"><div class="label1">作业结论</div></div>
        <div style="margin:0 12px" v-if="statusText[status] == '已完成'">
          <!-- 维保结果 -->
          <table border="0" class="s_de_details s_de_details2 clearfix" v-if="taskResult.commitType == '0'">
            <tbody>
              <tr>
                <td><span class="tie">作业结论</span><span >{{taskResult.conclusion}}</span></td>
              </tr>
              <tr>
                <td>
                  <span class="tie">作业记录单</span>
                  <span><picture-list :maxShow="3" :images="taskImage"></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 配件更换 -->
          <table border="0" class="s_de_details s_de_details2 clearfix" v-else-if="taskResult.commitType == '1'">
            <tbody>
              <tr>
                <td style="width: 13%;"><span class="tie">维修内容</span><span>{{taskResult.conclusion}}</span></td>
                <td><span class="tie">配件类型</span><span>{{taskResult.annexType}}</span></td>
              </tr>
              <tr>
                <td style="width: 13%;"><span class="tie">维修费用</span><span>{{taskResult.repairFee}}</span></td>
                <td>
                  <span class="tie">作业记录单</span>
                  <span><picture-list :maxShow="3" :images="taskImage"></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 设备检修 -->
          <table border="0" class="s_de_details s_de_details2 clearfix" v-else-if="taskResult.commitType == '2'">
            <tbody>
              <tr>
                <td><span class="tie">维修内容</span><span >{{taskResult.conclusion}}</span></td>
              </tr>
              <tr>
                <td>
                  <span class="tie">作业记录单</span>
                  <span><picture-list :maxShow="3" :images="taskImage"></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 救援结果 -->
          <table border="0" class="s_de_details s_de_details2 clearfix" v-else-if="taskResult.commitType == '3'">
            <tbody>
              <tr>
                <td>
                  <span class="tie">作业记录单</span>
                  <span><picture-list :maxShow="3" :images="taskImage"></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin:0 12px" v-else class="noneConclusion">
          暂无结论
        </div>
      </div>
    </div>
  </div>
  <div class="row" style="z-index:1">
    <div style="width:67%;float:left">
      <div class="panel" >
        <div class="title">
          <div class="label1">人员信息
          <span class="fr" style="font-size: 14px;margin-right:24px;">
            共{{totalPerson}}人
          </span>
          </div>
        </div>
        <span @click="tabShow('left')" class="leftErrow" :class="{'unPrev':tab == 0}"></span>
        <div class="tabBox">
          <!-- 展示现有人员 -->
          <div v-for="(staff,index) in getStaffJson" :key="index" class="tabActiveSpan" v-if="tab == index || tab == index-1">
            
            <span class="stf_pic">
              <!-- <img :src="staff.url" alt="" width="104" height="104"/> -->
              <img :src="staff.url" style="background:#ccc;border-radius:50%" alt="" width="104" height="104"/>
              <div v-if="statusText[status] == '已派单'" class="mask" @click="deleteStaff(index)"></div>
            </span>
            <span class="stf_info">
              <div class="stf_name">{{staff.staffName}}
              </div>

           
              <!-- <el-cascader
                :options="personOptions"
                :show-all-levels="false"
                class="personPicker"
                clearable
                :filterable="true" 
              ></el-cascader> -->
              <div class="stf_p stf_department">{{staff.depName}}</div>
              <div class="stf_p stf_phone">{{staff.phone}}</div>
            </span>
          </div>
          <!-- 新增人员 -->
          <div class="tabActiveSpan tabActiveSpanSelect" v-if="tab + 2 == max * 2 && statusText[status] == '已派单'">
            <span class="stf_pic">
            </span> 
            <span class="stf_info">
              <!-- <div class="stf_name">请选择人员</div>  -->
              <el-cascader
                :options="personOptions"
                :show-all-levels="false"
                class="personPicker" 
                placeholder="请选择人员"
                clearable
                :filterable="true"
                v-model="selectedDepartmentOptions"
                @change="departmentChange"
              ></el-cascader>
              <div class="stf_p stf_department">- -</div> 
              <div class="stf_p stf_phone">- -</div>
            </span>
          </div>

        </div>
          <!-- <div v-if="tab == 0" :class="{tabActive:tab ==0}">必读</div>
          <div v-if="tab == 1" :class="{tabActive:tab ==1}">摘要</div>
          <div v-if="tab == 2" :class="{tabActive:tab ==2}">所有</div> -->
          
        <span @click="tabShow('right')" class="rightErrow" :class="{'unPrev':tab + 2 == max * 2}"></span>
      </div>
    </div>
    <div style="width:33%;float:left">
      <div class="panel liftInfo">
        <div class="title" style="margin:0">
          <div class="label1">电梯{{elevatorInfo.inNum}}
            <span class="fr" v-if="ifWatchInfo" @click="watchMap()" style="line-height: 22px;margin-right:24px;font-size: 12px;cursor:pointer;color: #4272FF;">
              查看地图
            </span>
            <span class="fr" v-if="!ifWatchInfo" @click="ifWatchInfo = true" style="line-height: 22px;margin-right:24px;font-size: 12px;cursor:pointer;color: #4272FF;">
              查看基本信息
            </span>
          </div>
          
        </div>
        <!-- <div class="s_de_details s_de_details2 clearfix">
          <ul>
            <li><span class="tie">注册代码</span><span >123243254345678901234567890</span></li>
            <li><span class="tie">使用单位</span><span>深圳市招商物业有限公司</span></li>
            <li><span class="tie">电梯区域</span><span>南山区-蛇口</span></li>
            <li><span class="tie">详细地址</span><span>南光城市花园1栋c座</span></li>
            <li><span class="tie">物业单位</span><span>深圳市招商物业有限公司</span></li>
            <li><span class="tie">制造单位</span><span>上海三菱电梯有限公司</span></li>
          </ul>
        </div> -->
        <div class="scrollDiv" v-show="ifWatchInfo">
          <table border="0" class="s_de_details s_de_details2 clearfix">
            <tbody>
              <tr>
                <td><span class="tie">注册代码</span><span >{{elevatorInfo.regCode}}</span></td>
                <td><span class="tie">使用单位</span><span>{{elevatorInfo.userDepartment}}</span></td>
              </tr>
              <tr>
                <td><span class="tie">电梯区域</span><span>{{elevatorInfo.locaLarea}}</span></td>
                <td><span class="tie">详细地址</span><span>{{elevatorInfo.address}}</span></td>
              </tr>
              <tr>
                <td><span class="tie">物业单位</span><span>{{elevatorInfo.propertyName}}</span></td>
                <td><span class="tie">制造单位</span><span>{{elevatorInfo.manufactName}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="!ifWatchInfo">
          <div id="mapContainer" ></div>
        </div>
        <!-- <div id="container" style="width:500px; height:300px"></div> -->
      </div>
    </div>
  </div>
  <!-- 关闭确认 弹窗-->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="closeModelDialog">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/xym/dia-warn.png" alt="">
        </div>
        <div class="dia-con-p">
          <h4>是否确认关闭工单？</h4>
          <p>关闭后不可复原，请谨慎操作</p>
        </div>
      </div>
      <div style="margin:20px 0 40px" class="tac">
        <div style="font-size: 20px;margin-bottom: 10px">工单详情</div>
        <el-row style="border-bottom: 1px solid #bdc3d1;">
          <el-col :span="8"><div class="grid-content bg-purple">电梯注册代码</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">作业时间</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">作业类型</div></el-col>
          <!-- <el-col :span="6"><div class="grid-content bg-purple-light">作业人员</div></el-col> -->
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{elevatorInfo.regCode}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">{{workTime}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">{{typeText[taskType]}}</div></el-col>
          <!-- <el-col :span="6"><div class="grid-content bg-purple-light">{{confirmCloseTask.persons}}</div></el-col> -->
        </el-row>
      </div>
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="cancelCloseTask()">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="closeTask(taskNo)">确认</div>
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
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
import PictureList from "../../components/PictureList"; //级联选择多选 完成

export default {
  data() {
    return {
      aaaa:['zhinan','小明'],
      personOptions: [],
      activeStatus: 0,
      tab: 0, //人员页卡切换
      getStaffJson:[],
      totalPerson:0,
      max:0,
      taskImage:[
      // 'http://192.168.100.7:8080/domino/view/image?filename=GI_be3P7mMdJ3W7p9W0V.png',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_eD05guAm1I2c8dpw4.jpg',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_gnxeay4ZQ87gMGsVW.jpg',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_eD05guAm1I2c8dpw4.jpg',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_gnxeay4ZQ87gMGsVW.jpg',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_bQ502kXGow80KFJXa.jpg',
      // 'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
      ],
      ifWatchInfo:true,
      map:'',
      taskRecords:[{data:[]}],
      taskNo:'',
      elevatorInfo:[],
      status:'',
      taskResult: [],
      selectedDepartmentOptions: [],
      lastStep: '',
      taskType:'',
      taskImage:[],
      workTime:'',
      paidanPerson:'',
      paidanTime:'',
      closeModelDialog:false,
      confirmCloseTask:[],
      statusText:{
        0:'无计划',
        1000:'可派单',
        2000:'未派单',
        3000:'已派单',
        4000:'已接单',
        5000:'已关闭',
        6000:'已超时',
        7000:'已完成',
      },
      typeText:{
        1015:'例行维保',
        1090:'季度维保',
        1180:'半年维保',
        1365:'年度维保',
        2000:'故障处理',
        4000:'事故救援',
      }
    }
  },
  components: {
    'fotter': fotter,
    choiceindex, //级联
    'picture-list':PictureList

  },
  mounted() {
    this.getMissionDetailData()
    // 获取部门列表
    this.getdeps()
  },
  methods: {
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
    // 下拉人员选中值
    departmentChange(arr) {
      const that = this
      let flag = true
      // this.ruleForm.assembId = arr[arr.length-1] // 取数组最后一个值赋值
      let checkedId = arr[arr.length-1]
      console.log("checkedId===" + checkedId)
      this.selectedDepartmentOptions = []
      console.log('this.dispatchStaffList', this.getStaffJson)
      this.getStaffJson.forEach(item => {
        if (item.userId == checkedId) {
          this.$message.error('员工已存在')
          flag = false
          return false // 跳出循环，不能跳出方法
        }
      })

      if (!flag) return // 控制函数执行
      var personIds = []
      this.getStaffJson.forEach(item => {
        personIds.push(item.userId)
      })
      personIds.push(checkedId) // 包含新增人员的ID数组
      // 新增
      this.editOrDeletePerson(personIds,checkedId)
    },
    // 删除员工
    deleteStaff(i) {
      if(this.getStaffJson.length > 1){
        this.getStaffJson.splice(i, 1)
        var personIds = []
        this.getStaffJson.forEach(item => {
          personIds.push(item.userId)
        })
        // 删除
        this.editOrDeletePerson(personIds)
      } else {
        this.$message.error("不能再删啦")
      }

    },
    // 调用接口 编辑/删除接单人员
    editOrDeletePerson(personIdsArr,checkedId){
      
      // 编辑接单人员
      let params = {
        taskId: this.taskNo,
        mpIds: personIdsArr
      }
      api.taskApi.editPersons(params).then(res => {
        // this.$message
        if(res.data.message == 'success'){
          // 新增员工
          if(checkedId){
            api.accountApi.getStaffDetails(checkedId).then(res2 => {
              // console.log('resId', res.data)
              let staffDetail = res2.data.data
              console.log('staffDetail', staffDetail)
              this.getStaffJson.push({
                userId: staffDetail.staffInfo.id,
                avatarUrl: staffDetail.staffInfo.avatarUrl,
                staffName: staffDetail.staffInfo.name,
                depName: staffDetail.departmentName,
                phone: staffDetail.staffInfo.account,
              })
              // 重新计算人数
              this.totalPerson = this.getStaffJson.length

              if(this.status == 3000){ // 已派单
                this.max = this.totalPerson % 2 == 0 ?  Math.ceil(this.totalPerson/2) + 1 : Math.ceil(this.totalPerson/2)
              } else {
                this.max = Math.ceil(this.totalPerson/2)
              }
              this.getStaffJson.forEach(item => {
                if(item.avatarUrl && !item.url) {
                  var url = api.accountApi.viewPic(item.avatarUrl)
                  Vue.set(item, 'url', url)
                }
              })

            })
          } else {
            console.log("1111111111this.getStaffJson===" + JSON.stringify(this.getStaffJson))

            // 重新计算人数
            this.totalPerson = this.getStaffJson.length

            if(this.status == 3000){ // 已派单
              this.max = this.totalPerson % 2 == 0 ?  Math.ceil(this.totalPerson/2) + 1 : Math.ceil(this.totalPerson/2)
            } else {
              this.max = Math.ceil(this.totalPerson/2)
            }
            this.getStaffJson.forEach(item => {
              if(item.avatarUrl && !item.url) {
                alert(111)
                var url = api.accountApi.viewPic(item.avatarUrl)
                Vue.set(item, 'url', url)
              }
            })
          }

        } else {
          // 重新获取详情
          this.getMissionDetailData()
          this.$message.error(res.data.message)
        }
        

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
    // 打开确认关闭工单弹窗
    openCloseDislog(task){
      this.closeModelDialog = true
    },
    // 取消关闭工单
    cancelCloseTask(){
      this.closeModelDialog = false
    },
    // 关闭工单
    closeTask(id){
      api.taskApi.closeTask(id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('关闭工单成功！');
          this.status = 5000 // 5000-已关闭
          this.closeModelDialog = false
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
    },
    // 获取工单详情
    getMissionDetailData(){
      api.taskApi.getMissionDetail(this.$route.params.id).then((res) => {
        this.taskRecords = res.data.data.taskRecords || []
        // 派单时间和派单人员
        if(this.taskRecords.length > 0){
          this.paidanPerson = this.taskRecords[0].name
          this.paidanTime = this.taskRecords[0].time
        }
        // 相同进度的合并处理
        this.taskRecords = this.mergeArrayList(this.taskRecords)
        console.log("this.taskRecords---" + JSON.stringify(this.taskRecords))
        this.elevatorInfo = res.data.data.elevatorInfo || []
        this.status = res.data.data.status
        this.taskResult = res.data.data.taskResult || []
        this.taskNo = res.data.data.taskNo
        this.taskType = res.data.data.taskType
        this.taskImage = []
        var taskImageArr = res.data.data.taskImage
        this.workTime = res.data.data.workTime || ''
        taskImageArr.forEach(item => {
          // console.log("this.taskImage---" + item)
            this.taskImage.push(api.accountApi.viewPic(item))
        })
        // console.log("this.taskImage---" + JSON.stringify(this.taskImage))
        this.getStaffJson = res.data.data.mpList
        this.totalPerson = this.getStaffJson.length
        if(this.status == 3000){
          this.max = this.totalPerson % 2 == 0 ?  Math.ceil(this.totalPerson/2) + 1 : Math.ceil(this.totalPerson/2)
        } else {
          this.max = Math.ceil(this.totalPerson/2)
        }
        // console.log("最大页数：：：" + this.max)
        // 人员头像
        this.getStaffJson.forEach(item => {
          if(item.avatarUrl) {
            var url = api.accountApi.viewPic(item.avatarUrl)
            Vue.set(item, 'url', url)
          }
        })
        // console.log("this.getStaffJson===" + JSON.stringify(this.getStaffJson))

      }).catch((res) => {
        
      })
    },
    // 查看地图
    watchMap(){
      this.ifWatchInfo = false
      // 构造地图
      this.map = new AMap.Map('mapContainer', {
        center: this.elevatorInfo.latLon.split(","),
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
        zoom: 20, // 设置地图的缩放级别
        features: ['bg', 'road', 'building', 'point'],
      });
      var markerContent = '<span class="dotMaker"></span>' 
      var marker = new AMap.Marker({
        content: markerContent,  // 自定义点标记覆盖物内容
        position: this.elevatorInfo.latLon.split(","),// 基点位置
        offset: new AMap.Pixel(1,4), // 相对于基点的偏移位置
        anchor:'center', // 设置锚点方位
        zIndex: 2,
        topWhenClick: true
      });
      this.map.add(marker);
    },
    tabShow(t) {
      
      if(t == 'left' && this.tab > 0){
        this.tab = this.tab - 2
      } else if(t == 'right' && this.tab < this.max * 2 - 2){
        this.tab = this.tab + 2
      }
      console.log("当前页数：：" + this.tab)
    },
     // 相同属性的数据合并处理
    mergeArrayList(arrData){
      var map = {},
      dest = [];
      for(var i = 0; i < arrData.length; i++){
        var ai = arrData[i];
        if(!map[ai.stat]){
          dest.push({
            stat: ai.stat,
            data: [ai]
          });
          map[ai.stat] = ai;
        }else{
          for(var j = 0; j < dest.length; j++){
            var dj = dest[j];
            if(dj.stat == ai.stat){
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest
    },
    // // 查询所有员工账户
    // getAllStaffData(){
    //   api.accountApi.getStaffs(this.queryParam).then((res) => {
    //     if(res.data.code === 200 && res.data.message === 'success'){
    //       this.getStaffJson = res.data.data.records

    //       this.totalPerson = this.getStaffJson.length

    //       this.max = this.totalPerson % 2 == 0 ?  Math.ceil(this.totalPerson/2) + 1 : Math.ceil(this.totalPerson/2)
    //       console.log("最大页数：：：" + this.max)
    //       this.getStaffJson.forEach(item => {
    //         var url = api.accountApi.viewPic(item.avatar)
    //         Vue.set(item, 'url', url)
    //       })

    //     } else {
    //       this.getStaffJson = []
    //     }
        
    //   }).catch((res) => {
        
    //   })
     
    // },
    // 步骤条 下一步
    next() {
      if (this.activeStatus++ > 2) this.activeStatus = 0;
    }
  },
}
</script>

<style lang="stylus">
// @import '../../assets/stylus/utilities'

#missionDetail
  .topPanel
    background: #fff;
    margin 0 -10px
  .bread-nav
    padding: 0 20px;
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #e9e9e9;
    span 
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      &.on
        color: #34414C;
    em
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      margin: 0 10px;
  .missionOrder
    padding 17px 17px 11px 60px;
    background url('../../assets/images/hs/order.png') no-repeat 23px 19px;
    .status
      color: rgba(0,0,0,0.45);
      margin 13px 10px 3px 0
    .progress
      font-size: 20px;
      margin-right 10px
  .orderNumber
    font-size: 20px;
  .s_de_details
    width 800px
    margin-top: 15px
    li
      float left
      font-size: 14px;
      padding: 5px 50px 5px 0
      min-width: 301px;
      // max-width: 301px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    .tie
      color: #7E8A95;
  // 步骤条 初始状态
  .progressPanel
    padding 60px 22px 0
    .progressIcon
      display inline-block
      width:45px;
      height:50px;
    .paidan
      background url('../../assets/images/hs/paidan.png') no-repeat center
    .jiedan
      background url('../../assets/images/hs/jiedan.png') no-repeat center
      opacity .3
    .wancheng
      background url('../../assets/images/hs/wancheng.png') no-repeat center
      opacity .3
    
    // 正在进行中
    .el-step__head.is-process
      .progressIcon
        box-shadow: 0 8px 12px -4px rgba(26,65,178,0.40);
        width 48px;
        height 48px
        border-radius: 50%
        margin 0 5px
      .paidan
        background url('../../assets/images/hs/paidanLight.png') no-repeat center #4272FF;
      .jiedan
        background url('../../assets/images/hs/jiedanLight.png') no-repeat center #4272FF;
        opacity 1
      .wancheng
        background url('../../assets/images/hs/wanchengLight.png') no-repeat center #4272FF;
        opacity 1
      .chaoshi
        background url('../../assets/images/hs/chaoshi.png') no-repeat center #FA4F43
        box-shadow: 0 8px 12px -4px rgba(178,26,26,0.40);
    // 已完成
    .el-step__head.is-finish
      .jiedan
        opacity 1

  .conclusions
    padding: 0;
    .noneConclusion
      background url('../../assets/images/hs/noneCon.png') no-repeat center
      text-align center 
      height 200px
      padding-top 150px
      color: #C2C7CC;
  .liftInfo
    padding: 0;
  .scrollDiv
    overflow-x hidden
    height: 192px
    padding 0 12px
  .s_de_details2
    width: 100%;
    td 
      min-width 0
      width: 50%;
      padding: 7px 12px 8px 12px;
      white-space: normal;
      vertical-align: top;
    .tie
      display block
      font-size: 12px;
      margin-bottom: 3px;
    span
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
  .leftErrow,.rightErrow
    display inline-block
    width 32px;
    height 32px
    background url('../../assets/images/hs/left2.png') no-repeat center;
    position absolute
    top: 133px;
    cursor: pointer
  .leftErrow
    left:25px
  .rightErrow
    right:25px;
    /*水平翻转*/
    -webkit-transform:rotateY(180deg);
    transform:rotateY(180deg);
  .unPrev{
    background url('../../assets/images/hs/left1.png') no-repeat left center;
    cursor: not-allowed;
  }
  .tabBox
    padding-top: 45px
    height:172px;
    overflow: hidden

  .tabActiveSpan
    width 50%
    float: left;
    text-align center
  .tabActiveSpan:nth-child(odd)
    border-right: 2px solid #D8DDDF;

  .stf_pic
    width:104px
    height 104px
    display inline-block
    margin-right 11px
    cursor pointer
    position: relative;
  // 图片遮罩层
  .stf_pic:hover .mask {
    opacity: 1;    
  }
  .stf_info
    display inline-block
    vertical-align: top;
    text-align left
  .stf_name
    font-size: 20px;
    color: #34414C;
    margin 5px 0 15px

  .stf_department
    color: #7E8A95;
    margin 5px 0 15px 0
    background url('../../assets/images/hs/department.png') no-repeat left center;

  .stf_p
    text-indent 17px
    color: #34414C;
    margin: 4px 0;
  .stf_phone
    background url('../../assets/images/hs/phone1.png') no-repeat left center;
  .mask
    position: absolute;
    top: 0;
    left: 0;
    width: 104px;
    height: 104px;
    background: url('../../assets/images/hs/delete.png') no-repeat center rgba(52,65,76,0.80);
    color: #ffffff;
    opacity: 0;
    border-radius: 50%

  .tabActiveSpanSelect
    .stf_pic
      border-radius: 50%
      background url('../../assets/images/hs/person.png') no-repeat center rgba(216,221,223,0.50);
    .stf_phone
      background url('../../assets/images/hs/phone3.png') no-repeat left center;
    .stf_department
      background url('../../assets/images/hs/department2.png') no-repeat left center;
  #mapContainer 
    width: 100%;
    margin: 0px;
    height: 100%;
    border-radius: 0 0 10px 10px
    height: 192px;
  @keyframes ripple {
    0% {
      left:4px;
      top:4px;
      opcity:75;
      width:0;
      height:0;
    }
    100% {
      left:-21px;
      top:-21px;
      opacity: 0;
      width:50px;
      height:50px;
    }
  }
  .dotMaker:before
    content:' ';
    position: absolute;
    z-index:2;
    left:0;
    top:0;
    width:8px;
    height:8px;
    background-color: #4272FF;
    border-radius: 50%;

  .dotMaker:after
    content:' ';
    position: absolute;
    z-index:1;
    width: 8px;
    height: 8px;
    background-color: #4272FF;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.3) inset;
    -webkit-animation-name:'ripple';/*动画属性名，也就是我们前面keyframes定义的动画名*/
    -webkit-animation-duration: 1s;/*动画持续时间*/
    -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
    -webkit-animation-delay: 0s; /*动画延迟时间*/
    -webkit-animation-iteration-count: infinite;/*定义循环资料，infinite为无限次*/
    -webkit-animation-direction: normal;/*定义动画方式*/
  .bg-purple {
    background: #d3dce6;
    padding:5px 0
  }
  .bg-purple-light {
    background: #e5e9f2;
    padding:5px 0
  }
</style>
