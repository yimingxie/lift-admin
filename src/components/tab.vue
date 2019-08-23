<template>

        <!-- <div class="wrap" id="wrap" :style="{'width':windowWidth + 'px','margin':'260px auto'}"> -->
        <div class="tabWrap" id="tabWrap" >
            <!-- <p :style="{fontFamily:arr.conFontFamily,color:arr.conFontColor,backgroundColor:arr.conBgColor}">{{con.title}}</p> -->
            <ul class="tabClick" ref="tabClick">
                <!-- <li class="active">Tab1</li>
                <li>Tab2</li>
                <li>Tab3</li>
                <li>Tab4</li> -->
                <li v-for="(item,index) in titleItems" :key="index" :class="(nowIndex === index) ? 'active active' + nowIndex : ''">
                  {{item}}
                  <slot :name="'num' + index"></slot>
                </li>

            </ul>

            <div class="lineBorder" :style="{'width':windowWidth + 'px'}">
                <div class="lineDiv"  :class="('active' + nowIndex)" ref="lineDiv"><!--移动的div--></div>
            </div>
            <div class="tabCon" :style="{'width':windowWidth + 'px' ,'height':tabHeight + 'px'}">
                <div class="tabBox" ref="tabBox" >
                    <div class="tabList">
                      <slot name="first"></slot>
                    </div>
                    <div class="tabList">
                      <slot name="second"></slot>
                    </div>
                    <div class="tabList">
                      <slot name="third"></slot>
                    </div>
                    <div class="tabList">
                      <slot name="fourth"></slot>
                    </div>
                    <div class="tabList">
                      <slot name="fifth"></slot>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
  export default {
    props: {
      activeIndex:{
        twoWay: true
      },
      titleItems:{
        default: []
      },
      id:{
        default:0
      },
      date:{
        default:0
      }
      // items: {
      //   type: Array,
      //   default: []
      // }
    },
    
    data(){
      return{
        nowIndex:0,
        // items:[
        //   '基本信息', '事件','故障','违规','预警'
        // ],
        windowWidth:316, // tab宽度，根据菜单总长度相加而得，改变的话需先改变菜单的宽度
        tabHeight:182 // 初始弹窗内容部分的高度，后面跟随切换菜单会变化
        // nowIndex:0
      }
    },
    watch: {
      nowIndex(val) {
        this.$emit('update:activeIndex', val)
        
      },
      activeIndex(val){
        // console.log("activeIndex=" + val)
        this.nowIndex = val
        this.initTab(val)
      },
      id(val){
        this.tabHeight = 182
        this.initTab(0)
      },
      date(val){
        this.tabHeight = 182
        this.initTab(0)
        
      }

    },
    created(){
        
    },
    updated(){
      // alert("updated")
      // this.nowIndex = 0
    },
    beforeMount(){
      // console.log("activeIndex==" + this.activeIndex)
    },
    mounted(){
      // alert("tab")
      // this.nowIndex = this.activeIndex
      this.initTab()
    },
    methods: {
        goToDetail(){
          alert(this.id)
          // this.$router.push('/detection')
          this.$router.push({
            path: '/lift-list'
          })
        },
        initTab(nowIndex){
          var _this = this
          
          var wrap = document.getElementById('tabWrap');
          // var tabClick = wrap.querySelectorAll('.tabClick')[0];
          var tabClick = this.$refs.tabClick
          var tabLi = tabClick.getElementsByTagName('li'); // 菜单
          // var windowWidth = tabClick.offsetWidth
          // this.windowWidth = tabClick.offsetWidth
          // console.log("tabClick.offsetWidth[[[" + tabClick.offsetWidth)
          var windowWidth = this.windowWidth; //window 宽度;
          // console.log("tabClick.offsetWidth" + tabClick.offsetWidth)
          // var tabBox =  wrap.querySelectorAll('.tabBox')[0];
          var tabBox = this.$refs.tabBox
          var tabList = tabBox.getElementsByClassName('tabList');
          
          // var lineBorder = wrap.querySelectorAll('.lineBorder')[0];
          // var lineDiv = lineBorder.querySelectorAll('.lineDiv')[0];
          var lineDiv = this.$refs.lineDiv
          var tar = 0;
          var endX = 0;
          var dist = 0;
          
          // tabBox.style.overflow='hidden';
          // tabBox.style.position='relative';
          tabBox.style.width = 321*5+"px";
          
          for(var i = 0 ;i < tabLi.length; i++ ){
              // console.log('11112222aaa'+ tabLi.length)
              tabList[i].style.width = windowWidth+"px";
              
              //   tabList[i].style.float='left';
              //   tabList[i].style.float='left';
              //   tabList[i].style.padding='0';
              //   tabList[i].style.margin='0';
              //   tabList[i].style.verticalAlign='top';
              //   tabList[i].style.display='table-cell';
              tabLi[i].start = i;
              tabLi[i].onclick = function(){
                  var star = this.start;
                  if(tabList[star].offsetHeight !== 0){
                    _this.tabHeight = tabList[star].offsetHeight
                  } else {
                    _this.tabHeight = 182
                  }
                  console.log("tabHeight===" + _this.tabHeight)
                  console.log("star===" + star)
                 
                  _this.nowIndex = star
                  
                  var lineMoveLong = 0
                  // console.log("lineMoveLong==" + lineMoveLong)
                  // 当点击 基本信息时 直接定位滑块 否则在初始化时获取不到元素宽度 导致滑块位置不对
                  if (star === 0) {
                    lineMoveLong = 40
                  } else {
                    for(var j = 0 ; j < star; j++) {
                      lineMoveLong += tabLi[j].offsetWidth
                    }
                    lineMoveLong = lineMoveLong + tabLi[star].offsetWidth/2
                  }
                  
                  // console.log("lineMoveLong::" + lineMoveLong)

                  // init.lineAnme(lineDiv,windowWidth/tabLi.length*star)
                  init.lineAnme(lineDiv,lineMoveLong)

                  init.translate(tabBox,windowWidth,star);
              }
          }
          
          
          var init={
              // 滑线滑动切换
              lineAnme:function(obj,stance){
                  obj.style.webkitTransform='translate3d('+stance+'px,0,0)';
                  obj.style.transform='translate3d('+stance+'px,0,0)';
              },
              // tab内容滑动切换
              translate:function(obj,windowWidth,star){
                  obj.style.webkitTransform='translate3d('+-star*windowWidth+'px,0,0)';
                  obj.style.transform='translate3d('+-star*windowWidth+',0,0)px';
              },
          }
          if(nowIndex !== undefined){
            tabLi[nowIndex].click()
          }
         
        }
    }
  }
</script>

<style lang="stylus">
@import '../assets/stylus/colors'
// $color-white=#fff
// $color-red=#E65C4D
// $color-yellow=#F6C84E;
// $color-purple= #A360FF;
// $color-green=#91DAAF;
//主色调-蓝色
// $color-main=#4272FF

// //红色
// $color-red=#FA4F43

// // 橙色
// $color-orange =#FFC60B

// //紫色
// $color-purple=#A360FF

// // 绿色
// $color-green =#76DDAC

#tabWrap{
  .tabClick{
      overflow: hidden;
      background: rgba(52,65,76,0.90);
      border-radius: 4px 4px 0 0;
      font-size: 14px;
      color: #C2C7CC;
      letter-spacing: 0.02px;
      display: table
      padding 0 12px 0 5px
      height 37px
      margin 0!important
      .active{
          color: #C2C7CC;
          -webkit-transition: all 0.1s;
          transition: all 0.1s; 
          // font-weight: bold/
          font-size 16px
      }
      .active0{ 
          color: $color-white;
      }
      .active1{ 
          color: $color-red
      }
      .active2{ 
          color: $color-orange
      }
      .active3{ 
          color: $color-purple
      }
      .active4{ 
          color: $color-green
      }
  }
  .tabClick li{ 
      // height:40px; 
      // line-height: 40px; 
      // width: 25%; 
      float: left;
      position relative
      text-align: center
      padding 10px 9px 6px
      width 36px
      height 21px
      box-sizing: content-box!important;
      &:nth-child(1){
          width 65px
      }
      
  }
  .tabCon{
    overflow: hidden
    background: rgba(52,65,76,0.90);
    border-radius: 0 0 4px 4px;
  }
  .tabBox{ 
    position: relative
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    min-height 170px
  }
  .tabList{
    word-break: break-all; 
    width:100%;
    float:left;
    text-align:left; 
    color:#fff; 
    font-size:14px;
    padding 17px 17px 12px 17px
    box-sizing: border-box;
    position relative
    
  }
  .lineBorder{ 
      height: 4px; 
      border-bottom:1px solid #7E858D;
      background: rgba(52,65,76,0.90);
      position: relative;
      .lineDiv{ 
        background: $color-white;
        height: 4px; 
        width: 10px;
        border-radius:2px
        -webkit-transition: all 0.1s ease-in-out 0s;
        transition: all 0.1s ease-in-out 0s;
        position: absolute;
        top: 2px;
        transform: translate3d(40px, 0px, 0px);
      }
      .active0{ 
        background: $color-white;
      }
      .active1{ 
        background: $color-red
      }
      .active2{ 
        background: $color-orange
      }
      .active3{ 
        background: $color-purple
      }
      .active4{ 
        background: $color-green
      }
  }
  .numSign{
    position absolute 
    top 3px
    left 35px
    background: #FA4F43;
    border-radius: 7px;
    font-size: 12px;
    color: #FFFFFF;
    padding 0 5.5px
    transform scale(.8)
  }
}
</style>
