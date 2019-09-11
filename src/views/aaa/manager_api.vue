<template>
<div class="main-wrap" id="manager_api">
  <div class="row" >
    <div class="panel">
      
      <!-- <el-tag><router-link to='/manager_api'>权限接口</router-link></el-tag> -->
      <el-tag><router-link to='/moduleApi'>模块功能集合</router-link></el-tag>
      <el-tag><router-link to='/roleApi'>为指定公司创建角色</router-link></el-tag>
      <!-- <el-tag><router-link to='/actApi'>创建维保管理员的账户</router-link></el-tag> -->
      <el-tag><router-link to='/corpApi'>创建企业公司</router-link></el-tag>
      <h1 class="tac">创建需要管理的权限接口信息</h1>
      <el-form ref="form" :model="sizeForm" :label-width="formLabelWidth" class="demo-ruleForm">
        <el-form-item label="名称 唯一">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="code码 唯一">
          <el-input v-model="sizeForm.code"></el-input>
        </el-form-item>
        <el-form-item label="访问url 唯一">
          <el-input v-model="sizeForm.url"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="sizeForm.description"></el-input>
        </el-form-item>
        <!-- <el-form-item label="版本">
          <el-input v-model="sizeForm.version"></el-input>
        </el-form-item> -->
        
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div style="position:relative;;display:flex;">
        &nbsp;
          <!-- 表格 -->
          <el-table :data="getAllApiJson" style="margin-top:30px">
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="code" label="code码">
            </el-table-column>

            <el-table-column prop="url" label="访问url">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
            <!-- <el-table-column prop="version" label="版本">
            </el-table-column> -->
            
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                2.prevent就相当于..event.preventDefault() -->
                <!-- <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">编辑
                </el-button> -->
                <el-button  style="color: #E9645D;" @click.native.prevent="deleteAccount(scope.$index, scope.row)" type="text">删除
                </el-button>
                
              </template>
            </el-table-column>
          </el-table>
        &nbsp;
      </div>
    </div>
  </div>
 
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
        getAllApiJson:[],
        formLabelWidth: '100px',
        sizeForm: {
          name:'',
          code:"",
          url:"/111",
          description:"测试",
          // version:"1.0.0"
        },
        adding:true,
        queryParam:{
          offset: 1,
          limit: 100,
          column: "create_time",
          order: false,
          queryStr: ""
        },
        EditAccountForm:{
          id:"",
          account:"",
        },
      }
    },
    created() {
      
    },
    mounted() {
      this.getApis()
    },
    methods: {
      // 每页条数变化
      handleSizeChange(val) {
        this.queryParam.limit = val
        // console.log(`每页 ${val} 条`);
        this.getApis()
      },

      // 当前页变化
      handleCurrentChange(val) {
        this.queryParam.offset = val
        // console.log(`当前页: ${val}`);
        this.getApis()
      },
      // 创建api接口
      onSubmit() {
        console.log('submit!');
        api.managerApi.createApi(this.sizeForm).then((res) => {
          this.adding = false
          if (res.data.code === 200) {
            this.$message.success('创建成功！');
            this.getApis()
          } else {
            this.$message.error(res.data.message);
          }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
      },
      getApis(){
        api.managerApi.getApis(this.queryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'success'){
            this.getAllApiJson = res.data.data.records
          } else {
            this.getAllApiJson = []
          }
          // console.log("res.data.code" + res.data.data.records[0])
        }).catch((res) => {
          
        })
      },
      // 删除账号
      deleteAccount(index, row) {
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
        
          api.managerApi.deleteApi(row.id).then((res) => {
            
            if(res.data.code === 200){
              this.$message.success('删除成功！');
              this.getApis()
            }
          }).catch(() => {
            this.$message.error(res.data.message);       
          });

        }).catch(() => {
          this.$message.info("取消删除");            
        });
        
      },


    }
  }
</script>
<style lang="stylus">
#manager_api
  .demo-ruleForm
    width: 660px;

</style>