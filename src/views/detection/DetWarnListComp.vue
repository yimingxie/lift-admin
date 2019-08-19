<template>
  <div id="DetWarnListComp">
    <div class="">
      <div class="det-warn-title">
        <div class="det-warn-title-h">异常告警</div>
        <div class="back-realtime" v-show="diagnId" @click="backRealtime">实时</div>
      </div>
      <div class="det-warn-choose clearfix">
        <div class="dwc-box" style="width: 56%;">
          <!-- <div class="dwc-date-icon" :class="triggleTime ? 'hideIcon' : ''"></div> -->
          <div class="dwc-box-line"></div>
          <!-- <el-date-picker v-model="triggleTime" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd" prefix-icon="test-icon" style="width: 100%;" @change="changeTriggleTime"></el-date-picker> -->
          <el-date-picker
            v-model="triggleTime"
            type="daterange"
            value-format="yyyy-MM-dd" 
            style="width: 100%;" 
            @change="changeTriggleTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

        </div>
        <div class="dwc-box" style="width: 22%">
          <div class="dwc-box-line"></div>
          <el-select v-model="diagnType" placeholder="类型" @change="changeDiagnType">
            <el-option v-for="item in diagnTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="dwc-box" style="width: 22%;">
          <el-select v-model="processed" placeholder="进度" @change="changeProcessed">
            <el-option v-for="item in processedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>

      <div class="det-warn-list" id="det-warn-list">
        <div class="dw-list" id="dw-list">
          <div class="list-no-data" v-show="warnList.length == 0">暂无数据</div>
          <div class="dw-list-box" :class="addDiffClass(item.diagnType, item.diagnId)" v-for="(item, i) in warnList" :key="i" @click="goDiagnose(item.diagnId, i, item.diagnType, item.ts)">
            <div class="dw-list-box-wrap">
              <div class="dwlb-p">
                <h4>{{item.reason}}</h4>
                <!-- 管道符 过滤器 -->
                <p>{{item.diagnType | changeDiagnType}} {{item.triggleTime}}</p>
              </div>
              <div class="dwlb-rate" :class="item.processed == 0 ? 'no-deal' : ''">{{item.processed | changeProcessed}}</div>
            </div>
          </div>
          <div v-show="isLoading" style="text-align: center;padding: 10px;">
            <img src="../../assets/images/xym/loading.gif" alt="">
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
export default {
  data() {
    return {
      parentCode: '',
      diagnId: '',
      warnListTimer: null,
      // 告警列表
      boxOnIndex: '',
      isLoading: false,
      isScroll: true, // 滚动加载节流阀
      triggleTime: '',
      diagnTypeOptions: [
        {value: -1, label: '全部'},
        {value: 0, label: '事件'},
        {value: 1, label: '故障'},
        {value: 2, label: '违规'},
        {value: 3, label: '预警'},
      ],
      diagnType: '',
      processedOptions: [
        {value: -1, label: '全部'},
        {value: 0, label: '未处理'},
        {value: 1, label: '处理中'},
        {value: 2, label: '已完成'},
      ],
      processed: '',
      warnList: [],
      warnParams: {
        offset : 1,
        limit : 20,
        regCode: "",
        diagnType: -1,
        processed: -1,
        startDate: '1970-01-01', // 固定很早时间
        endDate: '2019-07-24',
      },

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
    this.diagnId = this.$route.query.diagnId
    // this.diagnType = this.$route.query.diagnType != -1 ? this.$route.query.diagnType : ''
  },
  mounted() {
    this.warnParams.endDate = xymFun.dateFormat(Date.now())

    // 首次加载
    if (this.diagnId) {
      // 页面关闭清除定时器
      clearInterval(this.warnListTimer)
      this.warnListTimer = null

      // 当跳转详情页执行：
      this.boxOnIndex = this.diagnId
      this.warnParams.diagnType = this.$route.query.diagnType
      this.warnParams.processed = this.$route.query.processed
      let params = {
        offset : 1,
        limit : this.$route.query.offset * this.$route.query.limit,
        regCode: this.$route.query.regCode,
        diagnType: this.$route.query.diagnType,
        processed: this.$route.query.processed,
        startDate: this.$route.query.startDate, // 固定很早时间
        endDate: this.$route.query.endDate,
      }
      api.detection.getWarnList(params).then(res => {
        console.log('跳转异常告警', res)
        this.warnList = res.data.data.records
        this.warnParams.offset = this.$route.query.offset
        // 设置高亮置顶
        var divscroll = document.getElementById('dw-list');
        setTimeout(() => {
          divscroll.scrollTop = this.$route.query.index * 70
        }, 200)
      })

    } else {
      // 进入面板执行
      this.getWarnList()
      this.setWarnListTimer()
      
    }
    

    

    // 异常列表滚动加载
    this.warnScroll() 

  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.warnListTimer)
    this.warnListTimer = null
  },
  methods: {
    // 异常告警定时器
    setWarnListTimer() {
      // return false // 关闭定时器
      const that = this
      if (that.warnListTimer) clearInterval(that.warnListTimer)
      // if (that.warnList.length === 0) return
      this.warnListTimer = setInterval(() => {
        that.getNewestWarn()
      }, 2000) 
    },

    // 转换list时间
    seDateFormat(timestamp) {
      // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
      var dateObj = new Date(timestamp)
      var year = dateObj.getFullYear(),
        month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
        date = ("0" + dateObj.getDate()).slice(-2)
      var result = year + '-' + month + '-' + date
      return result;
    },

    

    // 获取最新异常告警
    getNewestWarn() {
      const that = this
      // if (!this.warnList.length) return
      let warnParamsCopy = xymFun.deepClone(that.warnParams)
      warnParamsCopy.offset = 1
      api.detection.getWarnList(warnParamsCopy).then(res => {
        console.log('异常告警', res.data)
        let totalList = res.data.data.records
        totalList.forEach((item, i) => {
          // 如果第一条数据的时间戳不相等，则push
          let firstTS = that.warnList[0].ts
          if (totalList[0].ts == firstTS) return false
          let newestList = []

          totalList.forEach((secondItem, secondI) => {
            if (secondItem.ts !== firstTS) {
              newestList.push(secondItem)
            }
          })
          that.warnList = newestList.concat(that.warnList)
        })

      })

    },

     // 查询异常告警列表
    getWarnList() {
      this.warnParams.regCode = this.parentCode
      api.detection.getWarnList(this.warnParams).then(res => {
        console.log('异常告警', res)
        this.warnList = res.data.data.records
      })
    },

    // 异常告警列表滚动加载
    warnScroll() {
      const that = this
      var divscroll = document.getElementById('dw-list');
      
      divscroll.addEventListener('scroll', () => {
        var wholeHeight = divscroll.scrollHeight; // div总高度
        var scrollTop = divscroll.scrollTop; // 卷曲高度
        var divHeight = divscroll.clientHeight; // div可见高度

        // 已滚到底部
        if(scrollTop + divHeight >= wholeHeight && that.isScroll){
          clearInterval(that.warnListTimer) // 关闭定时器
          that.isScroll = false // 防止多次请求
          that.isLoading = true
          that.warnParams.offset += 1
          api.detection.getWarnList(that.warnParams).then(res => {
            setTimeout(() => {
              that.isLoading = false
              // 如果为空数组，则不允许往下滚动加载
              if (res.data.data.records.length > 0) {
                that.isScroll = true
                let warnListMore = res.data.data.records
                that.warnList = that.warnList.concat(warnListMore)
                // if (this.currentComponent == 'DetectionDiagnoseC') return
              }

              if (!that.$route.query.diagnId) that.setWarnListTimer() // 如果为诊断页面，则不开启定时器，否则要重新开启
            }, 1000)
          })
          .catch(err => {
            console.log('下拉请求失败，请重试', err)
            that.isLoading = false
            that.isScroll = true
          })
        }
        // if(scrollTop == 0){
        //     alert('滚动到头部了！');
        // }

      })

    },


    // 异常告警日期筛选
    changeTriggleTime(triggleTime) {
      this.isScroll = true
      this.warnParams.offset = 1
      if (triggleTime) {
        this.warnParams.startDate = triggleTime[0]
        this.warnParams.endDate = triggleTime[1]
      } else {
        this.warnParams.startDate = '1970-01-01'
        this.warnParams.endDate = this.seDateFormat(Date.now())
      }
      
      this.getWarnList()
    },

    // 异常告警类型筛选
    changeDiagnType(diagnType) {
      this.isScroll = true
      this.warnParams.offset = 1
      this.warnParams.diagnType = diagnType
      this.getWarnList()
    },

    // 异常告警进度筛选
    changeProcessed(processed) {
      this.isScroll = true
      this.warnParams.offset = 1
      this.warnParams.processed = processed
      this.getWarnList()
    },

    // 渲染不同类
    addDiffClass(diagnType, diagnId) {
      let onClass = this.boxOnIndex == diagnId ? 'on' : ''
      if (diagnType == 1) {
        return 'faultBg' + ' ' + onClass
      } else if (diagnType == 2) {
        return 'violationBg' + ' ' + onClass
      } else if (diagnType == 3) {
        return 'warningBg' + ' ' + onClass
      } else {
        return 'accidentBg' + ' ' + onClass
      }

    },

    // 跳转到诊断
    goDiagnose(diagnId, index, diagnType, timestamp) {
      this.boxOnIndex = diagnId
      // console.log('diagnId', diagnId)
      clearInterval(this.warnListTimer)
      this.warnListTimer = null
      this.$router.push({
        path: '/detection-panel-detail',
        query: {
          regCode: this.parentCode,
          diagnId: diagnId,
          offset: this.warnParams.offset,
          limit : this.warnParams.limit,
          diagnType: this.warnParams.diagnType,
          processed: this.warnParams.processed,
          startDate: this.warnParams.startDate, // 固定很早时间
          endDate: this.warnParams.endDate,
          index: index,
          // diagnTypeSingle: diagnType, // 单条告警信息的类型
          timestamp: timestamp
        }
      })
      // this.$router.go(0)

    },

    // 跳回实时监测
    backRealtime() {
      // this.boxOnIndex = ''
      this.$router.push({
        path: '/detection-panel',
        query: {
          regCode: this.parentCode
        }
      })
    },

  },
  components: {

  },
  filters: {
    // 转换故障类型
    changeDiagnType(value) {
      if (value == 1) {
        return '故障'
      } else if (value == 2) {
        return '违规'
      } else if (value == 3) {
        return '预警'
      } else {
        return '事件'
      }
    },

    // 转换处理进度
    changeProcessed(value) {
      if (value == 1) {
        return '处理中'
      } else if (value == 2) {
        return '已完成'
      } else {
        return '未处理'
      }
    },
  },
}
</script>

<style>
#DetWarnListComp .el-input__inner{
  background: none;
  border: none;
}
#DetWarnListComp .el-range-input{
  background: none;
  margin-top: -2px;
}
#DetWarnListComp .el-date-editor .el-range-separator{
  width: auto;
  line-height: 26px !important;
}
#DetWarnListComp .el-input__icon{
  line-height: 26px !important;
}
</style>

<style lang="stylus" scoped>
#DetWarnListComp{
  @import '../../assets/stylus/xymStyle.styl'

  background #fff


}


</style>
