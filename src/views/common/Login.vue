<template>
<div id="login">
  <div class="makeLoginCenter">
    <div class="loginFormWrap">
      <div class="box">
        <form @submit.prevent="onSubmit" autocomplete="off" class="loginForm">
          <div class="title">
            <h1>Welcome</h1>
            <h2>电梯维保管理后台
            </h2>
          </div> 
          <div>
            <div v-if="warningTip!==''" class="loginInput warningTip tal">{{warningTip}}</div>
            <div class="inputWrap">
              <input v-if="loginForm.type === 0" placeholder="请输入登录账号" v-model="loginForm.account" name="Name" type="text" class="loginInput">
              <input v-if="loginForm.type === 1" placeholder="请输入登录账号（手机号）" v-model="loginForm.account" name="Name" type="text" class="loginInput">
            </div>
            <div class="inputWrap">
              <!-- <label>
                <i class="fas fa-unlock-alt"></i>
                Password
              </label> -->
              <!-- <input placeholder="请输入密码" v-model="model.password" name="Password" type="password" required=""> -->
              <input v-if="loginForm.type === 0" placeholder="请输入密码" v-model="loginForm.password" name="Password" type="password" class="loginInput">
              <input v-if="loginForm.type === 1" placeholder="请输入验证码" v-model="loginForm.password" class="loginInput">
            </div>
            <!-- <div class="inputWrap">
              <label>
                <i class="fas fa-unlock-alt"></i>
                验证码
              </label>
              <input placeholder="请输入验证码" name="" type="text">
            </div> -->
            <!-- checkbox -->
          </div>
          <div class="wthreeText">
            <ul>
              <li v-if="loginForm.type === 0" style="float:left" @click="loginForm.type = 1">账号密码登录
              </li>
              <li v-if="loginForm.type === 1" style="float:left" @click="loginForm.type = 0">验证码登录
              </li>
              <li style="float:right">
                <label>
                  <radio-moni-radio class="radio_input">
                    <input type="checkbox" v-model="rememberPwd" slot='radio_original'/>
                  </radio-moni-radio>
                  记住我
                </label>
              </li>
            </ul>
          </div>
          <!-- //checkbox -->
          <input type="submit" value="登录" @keyup.enter="onSubmit" class="loginBtn">
        </form>
        <!-- .............................................. -->
        <!-- <div> -->
          <img class="loginImg" src="../../assets/images/hs/lift@1x.png"/>
          <!-- <div class="shadow"></div> -->
        <!-- </div> -->
      </div>
    </div>
    
  </div>
  <img class="loginLeft" src="../../assets/images/hs/loginLeft@1x.png"/>
  <img class="loginRight" src="../../assets/images/hs/loginRight@1x.png"/>
  <img class="loginBrand" src="../../assets/images/hs/logo.png"/>
</div>

</template>

<script>
  import api from '../../api'
  import RadioMoniRadio from '../../components/RadioMoniRadio'

  export default {
    name: 'LoginForm',


    // layout: 'auth',

    components: {
      'radio-moni-radio': RadioMoniRadio
    },
    computed: {
      // ...mapState({
      //   logining: state => state.system.loading
      // })
    },
    data () {
      return {
     
        loginForm: {
          account: '',
          password: '',
          type:0
        },
        isLoginSuccess: false,
        rememberPwd: Boolean(this.getCookie('rememberPwd')) || false,
        warningTip:''
      }
    },
    watch: {
     
    },
    mounted () {
      if (this.rememberPwd) {
        this.loginForm.account = this.getCookie('account')
        this.loginForm.password = this.getCookie('password')
      }
    },
    methods: {
      
      onSubmit () {
        
        api.log.login(this.loginForm).then((res) => {
          if(res.data.code === 200){
            
            // 存储token,modules,corpId
            window.localStorage.setItem('accessToken', res.data.data.token)
            window.localStorage.setItem('type', res.data.data.type)
            if(res.data.data.modules){
              window.localStorage.setItem('modules', JSON.stringify(res.data.data.modules))
            }
            if(res.data.data.corpId){
              window.localStorage.setItem('corpId', res.data.data.corpId)
            }
            // 设置记住密码
            // console.log('this.rememberPwd===' + this.rememberPwd)
            if (this.rememberPwd) {
              this.setCookie('rememberPwd', true)
              this.setCookie('account', this.loginForm.account)
              this.setCookie('password', this.loginForm.password)
            } else {
              this.delCookie('rememberPwd')
              this.delCookie('account')
              this.delCookie('password')
            }
            // 获取用户权限,并跳转页面
            // console.log("modules:::" + res.data.data.modules)
            if(res.data.data.type == 'domino'){
              this.$message.success('登录成功！');
              this.$router.push('/corpApi')
            }
            // console.log("res.data.data.modules===" + res.data.data.modules)
            if(res.data.data.type == 'administrator'){
              this.$message.success('登录成功！');
              this.$router.push('/map')
            } else if(res.data.data.modules){
              this.$message.error('暂无权限，请联系管理员');
            }
            
          } else {
            // this.$message.error(res.data.message);
            this.warningTip = res.data.message
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
@import '../../assets/stylus/utilities'
#login
  background #4272FF
  size 100%
  display: flex;
  align-items: center;
  justify-content center
  .loginLeft
    absolute bottom 0 left 0
  .loginRight
    absolute bottom 0 right 0
  .loginBrand
    absolute bottom 40px right 40px
  .title
    font-size: 48px;
    color: #FFFFFF;
    text-align left 
    margin-bottom: 50px;
    h1
      font-size: 48px;
      color: #FFFFFF;
      line-height 67px
      font-weight: 400;

    h2
      font-size: 20px;
      color: #FFFFFF;
      font-weight: 400;
      text-indent: 9px;
  .makeLoginCenter
    vertical-align middle
    // border 1px solid red
    position relative
    overflow: hidden;
    width 75%
  .loginFormWrap
    size 937px 644px
    
    // border-image:-webkit-linear-gradient(left, red 0%, blue 30%, yellow 60%, rgba(0,0,0,0) 90%) 5;
    border-radius: 15px;
    // border: 5px solid;
    box-sizing:  border-box;
    padding: 1px; 
    // border-image:-webkit-linear-gradient(left, red 0%, blue 30%, yellow 60%, rgba(0,0,0,0) 90%,  rgba(0,0,0,0) 100%) 5;
    background-image: -webkit-linear-gradient(90deg, #C3D4FF 0%, rgba(255,255,255,0.00) 98%);
    background-image: linear-gradient(90deg, #C3D4FF 0%, rgba(255,255,255,0.00) 98%);
    .box
      border-radius: 15px;
      size 100%
      background-image: linear-gradient(90deg, #547FFF 0%, #4272FF 98%);
  .loginForm
    padding 116px 0 0 88px
    size 460px 563px
    position relative
    text-align center
    z-index: 99;
  .loginInput
    border: 1px solid rgba(255,255,255,0.45);
    border-radius: 8px;
    size 368px 48px
    padding 0 20px
    box-sizing:  border-box;
    background: rgba(0,0,0,0);
    font-size: 14px;
    color: #fff;
  .loginBtn
    background: #FFFFFF;
    box-shadow: 0 8px 20px -10px rgba(35,69,167,0.60);
    border-radius: 24px;
    size 240px 48px
    font-size: 16px;
    color: #4272FF;
    cursor pointer
    margin-top 60px
    text-align center
    absolute bottom 0 left 153px;
  .inputWrap
    margin-top 22px
  .wthreeText
    font-size: 14px;
    color: #FFFFFF;
    margin-top 25px
    cursor pointer
  .warningTip
    background: url('../../assets/images/hs/warning.png') #E9645D no-repeat 20px center;
    border: 1px solid #C03333;
    border-radius: 8px;
    vertical-align middle
    line-height 46px
    text-indent 20px

  .loginImg
    absolute right 15px top 0
  .shadow
    size 503px 308px
    background: #305cdc;
    -webkit-box-shadow: 4px 4px 20px #305cdc;
    box-shadow: 4px 4px 2px #305cdc;
    transform: rotateY(45deg);
    -ms-transform: rotate(7deg);
    -moz-transform: rotate(7deg);
    -webkit-transform: rotate(120deg);
    -o-transform: rotate(7deg);
    position: absolute;
    top: 259px;
    right: 318px;
    /* z-index: -99; */
@media screen and (max-width: 1920px) {
  #login {
    
    .loginFormWrap{
      margin: 56px 0 58px 96px;
    }
    
  }
}
@media screen and (max-width: 1680px) {
  #login {
    .makeLoginCenter {
      width 85.7%
    }
    .loginFormWrap{
      margin:41px 0 73px 107px;
    }
    .loginImg{
      absolute right 33px top 0
    }
  }
  
}
@media screen and (max-width: 1440px) {
  #login {
    .makeLoginCenter {
      width 100%
    }
    .loginFormWrap{
      margin:58px 0 56px 153px;
    }
    .loginImg{
      absolute right 77px top 0
    }
  }
}
@media screen and (max-width: 1280px) {
  #login {
    
    .loginFormWrap{
      margin:10px 0 10px 53px;
    }
    .loginImg{
      absolute right 7px top -20px
    }
  }
}
</style>


