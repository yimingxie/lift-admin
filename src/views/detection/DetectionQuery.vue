<template>
  <div id="LiftAdd">
    <div class="container">
      <div class="bread-nav">
        <span class="on">检测诊断</span>
      </div>

      <div class="lift-add-search">
        <div class="la-search-box">
          <search-code @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="lift-list">
        <!-- <div class="lift-add-result-heading clearfix">
          <h4>查询结果</h4>
          <span>查询结果如未完善，请手动补充</span>
        </div> -->
        <div class="la-result">
          <div class="la-result-nodata">
            <div class="lar-nodata-icon">
              <img src="../../assets/images/xym/lift-query.png" alt="">
            </div>
            <div class="lar-nodata-p">
              <h4>请输入电梯注册代码进行查询</h4>
              <p>查询后将获取电梯监测结果</p>
            </div>
          </div>
        </div>

      </div>

    </div>

    <footer-temp></footer-temp>

  </div>
</template>

<script>
import api from '../../api.js'
import SearchCode from '../../components/SearchCode'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      list: []

    }
  },
  mounted() {

  },
  methods: {
    goToResult(code) {
      api.lift.getLiftResult(code).then(res => {
        console.log('res', res.data)
        if (res.data.data) {
          this.$router.push({
            path: '/detection-panel',
            query: {
              regCode: code
            }
          })
        } else {
          this.$message.error('该电梯不存在，请重新输入')
        }
      })
      
    }

  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode

  }
}
</script>

<style>
  .la-search-box .lsearch-input{
    height: 40px !important;
    font-size: 16px !important;
  }
  .la-search-box .llcb-search-tips{
    top: 52px !important;
  }
  .la-search-box .lsearch-submit{
    height: 38px !important;
  }
</style>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'

#LiftAdd{
  .container{
    line-height 1;
  }
  .lift-list{
    background none;
  }
  
  
}

</style>
