<template>
<div class="main-wrap" id="manager_api">
  <div class="row" >
    <div class="panel">
      
      <el-tag><router-link to='/manager_api'>权限接口</router-link></el-tag>
      <el-tag><router-link to='/moduleApi'>模块功能集合</router-link></el-tag>
      <el-tag><router-link to='/roleApi'>为指定公司创建角色</router-link></el-tag>
      <el-tag><router-link to='/actApi'>创建维保管理员的账户</router-link></el-tag>
      <el-tag><router-link to='/corpApi'>创建企业公司</router-link></el-tag>
      <h1 class="tac">创建企业公司</h1>
      <el-form ref="form" :model="sizeForm" :label-width="formLabelWidth" class="demo-ruleForm">
        <el-form-item label="公司名称">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区编码">
          <el-input v-model="sizeForm.areaCode"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="sizeForm.address"></el-input>
        </el-form-item>
        <el-form-item label="信用代码图片链接">
          <el-input v-model="sizeForm.scUrl"></el-input>
        </el-form-item>
        <el-form-item label="公司信息">
          <el-input v-model="sizeForm.corpInfo"></el-input>
        </el-form-item>
        
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
        <el-table-column prop="areaCode" label="地区编码">
        </el-table-column>

        <el-table-column prop="address" label="详细地址">
        </el-table-column>
        <el-table-column prop="scUrl" label="信用代码图片链接">
        </el-table-column>
        <el-table-column prop="corpInfo" label="公司信息">
        </el-table-column>
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 1.在封装好的组件上使用，所以要加上.native才能click
            2.prevent就相当于..event.preventDefault() -->
            <!-- <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">编辑
            </el-button> -->
            <el-button  style="color: #E9645D;" @click.native.prevent="deleteCorp(scope.$index, scope.row)" type="text">删除
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
        formLabelWidth: '130px',
        sizeForm: {
          name:"",
          areaCode:"",
          address:"",
          scUrl:"",
          corpInfo:"",
        },
        adding:true,
        queryParam:{
          limit: 100,
          offset: 1,
          column: "id",
          order: false,
          queryStr: ""
        },
        EditAccountForm:{
          id:"",
          account:"",
        }
      }
    },
    created() {
      
    },
    mounted() {
      this.getCorps()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        api.corpApi.createCorp(this.sizeForm).then((res) => {
          this.adding = false
          if (res.data.code === 200) {
            this.$message.success('创建成功！');
            this.getCorps()
          } else {
            this.$message.error(res.data.message);
            
          }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
      },
      getCorps(){
        api.corpApi.getCorps(this.queryParam).then((res) => {
          if(res.data.code === 200 && res.data.message === 'ok'){
            this.getAllApiJson = res.data.data.records
          } else {
            this.getAllApiJson = []
          }
        }).catch((res) => {
          
        })
      },
      // 删除账号
      deleteCorp(index, row) {
        this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
        
          api.corpApi.deleteCorp(row.id).then((res) => {
            
            if(res.data.code === 200){
              this.$message.success('删除成功！');
              this.getCorps()
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