<template>
  <span>
    <div v-if="total > 0" class="pager tar">
      <button :class="{'disabled': current === 1}" :disabled="current === 1" @click="current = current - 1" class="pager-btn pager-prev"><i class="iconfont icon-left"><</i></button>
      <!-- 小于9页 -->
      <div v-if="pages < 10" class="pager-container">
        <div v-for="page in pages" :class="{'current': current === page}" @click="current = page" class="pager-item"><span>{{ page }}</span></div>
      </div>
      <!-- 大于等于9页 and 当前页数小于等于5 -->
      <div v-if="pages >= 10 && ( current <= 5)" class="pager-container">
        <div v-for="page in 6" :class="{'current': current === page}" @click="current = page" class="pager-item"><span>{{ page }}</span></div>
        <!-- <div v-for="offset in 6" :class="{'current': current === current + offset}" @click="current = current + offset" class="pager-item"><span>{{ current + offset }}</span></div> -->
        <div class="pager-more"><span @click="toggleInput($event)">...</span>
          <div v-show="showInput" class="pager-input">
            <input type="number" v-bind:max="pages" @change="onInput"/>
          </div>
        </div>
        <div v-for="offset in 2" :class="{'current': current === pages - 2 + offset}" @click="current = pages - 2 + offset" class="pager-item"><span>{{ pages - 2 + offset }}</span></div>
      </div>
      <!-- 大于等于9页 and 当前页数是最后4页 -->
      <div v-if="pages >= 10 && (current >= pages - 4)" class="pager-container">
        <div v-for="page in 1" :class="{'current': current === page}" @click="current = page" class="pager-item"><span>{{ page }}</span></div>
        <div class="pager-more"><span @click="toggleInput($event)">...</span>
          <div v-show="showInput" class="pager-input">
            <input type="number" v-bind:max="pages" @change="onInput"/>
          </div>
        </div>
        <div v-for="offset in 6" :class="{'current': current === pages - 6 + offset}" @click="current = pages - 6 + offset" class="pager-item"><span>{{ pages - 6 + offset }}</span></div>
      </div>
      <!-- 大于等于9页 and 当前页数是中间值 -->
      <div v-if="pages >= 10 && current > 5 && current < pages - 4" class="pager-container">
        <div :class="{'current': current === 1}" @click="current = 1" class="pager-item"><span>1</span></div>
        <div class="pager-more"><span @click="toggleInput1($event)">...</span>
          <div v-show="showInput1" class="pager-input">
            <input type="number" v-bind:max="pages" @change="onInput"/>
          </div>
        </div>
        <div v-for="offset in 2" :class="{'current': current === current - 3 + offset}" @click="current = current - 3 + offset" class="pager-item"><span>{{ current - 3 + offset }}</span></div>
        <div :class="{'current': current === current}" @click="current = current" class="pager-item"><span>{{ current}}</span></div>
        <div v-for="offset in 2" :class="{'current': current === current + offset}" @click="current = current + offset" class="pager-item"><span>{{ current + offset }}</span></div>
        <div class="pager-more"><span @click="toggleInput2($event)">...</span>
          <div v-show="showInput2" class="pager-input">
            <input type="number" v-bind:max="pages" @change="onInput"/>
          </div>
        </div>
        <!-- <div v-for="offset in 2" :class="{'current': current === pages - 1 + offset}" @click="current = pages - 1 + offset" class="pager-item"><span>{{ pages - 1 + offset }}</span></div> -->
        <div :class="{'current': current === pages}" @click="current = pages" class="pager-item"><span>{{ pages }}</span></div>
      </div>

      <button :class="{'disabled': current === pages}" :disabled="current === pages" @click="current = current + 1" class="pager-btn pager-next"><i class="iconfont icon-right">></i></button>
    </div>
  </span>
</template>


<script>
import config from '../consts/config'

export default {
  props: {
    pageCount: {
      type: Number,
      default: config.pageCount
    },
    total: {
      type: Number
    },
    value: {
      type: Number,
      twoWay: true,
      default: 1
    }
  },

  data () {
    return {
      current: 1,
      showInput: false,
      showInput1: false,
      showInput2: false
    }
  },
  mounted(){
    this.current = this.value    // 在生命周期中，把获取的value值获取给current
  },

  computed: {
    pages () {
      return Math.ceil(this.total / this.pageCount)
    }
  },
  watch:{
    value (newVal, oldVal) {
      this.current = newVal
      this.$emit('page-update')
    },
    current (val) {
      this.$emit('input', val)
      
    }
  },

  methods: {
    toggleInput (evt) {
      this.showInput = !this.showInput
      if (this.showInput) {
        evt.target.parentNode.getElementsByTagName('input')[0].focus()
      }
    },

    toggleInput1 (evt) {
      this.showInput1 = !this.showInput1
      if (this.showInput1) {
        evt.target.parentNode.getElementsByTagName('input')[0].focus()
      }
    },

    toggleInput2 (evt) {
      this.showInput2 = !this.showInput2
      if (this.showInput2) {
        evt.target.parentNode.getElementsByTagName('input')[0].focus()
      }
    },

    onInput (evt) {
      var page = Number(evt.target.value)

      if (typeof page === 'number') {
        page = Math.floor(page)
        this.showInput = false
        this.showInput1 = false
        this.showInput2 = false
        this.current = page
        evt.target.value = ''
      } else {
        this.showNotice({
          type: 'error',
          content: '请输入数字'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  @import '../assets/stylus/base'
  .fixPager
    position absolute
    right 17px
    bottom 20px
  // 分页
  .pager
    font-size 0
    margin-bottom -6px
    color #4C7A79

    .pager-btn
    .pager-item
    .pager-more
      display inline-block
      vertical-align middle
      box-sizing border-box

    .pager-btn
      background transparent
      border none
      font-size 8px
      color #4C7A79
      padding 0 6px
      height 26px
      line-height 28px
      transition background .3s, color .3s
      outline none
      cursor pointer

      &:hover
        // background blue
        color blue

      &.disabled
      &.disabled:hover
        background transparent
        color gray
        cursor not-allowed

    .pager-container
      display inline-block
      vertical-align middle

    .pager-item
    .pager-more
      position relative
      font-size 12px
      transition background .3s, color .3s, border-color .3s

      span
        display inline-block
        padding 0 8px
        border 1px solid transparent
        height 26px
        line-height 26px

        &:hover
          border-color blue
          // background blue
          color #FFF
          cursor pointer

    .pager-item
      &.current
        span
          // border-color blue
          font-weight: 800
          // background #FFF
          color blue

    .pager-input
      absolute left 50% top -40px
      margin-left -22px

      input
        width 44px
        text-align center
        border 1px solid #E5E5E5
        padding 0
        font-size 12px
        height 26px
        line-height 26px

      &:before
        absolute left 50% bottom -10px
        margin-left -5px
        content ""
        triangle #DDD 10px down

      &:after
        absolute left 50% bottom -9px
        margin-left -5px
        content ""
        triangle #FFF 10px down

    &.tal
      .pager-btn
      .pager-item
      .pager-more
        margin-right 5px

    &.tar
    &.tac
      .pager-btn
      .pager-item
      .pager-more
        margin-left 5px

</style>
