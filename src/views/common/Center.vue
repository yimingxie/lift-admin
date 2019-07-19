<template>
  
  <div class="main-wrap" id="center">
    <div class="row" >

      <div class="panel">
        <div class="title"><div class="label1">个人中心</div></div>
        <div class="content">
          <div class="left">
            <img src="../../assets/images/hs/header.png"  alt="header" />
            <p class="perName">彭秀英</p>
            <p class="perPosition">维保经理</p>
          </div>
          <div class="shadow"></div>
          <div class="right">
            <p ><span class="pTitle pTitle1">登录账号</span><span class="pCon">13590876543</span></p>
            <p ><span class="pTitle">注册时间</span><span class="pCon">2019-02-13</span></p>
            <button class="btn blueBtn editPsd" @click="editPsd()" >修改登录密码</button>
          </div>
        </div>

      </div>
      
    </div>
    <!-- 编辑账号  弹窗  Start -->
    <el-dialog  width="662px" title="修改密码" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
      <div class="showName">张卫健</div>
      <div class="showPhone">13590876543</div>
      <el-form :model="EditAccountForm" :label-width="formLabelWidth">
        <el-form-item label="旧密码：" prop="oldPsd">
          <el-input v-model="EditAccountForm.account" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPsd">
          <el-input v-model="EditAccountForm.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="comfirmPsd">
          <el-input v-model="EditAccountForm.name" auto-complete="off" clearable></el-input>
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
import fotter from "../../views/common/fotter";

export default {
  data() {
    return {
      formLabelWidth: '86px',
      edit_dialogFormVisible: false,
      EditAccountForm: {
        id: "",
        oldPsd: "",
        newPsd: "",
        comfirmPsd: ""
      },
    }
  },
  components: {
    'fotter': fotter,
  },
  mounted() {
  },
  methods: {
    // 查询所有账户
    getAllAccountData(){
      api.accountApi.getAccounts(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          this.totalPageSize = res.data.data.total

        } else {
          this.getAllAccountJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
    // 修改密码
    editPsd(index, row){
      // this.EditAccountForm.id = row.id
      // this.EditAccountForm.account = row.account

      // this.bindRoleForm.accountId = row.id
      // this.bindRoleForm.roleId = ""
      // if(row.roleId){
      //   this.bindRoleForm.roleId = row.roleId
      // }
      // this.EditAccountForm.phoneNumber = row.phoneNumber
      // this.edit_roleNameArr = row.roleName.split(',')
      this.edit_dialogFormVisible = true
    },
    


  },
}
</script>

<style lang="stylus">
// 工具类
@import '../../assets/stylus/utilities'
#center
  .content
    height 237px
    margin: 0 -25px -20px -25px;
    background url('../../assets/images/hs/center.png') no-repeat right bottom;
    clearfix()
  .left
    display inline-block
    size 352px 237px
    z-index: 99;
    position: absolute;
    text-align center
    padding 60px 0
  .perName
    font-size: 24px;
    color: #34414C;
    margin 6px 0 3px
  .perPosition
    font-size: 14px;
    color: #7E8A95;
  .shadow
    display inline-block
    size 132px 237px
    background-image: linear-gradient(90deg, #FFFFFF 0%, #FAFAFA 86%, #E7ECF0 100%);
    absolute left 221px
  .right
    margin-left 420px
    padding 54px 0
    height 237px
  .pTitle 
    color: #4272FF;
    background url('../../assets/images/hs/account.png') no-repeat left center;
    text-indent 25px
    width 100px
    line-height 35px
    display inline-block

  .pTitle1
    background url('../../assets/images/hs/time.png') no-repeat left center;
  .editPsd
    background url('../../assets/images/hs/time.png') no-repeat left center #4272FF;
    margin-top 30px
  .showName
    font-size: 24px;
    color: #34414C;
    text-align center
  .showPhone
    font-size: 14px;
    color: #7E8A95;
    text-align center
    margin 6px 0 30px
</style>
