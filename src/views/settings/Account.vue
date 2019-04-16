<template>
  <div class="panel panel_radius">


    <el-table :data="getAllAccountJson">
      <el-table-column prop="username" label="登录账号">
      </el-table-column>
      <el-table-column prop="email" label="真实姓名">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="roleName" label="角色类型">
        <template slot-scope="scope">
          <span v-html="scope.row.roleName"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text">
            编辑
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
export default {
  layout: 'admin',
  data() {
    return {
      currentPage: 1, // 当前页
      pageSize:10, // 每页几条
      totalPageSize:0, // 总页数
      getAllAccountJson: []
    }
  },
  mounted() {
    this.$store.commit('SWITCH_LAYOUT', 'admin')
    this.getAllRoleData()
    this.getAllAccountData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`);
      this.getAllAccountData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`);
      this.getAllAccountData()
    },
    // 查询所有账户
    getAllAccountData(){
      api.log.getAllAccount(this.currentPage,this.pageSize).then((res) => {
        if(res.data.success){
          
          this.getAllAccountJson = res.data.result.records
          this.totalPageSize = res.data.result.total
          // 遍历所有账户，查询其角色
          this.getAllAccountJson.forEach((item) => {

            // console.log('iddddddddddddddddddddd=======' + item.id)
            // this.rolesJson.forEach((item2) => {
                // console.log('rolesJson=======' + this.rolesJson)

              var roleNames = ''
              var roleIds = []
              api.log.getAccount_Role(item.id).then((res1) => {
                if(res1.data.result){
                  for(var i = 0; i<res1.data.result.length ; i++){
                    roleNames = res1.data.result[i].name + " </br> " + roleNames
                    roleIds.push(res1.data.result[i].id)
                  }
                }
                
                Vue.set(item, 'roleName', roleNames)
                Vue.set(item, 'roleIds', roleIds)
              })
              
            // })
          })
        }
      }).catch((res) => {
      
      })
    },
    // 查询所有角色
    getAllRoleData() {
      api.log.getAllRole().then((res) => {
        if(res.data.success){
          // console.log(JSON.stringify(res))
          this.rolesJson = res.data.result.records
          this.addModel.roles = this.rolesJson[0].id
        }
      }).catch((res) => {
      
      })
    },



  },
}
</script>

<style lang="stylus">

</style>
