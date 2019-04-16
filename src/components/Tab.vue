<template>
  <nav class="tab">
    <ul>
      <li v-for="item in nav" :key="item.label">
        <template v-if="isInBanNav(item)">
          <router-link v-if="debug" :to="item.link">{{ item.label }}</router-link>
        </template>
        <template v-else>
          <router-link :to="item.link">{{ item.label }}</router-link>
        </template>
        <!-- <a v-else href="{{ item.url }}" target="_blank">{{ item.label }}</a> -->
      </li>
    </ul>
  </nav>
</template>

<style lang="stylus">
// @import '../assets/stylus/base'

// 选项卡
.tab
  // margin-top 20px
  margin: 0!important
  padding 40px 0 20px
  border-bottom 1px solid #e1e1e1

  ul
    reset-list()
    font-size 0

  li
    display inline-block
    margin-right 20px
    font-size 14px

    a
      display block
      padding 0 15px
      background #fff
      border 1px solid #e1e1e1
      border-radius 17px
      height 28px
      line-height 28px
      box-sizing: content-box

      &:hover
        text-decoration none
        color blue!important

      &.router-link-active
        // padding-bottom 0
        // border-bottom 2px solid red
        color #fff!important
        background blue
</style>

<script>
  // import { globalMixins } from '../mixins'

  export default {
    // mixins: [globalMixins],

    props: {
      nav: {
        type: Array,
        default () {
          return []
        }
      },

      // 需要线上隐藏的入口列表
      // 例子：
      // <tab :nav="secondaryNav" :ban="[$t('sub_nav.product.wechat'), $t('sub_nav.product.dataforward')]"></tab>
      ban: {
        type: Array,
        default () {
          return []
        }
      }
    },
    mounted() {
      console.log('nav===' + JSON.stringify(this.nav))
    },
    methods: {
      isInBanNav (navItem) {
        var result = false
        this.ban.forEach((item) => {
          if (navItem.label === item) {
            result = true
            return
          }
        })
        return result
      }
    }
  }
</script>
