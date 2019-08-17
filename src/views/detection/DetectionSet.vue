<template>
  <div id="DetectionSet">
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
      </div>

      <div class="detAdd-content">
        <div class="detSet-t clearfix">
          <div class="detSet-tnav clearfix">
            <div class="detSet-tnav-box on" @click="goDetSet('/detection-set')">
              <div class="detSet-tnav-box-name">已设监测（20）</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
            <div class="detSet-tnav-box" @click="goDetSet('/detection-set-model')">
              <div class="detSet-tnav-box-name">可添加监测（20）</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
            <div class="detSet-tnav-box" @click="goDetSet('/detection-set-log')">
              <div class="detSet-tnav-box-name">更改日志</div>
              <div class="detSet-tnav-box-line"></div>
            </div>
          </div>
          <div class="detSet-ttype clearfix">
            <radio-group :items="exceptItem" :value.sync="exceptValue" style="display: inline-block"></radio-group>
          </div>

        </div>

        <div class="detSet-list clearfix">
          <div class="dset-box">
            <div class="dset-box-heading">
              <div class="dset-box-title">
                <span>电动机外壳温度异常</span>
                <el-tooltip class="item" effect="dark" content="提示文字了肯定是缴费卡时间段是离开的飞机了快速建档立卡副驾驶的离开福建省" placement="top">
                  <i class="dset-box-title-icon"></i>
                </el-tooltip>
              </div>
              <div class="dset-box-type dset-box-type-green">预警</div>
            </div>
            <div class="dset-box-info">
              <div class="dset-bi-list">
                <span>如果：</span>机房-电动机-外壳的温度/持续5分钟/大于/50℃，或机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃
              </div>
              <div class="dset-bi-list">
                <span>就执行：</span>后台通知、手机短信通知维保经理
              </div>
            </div>
            <div class="dset-box-operate clearfix">
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-remove"></div>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box2">
                <el-switch v-model="testSwitch" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 ></el-switch>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-edit"></div>
              </div>
            </div>
          </div>

          <div class="dset-box dsetDisable">
            <div class="dset-box-heading">
              <div class="dset-box-title">
                <span>电动机外壳温度异常</span>
                <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                  <i class="dset-box-title-icon"></i>
                </el-tooltip>
              </div>
              <div class="dset-box-type dset-box-type-purple">违规</div>
            </div>
            <div class="dset-box-info">
              <div class="dset-bi-list">
                <span>如果：</span>机房-电动机-外壳的温度/持续5分钟/大于/50℃，或机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃
              </div>
              <div class="dset-bi-list">
                <span>就执行：</span>后台通知、手机短信通知维保经理
              </div>
            </div>
            <div class="dset-box-operate clearfix">
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-remove"></div>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box2">
                <el-switch v-model="testSwitch" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 ></el-switch>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-edit"></div>
              </div>
            </div>
          </div>

          <div class="dset-box">
            <div class="dset-box-heading">
              <div class="dset-box-title">
                <span>电动机外壳温度异常</span>
                <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                  <i class="dset-box-title-icon"></i>
                </el-tooltip>
              </div>
              <div class="dset-box-type dset-box-type-yellow">故障</div>
            </div>
            <div class="dset-box-info">
              <div class="dset-bi-list">
                <span>如果：</span>机房-电动机-外壳的温度/持续5分钟/大于/50℃，或机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃
              </div>
              <div class="dset-bi-list">
                <span>就执行：</span>后台通知、手机短信通知维保经理
              </div>
            </div>
            <div class="dset-box-operate clearfix">
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-remove"></div>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box2">
                
                <el-switch v-model="testSwitch" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 ></el-switch>

              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-edit"></div>
              </div>
            </div>
          </div>

          <div class="dset-box dsetDisable">
            <div class="dset-box-heading">
              <div class="dset-box-title">
                <span>电动机外壳温度异常</span>
                <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
                  <i class="dset-box-title-icon"></i>
                </el-tooltip>
              </div>
              <div class="dset-box-type dset-box-type-purple">违规</div>
            </div>
            <div class="dset-box-info">
              <div class="dset-bi-list">
                <span>如果：</span>机房-电动机-外壳的温度/持续5分钟/大于/50℃，或机房-电动机-外壳的温度10秒内/骤增/骤减大于10℃
              </div>
              <div class="dset-bi-list">
                <span>就执行：</span>后台通知、手机短信通知维保经理
              </div>
            </div>
            <div class="dset-box-operate clearfix">
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-remove"></div>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box2">
                <el-switch v-model="testSwitch" active-color="#E2E6E8" inactive-color="#E3E7E9" :active-value="1" :inactive-value="0" :width=28 ></el-switch>
              </div>
              <div class="dset-bo-line"></div>
              <div class="dset-bo-box">
                <div class="dset-bo-icon dset-bo-icon-edit"></div>
              </div>
            </div>
          </div>
          

        </div>

        <!-- 分页 -->
        <div class="detSet-pager">
      
          <!-- <el-pagination
            @size-change="pageSizeChange"
            @current-change="currentPageChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="prev, pager, next, sizes, jumper"
            :total="totalPage">
          </el-pagination> -->

        </div>



      </div>


    </div>

    <!-- 底部 -->
    <footer-temp></footer-temp>

    

  </div>
</template>

<script>
import api from '../../api.js'
import RadioGroup from '../../components/RadioGroup'
import Footer from '../common/fotter'
export default {
  data() {
    return {
      parentCode: '',
      liftPerson: '',
      exceptItem: [
        {label: '全部', value: -1},
        {label: '预警', value: 0},
        {label: '违规', value: 1},
        {label: '故障', value: 2},
        {label: '事件', value: 3}
      ],
      exceptValue: -1,
      testSwitch: '',
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

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

    // 页面跳转
    goDetSet(path) {
      this.$router.push({
        path: path,
        query: {
          regCode: this.parentCode
        }
      })
    },

  },
  components: {
    'radio-group': RadioGroup,
    'footer-temp': Footer,


  },
  watch: {
    // 异常分类筛选
    exceptValue(val, oldVal) {
      console.log(val)
    }
  },
}
</script>

<style lang="stylus" scoped>
#DetectionSet{
  @import '../../assets/stylus/xymStyle.styl'


}

</style>
