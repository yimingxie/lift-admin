<template>
  <div id="LiftList">
    <div class="container">
      <div class="lift-error clearfix">
        <div class="lift-error-sum">
          <div class="les-box">
            <div class="les-box-top">
              <div class="les-box-top-data"><span>{{eleStList.abnormalCount}}</span>异常电梯数</div>
              <div class="les-box-top-day">今日</div>
            </div>
            <div class="les-box-bottom clearfix">
              <p>电梯总数：{{eleStList.elevatorCount}}</p>
              <p>未处理：<span>{{eleStList.abnormalCount - eleStList.abnormalHandle}}</span></p>
              <p>已处理：{{eleStList.abnormalHandle}}</p>
            </div>
          </div>
        </div>

        <div class="lift-error-type clearfix">
          <div class="let-box" @mouseenter="leType.show1=false" @mouseleave="leType.show1=true">
            <div class="let-box-line"></div>
            <div class="let-box-simple" v-show="leType.show1">
              <h4>{{eleStList.accidentCount}}</h4>
              <p>事件告警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show1">
              <div class="lbd-left">
                <h4>{{eleStList.accidentCount}}</h4>
                <p>事件</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>{{eleStList.accidentCount - eleStList.accidentHandle}}</span></p>
                <p>已诊断：{{eleStList.accidentHandle}}</p>
              </div>
            </div>
          </div>

          <div class="let-box" @mouseenter="leType.show2=false" @mouseleave="leType.show2=true">
            <div class="let-box-line"></div>
            <div class="let-box-simple" v-show="leType.show2">
              <h4>{{eleStList.faultCount}}</h4>
              <p>故障告警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show2">
              <div class="lbd-left">
                <h4>{{eleStList.faultCount}}</h4>
                <p>故障</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>{{eleStList.faultCount - eleStList.faultHandle}}</span></p>
                <p>已诊断：{{eleStList.faultHandle}}</p>
              </div>
            </div>
          </div>

          <div class="let-box" @mouseenter="leType.show3=false" @mouseleave="leType.show3=true">
            <div class="let-box-line"></div>
            <div class="let-box-simple" v-show="leType.show3">
              <h4>{{eleStList.violationCount}}</h4>
              <p>违规告警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show3">
              <div class="lbd-left">
                <h4>{{eleStList.violationCount}}</h4>
                <p>违规</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>{{eleStList.violationCount - eleStList.violationHandle}}</span></p>
                <p>已诊断：{{eleStList.violationHandle}}</p>
              </div>
            </div>
          </div>

          <div class="let-box" @mouseenter="leType.show4=false" @mouseleave="leType.show4=true">
            <div class="let-box-simple" v-show="leType.show4">
              <h4>{{eleStList.warningCount}}</h4>
              <p>设备预警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show4">
              <div class="lbd-left">
                <h4>{{eleStList.warningCount}}</h4>
                <p>预警</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>{{eleStList.warningCount - eleStList.warningHandle}}</span></p>
                <p>已诊断：{{eleStList.warningHandle}}</p>
              </div>
            </div>
          </div>

        </div>

        <div class="lift-error-man">
          
          <div class="les-box">
            <div class="les-box-top">
              <div class="les-box-top-data"><span>{{eleStList.abnormalPeople}}</span>异常外派人员</div>
              <div class="les-box-top-day">今日</div>
            </div>
            <div class="les-box-bottom clearfix">
              <p style="width: 100%;">异常作业及时率：{{eleStList.promptness || 0}}%</p>
            </div>
          </div>

        </div>

      </div>

      <div class="lift-list">
        <div class="lift-list-title">数字电梯</div>
        <div class="ll-choose">
          <div class="ll-choose-top clearfix">
            <!-- 省市联动筛选 -->
            <div class="llct-area">
              <city-choose2 @childVal="selectCity"></city-choose2>
            </div>
            <div class="llct-line"></div>
            <div class="llct-type clearfix">
              <em>异常分类：</em>
              <radio-group :items="exceptItem" :value.sync="exceptValue" style="display: inline-block;margin-top: 3px;"></radio-group>
            </div>
            <div class="llct-line" style="margin-left: 14px;"></div>
            <div class="llct-type clearfix">
              <em>排序方式：</em>
              <radio-group :items="sortItem" :value.sync="sortValue" style="display: inline-block;margin-top: 3px;"></radio-group>
            </div>
          </div>

          <div class="ll-choose-bottom clearfix">
            <div class="llcb-operate">
              <div class="llcb-btn info" @click="goLiftAdd">+ 添加电梯</div>
              <div class="llcb-btn">批量录入</div>
              <div class="llcb-btn" @click="deleteLiftsDialog">删除电梯</div>
            </div>
            <div class="llcb-search">
              <search-code @childCode="searchLift" @clearCode="clearRegCode"></search-code>
            </div>
          </div>
          
        </div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <!-- <input type="checkbox"> -->
                <el-checkbox v-model="checkedAll" @change="checkedAllChange">{{test}}</el-checkbox>
              </div>
              <div class="llt-th">电梯注册代码</div>
              <div class="llt-th">内部编号</div>
              <div class="llt-th">区域-片区</div>
              <div class="llt-th">详细地址</div>
              <div class="llt-th">在线/设备</div>
              <div class="llt-th">检测数</div>
              <!-- <div class="llt-th"><div class="llt-th-sort" :class="sortClass" @click="warnSort">异常告警</div></div> -->
              <div class="llt-th">异常告警</div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="list-no-data" v-show="liftList.length == 0">暂无数据</div>
            <div class="llt-tr clearfix" v-for="(item, i) in liftList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <el-checkbox-group v-model="checkedLifts" @change="checkedLiftsChange">
                    <el-checkbox :label="item.regCode" :key="i">{{test}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="llt-td">{{item.regCode}}</div>
                <div class="llt-td">{{item.inNum}}</div>
                <div class="llt-td">{{item.localArea}}</div>
                <div class="llt-td">{{item.address}}</div>
                <div class="llt-td">
                  <p class="llt-td-device" @click="goLiftDevice(item.regCode)"><span class="llt-td-a">{{item.deviceOnline}}</span>/{{item.deviceCount}}</p>
                </div>
                <div class="llt-td">{{item.monitorCount}}</div>
                <div class="llt-td">
                  <p class="llt-td-type">预警<span class="warning">{{item.warningCount}}</span></p>
                  <p class="llt-td-type">违规<span class="illegal">{{item.violationCount}}</span></p>
                  <p class="llt-td-type">故障<span class="fault">{{item.faultCount}}</span></p>
                  <p class="llt-td-type">事件<span class="accident">{{item.accidentCount}}</span></p>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a" @click="goLiftResult(item.regCode)">电梯档案</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a" @click="goDetectionSet(item.regCode)">设置监控</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a" @click="goDetection(item.regCode)">诊断</span>
                </div>
              </div>
            </div>
            
          </div>

          <!-- 分页 -->
          <div class="list-page">
            <el-pagination
              @size-change="pageSizeChange"
              @current-change="currentPageChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="totalPage">
            </el-pagination>
          </div>
    
    
        </div>

      </div>

    </div>

    <!-- 底部 -->
    <footer-temp></footer-temp>

    <!-- 删除电梯对话框 -->
    <el-dialog custom-class="noneTitle" :show-close="false" :visible.sync="dialogDelete">
      <div class="dialog-delete">
        <div class="dia-heading">
          <div class="dia-con-pic">
            <img src="../../assets/images/xym/dia-warn.png" alt="">
          </div>
          <div class="dia-con-p">
            <h4>是否确认删除以下电梯</h4>
            <p>删除后不可复原，请谨慎操作</p>
          </div>
        </div>
        <ul class="dia-ul clearfix">
          <li :class="checkedLifts.length <= 1 ? 'single' : ''" v-for="(item, i) in checkedLifts" :key="i">{{item}}</li>
        </ul>
        <div class="diaN-btn-con clearfix">
          <div class="diaN-btn diaN-btn-cancel" @click="dialogDelete=false">取消</div>
          <div class="diaN-btn diaN-btn-red" @click="deleteLifts">确认</div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '../../api'
import RadioGroup from '../../components/RadioGroup'
import Footer from '../common/fotter'
import CityChoose2 from '../../components/CityChoose2'
import SearchCode from '../../components/SearchCode'

export default {
  data() {
    return {
      dialogDelete: false,
      liftList: [],
      liftsRegCodeOptions: [],
      checkedLifts: [],
      checkedAll: false,
      exceptItem: [
        {label: '全部', value: -1},
        {label: '预警', value: 3},
        {label: '违规', value: 2},
        {label: '故障', value: 1},
        {label: '事件', value: 0}
      ],
      exceptValue: -1,
      sortItem: [
        {label: '添加时间', value: -1},
        {label: '异常最多', value: 0},
        {label: '异常最少', value: 1}
     
      ],
      sortValue: -1,
      leType: {
        show1: true,
        show2: true,
        show3: true,
        show4: true,
      },
      liftListParams: {
        offset: 1, 
        limit: 10,
        excpType: -1,
        order: 'desc', // 异常排序
        timeOrder: 'desc' // 添加时间
      },
      sortClass: '',
      test: '',
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

      eleStList: {
        elevatorCount: 0,
        abnormalCount: 0,
        abnormalHandle: 0,
        warningCount: 0,
        warningHandle: 0,
        violationCount: 0,
        violationHandle: 0,
        faultCount: 0,
        faultHandle: 0,
        accidentCount: 0,
        accidentHandle: 0,
        abnormalPeople: 0,
        promptness: 0,
      },
      

    }
  },
  mounted() {
    this.getLiftList()
    this.getEleStatistics()
  },
  methods: {
    // 获取数字电梯列表
    getLiftList() {
      api.lift.getLiftList(this.liftListParams).then(res => {
        console.log('电梯',res)
        this.liftList = res.data.data.records

        // 将所有电梯注册码填入选项，用于全选
        this.liftsRegCodeOptions = []
        this.liftList.forEach(item => {
          this.liftsRegCodeOptions.push(item.regCode)
        })

        // 分页
        this.currentPage = res.data.data.current
        this.totalPage = res.data.data.total
      })
    },

    // 查询数字电梯统计
    getEleStatistics() {
      api.lift.getEleStatistics().then(res => {
        console.log('电梯统计', res.data)
        if (!res.data.data) return
        this.eleStList = res.data.data
      })
    },

    // 搜索
    // 监听子组件获取注册码，发送请求搜索并重新渲染列表
    searchLift(regCode) {
      this.liftListParams.regCode = regCode
      this.getLiftList()
    },

    // 清空
    clearRegCode() {
      this.liftListParams.regCode = ''
      this.getLiftList()
    },

    // 电梯多选
    checkedLiftsChange(val) {
      let count = this.liftList.length
      // 总数达到就全选
      this.checkedAll = val.length === count ? true : false
    },

    // 全选
    checkedAllChange(checkedBoolean) {
      this.checkedLifts = checkedBoolean ? this.liftsRegCodeOptions : []
    },

    // 区域筛选
    selectCity(cityArr, cnName) {
      this.liftListParams.areaCode = cityArr[cityArr.length-1] || ""
      console.log(cnName)
      this.getLiftList()
    },

    // 异常告警排序
    warnSort() {
      if (this.sortClass == '') {
        this.sortClass = 'asc'
        this.liftListParams.order = 'asc'
      } else if (this.sortClass == 'asc') {
        this.sortClass = 'desc'
        this.liftListParams.order = 'desc'
      } else {
        this.sortClass = 'asc'
        this.liftListParams.order = 'asc'
      }
      this.getLiftList()
    },

    // 排序方式排序
    sortSort() {},

    // 当前分页改变
    currentPageChange(current) {
      this.liftListParams.offset = current
      this.getLiftList()
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.liftListParams.limit = size
      this.getLiftList()
    },

    // 跳转添加电梯
    goLiftAdd() {
      this.$router.push({
        path: '/lift-add'
      })
    },

    // 跳转到电梯详情
    goLiftResult(regCode) {
      this.$router.push({
        path: '/lift-detail',
        query: {
          regCode: regCode,
          submitState: 'get'
        }
      })
    },

    // 删除电梯对话框
    deleteLiftsDialog() {
      let that = this
      console.log('删除选中电梯', this.checkedLifts)
      if (this.checkedLifts.length === 0) {
        return this.$message.error('请勾选需要删除的电梯。电梯删除后无法复原，请谨慎操作');
      }
      this.dialogDelete = true
    },

    // 删除电梯
    deleteLifts() {
      let that = this
      let params = {
        regCodes: this.checkedLifts.join(',')
      }
      api.lift.deleteLift(params).then(res => {
        console.log(res)
        if (res.data.code == '200') {
          that.$message.success(`${res.data.message}`)
          that.$router.go(0)
        } else {
          that.$message.error(`${res.data.message}`)
        }
      })
    },

    // 跳转到单部电梯设备列表页
    goLiftDevice(regCode) {
      this.$router.push({
        path: '/lift-device',
        query: {
          regCode: regCode
        }
      })
    },

    // 跳转到设置监控
    goDetectionSet(regCode) {
      this.$router.push({
        path: '/detection-set-model',
        query: {
          regCode: regCode
        }
      })
    },

    // 跳转到诊断
    goDetection(regCode) {
      this.$router.push({
        path: '/detection-panel',
        query: {
          regCode: regCode
        }
      })
    },

  },
  watch: {
    // 异常分类筛选
    exceptValue(val, oldVal) {
      this.liftListParams.excpType = val
      this.getLiftList()
    },
    // 排序方式筛选
    sortValue(val, oldVal) {
      if (val === -1) {
        // 添加时间最新排第一个
        this.liftListParams.timeOrder = 'desc'
        this.liftListParams.order = 'desc'
      } else if (val === 0) {
        this.liftListParams.timeOrder = 'asc'
        this.liftListParams.order = 'desc'
      } else if (val === 1) {
        this.liftListParams.timeOrder = 'asc'
        this.liftListParams.order = 'asc'
      }
      
      this.getLiftList()
    }
  },
  components: {
    'radio-group': RadioGroup,
    'footer-temp': Footer,
    'city-choose2': CityChoose2,
    'search-code': SearchCode,
    
  }
}
</script>

<style lang="stylus" scoped>

#LiftList{
  @import '../../assets/stylus/xymStyle.styl'
  .container{
    line-height 1;
  }

  .lift-error-sum{
    float left;
    width 25%;
    height 140px;
    color #fff;
    background-image: linear-gradient(-90deg, #E9775E 0%, #E95E5E 100%);
    box-shadow: 8px 0 20px -10px rgba(191,52,27,0.60);
  }
  .les-box{
    padding 0 20px;
  }
  .les-box-top{
    position relative;
    padding-top 32px;
    font-size 14px;
    padding-bottom 20px;
    border-bottom 1px dashed rgba(255,255,255,0.3);
  }
  .lift-error-man .les-box-top{
    border-bottom 1px dashed #dee2e4;
  }
  .les-box-top-data span{
    font-size 30px;
    font-weight bold;
    margin-right 6px;
  }
  .les-box-top-day{
    position absolute;
    top 38px;
    right 0;
    font-size 10px;
    color red;
    background #fff;
    padding 3px 8px;
    border-radius 5px;  
  }
  .lift-error-man .les-box-top-day{
    color #fff;
    background #7E8A95;
  }
  .les-box-bottom{
    padding-top 14px;
  }
  .les-box-bottom p{
    float left;
    font-size 14px;
    color: rgba(255,255,255,0.65);
    // width 33%;
    overflow hidden;
    text-overflow ellipsis;
    white-space nowrap;
  }
  .les-box-bottom p:first-child{
    width 40%;
  }
  .les-box-bottom p:nth-child(2){
    width 30%;
  }
  .les-box-bottom p:nth-child(3){
    width 30%;
  }
  .lift-error-man .les-box-bottom p{
    color #7E8A95;
  }
  .les-box-bottom p span{
    font-weight bold;
    color: rgba(255,255,255,1);
  }
  .lift-error-type{
    float left;
    width 56%;
    background #fff;
  }
  .let-box{
    position relative;
    box-sizing border-box;
    float left;
    width 25%;
    height 140px;
    cursor pointer;
  }
  .let-box:hover{
    box-shadow: 0 4px 16px -2px rgba(66,114,255,0.60);
  }
  .let-box-simple{
    text-align center;
  }
  .let-box-simple h4{
    font-size 30px;
    color: #34414C;
    padding-top 40px;
  }
  .let-box-simple p{
    font-size: 14px;
    color: #34414C;
    margin-top 14px;  
  }
  .lbd-left{
    float left;
    width 40%;
    text-align center;
    color #FFA90C;
  }
  .lbd-left h4{
    font-size 30px;
    padding-top 40px;
  }
  .lbd-left p{
    font-size 20px;
    margin-top 12px;  
  }
  .lbd-right{
    float left;
    width 60%;
    padding-top 56px;  
  }
  .lbd-right p{
    font-size 14px;
    line-height 1.5;
    color: #7E8A95;
  }
  .lbd-right p span{
    color: #34414C;
  }
  .let-box-line{
    position absolute;
    right 0;
    top 36px;
    width 1px;
    height 70px;
    background #DEE2E4;
  }
  .lift-error-man{
    box-sizing border-box;
    float left;
    width 19%;
    height 140px;
    background #fff;
    color #000;
    border-left 1px solid #DEE2E4;
  }



  
  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 3%;
    text-align center;
    text-overflow: clip;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 14%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 6%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 12%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 14%;
  }
  .llt-thead .llt-th:nth-child(6),.llt-tbody .llt-td:nth-child(6){
    width 9%;
  }
  .llt-thead .llt-th:nth-child(7),.llt-tbody .llt-td:nth-child(7){
    width 7%;
  }
  .llt-thead .llt-th:nth-child(8),.llt-tbody .llt-td:nth-child(8){
    width 18%;
  }
  .llt-thead .llt-th:nth-child(9),.llt-tbody .llt-td:nth-child(9){
    width 16%;
  }
  

}


/* 适配 */
@media screen and (max-width: 1550px) {
  #LiftList{
    .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
      width 7%
    }
    .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
      width 10%;
    }
    .llt-thead .llt-th:nth-child(8),.llt-tbody .llt-td:nth-child(8){
      width 20%;
    }
    .llt-thead .llt-th:nth-child(9),.llt-tbody .llt-td:nth-child(9){
      width 18%;
    }
  }

}


</style>
