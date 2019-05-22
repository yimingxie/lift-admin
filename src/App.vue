<template>
  <div id="page-container">
    
    
    <!-- Start: 菜单栏 -->
    <!-- <transition name="sidebar1" mode="out-in">
      <el-menu
        v-if="layout==='admin'"
        default-active="/admin"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#3e5dbd"
        text-color="#ddd"
        active-text-color="yellow"
        :router="true">

        <template v-for="navMenu in roleConfig">

          只有一级菜单
          <el-menu-item 
            v-if="!navMenu.children"
            :index="navMenu.redirect" 
            :key="navMenu.id" 
            :data="navMenu" 
          > 

            <i class="el-icon-location"></i>
            <span slot="title">{{navMenu.name}}</span> 
          </el-menu-item> 

          
          此菜单下还有子菜单
          <el-submenu 
            v-if="navMenu.children" 
            index="1" 
            :key="navMenu.children.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ navMenu.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(subMenu,index) in navMenu.children" 
            :key="index" :index="subMenu.path">{{ subMenu.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


        </template>


      </el-menu>
    </transition> -->
    <!-- End: 菜单栏 -->


    <div class="ant-layout ant-layout-has-sider">

      <!-- Start: 菜单栏 -->
      

      <el-menu v-if="layout==='admin'" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>

      <!-- End: 菜单栏 -->

      
      
      <div class="ant-layout">
        <!-- Start: 头部 -->
        <transition name="header" mode="out-in">
          <header class="header the-header" v-if="layout==='admin'">
            <el-radio-group v-model="isCollapse" style="position:absolute;z-index: 999;" v-if="layout==='admin'">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <a class="logo"></a>
            
            <div @mouseover="isShowUserNav = true" @mouseout="isShowUserNav = false" class="user-navigation">
              <span class="user-name">
                <router-link to='/account'><i class="headPic"> </i><span style="margin:0 30px 0 74px"></span></router-link>
                <a href="#" @click.prevent="openComfirmModal" class="quit"></a>
              </span>
            </div>
          </header>
        </transition>
        <!-- End: 头部 -->

        <!-- Start: 路由视图 -->
        <router-view ></router-view>
        <!-- End: 路由视图 -->
      </div>
      
    </div>
    
  </div>
</template>

<script>
  // import { globalMixins } from './utils/mixins'
  import { mapState, mapGetters, mapActions  } from 'vuex'
  import _ from 'lodash'
  // import fotter from "./views/common/fotter";
  export default {
    name: 'App',

    // mixins: [globalMixins],

    data () {
      return {
        title:'电梯行业监管战情室',
        showMenu: true,
        roleConfig: [],
        defRoleConfig:[],
        isCollapse: true
      }
    },
    components: {
      // 'fotter1': fotter,
    },
    computed: {
      
      ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         layout: state => state.system.layout, //注意这些与上面的区别就是state.footerStatus,
      })
    },
    watch:{
      $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
        console.log('to----' + to)
        if(to.name=='Login'){
          this.$store.commit('SWITCH_LAYOUT', 'auth') 
          console.log('layout====' + this.layout)
        }else{
          this.$store.commit('SWITCH_LAYOUT', 'admin')
          console.log('layout====' + this.layout)
        }
      },
      layout () {
        console.log('this.layout---' + this.layout)
        if (this.layout === 'admin') {
          // this.getCurrentMember(window.localStorage.getItem('memberId'), this)
          // // console.log('currentMember22222===' + JSON.stringify(this.currentMember))
          // this.getProducts()
          // // this.getPlugins()

          // 重新获取用户的权限信息
          var configString = window.localStorage.getItem('_role_')
          // console.log('this.roleConfig====' + this.roleConfig)
          if (configString && configString.length > 16) {
            var jsonContent = JSON.parse(configString)
            if (jsonContent) {
              // alert(111)
              this.roleConfig = _.cloneDeep(jsonContent)
            } else {
              this.roleConfig = _.cloneDeep(this.defRoleConfig)
            }
          } else {
            window.localStorage.setItem('_role_', JSON.stringify(this.defRoleConfig))
            this.roleConfig = _.cloneDeep(this.defRoleConfig)
          }
          console.log('123roleConfig=====' + JSON.stringify(this.roleConfig))
        }
      }
  },
        
    created(){
      console.log('layout++++' + this.$store.getters.isShow)
      this.roleConfig = window.localStorage.getItem('_role_')
    },
    mounted () {
      this.roleConfig = window.localStorage.getItem('_role_')
      // if (this.$route.meta.title == '登录') {
      //   this.showMenu = false
      // } else {
      //   this.showMenu = true
      // }
    },

    methods: {
      
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      quit(){
        this.$router.push('/')
      },

    }
  }
</script>

<style lang="stylus">
// 配置
@import 'assets/stylus/base'
// -------------------------------------------------------
.el-menu
  box-shadow: 2px 0 6px 0 rgba(43,108,239,0.10);
  z-index 99
.el-menu--collapse {
  flex: 0 0 80px;
  max-width: 80px;
  min-width: 80px;
  width: 80px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  flex: 0 0 256px;
  max-width: 256px;
  min-width: 256px;
  width: 256px;
}
// -------------------------------------------------------
#page-container
  width: 100%;
  height: 100%;
  // .el-menu-vertical-demo
  //   width: 200px;
  //   absolute top 60px left 0 bottom 0;
  //   box-sizing: border-box;
  //   overflow-y auto
  // 头部

  .the-header
    size 100% 60px
    background white
    -webkit-box-shadow: 0 1px 4px 0 rgba(81,108,100,0.25);
    box-shadow: 0 1px 4px 0 rgba(81,108,100,0.25);
    position relative
    z-index: 99;
  // 头部淡入淡出
  .header-enter-active, .header-leave-active
    transition transform 0.2s, opacity 0.2s

  .header-enter
  .header-leave-to
    opacity 0
    transform translate3d(0, -10px, 0)
  // 侧栏淡入淡出
  .sidebar1-enter-active, .sidebar1-leave-active
    transition transform .1s, opacity .1s

  .sidebar1-enter
  .sidebar1-leave-to
    opacity 0
    transform translate3d(-10px, 0, 0)
  // 视图淡入淡出
  .view-enter-active, .view-leave-active
    transition transform .3s ease-in-out, opacity .3s ease-in-out

  .view-enter
  .view-leave-to
    opacity 0
    transform translate3d(10px, 0, 0)

  .ant-layout {
    box-sizing: border-box;
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #F1F5F7;
    min-height: calc(100vh);
    position: relative;
  }
  .ant-layout.ant-layout-has-sider {
    flex-direction: row;
  }


</style>

