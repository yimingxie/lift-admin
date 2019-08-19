<template>
  <span>
    <slot name="radio_original"></slot>
    <i class="radio_inner"></i>
  </span>
</template>

<script>
export default {
  // props: {
  //   width: {
  //     type: String,
  //     default: '566px'
  //   },
  //   show: {
  //     type: Boolean,
  //     required: true,
  //     twoway: true
  //   },
  //   flag: {
  //     type: Boolean,
  //     default: false
  //   }
  // },

  // data () {
  //   return {
  //     dialogStyle: {
  //       width: this.width
  //     }
  //   }
  // },

  methods: {
    dismiss () {
    }
  }
}
</script>

<style lang="stylus">
// @import '../assets/stylus/base'
// radio 模拟
.radio_input
  position:relative;
  vertical-align:middle
  margin-right: 16px;
  input[type="radio"],input[type="checkbox"]
    // margin-right 4px
    z-index: 3;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto; /* 这里及以上的定位，可以让该元素竖直居中。(top: 0; bottom: 0;) */
    opacity: 0;

  .radio_inner
    position: absolute;
    width 12px
    height 12px
    line-height: 12px;
    text-align: center;
    z-index: 1;
    border: 1px solid rgba(255,255,255,0.30);
    border-radius: 50%;
    top 3px
    left 0
    // border: 1px solid #ddd
    // &:hover
    //   border: 1px solid blue
  i:after
    content: ""
    background-color: #DDDDDD
    transition all 0.15s
    transform: scale(0)
  /*设置选中的input的样式*/

  /* + 是兄弟选择器,获取选中后的i元素*/
  input[type="checkbox"]:checked + i:after
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
    position: relative;
    top: 2px
    left 2px
    transform: scale(1)


// checkbox 模拟
.checkbox_input
  position:relative;
  vertical-align:middle
  margin-right: 16px;
  input[type="radio"],input[type="checkbox"]
    z-index: 3;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto; /* 这里及以上的定位，可以让该元素竖直居中。(top: 0; bottom: 0;) */
    opacity: 0;

  .radio_inner
    position: absolute
    width 14px
    height 14px
    line-height: 14px
    text-align: center
    z-index: 1
    background-color: #ddd
    top 1px
    left 0
    border-radius: 2px;
    transition all 0.15s
  i:after
    // box-sizing: content-box;
    content: ""
    border 1px solid #fff
    border-top 0
    border-left 0
    // transition all 0.15s
    // transform: scale(0)
    // border-left: 0;
    height: 7px;
    left: 5px;
    position: absolute;
    top: 2px;
    transform: rotate(45deg);
    width: 3px;
    transition: transform .15s ease-in .05s;
    transform-origin: center;
  /*设置选中的input的样式*/
  /* + 是兄弟选择器,获取选中后的i元素*/
  input:checked+i
    background blue
  /*设置禁用的input的样式*/
  input:disabled+i
    background: #dddddd
</style>