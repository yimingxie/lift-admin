<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="异常处理" name="first"><exceptionMap></exceptionMap></el-tab-pane>
      <el-tab-pane label="维保作业" name="second">维保作业</el-tab-pane>
    </el-tabs>
    <fotter></fotter>
  </div>
</template>

<script>
  import AMapUI from 'AMapUI'
  import Vue from 'vue'
  import { mapState, mapGetters, mapActions  } from 'vuex'
  import RadioGroup from "../../components/RadioGroup";
  import ExceptionMap from "./exceptionMap2";
  import fotter from "../../views/common/fotter";
  
  export default {
    data() {
      return {
        activeName: 'first',
      
        
      }
    },
    components: {
      'exceptionMap':ExceptionMap,
      'fotter': fotter,
    },
    computed: {
      
    },
    
    methods: {
      handleClick(tab, event) {

        console.log(tab, event);
      },
     
    }
    
  }
</script>
<style lang="stylus">

</style>





