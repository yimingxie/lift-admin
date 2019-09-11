<template>
<div class="main-wrap" id="role_api">
  <div class="row" >
    <div class="panel">
      <!-- <el-tag><router-link to='/manager_api'>权限接口</router-link></el-tag> -->
      <el-tag><router-link to='/moduleApi'>模块功能集合</router-link></el-tag>
      <el-tag><router-link to='/roleApi'>为指定公司创建角色</router-link></el-tag>
      <!-- <el-tag><router-link to='/actApi'>创建维保管理员的账户</router-link></el-tag> -->
      <el-tag><router-link to='/corpApi'>创建企业公司</router-link></el-tag>
      <h1 class="tac">为指定公司创建角色</h1>
      <el-form ref="form" :model="sizeForm" :label-width="formLabelWidth" class="demo-ruleForm">
        <el-form-item label="角色名称">
          <el-input v-model="sizeForm.name"></el-input>
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
        
        <!-- <el-form-item label="角色职责描述">
          <el-input v-model="sizeForm.description"></el-input>
        </el-form-item> -->
       
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
        <el-table-column prop="name" label="角色名称">
        </el-table-column>

        <el-table-column prop="corpName" label="所属公司id">
        </el-table-column>
        <!-- <el-table-column prop="description" label="角色职责描述">
        </el-table-column> -->
        <!-- <el-table-column label="绑定模块">
          <template slot-scope="scope">
            <div v-for="(api,index) in (scope.row.jsonArr)" :key="index">{{api}}</div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="userType" label="用户类型:管理员,员工">
        </el-table-column> -->
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 1.在封装好的组件上使用，所以要加上.native才能click
            2.prevent就相当于..event.preventDefault() -->
            <el-button @click.native.prevent="editRole(scope.$index, scope.row)" type="text">编辑
            </el-button>
            <el-button  style="color: #E9645D;" @click.native.prevent="deleteRole(scope.$index, scope.row)" type="text">删除
            </el-button>
            <el-button  style="color: #E9645D;" @click.native.prevent="bindM(scope.$index, scope.row)" type="text">绑定模块
            </el-button>
          </template>
        </el-table-column>
      </el-table>
       &nbsp;
      </div>
    </div>
  </div>
   <!-- 编辑角色  弹窗  Start -->
  <el-dialog  width="662px" title="编辑角色" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
    <el-form :model="EditAccountForm" label-width="110px">
      <el-form-item label="新的角色名称" prop="rename">
        <el-input v-model="EditAccountForm.rename" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司id" prop="corpId">
        <el-input v-model="EditAccountForm.corpId" auto-complete="off" disabled></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button>
      <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
    </div>
  </el-dialog>
  <!-- 编辑账号 弹窗 End -->
  <!-- 绑定模块  弹窗  Start -->
  <el-dialog  width="662px" title="绑定模块" :visible.sync="bind_dialog" custom-class="addAccount">
    <el-form :model="bindForm" label-width="70px">
      <el-form-item label="角色id" prop="id">
        <el-input v-model="bindForm.roleId" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="corpid" prop="id">
        <el-input v-model="bindFormCorpId" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="权限集合" prop="corpId">
        <!-- <el-input v-model="bindForm.func" auto-complete="off" clearable></el-input> -->
        <el-transfer :titles="['未绑定模块','已绑定模块']" v-model="value" :data="getAllModulesJson" :props="{key: 'name'}" @change="transferChange"></el-transfer>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click="confirmBindM" class="dialogSure">确 认</el-button>
      <el-button @click="bind_dialog = false" class="dialogCancel">取 消</el-button>
    </div>
  </el-dialog>
  <!-- 绑定模块 弹窗 End -->
</div>
</template>

<script>
  import api from '../../api'
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
        formLabelWidth: '100px',
        sizeForm: {
          
          corpId: '',
          name: "测试",
          description: "测试",
          // template:{}
        },
        adding:true,
        queryParam:{
          limit:100,
          offset:1,
          column: "create_time",
          order: true,
          corpId:'',
          queryStr: ""
        },
        queryModulesParam:{
          limit:100,
          offset:1,
          column: "create_time",
          order: false,
          corpId:"",
          queryStr: ""
        },
        EditAccountForm:{
          roleId:"",
          corpId:"",
          rename:"",
        },
        edit_dialog:false,
        bind_dialog:false,
        bindForm:{
          // id:"",
          // corpId:"",
          // func:[]
          roleId:"",
          moduleIds:""
        },
        bindFormCorpId:"",
        getAllModulesJson:[],
        value:[],
        getCorpsJson:[],
        corpQueryParam:{
          limit:100,
          offset:1,
          column: "id",
          order: true,
          queryStr: ""
        },
      }
    },
    created() {
      
    },
    mounted() {
      this.getCorps()
      this.getRoles()
      
    },
    methods: {
      onRadioChange(aaa){
        console.log("aaa===" + aaa)
        this.queryParam.corpId = aaa
        this.getRoles()
      },
      getCorps(){
        api.corpApi.getCorps(this.corpQueryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'success'){
            this.getCorpsJson = res.data.data.records
          } else {
            this.getCorpsJson = []
          }
          // console.log("res.data.code" + res.data.data.records)
        }).catch((res) => {
          
        })
      },
      // 查询角色下已绑定的模块
      getbindModules(id){
        var _this = this
        _this.value = []
        api.roleApi.roleGetmodule(id).then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((item) => {
              _this.value.push(item.name)
            })
            // this.value = res
            // alert(1)
            // this.getModules()
            // this.bind_dialogFormVisible = false
          }
        }).catch((res) => {
          
        })
      },
      // 删除角色
      deleteRole(index, row) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          api.roleApi.deleteRole(row.id).then((res) => {
            if(res.data.message === 'success'){
              // 消息提示
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getRoles()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      transferChange(value){
        // console.log("xxxxxxxx" + this.bindForm.func)
        
      },
      getModules(){
        this.getAllModulesJson = []
        api.moduleApi.getModules(this.queryModulesParam).then((res) => {
          this.adding = false
          // if (res..code === 200) {
          this.getAllModulesJson = res.data.data.records
           
        }).catch((res) => {
          
        })
      },
      // 绑定模块
      bindM(index, row){
        this.bind_dialog = true
        this.bindForm.roleId = row.id
        this.bindFormCorpId = row.corpId
        this.queryModulesParam.corpId = row.corpId

        // 查询公司下所拥有的模块
        this.getModules()
        this.getbindModules(row.id)
        // this.bindForm.func = this.getAllModulesJson
        // this.value = row.jsonArr
        // api.roleApi.bind(this.bindForm).then((res) => {
        //   this.adding = false
        //   console.log("res.data.code" + res.data.code)
        //   if (res.data.code === 200) {
        //     this.$message.success('创建成功！');
        //     this.getRoles()
        //   } else {
            
        //     this.$message.error(res.data.message);
        //   }
        // }).catch((res) => {
          
        // })
      },
      // 确认绑定
      confirmBindM(){
        // this.bindForm.func = []
        // for(var i = 0 ; i < this.value.length; i++ ){
          
        //   this.getAllModulesJson.forEach(element => {
           
            
        //       if(this.value[i] === element.name){
        //         var bindMList = {
        //           name: element.name,
        //           permissons: []
        //         }
                
        //         var webView = JSON.parse(element.webView)
        //         console.log("elementwebView==" + webView.length)
        //         for(var j = 0; j < webView.length; j++ ){
        //           bindMList.permissons.push(webView[j].code)
                  
        //         }
        //         console.log("element==" + element)
        //         this.bindForm.func.push(bindMList)
        //       }
            
        //   });
          
        // }
        // console.log("this.bindForm.func==" + JSON.stringify(this.bindForm.func))
        // console.log("value---" + this.value)
        var _this = this
        var arrModule = []
        // this.getAllApiJson.forEach
        // console.log("aaa" + _this.value.length)
        this.getAllModulesJson.forEach((item) => {
        // 如果没有传递 prop，就直接比对，否则拿下级的 prop 属性比对
          for(var i = 0 ;i<_this.value.length ;i++){
            if(item.name === _this.value[i]){
              arrModule.push(item.id)
            }
            
          }
        })
        this.bindForm.moduleIds = arrModule.join(',')

        api.roleApi.bind(this.bindForm).then((res) => {
          this.adding = false
          if (res.data.code === 200) {
            this.$message.success('绑定成功！');
            this.getRoles()
            this.bind_dialog = false
          } else {
            
            this.$message.error(res.data.message);
          }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
      },
      onSubmit() {
        console.log('submit!');
        api.roleApi.createRole(this.sizeForm).then((res) => {
          this.adding = false
          if (res.data.code === 200) {
            this.$message.success('创建成功！');
            this.getRoles()
          } else {
            
            this.$message.error(res.data.message);
          }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
      },
      getRoles() {
        api.roleApi.getRoles(this.queryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'success'){
            this.getAllAccountJson = res.data.data.records
          } else {
            this.getAllAccountJson = []
          }
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
            
          // }

        }).catch((res) => {
          
        })
      },
      

      // 编辑账号
      editRole(index, row){
        this.EditAccountForm.roleId = row.id
        this.EditAccountForm.corpId = row.corpId
        this.EditAccountForm.rename = row.name
        
        // this.EditAccountForm.phoneNumber = row.phoneNumber
        // this.edit_roleNameArr = row.roleName.split(',')
        this.edit_dialogFormVisible = true
      },
      // 确认修改
      confirmEdit(){
        api.roleApi.editRole(this.EditAccountForm).then((res) => {
            
          if (res.data.code === 200) {
            this.$message.success('修改成功！');
            this.getRoles()
            this.edit_dialogFormVisible = false
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((res) => {
          
        })
        
      }
    }
  }
</script>
<style lang="stylus">
#role_api
  .demo-ruleForm
    width: 660px;

</style>