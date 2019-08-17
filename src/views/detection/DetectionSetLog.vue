<template>
  <div id="DetectionSetLog">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/lift-list')">数字电梯</span>
        <em>/</em>
        <span class="on">设置监测</span>
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
        <div class="det-heading-record" @click="goElevDetail">电梯档案</div>
      </div>

      <div class="detAdd-content">
        <div class="detSet-t clearfix">
          <div class="detSet-tnav clearfix">
            <div class="detSet-tnav-box" @click="goSetModel('added')">
              <div class="detSet-tnav-box-name">已设监测（{{maintenModelTotal}}）</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
            <div class="detSet-tnav-box" @click="goSetModel('canAdd')">
              <div class="detSet-tnav-box-name">可添加监测（{{giModelTotal}}）</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
            <div class="detSet-tnav-box on">
              <div class="detSet-tnav-box-name" @click="goDetSet('/detection-set-log')">更改日志</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
          </div>
        </div>

        <div class="changelog-content">

          <div class="changelog-item" v-for="(item, i) in changeLogList" :key="i">
            <div class="changelog-item-title">
              <div class="changelog-item-title-icon" :class="item.changeLogs[0].diagnTypeAfter | formatDiagnTypeClass">{{item.diagnMonitor.diagnType | formatDiagnType}}</div>
              <div class="changelog-item-title-h">{{item.diagnMonitor.name}}</div>
              <div class="changelog-item-title-renum">{{item.changeLogs.length}}条记录</div>
              <div class="changelog-item-title-btn" @click="currentWrapShow(i)">{{currentWrap == i ? '收起' : '展开'}}</div>
            </div>

            <div class="changelog-box">
              <div class="changelog-box-thead clearfix">
                <div class="changelog-row1">更改后</div>
                <div class="changelog-row2">更改前</div>
                <div class="changelog-row3">操作人</div>
                <div class="changelog-row4">更改时间</div>
              </div>
              <div class="changelog-hideWrap" :class="currentWrap == i ? 'wrapShow' : ''">
                <div class="changelog-box-tbody clearfix" v-for="(clogItem, clogI) in item.changeLogs" :key="clogI">
                  <!-- 更改后当为空值 -->
                  <div class="changelog-row1" v-if="!clogItem.transformBeforCons.items.length && clogItem.transformAfterCons.items.length">
                    已设为监测
                  </div>
                  <div class="changelog-row1" v-else-if="clogItem.transformBeforCons.items.length && !clogItem.transformAfterCons.items.length">
                    已移除
                  </div>
                  <div class="changelog-row1" v-else-if="clogItem.enabledAfter !== clogItem.enabledBefor">
                    {{clogItem.enabledAfter == 1 ? '开启' : '关闭'}}
                  </div>
                  <div class="changelog-row1" v-else>

                    <div class="changelog-row-p">
                      <em v-for="(consItem, consI) in clogItem.transformAfterCons.items" :key="consItem.id">
                        <em class="clbt-em" v-if="clogItem.transformAfterCons.items.length > 1 && consI !== 0">，{{clogItem.transformAfterCons.jwCN}}</em>
                        {{consItem.monitorObjCN}}的{{consItem.monitorValCN}}{{consItem.calcTimeCN ? '/' + consItem.calcTimeCN : ''}}/{{consItem.calcOperatorCN}}/{{consItem.calcThreshold}}{{consItem.calcUnit}}
                      </em>
                    </div>

                    <div class="changelog-row-p">
                      <em>
                        {{clogItem.transformAfterTasks.notiTypesCN}}{{clogItem.transformAfterTasks.userTypesCN}}
                      </em>
                    </div>
                  </div>



                  <!-- 更改前当为空值 -->
                  <div class="changelog-row2" v-if="!clogItem.transformBeforCons.items.length && clogItem.transformAfterCons.items.length">
                    未添加监测
                  </div>
                  <div class="changelog-row2" v-else-if="clogItem.enabledBefor !== clogItem.enabledAfter && clogItem.transformBeforCons.items.length && clogItem.transformAfterCons.items.length">
                    {{clogItem.enabledBefor == 1 ? '开启' : '关闭'}}
                  </div>
                  <div class="changelog-row2" v-else>
                    <div class="changelog-row-p">
                      <em v-for="(consItem, consI) in clogItem.transformBeforCons.items" :key="consI">
                         <em class="clbt-em" v-if="clogItem.transformBeforCons.items.length > 1 && consI !== 0">，{{clogItem.transformBeforCons.jwCN}}</em>
                        {{consItem.monitorObjCN}}的{{consItem.monitorValCN}}{{consItem.calcTimeCN ? '/' + consItem.calcTimeCN : ''}}/{{consItem.calcOperatorCN}}/{{consItem.calcThreshold}}{{consItem.calcUnit}}
                      </em>
                    </div>
                    <div class="changelog-row-p">
                      <em>
                        {{clogItem.transformBeforTasks.notiTypesCN}}{{clogItem.transformBeforTasks.userTypesCN}}
                      </em>
                    </div>
                  </div>


                  <div class="changelog-row3">{{clogItem.operName || '未知'}}</div>
                  <div class="changelog-row4">{{clogItem.createTime}}</div>
                </div>
      
              </div>
              
            </div>


          </div>

          <div class="list-no-data" v-show="changeLogList.length == 0">暂无数据</div>

        </div>

        <!-- 分页 -->
        <div class="detSet-pager">
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

    <!-- 底部 -->
    <footer-temp></footer-temp>

  </div>
</template>

<script>
import api from '../../api.js'
import Footer from '../common/fotter'
import xymFun from '../../utils/xymFun'
export default {
  data() {
    return {
      parentCode: '',
      liftPerson: '',
      currentWrap: 'allHide',
      currentWrapCN: '展开',
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',
      changeLogList: [],
      changeLogParams: {
        offset: 1,
        limit: 10,
        elevid: 0,
        // corpid: 0, // TODO
      },
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      maintenModelTotal: 0,
      giModelTotal: 0,
      policyJson: {},

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
    this.changeLogParams.elevid = this.$route.query.regCode
  },
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()

    // 获取电梯详情
    this.getLiftDetail()

    // 获取更改记录
    this.getChangeLog()

  },
  methods: {
    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
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

    // 获取更新数量
    getMonitorLength() {
      let detSetModelMaintenParams = {
        offset: 1,
        limit: 200,
        type: -1,
        elevid: this.parentCode,
      }
      let detSetModelParams = {
        offset: 1,
        limit: 200,
      }
      api.detection.getMaintenTemplate(detSetModelMaintenParams).then(res => {
        this.maintenModelTotal = res.data.data.records.length
      })
      api.detection.getAllMonitorTemplate(detSetModelParams).then(res => {
        this.giModelTotal = res.data.data.records.length
      })
    },

    // 获取更改记录
    getChangeLog() {
      let that = this
      if (JSON.stringify(this.policyJson) == '{}') {
        // 获取重组后基础规则
        xymFun.transformPolicy().then(json => {
          this.policyJson = json // 保存重组后的规则对象
          getList()
        })
      } else {
        getList()
      }
      this.getMonitorLength() // 更新数量

      function getList() {
        that.changeLogList = []

        api.detection.changeLog(that.changeLogParams).then(res => {
          console.log('记录', res.data)
          // that.changeLogList = res.data.data.records
          that.changeLogList = res.data.data.records

          // 最终组装数据
          let changeLogList2 = [{
            diagnMonitor: {},
            changeLogs: [
              {
                id: '',
                snapBefor: '',
                snapAfter: '',


                transformBeforCons: {
                  jw: '',
                  jwCN: '',
                  items: []
                },
                transformAfterCons: {},
                transformBeforTasks: {},
                transformAfterTasks: {},
              }
            ]
          }]


          that.changeLogList.forEach((item, i) => {
            item.changeLogs.forEach((secondItem, secondI) => {
              // secondItem为单条更改前后的总数据
              // 如果更改前不为空，才执行
              secondItem.enabledBefor = 0
              if (secondItem.snapBefor !== "") {
                let snapBeforData = JSON.parse(secondItem.snapBefor)
                let beforConditions = JSON.parse(snapBeforData.conditions)
                let beforTasks = JSON.parse(snapBeforData.tasks)[0]

                // 用于渲染页面
                secondItem.transformBeforCons = {}
                secondItem.transformBeforTasks = {}

                // 添加开启关闭字段
                secondItem.enabledBefor = snapBeforData.enabled
                secondItem.diagnTypeBefor = snapBeforData.diagnType

                // 处理更改前条件
                if (beforConditions.jw == 1) {
                  secondItem.transformBeforCons.jwCN = '或'
                } else {
                  secondItem.transformBeforCons.jwCN = '且'
                }
                secondItem.transformBeforCons.items = []
                beforConditions.items.forEach(thirdItem => {
                  let policyOneObj = xymFun.deepClone(that.policyJson[thirdItem['policyId']]) // 获取封装好的单条规则
                  policyOneObj.calcThreshold = thirdItem.threshold;
                  policyOneObj.calcTimeCN = thirdItem.timeInSeconds ? thirdItem.timeInSeconds : 0;
                  policyOneObj.conditionFreqency = thirdItem.freqency ? thirdItem.freqency : 0;

                  secondItem.transformBeforCons.items.push(policyOneObj)
                })

                // 处理更改前任务
                let userTypesCNTemp = []
                beforTasks.userTypes.forEach(userItem => {
                  if (userItem === 0) {
                    userTypesCNTemp.push('维保人员')
                  } else if (userItem === 1) {
                    userTypesCNTemp.push('维保主管')
                  }
                })
                secondItem.transformBeforTasks.userTypesCN = userTypesCNTemp.join('、')
                let notiTypesTemp = []
                beforTasks.notiTypes.forEach(notiItem => {
                  if (notiItem === 0) {
                    notiTypesTemp.push('后台通知')
                  } else if (notiItem === 1) {
                    notiTypesTemp.push('手机短信通知')
                  }
                })
                secondItem.transformBeforTasks.notiTypesCN = notiTypesTemp.join('、')
              } else {
                secondItem.transformBeforCons = {
                  items: []
                }
                secondItem.transformBeforTasks = {
                  items: []
                }
              }

              // 如果更改后不为空，才执行
              secondItem.enabledAfter = 0
              if (secondItem.snapAfter !== "") {
                let snapAfterData = JSON.parse(secondItem.snapAfter)
                let afterConditions = JSON.parse(snapAfterData.conditions)
                let afterTasks = JSON.parse(snapAfterData.tasks)[0]

                // 用于渲染页面
                secondItem.transformAfterCons = {}
                secondItem.transformAfterTasks = {}

                // 添加开启关闭字段
                secondItem.enabledAfter = snapAfterData.enabled
                secondItem.diagnTypeAfter = snapAfterData.diagnType



                // 处理更改后条件
                if (afterConditions.jw == 1) {
                  secondItem.transformAfterCons.jwCN = '或'
                } else {
                  secondItem.transformAfterCons.jwCN = '且'
                }
                secondItem.transformAfterCons.items = []
                afterConditions.items.forEach(thirdItemAfter => {
                  // var policyOneObjAfter = new Object()
                  let policyOneObjAfter = xymFun.deepClone(that.policyJson[thirdItemAfter['policyId']]) // 获取封装好的单条规则

                  policyOneObjAfter.calcThreshold = parseInt(thirdItemAfter.threshold);
                  //policyOneObjAfter['calcThresholdAfter'] = parseInt(thirdItemAfter.threshold);
                  policyOneObjAfter.calcTimeCN = thirdItemAfter.timeInSeconds ? thirdItemAfter.timeInSeconds : 0;
                  policyOneObjAfter.conditionFreqency = thirdItemAfter.freqency ? thirdItemAfter.freqency : 0;
                  console.log('policyOneObjAfter', JSON.stringify(policyOneObjAfter['calcThresholdAfter']))


                  secondItem.transformAfterCons.items.push(policyOneObjAfter)
                })
                console.log('secondItem', JSON.stringify(secondItem)) // secondItem出问题
                // console.log('afterConditions.items', JSON.stringify(afterConditions.items))



                // 处理更改后任务
                let userTypesCNTempAfter = []
                afterTasks.userTypes.forEach(userItem => {
                  if (userItem === 0) {
                    userTypesCNTempAfter.push('维保人员')
                  } else if (userItem === 1) {
                    userTypesCNTempAfter.push('维保主管')
                  }
                })
                secondItem.transformAfterTasks.userTypesCN = userTypesCNTempAfter.join('、')
                let notiTypesTempAfter = []
                afterTasks.notiTypes.forEach(notiItem => {
                  if (notiItem === 0) {
                    notiTypesTempAfter.push('后台通知')
                  } else if (notiItem === 1) {
                    notiTypesTempAfter.push('手机短信通知')
                  }
                })
                secondItem.transformAfterTasks.notiTypesCN = notiTypesTempAfter.join('、')
              } else {
                secondItem.transformAfterCons = {
                  items: []
                }
                secondItem.transformAfterTasks = {
                  items: []
                }
              }
              
            })
              
          })

          console.log('消息list', JSON.stringify(that.changeLogList))

          // 分页
          that.currentPage = res.data.data.current
          that.totalPage = res.data.data.total

        })


      }
      
    },

    // 当前分页改变
    currentPageChange(current) {
      this.changeLogParams.offset = current
      this.getChangeLog()

    },

    // 分页大小改变
    pageSizeChange(size) {
      this.changeLogParams.limit = size
      this.getChangeLog()      
    },

    // 记录收缩和展开
    currentWrapShow(i) {
      if (this.currentWrap == i) {
        this.currentWrap = 'allHide'  
        this.currentWrapCN = '展开'
      } else {
        this.currentWrap = i
        this.currentWrapCN = '收起'
      }
    },

    // 跳转到监测页面
    goSetModel(modelNav) {
      sessionStorage.setItem('modelNav', modelNav)
      this.$router.push({
        path: '/detection-set-model',
        query: {
          regCode: this.parentCode
        },
      })

    },

    // 跳转到电梯档案
    goElevDetail() {
      this.$router.push({
        path: '/lift-detail',
        query: {
          regCode: this.parentCode
        }
      })
    }

  },
  components: {
    'footer-temp': Footer,
  },
  filters: {
    formatDiagnType: function (value) {
      // 0-事故,1-故障,2-违规,3-预警
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
    formatDiagnTypeClass: function (value) {
      // 0-事故,1-故障,2-违规,3-预警
      if (value == 1) {
        return 'faultColor'
      } else if (value == 2) {
        return 'violationColor'
      } else if (value == 3) {
        return 'warningColor'
      } else {
        return 'accidentColor'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
#DetectionSetLog{
  @import '../../assets/stylus/xymStyle.styl'

  .changelog-item{
    margin 0 20px;
    border-bottom: 1px dashed #D8DDDF;
    padding 15px 0;
  }
  .changelog-item-title{
    position relative;
  }
  .changelog-item-title-icon{
    position absolute;
    top 4px;
    left 0;
    width 36px
    height 16px;
    line-height 16px;
    text-align center
    font-size: 10px;
    color: #000;
    border-radius: 4px;
    border 1px solid #000
  }
  .changelog-item-title-icon.warningColor{
    border 1px solid $warningColor
  }
  .changelog-item-title-icon.violationColor{
    border 1px solid $violationColor
  }
  .changelog-item-title-icon.faultColor{
    border 1px solid $faultColor
  }
  .changelog-item-title-icon.accidentColor{
    border 1px solid $accidentColor
  }
  .changelog-item-title-h{
    font-size: 16px;
    color: #34414C;
    padding-left 40px;
    font-weight bold;
    line-height 24px;
  }
  .changelog-item-title-renum{
    position absolute;
    right 60px;
    top: 0;
    line-height 24px;
    font-size: 14px;
    color: #34414C;
  }
  .changelog-item-title-btn{
    position absolute;
    right 10px;
    top: 0;
    line-height 24px;
    font-size: 14px;
    color: #4272FF;
    cursor pointer
  }

  .changelog-row1{
    box-sizing border-box
    float left
    width 36%
    padding: 0 40px
  }
  .changelog-row2{
    box-sizing border-box
    float left
    width 36%
    padding: 0 40px
  }
  .changelog-row3{
    box-sizing border-box
    float left
    width 11%
    padding: 0 40px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  }
  .changelog-row4{
    box-sizing border-box
    float left
    width 17%
    padding: 0 40px
  }
  .changelog-box-thead .changelog-row1,.changelog-box-thead .changelog-row2,.changelog-box-thead .changelog-row3,.changelog-box-thead .changelog-row4{
    font-size: 14px;
    color: #7E8A95;
    line-height 20px;
    margin 15px 0
    overflow hidden;
    text-overflow ellipsis;
    white-space nowrap
  }
  .changelog-box-tbody .changelog-row1,.changelog-box-tbody .changelog-row2,.changelog-box-tbody .changelog-row3,.changelog-box-tbody .changelog-row4{
    font-size: 14px;
    color: #34414C;
    line-height: 20px;
    margin-bottom 10px;
  }
  .changelog-row-p em{
    font-style: normal;
  }
  .changelog-hideWrap{
    height 18px
    overflow hidden
  }
  .changelog-hideWrap.wrapShow{
    height auto
    max-height 180px
    overflow auto
  }


}

</style>
