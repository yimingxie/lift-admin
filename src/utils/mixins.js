import Vue from 'vue'
// import { setLayout, showError, showNotice } from './store/actions/system'
import locales from './consts/locales/index'
import { mapActions } from 'vuex'

export var globalMixins = {
  data () {
    return {
      debug: process.env.NODE_ENV !== 'production'
    }
  },

  // vuex: {
  //   actions: {
  //     setLayout,
  //     showError,
  //     showNotice
  //   }
  // },

  created () {
    // 切换布局
    var layout = this.$options.layout
    if (layout) {
      this.setLayout(layout)
    }
    // console.log('layout===' + layout)
  },

  methods: {
    // setLayout (products) {
    //   this.$store.dispatch('system/setLayout', products)
    // },
    ...mapActions([
      'setLayout', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'showError',
      'showNotice'
    ]),
    // 注：以下方法可以在视图中直接引用，不需要声明，
    // 且会被视图中声明的同名方法覆盖

    /**
     * 检验目标是否为数字类型
     * @param  {Object} value 待检验目标
     * @return {Boolean}
     */
    numberic (value) {
      return /^\d*$/.test(value)
    },

    /**
     * 检验字符串中是否不含空格
     * @param  {String} value 待检验目标字符串
     * @return {Boolean}
     */
    noSpaces (value) {
      return /^\S+$/.test(value)
    },

    /**
     * 检验字符串中是否不以空格开头或结尾
     * @param  {String} value 待检验目标字符串1
     * @return {Boolean}
     */
    noSpacesPrefixAndSuffix (value) {
      return /^\S(.*\S)*$/.test(value)
    },

    handleError (err) {
      if (typeof err.data !== 'undefined' && typeof err.data.error !== 'undefined') {
        switch (err.data.error.code) {
          case 4031003:
            this.showNotice({
              type: 'error',
              content: locales[Vue.config.lang].errors[err.data.error.code]
            })
            this.$router.push('/')
            break
          default:
            this.showError(err.data.error)
        }
      }
    }
  }
}
