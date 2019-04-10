<template>
  <div id="page-container">
    <div id="header">
      {{ $route.meta.title }}
    </div>
    <span class="right_header">
      <!-- <i class="headPic"></i> -->
      <span>版本号V1.6.7.3</span>
      <!-- <i class="split"></i>
      <i class="quit"></i> -->
    </span>
    
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        title:'电梯行业监管战情室'
      }
    },
    mounted () {
      // document.title = this.$route.meta.title
    },

    methods: {
      quit(){
        this.$router.push('/')
      },

    }
  }
</script>

<style lang="stylus">
// 配置
@import 'assets/stylus/base'
@import 'assets/stylus/elementRe'

#page-container{
  width: 100%;
  height: 100%;
  #header{
    size 100% 80px
    line-height 80px
    background: #16161C;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.21);
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0.04px;
    text-align: center;
    fixed top 0
    z-index 999
  }
  .right_header{
    z-index 999
    size 220px 80px 
    font-size 0
    line-height 80px
    text-align right
    line-height 80px
    white-space nowrap
    fixed right 30px top 0
    color #fff
    .headPic{
      vertical-align middle
      size 46px 80px
      display inline-block
      background:url("./assets/images/hs/header.png") no-repeat 0 10px
    }
    span{
      font-size: 14px;
      color: #66667F;
      margin-left 20px
    }
    .split {
      display: inline-block;
      width: 2px;
      height: 30px;
      background-color: #66667F;
      margin 0 33px
      vertical-align -11px
      // position: absolute;
      // top: 19px;
      // left: 447px;
    }
    .quit{
      vertical-align middle
      size 28px
      display inline-block
      background:url("./assets/images/hs/quit.png") no-repeat 
    }
  }
    
}
</style>

