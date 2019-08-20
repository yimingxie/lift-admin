<template>
    <div class="dataList">
      <div id="dateContainer">
        <div class="nowTime">

            <span class="preMon" @click="preMon"></span>
            <span class="thisMon tac" style="min-width:119px;padding: 0;">
              <span v-if="checkDay == -999">
                {{ checkMonth +1 }}月
                <span v-if="NowMonth === checkMonth">，本月</span>
              </span>
              <span v-else>
                <!-- this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)
                {{ checkMonth +1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1) }}-{{checkDay}} -->
                <span v-text="(this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)) + '-' + (this.checkDay < 10 ? '0' + this.checkDay : this.checkDay)"></span>
                <span v-if="NowDay === checkDay && this.checkMonth == NowMonth">，今天</span>
              </span>
            </span>
            <span class="nextMon" @click="nextMon"></span>

        </div>

        <div style="border-radius:8px">
          <table border="1" id="table">
            <thead>
              <tr class="xinqi">
                <td class="isRadius" style="border-radius:8px 0 0 0">日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td class="isRadius">六</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in tr_str" :key="i">
                <td v-for="k in 7" :key= k v-bind:class="{highlight: checkDay === (i-1) * 7 + k - firstnow} " @click="change((i-1) * 7 + k - firstnow)"> 
                  <div class="dateNub" :class="{'today':getTitle((i-1) * 7 + k - firstnow) === '今'}">
                    {{ getTitle((i-1) * 7 + k - firstnow) }}
                  </div>
                  <!-- <slot :todo="todo">
                  </slot> -->
                  <div class="dateRatio" v-for="(todo,index) in todos" :key="index + '-label'"  v-if="(i-1) * 7 + k - firstnow === todos[index].date && (i-1) * 7 + k - firstnow <= m_days[checkMonth]" >
                    <!-- <p v-if="(i-1) * 7 + k - firstnow <= NowDay && NowMonth === checkMonth">{{ LMsg.msg }}</p>
                    <p v-else>0</p>
                    <div class="GqTotal">共{{ LMsg.total }}</div> -->
                    <slot :todo="todo" >

                    </slot>
                  </div>
                </td>
              
              </tr>
            </tbody>
          </table>
        </div>
      </div>
   
    </div>
  </template>



  <script>
   export default {
    props: {
      todos: {
        type: Array
      },
      snycCheckedDate: ''
    },
    data() {
      return {
        NowMonth:0, // 当前月份
        NowDay:0, // 当前日期
        newDate: 0,//当前的日期的信息
        ynow: 0, //当前的年数
        checkMonth: 0,  //当前选择月份
        checkDay: -999,  //当前选择日期
        firstDay: '',//第一天
        firstnow: '',//当前的星期
        m_days: [],//每个月的天数
        tr_str: '',//行数
      }
    },
    mounted() {
      
      //画出当前的月份的天数对应的表格
      this.getDaysInfo();

      // 将日期传递到父组件
      var month = this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)
      this.$emit('update:snycCheckedDate', this.ynow + '-' + month)
      // this.$emit('update:snycCheckedDate', this.ynow + '-' + (this.checkMonth+1))
    },
    methods: {
      
      // JS获取n至m随机整数
      randomNumber(lower,upper){
        return Math.floor(Math.random()*(upper-lower+1))+lower;
      },
       
      // 筛选时触发事件
      handleFilterChange(filters) {
        console.log(filters);
        console.log('筛选条件变化');
      },
     
      getTitle (data1) {
        if ( data1 <= 0 || data1 > this.m_days[this.checkMonth] ) {
          return '';
        } else if( data1 === this.NowDay && this.NowMonth === this.checkMonth ) {
          return '今';
        } else {
          return data1;
        }
      },
      // 点击td事件
      change (index) {
        
        if(index !='' && index > 0 && index <= this.m_days[this.checkMonth]){

          console.log("当前点击===" + index)
          console.log("已经选择===" + this.checkDay)
          // 若点击已选择的td
          if(index === this.checkDay) {
            
            // 日期置零
            this.checkDay = -999

            // 将日期传递到父组件
            var month = this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)
            this.$emit('update:snycCheckedDate', this.ynow + '-' + month)
            
          } else {

            this.checkDay = index

            // 将日期传递到父组件
            var month = this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)
            var day = this.checkDay < 10 ? '0' + this.checkDay : this.checkDay
            this.$emit('update:snycCheckedDate', this.ynow + '-' + month + '-' + day)
            // this.$emit('update:snycCheckedDate', this.ynow + '-' + (this.checkMonth+1) + '-' + this.checkDay)
          }
          
        }
      },
      getDaysInfo () {
        var _this = this;
        this.sureDate(_this);
      },
      is_leap (year) {//判断是不是闰年
        return (year%100==0?(year%400==0?1:0):(year%4==0?1:0));
      },
      //两个参数代表的含义分别是this对象以及判断当前的操作是不是在进行月份的修改
      sureDate(_this,other) {
        this.newDate = new Date();
        this.ynow = this.newDate.getFullYear();
        this.NowMonth=this.newDate.getMonth();//常量 不变
        this.NowDay=this.newDate.getDate(); //常量 不变
        if(!other) {
          this.checkMonth = this.newDate.getMonth(); // 默认月份为当前月份
        }
        // this.checkDay=this.newDate.getDate(); //日期 随着点击日历变化
        // if (other && other === "next") {
        //   this.checkDay = 1
        // } else {
        //   this.checkDay = this.NowDay
        // }
        
        // 设置日期为当月的第一天
        this.firstDay = new Date(this.ynow,this.checkMonth,1);
        console.log("firstDay==" + this.firstDay)

        // 获取每月第一天是星期几
        this.firstnow=this.firstDay.getDay();
        console.log(this.firstnow)

        this.m_days = [31,28+this.is_leap(this.ynow),31,30,31,30,31,31,30,31,30,31];
        // 表格有几行
        this.tr_str = Math.ceil((_this.m_days[this.checkMonth] + this.firstnow) / 7);
        // this.showMsg();
      },
      preMon() {
        var _this = this;
        // this.checkMonth = this.NowMonth
        // this.checkMonth = this.checkMonth - 1
        if(this.checkMonth == 0){
          this.checkMonth = 0
        } else {
          this.checkMonth = this.checkMonth - 1
        }
        // 上个月
        this.sureDate(_this,"up");

        // 日期置零
        this.checkDay = -999 

        
        // 将日期传递到父组件
        var month = this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)
        this.$emit('update:snycCheckedDate', this.ynow + '-' + month)
      },
      nextMon() {
        var _this = this;
        if(this.checkMonth == 11){
          this.checkMonth = 11
        } else {
          this.checkMonth = this.checkMonth + 1
        }
        // this.checkMonth = this.checkMonth + 1

        // 下个月
        this.sureDate(_this,"next");

        // 日期置零
        this.checkDay = -999 

        // 将日期传递到父组件
        var month = this.checkMonth+1 < 10 ? '0' + (this.checkMonth+1) : (this.checkMonth+1)
        this.$emit('update:snycCheckedDate', this.ynow + '-' + month)
      },
      
    },
    
   }
</script>
<style lang="stylus">
// 配置
// @import '../assets/stylus/base'

.dataList
  width:100%
  border-radius: 8px;
  clearfix()
  background #1B1B23;
  position relative
  #dateContainer
    background: #FFFFFF;
    // bg_color_main("")
    border-radius: 8px;
    width 100%
    margin-right 2%
    box-sizing border-box
    #table
      width 100%
      border none
      td
        border: 1px solid #E8E8E8;
        width:72px;
        height:122px
        font-size: 14px;
        color: #7E8A95;
        letter-spacing: 0.02px;
        vertical-align top
        cursor pointer
        text-align: center;
      .thisDay
        background red
      .highlight
        background-image: linear-gradient(270deg, #6159FF 0%, #4272FF 100%);
        box-shadow: 0 6px 20px -8px rgba(27,69,191,0.60);
        color: #fff;
        .today
          color: #fff;
      .xinqi
        border-radius: 8px 8px 0 0;
        td
          height 40px
          font-size: 12px;
          text-align: center;
          vertical-align middle
          border none
        
      .dateNub
        text-align left
        margin 18px 0 17px 10px
      .today
        color: #4272FF;
      .dateRatio
        position relative
      p
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0.02px;
        text-align: center;
        margin 9px 0 4px 0
  .nowTime
    background-image: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 80%, #E7ECF0 100%);
    border-radius: 8px 8px 0 0;
    height:65px
    line-height:65px
    padding 0 20px
    clearfix()
  .preMon,.nextMon,.thisMon
    font-size: 24px;
    color: #4272FF;
    float left
    cursor pointer
    text-align left
    padding 0 9px
    height 100%
    display: inline-block
  .preMon
    background url('../assets/images/hs/left.png') no-repeat center;
  .nextMon
    background url('../assets/images/hs/right.png') no-repeat center;
 
  #table2
    width 100%
    margin-top 12px
  .date__showNowTime
    font-size: 18px;
    margin 30px 0 10px 0
  .GqTotal
    text-align center
  // 适配
  // @media screen and (max-width: 1640px) {
  //   #dateContainer{
  //     width 327px
  //   }
  //   .right_wrapper{
  //     width: 50%;
  //   }
  //   .taskTable{
  //     left:350px;
  //   }
  // }
  .tableLast
    color: #0DBA7F;
    cursor pointer;
// .el-table__empty-block
//   background: url("../assets/images/hs/dataNoneSearch.png") no-repeat center !important
</style>
