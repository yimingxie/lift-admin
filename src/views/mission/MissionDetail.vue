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
      <span class="orderNumber">工单编号：{{taskRecords.taskId}}</span>
      <div class="tar" style="float:right;">
        <button v-if="status =='已派单' || status =='已接单'" class="btn whiteBtn" @click="closeTask(taskRecords.taskId)">关闭</button>
        <!-- <button class="btn whiteBtn" style="background: #4272ff;color: #fff">修改</button> -->
        <p class="status">状态</p>
        <p class="progress">{{status}}</p>
      </div>
      <div class="s_de_details">
        <ul>
          <li><span class="tie">派单人员：</span><span >曲丽丽</span></li>
          <li><span class="tie">作业类型：</span><span>{{ taskRecords.taskType }}</span></li>
          <li><span class="tie">派单时间：</span><span>{{ taskRecords.recordTime }}</span></li>
          <li><span class="tie">作业时间：</span><span>2019-06-25 19:20:32</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row" >
    <div style="width:67%;float:left">
      <div class="panel" >
        <div class="title"><div class="label1">作业进度</div>
        </div>
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
              <i slot="icon" class="progressIcon paidan"></i>
              <div slot="description" >
                <p>曲丽丽 01-10 19:20:32</p>
              </div>
            </el-step>
            <el-step title="已接单" class="chaoshiLine">
              <i slot="icon" class="progressIcon jiedan"></i>
              <div slot="description" >
                <p>曲丽丽 01-10 19:20:32</p>
                <p>曲丽丽 01-10 19:20:32</p>
              </div>
            </el-step>
            <el-step title="已完成" >
              <i slot="icon" class="progressIcon wancheng"></i>
              <div slot="description">
                <p>01-10 19:20:32</p>
              </div>
            </el-step>
            <!-- <el-step title="已超时" >
              <i slot="icon" class="progressIcon chaoshi"></i>
              
            </el-step> -->
          </el-steps>

          <br>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
      </div>
    </div>
    <div style="width:33%;float:left">
      <div class="panel conclusions" style="padding:0 0 3px;min-height:282px;">
        <div class="title" style="margin:0"><div class="label1">作业结论</div></div>
        <div style="margin:0 12px">
          <table border="0" class="s_de_details s_de_details2 clearfix">
            <tbody>
              <tr>
                <td style="width: 13%;"><span class="tie">维修内容</span><span >配件更换</span></td>
                <td><span class="tie">配件类型</span><span>一个配件，两个配件，三个配件，四个配件还有五个配件</span></td>
              </tr>
              <tr>
                <td style="width: 13%;"><span class="tie">维修费用</span><span>无费用</span></td>
                <td>
                  <span class="tie">作业记录单</span>
                  <span><picture-list :maxShow="3" :images="images"></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <table border="0" class="s_de_details s_de_details2 clearfix">
            <tbody>
              <tr>
                <td><span class="tie">维保结论</span><span>设备检修</span></td>
              </tr>
              <tr>
                <td>
                  <span class="tie" style="margin-bottom: 10px;">作业记录单</span>
                  <span><picture-list :maxShow="4" :images="images"></picture-list></span>
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>
    </div>
  </div>
  <div class="row" style="z-index:1">
    <div style="width:67%;float:left">
      <div class="panel" >
        <div class="title">
          <div class="label1">人员信息
          <span class="fr" style="font-size: 14px;margin-right:24px;">
            共{{totalPerson}}人
          </span>
          </div>
        </div>
        <span @click="tabShow('left')" class="leftErrow" :class="{'unPrev':tab == 0}"></span>
        <div class="tabBox">
          <!-- 展示现有人员 -->
          <div v-for="(staff,index) in getStaffJson" :key="index" class="tabActiveSpan" v-if="tab == index || tab == index-1">
            
            <span class="stf_pic">
              <!-- <img :src="staff.url" alt="" width="104" height="104"/> -->
              <img :src="staff.url" style="background:#ccc;border-radius:50%" alt="" width="104" height="104"/>
              <div class="mask"></div>
            </span>
            <span class="stf_info">
              <!-- <div class="stf_name">{{staff.staffName}}
              </div> -->

              <!-- <el-cascader 
                :filterable="true" 
                class="regionPicker" 
                :options="options" 
                v-model="form.selectedOptions" 
                @change="handleChange" 
                :show-all-levels="false"
              ></el-cascader> -->
              <el-cascader
                :options="personsOptions"
                :show-all-levels="false"
                class="personPicker"
                clearable
                v-model="aaaa"
                :filterable="true" 
              ></el-cascader>

              <div class="stf_p stf_department">{{staff.depName}}</div>
              <div class="stf_p stf_phone">{{staff.phone}}</div>
            </span>
          </div>
          <!-- 新增人员 -->
          <div class="tabActiveSpan tabActiveSpanSelect" v-if="tab + 2 == max * 2">
            <span class="stf_pic">
            </span> 
            <span class="stf_info">
              <!-- <div class="stf_name">请选择人员</div>  -->
              <el-cascader
                :options="personsOptions"
                :show-all-levels="false"
                class="personPicker" 
                placeholder="请选择人员"
                clearable
                :filterable="true" 
              ></el-cascader>
              <div class="stf_p stf_department">- -</div> 
              <div class="stf_p stf_phone">- -</div>
            </span>
          </div>

        </div>
          <!-- <div v-if="tab == 0" :class="{tabActive:tab ==0}">必读</div>
          <div v-if="tab == 1" :class="{tabActive:tab ==1}">摘要</div>
          <div v-if="tab == 2" :class="{tabActive:tab ==2}">所有</div> -->
          
        <span @click="tabShow('right')" class="rightErrow" :class="{'unPrev':tab + 2 == max * 2}"></span>
      </div>
    </div>
    <div style="width:33%;float:left">
      <div class="panel liftInfo">
        <div class="title" style="margin:0">
          <div class="label1">电梯{{elevatorInfo.inNum}}
            <span class="fr" v-if="ifWatchInfo" @click="watchMap()" style="line-height: 22px;margin-right:24px;font-size: 12px;cursor:pointer;color: #4272FF;">
              查看地图
            </span>
            <span class="fr" v-if="!ifWatchInfo" @click="ifWatchInfo = true" style="line-height: 22px;margin-right:24px;font-size: 12px;cursor:pointer;color: #4272FF;">
              查看基本信息
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
        <div class="scrollDiv" v-show="ifWatchInfo">
          <table border="0" class="s_de_details s_de_details2 clearfix">
            <tbody>
              <tr>
                <td><span class="tie">注册代码</span><span >{{elevatorInfo.regCode}}</span></td>
                <td><span class="tie">使用单位</span><span>{{elevatorInfo.userDepartment}}</span></td>
              </tr>
              <tr>
                <td><span class="tie">电梯区域</span><span>{{elevatorInfo.locaLarea}}</span></td>
                <td><span class="tie">详细地址</span><span>{{elevatorInfo.address}}</span></td>
              </tr>
              <tr>
                <td><span class="tie">物业单位</span><span>{{elevatorInfo.propertyName}}</span></td>
                <td><span class="tie">制造单位</span><span>{{elevatorInfo.manufactName}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="!ifWatchInfo">
          <div id="mapContainer" ></div>
        </div>
        <!-- <div id="container" style="width:500px; height:300px"></div> -->
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
      aaaa:['zhinan','小明'],
      personsOptions: [{
          value: 'zhinan',
          label: '维保一部',
          children: [{
            value: '小明',
            label: '小明',
          }, {
            value: '小李',
            label: '小李',
          }]
        }, {
          value: 'ziyuan',
          label: '维保二部',
          children: [{
              value: '小圆',
              label: '小圆'
            }, {
              value: '员工1',
              label: '员工1'
            }, {
              value: '小林',
              label: '小林'
          }]
      }],
      active: 0,
      tab: 0, //人员页卡切换
      queryParam:{
        offset:0,
        limit:5,
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
      max:0,
      images:[
      'http://192.168.100.89:8080/domino/view/image?filename=GI_bQ502kXGow80KFJXa.jpg',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_eD05guAm1I2c8dpw4.jpg',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_gnxeay4ZQ87gMGsVW.jpg',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_eD05guAm1I2c8dpw4.jpg',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_gnxeay4ZQ87gMGsVW.jpg',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_bQ502kXGow80KFJXa.jpg',
      'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
      ],
      ifWatchInfo:true,
      map:'',
      taskRecords:[],
      elevatorInfo:[],
      status:'',
      taskResult: []
    }
  },
  components: {
    'fotter': fotter,
    choiceindex, //级联
    'picture-list':PictureList

  },
  mounted() {
    this.getMissionDetailData()
    this.getAllStaffData()
  },
  methods: {
    closeTask(id){
      api.taskApi.closeTask(id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('成功！');
          this.status = '已关闭'
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
    },
    getMissionDetailData(){
      api.taskApi.getMissionDetail(this.$route.params.id).then((res) => {
        this.taskRecords = res.data.data.taskRecords[0] || []
        this.elevatorInfo = res.data.data.elevatorInfo || []
        this.status = res.data.data.status
        this.taskResult = res.data.data.taskResult

      }).catch((res) => {
        
      })
    },
    // 查看地图
    watchMap(){
      this.ifWatchInfo = false
      // 构造地图
      this.map = new AMap.Map('mapContainer', {
        center: this.elevatorInfo.latLon.split(","),
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
        zoom: 20, // 设置地图的缩放级别
        features: ['bg', 'road', 'building', 'point'],
      });
      var markerContent = '<span class="dotMaker"></span>' 
      var marker = new AMap.Marker({
        content: markerContent,  // 自定义点标记覆盖物内容
        position: this.elevatorInfo.latLon.split(","),// 基点位置
        offset: new AMap.Pixel(1,4), // 相对于基点的偏移位置
        anchor:'center', // 设置锚点方位
        zIndex: 2,
        topWhenClick: true
      });
      this.map.add(marker);
    },
    tabShow(t) {
      
      if(t == 'left' && this.tab > 0){
        this.tab = this.tab - 2
      } else if(t == 'right' && this.tab < this.max * 2 - 2){
        this.tab = this.tab + 2
      }
      console.log("当前页数：：" + this.tab)
    },
    // 查询所有员工账户
    getAllStaffData(){
      api.accountApi.getStaffs(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getStaffJson = res.data.data.records

          this.totalPerson = this.getStaffJson.length

          this.max = this.totalPerson % 2 == 0 ?  Math.ceil(this.totalPerson/2) + 1 : Math.ceil(this.totalPerson/2)
          console.log("最大页数：：：" + this.max)
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
      padding: 5px 50px 5px 0
      min-width: 301px;
      // max-width: 301px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    .tie
      color: #7E8A95;
  // 初始状态
  .progressPanel
    padding 60px 50px 0
    .progressIcon
      display inline-block
      width:45px;
      height:50px;
    .paidan
      background url('../../assets/images/hs/paidan.png') no-repeat center
    .jiedan
      background url('../../assets/images/hs/jiedan.png') no-repeat center
      opacity .3
    .wancheng
      background url('../../assets/images/hs/wancheng.png') no-repeat center
      opacity .3
    
  // 正在进行中
  .el-step__head.is-process
    .progressIcon
      box-shadow: 0 8px 12px -4px rgba(26,65,178,0.40);
      width 48px;
      height 48px
      border-radius: 50%
      margin 0 5px
    .paidan
      background url('../../assets/images/hs/paidanLight.png') no-repeat center #4272FF;
    .jiedan
      background url('../../assets/images/hs/jiedanLight.png') no-repeat center #4272FF;
      opacity 1
    .wancheng
      background url('../../assets/images/hs/wanchengLight.png') no-repeat center #4272FF;
      opacity 1
    .chaoshi
      background url('../../assets/images/hs/chaoshi.png') no-repeat center #FA4F43
      box-shadow: 0 8px 12px -4px rgba(178,26,26,0.40);
  // 已完成
  .el-step__head.is-finish
    .jiedan
      opacity 1

  .conclusions
    padding: 0;

  .liftInfo
    padding: 0;
  .scrollDiv
    overflow-x hidden
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
  .leftErrow,.rightErrow
    display inline-block
    width 32px;
    height 32px
    background url('../../assets/images/hs/left2.png') no-repeat center;
    position absolute
    top: 133px;
    cursor: pointer
  .leftErrow
    left:25px
  .rightErrow
    right:25px;
    /*水平翻转*/
    -webkit-transform:rotateY(180deg);
    transform:rotateY(180deg);
  .unPrev{
    background url('../../assets/images/hs/left1.png') no-repeat left center;
    cursor: not-allowed;
  }
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
  #mapContainer 
    width: 100%;
    margin: 0px;
    height: 100%;
    border-radius: 0 0 10px 10px
    height: 192px;
  @keyframes ripple {
    0% {
      left:4px;
      top:4px;
      opcity:75;
      width:0;
      height:0;
    }
    100% {
      left:-21px;
      top:-21px;
      opacity: 0;
      width:50px;
      height:50px;
    }
  }
  .dotMaker:before
    content:' ';
    position: absolute;
    z-index:2;
    left:0;
    top:0;
    width:8px;
    height:8px;
    background-color: #4272FF;
    border-radius: 50%;

  .dotMaker:after
    content:' ';
    position: absolute;
    z-index:1;
    width: 8px;
    height: 8px;
    background-color: #4272FF;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.3) inset;
    -webkit-animation-name:'ripple';/*动画属性名，也就是我们前面keyframes定义的动画名*/
    -webkit-animation-duration: 1s;/*动画持续时间*/
    -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
    -webkit-animation-delay: 0s;/*动画延迟时间*/
    -webkit-animation-iteration-count: infinite;/*定义循环资料，infinite为无限次*/
    -webkit-animation-direction: normal;/*定义动画方式*/

</style>
