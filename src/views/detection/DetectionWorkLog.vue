<template>
  <div id="DetectionWorkLog">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span>电梯检测</span>
        <em>/</em>
        <span class="on">作业记录</span>
      </div>

      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{regCode}}</li>
            <li><span>电梯负责人：</span>{{liftPerson ? liftPerson : '无'}}</li>
            <li><span>电梯地址：</span>{{localArea}} {{address}}</li>
          </ul>
        </div>
      </div>

      <div class="lift-list">
        <div class="lift-list-title">作业记录</div>
        <div class="det-work-op clearfix">
          <div class="lift-detail-operate-btn">打印</div>

          <!-- TODO搜索工单 -->

        </div>


        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <el-checkbox v-model="checkedAll" @change="checkedAllChange"></el-checkbox>
              </div>
              <div class="llt-th">工单编号</div>
              <div class="llt-th">作业类型</div>
              <div class="llt-th">作业人员</div>
              <div class="llt-th">处理结果</div>
              <div class="llt-th"><div class="llt-th-sort" :class="sortClass" @click="warnSort">完成时间</div></div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <input type="checkbox">
                </div>
                <div class="llt-td">31104403002014002777</div>
                <div class="llt-td">例行维保</div>
                <div class="llt-td">覃一，林依晨</div>
                <div class="llt-td">合格</div>
                <div class="llt-td">2018-01-01 19:20:21</div>
                <div class="llt-td"><span class="llt-td-a">查看详情</span></div>
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




  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      parentCode: '',
      liftPerson: '',
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

      detWorkLogParams: {
        offset: 1, 
        limit: 10,
      },
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
  },
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()

    // 获取电梯详情
    this.getLiftDetail()

  },
  methods: {

    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
        console.log('res', res)
        let detail = res.data.data
        this.regCode = detail.regCode
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address

      })
    },

    // 获取电梯负责人
    getLiftPerson() {
      this.liftPerson = ''
      let personArr = []
      api.lift.getLiftPerson(this.parentCode).then(res => {
        if (res.data.data.personOne) {
          personArr.push(res.data.data.personOne)
        }
        if (res.data.data.personTwo) {
          personArr.push(res.data.data.personTwo)
        }
        this.liftPerson = personArr.join('、')
      })
    },

    // 当前分页改变
    currentPageChange(current) {
      this.detWorkLogParams.offset = current
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.detWorkLogParams.limit = size
    },

  },
  components: {
    'footer-temp': Footer,

  }
}
</script>

<style lang="stylus" scoped>
#DetectionWorkLog{
  @import '../../assets/stylus/xymStyle.styl'

  .det-work-op{
    padding 20px;
  }

  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 3%;
    text-align center;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 16%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 10%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 32%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 13%;
  }
  .llt-thead .llt-th:nth-child(6),.llt-tbody .llt-td:nth-child(6){
    width 17%;
  }
  .llt-thead .llt-th:nth-child(7),.llt-tbody .llt-td:nth-child(7){
    width 9%;
  }


}



</style>
