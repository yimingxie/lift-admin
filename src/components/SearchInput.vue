<template>
  <!-- 不需要下拉框的搜索框 -->

  <div class="search1" :class="{inputActive:act_index==='1'}">
    <input class="search_input" @focus="act_index='1'" @blur="act_index='0'" :placeholder="placeholderValue" v-model="key"  @keyup="searchEvent(key)" @keyup.enter="searchEvent(key)" ref="searchInput" autocomplete="off" autocapitalize="off" autocorrect="off"/>
    <!-- <span class="search_btn" @click="searchEvent"></span> -->
    <!-- <slot name="btn"></slot> -->
    <span class="search_btn" @click="searchEvent(key)" ></span>
    <div class="code-clear" v-show="key" @click="clearCode"></div>
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
          this.$emit('cancel', val)
        }
      },
      value(val) {
        this.key = val
      }
    },
    methods: {
      searchEvent (val) {
        // this.value = value
        console.log("val---" + val)
        this.$emit('search', val)
      },
      // 清空
      clearCode() {
        this.key = ''
        this.$emit('cancel', this.key)      
      },
    }
  }
</script>

<style lang="stylus">
.search1{
  position relative;
  .code-clear{
    position absolute;
    top: 0;
    right 1px;
    width 35px
    height 30px;
    background #fff url('../assets/images/xym/delete.png') no-repeat center center;
    cursor pointer
    opacity 0;
  }
  &:hover .code-clear{
    opacity 1
  }
}
</style>
