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
    
	</div>

	<!-- //content -->
</div>

</template>

<script>
  import api from '../../api'

  import { globalMixins } from '../../utils/mixins'

  export default {
    name: 'LoginForm',

    mixins: [globalMixins],

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
      return {
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

