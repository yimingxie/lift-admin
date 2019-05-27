<template>
  <div id="LiftList">
    <div class="container">
      <div class="lift-error clearfix">
        <div class="lift-error-sum">
          <div class="les-box">
            <div class="les-box-top">
              <div class="les-box-top-data"><span>267</span>异常电梯数</div>
              <div class="les-box-top-day">今日</div>
            </div>
            <div class="les-box-bottom clearfix">
              <p>电梯总数：10000</p>
              <p>未处理：<span>25</span></p>
              <p>已处理：76</p>
            </div>
          </div>
        </div>

        <div class="lift-error-type clearfix">
          <div class="let-box" @mouseenter="leType.show1=false" @mouseleave="leType.show1=true">
            <div class="let-box-line"></div>
            <div class="let-box-simple" v-show="leType.show1">
              <h4>13</h4>
              <p>事故告警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show1">
              <div class="lbd-left">
                <h4>13</h4>
                <p>事故</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>6</span></p>
                <p>已诊断：7</p>
              </div>
            </div>
          </div>

          <div class="let-box" @mouseenter="leType.show2=false" @mouseleave="leType.show2=true">
            <div class="let-box-line"></div>
            <div class="let-box-simple" v-show="leType.show2">
              <h4>24</h4>
              <p>故障告警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show2">
              <div class="lbd-left">
                <h4>24</h4>
                <p>故障</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>6</span></p>
                <p>已诊断：7</p>
              </div>
            </div>
          </div>

          <div class="let-box" @mouseenter="leType.show3=false" @mouseleave="leType.show3=true">
            <div class="let-box-line"></div>
            <div class="let-box-simple" v-show="leType.show3">
              <h4>189</h4>
              <p>违规告警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show3">
              <div class="lbd-left">
                <h4>189</h4>
                <p>违规</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>6</span></p>
                <p>已诊断：7</p>
              </div>
            </div>
          </div>

          <div class="let-box" @mouseenter="leType.show4=false" @mouseleave="leType.show4=true">
            <div class="let-box-simple" v-show="leType.show4">
              <h4>40</h4>
              <p>设备预警电梯</p>
            </div>
            <div class="let-box-detail clearfix" v-show="!leType.show4">
              <div class="lbd-left">
                <h4>40</h4>
                <p>预警</p>
              </div>
              <div class="lbd-right">
                <p>待诊断：<span>6</span></p>
                <p>已诊断：7</p>
              </div>
            </div>
          </div>

        </div>

        <div class="lift-error-man">
          
          <div class="les-box">
            <div class="les-box-top">
              <div class="les-box-top-data"><span>267</span>异常外派人员</div>
              <div class="les-box-top-day">今日</div>
            </div>
            <div class="les-box-bottom clearfix">
              <p style="width: 100%;">异常作业及时率：92%</p>
            </div>
          </div>

        </div>
        


      </div>

      <div class="lift-list">
        <div class="lift-list-title">数字电梯</div>
        <div class="ll-choose">
          <div class="ll-choose-top clearfix">
            <!-- TODO 省市联动筛选 -->
            <div class="llct-area"></div>

            <div class="llct-line"></div>

            
            <div class="llct-type clearfix">
              <em>异常分类：</em>
              <!-- <span class="on">全部</span>
              <span>预警</span>
              <span>违规</span>
              <span>故障</span>
              <span>事故</span> -->
              <radio-group :items="exceptItem" :value.sync="exceptValue" style="display: inline-block"></radio-group>

            </div>
            

          </div>

          <div class="ll-choose-bottom clearfix">
            <div class="llcb-operate">
              <div class="llcb-btn info">+ 添加电梯</div>
              <div class="llcb-btn">批量录入</div>
              <div class="llcb-btn">删除电梯</div>
            </div>
            <div class="llcb-search">
              <div class="llcb-search-box">
                <input class="lsearch-input" type="text" placeholder="搜索电梯注册码/内部编号/详细地址">
                <input class="lsearch-submit" type="button" value="">
              </div>

              <!-- TODO 搜索提示下拉待做 -->
              <div class="llcb-search-tips"></div>

            </div>
          </div>
          
        </div>

        <div class="ll-table">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">
                <input type="checkbox">
              </div>
              <div class="llt-th">电梯注册代码</div>
              <div class="llt-th">内部编号</div>
              <div class="llt-th">区域-片区</div>
              <div class="llt-th">详细地址</div>
              <div class="llt-th">在线/设备</div>
              <div class="llt-th">检测数</div>
              <div class="llt-th">异常告警</div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="llt-tr">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <input type="checkbox">
                </div>
                <div class="llt-td">31104403002014002777</div>
                <div class="llt-td">DT01</div>
                <div class="llt-td">深圳市-南山区-蛇口</div>
                <div class="llt-td">平安大厦</div>
                <div class="llt-td">
                  <p class="llt-td-device"><span class="llt-td-a">4</span>/25</p>
                </div>
                <div class="llt-td">31</div>
                <div class="llt-td">
                  <p class="llt-td-type">预警<span class="warning">2</span></p>
                  <p class="llt-td-type">违规<span class="illegal">4</span></p>
                  <p class="llt-td-type">故障<span class="fault">2</span></p>
                  <p class="llt-td-type">事故<span class="accident">1</span></p>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a">电梯档案</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">设置监控</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">诊断</span>
                </div>
              </div>
            </div>

            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <input type="checkbox">
                </div>
                <div class="llt-td">31104403002014002777</div>
                <div class="llt-td">DT01</div>
                <div class="llt-td">深圳市-南山区-蛇口</div>
                <div class="llt-td">平安大厦</div>
                <div class="llt-td">
                  <p class="llt-td-device"><span class="llt-td-a">4</span>/25</p>
                </div>
                <div class="llt-td">31</div>
                <div class="llt-td">
                  <p class="llt-td-type">预警<span class="warning">2</span></p>
                  <p class="llt-td-type">违规<span class="illegal">4</span></p>
                  <p class="llt-td-type">故障<span class="fault">2</span></p>
                  <p class="llt-td-type">事故<span class="accident">1</span></p>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a">电梯档案</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">设置监控</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">诊断</span>
                </div>
              </div>
            </div>

            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">
                  <input type="checkbox">
                </div>
                <div class="llt-td">31104403002014002777</div>
                <div class="llt-td">DT01</div>
                <div class="llt-td">深圳市-南山区-蛇口</div>
                <div class="llt-td">平安大厦</div>
                <div class="llt-td">
                  <p class="llt-td-device"><span class="llt-td-a">4</span>/25</p>
                </div>
                <div class="llt-td">31</div>
                <div class="llt-td">
                  <p class="llt-td-type">预警<span class="warning">2</span></p>
                  <p class="llt-td-type">违规<span class="illegal">4</span></p>
                  <p class="llt-td-type">故障<span class="fault">2</span></p>
                  <p class="llt-td-type">事故<span class="accident">1</span></p>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a">电梯档案</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">设置监控</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">诊断</span>
                </div>
              </div>
            </div>

            
          </div>
          
        </div>

      </div>

      

    </div>

    <!-- 底部 -->
    <footer-temp></footer-temp>

  </div>
</template>

<script>
import RadioGroup from '../../components/RadioGroup'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      exceptItem: [
        {label: '全部', value: 0},
        {label: '预警', value: 1},
        {label: '违规', value: 2},
        {label: '故障', value: 3},
        {label: '事故', value: 4}
      ],
      exceptValue: 0,
      leType: {
        show1: true,
        show2: true,
        show3: true,
        show4: true,
      }

    }
  },
  mounted() {

  },
  methods: {

  },
  watch: {
    exceptValue(val, oldVal) {
      console.log(val + '=---=-=-' + oldVal)
    }
  },
  components: {
    'radio-group': RadioGroup,
    'footer-temp': Footer
    
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'
#LiftList{
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
    width 15%;
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

</style>
