<template>
  <div id="DetectionWorkLog">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/lift-list')">数字电梯</span>
        <em>/</em>
        <span @click="$router.go(-1)">电梯检测</span>
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
          <div class="llcb-search">
            <search-code></search-code>
          </div>
        </div>


        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <el-checkbox v-model="checkedAll" @change="checkedAllChange">{{test}}</el-checkbox>
              </div>
              <div class="llt-th">工单编号</div>
              <div class="llt-th">作业类型</div>
              <div class="llt-th">作业人员</div>
              <div class="llt-th">处理结果</div>
              <div class="llt-th">完成时间</div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="llt-tr clearfix" v-for="(item, i) in workLogList" :key="i">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <el-checkbox-group v-model="checkedLogs" @change="checkedLogsChange">
                    <el-checkbox :label="item.taskId" :key="item.taskId">{{test}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="llt-td">{{item.taskId}}</div>
                <div class="llt-td">{{item.taskType}}</div>
                <div class="llt-td">{{item.person}}</div>
                <div class="llt-td">{{item.result}}</div>
                <div class="llt-td">{{item.completeTime}}</div>
                <div class="llt-td"><span class="llt-td-a" @click="goWorkLogDetail(item.taskId)">查看详情</span></div>
              </div>
            </div>
            <div class="list-no-data" v-show="workLogList.length == 0">暂无数据</div>

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
import SearchCode from '../../components/SearchCode'



export default {
  data() {
    return {
      parentCode: '',
      liftPerson: '',
      test: '',
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

      // 工单
      checkedAll: false,
      checkedLogs: [],
      workLogOptions: [], // 用于全选
      workLogList: [],


      detWorkLogParams: {
        elevCode: '',
        offset: 1, 
        limit: 10,
        order: true, // 时间排序
        column: 'id',
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

    // 查询工作记录
    this.getWorkLog()

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

    // 查询工作记录
    getWorkLog() {
      // this.workLogList= [{
      //   taskId: 'aaaaaaaaa',
      //   taskType: 'bbb',
      //   person: 'ccc',
      //   result: 'dddd',
      //   completeTime: 'eee',
      // }]

      this.workLogList = []

      this.detWorkLogParams.elevCode = this.parentCode
      api.detection.getLogList(this.detWorkLogParams).then(res => {
        console.log('工作记录', res.data)
        let result = res.data.data.records
        this.workLogOptions = []
        let taskTypeVal
          switch(item.taskType) {
            case 1015:
              taskTypeVal = '例行维保';
              break;
            case 1090:
              taskTypeVal = '季度维保';
              break;
            case 1180:
              taskTypeVal = '半年维保';
              break;
            case 1365:
              taskTypeVal = '年度维保';
              break;
            case 2000:
              taskTypeVal = '故障处理';
              break;
            case 4000:
              taskTypeVal = '事故救援';
              break;
            default:
              taskTypeVal = '作业类型';
          }

        result.forEach((item, i) => {
          let workLogObj = {
            taskId: item.taskId,
            taskType: item.taskType,
            person: '',
            result: item.result,
            completeTime: item.recordTime,
          }
          this.workLogOptions.push(item.taskId) // 全选选项，填入id
          let staffArr = []
          // 员工
          item.mp.forEach(secItem => {
            staffArr.push(secItem.staffName)
          })
          workLogObj.person = staffArr.join('，') ? staffArr.join('，') : '无'
          this.workLogList.push(workLogObj)
        })

        // 分页
        this.currentPage = res.data.data.current
        this.totalPage = res.data.data.total ? res.data.data.total : 1
        this.pageSize = res.data.data.size

      })


    },

    // 工作记录多选
    checkedLogsChange(val) {
      let count = this.workLogList.length
      this.checkedAll = val.length === count ? true : false
    },

    // 全选
    checkedAllChange(checkedBoolean) {
      this.checkedLogs = checkedBoolean ? this.workLogOptions : []
    },

    // 当前分页改变
    currentPageChange(current) {
      this.detWorkLogParams.offset = current
    },

    // 分页大小改变
    pageSizeChange(size) {
      this.detWorkLogParams.limit = size
    },

    // 跳转到工单详情
    goWorkLogDetail(logId) {
      this.$router.push({name: 'missionDetail', params: {'id': logId}})
    },

  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,


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
    text-overflow: clip;
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
