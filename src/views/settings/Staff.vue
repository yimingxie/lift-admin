<template>
<div class="main-wrap" id="staff">
  <div class="row" >

    <div class="panel" style="margin-bottom: 0px;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">
      <div class="title"><div class="label1">员工管理</div></div>
      <div class="subSelect">
        <!-- <el-cascader 
          filterable
          change-on-select
          class="regionPicker" 
          :options="regionOptions" 
          v-model="form.selectedOptions"
          @change="handleChange" 
          :show-all-levels="false">
        </el-cascader> -->
        <!-- 省市联动筛选 -->
        <div class="llct-area">
          <city-choose @childVal="selectCity" :selectCity="selectArea"></city-choose>
        </div>
        <span class="splitLine">|</span>
        <!-- <el-select clearable v-model="selectedDpt" placeholder="请选择部门" class="regionPicker">
          <el-option
            v-for="item in departments"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select> -->
        <el-select @change="depSelectChange()" clearable v-model="queryParam.depId" placeholder="请选择部门" class="regionPicker">
          <el-option
            v-for="item in getAllDepJson"
            :key="item.id"
            :label="item.depName"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="splitLine">|</span>
        <radio-group :items="periods" :value.sync="period">
          <span slot="label">作业状态：</span>
        </radio-group>
        <span class="splitLine">|</span>
        <radio-group :items="periods1" :value.sync="period1">
          <span slot="label">账号状态：</span>
          <!-- <template slot="item" scope="props">
            <li>{{ props.text }}</li>
          </template> -->
        </radio-group>
      </div>
      <div class="subBtns">
        <router-link :to="{ name: 'addStaff'}"><button class="btn blueBtn" >添加员工</button></router-link>
        
        <router-link :to="{ name: 'department'}"><button class="btn whiteBtn" >部门管理</button></router-link>
        <span class="fr" style="margin: 5px 10px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkbox16">全选</el-checkbox>
        </span>
        <button class="btn whiteBtn fr" @click="deleteStaffDialog()">删除员工</button>
        <button class="btn whiteBtn fr" @click="resetPasswordDialog()">重置密码</button>
        <!-- <button class="btn whiteBtn fr" >更改部门</button> -->
        <search-input v-model.trim="searchKey" placeholderValue="搜索员工姓名/手机号">
          <span slot="btn" class="search_btn" @click="searchAccount()" @keyup.enter.native="searchAccount()"></span>
        </search-input>

      </div>
      <div class="splitBar"></div>
    </div>
  </div>
  <!-- 员工列表 -->
  <div class="row" v-if="getAllAccountJson.length > 0">
    <div class="panel" style="border-top-left-radius: 0;border-top-right-radius: 0; padding:0 13px 20px;margin-top: 0;">
      <!-- 列表 Start -->
      <el-row >
        <el-col :span="8" class="" v-for="(account, index) in getAllAccountJson" :key="index">
          <div class="staff-grid-content bg-purple">
              <div class="grid_checkbox">
                <el-checkbox-group v-model="checkedStaffs" @change="handleCheckedStaffsChange">
                  <el-checkbox :label="account.id" :key="index" class="checkbox16">{{nonetext}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="grid_content">
                <div class="stf_content">
                  <span class="stf_pic">
                    <img :src="account.url" alt="" width="88" height="132"/>
                  </span>
                  <span class="stf_info">
                    <span class="stf_name">
                      <router-link :to="{ name: 'staffDetails', params: { staffId: account.id }}"><span>{{account.staffName}}</span></router-link>
                      <span v-if="account.gender == 0"><img src="../../assets/images/hs/female.png"  alt="" /></span>
                      <span v-else><img src="../../assets/images/hs/male.png"  alt="" /></span>
                    </span>
                    
                    <div class="stf_department">{{account.depName}}</div>
                    <div class="stf_p stf_phone">{{account.phone}}</div>
                    <div class="stf_p stf_area">{{account.areaName}}</div>
                    <div class="stf_p stf_liftnum">{{account.mngTotal}} </div>
                  </span>
                  <span class="stf_active activeFree">
                    <i></i>空闲
                  </span>
                </div>
                
              </div>
              <div class="stf_status">
                <el-switch
                  v-model="account.enable"
                  active-color="#E2E6E8"
                  inactive-color="#E3E7E9"
                  :active-value="true"
                  :inactive-value="false"
                  :width=28
                  @change='changeStatus($event,account)'
                >
                </el-switch>
              </div>
            
          </div>
        </el-col>
      </el-row>
      <!-- 列表 End -->
      
      <!-- 分页 Start -->
      <div class="pagination_block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1,9, 20, 30]"
          :page-size="queryParam.limit"
          :current-page="queryParam.offset"
          layout="prev, pager, next, sizes, jumper"
          :total="totalPageSize">
        </el-pagination>
      </div>
      <!-- 分页 End -->
    </div>
  </div>
  <div class="row" v-if="getAllAccountJson.length == 0">
    <div class="panel" style="border-top-left-radius: 0;border-top-right-radius: 0; padding:0 13px 20px;margin-top: 0;">
      <div class="noData">暂无查询数据</div>
    </div>
  </div>
  <!-- 员工列表 end-->
  <!-- 添加账号  弹窗  Start -->
  <el-dialog width="662px" title="添加账号" :visible.sync="add_dialogFormVisible">
    <el-form :model="addAccountForm" :label-width="formLabelWidth">
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="addAccountForm.account" auto-complete="off" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="addAccountForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
       -->
    
      <el-form-item label="角色：" prop="roleName" >
        <el-select v-model="addAccountForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in rolesJson"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer"  class="dialog-footer tac">
      <el-button @click="add_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="confirmAddAccount()" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!--添加账号  弹窗 End -->

  <!-- 编辑账号  弹窗  Start -->
  <el-dialog  width="662px" title="编辑账号" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
    <div class="showName">{{ EditAccountForm.name }}</div>
    <el-form :model="EditAccountForm" :label-width="formLabelWidth">
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="EditAccountForm.account" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="EditAccountForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
      
      <!-- <el-form-item label="手机号：" prop="phoneNumber">
        <el-input v-model="EditAccountForm.phoneNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属单位id：" prop="ownerUnitId" >
        <el-select v-model="EditAccountForm.ownerUnitId" placeholder="请选择角色所属单位id">
          <el-option v-for="enterprise in allEnterprise_Json" :key="enterprise.unitName" :label="enterprise.unitName" :value="enterprise.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="角色：" prop="roleName">
        <!-- <el-input v-model="addRoleForm.ownerUnitId" auto-complete="off"></el-input> -->
        <!-- <el-select v-model="edit_roleNameArr" multiple placeholder="请选择账户角色"  @change="changeSelect">
          <el-option v-for="role in rolesJson" :key="role.name" :label="role.name" :value="role.name"></el-option>
        </el-select> -->
        <el-select v-model="bindRoleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in rolesJson"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!-- 编辑账号 弹窗 End -->

  <!-- 重置密码员工 弹窗 -->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="dialogReset">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/xym/dia-warn.png" alt="">
        </div>
        <div class="dia-con-p">
          <h4>是否确认重置以下员工密码</h4>
          <p>重置密码后不可复原，请谨慎操作</p>
        </div>
      </div>
      <ul class="dia-ul clearfix">
        <li :class="checkedStaffs.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedStaffsName" :key="i">{{item}}</li>
      </ul>
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="dialogReset=false">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="resetPassword">确认</div>
      </div>
    </div>
  </el-dialog>
  <!-- 重置密码员工 弹窗 end-->
  <!-- 删除电梯 弹窗-->
  <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="dialogDelete">
    <div class="dialog-delete">
      <div class="dia-heading">
        <div class="dia-con-pic">
          <img src="../../assets/images/xym/dia-warn.png" alt="">
        </div>
        <div class="dia-con-p">
          <h4>是否确认删除以下员工</h4>
          <p>删除后不可复原，请谨慎操作</p>
        </div>
      </div>
      <ul class="dia-ul clearfix">
        <li :class="checkedStaffs.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedStaffsName" :key="i">{{item}}</li>
      </ul>
      <div class="diaN-btn-con clearfix">
        <div class="diaN-btn diaN-btn-cancel" @click="dialogDelete=false">取消</div>
        <div class="diaN-btn diaN-btn-red" @click="deleteStaff">确认</div>
      </div>
    </div>
  </el-dialog>
  <!-- 删除电梯 弹窗 end-->

  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import CityChoose from '../../components/CityChoose2'
import moment from 'moment';
import newArea from "../../utils/newArea";

export default {
  data() {
    return {
      // regionOptions: [],
      form: {
        city : '',
        area : '',
        minarea : '',
        selectedOptions: ["44","4403"],//地区筛选数组
      },
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      add_dialogFormVisible:false,
      addAccountForm: {
        account: '',
        password: '111',
        corpId: window.localStorage.getItem('corpId'),
        accountType: "1",
        userType: "staff",
        roleId:''
      },
      edit_dialogFormVisible: false,
      EditAccountForm: {
        id: "",
        name: "",
        account: "",
        password: '123456',
        roleName : "",
        roleCode : "222",
        status : 1,
      },
      query:'',
      searchKey:'',
      act_index:'0',
      totalPageSize:0, // 总页数
      queryParam:{
        offset:0,
        limit:9,
        column: "create_time",
        order: false,
        corpId:window.localStorage.getItem('corpId'),
        accountStatus:"-1",// 账号状态
        worksStatus: "-1", // 作业状态
        phone: "",
        staffName: "",
        areaCode: "",
        depId: "", // 部门ID
      },
      getAllAccountJson: [],
      roleQueryParam:{
        limit:10,
        offset:1,
        column: "create_time",
        order: true,
        corpId:window.localStorage.getItem('corpId'),
        queryStr: ""
      },
      periods: [
        { label: '全部', value: "-1" },
        { label: '空闲', value: "0" },
        { label: '作业中', value: "1" },
      ],
      period: "-1",
      periods1: [
        { label: '全部', value: "-1" },
        { label: '正常', value: "1" },
        { label: '停用', value: "0" },
      ],
      period1: "-1",
      bindRoleForm:{
        accountId:"",
        roleId:""
      },
      checkAll: false,
      checkedStaffs: [],
      checkedStaffsName:[],
      isIndeterminate: false,
      checkedAllStaff:[],
      selectedDpt:'',
      departments:[{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      nonetext:'',
      getAllDepJson:[],
      queryDepartParam:{
        offset:1,
        limit:10,
        column: "create_time",
        order: false,
        queryStr: "",
        corpId:window.localStorage.getItem('corpId'),
        depName:'',
        areaCode:''
      },
      selectArea:[],
      dialogDelete: false,
      dialogReset: false,
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
    'city-choose': CityChoose,
  },
  watch:{
    // 账号状态筛选
    period1(val) {
      if(val != '-1'){
        this.searchKey = this.queryParam.staffName = this.queryParam.phone = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.queryParam.accountStatus = val
      this.getAllAccountData()
    }
  },
  mounted() {
    // console.log("111111111111111::" + moment("20121031", "YYYYMMDD").fromNow())
    // this.getAllRoleData()
    this.regionOptions = newArea.newAreaOption()

    // 所有员工列表
    this.getAllAccountData()
    // 所有部门列表
    this.getAllDepartmentData()
  },
  methods: {
    moment,
    // 根据部门筛选
    depSelectChange() {
      if(this.queryParam.depId !== '') {
        this.searchKey = this.queryParam.staffName = this.queryParam.phone = '' // 筛选时清空搜索
      }
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0

      this.getAllAccountData()
    },
    // 查询所有部门
    getAllDepartmentData(){
      api.accountApi.getDepartments(this.queryDepartParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllDepJson = res.data.data.records
          // this.totalPageSize = res.data.data.total

        } else {
          this.getAllDepJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
    // 区域筛选
    selectCity(cityArr, cnName) {
      // this.queryParam.accountStatus = "1"
      // this.queryParam.worksStatus = "1"
      // this.searchKey = this.queryParam.staffName = this.queryParam.phone = '' // 筛选时清空搜索
      this.queryParam.areaCode = cityArr[cityArr.length-1]
      console.log(cnName)
      // 筛选时默认跳到第一页
      this.queryParam.offset = 0
      this.getAllAccountData()
    },
    // 切换地区选择器
    // handleChange(value){
    //   console.log("11111:::"+ value)
     
    //   if (!this.form.area) {
    //     this.form.area = "深圳市";
    //   }

    // },
    // 全选，非全选
    handleCheckAllChange(val) {
      this.checkedStaffs = val ? this.checkedAllStaff : [];
      this.isIndeterminate = false;
      // console.log("check:" + this.checkedStaffs)
    },
    // 点击多选框
    handleCheckedStaffsChange(value) {
      // console.log("check:" + value)
      // console.log("Allcheckop:==" + this.checkedAllStaff)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.getAllAccountJson.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.getAllAccountJson.length;
    },
    // 查询所有员工账户
    getAllAccountData(){
      api.accountApi.getStaffs(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          this.getAllAccountJson.forEach(item =>{
            
            if(item.avatar && item.avatar != '' && item.avatar != null){
              // var url = "http://192.168.100.7:8080/domino/view/image?filename=" + item.avatar
              var url = api.accountApi.viewPic(item.avatar)

              Vue.set(item, 'url', url)
            }
            if(item.manageArea && item.manageArea != '' && item.manageArea != null){
              var areaName = newArea.getAreaName(item.manageArea).join('   ')
              Vue.set(item, 'areaName', areaName)
            }
            

          })
          this.totalPageSize = res.data.data.total

          // 重置多选
          this.checkedAllStaff = []
          this.checkedStaffs = []
          this.checkAll = false
          this.isIndeterminate = false
          // console.log("this.getAllAccountJson==" + JSON.stringify(this.getAllAccountJson))
          this.getAllAccountJson.forEach(item => {
            this.checkedAllStaff.push(item.id)
          })

        } else {
          this.getAllAccountJson = []
          this.checkedAllStaff = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
     
    },
     // 重置密码对话框
    resetPasswordDialog () {
      if (this.checkedStaffs.length === 0) {
        return this.$message.error('请勾选需要重置密码的员工');
      } else {
        this.checkedStaffsName = []
        this.checkedStaffs.forEach(item =>{
          var obj = this.getAllAccountJson.filter(function(value) {
            return value.id == item;
          })
          this.checkedStaffsName.push(obj[0].staffName)
        })
      }
      this.dialogReset = true
    },
    // 重置密码
    resetPassword(index, row){
      // this.$confirm('是否重置密码?（重置后的密码为666666）', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'error'
      // }).then(() => {
        var checkIds = this.checkedStaffs.join(',')
        // console.log("checkIds===" + checkIds)
        api.accountApi.resetPsd({"ids":checkIds,"corpId":window.localStorage.getItem('corpId')}).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('重置密码成功！');
            this.getAllAccountData()
            this.dialogReset = false
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

      // }).catch(() => {
      //   this.$message.info("取消重置密码");            
      // });
    },
   
    // 编辑账号
    editAccount(index, row){
      this.EditAccountForm.id = row.id
      this.EditAccountForm.account = row.account

      this.bindRoleForm.accountId = row.id
      this.bindRoleForm.roleId = ""
      if(row.roleId){
        this.bindRoleForm.roleId = row.roleId
      }
      // this.EditAccountForm.phoneNumber = row.phoneNumber
      // this.edit_roleNameArr = row.roleName.split(',')
      this.edit_dialogFormVisible = true
    },

    // 确认修改
    confirmEdit(){
      // 修改账号名
      api.accountApi.editAccount(this.EditAccountForm).then((res) => {
        
        if (res.data.code === 200) {
          // 修改角色
          api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('修改成功！');
              this.getAllAccountData()
              this.edit_dialogFormVisible = false
            }
          }).catch((res) => {
            this.$message.error(res.data.message);
          })
          
        }else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
      
    },
    // 删除电梯对话框
    deleteStaffDialog () {
      if (this.checkedStaffs.length === 0) {
        return this.$message.error('请勾选需要删除的员工。员工删除后无法复原，请谨慎操作');
      } else {
        this.checkedStaffsName = []
        this.checkedStaffs.forEach(item =>{
          var obj = this.getAllAccountJson.filter(function(value) {
            return value.id == item;
          })
          this.checkedStaffsName.push(obj[0].staffName)
        })
      }
      this.dialogDelete = true
    },
    // 删除员工账号
    deleteStaff(index, row){
      // console.log('删除选中电梯', this.checkedLifts)
      // if (this.checkedStaffs.length === 0) {
      //   return this.$message.error('请勾选需要删除的员工。员工删除后无法复原，请谨慎操作');
      // } else {
      //   this.$confirm('此操作将永久删除该员工账号, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'error'
      //   }).then(() => {
          for(var i = 0 ; i < this.checkedStaffs.length; i++){
            api.accountApi.deleteStaff(this.checkedStaffs[i]).then((res) => {
              if (res.data.code === 200) {
                this.$message.success('删除成功！');
                this.getAllAccountData()
                this.dialogDelete = false
              } else {
                this.$message.error(res.data.message);
              }
            }).catch((res) => {
              this.$message.error(res.data.message);
            })
          }
      //   }).catch(() => {
      //     this.$message.info("取消删除");            
      //   });
      // }
      
    },
  
    // 改变账号状态
    changeStatus(event,account){
      // console.log('event==' + event)
      // console.log('row==' + JSON.stringify(account))
     
      api.accountApi.enableStaff({"userId":account.id,"enable":event}).then((res) => {
        

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
    
    // 查询所有角色
    getAllRoleData(){
      api.roleApi.getRoles(this.roleQueryParam).then((res) => {
        if (res.data.code === 200) {
          this.rolesJson = res.data.data.records
          // this.periods = [{ label: '全部', value: "-1" }]
          
          
          // this.rolesJson.forEach((item) =>{
          //   var roleType = { label: "", value: "" }
          //   roleType.label = item.name
          //   roleType.value = item.id
          //   this.periods.push(roleType)
          // })
        }
      }).catch((res) => {
        
      })
    },

    // 确认添加账号
    confirmAddAccount() {
      console.log('submit!');
      api.accountApi.createAccount(this.addAccountForm).then((res) => {
        this.adding = false
        
        if (res.data.code === 200) {
          // 修改角色
          // this.bindRoleForm.userId = 
          // api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {
          //   if (res.data.code === 200) {
          this.$message.success('创建成功！');
          this.getAllAccountData()
          this.add_dialogFormVisible = false
             
          //   }
          // }).catch((res) => {
          //   this.$message.error(res.data.message);
          // })
          
        } else {
          this.$message.error(res.data.message);
          
        }
        // this.resetAdd()
      }).catch((res) => {
        // this.handleError(res)
        // this.adding = false
      })
    },

    // 搜索真实姓名/手机号
    searchAccount(){
      // 筛选置空
      this.period = "-1"// 账号状态
      this.period1 = "-1" // 作业状态
      this.selectArea = []
      this.queryParam.areaCode = "" // 区域
      this.queryParam.depId = "" // 部门ID

      this.queryParam.staffName = this.searchKey
      this.queryParam.phone = this.searchKey
    
      this.getAllAccountData()
    }

  },
}
</script>

<style lang="stylus">
// 工具类
@import '../../assets/stylus/utilities'

#staff
  a
    text-decoration: none;
    &:hover
      text-decoration: none;
  .staff-grid-content 
    min-height: 36px;
    padding 15px
    border-radius 8px;
    border: 1px solid #E8E8E8;
    vertical-align middle
    margin 12px
    clear both
    clearfix()
    min-width: 350px
  .grid_checkbox
    float:left
    width:30px;
    height 132px;
    padding-top: 55px;
  .grid_content
    margin-left:30px;
    border-bottom: 1px solid #E9E9E9;
    position relative
  .stf_content
    padding-bottom 13px
  .stf_pic
    border: 1px solid #E8E8E8;
    width:88px
    height 132px
    display inline-block
    margin-right 15px
  .stf_info
    height 132px
    display inline-block
    vertical-align: top;
    width: calc(100% - 119px);
  .stf_name
    font-size: 20px;
    color: #34414C;
    line-height 1
    &:hover
      text-decoration: none!important;

  .stf_department
    color: #7E8A95;
    margin 5px 0 15px 0
  .stf_p
    text-indent 20px
    color: #34414C;
    margin: 4px 0;
  .stf_phone
    background url('../../assets/images/hs/phone.png') no-repeat left center;
    
  .stf_area
    background url('../../assets/images/hs/area.png') no-repeat left center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    
  .stf_liftnum
    background url('../../assets/images/hs/liftnum.png') no-repeat left center;
   
  .stf_status
    text-align: center
    margin 13px 0 0 0
  .stf_active
    color: #4BCC8F;
    font-size: 14px;
    absolute top 1px right 0
    i 
      border: 1px solid rgba(75,204,143,0.30);
      border-radius: 50%;
      size 10px
      display: inline-block
      position relative
      margin-right: 4px;
      &:before
        content: ''
        background: #4BCC8F;
        border-radius: 50%;
        size 6px
        display:inline-block
        absolute top 1px left 1px
  .activeFree
    color: #9FB9F7;
    i 
      border: 1px solid rgba(159,185,247,0.30);
      &:before
        content: ''
        background: #9FB9F7;

  .regionPicker .el-cascader__label, .regionPicker .el-input__inner
    padding: 0!important
  .llct-area
    float left;
    width 120px;
    height 30px;
    .el-cascader__label, .el-input__inner
      padding-left:0!important
      border: none!important;

</style>
