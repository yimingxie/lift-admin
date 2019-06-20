<template>
  <section class="main-wrap">
    <div class="main">
      <!-- start-titl11 -->
      <div class="title">
        <div class="label1">{{ $t("nav_aside.auth") }}</div>
        <div class="label2">{{ $t("title_us.auth") }}</div>
      </div>
      <!-- end-titl11 -->
      <div class="panel panel-tab">
          <tab :nav="secondaryNav"></tab>
          <div class="leftbox"> 
            <button class="btn btn-primary"> 添加应用</button> 
          </div>
      </div>
      <transition name="view" mode="out-in">
        <router-view transition="view" transition-mode="out-in" class="view"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
  import Tab from '../../components/Tab'
  // import { globalMixins } from '../../mixins'

  export default {
    name: 'Settings',

    layout: 'admin',

    components: {
      'tab': Tab
    },

    data () {
      return {
        secondaryNav:[{
        label: this.$t('sub_nav.settings.members'),
        link: { path: '/admin/account' }
      }, {
        label: this.$t('sub_nav.settings.auth'),
        link: { path: '/admin/permission' }
      }],
        roleConfig: null
      }
    },
    created() {
      
    },
    // mounted() {
    //  
    // },
    methods: {
   
    }
  }
</script>
<style lang="stylus">
.main-wrap
  .panel-tab 
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    position relative
  .panel_radius
    margin-top: 0!important;
    border-bottom-right-radius: 10px!important;
    border-bottom-left-radius: 10px!important;
    border-top-right-radius: 0!important;
    border-top-left-radius: 0!important;
</style>