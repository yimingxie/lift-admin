<template>
  <div id="LiftAdd">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">添加电梯</span>
      </div>

      <div class="lift-add-search">
        <div class="la-search-box">
          <search-code @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="lift-list">
        <div class="lift-add-result-heading clearfix">
          <h4>查询结果</h4>
          <span>查询结果如未完善，请手动补充</span>
        </div>
        <div class="la-result">
          <div class="la-result-nodata">
            <div class="lar-nodata-icon">
              <img src="../../assets/images/xym/lift-query.png" alt="">
            </div>
            <div class="lar-nodata-p">
              <h4>请输入电梯注册代码进行查询</h4>
              <p>查询后将获取电梯相关信息，可进行电梯录入</p>
            </div>
          </div>
        </div>

      </div>

    </div>

    <footer-temp></footer-temp>

  </div>
</template>

<script>
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
    goToResult(val) {
      this.$router.push({
        path: '/lift-add-result',
        query: {
          regCode: val,
          submitState: 'post'
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

#LiftAdd{
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height 1;
  }
  .lift-list{
    background none;
  }
  
  
}

@media screen and (max-width: 1360px) {
  #LiftAdd{
    min-width: 1360px;
  }
}


</style>
