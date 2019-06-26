<template>
<div class="main-wrap" id="role_api">
  <div class="row" >
    <div class="panel">
      <el-tag><router-link to='/manager_api'>权限接口</router-link></el-tag>
      <el-tag><router-link to='/moduleApi'>模块功能集合</router-link></el-tag>
      <el-tag><router-link to='/roleApi'>为指定公司创建角色</router-link></el-tag>
      <el-tag><router-link to='/actApi'>创建维保管理员的账户</router-link></el-tag>
      <el-tag><router-link to='/corpApi'>创建企业公司</router-link></el-tag>
      <h1 class="tac">模块功能集合</h1>
      <el-form ref="form" :model="sizeForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="模块名称">
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
        
        <!-- <el-form-item label="描述">
          <el-input v-model="sizeForm.description"></el-input>

        </el-form-item> -->
       <!-- <el-form-item label="权限集合JSON数组">
          <el-checkbox-group v-model="selectedArray" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(api,index) in getAllApiJson" :label="api" :key="index">{{api.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

      
      <el-divider>数据列表</el-divider>
      <el-radio-group v-model="mParam.corpId" @change="onRadioChange"> 
        <el-radio v-for="cop in getCorpsJson" :key="cop.id"  :label="cop.id">{{cop.name}}</el-radio>
      </el-radio-group>

      <div style="position:relative;;display:flex;">
        &nbsp;
      <!-- 表格 -->
      <el-table :data="getAllModulesJson" style="margin-top:30px">
        <!-- <el-table-column prop="id" label="模块名称11">
        </el-table-column> -->
        <el-table-column prop="name" label="模块名称">
        </el-table-column>

        <el-table-column prop="corpName" label="所属公司id">
        </el-table-column>
        
        <!-- <el-table-column prop="description" label="描述">
        </el-table-column> -->
       
        <!-- <el-table-column  label="权限集合" prop="jsonArr">
          <template slot-scope="scope">
            <div v-for="(api,index) in (scope.row.jsonArr)" :key="index">{{api}}</div>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="bindPermission(scope.$index, scope.row)" type="text">绑定接口
            </el-button>
            <el-button @click.native.prevent="editModule(scope.$index, scope.row)" type="text">编辑
            </el-button>
            <el-button  style="color: #E9645D;" @click.native.prevent="deleteModule(scope.$index, scope.row)" type="text">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
        &nbsp;
      </div>
    </div>
  </div>
  <!-- 编辑模块  弹窗  Start -->
  <el-dialog  width="662px" title="编辑模块" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
    <el-form :model="EditAccountForm" label-width="70px">
      <el-form-item label="id" prop="id">
        <el-input v-model="EditAccountForm.id" auto-complete="off" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="公司id" prop="corpId">
        <el-input v-model="EditAccountForm.corpId" auto-complete="off" disabled></el-input>
      </el-form-item> -->
      <el-form-item label="模块名称" prop="name">
        <el-input v-model="EditAccountForm.rename" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="EditAccountForm.description" auto-complete="off" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="权限集合" prop="rename">

        <el-transfer :titles="['未选权限','已选权限']" v-model="value" :data="getAllApiJson" :props="{key: 'name'}" @change="transferChange"></el-transfer>
      </el-form-item> -->
   
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click="confirmEdit" class="dialogSure">确 认</el-button>
      <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
    </div>
  </el-dialog>
  <!-- 编辑账号 弹窗 End -->

  <!-- 绑定接口  弹窗  Start -->
  <el-dialog  width="662px" title="绑定接口" :visible.sync="bind_dialogFormVisible" custom-class="addAccount">
    <el-form :model="bindApi" label-width="70px">
      
      <el-form-item label="权限集合" prop="apiIds">

        <el-transfer :titles="['未选权限','已选权限']" v-model="value" :data="getAllApiJson" :props="{key: 'name'}" @change="transferChange"></el-transfer>
      </el-form-item>
   
    </el-form>
    <div slot="footer" class="dialog-footer tac">
      <el-button type="primary" @click="confirmBind" class="dialogSure">确 认</el-button>
      <el-button @click="bind_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
    </div>
  </el-dialog>
  <!-- 绑定接口 弹窗 End -->

</div>
</template>

<script>
  import api from '../../api'
  import Vue from 'vue'
  let pcas = require("../../utils/citySelector/pcas-code.json")
  export default {
    name: 'Settings',

    layout: 'admin',

    components: {
    },

    data () {
      // const generateData = _ => {
      //   const data = [];
      //   for (let i = 1; i <= 15; i++) {
      //     data.push({
      //       key: i,
      //       label: `备选项 ${ i }`,
      //       disabled: i % 4 === 0
      //     });
      //   }
      //   return data;
      // };
      return {
        edit_dialogFormVisible:false,
        getAllAccountJson:[],
        formLabelWidth: '80px',
        sizeForm: {
          corpId: '',
          name: "测试",
          description: "测试",
          // webView:[]
        },
        adding:true,
        queryParam:{ // api
          offset: 1,
          limit: 100,
          column: "id",
          order: true,
          queryStr: ""
        },
        EditAccountForm:{
          id:"",
          rename:"",
          // name:"",
          // webView:[],
          description:"",
        },
        getAllApiJson:[],
        selectedArray:[],
        getAllModulesJson:[],
        aaa:'',
        transferData: [],
        value: [],
        mParam:{ //module
          limit:100,
          offset:1,
          order:false,
          column:"create_time",
          corpId:window.localStorage.getItem('corpId'),
          // corpId:"ab191d31a80c8ae45850fedb1c2b03e6",
          // corpId:"5d472e26790ea0fe6e3077aa4b1565b6",
          queryStr:"",
        },
        bindApi: {
          moduleId:"",
          apiIds:''
        },
        bind_dialogFormVisible:false,
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
      
      this.getApis()
      
      this.getCorps()
      this.getModules()
      // this.getRoles()
    },
    methods: {
      onRadioChange(aaa){
        console.log("aa==" + this.mParam.corpId)
        this.getModules()
      },
      getCorps(){
        api.corpApi.getCorps(this.corpQueryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'ok'){
            this.getCorpsJson = res.data.data.records

          } else {
            this.getCorpsJson = []
          }
          // console.log("res.data.code" + res.data.data.records)
        }).catch((res) => {
          
        })
      },
      transferChange(value,dic,array){
        
      },
      bindPermission(index, row){
        this.bindApi.moduleId = row.id
        this.getbindApis(row.id)
        this.bind_dialogFormVisible = true

      },
      // 查询模块下已绑定的接口
      getbindApis(id){
        var _this = this
        _this.value = []
        api.moduleApi.moduleGetApis(id).then((res) => {
          if (res.data.code === 200 && res.data.message === 'ok') {
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
      // 确认绑定
      confirmBind(){
        console.log("value---" + this.value)
        var _this = this
        var arrApi = []
        // this.getAllApiJson.forEach
        this.getAllApiJson.forEach((item) => {
        // 如果没有传递 prop，就直接比对，否则拿下级的 prop 属性比对
          for(var i = 0 ;i<_this.value.length ;i++){
            if(item.name === _this.value[i]){
              arrApi.push(item.id)
            }
            
          }
        })
        this.bindApi.apiIds = arrApi.join(',')
        console.log("11111===" + this.bindApi.apiIds)

        api.moduleApi.bindApi(this.bindApi).then((res) => {
          if (res.data.code === 200) {
            this.getModules()
            this.bind_dialogFormVisible = false
          }
        }).catch((res) => {
          
        })
      },
      deleteModule(index, row){
        this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          api.moduleApi.deleteModule(row.id).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('删除成功！');
              this.getModules()
            }
          }).catch((res) => {
            this.$message.error(res.data.message);
          })

        }).catch(() => {
          this.$message.info("取消删除");            
        });
        
        
      },
      getModules(){
        api.moduleApi.getModules(this.mParam).then((res) => {
          this.adding = false

          // console.log("res.data.code" + res.data.code)
          // if (res..code === 200) {
          if(res.data.code === 200 && res.data.message === 'ok'){
            this.getAllModulesJson = res.data.data.records
            // this.getAllModulesJson
            var _this = this
            // this.getAllModulesJson.forEach((item) => {
            // // 如果没有传递 prop，就直接比对，否则拿下级的 prop 属性比对
            //   for(var i = 0 ;i<_this.getCorpsJson.length ;i++){
            //     if(item.corpId === _this.getCorpsJson[i].id){
            //       Vue.set(item, 'corpName', _this.getCorpsJson[i].name)
            //       console.log(1)
            //     }
            //   }
            // })
          } else {
            this.getAllModulesJson = []
          }
            
            // var jsonArr = [];
            // for(var i = 0; i<this.getAllModulesJson.length; i++){
            //   var webViewList = JSON.parse(this.getAllModulesJson[i].webView)
            //   console.log("1222222222222==" + res.data.data[i].webView)
            //   var str="";
            //   var jsonArr = [];
            //   for(var j =0 ;j < webViewList.length;j++){
            //     jsonArr[j] = webViewList[j].name;
            //   }
            //   console.log("jsonArr==" + jsonArr)
            //   this.$set(this.getAllModulesJson[i],'jsonArr',jsonArr)
            //   console.log("aaaaaaaaaaaaa===" + JSON.stringify(this.getAllModulesJson))
              
            // }
  
        }).catch((res) => {
          
        })
      },
      handleCheckedCitiesChange(value){
        // this.selectedArray = value
        console.log("1111111111---" + JSON.stringify(this.selectedArray))
      },
      getApis(){
        
        api.managerApi.getApis(this.queryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'ok'){
            this.getAllApiJson = res.data.data.records
          } else {
            this.getAllApiJson = []
          }
          
          // console.log("res.data.code" + JSON.stringify(res.data.data.records[0]))
        }).catch((res) => {
          
        })
      },
      onSubmit() {
        // this.sizeForm.webView = []
        // // console.log("1111111111---" + JSON.stringify(this.sizeForm.webView))
        // this.selectedArray.forEach(element => {
        //   var webViewList = {
        //     name: element.name,
        //     code: element.code,
        //   }
        //   this.sizeForm.webView.push(webViewList)
        // });
        // // for( var i = 0;i++;i<this.selectedArray.length){
        // //   var webViewList = {
        // //     name: this.selectedArray[i].description,
        // //     code: this.selectedArray[i].code,
        // //     select: "on"
        // //   }
        // //   this.sizeForm.webView.push(webViewList)
        // // }
        // console.log("1111111111---" + JSON.stringify(this.sizeForm.webView))
        // console.log('submit!');
        api.moduleApi.createModule(this.sizeForm).then((res) => {
          this.adding = false
          console.log("res.data.code" + res.data.code)
          if (res.data.code === 200) {
            this.$message.success('创建成功！');
            this.getModules()
          } else {
            
            this.$message.error(res.data.message);
          }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
      },
      
      

      // 编辑模块
      editModule(index, row){
        console.log("row====" + JSON.stringify(row))
        this.EditAccountForm.id = row.id
        // this.EditAccountForm.corpId = row.corpId
        this.EditAccountForm.rename = row.name
        // this.EditAccountForm.description = row.description
        // this.EditAccountForm.webView = row.webView
        // this.transferData = JSON.parse(row.webView)
        // this.value = row.jsonArr
        // console.log("this.transferData=" + this.transferData.length)
        
        // this.EditAccountForm.phoneNumber = row.phoneNumber
        // this.edit_roleNameArr = row.roleName.split(',')
        this.edit_dialogFormVisible = true
      },
      
      // 确认修改
      confirmEdit(){
        // this.EditAccountForm.webView=[]
        // for(var q = 0 ; q < this.value.length; q++ ){
          
        //   this.getAllApiJson.forEach(element => {
           
            
        //     if(this.value[q] === element.name){
        //       var webViewEditList = {
        //         name: element.name,
        //         code: element.code,
        //       }
        //       console.log("element==" + element)
        //       this.EditAccountForm.webView.push(webViewEditList)
        //     }
            
        //   });
          
        // }
        // console.log("this.EditAccountForm.webView==" + JSON.stringify(this.EditAccountForm.webView))
        api.moduleApi.editModule(this.EditAccountForm).then((res) => {
            
          if (res.data.code === 200) {
            this.$message.success('修改成功！');
            this.getModules()
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