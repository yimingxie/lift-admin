<template>
<div>
  <div class="container">
    <div class="dot"></div>
    <div class="pulse"></div>
    <div class="pulse1"></div>
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
  @keyframes warn {
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
    opacity: 0.3;
    }

    75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
    }

    100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0.0;
    }
    }

  @keyframes warn1 {
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
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.3;
    }

    75% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
    }

    100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.0;
    }
    }

  .container {
    position: relative;
    width: 120px;
    height: 120px;
    left: 10px;
    top: 10px;
  }
    /* 保持大小不变的小圆点 */
  .dot {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 134px;
    top: 134px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 1px solid #B0F3FF;
    border-radius: 50%; 
    background-color:#B0F3FF; /* 实心圆 ，如果没有这个就是一个小圆圈 */
    z-index: 2;
  }
    /* 产生动画（向外扩散变大）的圆圈 第一个圆 */
  .pulse {
    position: absolute;
    width: 35px;
    height: 35px;
    left: 124px;
    top: 124px;
    border: 1px solid #B0F3FF;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    -webkit-animation: warn 2s ease-out;
    -moz-animation: warn 2s ease-out;
    animation: warn 2s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    box-shadow: 1px 1px 30px #3399ff; /* 阴影效果 */
  }
    /* 产生动画（向外扩散变大）的圆圈 第二个圆 */
  .pulse1 {
    position: absolute;
    width: 35px;
    height: 35px;
    left: 124px;
    top: 124px;
    border: 1px solid #000;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    z-index: 1;
    opacity: 0.3;
    -webkit-animation: warn1 2s ease-out;
    -moz-animation: warn1 2s ease-out;
    animation: warn1 2s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    box-shadow: 1px 1px 30px #3399ff; /* 阴影效果 */
  }
</style>