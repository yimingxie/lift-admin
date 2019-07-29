<template>
  
  <div class="main-wrap" id="center">
    <div class="row" >

      <div class="panel">
        <div class="title"><div class="label1">个人中心</div></div>
        <div class="content">
          <div class="left">
            <img src="../../assets/images/hs/header.png"  alt="header" />
            <p class="perName">{{getAccountJson.name}}</p>
            <!-- <span  v-html="scope.row.roleName" ></span> -->
            <!-- <span v-if="scope.row.type == 'administrator'" >超级管理员</span> -->
            <p v-if="getAccountJson.roleName" class="perPosition">{{getAccountJson.roleName}}</p>
            <p v-if="getAccountJson.type == 'administrator'" class="perPosition">超级管理员</p>
          </div>
          <div class="shadow"></div>
          <div class="right">
            <p ><span class="pTitle pTitle1">登录账号</span><span class="pCon">{{getAccountJson.account}}</span></p>
            <p ><span class="pTitle">注册时间</span><span class="pCon">{{getAccountJson.createTime}}</span></p>
            <button class="btn blueBtn editPsd" @click="editPsd('EditAccountForm')" >修改登录密码</button>
          </div>
        </div>

      </div>
      
    </div>
    <!-- 编辑账号  弹窗  Start -->
    <el-dialog  width="662px" title="修改密码" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
      <div class="showName">{{getAccountJson.name}}</div>
      <div class="showPhone">{{getAccountJson.account}}</div>

      <el-form :model="EditAccountForm" :label-width="formLabelWidth" :rules="rules" ref="EditAccountForm">
        <el-form-item label="旧密码：" prop="old">
          <el-input type="password" v-model="EditAccountForm.old" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="salt">
          <el-input type="password" v-model="EditAccountForm.salt" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="again">
          <el-input type="password" v-model="EditAccountForm.again" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer tac">
        <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('EditAccountForm')" class="dialogSure">确 认</el-button>

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
    var validateOld = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.EditAccountForm.again !== '') {
          this.$refs.EditAccountForm.validateField('again');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.EditAccountForm.salt) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      formLabelWidth: '86px',
      edit_dialogFormVisible: false,
      EditAccountForm: {
        old: "",
        salt: "",
        again: ""
      },
      getAccountJson:[],
      rules: {
        salt: [
          { validator: validatePass, trigger: 'blur' }
        ],
        again: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        old: [
          { validator: validateOld, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    'fotter': fotter,
  },
  mounted() {
    this.getAllAccountData()
  },
  methods: {
    // 查询账户详情
    getAllAccountData(){
      api.accountApi.getAccountDetail().then((res) => {

        this.getAccountJson = res.data.data || []
        
      }).catch((res) => {
        
      })
      
    },
    // 修改密码
    editPsd(formName){
      this.EditAccountForm.salt = ""
      this.EditAccountForm.again = ""
      this.EditAccountForm.old = ""
      this.edit_dialogFormVisible = true
      console.log("this.EditAccountForm===" + formName)
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })                
    },
    // 确认修改密码
    confirmEdit(formName) {
      console.log("this.EditAccountForm===" + formName)
      var _this = this
      this.$refs[formName].validate((valid) => {
        
        if (valid) {
          api.accountApi.editPsd(_this.EditAccountForm).then((res) => {
            if(res.data.code == 200){
              _this.$message.success('修改密码成功！');
              _this.edit_dialogFormVisible = false

            } else {
              _this.$message.error(res.data.message);
            }
            
          }).catch((res) => {
            
          })
        }
        else {
          console.log('error submit!!');
          return false;
        }
        
      });

      
    }


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
    background url('../../assets/images/hs/editPsd.png') no-repeat 10px center #4272FF;
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
