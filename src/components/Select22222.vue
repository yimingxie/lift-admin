<template>
  <div :class="classes" id="select22">
    <slot name="label"></slot>
    <div class="v-select-1-wrap" :style="selectWrapStyle">
      <div class="v-select-1-trigger">
        <span @click="onDropDownSelect()">{{ label || placeholder }}</span>
        <i class="caret iconfont icon-unfold" @click="onDropDownSelect()"></i>
        <!-- <div class="el-select">
          <div class="el-input el-input--suffix">
            <input v-model="curSelect" type="text" readonly="readonly" autocomplete="off" placeholder="请选择" class="el-input__inner">
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
              </span>
            </span>
          </div>
        </div> -->
        <div v-show="showDropDown" class="el-select-dropdown el-popper" style="z-index: 90013;" :style="selectWrapStyle" x-placement="bottom-start">
          <div class="el-scrollbar" style="">
            <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="">
              <ul class="el-scrollbar__view el-select-dropdown__list">
                <li v-for="item in options" class="el-select-dropdown__item" @click="onItemSelect(item)" :key="item">
                  <span v-if="item.value === value" class="selected">{{ item.label }}</span>
                  <span v-else>{{ item.label }}</span>
                </li>
              </ul>
            </div>
            <div class="el-scrollbar__bar is-horizontal">
              <div class="el-scrollbar__thumb" style="transform: translateX(0%);">
              </div>
            </div>
            <div class="el-scrollbar__bar is-vertical">
              <div class="el-scrollbar__thumb" style="transform: translateY(0%);">
              </div>
            </div>
          </div>
          <div x-arrow="" class="popper__arrow" style="left: 35px;">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import EventListener from './utils/EventListener'

  export default {
    name: 'Select1',

    // model: {
    //   // 当前值，外部可以使用 v-model 进行绑定
    //   prop: 'itemSelected',
    //   event: 'select-value-changed'
    // },

    props: {
      // 占位符
      placeholder: {
        type: String,
        default: ''
      },

      // 当前值标签
      label: {
        type: String,
        required: true,
        default: ''
      },

      // 当前值
      value: {
        default: ''
      },

      // 宽度
      width: {
        type: String,
        default: '100%'
      },

      // z-index, 用户自定义的z-index值，以便于在特殊情况下popOver层被dialog等遮挡的情况，用户可以加大z-index值
      zIndex: {
        type: Number,
        default: 3000
      },

      // 尺寸
      // 可选：['small' | 'normal' | 'large'], 默认为 'normal'
      size: {
        type: String,
        default: 'normal'
      },

      // 类前缀
      classPrefix: {
        type: String,
        default: 'v-select'
      },

      // 可供选择的数据数组import EventListener from './utils/EventListener'
      // [{label: 'label1', value: 'value1'}, {label: 'label2', value: 'value2'}]
      options: {
        type: Array,
        default: []
      }
    },

    data () {
      return {
        selectWrapStyle: {
          width: this.width
        },
        popOverWrapStyle: {
          width: this.width,
          'z-index': this.zIndex
        },
        showDropDown: false
      }
    },

    computed: {
      // 类
      classes () {
        var result = [this.classPrefix]
        var sizeCls = ({
          'small': 'sm'
        })[this.size] || ''

        if (sizeCls) {
          result.push(`${this.classPrefix}-${sizeCls}`)
        }

        if (this.label) {
          result.push(`${this.classPrefix}-active`)
        }

        return result.join(' ')
      }
    },

    methods: {
      onItemSelect (item) {
        console.log(JSON.stringify(item))
        this.label = item.label
        this.value = item.value
        this.itemSelected = item
        this.showDropDown = false
        // console.log('item selected:' + this.itemSelected.label + ', ' + this.itemSelected.value)
        // this.$emit('select-value-changed', this.itemSelected)
        this.$emit('change', this.itemSelected)
        // this.$emit('changed', this.itemSelected)
      },
      onDropDownSelect () {
        // console.log('on drop down=' + this.showDropDown)
        if (this.showDropDown) {
          this.showDropDown = false
        } else {
          this.showDropDown = true
        }
      }
    },

    mounted () {
      // this.$dispatch('select-1-created', this)
      this._closeEvent = EventListener.listen(window, 'click', (e) => {
        // alert(2)
        if (!this.$el.contains(e.target)) {
          console.log('target:' + e.target.id)
          this.showDropDown = false
        }
      })
    },

    beforeDestroy () {
      if (this._closeEvent) {
        this._closeEvent.remove()
      }
    }
  }
</script>

<style lang="stylus">
@import '../assets/stylus/base'
#select22
  .v-select
    & > span
      display inline-block
      vertical-align middle

    .v-select-1-wrap
      position relative
      width 100%
      display inline-block
      // background #FFF
      min-width 70px
      vertical-align middle

    .v-select-1-trigger
      position relative
      // border 1px solid default-border-color
      height 33px
      line-height 30px
      // padding 0 25px 0 10px
      cursor pointer

      span
        absolute left top
        padding-right 25px
        z-index 0
        text-indent 18px
        height 32px
        box-sizing border-box
        color white
        text-overflow 100%

      select
        absolute left top
        appearance none
        size 100%
        font-size 14px
        opacity 0
        z-index 10
        font-family font-stack
        cursor pointer

      .caret
        absolute right 12px top 0
        color blue
        font-weight 800
        // triangle #7c7ab9 10px down

  .v-select-sm
    & > span
      font-size 12px !important

    .v-select-trigger
      height 24px
      line-height 24px
      padding-left 8px
      cursor pointer

      span
        text-indent 8px
        height 26px
        font-size 12px

      select
        font-size 12px

      .caret
        top 10px

  .v-select-active
    .v-select-trigger
      span
        color gray-dark
  
  .el-scrollbar
    overflow hidden
    position relative

  .el-select-dropdown__item
    font-size 14px
    padding 0 20px
    position relative
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    color #606266
    height 34px
    line-height 34px
    box-sizing border-box
    cursor pointer
    &:hover
      background-color #536fdc
    span
      color gray-dark!important
      &:hover
        color white!important
    .selected
      color #536fdc!important
      font-weight 700
      &:hover
        color #fff!important
    
  
  horizontal
    height 6px
    left 2px

  .el-popper[x-placement^=bottom]
    margin-top 30px
  
  .el-select-dropdown
    position absolute
    z-index 1001
    border 1px solid #e4e7ed
    border-radius 4px
    background-color #fff
    box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
    box-sizing border-box
    margin 5px 0

  .el-scrollbar__bar
    position absolute
    right 2px
    bottom 2px
    z-index 1
    border-radius 4px
    opacity 0
    transition opacity .12s ease-out

  .el-scrollbar__wrap
    overflow hidden
    height 100%

  .el-select-dropdown__wrap 
    max-height 274px

  .el-select-dropdown__list
    list-style none
    padding 6px 0
    margin 0
    box-sizing border-box

  .el-popper[x-placement^=bottom]
    .popper__arrow
      top -6px
      left 50%
      margin-right 3px
      border-top-width 0
      border-bottom-color #ebeef5

  .el-popper
    .popper__arrow
      border-width 6px
      filter drop-shadow(0 2px 12px rgba(0,0,0,.03))

  .el-popper
    .popper__arrow
      position absolute
      display block
      width 0
      height 0
      border-color transparent
      border-style solid
  
  .el-popper
    .popper__arrow:after
      position absolute
      display block
      width 0
      height 0
      border-color transparent
      border-style solid

  .el-scrollbar__thumb
    position relative
    display block
    width 0
    height 0
    cursor pointer
    border-radius inherit
    background-color hsla(220,4%,58%,.3)
    transition background-color .3s

  .el-select
    display inline-block
    position relative

  .el-select>.el-input
    display block

  .el-input 
    position relative
    font-size 14px
    display inline-block
    width 100%

  .el-select .el-input.is-focus .el-input__inner
    border-color #409eff

  .el-input--suffix
  .el-input__inner
    padding-right 30px

  .el-select
  .el-input__inner
    cursor pointer
    padding-right 35px



  .el-input__suffix
    position absolute
    height 100%
    right 5px
    top 0
    text-align center
    color #c0c4cc
    transition all .3s
    pointer-events none

  .el-input__suffix-inner
    pointer-events all

  .el-select .el-input .el-select__caret.is-reverse
    transform rotate(0deg)


  .el-select .el-input .el-select__caret
    color #c0c4cc
    font-size 14px
    transition transform .3s
    transform rotate(180deg)
    cursor pointer

  .el-input__icon
    width 25px
    line-height 1!important

  .el-input__icon, .el-input__prefix
    height 100%
    text-align center
    transition all .3s

  [class*=" el-icon-"], [class^=el-icon-]
    font-family element-icons!important
    speak none
    font-style normal
    font-weight 400
    font-variant normal
    text-transform none
    line-height 1!important
    vertical-align baseline
    display inline-block
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
  .v-select-active
    .v-select-trigger
      .el-select-dropdown
        .el-scrollbar
          .el-select-dropdown__wrap
            .el-select-dropdown__list
              .el-select-dropdown__item
                span
                  color #fefefe

</style>
