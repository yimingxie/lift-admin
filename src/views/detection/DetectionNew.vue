<template>
  <div id="ed">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">电梯检测</span>
      </div>

      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{regCode}}</li>
            <li><span>电梯负责人：</span>{{lift_man}}</li>
            <li><span>电梯地址：</span>{{localArea}} {{address}}</li>
          </ul>
        </div>
        <div class="det-heading-search">
          <search-code :code="parentCode" @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="det-content clearfix">

        <!-- 左侧 -->
        <!-- 异常告警列表 -->
        <div class="det-warn">
          <div class="det-warn-title">
            <div class="det-warn-title-h">异常告警</div>
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
              <div class="dw-list-box" v-for="(item, i) in warnList" :key="i">
                <div class="dwlb-p">
                  <h4>{{item.reason}}</h4>
                  <!-- 管道符 过滤器 -->
                  <p>{{item.diagnType | changeDiagnType}} {{item.triggleTime}}</p>
                </div>
                <div class="dwlb-rate" :class="item.processed == 0 ? 'no-deal' : ''">{{item.processed | changeProcessed}}</div>
              </div>
              <div v-show="isLoading" style="text-align: center;padding: 10px;">
                <img src="../../assets/images/xym/loading.gif" alt="">
              </div>
            </div>
          </div>
          
        </div>

        <div class="data-layout">
          <component :is="currentComponent"></component>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
import Footer from '../common/fotter'
import SearchCode from '../../components/SearchCode'
import DetectionRealtimeC from './DetectionRealtimeC'

export default {
  data() {
    return {
      parentCode: '',
      dateNow: '',
      currentComponent: 'DetectionRealtimeC',
      
      dtID: 'test001',
      

      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

      // 告警列表
      isLoading: false,
      isScroll: true, // 滚动加载节流阀
      triggleTime: '',
      diagnTypeOptions: [
        {value: '-1', label: '全部'},
        {value: '0', label: '事件'},
        {value: '1', label: '故障'},
        {value: '2', label: '违规'},
        {value: '3', label: '预警'},
      ],
      diagnType: '',
      processedOptions: [
        {value: '0', label: '未处理'},
        {value: '1', label: '处理中'},
        {value: '2', label: '已完成'},
      ],
      processed: '',
      warnList: [],
      warnParams: {
        offset : 1,
        limit : 20,
        regCode: "",
        diagnType: -1,
        processed: -1,
        startDate: '2019-1-1',
        endDate: '2019-7-18',
      },

      
      
    };
  },
  created() {
    this.parentCode = this.$route.query.regCode
  },
  mounted() {

    // 获取电梯详情
    this.getLiftDetail()

    // 异常列表滚动加载
    this.warnScroll() 

    // 开启告警定时器
    // this.setWarnListTimer()

  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.timer)
    // clearInterval(this.warnListTimer)
    this.timer = null
    this.warnListTimer = null
  },
  methods: {
    // 异常告警定时器
    // setWarnListTimer() {
    //   const that = this
    //   if (that.warnListTimer) clearInterval(that.warnListTimer)
    //   this.warnListTimer = setInterval(() => {
    //     that.getWarnList()
    //   }, 5000) // 5秒TODO
    // },

    // 获取最新数据
    getNewestWarn() {
      if (!this.warnList.length) return
    },

    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/detection',
        query: {
          regCode: val
        }
      })
      console.log('pp', this.parentCode)
    },

    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
        console.log('res', res)
        let detail = res.data.data
        this.regCode = detail.regCode
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address

        // 查询异常告警列表
        this.getWarnList()
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
              }
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
      this.warnParams.startDate = triggleTime[0]
      this.warnParams.endDate = triggleTime[1]
      this.getWarnList()
    },

    // 异常告警类型筛选
    changeDiagnType(diagnType) {
      this.isScroll = true
      this.warnParams.diagnType = diagnType
      this.getWarnList()
    },

    // 异常告警进度筛选
    changeProcessed(processed) {
      this.isScroll = true
      this.warnParams.processed = processed
      this.getWarnList()
    },

    
  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    DetectionRealtimeC,
    
    
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
};
</script>


<style>
#ed .el-input__inner{
  background: none;
  border: none;
}
#ed .el-range-input{
  background: none;
  margin-top: -2px;
}
#ed .el-date-editor .el-range-separator{
  width: auto;
}
</style>


<style lang="stylus" scoped>

#ed {
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height: 1;
  }
  
  // dete待封装
  .det-content{
    margin: 20px;
  }
  .det-warn{
    float: left;
    background: #FFFFFF;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    border-radius: 8px;
    height: 783px;
    width: 28%;
  }

  .dwc-box{
    position: relative;
    float: left;
    width: 33.3%;
  }
  .det-warn-choose{
    background: #F5F6F7;
  }
  .dwc-date-icon{
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 40px;
    background: url('../../assets/images/xym/date.png') no-repeat center center;
  }
  .dwc-box-line{
    position: absolute;
    top: 13px;
    right: -3px;
    height: 14px;
    width: 1px;
    background: #D8DDDF;
  }
  .dw-list{
    padding: 0 20px;
    height: 660px;
    overflow: auto;
  }
  .dw-list-box{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px dashed #D8DDDF;
    cursor: pointer;
  }
  .dwlb-p {
    padding-right: 64px;
  }
  .dwlb-p h4{
    font-size: 14px;
    color: #34414C;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dwlb-p p{
    font-size: 14px;
    color: #7E8A95;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dwlb-rate{
    position: absolute;
    top: 27px;
    right: 0px;
    font-size: 14px;
    color: #34414C;
  }
  .dwlb-rate.no-deal{
    color: #FA4F43;
  }
  .height-block{
    height: 520px
  }



}



</style>
