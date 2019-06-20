<template>

        <!-- <div class="wrap" id="wrap" :style="{'width':windowWidth + 'px','margin':'260px auto'}"> -->
        <div class="wrap" id="wrap" >
            <!-- <p :style="{fontFamily:arr.conFontFamily,color:arr.conFontColor,backgroundColor:arr.conBgColor}">{{con.title}}</p> -->
            <ul class="tabClick" ref="tabClick">
                <!-- <li class="active">Tab1</li>
                <li>Tab2</li>
                <li>Tab3</li>
                <li>Tab4</li> -->
                <li v-for="(item,index) in items" :key="index" :class="(nowIndex === index) ? 'active active' + nowIndex : ''">{{item}}</li>
            </ul>
            <div class="lineBorder" :style="{'width':windowWidth + 'px'}">
                <div class="lineDiv"  :class="('active' + nowIndex)" ref="lineDiv"><!--移动的div--></div>
            </div>
            <div class="tabCon" :style="{'width':windowWidth + 'px'}">
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
      // items: {
      //   type: Array,
      //   default: []
      // }
    },
    watch: {
      nowIndex(val) {
        
        this.$emit('update:activeIndex', val)
        
      },
      activeIndex(val){
        // alert(1)
        this.nowIndex = val
        // if(val){
          this.initTab(val)
        // }
        
      }
    },
    data(){
      return{
        nowIndex:0,
        items:[
          '基本信息', '事件','故障','违规','预警'
        ],
        windowWidth:308,
        // nowIndex:0
      }
    },
    created(){
        // var wrap = document.getElementById('wrap');
        // var tabClick = wrap.querySelectorAll('.tabClick')[0];
        // var tabLi = tabClick.getElementsByTagName('li'); // 菜单
        // var windowWidth = tabClick.offsetWidth
        // this.windowWidth = this.$refs.tabClick.offsetWidth
        // alert(1)
    },
    updated(){
      // alert("updated")
      // this.nowIndex = 0
    },
    beforeMount(){
      // console.log("activeIndex==" + this.activeIndex)
    },
    mounted(){
      // alert(1)
      // this.nowIndex = this.activeIndex
      this.initTab()
	
    },
    methods: {
        initTab(nowIndex){
          
          var _this = this
          
          var wrap = document.getElementById('wrap');
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
          tabBox.style.width = windowWidth*tabList.length+"px";
          
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
                // alert(1)
                  var star = this.start;
                  // console.log("star==" + star)
                  // for(var i = 0 ;i<tabLi.length; i++ ){
                  //     tabLi[i].className='';
                  // };
                  // tabLi[star].className='active';
                  _this.nowIndex = star

                  
                  
                  var lineMoveLong = 0
                  // console.log("lineMoveLong==" + lineMoveLong)
                  // 当点击 基本信息时 直接定位滑块 否则在初始化时获取不到元素宽度 导致滑块位置不对
                  if (star === 0) {
                    lineMoveLong = 47
                  } else {
                    for(var j = 0 ; j < star; j++) {
                      lineMoveLong += tabLi[j].offsetWidth
                    }
                    lineMoveLong = lineMoveLong + tabLi[star].offsetWidth/2 + 4
                  }
                  
                  // console.log("lineMoveLong::" + lineMoveLong)

                  // init.lineAnme(lineDiv,windowWidth/tabLi.length*star)
                  init.lineAnme(lineDiv,lineMoveLong)


                  init.translate(tabBox,windowWidth,star);
                  // endX= -star*windowWidth;
              }
          }
          
          
          var init={
              // 滑线滑动切换
              lineAnme:function(obj,stance){
                  obj.style.webkitTransform='translate3d('+stance+'px,0,0)';
                  obj.style.transform='translate3d('+stance+'px,0,0)';
                  // obj.style.webkitTransition='all 0.1s ease-in-out';
                  // obj.style.transition='all 0.1s ease-in-out';
              },
              // tab内容滑动切换
              translate:function(obj,windowWidth,star){
                  obj.style.webkitTransform='translate3d('+-star*windowWidth+'px,0,0)';
                  obj.style.transform='translate3d('+-star*windowWidth+',0,0)px';
                  // obj.style.webkitTransition='all 0.3s ease-in-out';
                  // obj.style.transition='all 0.3s ease-in-out';
              },
              // touchs:function(obj,windowWidth,tar,distance,endX){
              //     obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
              //     obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
              // },
              
              // back:function(obj,windowWidth,tar,distance,endX,time){
              //     obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
              //     obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
              //     obj.style.webkitTransition='all '+time+'s ease-in-out';
              //     obj.style.transition='all '+time+'s ease-in-out';
              // },
          }
          if(nowIndex !== undefined){
            // alert(nowIndex)
            tabLi[nowIndex].click()
          }
          // alert(222)
          // function OnTab(star){
          //     if(star<0){
          //         star=0;
          //     }else if(star>=tabLi.length){
          //         star=tabLi.length-1
          //     }
          //     for(var i = 0 ;i<tabLi.length; i++ ){
          //         tabLi[i].className='';
          //     };
              
          //      tabLi[star].className='active';
          //     init.translate(tabBox,windowWidth,star);
          //     endX= -star*windowWidth;
          // };
          
          // tabBox.addEventListener('touchstart',chstart,false);
          // tabBox.addEventListener('touchmove',chmove,false);
          // tabBox.addEventListener('touchend',chend,false);
          //按下
          // function chstart(ev){
          //     ev.preventDefault;
          //     var touch = ev.touches[0];
          //     tar=touch.pageX;
          //     tabBox.style.webkitTransition='all 0s ease-in-out';
          //     tabBox.style.transition='all 0s ease-in-out';
          // };
          // //滑动
          // function chmove(ev){
          //     var stars = wrap.querySelector('.active').start;
          //     ev.preventDefault;
          //     var touch = ev.touches[0];
          //     var distance = touch.pageX-tar;
          //     dist = distance;
          //     init.touchs(tabBox,windowWidth,tar,distance,endX);
          //     init.lineAnme(lineDiv,-dist/tabLi.length-endX/4);
          // };
          // //离开
          // function chend(ev){
          //     var str= tabBox.style.transform;
          //     var strs = JSON.stringify(str.split(",",1));  
          //     endX = Number(strs.substr(14,strs.length-18)); 
              
          //     if(endX>0){
          //         init.back(tabBox,windowWidth,tar,0,0,0.3);
          //         endX=0
          //     }else if(endX<-windowWidth*tabList.length+windowWidth){
          //         endX=-windowWidth*tabList.length+windowWidth
          //         init.back(tabBox,windowWidth,tar,0,endX,0.3);
          //     }else if(dist<-windowWidth/3){
          //          OnTab(tabClick.querySelector('.active').start+1);
          //          init.back(tabBox,windowWidth,tar,0,endX,0.3);
          //     }else if(dist>windowWidth/3){
          //          OnTab(tabClick.querySelector('.active').start-1);
          //     }else{
          //          OnTab(tabClick.querySelector('.active').start);
          //     }
          //     var stars = wrap.querySelector('.active').start;
          //     init.lineAnme(lineDiv,stars*windowWidth/4);
              
          // };
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

.wrap{
    
    }
.tabClick{
    overflow: hidden;
    background: rgba(52,65,76,0.90);
    border-radius: 4px 4px 0 0;
    font-size: 14px;
    color: #C2C7CC;
    letter-spacing: 0.02px;
    display: table
    padding 0 7px
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
    text-align: center
    padding 10px 8px 6px
    width 36px
    height 21px
    &:nth-child(1){
        width 70px
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
}
.tabList{
    word-break: break-all; 
    width:100%;
    float:left;
    text-align:left; 
    color:#D3D3D3; 
    font-size:14px;
    padding 20px
    box-sizing: border-box;
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
      transform: translate3d(47px, 0px, 0px);
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

</style>
