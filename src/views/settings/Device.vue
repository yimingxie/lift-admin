<template>
  <div id="Device">
    <div class="container">
      <div class="device-data clearfix">
        <div class="device-data-box lift-sum clearfix">
          <div class="ddb-img">
            <img src="../../assets/images/xym/sum-lift.png" alt="">
          </div>
          <div class="ddb-p">
            <h4>263356</h4>
            <p>电梯总数</p>
          </div>
        </div>
        <div class="device-sn clearfix">
          <div class="device-data-box device-sum clearfix">
            <div class="ddb-img">
              <img src="../../assets/images/xym/sum-device.png" alt="">
            </div>
            <div class="ddb-p">
              <h4>3453656878</h4>
              <p>设备总数</p>
            </div>
          </div>

          <div class="device-oo clearfix">
            <div class="device-oo-box">
              <div class="device-oo-line"></div>
              <div class="doo-num">173656878</div>
              <div class="doo-p">
                <span class="doo-p-name doo-p-name1">● 在线设备</span>
                <em class="doo-p-line">|</em>
                <span class="doo-p-per">90%</span>
              </div>
            </div>
            <div class="device-oo-box">
              <div class="doo-num">34</div>
              <div class="doo-p">
                <span class="doo-p-name doo-p-name2">● 离线设备</span>
                <em class="doo-p-line">|</em>
                <span class="doo-p-per">10%</span>
              </div>
            </div>
          </div>

        </div>
        

      </div>

      <div class="lift-list">
        <div class="lift-list-title">设备列表</div>
        <div class="ll-choose">
          <div class="ll-choose-top clearfix">
            <!-- 省市联动筛选 -->
            <div class="llct-area">
              <city-choose @childVal="citySelect"></city-choose>
            </div>

            <div class="llct-line"></div>

            <div class="llct-type clearfix">
              <em>在线状态：</em>
              <radio-group :items="exceptItem" :value.sync="exceptValue" style="display: inline-block"></radio-group>
            </div>
            
          </div>

          <div class="ll-choose-bottom clearfix">
            <div class="llcb-operate">
              <div class="llcb-btn info" @click="dialogAddDevice = true">+ 添加设备</div>
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
              <div class="llt-th">电梯注册代码</div>
              <div class="llt-th">区域-片区</div>
              <div class="llt-th">详细地址</div>
              <div class="llt-th">在线/设备</div>
              <div class="llt-th">操作</div>
            </div>
          </div>
          <div class="llt-tbody">
            <div class="llt-tr clearfix">
              <div class="llt-tr-container clearfix">
                <div class="llt-td">31104403002014002777</div>
                <div class="llt-td">深圳市-南山区-蛇口</div>
                <div class="llt-td">平安大厦</div>
                <div class="llt-td">
                  <p class="llt-td-device"><span class="llt-td-a">4</span>/25</p>
                  <div class="llt-td-arrow"></div>
                </div>
                <div class="llt-td">
                  <span class="llt-td-a">所有设备</span>
                  <em class="llt-td-line">|</em>
                  <span class="llt-td-a">添加设备</span>
                </div>
              </div>
              
              <div class="llt-drop">
                <div class="llt-drop-wrap">
                  <div class="llt-drop-box">
                    <div class="ldrop-left">
                      <div class="ldrop-title">钳形表</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● 在线</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:3909876543</div>
                        <div class="idd-project"><span>监测项：</span>轿厢-机柜-LED屏</div>
                        <div class="idd-project"><span>监测内容：</span>电压 220V</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a">设备详情</div>
                  </div>
                  <div class="llt-drop-box">
                    <div class="ldrop-left">
                      <div class="ldrop-title">摄像机</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● 在线</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:3909876543</div>
                        <div class="idd-project"><span>监测项：</span>轿厢-机柜-LED屏</div>
                        <div class="idd-project"><span>监测内容：</span>电压 220V</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a">设备详情</div>
                  </div>
                  <div class="llt-drop-box">
                    <div class="ldrop-left">
                      <div class="ldrop-title">噪声计</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● 在线</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:3909876543</div>
                        <div class="idd-project"><span>监测项：</span>轿厢-机柜-LED屏</div>
                        <div class="idd-project"><span>监测内容：</span>电压 220V</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a">设备详情</div>
                  </div>
                  <div class="llt-drop-box">
                    <div class="ldrop-left">
                      <div class="ldrop-title">钳形表</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● 在线</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:3909876543</div>
                        <div class="idd-project"><span>监测项：</span>轿厢-机柜-LED屏</div>
                        <div class="idd-project"><span>监测内容：</span>电压 220V</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a">设备详情</div>
                  </div>
                  <div class="llt-drop-box">
                    <div class="ldrop-left">
                      <div class="ldrop-title">摄像机</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● 在线</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:3909876543</div>
                        <div class="idd-project"><span>监测项：</span>轿厢-机柜-LED屏</div>
                        <div class="idd-project"><span>监测内容：</span>电压 220V</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a">设备详情</div>
                  </div>
                  <div class="llt-drop-box">
                    <div class="ldrop-left">
                      <div class="ldrop-title">噪声计</div>
                      <div class="ldrop-detail">
                        <div class="ldd-status">● 在线</div>
                        <div class="ldd-line">|</div>
                        <div class="ldd-id">ID:3909876543</div>
                        <div class="idd-project"><span>监测项：</span>轿厢-机柜-LED屏</div>
                        <div class="idd-project"><span>监测内容：</span>电压 220V</div>
                      </div>
                    </div>
                    <div class="ldrop-detail-a">设备详情</div>
                  </div>

                </div>
              </div>

            </div>

            <div class="llt-tr clearfix">
              <div class="llt-td">31104403002014002777</div>
              <div class="llt-td">深圳市-南山区-蛇口</div>
              <div class="llt-td">平安大厦</div>
              <div class="llt-td">
                <p class="llt-td-device"><span class="llt-td-a">4</span>/25</p>
                <div class="llt-td-arrow"></div>
              </div>
              <div class="llt-td">
                <span class="llt-td-a">所有设备</span>
                <em class="llt-td-line">|</em>
                <span class="llt-td-a">添加设备</span>
              </div>
            </div>

            <div class="llt-tr clearfix">
              <div class="llt-td">31104403002014002777</div>
              <div class="llt-td">深圳市-南山区-蛇口</div>
              <div class="llt-td">平安大厦</div>
              <div class="llt-td">
                <p class="llt-td-device"><span class="llt-td-a">4</span>/25</p>
                <div class="llt-td-arrow"></div>
              </div>
              <div class="llt-td">
                <span class="llt-td-a">所有设备</span>
                <em class="llt-td-line">|</em>
                <span class="llt-td-a">添加设备</span>
              </div>
            </div>
            
          </div>
          
        </div>

      </div>

      

    </div>

    <footer-temp></footer-temp>


    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogAddDevice" :show-close="false" width="690px">
      <div>
        <div class="dia-title">添加设备</div>
        <div class="dia-content">
          <div class="dia-con-head">基础信息</div>
          <div class="dia-clist">
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">设备ID：</div>
              <input class="dia-citem-input1" type="text" placeholder="请输入设备ID">
            </div>
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">安装日期：</div>
              <el-date-picker v-model="dataValue" type="date" placeholder="选择日期" size="small"></el-date-picker>
            </div>

            <!-- TODO 下拉搜索下拉 -->
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">安装人员：</div>
              <input class="dia-citem-input1" type="text" placeholder="">
            </div>

          </div>
          <div class="dia-con-head">安装电梯信息</div>
          <div class="dia-clist">
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">电梯注册代码：</div>
              <input class="dia-citem-input1" type="text" placeholder="请输入电梯注册代码">
            </div>

            <!-- TODO 联动 -->
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">检测项：</div>
              <input class="dia-citem-input1" type="text" placeholder="请输入电梯注册代码">
            </div>
          </div>

        </div>
        <div class="dia-btn-con">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消">
          <input class="dia-btn dia-btn-submit" type="button" value="确认">
        </div>

      </div>

  
    </el-dialog>

  </div>
</template>

<script>
import RadioGroup from '../../components/RadioGroup'
import Footer from '../common/fotter'
import CityChoose from '../common/CityChoose'


export default {
  data() {
    return {
      dataValue: '',
      dialogAddDevice: false,
      exceptItem: [
        {label: '全部', value: 0},
        {label: '在线', value: 1},
        {label: '离线', value: 2},
  
      ],
      exceptValue: 0,

    }
  },
  mounted() {

    

  },
  methods: {
    citySelect(val) {
      console.log('父输出', val)
    }
    

  },
  watch: {
    exceptValue(val, oldVal) {
      console.log(val + '=---=-=-' + oldVal)
    }
  },
  components: {
    'radio-group': RadioGroup,
    'footer-temp': Footer,
    'city-choose': CityChoose,
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'
#Device{
  .container{
    line-height 1;
  }
  .device-data{
    padding: 20px;
  }
  .device-data-box{
    float left;
    height 96px;
  }
  .lift-sum{
    width 23%;
    border-radius: 8px;
    background-image: linear-gradient(90deg, #4272FF 0%, #6159FF 100%);
    box-shadow: 0 8px 20px -10px rgba(27,69,191,0.60);
  }
  .device-sn{
    float left;
    margin-left 2%;
    width 75%;
    background #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .device-sum{
    width 33%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-image: linear-gradient(90deg, #9ACF63 0%, #6ACF63 100%);
    box-shadow: 8px 0 20px -10px rgba(144,191,27,0.60);
  }
  .ddb-img{
    float left;
    width 40px;
    height 40px;
    margin-top 26px;
    margin-left 40px;
  }
  .ddb-p{
    float left;
    margin-left 20px;
  }
  .ddb-p h4{
    font-size 30px;
    color #fff;
    margin-top 20px;
  }
  .ddb-p p{
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    margin-top 10px;
  }
  .device-oo{
    float left;
    width 67%;
  }
  .device-oo-box{
    position relative;
    float left;
    width 50%;
    height 96px;
    border-radius: 8px;
    text-align center;
  }
  .device-oo-line{
    position absolute;
    right 0;
    top 26px;
    width 1px;
    background #D8DDDF;
    height 48px;
  }
  .doo-num{
    font-weight bold;
    font-size: 30px;
    color: #34414C;
    margin-top 20px;
  }
  .doo-p{
    font-size 14px;
    margin-top 10px;
  }
  .doo-p-name1{
    color: #4272FF;
  }
  .doo-p-name2{
    color: #E9645D;
  }
  .doo-p em{
    vertical-align middle;
    font-style normal;
    display inline-block;
    margin 0 8px;
    color #919EA5;
    font-size 12px;
    margin-top -4px;
  }
  .doo-p-per{
    color: #34414C;
  }

  .llt-thead .llt-th:nth-child(1),.llt-tbody .llt-td:nth-child(1){
    width 15%;
  }
  .llt-thead .llt-th:nth-child(2),.llt-tbody .llt-td:nth-child(2){
    width 12%;
  }
  .llt-thead .llt-th:nth-child(3),.llt-tbody .llt-td:nth-child(3){
    width 16%;
  }
  .llt-thead .llt-th:nth-child(4),.llt-tbody .llt-td:nth-child(4){
    width 43%;
  }
  .llt-thead .llt-th:nth-child(5),.llt-tbody .llt-td:nth-child(5){
    width 14%;
  }
  .llt-drop-wrap{
    width 48.8%;
    
  }
}

</style>
