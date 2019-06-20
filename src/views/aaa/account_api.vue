<template>
<div class="main-wrap" id="account_api">
  <div class="row" >
    <div class="panel">
      <el-tag><router-link to='/manager_api'>权限接口</router-link></el-tag>
      <el-tag><router-link to='/moduleApi'>模块功能集合</router-link></el-tag>
      <el-tag><router-link to='/roleApi'>为指定公司创建角色</router-link></el-tag>
      <el-tag><router-link to='/actApi'>创建维保管理员的账户</router-link></el-tag>
      <el-tag><router-link to='/corpApi'>创建企业公司</router-link></el-tag>
      <h1 class="tac">创建维保管理员的账户</h1>
      <el-form ref="form" :model="sizeForm" :label-width="formLabelWidth" class="demo-ruleForm">
        <el-form-item label="用户账号">
          <el-input v-model="sizeForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="sizeForm.password"></el-input>
        </el-form-item>
        <el-form-item label="所属公司id">
          <!-- <el-input v-model="sizeForm.corpId"></el-input> -->
          <el-select v-model="sizeForm.corpId" placeholder="请选择">
            <el-option
              v-for="item in getCorpsJson"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号类型:手机号,邮箱,其他等">
          <el-input v-model="sizeForm.type"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:管理员,员工">
          <el-input v-model="sizeForm.userType"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

      <el-divider>数据列表</el-divider>
      <el-radio-group v-model="queryParam.corpId" @change="onRadioChange"> 
        <el-radio v-for="cop in getCorpsJson" :key="cop.id"  :label="cop.id">{{cop.name}}</el-radio>
      </el-radio-group>

      <div style="position:relative;;display:flex;">
        &nbsp;
      <!-- 表格 -->
      <el-table :data="getAllAccountJson" style="margin-top:30px">
        <el-table-column prop="account" label="登录账号（手机号）">
        </el-table-column>

        <el-table-column prop="corpName" label="所属公司id">
        </el-table-column>
        <!-- <el-table-column prop="type" label="账号类型:手机号,邮箱,其他等">
        </el-table-column>
        <el-table-column prop="userType" label="用户类型:管理员,员工">
        </el-table-column> -->
        <el-table-column  label="账号状态">
          <template slot-scope="scope">
            <span v-html="scope.row.enable"></span>
            <el-switch
              v-model="scope.row.enable"
              active-color="#E2E6E8"
              inactive-color="#E3E7E9"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="停用"
              :width=28
              
              @change='changeStatus($event,scope.$index,scope.row)'
              >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 1.在封装好的组件上使用，所以要加上.native才能click
            2.prevent就相当于..event.preventDefault() -->
            <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">编辑
            </el-button>
            <el-button  style="color: #E9645D;" @click.native.prevent="deleteAccount(scope.$index, scope.row)" type="text">删除
            </el-button>
            <el-button @click.native.prevent="resetPassword(scope.$index, scope.row)" type="text">重置登录密码
            </el-button>
            <el-button @click.native.prevent="bindRole(scope.$index, scope.row)" type="text">绑定角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
        &nbsp;
      </div>
    </div>
  </div>
  <!-- 编辑账号  弹窗  Start -->
  <el-dialog  width="662px" title="编辑账号" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
    <el-form :model="EditAccountForm" label-width="88px">
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="EditAccountForm.account" auto-complete="off" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button>
      <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
    </div>
  </el-dialog>
  <!-- 编辑账号 弹窗 End -->
  <!-- 绑定角色  弹窗  Start -->
  <el-dialog  width="662px" title="绑定角色" :visible.sync="bind_dialogFormVisible" custom-class="addAccount">
    <el-form :model="EditAccountForm" label-width="88px">
      <el-form-item label="账号ID：" prop="userId">
        <el-input v-model="bindRoleForm.userId" auto-complete="off" disabled=""></el-input>
      </el-form-item>
      <el-form-item label="绑定角色：" prop="account">
        <!-- <el-input v-model="bindRoleForm.roleId" auto-complete="off" clearable></el-input> -->
        <el-select v-model="bindRoleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in getAllRoleJson"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click="confirmBind" class="dialogSure">确 认</el-button>
      <el-button @click="bind_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
    </div>
  </el-dialog>
  <!-- 绑定角色 弹窗 End -->
</div>
</template>

<script>
  import api from 'api'
  let pcas = require("../../utils/citySelector/pcas-code.json")
  export default {
    name: 'Settings',

    layout: 'admin',

    components: {
    },

    data () {
      return {
        edit_dialogFormVisible:false,
        getAllAccountJson:[],
        formLabelWidth: '200px',
        sizeForm: {
          account: '',
          password: '',
          corpId: '',
          type: 1,
          userType: 1,
        },
        adding:true,
        queryParam:{
          // pageNo: 1,
          // pageSize: 100,
          limit:1,
          offset:100,
          column: "create_time",
          order: false,
          queryStr: "",
          corpId:window.localStorage.getItem('corpId'),
          // corpId:"ab191d31a80c8ae45850fedb1c2b03e6",
          // corpId:"5d472e26790ea0fe6e3077aa4b1565b6",
        },
        roleQueryParam:{
          limit:1,
          offset:100,
          column: "create_time",
          order: false,
          corpId:"",
          queryStr: ""
        },
        EditAccountForm:{
          id:"",
          account:"",
        },
        bind_dialogFormVisible:false,
        bindRoleForm:{
          userId:"",
          roleId:""
        },
        getAllRoleJson:[],
        getCorpsJson:[],
        corpQueryParam:{
          limit:1,
          offset:100,
          column: "id",
          order: true,
          queryStr: ""
        },
      }
    },
    created() {
      
    },
    mounted() {
      this.getAccounts()
      this.getCorps()
      // // 请求爬虫数据1
      // api.accountApi.createAccount(this.sizeForm).then(res => {
      //   console.log(JSON.stringify(res))
      // })
      // api.accountApi.getData().then(res => {
      //   console.log(JSON.stringify(res))
      // })
    },
    methods: {
      onRadioChange(){
        console.log("aa==" + this.queryParam.corpId)
        this.getAccounts()
      },
      getCorps(){
        api.corpApi.getCorps(this.corpQueryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'ok'){
            this.getCorpsJson = res.data.data.records[0]

          } else {
            this.getCorpsJson = []
          }
          console.log("res.data.code" + res.data.data.records[0])
        }).catch((res) => {
          
        })
      },
      getRoles(){
        api.roleApi.getRoles(this.roleQueryParam).then((res) => {
          
          this.getAllRoleJson = res.data.data.records[0]
          // JSON.parse(this.getAllAccountJson.menuMod)


          // var jsonArr = [];

          // console.log("jsonArr==" + this.getAllAccountJson.length)
          // for(var i = 0; i < this.getAllAccountJson.length; i++){
          //   var menuModList = JSON.parse(this.getAllAccountJson[i].menuMod)
          //   console.log("1222222222222==" + menuModList)
          //   var str="";
          //   var jsonArr = [];
          //   for(var j =0 ;j < menuModList.length;j++){
          //     jsonArr[j] = menuModList[j].name;
          //   }
          //   console.log("jsonArr==" + jsonArr)
          //   this.$set(this.getAllAccountJson[i],'jsonArr',jsonArr)
          //   console.log("aaaaaaaaaaaaa===" + JSON.stringify(this.getAllAccountJson))
            
          // }
          // console.log("res.data.code" + res.data.data.records[0])
        }).catch((res) => {
          
        })
      },
      bindRole(index, row){
        this.bindRoleForm.userId = row.id
        this.roleQueryParam.corpId = row.corpId
        this.bindRoleForm.roleId = ""
        if(row.roleId){
          this.bindRoleForm.roleId = row.roleId
        }
        this.getRoles()
        this.bind_dialogFormVisible = true
      },
      // 确认绑定角色
      confirmBind(){
        api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('绑定角色成功！');
              this.getAccounts()
              this.bind_dialogFormVisible = false
            }
          }).catch((res) => {
            this.$message.error(res.data.message);
          })
      },
      resetPassword(index, row){
        this.$confirm('是否重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          api.accountApi.resetAccount({"id":row.id}).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('重置密码成功！');
              this.getAccounts()
            }
          }).catch((res) => {
            this.$message.error(res.data.message);
          })

        }).catch(() => {
          this.$message.info("取消重置密码");            
        });
      },
      deleteAccount(index, row){
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          api.accountApi.deleteAccount(row.id).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('删除成功！');
              this.getAccounts()
            }
          }).catch((res) => {
            this.$message.error(res.data.message);
          })

        }).catch(() => {
          this.$message.info("取消删除");            
        });
        
      },
      onSubmit() {
        console.log('submit!');
        api.accountApi.createAccount(this.sizeForm).then((res) => {
          this.adding = false
          console.log("res.data.code" + res.data.code)
          if (res.data.code === 200) {
            this.$message({
              message: '创建成功！',
              type: 'success'
            });
            this.getAccounts()
          } else {
            this.$message.error(res.data.message);
            
          }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
      },
      getAccounts(){
        api.accountApi.getAccounts(this.queryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'ok'){
            this.getAllAccountJson = res.data.data.records[0]
          } else {
            this.getAllAccountJson = []
          }
          
          console.log("res.data.code" + res.data.data.records[0])
        }).catch((res) => {
          
        })
      },
      // 改变开关状态
      changeStatus(event,index,row){
        console.log('event==' + event)
        console.log('index==' + index)
        console.log('row==' + JSON.stringify(row))
        // this.getAllAccountJson[index].status = event
        if(event === 0){ // 禁用
          api.accountApi.banAccount({"id":row.id}).then((res) => {
            
            console.log("res.data.code" + res.data.data.records[0])

          }).catch((res) => {
            
          })
        } else {
          api.accountApi.pickAccount({"id":row.id}).then((res) => {
            
            console.log("res.data.code" + res.data.data.records[0])

          }).catch((res) => {
            
          })
        }
        
      },

      // 编辑账号
      editAccount(index, row){
        console.log("row====" + JSON.stringify(row))
        this.EditAccountForm.id = row.id
        this.EditAccountForm.account = row.account
        // this.EditAccountForm.phoneNumber = row.phoneNumber
        // this.edit_roleNameArr = row.roleName.split(',')
        this.edit_dialogFormVisible = true
      },
      // 确认修改
      confirmEdit(){
        api.accountApi.editAccount(this.EditAccountForm).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('修改成功！');
            this.getAccounts()
            this.edit_dialogFormVisible = false
          }else {
            this.$message.error(res.data.message);
          }
        }).catch((res) => {
          
        })
        
      }
    }
  }
</script>
<style lang="stylus">
#account_api
  .demo-ruleForm
    width: 660px;

</style>