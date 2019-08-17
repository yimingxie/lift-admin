<template>
<div class="main-wrap" id="AddStaff">
  <div class="row" >

    <div class="panel" >
      <div class="title"><div class="label1">编辑员工</div></div>
      <div class="content">
        <!-- http-request：覆盖默认的上传行为，可以自定义上传的实现
        show-file-list：是否显示已上传文件列表，默认是true
        multiple：是否支持多选文件
        action：必选参数，上传的地址
        （如果不自定义上传行为，可以直接在action配置地址就行，没有地址可以为空，但是不能不写action） 
        headers="application/x-www-form-urlencoded"-->

        <el-upload
          class="avatar-uploader"
          :headers="{'Content-Type':'multipart/form-data'}"
          :http-request="upLoadHeadPic"
          :action="upLoadUrl"
          :show-file-list="false" 
          accept="image/png,image/jpg,image/jpeg"
        >
          <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
          <i v-else class="uploader-icon"></i>
          <div class="uploadBtn">点击上传员工照片</div>
          <div class="uploadTip">图片格式为.jpg/.png；建议图片尺寸为300像素*300像素，图片大小不可超过2M</div>
        </el-upload>

        <el-form ref="form" :model="editStaffForm" label-width="105px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：">
                <el-input v-model="editStaffForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="性别：">
                <div class="chooseSex">
                  <label class="btn male" :class="editStaffForm.gender == '1' ? 'active': ''">
                    <input type="radio" autocomplete="off" @click="onSelectSex('1')"/>
                  </label>
                  <label class="btn female" :class="editStaffForm.gender == '0' ? 'active': ''">
                    <input type="radio" autocomplete="off" @click="onSelectSex('0')"/>
                  </label>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="手机号：">
            <el-input v-model="editStaffForm.account" placeholder="(将作为为app登录账号)请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
            <a-date-picker @change="aChangePickDate1" :defaultValue="moment(birthday, 'YYYY-MM-DD')" :format="dateFormat" :showToday="false" placeholder="请选择日期" style="width: 248px">
            </a-date-picker>
          </el-form-item>
          <el-form-item label="从业日期：">
            <a-date-picker @change="aChangePickDate2" :defaultValue="moment(empTime, 'YYYY-MM-DD')" format="YYYY-MM-DD" :showToday="false" placeholder="请选择日期" style="width: 248px">
            </a-date-picker>
          </el-form-item>
          <el-form-item label="入职日期：">
            <a-date-picker @change="aChangePickDate3" :defaultValue="moment(entryTime, 'YYYY-MM-DD')" format="YYYY-MM-DD" :showToday="false" placeholder="(选填)请选择日期" style="width: 248px">
            </a-date-picker>
          </el-form-item>
          <el-form-item label="部门：">
            <el-select @change="depSelectChange" v-model="editStaffForm.depId" placeholder="请选择部门" >
              <el-option
                v-for="item in getAllDepJson"
                :key="item.id"
                :label="item.depName"
                :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="管辖区域：">
            
            <choiceindex 
              :only-last="true" 
              :selectedLabels="selectedAreaLabels" 
              clearable 
              @change="regionChange2" 
              :is-two-dimension-value="false" 
              v-model="checkList2" 
              :data="regionOptions2"
              placeholder="请选择完部门勾选管辖区域">
            </choiceindex>
      
           
          </el-form-item>
          <el-form-item >
            <span slot="label">管辖电梯：<div class="subTip" >（第一负责人）</div></span>
            <el-dropdown trigger="click" :hide-on-click="false" class="selectLiftDropdown">
              <span class="el-dropdown-link ">
                <span v-if="checkedLiftAs.length > 0">{{checkedLiftAs.join(", ")}}</span>
                <span v-else style="color:#C2C7CC;">(选填)请选择管辖区域后勾选管辖电梯</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="liftDropdown">
                <div v-if="getLIftDataFirst.length > 0" v-for="item in getLIftDataFirst" :key="item.regCode">
                    <!-- <div class="dropdownArea">{{item.areaName}}</div>
                    <span class="dropdownList dropdown1">{{item.regCode}}</span>
                    <span class="dropdownList dropdown2">{{item.inNum}}</span>
                    <span class="dropdownList dropdown3">{{item.address}}</span>
                    <span class="dropdownList dropdown4">
                      <el-checkbox-group v-model="checkedLiftAs" @change="handleCheckedLiftAsChange">
                        <el-checkbox :label="item.regCode" :key="item.regCode" class="checkbox16">{{nonetext}}</el-checkbox>
                      </el-checkbox-group>
                    </span> -->

                    <div class="dropdownArea">{{item.areaName}}</div>
                    <div v-for="list in item.data" :key="list.regCode">
                      <span class="dropdownList dropdown1">{{list.regCode}}</span>
                      <span class="dropdownList dropdown2">{{list.inNum}}</span>
                      <span class="dropdownList dropdown3">{{list.address}}</span>
                      <span class="dropdownList dropdown4">
                        <el-checkbox-group v-model="checkedLiftAs" @change="handleCheckedLiftAsChange">
                          <el-checkbox :label="list.regCode" :key="list.regCode" class="checkbox16">{{nonetext}}</el-checkbox>
                        </el-checkbox-group>
                      </span>
                    </div>
                  </div>
                <div v-if="getLIftDataFirst.length === 0" class="tac" style="color: #999;"> 无数据 </div>
              </el-dropdown-menu>
            </el-dropdown>
           
          </el-form-item>
          <el-form-item >
            <span slot="label">管辖电梯：<div class="subTip" >（第二负责人）</div></span>
            <el-dropdown trigger="click" :hide-on-click="false" class="selectLiftDropdown">
              <span class="el-dropdown-link ">
                <span v-if="checkedLiftBs.length > 0">{{checkedLiftBs.join(", ")}}</span>
                <span v-else style="color:#C2C7CC;">(选填)请选择管辖区域后勾选管辖电梯</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="liftDropdown">
                <div v-if="getLIftDataSecond.length > 0" v-for="item in getLIftDataSecond" :key="item.regCode">
                  <div class="dropdownArea">{{item.areaName}}</div>
                  <div v-for="list in item.data" :key="list.regCode">
                    <span class="dropdownList dropdown1">{{list.regCode}}</span>
                    <span class="dropdownList dropdown2">{{list.inNum}}</span>
                    <span class="dropdownList dropdown3">{{list.address}}</span>
                    <span class="dropdownList dropdown4">
                      <el-checkbox-group v-model="checkedLiftBs" @change="handleCheckedLiftBsChange">
                        <el-checkbox :label="list.regCode" :key="list.regCode" class="checkbox16">{{nonetext}}</el-checkbox>
                      </el-checkbox-group>
                    </span>
                  </div>
                </div>
                <div v-if="getLIftDataSecond.length === 0" class="tac" style="color: #999;"> 无数据 </div>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-input v-model="editStaffForm.minorRegCode"></el-input> -->
         
          </el-form-item>
          <el-form-item label="从业资格证：">
            <el-row >
              <el-col :span="5">
                <el-upload
                  class="avatar-uploader2"
                  :headers="{'Content-Type':'multipart/form-data'}"
                  :http-request="upLoadQualificationPic"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  accept="image/png,image/jpg,image/jpeg"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar2">
                  <i v-else class="avatar-uploader-icon2"></i>
                </el-upload>
              </el-col>
              <el-col :span="18">
                <span class="uploadTip2">(选填)图片格式为.jpg/.png；
                  <br>建议图片尺寸为300像素*300像素，图片大小不可超过2M</span>
              </el-col>
            </el-row>
          </el-form-item>
        
          <div class="tac" style="margin-top:33px">
            <router-link to="/staff"><el-button class="dialogCancel">取 消</el-button></router-link>

            <el-button type="primary" @click="confirmEditAccount()" class="dialogSure" style="margin-left:45px;">确 认</el-button>
          </div>
        </el-form>
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
import newArea from "../../utils/newArea";
import { client } from '@/utils/alioss'
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
let pcas = require("../../utils/citySelector/pcas-code.json")
import moment from 'moment';

export default {
  data() {
    return {
      upLoadUrl:'http://192.168.100.7:8080/domino/upload/image',
      imageUrl1:'',
      imageUrl2:'',
      dateFormat: 'YYYY-MM-DD',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        sex:0
      },
      props: { 
        multiple: true
      },
      regionOptions: [],
      areaForm: {
        city : '',
        area : '',
        minarea : '',
        selectedOptions: [],//地区筛选数组
      },
      // data:[], // 与element级联选择器格式一致
      checkList1: [],
      checkList2: [],
      regionOptions2:[],
      selectedArea:[],
      liftList: [],

      checkAll: false,
      checkedStaffs: [],
      checkedAllStaff:[],
      nonetext:'',
      searchKey:'',
      editStaffForm: {
        id:'',
        name: '', //员工姓名
        account: "", //账号:限定手机号
        corpId: window.localStorage.getItem('corpId'), //公司id
        depId: "" , //部门id
        manageArea:'', //管理区域
        gender:'0', //性别; 0:女;1:男
        birthday:'', //生日 日期 须限定格式 2003-11-19 00:00:00
        empTime:'', //从业日期 须限定格式 2003-11-19 00:00:00
        empUrl:'', // 从业资格证 图片地址
        avatarUrl:'',  // 头像地址
        entryTime:'',//入职日期 须限定格式 2003-11-19 00:00:00
        majorRegCode:'',  // 管辖电梯（第一负责人） regcode 逗号分隔
        minorRegCode:'', // 管辖电梯（第二负责人） regcode 逗号分隔
      },
      getAllDepJson:[],
      queryParam:{
        offset:1,
        limit:50,
        column: "create_time",
        order: false,
        queryStr: "",
        corpId:window.localStorage.getItem('corpId'),
        depName:'',
        areaCode:''
      },
      selectedAreaLabels: [],
      checkAreaList:[], //员工管辖区域,数组
      getLIftDataFirst:[],
      getLIftDataSecond:[],
      checkedLiftAs:[],
      checkedLiftBs:[],
    }
  },
  components: {
    'fotter': fotter,
    choiceindex, //级联
    'search-input': SearchInput,

  },
  watch:{
    // 切换员工管辖区域，获取管辖电梯列表
    checkAreaList(val){
      this.getLIftDataFirst = []
      this.getLIftDataSecond = []
      this.checkedLiftAs = []
      this.checkedLiftBs = []
      var firstList = []
      var secondList = []
      if(val.length > 0){
        for(var i = 0; i < val.length; i++){
          api.accountApi.getElevatorByArea(window.localStorage.getItem('corpId'),val[i]).then((res) => {
            if(res.data.code === 200 && res.data.message === 'success'){
               
                if(res.data.data.major.length > 0){

                  res.data.data.major.forEach(item =>{
                    firstList.push(item)
                  })
                  
                }
                if(res.data.data.minor.length > 0){
                  res.data.data.minor.forEach(item =>{
                    secondList.push(item)
                  })
                }
               
                console.log("this.getLIftDataFirst===" + JSON.stringify(this.getLIftDataFirst))

                firstList.forEach(item =>{
                  var areaName = newArea.getAreaName(item.areaCode).join('')
                  Vue.set(item, 'areaName', areaName)
                })
                secondList.forEach(item =>{
                  var areaName = newArea.getAreaName(item.areaCode).join('')
                  Vue.set(item, 'areaName', areaName)
                })


                ///////////////////////////
                this.getLIftDataFirst = this.mergeArrayList(firstList)
                this.getLIftDataSecond = this.mergeArrayList(secondList)
                console.log("dest::::" + JSON.stringify(this.getLIftDataFirst));
                //////////////////////////


            } else {
              this.getLIftDataFirst = []
              this.getLIftDataSecond = []
            }
            
            // console.log("res.data.code" + res.data.data.records[0])s
          }).catch((res) => {
            
          })
        }
      } else{
        this.getLIftDataFirst = []
        this.getLIftDataSecond = []
      }
      
      
    }
  },
  computed: { 
    birthday() {
      //    console.log("this.getStaffInfo.birthday---" + this.getStaffInfo.birthday)

      // if(this.getStaffInfo.birthday){
        var birthday = moment(this.getStaffInfo.birthday).format(this.dateFormat)//入职日期
      // } else {
      //   var birthday = ''
      // }
      return birthday; 
    },
    entryTime() {
      var entryTime = moment(this.getStaffInfo.entryTime).format(this.dateFormat)//入职日期
      return entryTime; 
    },
    empTime() {
      var empTime = moment(this.getStaffInfo.empTime).format(this.dateFormat)//入职日期
      return empTime; 
    },
  },
  mounted() {
    this.getAllDepartmentData()
    
    this.editStaffForm.id = this.$route.params.staffId
    // console.log("params==" + this.$route.params.staffId)
    
  },
  methods: {
    // 相同属性的数据合并处理
    mergeArrayList(arrData){
      var map = {},
      dest = [];
      for(var i = 0; i < arrData.length; i++){
        var ai = arrData[i];
        if(!map[ai.areaName]){
          dest.push({
            areaName: ai.areaName,
            data: [ai]
          });
          map[ai.areaName] = ai;
        }else{
          for(var j = 0; j < dest.length; j++){
            var dj = dest[j];
            if(dj.areaName == ai.areaName){
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest
    },
    // 自定义头像上传方法
    upLoadHeadPic(fileObj) {
      const _file = fileObj.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      const formData = new FormData()
      formData.append('file', fileObj.file)
      formData.append('type', fileObj.file.type)

      api.accountApi.uploadPic(formData).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          // this.imageUrl1 = "http://192.168.100.7:8080/domino/view/image?filename=" + res.data.data.fileName
          this.imageUrl1 = api.accountApi.viewPic(res.data.data.fileName)
          this.editStaffForm.avatarUrl = res.data.data.fileName
        } else {

        }
        
      })
    },
    // 自定义从业资格证上传方法
    upLoadQualificationPic(fileObj) {
      const _file = fileObj.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传从业资格证图片大小不能超过 2MB!");
        return false;
      }

      const formData = new FormData()
      formData.append('file', fileObj.file)
      formData.append('type', fileObj.file.type)

      api.accountApi.uploadPic(formData).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          // this.imageUrl2 = "http://192.168.100.7:8080/domino/view/image?filename=" + res.data.data.fileName
          this.imageUrl2 = api.accountApi.viewPic(res.data.data.fileName)
          this.editStaffForm.empUrl = res.data.data.fileName
        } else {
        }
      })

    },
    moment,
    // 查询账户详情
    getAllAccountData(){
      api.accountApi.getStaffDetails(this.$route.params.staffId).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getStaffInfo = res.data.data.staffInfo
          this.editStaffForm.name = this.getStaffInfo.name//员工姓名
          this.editStaffForm.account = this.getStaffInfo.account//员工姓名
          this.editStaffForm.depId = this.getStaffInfo.depId//员工姓名
          
          this.editStaffForm.gender = this.getStaffInfo.gender// 从业资格证 图片地址
          this.checkList2 = this.getStaffInfo.manageArea.split(',')// 从业资格证 图片地址

          this.editStaffForm.empUrl = this.getStaffInfo.empUrl// 从业资格证 图片地址
          this.editStaffForm.avatarUrl = this.getStaffInfo.avatarUrl// 头像地址
          this.editStaffForm.empTime = this.getStaffInfo.empTime.substring(0,10) || ''
          this.editStaffForm.entryTime = this.getStaffInfo.entryTime.substring(0,10) || ''//入职日期
          this.editStaffForm.birthday = this.getStaffInfo.birthday.substring(0,10) || ''//入职日期
          // console.log("this.editStaffForm.birthday" + this.editStaffForm.birthday)
          // this.birthday = moment(this.getStaffInfo.birthday).format(this.dateFormat)//入职日期
          // 设置员工管辖区域

          this.depSelectChange(this.editStaffForm.depId, 1)

          var majorArr = []
          res.data.data.major.forEach(item =>{
            majorArr.push(item.regCode)
          })
          this.editStaffForm.majorRegCode = majorArr.join(',')

          var minorArr = []
          res.data.data.minor.forEach(item =>{
            minorArr.push(item.regCode)
          })
          this.editStaffForm.minorRegCode = minorArr.join(',')
          if(this.getStaffInfo.avatarUrl){
            // this.imageUrl1 = "http://192.168.100.7:8080/domino/view/image?filename=" + this.getStaffInfo.avatarUrl
            this.imageUrl1 = api.accountApi.viewPic(this.getStaffInfo.avatarUrl)
            
          }
          if(this.getStaffInfo.empUrl){
            // this.imageUrl2 = "http://192.168.100.7:8080/domino/view/image?filename=" + this.getStaffInfo.empUrl
            this.imageUrl2 = api.accountApi.viewPic(this.getStaffInfo.empUrl)

          }
        } else {
          this.getStaffInfo = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
     
    },
    handleCheckedLiftAsChange(value){
      console.log("checkA:" + value)
      // console.log("Allcheckop:==" + this.checkedAllStaff)
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.getAllAccountJson.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.getAllAccountJson.length;
    },
    handleCheckedLiftBsChange(value){
      // console.log("checkB:" + value)
      // console.log("Allcheckop:==" + this.checkedAllStaff)
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.getAllAccountJson.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.getAllAccountJson.length;
    },
    // 根据部门值变化
    // val- 部门ID
    depSelectChange(val,type){
      console.log("val---" + val)
      var selectDep = this.getAllDepJson.filter(item => {
        return item.id == val
      })

      // var processArr = arr.filter(function(value) {
      //     return value == val;
      // })
      // console.log("this.getAllDepJson" + JSON.stringify(this.getAllDepJson))

      // console.log("selectRange---" + selectDep)
      var selectRange = selectDep[0].areaCode
      

      // alert(1)

      // 重置联动数据 
      this.regionOptions2 = []

      //   console.log("checkList1=" + this.checkList)
      this.checkList1 = selectRange.split(",")

      // this.createPickAreaRange()
      if(this.checkList1.length > 0){
        // this.getStaffAreaRange(this.checkList1)
        var sheng = this.checkList1[0].substring(0,2)
        var shi = this.checkList1[0].substring(0,4)
        var qu = []
        // console.log("省：" + sheng)
        // console.log("市：" + shi)
        // console.log("区：" + qu)
        for(var i = 0 ; i< this.checkList1.length; i++){
          // 去重
          
          // qu.forEach(item =>{
          //   if(item !== this.checkList[i].substring(0,6)){
            qu.push(this.checkList1[i].substring(0,6))
            // 去重
            qu = this.uniq(qu)
          //   }
          // })
          // console.log("所选区：" + qu)
        }
        // var aaa = this.regionOptions.filter(item => item.code === '11')
        // 构建员工管辖区域数据
        this.regionOptions = newArea.newAreaOption()
        this.regionOptions.forEach((item, i) => {
          // 第一级
          var obj1 = {
            value: '',
            label: '',
            children: []
          }
          // 查找对应的省
          if(item.value === sheng){
            obj1.value = sheng
            obj1.label = item.label

            // 第二级
            var obj2 = {
              value: '',
              label: '',
              children: []
            }
            if (item.children) { // 二级循环
              
              item.children.forEach((secondItem, secondI) => {
                // 查找对应的市
                if(secondItem.value === shi){
                  obj2.value = shi
                  obj2.label = secondItem.label
                  obj1.children.push(obj2)

                  
                  if (secondItem.children) { // 三级循环
                    secondItem.children.forEach((thirdItem, thirdI) => {
                      // 查找对应的区，区有多个
                      for(var j = 0;j < qu.length; j++){
                        // 第三级
                        var obj3 = {
                          value: '',
                          label: '',
                          children: []
                        }
                        if(thirdItem.value === qu[j]){
                          obj3.value = qu[j]
                          obj3.label = thirdItem.label
                          obj2.children.push(obj3)
                          
                         
                        
                          if (thirdItem.children) { // 四级循环
                            thirdItem.children.forEach((forthItem, forthI) => {
                              // 查找对应的片区， 片区有多个
                              for(var k = 0; k < this.checkList1.length; k++) {
                                // 第四级
                                var obj4 = {
                                  value: '',
                                  label: '',
                                }
                                // 若areacode只有6位，片区全加上
                                if(this.checkList1[k].length === 6 && forthItem.value.substring(0,6) === this.checkList1[k]){
                                  
                                  obj4.value = forthItem.value
                                  obj4.label = forthItem.label
                                  obj3.children.push(obj4)
                                }
                                if(this.checkList1[k].length > 6 && forthItem.value === this.checkList1[k]){
                                  // console.log("所选片区-" + forthItem.value)
                                  // console.log("所选片区-" + this.checkList1[k])
                                  obj4.value = forthItem.value
                                  obj4.label = forthItem.label
                                  obj3.children.push(obj4)
                                }
                              }
                              
                            })
                          }
                        }
                      }
                    })

                  }
                }
              })
            }
            // console.log("obj---==" + JSON.stringify(obj1))
            this.regionOptions2 = []
            this.regionOptions2.push(obj1)
            
          }
          
          // newFormat[item.code] = item.name

        })
        // console.log("selectRange---" + this.regionOptions2)
        // 构建员工管辖区域数据 end
          
        // this.regionChange2(this.checkList2)
      }
      if(type !== 1){
        this.checkList2 = selectRange.split(",")
      }
      // console.log("this.checkList2--11111111111111-" + this.checkList2)
    },
    createPickAreaRange(){
      
    },
    regionChange2(val, totalLabel) {

      this.selectedAreaLabels = [] // 重置
      
      var util = require("util")
      // 重置联动数据 
      // this.regionOptions2 = []
      // console.log("所选区域码:" +  JSON.stringify(totalLabel));
      // this.checkList2 = this.checkList
      this.checkAreaList = []
      
      // alert(this.checkList.length)
      // var checkArr = this.checkList.split(",")
      if(val.length > 0){
        var sheng = val[0].substring(0,2)
        var shi = val[0].substring(0,4)
        var qu = []
        for(var i = 0 ; i< val.length; i++){
          // 去重
          
          // qu.forEach(item =>{
          //   if(item !== this.checkList[i].substring(0,6)){
            qu.push(val[i].substring(0,6))
            // 去重
            qu = this.uniq(qu)
          //   }
          // })
          // console.log("所选区：" + qu)
        }
        // var aaa = this.regionOptions.filter(item => item.code === '11')

        // console.log("省：" + sheng)
        // console.log("市：" + shi)
        // console.log("区：" + qu)
        var checkListNew = [] // 片区数组截取前6位
        this.checkAreaList = val
        var pianquLength = 0 //同区的片区个数
        // 将所有片区截取前6位
        val.forEach(item => {
          checkListNew.push(item.substring(0, 6))

        })
        // 选择的区循环，判断是否全选
        qu.forEach(quitem =>{
          pianquLength = this.getSameNum(quitem,checkListNew)
          // 如果全选区 则只传此区的code
          // console.log("this.checkAreaList====" + this.checkAreaList.length) 

          // 判断片区总数是否与选中片区个数相等 若相等 则为全选
          if(this.ifCheckAllQu(quitem, pianquLength)){
            for(var i = 0; i < this.checkAreaList.length; i++){
              // console.log("quitem::::" + quitem)
              if(this.checkAreaList[i].substring(0,6) === quitem){
                this.checkAreaList[i] = this.checkAreaList[i].substring(0,6)
              }
            }
          }
          this.checkAreaList = this.uniq(this.checkAreaList) // 去重
        })

        // console.log("checkListNew==" + checkListNew)
        // console.log("pianquLength==" + pianquLength)
        // console.log("checkAreaList=" + this.checkAreaList)
        // 区域标签展示格式转换
        this.selectedAreaLabels = newArea.getAreaName(this.checkAreaList.join(','))
        // 区域标签展示格式转换---------
        
        // var dest = [],
        //   map = {};
        // for(var i = 0; i < totalLabel.length; i++) {
        //     var ai = {
        //       "qu" : totalLabel[i].split("/")[2],
        //       "pianqu": totalLabel[i].split("/")[3]
        //     }
        //   if(!map[ai.qu]) {
        //     dest.push({
        //       name: ai.qu,
        //       data: [ai.pianqu]
        //     });
        //     map[ai.qu] = ai;
        //   } else {
        //     for(var j = 0; j < dest.length; j++){
        //       var dj = dest[j];
        //       if(dj.name == ai.qu) {
        //         dj.data.push(ai.pianqu);
        //         break;
        //       }
        //     }
        //   }
        //   // console.log("所选区域码ai:" +  JSON.stringify(ai))
        // }
        // // console.log("所选区域码:" +  JSON.stringify(dest));
        // dest.forEach(item =>{
        //   console.log("item.data=========" + item.data[0])
        //   // 如果区全选
        //   if(this.ifCheckAllQu(item.name, item.data.length)){
        //     this.selectedAreaLabels.push(item.name + "-全部")
        //   } else  {
        //     if (item.data[0] !== undefined){
        //       var labelItem = item.name + "-" + item.data
        //     } else {
        //       var labelItem = item.name + "-全部"
        //     }
        //     this.selectedAreaLabels.push(labelItem)
        //   }
         
        // })
        // 区域标签展示格式转换---------end
        
        
      }
      // console.log("checkAreaList=" + this.checkAreaList)

    },
    // 判断是否全选区
     /**
     * 获取数组中相同元素的个数
     * @param qu 区code码或区名称
     * @param pianQuLength 片区的个数
     */
    ifCheckAllQu(qu,pianQuLength){
      var BreakException= {}; // 用于终止循环
      var flag = false
      try {
        this.regionOptions.forEach(item1 => {
          // console.log("item4::" + JSON.stringify(item1))
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {

              if((item3.label === qu && item3.children.length === pianQuLength)|| (item3.value === qu && item3.children.length === pianQuLength)){
                flag = true
                // console.log("true!")
                // this.selectedArea.push(item3.label)
                throw BreakException;
              }
              else {
                flag = false
              }
            })
          })
        })
      } catch(e) {
        if (e!==BreakException) throw e;
      }
      // console.log("flag===" + flag)
      if(flag){
        return true
      }
    },
     /**
     * 获取数组中相同元素的个数
     * @param val 相同的元素
     * @param arr 传入数组
     */
    getSameNum(val,arr){
      var processArr = arr.filter(function(value) {
          return value == val;
      })
      return processArr.length;
    },
    // 去重
    uniq(array){
      var temp = []; //一个新的临时数组
      for(var i = 0; i < array.length; i++){
          if(temp.indexOf(array[i]) == -1){
              temp.push(array[i]);
          }
      }
      return temp;
    },
    // 获取员工的管辖区域可选范围
    getStaffAreaRange(list){

    },
    
    // 查询所有部门
    getAllDepartmentData(){
      api.accountApi.getDepartments(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllDepJson = res.data.data.records
          // 加载部门数据后再加载员工详情
          this.getAllAccountData()
          // console.log("this.getAllDepJson" + JSON.stringify(this.getAllDepJson))
        } else {
          this.getAllDepJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
    // 确认添加员工账号
    confirmEditAccount(){
      if(this.checkedLiftAs.length > 0){
        this.editStaffForm.majorRegCode = this.checkedLiftAs.join(',')
      }
      if(this.checkedLiftBs.length > 0){
        this.editStaffForm.minorRegCode = this.checkedLiftBs.join(',')
      }
      this.editStaffForm.manageArea = this.checkAreaList.join(',')
      // 修改账号名
      api.accountApi.editStaff(this.editStaffForm).then((res) => {
        
        if (res.data.code === 200) {
          this.$message.success('编辑成功！');
          this.$router.push('/staff')
          
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
      
    },
    
     // 全选，非全选
    handleCheckAllChange(val) {
      this.checkedStaffs = val ? this.checkedAllStaff : [];
      // this.isIndeterminate = false;
      // console.log("check:" + this.checkedStaffs)
    },
    // 点击多选框
    handleCheckedLiftsChange(value) {
      // console.log("check:" + value)
      // console.log("Allcheckop:==" + this.checkedAllStaff)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.liftList[0].lifts.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.getAllAccountJson.length;
    },
   
    // 切换性别
    onSelectSex (value) {
      // this.value = value
      this.editStaffForm.gender = value
    },
    // A日历选择框改变时触发
    aChangePickDate1(date, dateString){
      // console.log(date, dateString);
      this.editStaffForm.birthday = dateString
    },
    aChangePickDate2(date, dateString){
      // console.log(date, dateString);
      this.editStaffForm.empTime = dateString
    },
    aChangePickDate3(date, dateString){
      // console.log(date, dateString);
      this.editStaffForm.entryTime = dateString
    },
    // 去重
    uniq(array){
      var temp = []; //一个新的临时数组
      for(var i = 0; i < array.length; i++){
          if(temp.indexOf(array[i]) == -1){
              temp.push(array[i]);
          }
      }
      return temp;
    },
    
    
    
  },
}
</script>

<style lang="stylus">
// 工具类
@import '../../assets/stylus/utilities'
#AddStaff
  .el-input__inner
    height: 32px!important;
    line-height: 32px!important;
  .el-form-item__label
    line-height: 32px!important;
  .el-input__icon
    line-height: 32px!important;
  .content
    width:580px
    margin 50px auto
  .chooseSex
    .btn
      position relative
      size 30px
      text-align: center;
      cursor pointer
      display: inline-block;
      transition: opacity  .3s;
      opacity 0.3
      // transform scale(1.2)
      &.active
        // background: #4272FF;
        opacity 1
    .male
      background url('../../assets/images/hs/male.png') no-repeat left center;
    .female
      background url('../../assets/images/hs/female.png') no-repeat left center;
    input[type="radio"]
      absolute left top
      appearance none
      opacity 0
  .subTip
    transform:scale(0.8);
    font-size: 10px;
    color: #7E8A95;
    text-align: right;
    line-height: 6px;
    white-space: nowrap;

  .avatar-uploader{
    border-color: #409EFF;
    text-align: center;
    margin-bottom: 40px;
  }
  .uploader-icon {
    border-radius: 50%;
    font-size: 28px;
    color: #8c939d;
    width: 96px;
    height: 96px;
    line-height: 96px;
    text-align: center;
    display inline-block
    background url('../../assets/images/hs/add2.png') no-repeat center #D8DDDF;

  }
  .avatar {
    width: 96px;
    height: 96px;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
  }
  .uploadBtn
    color: #34414C;
    margin: 6px 0;
  .uploadTip
    font-size: 12px;
    color: #7E8A95;

  .avatar-uploader2 .el-upload {
    background: #FFFFFF;
    border: 1px solid #D8DDDF;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader2 .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    size 90px 120px
    line-height: 120px;
    text-align: center;
    display inline-block
    background url('../../assets/images/hs/add2.png') no-repeat center;

  }
  .avatar2 {
    size 90px 120px
    display: block;
  }
  .uploadTip2
    font-size: 12px;
    color: #7E8A95;
    absolute bottom 3px;
    line-height: 21px;
    margin-left: 3px;


  .selectLiftDropdown
    width 100%!important
    border-radius: 4px!important;
    border: 1px solid #dcdfe6!important;
    height: 32px !important;
    line-height: 32px !important;
    position relative!important
    padding: 0 10px!important;
    overflow: hidden!important;
    white-space: nowrap!important;
    text-overflow: ellipsis!important;
    .el-dropdown-link,.el-dropdown-menu
      width: 100%!important;
    .el-dropdown-link
      display: inline-block!important;
    .el-icon-arrow-down
      float: right!important;
      color: #c0c4cc!important;
      height: 32px!important;
      line-height: 29px!important;
.liftDropdown
  width 473px
.dropdownList
  display inline-block
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding 0 10px
  font-size: 14px;
  color: #34414C;
.dropdown1
  width:20%
.dropdown2
  width:20%
.dropdown3
  width:50%
.dropdown4
  width:6%
.dropdownArea
  color: #7E8A95;
  padding 10px
</style>
