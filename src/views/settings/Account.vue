<template>
<div class="main-wrap" id="account">
  <div class="row" >

    <div class="panel">
      <div class="title"><div class="label1">账号管理</div></div>
      <div class="subSelect">
        
        <radio-group :items="periods" :value.sync="period">
          <span slot="label">角色类型：</span>
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
        <button class="btn blueBtn" @click="add_dialogFormVisible = true">添加账号</button>
        <router-link :to="{ name: 'role', params: { aaa: 123 }}"><button class="btn whiteBtn" >角色管理</button></router-link>
        <!-- <div class="search1" :class="{inputActive:act_index==='1'}">
          <input class="search_input" @focus="act_index='1'" @blur="act_index='0'" placeholder="电梯名称/注册代码" v-model.trim="searchKey" @input="searchEvent" ref="searchInput" autocomplete="off" autocapitalize="off" autocorrect="off"/>
          <span class="search_btn"></span>
        </div> -->
        <search-input v-model.trim="searchKey" placeholderValue="搜索真实姓名/手机号">
          <span slot="btn" class="search_btn" @click="searchAccount()" @keyup.enter.native="searchAccount()"></span>
        </search-input>
        

      </div>
      <!-- <search-box v-model="query" :active="searching" placeholder="11111" @cancel="getDevices(true)" @search-activate="toggleSearching" @search-deactivate="toggleSearching" @search="handleSearch" @press-enter="getDevices(true)"> -->
      <!-- <search-box v-model="query" placeholder="11111" >
        <button slot="search-button" @click="getDevices(true)" class="btn btn-primary">qq</button>
      </search-box>
      {{query}} -->
      <div class="splitBar"></div>
      
      
    
      <!-- 表格 Start -->
      <div style="position:relative;;display:flex;">
        &nbsp;
        <el-table :data="getAllAccountJson" style="margin-top:30px">
          <el-table-column prop="account" label="登录账号（手机号）">
          </el-table-column>
      
          <el-table-column prop="name" label="真实姓名">
          </el-table-column>
          
          <el-table-column  label="角色类型">
            <template slot-scope="scope">
              <span v-html="scope.row.roleName"></span>
            </template>
          </el-table-column>
          <!-- <el-table-column  label="账号状态">
            <template slot-scope="scope">
              <span v-html="scope.row.status"></span>
              <el-switch
                v-model="scope.row.status"
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
          </el-table-column> -->
          <el-table-column  label="账号状态" align="center">
            <template slot-scope="scope" >
              <el-switch
                v-model="scope.row.enable"
                active-color="#E2E6E8"
                inactive-color="#E3E7E9"
                :active-value="1"
                :inactive-value="0"
              
                :width=28
                
                @change='changeStatus($event,scope.$index,scope.row)'
                >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <!-- 1.在封装好的组件上使用，所以要加上.native才能click
              2.prevent就相当于..event.preventDefault() -->
              <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">编辑
              </el-button>
              <el-button  style="color: #E9645D;" @click.native.prevent="deleteAccount(scope.$index, scope.row)" type="text">删除
              </el-button>
              <el-button @click.native.prevent="resetPassword(scope.$index, scope.row)" type="text">重置登录密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        &nbsp;
      </div>
      <!-- 表格 End -->
      
      <!-- 分页 Start -->
      <div class="pagination_block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryParam.offset"
          :page-sizes="[10, 20, 30]"
          :page-size="queryParam.limit"
          layout="prev, pager, next, sizes, jumper"
          :total="totalPageSize">
        </el-pagination>
      </div>
      <!-- 分页 End -->

    </div>
    
  </div>

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
  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
// import SearchBox from '../../components/SearchBox'
import fotter from "../../views/common/fotter";

export default {
  data() {
    return {
      rolesJson:[],
      // roleNameArr:[],
      edit_roleNameArr:[],
      formLabelWidth: '86px',
      add_dialogFormVisible:false,
      addAccountForm: {
        account: '',
        password: '111',
        corpId: window.localStorage.getItem('corpId'),
        // accountType: "1",
        userType: 1, //维保创建自己的账号 类型为0；通用创建维保管理员 类型为1；通用创建通用为2
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
      queryTypeOptions: [
        { label: 'MAC', value: 'mac' },
        { label: '设备ID', value: 'id' }
      ],
      queryType: {
        label: 'MAC',
        value: 'mac'
      },
      act_index:'0',
      // currentPage: 1, // 当前页
      // pageSize:10, // 每页几条
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
      ],
      period:"-1",
      periods1: [
        { label: '全部', value: 1 },
        { label: '开启', value: 7 },
        { label: '停用', value: 30 },
      ],
      period1:1,
      bindRoleForm:{
        accountId:"",
        roleId:""
      },
    }
  },
  components: {
    'radio-group': RadioGroup,
    'search-input': SearchInput,
    'fotter': fotter,
    // 'search-box': SearchBox,
  },
  mounted() {
    // this.queryParam.corpId = window.localStorage.getItem('corpId')
    this.getAllRoleData()
    this.getAllAccountData()
    // this.getAllRoleData()
  },
  methods: {
    // 查询所有账户
    getAllAccountData(){
      api.accountApi.getAccounts(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          this.totalPageSize = res.data.data.total
          // for(var i = 0; i < this.getAllAccountJson.length; i++){
            
          //   // console.log("aaaaaaaaaaaaa===" + this.rolesJson.length)
          //   for(var j =0 ;j < this.rolesJson.length;j++){
          //     // jsonArr[j] = this.rolesJson[j].name;
          //     if(this.getAllAccountJson[i].roleId === this.rolesJson[j].id){
          //       // console.log("1111===" + JSON.stringify(this.getAllAccountJson))
          //       this.$set(this.getAllAccountJson[i],'roleName',this.rolesJson[j].name)
          //     }
          //   }
          // }
          

        } else {
          this.getAllAccountJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      // api.log.getAllAccount(this.currentPage,this.pageSize).then((res) => {
        //   if(res.data.success){
            
        //     this.getAllAccountJson = res.data.result.records
        //     this.totalPageSize = res.data.result.total
        //     // 遍历所有账户，查询其角色
        //     this.getAllAccountJson.forEach((item) => {

        //       // console.log('iddddddddddddddddddddd=======' + item.id)
        //       // this.rolesJson.forEach((item2) => {
        //           // console.log('rolesJson=======' + this.rolesJson)

        //         var roleNames = ''
        //         var roleIds = []
        //         api.log.getAccount_Role(item.id).then((res1) => {
        //           if(res1.data.result){
        //             for(var i = 0; i<res1.data.result.length ; i++){
        //               roleNames = res1.data.result[i].name + " </br> " + roleNames
        //               roleIds.push(res1.data.result[i].id)
        //             }
        //           }
                  
        //           Vue.set(item, 'roleName', roleNames)
        //           Vue.set(item, 'roleIds', roleIds)
        //         })
                
        //       // })
        //     })
        //   }
        // }).catch((res) => {
        
      // })
    },
    // 重置密码
    resetPassword(index, row){
      this.$confirm('是否重置密码?（重置后的密码为666666）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        api.accountApi.resetAccount({"id":row.id}).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('重置密码成功！');
            this.getAllAccountData()
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

      }).catch(() => {
        this.$message.info("取消重置密码");            
      });
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

    // 删除账号
    deleteAccount(index, row){
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        api.accountApi.deleteAccount(row.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('删除成功！');
            this.getAllAccountData()
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

      }).catch(() => {
        this.$message.info("取消删除");            
      });
      
    },
  
    // 改变账号状态
    changeStatus(event,index,row){
      // console.log('event==' + event)
      // console.log('index==' + index)
      // console.log('row==' + JSON.stringify(row))
      api.accountApi.enableAccount({"accountId":row.id, "status":event}).then((res) => {
        
        // console.log("res.data.code" + res.data.data.records[0])

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
          this.periods = [{ label: '全部', value: "-1" }]
          
          
          this.rolesJson.forEach((item) =>{
            var roleType = { label: "", value: "" }
            roleType.label = item.name
            roleType.value = item.id
            this.periods.push(roleType)
          })
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
      this.queryParam.queryStr = this.searchKey
      this.getAllAccountData()
    }

  },
}
</script>

<style lang="stylus">
#account
  .showName
    font-size: 30px;
    color: #34414C;
    text-align: center;
    line-height 42px
    padding 0 0 30px 0
</style>
