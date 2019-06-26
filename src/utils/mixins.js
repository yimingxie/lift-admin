

export default {

  /**
     * 检验目标是否为数字类型
     * @param  {Object} value 待检验目标
     * @return {Boolean}
     */
  numberic(value) {
    return /^\d*$/.test(value)
  },

  /**
   * 检验字符串中是否不含空格
   * @param  {String} value 待检验目标字符串
   * @return {Boolean}
   */
  noSpaces(value) {
    return /^\S+$/.test(value)
  },

  /**
   * 检验字符串中是否不以空格开头或结尾
   * @param  {String} value 待检验目标字符串1
   * @return {Boolean}
   */
  noSpacesPrefixAndSuffix(value) {
    return /^\S(.*\S)*$/.test(value)
  },

  handleError(err) {
    alert(err)
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