



<template>
<div>
  <div class="container1">
    <div class="dot_1"></div>
    <div class="pulse_1"></div>
    <div class="pulse1_1"></div>
  </div>
</div>
</template>

<script>
  // import EventListener from './utils/EventListener'

  export default {
    name: 'Slider',

    // model: {
    //   // 当前值，外部可以使用 v-model 进行绑定
    //   prop: 'itemSelected',
    //   event: 'select-value-changed'
    // },

    props: {
      // 占位符
      // value: { },    // 注意此处获取的value对应的就是组件标签中的v-model
    },

   
   
  }
</script>

<style lang="stylus">
  @keyframes warn_1 {
    0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.0;
    }

    25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
    }

    50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
    }

    75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.3;
    }

    100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0.0;
    }
    }

  @keyframes warn1_1 {
     0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.0;
    }

    25% {
    transform: scale(0.4);
    -webkit-transform: scale(0.4);
    opacity: 0.1;
    }

    50% {
    transform: scale(0.6);
    -webkit-transform: scale(0.6);
    opacity: 0.5;
    }

    75% {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
    opacity: 0.2;
    }

    100% {
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    opacity: 0.0;
    }
    }

  .container1
    position: relative;
    // width: 120px;
    // height: 120px;
    left: 6px;
    top: 6px;
    /* 保持大小不变的小圆点 */
    .dot_1
      position: absolute;
      width: 23px;
      height: 23px;
      left: 134px;
      top: 134px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border: 1px solid #D75730;
      border-radius: 50%; 
      background-color:#D75730; /* 实心圆 ，如果没有这个就是一个小圆圈 */
      z-index: 2;
    
      /* 产生动画（向外扩散变大）的圆圈 第一个圆 */
    .pulse_1
      position: absolute;
      width: 65px;
      height: 65px;
      left: 114px;
      top: 114px;
      // border: 1px solid #673B30;
      // background: -webkit-radial-gradient(#D75730, #D75730 20%, #D75730); /* Safari 5.1 - 6.0 */
      // background: -o-radial-gradient(#D75730, #D75730 20%, #D75730); /* Opera 11.6 - 12.0 */
      // background: -moz-radial-gradient(#D75730, #D75730 20%, #D75730); /* Firefox 3.6 - 15 */
      // background: radial-gradient(#663C30, #663C30, #F87575); /* 标准的语法 */
      background: #D75730;
      opacity: 0.11;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      z-index: 1;
      opacity: 0;
      -webkit-animation: warn_1 2s ease-out;
      -moz-animation: warn_1 2s ease-out;
      animation: warn_1 2s ease-out;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      box-shadow: 1px 1px 30px #804232; /* 阴影效果 */
      animation-delay: .3s;
      -webkit-animation-delay: .3s; /* Safari 和 Chrome */
    
      /* 产生动画（向外扩散变大）的圆圈 第二个圆 */
    .pulse1_1
      position: absolute;
      width: 104px;
      height: 104px;
      left: 95px;
      top: 95px;
      // border: 1px solid #804232;
      background: -webkit-radial-gradient(#D75730, #D75730 20%, #D75730); /* Safari 5.1 - 6.0 */
      background: -o-radial-gradient(#D75730, #D75730 20%, #D75730); /* Opera 11.6 - 12.0 */
      background: -moz-radial-gradient(#D75730, #D75730 20%, #D75730); /* Firefox 3.6 - 15 */
      background: radial-gradient(#663C30, #663C30, #F87575); /* 标准的语法 */
      // background-color:#804232;
      // border: 1px solid #000;
      // background-color:#000;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      z-index: 1;
      opacity: 0;
      -webkit-animation: warn1_1 2s ease-out;
      -moz-animation: warn1_1 2s ease-out;
      animation: warn1_1 2s ease-out;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      // animation-delay: 2.5s;
      // -webkit-animation-delay: 2.5s; /* Safari 和 Chrome */
      box-shadow: 1px 1px 30px #804232; /* 阴影效果 */
    
</style>
