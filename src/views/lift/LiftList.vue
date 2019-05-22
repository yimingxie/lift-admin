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
              <span class="on">全部</span>
              <span>预警</span>
              <span>违规</span>
              <span>故障</span>
              <span>事故</span>
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
          <div class="llt-thead clearfix">
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


      </div>


    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
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
  components: {

  }
}
</script>

<style lang="stylus" scoped>
#LiftList{
  .container{
    padding 61px 0 0 200px;
    line-height 1;
  }
  .lift-error-sum{
    float left;
    width 25%;
    height 140px;
    color #fff;
    // background-image: linear-gradient(-90deg, #E95E5E 0%, #E9775E 100%);
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
  .lift-list{
    background #fff;
    margin 30px;
    border-radius 6px;
  }
  .lift-list-title{
    line-height 50px;
    padding-left 20px;
    font-size: 16px;
    color: #34414C;
    border-bottom 1px solid #D8DDDF;  
  }
  .ll-choose{
    padding 20px 30px;
  }

  .llct-area{
    float left;
    width 160px;
    height 30px;
  }
  .llct-line{
    float left
    width 1px;
    height 14px;
    margin-top 4px;
    background #D8DDDF;
  }
  .llct-type{
    float left;
    margin-left 14px;
  }
  .llct-type em{
    float left;
    display inline-block;
    font-style normal;
    font-size 14px;
    line-height 22px;
    padding 0 10px;
    cursor pointer;
    border-radius 4px;
  }
  .llct-type span{
    float left;
    display inline-block;
    font-size 14px;
    line-height 22px;
    padding 0 10px;
    cursor pointer;
    color: #7E8A95;
    margin-right 5px;
    border-radius 4px;
    cursor pointer;
  }
  .llct-type span.on,.llct-type span:hover{
    background: #4272FF;
    color #fff;
  }
  .ll-choose-bottom{
    padding 20px 0;
    border-top 1px dashed  #D8DDDF;
  }
  .llcb-operate{
    float left
  }
  .llcb-btn{
    display inline-block;
    font-size 14px;
    color: #34414C;
    border: 1px solid #D8DDDF;
    border-radius: 4px;
    padding 8px 16px;
    cursor pointer;
  }
  .llcb-operate .llcb-btn{
    margin-right 5px;
  }
  .llcb-btn.info{
    background: #4272FF;
    border: 1px solid #4272FF;
    color #fff;
  }
  .llcb-search{
    float right;
    width 320px;
    position relative;
  }
  .lsearch-input{
    position relative;
    box-sizing border-box;
    height 32px;
    width 100%;
    padding-right 60px;
    padding-left 10px;
    border: 1px solid #D8DDDF;
  }
  .lsearch-submit{
    position absolute;
    top 1px;
    right 1px;
    border none;
    height 30px;
    width 40px;
    cursor pointer;
    background: #fff url('../../assets/images/xym/search.png') no-repeat center center;
  }
  .ll-table{
    border-top 10px solid #F5F6F7;
    padding 20px;
  }
  .llt-thead{
    background: #F5F6F7;
  }
  .llt-th{
    float left;
    font-size: 14px;
    color: #34414C;
    line-height: 22px;
    padding 16px 0;
  }


}

</style>
