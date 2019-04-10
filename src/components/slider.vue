<template>
  <div class="all">
    <p></p>
    <div class="add" @click="add()"> <img alt="" src="./../assets/images/add.png"/></div>
    <div class="bar" @click="bbb($event)" >
    <!-- <div class="slider__bar"></div> -->
    
    <div class="box" @mousedown.prevent="aaa($event)" :style="{'bottom':boxBottom + 'px'}" ></div>
   
    </div>
    <div class="cut" @click="cut()"><img alt="" src="./../assets/images/cut.png"/></div>
  </div>
</template>

<script>
  import EventListener from './utils/EventListener'

  export default {
    name: 'Slider',

    // model: {
    //   // 当前值，外部可以使用 v-model 进行绑定
    //   prop: 'itemSelected',
    //   event: 'select-value-changed'
    // },

    props: {
      // 占位符
      value: { },    // 注意此处获取的value对应的就是组件标签中的v-model
    },

    data () {
      return {
        boxBottom : 0,
        timer: null,
        start_timer: null,
      }
    },
    created(){
      console.log('this.value==' + this.value)
      this.boxBottom = this.value;
    },
    mounted() {
      console.log('this.value==' + this.value)
      this.boxBottom = this.value;
    },
    watch:{
      value(val) {
        console.log(val);
        this.boxBottom = val;
      },
      boxBottom(val) {
        this.$emit('input', val);
      }
    },
    computed: {
      
    },

    methods: {
      add(){
        var box = document.getElementsByClassName('box')[0]
        var bar = document.getElementsByClassName('bar')[0]
        var all = document.getElementsByClassName('all')[0]
        // var p = document.getElementsByTagName('p')[0]
        var cha = bar.offsetHeight - box.offsetHeight
        console.log('aaaaaaaa=====' +  box.style.bottom)
        this.boxBottom = parseInt(box.style.bottom) + 5
        // 判断最大值和最小值
        if (this.boxBottom < 0) {
        this.boxBottom = 0
        }
        if (this.boxBottom >= cha) {
        this.boxBottom = cha
        }
        box.style.bottom = this.boxBottom + 'px'

        // window.onmousedown = function (ev) {
        //   //延迟两秒
        //   this.start_timer = setTimeout(function(){
        //       this.timer = setInterval(function(){
                  
        //         this.boxBottom = parseInt(box.style.bottom) + 2
        //         // 判断最大值和最小值
        //         if (this.boxBottom < 0) {
        //         this.boxBottom = 0
        //         }
        //         if (this.boxBottom >= cha) {
        //         this.boxBottom = cha
        //         }
        //         box.style.bottom = this.boxBottom + 'px'
                  
        //       },150)
              
        //   },500)

          
        //   return false
        // }
        // window.onmouseup = function () {
        //   // alert(11)
        //   // this.boxBottom = cha - boxL - moveY //left值
          
        //   // // 判断最大值和最小值
        //   // if (this.boxBottom < 0) {
        //   // this.boxBottom = 0
        //   // }
        //   // if (this.boxBottom >= cha) {
        //   // this.boxBottom = cha
        //   // }
        //   console.log('this.box111111111Bo============' + this.boxBottom)
        //   //清除启动器
        //   clearTimeout(this.start_timer);
          
        //   //清除间隔启动器
        //   clearInterval(this.timer);
        //   window.onmousedown = false //解绑移动事件
        //   return false
        // }

      },
      cut(){
        
        var box = document.getElementsByClassName('box')[0]
        var bar = document.getElementsByClassName('bar')[0]
        var all = document.getElementsByClassName('all')[0]
        // var p = document.getElementsByTagName('p')[0]
        var cha = bar.offsetHeight - box.offsetHeight
        console.log('aaaaaaaa=====' +  box.style.bottom)
        this.boxBottom = parseInt(box.style.bottom) - 5
        // 判断最大值和最小值
        if (this.boxBottom < 0) {
        this.boxBottom = 0
        }
        if (this.boxBottom >= cha) {
        this.boxBottom = cha
        }
        
        box.style.bottom = this.boxBottom + 'px'
      },
     // 条
      aaa(ev){
        // alert('aaa')
        var box = document.getElementsByClassName('box')[0]
        var bar = document.getElementsByClassName('bar')[0]
        var all = document.getElementsByClassName('all')[0]
        // var p = document.getElementsByTagName('p')[0]
        var cha = bar.offsetHeight - box.offsetHeight
        let boxL = box.offsetTop
        let e = ev || window.event //兼容性
        let mouseY = e.clientY //鼠标按下的位置
        window.onmousemove = function (ev) {
          let e = ev || window.event
          e.preventDefault();
          let moveY = e.clientY - mouseY //鼠标移动的距离
          // console.log('moveL：：：' + moveY)
          this.boxBottom = cha - boxL - moveY //left值
          
          // 判断最大值和最小值
          if (this.boxBottom < 0) {
          this.boxBottom = 0
          }
          if (this.boxBottom >= cha) {
          this.boxBottom = cha
          }
          
          // p.innerHTML = '当前位置' + Math.ceil(bili) + '%'
          // 改变left值
          box.style.bottom = this.boxBottom + 'px'
          // v.$emit('boxBottom' , this.boxBottom)
          console.log('this.boxBo============' + this.boxBottom)
          // 计算比例
          // let bili = newL / bar.offsetHeight * 100
          // box.style.bottom = bili + '%'
          
          return false //取消默认事件
        }
        window.onmouseup = function () {
          // alert(11)
          // this.boxBottom = cha - boxL - moveY //left值
          
          // // 判断最大值和最小值
          // if (this.boxBottom < 0) {
          // this.boxBottom = 0
          // }
          // if (this.boxBottom >= cha) {
          // this.boxBottom = cha
          // }
          console.log('this.box111111111Bo============' + this.boxBottom)
          window.onmousemove = false //解绑移动事件
          console.log('this.box111111111Bo============' + this.boxBottom)
          return false
        }
        console.log('this.box11112222222222211111Bo============' + this.boxBottom)
        return false
      },
      // 圆球
      bbb(ev){
        // alert(22)
        var box = document.getElementsByClassName('box')[0]
        var bar = document.getElementsByClassName('bar')[0]
        var all = document.getElementsByClassName('all')[0]
        var p = document.getElementsByTagName('p')[0]
        var cha = bar.offsetHeight - box.offsetHeight
        // console.log('ev.clientX' + ev.clientX)
        // let left = ev.clientX - all.offsetLeft - box.offsetWidth / 2 - 48
        this.boxBottom = bar.offsetHeight - (ev.clientY - (this.getPosition(bar).top - this.getPosition(bar).scrollTop))  - box.offsetWidth / 2
        console.log('aaaaaaaa====' + this.getPosition(bar).scrollTop   )
        if (this.boxBottom < 0) {
          this.boxBottom = 0
        }
        if (this.boxBottom >= cha) {
          this.boxBottom = cha
        }
        
        // box.style.bottom = this.boxBottom + 'px'
        // let bili = left / bar.offsetHeight * 100
        // box.style.bottom = bili + '%'
        
        // p.innerHTML = '当前位置' + Math.ceil(bili) + '%'
        console.log('bottom' + this.boxBottom)
        return false
      },
      
      //获取元素的绝对位置
      getPosition(node) {
        console.log('wwwww==' + node.scrollTop)
        // document.body.scrollTop = 5220
        console.log('gggg==' + document.body.scrollTop)
          var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
          var top = node.offsetTop;
          var current = node.offsetParent; // 取得元素的offsetParent
          var scrollTopp = node.scrollTop;
          　 // 一直循环直到根元素
          　　
          while(current != null) {　　
              left += current.offsetLeft;　　
              top += current.offsetTop;　　
              scrollTopp += current.scrollTop;
              current = current.offsetParent;　　
              
          }
          return {
              "left": left,
              "top": top,
              "scrollTop":scrollTopp
          };
      },
    },

    mounted () {
     
    },

    beforeDestroy () {
     
    }
  }
</script>

<style lang="stylus">
  @import '../assets/stylus/base'
.add
  absolute top -16px left 7px
  color #30A487
  &:hover
    cursor pointer
.cut
  absolute bottom -11px left 6px
  &:hover
    cursor pointer
.all {
  size: 6px 100px;
  padding 10px
  // margin: 100px auto;
  position: relative;
  // display inline
}
.slider__bar
  width: 6px;
  height: auto;
  border-radius: 0 0 3px 3px;
  background-color: #409eff;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  position: absolute;
  bottom 0
.bar {
  size: 8px 83px;
  background: #20505A;
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
}

.box 
  size: 17px;
  background: #6AE7C7;
  position: absolute;
  bottom: 0;
  left:-4px
  margin: auto 0;
  border-radius: 50%;
  cursor: pointer;
  transition: bottom 0.1s linear 0s;
  // transform: translateY(50%)
  // &:hover
  //   transform: scale(1.2)
</style>
