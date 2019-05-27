<template>
  <div id="DeviceDetail">
    <div class="container">
      <div class="bread-nav">
        <span>设备管理</span>
        <em>/</em>
        <span class="on">设备详情</span>
      </div>
      <div class="device-detail-info clearfix">
        <div class="ddi-img">
          <img src="../../assets/images/xym/device.png" alt="">
          <h3>在线</h3>
          <p>钳形表</p>
        </div>
        <div class="ddi-data">
          <div class="ddi-data-wrap">
            <div class="ddi-data-id">设备ID：234231029431</div>
            <div class="ddi-table clearfix" style="margin-top: 10px;">
              <div class="ddi-td"><span>设备型号：</span>H4N1</div>
              <div class="ddi-td"><span>监测内容：</span>电压</div>
              <div class="ddi-td"><span>设备品牌：</span>优利德</div>
              <div class="ddi-td"><span>安装人员：</span>郑静吉</div>
              <div class="ddi-td"><span>安装时间：</span>2018-01-01</div>
            </div>
            <div class="ddi-table clearfix" style="margin-top: 10px;border-top: 1px dashed #D8DDDF;padding-top: 10px;">
              <div class="ddi-td"><span>关联电梯：</span>2353445787868</div>
              <div class="ddi-td"><span>城市区域：</span>深圳市-福田区-皇岗</div>
              <div class="ddi-td"><span>使用地址：</span>新天时代商务中心a座</div>
            </div>
            <div class="ddi-table clearfix">
              <div class="ddi-td"><span>监测项：</span>轿厢-机柜-LED屏</div>
            </div>
          </div>
          
        </div>

      </div>

      <div class="lift-list">
        <div class="lift-list-title">离线记录</div>
     
        <div class="ll-table" style="border-top: none;">
          <div class="llt-thead">
            <div class="llt-tr clearfix">
              <div class="llt-th">离线时间</div>
              <div class="llt-th">恢复时间</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">2018-01-01 19:20:21</div>
                <div class="llt-td">2018-01-01 19:20:21</div>
              </div>
            </div>
            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">2018-01-01 19:20:21</div>
                <div class="llt-td">2018-01-01 19:20:21</div>
              </div>
            </div>
            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">2018-01-01 19:20:21</div>
                <div class="llt-td">2018-01-01 19:20:21</div>
              </div>
            </div>

          </div>
          
        </div>

      </div>

    </div>

    <footer-temp></footer-temp>

  </div>
</template>

<script>
import Footer from '../common/fotter'

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },
  components: {
    'footer-temp': Footer


  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'

#DeviceDetail{
  .container{
    line-height 1;
  }
  .device-detail-info{
    background #fff;
  }
  .ddi-img{
    float left;
    height 186px;
    text-align center;
    width 14%;
    box-shadow: 8px 0 20px -12px rgba(66,114,255,0.30);
  }
  .ddi-img img{
    padding-top 28px;
  }
  .ddi-img h3{
    font-size: 20px;
    color: #4272FF;
    margin-top 16px;
  }
  .ddi-img p{
    font-size: 14px;
    color: #7E8A95;
    text-align: center;
    line-height: 22px;
    margin-top 10px;
  }
  .ddi-data{
    box-sizing border-box;
    float left;
    width 86%;
    height 186px;
    padding: 0 30px;
  }
  .ddi-data-id{
    font-size: 20px;
    color: #34414C;
    line-height: 28px;
    padding-top 20px;
  }
  .ddi-td{
    float left;
    box-sizing border-box;
    overflow hidden;
    text-overflow ellipsis;
    white-space nowrap;
    font-size: 14px;
    color: #34414C;
    line-height: 22px;
    padding 5px 10px 5px 0;
  }
  .ddi-table .ddi-td:nth-child(1){
    width 21%;
  }
  .ddi-table .ddi-td:nth-child(2){
    width 21%;
  }
  .ddi-table .ddi-td:nth-child(3){
    width 25%;
  }
  .ddi-table .ddi-td:nth-child(4){
    width 15%;
  }
  .ddi-table .ddi-td:nth-child(5){
    width 18%;
    text-align right;
  }
  .ddi-td span{
    color: #7E8A95;
  }
  .llt-tr .llt-th:nth-child(1),.llt-tr .llt-td:nth-child(1){
    width 20%;
  }
  .llt-tr .llt-th:nth-child(2),.llt-tr .llt-td:nth-child(2){
    width 80%;
  }
}

</style>
