<template>
<div id="missionDetail" class="main-wrap">
  <div class="topPanel">
    <div class="bread-nav">
      <router-link to="/mission">
        <span>任务管理</span>
      </router-link>
      <em>/</em>
      <span class="on">任务详情</span>
      
    </div>
    <div class="missionOrder clearfix">
      <span class="orderNumber">工单编号：234231029431</span>
      <div class="tar" style="float:right;">
        <button class="btn whiteBtn">关闭</button>
        <button class="btn whiteBtn" style="background: #4272ff;color: #fff">修改</button>
        <p class="status">状态</p>
        <p class="progress">已派单</p>
      </div>
      <div class="s_de_details">
        <ul>
          <li><span class="tie">派单人员：</span><span >曲丽丽</span></li>
          <li><span class="tie">作业类型：</span><span>例行维保</span></li>
          <li><span class="tie">派单时间：</span><span>2019-06-25 19:20:32</span></li>
          <li><span class="tie">作业时间：</span><span>2019-06-25 19:20:32</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row" >
    <div style="width:67%;float:left">
      <div class="panel" >
        <div class="title"><div class="label1">作业进度</div></div>
        <div class="progressPanel">
          <!-- <el-steps :active="active">
            <el-step title="步骤 1" icon="el-icon-edit"></el-step>
            <el-step title="步骤 2" icon="el-icon-upload"></el-step>
            <el-step title="步骤 3" icon="el-icon-picture"></el-step>
          </el-steps>
          <br>
          <br> -->
          <el-steps :active="active">
            <el-step title="已派单">
              <i slot="icon" class="paidan"></i>
              <div slot="description" >
                <p>曲丽丽 01-10 19:20:32</p>
              </div>
            </el-step>
            <el-step title="已接单" >
              <i slot="icon" class="jiedan"></i>
              <div slot="description" >
                <p>曲丽丽 01-10 19:20:32</p>
                <p>曲丽丽 01-10 19:20:32</p>
              </div>
            </el-step>
            <el-step title="已完成" >
              <i slot="icon" class="wancheng"></i>
              <div slot="description" >
                <p>01-10 19:20:32</p>
              </div>
            </el-step>

          </el-steps>

          <br>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
      </div>
    </div>
    <div style="width:33%;float:left">
      <div class="panel conclusions" style="padding:0 0 3px">
        <div class="title" style="margin:0"><div class="label1">作业结论</div></div>
        <div style="margin:0 12px">
          <table border="0" class="s_de_details s_de_details2 clearfix">
            <tbody>
              <tr>
                <td><span class="tie">维修内容</span><span >配件更换</span></td>
                <td><span class="tie">配件类型</span><span>一个配件，两个配件，三个配件，四个配件还有五个配件</span></td>
              </tr>
              <tr>
                <td><span class="tie">维修费用</span><span>无费用</span></td>
                <td>
                  <span class="tie">作业记录单</span>
                  <span><picture-list></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="row" >
    <div style="width:67%;float:left">
      <div class="panel" >
        <div class="title">
          <div class="label1">人员信息
          <span class="fr" style="font-size: 14px;color: #34414C;margin-right:24px;">
            共{{totalPerson}}人
          </span>
          </div>
        </div>
        <span @click="tabShow('left')" class="leftErrow"></span>
        <div class="tabBox">
          <div v-for="(staff,index) in getStaffJson" :key="index" class="tabActiveSpan" v-if="tab == index || tab == index-1">
            
            <span class="stf_pic">
              <!-- <img :src="staff.url" alt="" width="104" height="104"/> -->
              <img :src="staff.url" style="background:#ccc;border-radius:50%" alt="" width="104" height="104"/>
              <div class="mask"></div>
            </span>
            <span class="stf_info">
              <div class="stf_name">{{staff.staffName}}
              </div>
              
              <div class="stf_p stf_department">{{staff.depName}}</div>
              <div class="stf_p stf_phone">{{staff.phone}}</div>
            </span>
          </div>
          <div class="tabActiveSpan tabActiveSpanSelect" v-if="tab == max || tab == max + 1">
            <span class="stf_pic">
            </span> 
            <span class="stf_info">
              <div class="stf_name">请选择人员</div> 
              <div class="stf_p stf_department">- -</div> 
              <div class="stf_p stf_phone">- -</div>
            </span>
          </div>

        </div>
          <!-- <div v-if="tab == 0" :class="{tabActive:tab ==0}">必读</div>
          <div v-if="tab == 1" :class="{tabActive:tab ==1}">摘要</div>
          <div v-if="tab == 2" :class="{tabActive:tab ==2}">所有</div> -->
          
        <span @click="tabShow('right')" class="rightErrow"></span>
      </div>
    </div>
    <div style="width:33%;float:left">
      <div class="panel liftInfo">
        <div class="title" style="margin:0">
          <div class="label1">电梯DT-1
            <span class="fr" style="line-height: 22px;margin-right:24px;font-size: 12px;cursor:pointer;color: #4272FF;">
              查看地图
            </span>
          </div>
          
        </div>
        <!-- <div class="s_de_details s_de_details2 clearfix">
          <ul>
            <li><span class="tie">注册代码</span><span >123243254345678901234567890</span></li>
            <li><span class="tie">使用单位</span><span>深圳市招商物业有限公司</span></li>
            <li><span class="tie">电梯区域</span><span>南山区-蛇口</span></li>
            <li><span class="tie">详细地址</span><span>南光城市花园1栋c座</span></li>
            <li><span class="tie">物业单位</span><span>深圳市招商物业有限公司</span></li>
            <li><span class="tie">制造单位</span><span>上海三菱电梯有限公司</span></li>
          </ul>
        </div> -->
        <div class="scrollDiv">
          <table border="0" class="s_de_details s_de_details2 clearfix">
            <tbody>
              <tr>
                <td><span class="tie">注册代码</span><span >123243254345678901234567890</span></td>
                <td><span class="tie">使用单位</span><span>深圳市招商物业有限公司</span></td>
              </tr>
              <tr>
                <td><span class="tie">电梯区域</span><span>南山区-蛇口</span></td>
                <td><span class="tie">详细地址</span><span>南光城市花园1栋c座</span></td>
              </tr>
              <tr>
                <td><span class="tie">物业单位</span><span>深圳市招商物业有限公司</span></td>
                <td><span class="tie">制造单位</span><span>上海三菱电梯有限公司</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <fotter></fotter>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
import PictureList from "../../components/PictureList"; //级联选择多选 完成

export default {
  data() {
    return {
      active: 0,
      tab: 0, //页卡切换
      queryParam:{
        offset:0,
        limit:9,
        column: "create_time",
        order: false,
        corpId:window.localStorage.getItem('corpId'),
        accountStatus:"-1",// 账号状态
        worksStatus: "-1", // 作业状态
        phone: "",
        staffName: "",
        areaCode: "",
        depId: "", // 部门ID
      },
      getStaffJson:[],
      totalPerson:0,
      max:0
    }
  },
  components: {
    'fotter': fotter,
    choiceindex, //级联
    'picture-list':PictureList

  },
  mounted() {
    this.getAllStaffData()
  },
  methods: {
    tabShow(t) {
      
      if(t == 'left' && this.tab > 0){
        this.tab = this.tab - 2
      } else if(t == 'right' && this.tab < this.max){
        this.tab = this.tab + 2
      }
      
    },
    // 查询所有员工账户
    getAllStaffData(){
      api.accountApi.getStaffs(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getStaffJson = res.data.data.records

          this.totalPerson = this.getStaffJson.length

          this.max = this.totalPerson % 2 == 0 ?  Math.ceil(this.totalPerson/2) + 1 : Math.ceil(this.totalPerson/2)

          this.getStaffJson.forEach(item => {
            var url = api.accountApi.viewPic(item.avatar)
            Vue.set(item, 'url', url)
          })

        } else {
          this.getStaffJson = []
        }
        
      }).catch((res) => {
        
      })
     
    },
    // 步骤条 下一步
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  },
}
</script>

<style lang="stylus">
// @import '../../assets/stylus/utilities'

#missionDetail
  .topPanel
    background: #fff;
    margin 0 -10px
  .bread-nav
    padding: 0 20px;
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #e9e9e9;
    span 
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      &.on
        color: #34414C;
    em
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      margin: 0 10px;
  .missionOrder
    padding 17px 17px 11px 60px;
    background url('../../assets/images/hs/order.png') no-repeat 23px 19px;
    .status
      color: rgba(0,0,0,0.45);
      margin 13px 10px 3px 0
    .progress
      font-size: 20px;
      margin-right 10px
  .orderNumber
    font-size: 20px;
  .s_de_details
    width 800px
    margin-top: 15px
    li
      float left
      font-size: 14px;
      color: #34414C;
      padding: 5px 50px 5px 0
      min-width: 301px;
      // max-width: 301px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    .tie
      color: #7E8A95;
  .progressPanel
    padding 60px 50px
    .paidan
      display inline-block
      width:45px;
      height:50px;
      background url('../../assets/images/hs/paidan.png') no-repeat center
    .jiedan
      display inline-block
      width:45px;
      height:50px;
      background url('../../assets/images/hs/jiedan.png') no-repeat center
      opacity .3
    .wancheng
      display inline-block
      width:45px;
      height:50px;
      background url('../../assets/images/hs/wancheng.png') no-repeat center
      opacity .3
  // 正在进行中
  .el-step__head.is-process
    .paidan
      box-shadow: 0 8px 12px -4px rgba(26,65,178,0.40);
      width 48px;
      height 48px
      border-radius: 50%
      margin 0 5px
      background url('../../assets/images/hs/paidanLight.png') no-repeat center #4272FF;
    .jiedan
      box-shadow: 0 8px 12px -4px rgba(26,65,178,0.40);
      width 48px;
      height 48px
      border-radius: 50%
      margin 0 5px
      background url('../../assets/images/hs/jiedanLight.png') no-repeat center #4272FF;
      opacity 1
    .wancheng
      box-shadow: 0 8px 12px -4px rgba(26,65,178,0.40);
      width 48px;
      height 48px
      border-radius: 50%
      margin 0 5px;
      background url('../../assets/images/hs/wanchengLight.png') no-repeat center #4272FF;
      opacity 1
  // 已完成
  .el-step__head.is-finish
    .jiedan
      opacity 1
  .conclusions
    padding: 0;
    td:nth-child(odd)
      width: 15%;
  .liftInfo
    padding: 0;
  .scrollDiv
    overflow-x scroll
    height: 192px
    padding 0 12px
  .s_de_details2
    width: 100%;
    td 
      min-width 0
      width: 50%;
      padding: 7px 12px 8px 12px;
      white-space: normal;
      vertical-align: top;
    .tie
      display block
      font-size: 12px;
      margin-bottom: 3px;
    span
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
  .leftErrow
    display inline-block
    width 32px;
    height 32px
    background url('../../assets/images/hs/left1.png') no-repeat center;
    position absolute
    top: 133px;
    left:25px
  .rightErrow
    display inline-block
    width 32px;
    height 32px;
    background url('../../assets/images/hs/right1.png') no-repeat center;
    position absolute;
    right:25px;
    top: 133px;
  .tabBox
    padding-top: 45px
    height:172px;
    overflow: hidden

  .tabActiveSpan
    width 50%
    float: left;
    text-align center
  .tabActiveSpan:nth-child(odd)
    border-right: 2px solid #D8DDDF;

  .stf_pic
    width:104px
    height 104px
    display inline-block
    margin-right 11px
    cursor pointer
    position: relative;
  // 图片遮罩层
  .stf_pic:hover .mask {
    opacity: 1;    
  }
  .stf_info
    display inline-block
    vertical-align: top;
    text-align left
  .stf_name
    font-size: 20px;
    color: #34414C;
    margin 5px 0 15px

  .stf_department
    color: #7E8A95;
    margin 5px 0 15px 0
    background url('../../assets/images/hs/department.png') no-repeat left center;

  .stf_p
    text-indent 17px
    color: #34414C;
    margin: 4px 0;
  .stf_phone
    background url('../../assets/images/hs/phone1.png') no-repeat left center;
  .mask
    position: absolute;
    top: 0;
    left: 0;
    width: 104px;
    height: 104px;
    background: url('../../assets/images/hs/delete.png') no-repeat center rgba(52,65,76,0.80);
    color: #ffffff;
    opacity: 0;
    border-radius: 50%

  .tabActiveSpanSelect
    .stf_pic
      border-radius: 50%
      background url('../../assets/images/hs/person.png') no-repeat center rgba(216,221,223,0.50);
    .stf_phone
      background url('../../assets/images/hs/phone3.png') no-repeat left center;
    .stf_department
      background url('../../assets/images/hs/department2.png') no-repeat left center;

      

</style>
