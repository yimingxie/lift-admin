<template>
  <div id="bookcaselist">
    <div :title="title" :showBack="showBack"></div>
    <div id="content">
      <p @click="changeTheme('theme1')">111</p>
      <p @click="changeTheme('theme2')">222</p>
      <p @click="changeTheme('theme3')"></p>
    </div>
    <div id="test"></div>
    <!-- <v-foot :activeIndex="3"></v-foot> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '我的',
      showBack: false
    }
  },
  methods: {
    changeTheme (theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    }
  },
  mounted(){

    window.document.documentElement.setAttribute('data-theme', 'theme1')
  },
  components: {
  }
}
</script>

<style scoped="" lang="stylus">


  p{
    // @include px2rem(width,100px);
    // @include px2rem(height,100px);
    // @include px2rem(margin,20px);1
    width:100px;
    height:100px;
    margin:20px;
    float:left;
  }
  p:first-child{
    background-color:red;
  }
  p:nth-child(2){
    background-color:#652BF5;
  }
  p:last-child{
    background-color:deepskyblue;
  }
  #test{
    height:100px;
    bg_color('')
    font_color('')
    // bg_pic()
  }
</style>