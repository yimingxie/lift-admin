<template>
  <div class="search1" :class="{inputActive:act_index==='1'}">
    <input class="search_input" @focus="act_index='1'" @blur="act_index='0'" :placeholder="placeholderValue" v-model="key" @input="searchEvent" ref="searchInput" autocomplete="off" autocapitalize="off" autocorrect="off"/>
    <!-- <span class="search_btn" @click="searchEvent"></span> -->
    <slot name="btn"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
      },
      placeholderValue: {
        type: String,
        default: '搜索电梯注册代码/详细地址'
      }
    },
    data(){
      return{
        act_index:'',
        key: ''
      }
    },
    mounted(){
      this.key = this.value    // 在生命周期中，把获取的value值获取给key
    },
    watch: {
      key(val) {
        // console.log('this.key===' + val)
        this.$emit('input', val)
        if(val === ''){
          this.$emit('cancel')
        }
      },
      value(val) {
        this.key = val
      }
    },
    methods: {
      searchEvent (val) {
        // this.value = value
        
      }
    }
  }
</script>

<style lang="stylus">


</style>
