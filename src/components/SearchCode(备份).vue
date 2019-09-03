<template>
  <div class="search-container">
    <div class="llcb-search-box">
      <input class="lsearch-input" type="text" v-model="cCode" placeholder="搜索电梯注册码/详细地址" @keyup="showList" @keyup.enter="search(cCode)" @blur="show = false">
      <input class="lsearch-submit" type="button" value="" @click="search(cCode)">
      <div class="code-clear" v-show="cCode" @click="clearCode"></div>
    </div>

    <!-- 搜索提示下拉 -->
    <div class="llcb-search-tips" v-show="show">
      <div style="color: #909399;font-size: 14px;line-height 60px;text-align: center;" v-show="resultList.length == 0">无搜索结果</div>
      <div class="search-tip-box" v-for="(item, i) in resultList" :key="i" @mousedown="search(item.regCode)">
        <h4>{{item.regCode}}</h4>
        <p>{{item.inNum}}  {{item.address}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../api'
export default {
  props: ['code'], // 父子组件只允许数据单向下行流动，因此需要一个cCode来存储
  data() {
    return {
      show: false,
      cCode: this.code,
      resultList: []
    }
  },
  mounted() {
    console.log('cCode', this.cCode)
    

  },
  methods: {
    // 展示下拉和搜索结果
    showList() {
      // 去除所有空格
      let cCode = this.cCode.replace(/\s+/g,"");
      if (!cCode) return
      this.show = true
      // http.get('http://192.168.100.89:8080/elevator/search?title=' + cCode).then(res => {
      //   if (res.data.data) {
      //     this.resultList = res.data.data
      //   } else {
      //     this.resultList = []
      //   }
      // })

      let param = {
        "title": cCode
      }

      api.lift.showSearchList(param).then(res => {
        if (res.data.data) {
          this.resultList = res.data.data
        } else {
          this.resultList = []
        }
      })
    },
    // 将电梯注册码返回给父组件
    search(regCode) {
      this.show = false
      console.log(regCode)
      // this.cCode = regCode
      // this.$emit('childCode', this.cCode)
      this.$emit('childCode', regCode)
    },

    // 清空
    clearCode() {
      this.cCode = ''
      this.$emit('clearCode', this.cCode)      
    },

  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
.search-container{
  position relative;
  z-index:999;
  .llcb-search-box{
    position relative;
  }
  .code-clear{
    position absolute;
    top: 1px;
    right 1px;
    width 40px
    height 30px;
    background #fff url('../assets/images/xym/delete.png') no-repeat center center;
    cursor pointer
    opacity 0;
  }
  .llcb-search-box:hover .code-clear{
    opacity 1
  }

  .lsearch-input{
    position relative;
    box-sizing border-box;
    height 32px;
    width 100%;
    padding-right 60px;
    padding-left 10px;
    border: 1px solid #D8DDDF;
    border-radius: 4px;
  }
  .lsearch-submit{
    position absolute;
    top 1px;
    right 1px;
    border none;
    height 30px;
    width 40px;
    cursor pointer;
    background: #fff url('../assets/images/xym/search.png') no-repeat center center;
    border-radius: 4px;
  }
  .llcb-search-tips{
    position absolute;
    top: 42px;
    left 0;
    width 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0 0 10px -2px rgba(12,22,49,0.30);
    border-radius: 4px;
    max-height 260px;
    z-index 10;
    padding: 10px 0;
    overflow: auto;
  }
  .search-tip-box{
    padding: 10px 12px;
    cursor pointer;
  }
  .search-tip-box:hover{
    background: rgba(66,114,255,0.10);
  }
  .search-tip-box h4{
    font-size: 14px;
    color: #34414C;
    line-height: 20px;
    font-weight: normal;
  }
  .search-tip-box:hover h4{
    color: #4272FF;
  }
  .search-tip-box p{
    font-size: 12px;
    color: #7E8A95;
    line-height: 20px;
  }
  


}

</style>
