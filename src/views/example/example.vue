<template>
  <div align="center" style="margin:2px;">
    
  
   <span class="SoSuoDa" id="HI" style="width:360px;border:1px solid red;">
    <div id="soso" 
      class="SoSuo" 
      @mouseover="aaa()" 
      @mouseout="bbb()">

      <a href="javascript:void(0)">怎么上下键选择12</a>
      <a href="javascript:void(0)">怎么上下键选择34</a>
      <a href="javascript:void(0)">怎么上下键选择56</a>

    </div>
    <input name="username" id="username" style="width:99%" maxlength="40" @click="AjaxSo('soso');" autocomplete="off" @keydown="checkKeyCode($event)">
   </span>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      cur : -1
    };
  },
  mounted(){
    
  },
  methods: {
    aaa(){
      document.getElementById('soso').style.visibility='visible';
    },
    bbb(){
      // document.getElementById('soso').style.visibility='hidden';
    },
    AjaxSo(Select_One_ID) {
        document.getElementById(Select_One_ID).style.visibility = 'visible';
    },
    checkKeyCode(e) {
        var as = document.getElementById('soso').getElementsByTagName('a');
        switch (e.keyCode) {
            case 38://上
                if (this.cur == -1) this.cur = as.length - 1;
                else {
                  as[this.cur].className = ''; this.cur -= 1;
                }
                if (this.cur < 0) this.cur = as.length - 1;
                as[this.cur].classList = 'on'
                break;
            case 40://下
                if (this.cur == -1) this.cur = 0;
                else {
                    as[this.cur].className = '';
                    this.cur++;
                }
                if (this.cur >= as.length) this.cur = 0;
                as[this.cur].classList='on'
                break;
            case 13://回车选择
                if (this.cur != -1) document.getElementById('username').value = as[this.cur].innerHTML;
                break;
        }
    }
  }
};
</script>
<style lang="stylus" scoped>
.on
  color red!important
</style>

