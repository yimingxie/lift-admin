<template>
<div class="main-wrap" id="permission">
  <div class="row" >
    <el-row >
      <el-col :span="8" class="" v-for="(role, index) in rolesJson" :key="index">
        <div class="role-grid-content bg-purple panel">
          <div class="role_index" >角色{{order[index]}}</div>
          <div class="role_content">
            <div class="role_name_left">
              <div class="role_name">{{role.name}}</div>
              <div class="role_status">状态：锁定</div>
            </div>
            <div class="operate">
              <a class="per_link"  @click.prevent="lookPermission(role)">权限</a>
              <span class="splitLine">|</span>
              <a class="edit_link " @click.prevent="editRole(role)">编辑</a>
            </div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="8" class="">
        <div class="role-grid-content bg-purple panel">
          <div class="role_index" >角色一</div>
          <div class="role_content">
            <div class="role_name_left">
              <div class="role_name">维保主管</div>
              <div class="role_status">状态：锁定</div>
            </div>
            <div class="operate">
              <a class="per_link">权限</a>
              <span class="splitLine">|</span>
              <a class="edit_link" >编辑</a>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="">
        <div class="role-grid-content bg-purple panel">
          <div class="role_index" >角色一</div>
          <div class="role_content">
            <div class="role_name_left">
              <div class="role_name">维保主管</div>
              <div class="role_status">状态：锁定</div>
            </div>
            <div class="operate">
              <a class="per_link">权限</a>
              <span class="splitLine">|</span>
              <a class="edit_link">编辑</a>
            </div>
          </div>
        </div>
      </el-col> -->

    </el-row>
  </div>

  <!-- 编辑名称  弹窗  Start -->
  <el-dialog width="662px" title="编辑名称" :visible.sync="edit_dialogFormVisible">
    <el-form :model="EditRoleForm" :label-width="formLabelWidth" @submit.native.prevent>
      <el-form-item label="角色名称：" prop="account">
        <!-- <el-input v-model="EditAccountForm.account" auto-complete="off" clearable></el-input> -->
        <el-input  auto-complete="off" v-model="EditRoleForm.rename" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button>

    </div>
  </el-dialog>
  <!-- 编辑名称 弹窗 End -->

  <!-- 查看权限  弹窗  Start -->
  <el-dialog width="662px" :title="'查看权限-' + lookRoleName" :visible.sync="look_dialogFormVisible">
    <el-collapse v-model="activeNames" @change="handleChange">
      <div style="padding:0 58px">
      <el-collapse-item v-if="bindModules.length > 0" v-for="(item, index) in bindModules" :key="index"  :name="item.id">
        <template slot="title">
          <i v-if="item.name.indexOf('地图') !== -1" class='icon-info icon-map'></i>
          <i v-else-if="item.name.indexOf('数字电梯') !== -1" class='icon-info icon-lift'></i>
          <i v-else-if="item.name.indexOf('诊断') !== -1" class='icon-info icon-diagnosis'></i>
          <i v-else-if="item.name.indexOf('任务') !== -1" class='icon-info icon-task'></i>
          <i v-else-if="item.name.indexOf('经营') !== -1" class='icon-info icon-business'></i>
          <i v-else-if="item.name.indexOf('设置') !== -1" class='icon-info icon-setting'></i>
          <i v-else class='icon-info icon-setting'></i>
          <span class="moduleName">{{item.name}}</span>
        </template>
        <div style="padding-left:33px">
        <span v-for="api in item.bindApi" :key="api" class="apiSpan">{{api}}</span>
        </div>
      </el-collapse-item>
      <div v-if="bindModules === undefined" class="tac">暂无权限</div>
      </div>
    </el-collapse>

    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click=" look_dialogFormVisible= false" class="dialogSure">确 认</el-button>
    </div>
  </el-dialog>
  <!-- 查看权限 弹窗 End -->
  <!-- <fotter></fotter> -->
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import fotter from "../../views/common/fotter";
export default {
  data() {
    return {
      edit_dialogFormVisible:false,
      formLabelWidth: '86px',
      aaa:'',
      EditRoleForm:{
        roleId:"",
        corpId: window.localStorage.getItem('corpId'),
        rename:"",
      },
      roleQueryParam:{
        limit:100,
        offset:1,
        column: "create_time",
        order: true,
        corpId: window.localStorage.getItem('corpId'),
        queryStr: ""
      },
      rolesJson:[],
      order:['一','二','三','四','五','六','七','八','九','十','十一','十二'],
      look_dialogFormVisible:false,
      lookRoleId:'',
      lookRoleName:'',
      bindModules:[],
      activeNames: []
    }
  },
  components: {
    'fotter': fotter
  },
  mounted() {
    this.getAllRoleData()
    
  },
  methods: {
    // 查询所有角色
    getAllRoleData(){
      api.roleApi.getRoles(this.roleQueryParam).then((res) => {
        
        this.rolesJson = res.data.data.records

        // console.log("aaaaaaaaaaaaa===" + JSON.stringify(this.rolesJson))
       
      }).catch((res) => {
        
      })
    },
    // 编辑角色名称
    editRole(role){
      this.EditRoleForm.rename = role.name
      this.EditRoleForm.roleId = role.id
      this.edit_dialogFormVisible = true
    },
    // 确认修改
    confirmEdit(){
      api.roleApi.editRole(this.EditRoleForm).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('修改成功！');
          this.getAllRoleData()
          this.edit_dialogFormVisible = false
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
      
    },
    // 查看权限
    lookPermission(role){
      this.look_dialogFormVisible = true
      this.lookRoleId = role.id
      this.lookRoleName = role.name
      // console.log("this.lookRoleName=="+ this.lookRoleName)
      this.getbindModules(role.id)
      this.activeNames=[]
    },
    // 查询角色下已绑定的模块
    getbindModules(id){
      var _this = this
      _this.value = []
      api.roleApi.roleGetmodule(id).then((res) => {
        if (res.data.code === 200) {
          this.bindModules = res.data.data
          // res.data.data.forEach((item) => {
          //   _this.value.push(item.name)
          // })
          // this.value = res
          // alert(1)
          // this.getModules()
          // this.bind_dialogFormVisible = false
        }
      }).catch((res) => {
        
      })
    },
    // 切换collapse
    handleChange(val) {
      console.log(val);
      val.forEach(element => {
        this.getbindApis(element)
      });
    },
    // 查询模块下已绑定的接口
    getbindApis(id){
      var _this = this
      var bindApi = ['暂无权限']
      var obj = []
      api.moduleApi.moduleGetApis(id).then((res) => {
        if (res.data.code === 200 && res.data.message === 'ok') {
          var apis = res.data.data
          // alert("apis.length" + apis.length)
          if(apis.length > 0){
            bindApi = []
            for(var i = 0; i < apis.length; i++){
              bindApi.push(apis[i].name)
            }
          } 
        }
        obj=this.bindModules.find(function (obj) {
          return obj.id === id
        })
        Vue.set(obj,'bindApi',bindApi)
        // console.log("this.bindModules==" + JSON.stringify(obj))
      }).catch((res) => {
        
      })
    },
  },
 
}
</script>

<style lang="stylus">
// 工具类
@import '../../assets/stylus/utilities'
#permission
  // .bg-purple
  //   background: #d3dce6;
    
  .role-grid-content 
    min-height: 36px;
    padding 0
    border-radius 8px
    vertical-align middle
    margin-bottom 10px
    clear both
    clearfix()
  .role_index
    padding 16px 23px
    border-bottom: 1px solid #D8DDDF;
    font-size: 16px;
    color: #34414C;
    line-height: 24px;
  .role_content
    padding 22px 23px
    clearfix()
  .role_name_left
    float left
    .role_name
      font-size: 20px;
      line-height 33px
      color: #34414C;
    .role_status
      font-size: 14px;
      color: #7E8A95;
  .operate
    float right
    margin-top: 17px;
    .per_link
      color: #FFA90B;
    .edit_link
      color #4272FF
    .splitLine
      margin: 0 10px;
  .icon-info
    width 16px 
    height 16px
    margin-right 16px
  .icon-map
    background url('../../assets/images/hs/submenuIcon/map3.png') no-repeat center;
  .icon-lift
    background url('../../assets/images/hs/submenuIcon/lift3.png') no-repeat center;
  .icon-diagnosis
    background url('../../assets/images/hs/submenuIcon/zhen3.png') no-repeat center;
  .icon-task
    background url('../../assets/images/hs/submenuIcon/task3.png') no-repeat center;
  .icon-business
    background url('../../assets/images/hs/submenuIcon/table3.png') no-repeat center;
  .icon-setting
    background url('../../assets/images/hs/submenuIcon/set3.png') no-repeat center;
  .moduleName
    font-size: 16px;
    color: #34414C;
  .apiSpan
    width 30%
    height 30px
    display inline-block
    font-size: 14px;
    color: #34414C;
    line-height: 22px;
</style>
