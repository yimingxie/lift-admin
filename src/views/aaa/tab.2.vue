<template>

        <div class="wrap" id="wrap" :style="{'width':windowWidth + 'px','margin':'260px auto'}">
            <!-- <p :style="{fontFamily:arr.conFontFamily,color:arr.conFontColor,backgroundColor:arr.conBgColor}">{{con.title}}</p> -->
            <ul class="tabClick" ref="tabClick">
                <li class="active">Tab1</li>
                <li>Tab2</li>
                <li>Tab3</li>
                <li>Tab4</li>
            </ul>
            <div class="lineBorder">
                <div class="lineDiv"><!--移动的div--></div>
            </div>
            <div class="tabCon">
                <div class="tabBox">
                    <div class="tabList">
                    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
                    <div class="tabList">
                    2</div>
                    <div class="tabList">
                    3</div>
                    <div class="tabList">
                    4</div>
                </div>
            </div>
        </div>

</template>

<script>
  export default {
    // props: {
      // value: {
      //   twoWay: true
      // },
      // items: {
      //   type: Array,
      //   default: []
      // }
    // },
    data(){
      return{
        items:[
        {id:1,text:'第1段'},
        {id:2,text:'第2段'},
        {id:3,text:'第3段'},
        ],
        windowWidth:309

      }
    },
    mounted(){
        var windowWidth = this.windowWidth; //window 宽度;
        var wrap = document.getElementById('wrap');
        var tabClick = wrap.querySelectorAll('.tabClick')[0];
        var tabLi = tabClick.getElementsByTagName('li');
        
        var tabBox =  wrap.querySelectorAll('.tabBox')[0];
        var tabList = tabBox.querySelectorAll('.tabList');
        
        var lineBorder = wrap.querySelectorAll('.lineBorder')[0];
        var lineDiv = lineBorder.querySelectorAll('.lineDiv')[0];
        
        var tar = 0;
        var endX = 0;
        var dist = 0;
        
        // tabBox.style.overflow='hidden';
        // tabBox.style.position='relative';
        tabBox.style.width = windowWidth*tabList.length+"px";
        
        for(var i = 0 ;i < tabLi.length; i++ ){
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
                for(var i = 0 ;i<tabLi.length; i++ ){
                    tabLi[i].className='';
                };
                tabLi[star].className='active';
                init.lineAnme(lineDiv,windowWidth/tabLi.length*star)
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
	
      
    
    },
    methods: {
        
    }
  }
</script>

<style lang="stylus">
.wrap{
    
    }
.tabClick{
    overflow: hidden;
    background: rgba(52,65,76,0.90);
    border-radius: 4px 4px 0 0;
    font-size: 14px;
    color: #C2C7CC;
    letter-spacing: 0.02px;
}
.tabClick li{ height:40px; line-height: 40px; width: 25%; float: left; text-align: center}
.tabClick li.active{ color: #099; transition: 0.1s; font-weight: bold}
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
    overflow: hidden; 
    border-bottom:1px solid #7E858D;
    background: rgba(52,65,76,0.90);
}
.lineDiv{ 
    background: #099;
    height: 4px; 
    width: 10px;
    border-radius:2px
    -webkit-transition: all 0.1s ease-in-out 0s;
    transition: all 0.1s ease-in-out 0s;
}
</style>
