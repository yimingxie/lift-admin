<template>
  <div :class="{'auto-search': auto, 'active': active && key.length}" class="search-box">
    <slot></slot>
    <div class="search-box-input">
      <input :placeholder="placeholder" v-model="key" @focus="handleFocus(key)" @blur="handleBlur(key)" @keyup.enter="$emit('press-enter')" maxlength="64"/>
      <!-- <input :placeholder="placeholder" v-model="key" @keyup.enter="$emit('press-enter')" maxlength="64" key='key'/> -->
      <div @mousedown="handleCancelClick" class="fa iconfont icon-et-wrong1"></div>
    </div>
    <slot name="search-button"></slot>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        // twoWay: true,
        // default: ''
      },
      auto: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        key: ''
      }
    },
    mounted(){
      this.key = this.value    // 在生命周期中，把获取的value值获取给current
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
      
      handleCancelClick () {
        this.key = ''
        // this.$emit('cancel')
      },

      // handleInput () {
      //   this.$emit('search')
      // },

      handleFocus (key) {
        this.$emit('search-activate')
      },

      handleBlur (key) {
        this.$emit('search-deactivate')
        // this.$emit('updata:key', key)
      }
    }
  }
</script>
<style lang="stylus">
  // @import '../assets/stylus/common'

  // 搜索框
  .search-box
    display inline-block

    label
      margin-right 10px

    .v-select
      display inline-block

    .btn-primary
      vertical-align middle

  .search-box-input
    display inline-block
    position relative
    // background #F1F1F1
    border-bottom 1px solid default-border-color
    size 190px 32px
    vertical-align middle

    input
      background transparent
      border none
      appearance none
      size 160px 32px
      line-height 32px
      padding 0 6px 0 10px
      font-size 12px
      box-sizing border-box

    .btn
      cursor pointer

    .fa
      position absolute
      top 6px !important
      right 6px !important
      display none
      width 20px !important
      height 20px !important
      font-size 18px
      cursor pointer
      color #B0B0B1
      transition color .3s
      line-height 20px !important
      text-align center

      &:hover
        color red

  &.active
    .search-box-input
      .fa
        display inline

</style>