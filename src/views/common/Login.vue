<template>
<div id="login">
	<div class="sub-main-w3">
		<form @submit.prevent="onSubmit" autocomplete="off">
			<h2>电梯维保管理后台
				<i class="fas fa-level-down-alt"></i>
			</h2>
			<div class="form-style-agile">
				<label>
					<i class="fas fa-user"></i>
					Username
				</label>
				<input placeholder="请输入用户名" v-model="model.username" name="Name" type="text" required="">
			</div>
			<div class="form-style-agile">
				<label>
					<i class="fas fa-unlock-alt"></i>
					Password
				</label>
				<input placeholder="请输入密码" v-model="model.password" name="Password" type="password" required="">
			</div>
      <div class="form-style-agile">
				<label>
					<i class="fas fa-unlock-alt"></i>
					验证码
				</label>
				<input placeholder="请输入验证码" name="" type="text">
			</div>
			<!-- checkbox -->
			<div class="wthree-text">
				<ul>
				</ul>
			</div>
			<!-- //checkbox -->
			<input type="submit" value="登录" @keyup.enter="onSubmit">
		</form>
    <!-- ////////////////////////////////////////////////////////////////////////// -->
    
	</div>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>
	<!-- //content -->
</div>

</template>

<script>
  import api from '../../api'


  export default {
    name: 'LoginForm',


    // layout: 'auth',

    components: {
      // 'radio-moni-radio': RadioMoniRadio
    },
    computed: {
      // ...mapState({
      //   logining: state => state.system.loading
      // })
    },
    data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        // setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        // }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        logining:false,
        // screenHeight: document.getElementById('app').scrollHeight,
        validation: {},
        model: {
          username: '',
          password: ''
        },
        isLoginSuccess: false,
        rememberPwd: Boolean(this.getCookie('rememberPwd')) || false,
        
      }
    },
    watch: {
     
    },
    mounted () {
      this.$store.commit('SWITCH_LAYOUT', 'auth')
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 注册新用户
      addUser(){
        api.log.addMember(this.addModel).then((res) => {
          // this.adding = false
          // if (res.status === 200) {
          //   this.showNotice({
          //     type: 'success',
          //     content: this.$t('account.add_member_success')
          //   })
          //   this.getMembers()
          // }
          // this.resetAdd()
        }).catch((res) => {
          // this.handleError(res)
          // this.adding = false
        })
        this.dialogFormVisible = false
      },
      onSubmit () {
        api.log.auth(this.model).then((res) => {
          if(res.data.success){
            // 存储token
            window.localStorage.setItem('accessToken', res.data.result.token)
            // 根据用户名获取用户权限,并跳转页面
            this.getUserPerm(this.model.username)
          }
          
          // this.$route.router.go({path: '/statistic/users'})
        }).catch((res) => {
          // this.setLoadingStatus(false)
          console.log('logining:::' + this.logining)
          // this.handleError(res)
          // console.log('aaa:::' + JSON.stringify(res.data))
          // if (typeof res.data !== 'undefined' && typeof res.data.error !== 'undefined') {
          //   switch (res.data.error.code) {
          //     case 4031003:
          //       // this.showNotice({
          //       //   type: 'error',
          //       //   content: locales[Vue.config.lang].errors[res.data.error.code]
          //       // })
          //       this.$router.push('/')
          //       break
          //     default:
          //       this.showWrong = true
          //       // this.showError(res.data.error)
          //   }
          // }
        })
        
      },
      // 根据用户名获取用户权限,并跳转页面
      getUserPerm(username){
        api.log.getUser_pers(username).then((res) => {
          if(res.data.success){
            console.log('---------accountRole=======' + JSON.stringify(res))
            window.localStorage.setItem('_role_', JSON.stringify(res.data.result))
            this.$router.push('/admin')
          }
        }).catch((res) => {
        
        
        })
      },
      // 设置 Cookies
      setCookie (name, value) {
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
      },

      // 读取 Cookies
      getCookie (name) {
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        var arr = document.cookie.match(reg) || {}
        if (arr.length) {
          return unescape(arr[2])
        } else {
          return null
        }
      },

      // 删除 Cookies
      delCookie (name) {
        console.log('name===' + name)
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(name)
        if (cval != null) {
          document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
        }
      },
    }
  }
</script>

<style lang="stylus">
@import '../../assets/stylus/style.css'
#login{
  .sub-main-w3{
    width 600px
    margin 120px auto 0
  }
}
</style>

