<template>
  <div id="LiftAddResult">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">添加电梯</span>
      </div>

      <div class="lift-add-search">
        <div class="la-search-box">
          <search-code :code="parentCode" @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="lift-list">
        <div class="lift-add-result-heading clearfix">
          <h4>查询结果</h4>
          <span>查询结果如未完善，请手动补充</span>
        </div>
        <div class="la-result">
          <el-form :model="ruleForm" :rules="rules" ref="laForm">
            <div class="lar-wrap">
              <div class="lar-item">
                <div class="lar-item-title blueInfo">
                  <i>1</i><span>基本信息</span>
                </div>
                <div class="lar-con clearfix">
                  <el-form-item prop="regCode" class="lar-box">
                    <h4>电梯注册代码</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.regCode}}</p>
                    <el-input v-model="ruleForm.regCode" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="inNum" class="lar-box">
                    <h4>内部编号</h4>
                    <el-input v-model="ruleForm.inNum" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="propertyName" class="lar-box">
                    <h4>物业公司</h4>
                    <el-input v-model="ruleForm.propertyName" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="propertyPhone" class="lar-box">
                    <h4>物业电话</h4>
                    <el-input v-model="ruleForm.propertyPhone" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="userDepartment" class="lar-box">
                    <h4>使用单位</h4>
                    <el-input v-model="ruleForm.userDepartment" size="small"></el-input>
                  </el-form-item>

                  <!-- 省市区街道级联 -->
                  <el-form-item prop="areaCode" class="lar-box">
                    <h4>城市/区域</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.localArea}}</p>
                    <city-choose2 @childVal="getCity" :selectCity="special.areaCode" v-else></city-choose2>
                  </el-form-item>

                  <el-form-item prop="address" class="lar-box">
                    <h4>详细地址</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.address}}</p>
                    <el-input v-model="ruleForm.address" size="small" id="address" @input="searchMap()" v-else></el-input>
                  </el-form-item>
                  
                </div>

                <div class="map-box">
                  <div id="map-container"></div>
                </div>  
              </div>

              <div class="lar-item">
                <div class="lar-item-title yellowInfo">
                  <i>2</i><span>出厂信息</span>
                </div>
                <div class="lar-con clearfix">
                  <el-form-item prop="elevName" class="lar-box">
                    <h4>电梯名称</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.elevName}}</p>
                    <el-input v-model="ruleForm.elevName" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="elevType" class="lar-box">
                    <h4>型号</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.elevType}}</p>
                    <el-input v-model="ruleForm.elevType" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="elevVar" class="lar-box">
                    <h4>电梯品种</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.elevVar}}</p>
                    <el-input v-model="ruleForm.elevVar" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="elevFacnum" class="lar-box">
                    <h4>出厂编号</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.elevFacnum}}</p>
                    <el-input v-model="ruleForm.elevFacnum" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="manufactName" class="lar-box">
                    <h4>制造单位</h4>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.manufactName}}</p>
                    <el-input v-model="ruleForm.manufactName" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="elevDate" class="lar-box">
                    <h4>制造日期</h4>
                    <div v-if="submitState == 'post'" class="dwc-date-icon"></div>
                    <p class="show-pp" v-if="submitState == 'put'">{{ruleForm.elevDate}}</p>
                    <el-date-picker v-model="ruleForm.elevDate" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%" v-else></el-date-picker>
                  </el-form-item>

                </div>

              </div>

              <div class="lar-item">
                <div class="lar-item-title greenInfo">
                  <i>3</i><span>技术参数</span>
                </div>
                <div class="lar-con clearfix">
                  <el-form-item prop="ratedLoad" class="lar-box">
                    <h4>额定载重（kg）</h4>
                    <el-input v-model="ruleForm.ratedLoad" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="stopFnum" class="lar-box">
                    <h4>停层站数</h4>
                    <el-input v-model="ruleForm.stopFnum" size="small"></el-input>
                  </el-form-item>

                  <el-form-item prop="controlMode" class="lar-box">
                    <h4>控制方式</h4>
                    <div v-if="ruleForm.controlMode && ruleForm.controlMode == '其他'">
                      <el-input v-model="special.controlMode" size="small" placeholder="请输入控制方式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.controlMode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in controlModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item prop="dragMode" class="lar-box">
                    <h4>拖动方式</h4>
                    <div v-if="ruleForm.dragMode && ruleForm.dragMode == '其他'">
                      <el-input v-model="special.dragMode" size="small" placeholder="请输入拖动方式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.dragMode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in dragModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  
                  
                  <!-- 数据要特殊处理 -->
                  <el-form-item prop="carSize" class="lar-box">
                    <h4>轿厢尺寸（m）</h4>
                    <div class="clearfix">
                      <div style="float: left; width: 30%; margin-right: 5%;">
                        <el-input v-model="special.carSize.kuan" size="small" placeholder="宽度"></el-input>
                      </div>
                      <div style="float: left; width: 30%; margin-right: 5%;">
                        <el-input v-model="special.carSize.shen" size="small" placeholder="深度"></el-input>
                      </div>
                      <div style="float: left; width: 30%">
                        <el-input v-model="special.carSize.gao" size="small" placeholder="高度"></el-input>
                      </div>

                    </div>
                  </el-form-item>

                  <el-form-item prop="doorForm" class="lar-box">
                    <h4>轿门形式</h4>
                    <div v-if="ruleForm.doorForm && ruleForm.doorForm == '其他'">
                      <el-input v-model="special.doorForm" size="small" placeholder="请输入轿门形式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.doorForm" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in doorFormOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="doorOsize" class="lar-box">
                    <h4>开门尺寸（m）</h4>
                    <el-input v-model="ruleForm.doorOsize" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="doorOdir" class="lar-box">
                    <h4>开门方向</h4>
                    <el-select v-model="ruleForm.doorOdir" placeholder="请选择" size="small" style="width: 100%;">
                      <el-option v-for="item in doorOdirOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="tractMode" class="lar-box">
                    <h4>曳引方式</h4>
                    <div v-if="ruleForm.tractMode && ruleForm.tractMode == '其他'">
                      <el-input v-model="special.tractMode" size="small" placeholder="请输入曳引方式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.tractMode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in tractModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="ratedSpeed" class="lar-box">
                    <h4>额定运行速度（m/s）</h4>
                    <el-input v-model="ruleForm.ratedSpeed" size="small"></el-input>
                  </el-form-item>

                  

                  <div style="width: 100%;overflow: hidden;">
                    <el-form-item prop="carForm" class="lar-box" style="width: 100%;">
                      <h4>轿厢形式</h4>
                      <div class="clearfix" v-for="(item, i) in special.carForm" :key="i">
                        <div style="float: left; width: 22%;margin-bottom: 3px;">
                          <el-input v-model="item.value" size="small" placeholder="请输入"></el-input>
                        </div>
                        <div class="delete-floor-icon" @click="deleteCarForm(i)" v-if="i > 0"></div>
                      </div>
                    </el-form-item>
                  </div>

                  <div class="add-floor clearfix">
                    <div class="lar-box" style="width: 100%;">
                      <span class="add-floor-btn" @click="addCarForm">添加轿厢形式</span>
                    </div>
                  </div>
                  
                </div>

              </div>

              <div class="lar-item">
                <div class="lar-item-title blackInfo">
                  <i>4</i><span>维保信息</span>
                </div>
                <div class="lar-con clearfix">
                  <el-form-item prop="statUtime" class="lar-box">
                    <h4>投入使用时间</h4>
                    <div class="dwc-date-icon"></div>
                    <el-date-picker v-model="ruleForm.statUtime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="exemptYear" class="lar-box">
                    <h4>免包期限（年）</h4>
                    <el-input v-model="ruleForm.exemptYear" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="exemptStime" class="lar-box">
                    <h4>免保开始时间</h4>
                    <div class="dwc-date-icon"></div>
                    <el-date-picker v-model="ruleForm.exemptStime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="exemptEtime" class="lar-box">
                    <h4>免保终止时间</h4>
                    <div class="dwc-date-icon"></div>
                    <el-date-picker v-model="ruleForm.exemptEtime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="maintenStime" class="lar-box">
                    <h4>维保合同开始日期</h4>
                    <div class="dwc-date-icon"></div>
                    <el-date-picker v-model="ruleForm.maintenStime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="maintenEtime" class="lar-box">
                    <h4>维保合同终止日期</h4>
                    <div class="dwc-date-icon"></div>
                    <el-date-picker v-model="ruleForm.maintenEtime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>

                </div>

              </div>

              <div class="lar-item">
                <div class="lar-item-title lightYellowInfo">
                  <i>5</i><span>业务参数</span>
                </div>
                <div class="lar-con clearfix">
                  <div class="clearfix">
                  </div>
                  <el-form-item prop="topHeight" class="lar-box">
                    <h4>顶层高度（m）</h4>
                    <el-input v-model="ruleForm.topHeight" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="bottomHeight" class="lar-box">
                    <h4>底坑深度（m）</h4>
                    <el-input v-model="ruleForm.bottomHeight" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="wellHeight" class="lar-box">
                    <h4>井道高度（m）</h4>
                    <el-input v-model="ruleForm.wellHeight" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="carHeight" class="lar-box">
                    <h4>轿厢高度（m）</h4>
                    <el-input v-model="ruleForm.carHeight" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="lowLevel" class="lar-box">
                    <h4>底层（F）</h4>
                    <el-input v-model="ruleForm.lowLevel" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="highLevel" class="lar-box">
                    <h4>顶层（F）</h4>
                    <el-input v-model="ruleForm.highLevel" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="tractCircf" class="lar-box">
                    <h4>曳引轮周长（m）</h4>
                    <el-input v-model="ruleForm.tractCircf" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="loadControl" class="lar-box">
                    <h4>载荷控制器</h4>
                    <el-input v-model="ruleForm.loadControl" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="countWeight" class="lar-box">
                    <h4>对重装置重量（kg）</h4>
                    <el-input v-model="ruleForm.countWeight" size="small"></el-input>
                  </el-form-item>

                  <div style="width: 100%;overflow: hidden;">
                    <el-form-item prop="floorsHeight" class="lar-box" style="width: 100%;">
                      <h4>层高（m）</h4>
                      <div class="clearfix" v-for="(item, i) in special.floorsHeight" :key="i">
                        <div style="float: left; width: 8%;">
                          <el-input v-model="item.floor1" size="small" placeholder="楼层"></el-input>
                        </div>
                        <div class="floors-split">-</div>
                        <div style="float: left; width: 8%;">
                          <el-input v-model="item.floor2" size="small" placeholder="楼层"></el-input>
                        </div>
                        <div class="floors-split">高度为</div>
                        <div style="float: left; width: 12%">
                          <el-input v-model="item.height" size="small" placeholder="高度"></el-input>
                        </div>
                        <div class="delete-floor-icon" @click="deleteFloor(i)" v-if="i > 0"></div>
                      </div>
                    </el-form-item>
                  </div>

                  <div class="add-floor clearfix">
                    <div class="lar-box" style="width: 100%;">
                      <span class="add-floor-btn" @click="addFloor">添加层高</span>
                      <em class="add-floor-tip">（负楼层默认为负号，如“-1”，不可为“B1”）</em>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <!-- <el-button type="primary" @click="submit">立即创建</el-button> -->

            <div class="form-btn">
              <input class="la-btn la-btn-cancel" type="button" value="取消" @click="cancel">
              <input class="la-btn la-btn-submit" type="button" value="确认录入" @click="submit">
            </div>


          </el-form>

          

        </div>
      </div>

    </div>

    <footer-temp></footer-temp>

  </div>
</template>

<script>
// import pcas from '../../utils/citySelector/pcas-code.json'
import api from '../../api'
import SearchCode from '../../components/SearchCode'
import CityChoose2 from '../../components/CityChoose2'
import Footer from '../common/fotter'

export default {
  data() {
    // 自定义校验
    // var exemptEtimeCheck = ()
    return {
      parentCode: '',
      submitState: 'post', // 判断录入电梯(post)还是编辑电梯(put)
      
      ruleForm2: {
        'regCode': '007',
        'inNum': 'DT001',
        'propertyName': '维保公司',
        'propertyPhone': '110',
        'userDepartment': '通用互联',
        'localArea': '深圳市',
        'areaCode': ["44", "4403"],
        'address': '花园城数码大厦',
        'latLon': '109.412695,24.310411',
        'elevName': '三菱ABC',
        'elevType': '型号',
        'elevVar': '电梯品种',
        'elevFacnum': '出厂编号',
        'manufactName': '制造单位',
        'elevDate': '2018-06-1',
        'ratedLoad': 99,
        'stopFnum': '停层站数',
        'controlMode': 0,
        'dragMode': '1',
        // 轿厢尺寸特殊处理
        'carSize': '30:60:50',
        'doorForm': '1',
        'doorOsize': 66,
        'doorOdir': '1',
        'tractMode': '0',
        'ratedSpeed': 888,
        'carForm': '轿厢形式1:轿厢形式2',
        'statUtime': '2018-06-18',
        'exemptYear': 0,
        'exemptStime': '2018-06-18',
        'exemptEtime': '2018-08-18',
        'maintenStime': '2018-06-18',
        'maintenEtime': '2018-08-18',

        'topHeight': 99,
        'bottomHeight': 321,
        'wellHeight': 564564,
        'carHeight': 777,
        'lowLevel': 2,
        'highLevel': 100,
        'tractCircf': 999,
        'loadControl': '荷载控制器',

        'countWeight': 99,
        'floorsHeight': '[{"floor": "-1, 1", "height": "5"}, {"floor": "1, 5", "height" : "4"}, {"floor": "5, 35", "height": "3.5"}]',
        'extend': '',
        
      },

      // 用于重置的空参数
      ruleFormBlank: {
        'regCode': '',
        'inNum': '',
        'propertyName': '',
        'propertyPhone': '',
        'userDepartment': '',
        'localArea': '',
        'areaCode': '',
        'address': '',
        'latLon': '',
        'elevName': '',
        'elevType': '',
        'elevVar': '',
        'elevFacnum': '',
        'manufactName': '',
        'elevDate': '',
        'ratedLoad': '',
        'stopFnum': '',
        'controlMode': '',
        'dragMode': '',
        // 轿厢尺寸特殊处理
        'carSize': '',
        'doorForm': '',
        'doorOsize': '',
        'doorOdir': '',
        'tractMode': '',
        'ratedSpeed': '',
        'carForm': '',
        'statUtime': '',
        'exemptYear': '',
        'exemptStime': '',
        'exemptEtime': '',
        'maintenStime': '',
        'maintenEtime': '',

        'topHeight': '',
        'bottomHeight': '',
        'wellHeight': '',
        'carHeight': '',
        'lowLevel': '',
        'highLevel': '',
        'tractCircf': '',
        'loadControl': '',

        'countWeight': '',
        'floorsHeight': '',
        'extend': '',
        
      },

      // 正式提交的json参数
      ruleForm: {
        'regCode': '',
        'inNum': '',
        'propertyName': '',
        'propertyPhone': '',
        'userDepartment': '',
        'localArea': '',
        'areaCode': '',
        'address': '',
        'latLon': '',
        'elevName': '',
        'elevType': '',
        'elevVar': '',
        'elevFacnum': '',
        'manufactName': '',
        'elevDate': '',
        'ratedLoad': '0',
        'stopFnum': '0',
        'controlMode': '轿内按钮控制',
        'dragMode': '交流双速电动机变极调速拖动',
        // 轿厢尺寸特殊处理
        'carSize': '0:0:0',
        'doorForm': '封闭式中分开门',
        'doorOsize': '0',
        'doorOdir': '左开门',
        'tractMode': '半绕1:1吊索法',
        'ratedSpeed': '0',
        'carForm': '0',
        'statUtime': '',
        'exemptYear': '',
        'exemptStime': '',
        'exemptEtime': '',
        'maintenStime': '',
        'maintenEtime': '',

        'topHeight': '',
        'bottomHeight': '',
        'wellHeight': '',
        'carHeight': '',
        'lowLevel': '',
        'highLevel': '',
        'tractCircf': '',
        'loadControl': '',

        'countWeight': '',
        'floorsHeight': '',
        'extend': '',
        
      },

      // 用于重置的空参数
      specialBlank: {
        lng: '',
        lat: '',
        carSize: {
          gao: '',
          kuan: '',
          shen: ''
        },
        doorForm: '',
        controlMode: '',
        dragMode: '',
        floorsHeight: [
          {floor1: '', floor2: '', height: ''}
        ],
        carForm: [
          {value: ''}
        ],
        areaCode: [],
        chooseCity: '',

      },
      
      // 需要特殊处理的字段
      // 用于页面展示
      special: {
        lng: '',
        lat: '',
        carSize: {
          gao: '0',
          kuan: '0',
          shen: '0'
        },
        doorForm: '',
        controlMode: '',
        dragMode: '',
        floorsHeight: [
          {floor1: '', floor2: '', height: ''}
        ],
        carForm: [
          {value: ''}
        ],
        areaCode: [],
        chooseCity: '',

      },
      // 用于存放单个电梯原始数据
      list: {},
      rules: {

        regCode: [{ required: true, message: '必填', trigger: 'blur' }],
        areaCode: [{ required: true, message: '必填', trigger: 'blur' }],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
        bottomHeight: [{ required: true, message: '必填', trigger: 'blur' }],
        // carForm: [{ required: true, message: '必填', trigger: 'blur' }],
        carHeight: [{ required: true, message: '必填', trigger: 'blur' }],
        // carSize: [{ required: true, message: '必填', trigger: 'blur' }],
        // controlMode: [{ required: true, message: '必填', trigger: 'blur' }],
        countWeight: [{ required: true, message: '必填', trigger: 'blur' }],
        // doorForm: [{ required: true, message: '必填', trigger: 'blur' }],
        // doorOdir: [{ required: true, message: '必填', trigger: 'blur' }],
        // doorOsize: [{ required: true, message: '必填', trigger: 'blur' }],
        // dragMode: [{ required: true, message: '必填', trigger: 'blur' }],
        elevDate: [{ required: true, message: '必填', trigger: 'blur' }],
        elevFacnum: [{ required: true, message: '必填', trigger: 'blur' }],
        elevName: [{ required: true, message: '必填', trigger: 'blur' }],
        elevType: [{ required: true, message: '必填', trigger: 'blur' }],
        elevVar: [{ required: true, message: '必填', trigger: 'blur' }],
        exemptEtime: [
          { required: true, message: '必填', trigger: 'blur' },
          // { validator: exemptEtimeCheck, trigger: "blur" }
        ],
        exemptStime: [{ required: true, message: '必填', trigger: 'blur' }],
        exemptYear: [{ required: true, message: '必填', trigger: 'blur' }],
        // extend: [{ required: true, message: '必填', trigger: 'blur' }],
        // floorsHeight: [{ required: true, message: '必填', trigger: 'blur' }],
        highLevel: [{ required: true, message: '必填', trigger: 'blur' }],
        inNum: [{ required: true, message: '必填', trigger: 'blur' }],
        latLon: [{ required: true, message: '必填', trigger: 'blur' }],
        loadControl: [{ required: true, message: '必填', trigger: 'blur' }],
        localArea: [{ required: true, message: '必填', trigger: 'blur' }],
        lowLevel: [{ required: true, message: '必填', trigger: 'blur' }],
        maintenEtime: [{ required: true, message: '必填', trigger: 'blur' }],
        maintenStime: [{ required: true, message: '必填', trigger: 'blur' }],
        manufactName: [{ required: true, message: '必填', trigger: 'blur' }],
        propertyName: [{ required: true, message: '必填', trigger: 'blur' }],
        propertyPhone: [{ required: true, message: '必填', trigger: 'blur' }],
        // ratedLoad: [{ required: true, message: '必填', trigger: 'blur' }],
        // ratedSpeed: [{ required: true, message: '必填', trigger: 'blur' }],
        statUtime: [{ required: true, message: '必填', trigger: 'blur' }],
        // stopFnum: [{ required: true, message: '必填', trigger: 'blur' }],
        topHeight: [{ required: true, message: '必填', trigger: 'blur' }],
        tractCircf: [{ required: true, message: '必填', trigger: 'blur' }],
        // tractMode: [{ required: true, message: '必填', trigger: 'blur' }],
        userDepartment: [{ required: true, message: '必填', trigger: 'blur' }],
        wellHeight: [{ required: true, message: '必填', trigger: 'blur' }],

      },
      doorFormOptions: [
        {value: '封闭式中分开门', label: '封闭式中分开门'},
        {value: '封闭双折式中分开门', label: '封闭双折式中分开门'},
        {value: '封闭双折式旁开门', label: '封闭双折式旁开门'},
        {value: '其他', label: '其他'},
      ],
      doorOdirOptions: [
        {value: '左开门', label: '左开门'},
        {value: '右开门', label: '右开门'},
        {value: '中开门/中分门', label: '中开门/中分门'},
      ],
      tractModeOptions: [
        {value: '半绕1:1吊索法', label: '半绕1:1吊索法'},
        {value: '全绕1:1吊索法', label: '全绕1:1吊索法'},
        {value: '半绕2:1吊索法', label: '半绕2:1吊索法'},
        {value: '其他', label: '其他'},
      ],
      dragModeOptions: [
        {value: '交流双速电动机变极调速拖动', label: '交流双速电动机变极调速拖动'},
        {value: '交流双速电动机调压调速拖动', label: '交流双速电动机调压调速拖动'},
        {value: '交流单速电动机调频调压调速拖动', label: '交流单速电动机调频调压调速拖动'},
        {value: '永磁同步电动机调频调压调速拖动方式', label: '永磁同步电动机调频调压调速拖动方式'},
        {value: '其他', label: '其他'},
      ],
      controlModeOptions: [
        {value: '轿内按钮控制', label: '轿内按钮控制'},
        {value: '轿内外按钮控制', label: '轿内外按钮控制'},
        {value: '轿外按钮控制', label: '轿外按钮控制'},
        {value: '单台集选控制', label: '单台集选控制'},
        {value: '两台集选控制', label: '两台集选控制'},
        {value: '3台以上集选梯群控制', label: '3台以上集选梯群控制'},
        {value: '其他', label: '其他'},
      ],

    }
  },

  created() {
    this.parentCode = this.$route.query.regCode
    this.submitState = this.$route.query.submitState
  },
  mounted() {

    // TODO 请求成功后再加载地图
    this.searchMap()
    this.getLiftResult()

  },
  methods: {
    // 处理流程：http请求到数据 -> 正常数据放入ruleForm，需要特殊处理的使用transfrom函数处理，并存入special -> 页面渲染和双向绑定    
    //          点击submit提交数据 -> 将special处理成合适的格式，存入ruleForm -> 提交

    // 获取电梯详情
    getLiftResult() {
      let that = this
      api.lift.getLiftResult(this.parentCode).then(res => {
        if (!res.data.data) {
          // this.submitState = 'post'
          // this.ruleForm = this.ruleFormBlank
          // this.special = this.specialBlank
          this.ruleForm.regCode = this.parentCode
          return
        }
        // this.submitState = 'put'
        let detail = res.data.data
        for (var key in detail) {
          this.ruleForm[key] = detail[key]
        }
   
        // 特殊处理字段
        if (this.ruleForm.areaCode !== '') {
          this.special.areaCode = this.transformAreaCode(this.ruleForm.areaCode)
        }
        if (this.ruleForm.carSize !== '') {
          this.special.carSize = this.transformCarSize(this.ruleForm.carSize)
        }
        if (this.ruleForm.floorsHeight !== '') {
          this.special.floorsHeight = this.transformFloorsHeight(this.ruleForm.floorsHeight)
        }
        if (this.ruleForm.carForm !== '') {
          this.special.carForm = this.transformCarForm(this.ruleForm.carForm)
        }

        this.searchMap(detail.latLon)
      })

    },

    // 特殊处理获得的areaCode区域码
    transformAreaCode(areaCode) {
      // 字符串转数组
      // "440305005000" => ["44", "4403", "440305", "440305005"]
      if (typeof areaCode == 'string') {
        let province = areaCode.substr(0, 2)
        let city = areaCode.substr(0, 4)
        let region = areaCode.substr(0, 6)
        let street = areaCode.substr(0, 9)
        let cityShow = []
        if (areaCode.length <= 2) {
          cityShow.push(province)
        } else if (areaCode.length > 2 && areaCode.length <= 4 ) {
          cityShow.push(province, city)
        } else if (areaCode.length > 4 && areaCode.length <= 6 ) {
          cityShow.push(province, city, region)
        } else {
          cityShow.push(province, city, region, street)
        }
        return cityShow
      }

      // 数组转字符串
      // ["44", "4403", "440305", "440305005"] => "440305005000"
      if (areaCode instanceof Array) {
        return areaCode[areaCode.length - 1]
      }

      console.log('areaCode传入类型错误')
    },

    // 特殊处理轿厢尺寸
    transformCarSize(carSize) {
      // 字符串转对象
      // '10:20:30' => carSize: {gao: '', shen: '', kuan: ''}
      if (typeof carSize == 'string') {
        let carSizeObj = {}
        carSizeObj.gao = carSize.split(':')[0]
        carSizeObj.kuan = carSize.split(':')[1]
        carSizeObj.shen = carSize.split(':')[2]
        return carSizeObj
      }

      // 对象转字符串
      // carSize: {gao: '', shen: '', kuan: ''} => '10:20:30'
      if (carSize instanceof Object) {
        if (carSize.gao === '' || carSize.kuan === '' || carSize.shen === '') {
          return ''
        } else {
          return carSize.gao + ':' + carSize.kuan + ':' + carSize.shen
        }
      }

      console.log('carSize传入类型错误')
    },

    // 特殊处理层高
    transformFloorsHeight(floorsHeight) {
      // 字符串数组重组成新形式数组
      // "[{'floor': '-1, 1', 'height': '5'}, {'floor': '1, 5', 'height' : '4'}]" => [{floor1: '-1', floor2: '1', height: '5'}, {floor1: '1', floor2: '5', height: '4'}]
      if (typeof floorsHeight == 'string') {
        let evalFloorsHeight = eval(floorsHeight)
        let floorsHeightArr = []
        evalFloorsHeight.forEach(item => {
          floorsHeightArr.push({
            floor1: item.floor.split(',')[0],
            floor2: item.floor.split(',')[1],
            height: item.height
          })
        })
        return floorsHeightArr
      }

      // 新形式数组重组为字符串数组
      // [{floor1: '-1', floor2: '1', height: '5'}, {floor1: '1', floor2: '5', height: '4'}] => "[{'floor': '-1, 1', 'height': '5'}, {'floor': '1, 5', 'height' : '4'}]"
      if (floorsHeight instanceof Array) {
        if (floorsHeight.length === 1 && floorsHeight[0].floor1 === '' && floorsHeight[0].floor2 === '' && floorsHeight[0].height === '') return ''
        let carSizeArrStr = []
        floorsHeight.forEach((item, i) => {
          if (item.floor1 === '' || item.floor2 === '') {
            return true
          } else {
            carSizeArrStr.push({
              floor: item.floor1 + ',' + item.floor2,
              height: item.height
            })
          }
          
        })
        return JSON.stringify(carSizeArrStr)
      }
      
      console.log('floorsHeight传入类型错误')
    },

    // 特殊处理轿厢形式
    transformCarForm(carForm) {
      console.log('carForm传', carForm)
      // 字符串转数组
      // "轿厢形式1:轿厢形式2" => [{value: '轿厢形式1'}, {value: '轿厢形式2'}]
      if (typeof carForm == 'string') {
        let carFormArr = carForm.split(':')
        let carFormArrTrans = []
        carFormArr.forEach(item => {
          carFormArrTrans.push({
            value: item
          })
        })
        return carFormArrTrans
      }

      // 数组转字符串
      // [{value: '轿厢形式1'}, {value: '轿厢形式2'}] => "轿厢形式1:轿厢形式2" 
      if (carForm instanceof Array) {
        let carFormArr = []
        
        carForm.forEach(item => {
          carFormArr.push(item.value)
        })
        if (carFormArr.length === 0) {
          return ''
        } else {
          return carFormArr.join(':')
        }
      }
      
      console.log('carForm传入类型错误')
    },

    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/lift-add-result',
        query: {
          regCode: val
        }
      })
      this.getLiftResult()
      console.log('pp', this.parentCode)
    },

    // 地图
    drawMap() {
      var map = new AMap.Map("map-container", {
        resizeEnable: true,
        zoom: 20,
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
      });

      var marker = new AMap.Marker({
        map: map,
        // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        content: 
        `
        <div class="point">
          <div class="point-light"></div>
          <div class="point-circle"></div>
        </div>
        `
        ,
        position: [116.405467, 39.907761],
        draggable: true
      });
  
      marker.on('dragging', function (e) {
        console.log(e)
      });

      // 根据覆盖物自适应缩放
      map.setFitView();

    },

    // 搜索地图
    searchMap(latLon) {
      let that = this
      console.log('latLon', latLon)

      // 地图基础配置
      var marker;
      var map = new AMap.Map("map-container", {
        resizeEnable: true,
        zoom: 20,
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
      });

      function addMarker(lng, lat) {
        // 创建覆盖物
        marker = new AMap.Marker({
          map: map,
          // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          content: 
          `
          <div class="point">
            <div class="point-light"></div>
            <div class="point-circle"></div>
          </div>
          `
          ,
          position: [lng, lat],
          draggable: true
        });

        marker.setMap(map)

        // 拖拽
        marker.on('dragging', function (e) {
          that.special.lng = e.lnglat.lng
          that.special.lat = e.lnglat.lat
        });

      }

      if (latLon) {
        let lng = latLon.split(',')[0]
        let lat = latLon.split(',')[1]
        addMarker(lng, lat)
        map.setCenter([lng, lat]); //设置地图中心点
        console.log('gggggg', lng, lat)
        return

      }

      // 搜索
      let keywords = this.ruleForm.localArea + this.ruleForm.address
      console.log('搜索关键字', keywords)
      AMap.plugin('AMap.Autocomplete', function() {
        // 实例化Autocomplete
        var autoOptions = {
          city: '全国'
        }
        var autoComplete = new AMap.Autocomplete(autoOptions);

        function addMarker(lng, lat) {
          // 创建覆盖物
          marker = new AMap.Marker({
            map: map,
            // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            content: 
            `
            <div class="point">
              <div class="point-light"></div>
              <div class="point-circle"></div>
            </div>
            `
            ,
            position: [lng, lat],
            draggable: true
          });

          marker.setMap(map)

          // 拖拽
          marker.on('dragging', function (e) {
            that.special.lng = e.lnglat.lng
            that.special.lat = e.lnglat.lat
          });

        }


        autoComplete.search(keywords, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(status, result)
          if (status !== 'complete' || result.tips.length == 0) return
          let lng = result.tips[0].location.lng
          let lat = result.tips[0].location.lat
          that.special.lng = lng
          that.special.lat = lat
          // map.setZoom(20)
          map.setCenter([lng, lat]); //设置地图中心点
          addMarker(lng, lat)

          // 根据覆盖物自适应缩放
          map.setFitView();
        })

        map.on('click', (e) => {
          console.log(e)
          map.clearMap()
          that.special.lng = e.lnglat.lng
          that.special.lat = e.lnglat.lat
          addMarker(e.lnglat.lng, e.lnglat.lat)
        });
      })
    },

    // 添加层高
    addFloor() {
      this.special.floorsHeight.push({
        floor1: '',
        floor2: '',
        height: '',
      })
    },

    // 删除层高
    deleteFloor(i) {
      this.special.floorsHeight.splice(i, 1)
    },

    // 添加轿厢形式
    addCarForm() {
      this.special.carForm.push({
        value: ''
      })
    },

    // 删除轿厢形式
    deleteCarForm(i) {
      this.special.carForm.splice(i, 1)
    },

    // 获取省市区联动值
    getCity(arr, cityName) {
      this.ruleForm.areaCode = arr[arr.length - 1]
      this.special.areaCode = arr
      this.special.chooseCity = cityName
      this.ruleForm.localArea = cityName.join(' ')
      this.searchMap()
    },

    // 取消提交
    cancel() {
      this.$router.push({
        path: '/lift-list'
      })
    },

    // 提交
    submit() {
      let that = this
      this.$refs.laForm.validate(valid => {

        if (valid) {
          // alert('submit')

          // 特殊处理字段
          this.ruleForm.areaCode = this.transformAreaCode(this.special.areaCode)
          this.ruleForm.carSize = this.transformCarSize(this.special.carSize)
          this.ruleForm.floorsHeight = this.transformFloorsHeight(this.special.floorsHeight)
          this.ruleForm.carForm = this.transformCarForm(this.special.carForm)
          if (this.ruleForm.doorForm == '其他') {
            this.ruleForm.doorForm = this.special.doorForm
          }
          if (this.ruleForm.controlMode == '其他') {
            this.ruleForm.controlMode = this.special.controlMode
          }
          if (this.ruleForm.dragMode == '其他') {
            this.ruleForm.dragMode = this.special.dragMode
          }
          if (this.ruleForm.tractMode == '其他') {
            this.ruleForm.tractMode = this.special.tractMode
          }
          let lng = this.special.lng || ''
          let lat = this.special.lat || ''
          if (lng && lat) {
            this.ruleForm.latLon = `${lng},${lat}`
          } else {
            this.ruleForm.latLon = ''
          }

          console.log(this.ruleForm)


          if (this.submitState == 'put') {
            api.lift.editLift(this.ruleForm).then(res => {
              console.log('put', res)
              if (res.data.code == '200') {
                that.$message.success(`${res.data.message}`)
                that.$router.push({path: '/lift-list'})
              } else {
                that.$message.error(`${res.data.message}`)
              }
            })
          } else {
            api.lift.addLift(this.ruleForm).then(res => {
              console.log('post', res)
              if (res.data.code == '200') {
                that.$message.success('添加电梯成功')
                that.$router.push({path: '/lift-list'})
              } else {
                that.$message.error(`${res.data.message}`)
              }
            })
          }

        } else {
          console.log('error',this.ruleForm)
        }
      })
    },

  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    'city-choose2': CityChoose2,
  }
}
</script>

<style>
  
/* 地图marker样式 */
#LiftAddResult .point{
  position: relative;
  width: 48px;
  height: 48px;
  margin-left: -16px;
  margin-top: -24px;
}
#LiftAddResult .point-light{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #4272FF;
  opacity: 0.5;
  border-radius: 100%;
  animation: myScale 1.5s infinite forwards;
}
#LiftAddResult .point-circle{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #4272FF;
  border-radius: 100%;
}

@keyframes myScale{
  0% {opacity: 0.8;transform: scale(0.1);}
  100% {opacity: 0;transform: scale(1);}
}
  
</style>

<style lang="stylus" scoped>

#LiftAddResult{
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height 1;
  }

  .lift-list{
    background none;
  }
  .lar-wrap{
    padding 1px 40px 30px;
  }
  .lar-item{
    margin-top 10px;
  }
  .lar-item-title{
    line-height 16px;
    height 16px;
    padding 20px 0;
    border-bottom 1px dashed #D8DDDF;
  }
  .lar-item-title.blueInfo{
    color #4272FF;
  }
  .lar-item-title.yellowInfo{
    color #FFA90B;
  }
  .lar-item-title.greenInfo{
    color: #9ACF63;
  }
  .lar-item-title.blackInfo{
    color: #34414C;
  }
  .lar-item-title.lightYellowInfo{
    color: #FFC60B;
  }
  .lar-item-title i{
    font-style normal;
    display inline-block;
    width 16px;
    height 16px;
    line-height 16px;
    text-align center;
    font-size 10px;
    border-radius 100%;
    vertical-align middle;
    margin-top -4px;
    margin-right 10px;
  }
  .lar-item-title.blueInfo i{
    background #4272FF;
    color #fff;
  }
  .lar-item-title.yellowInfo i{
    background #FFA90B;
    color #fff;
  }
  .lar-item-title.greenInfo i{
    background #9ACF63;
    color #fff;
  }
  .lar-item-title.blackInfo i{
    background #34414C;
    color #fff;
  }
  .lar-item-title.lightYellowInfo i{
    background #FFC60B;
    color #fff;
  }
  .lar-item-title span{
    display inline-block;
    font-size 16px;;
  }
  .lar-box{
    box-sizing border-box;
    float left;
    width 25%;
    padding 0 30px;
    margin-top 10px;
    margin-bottom 0;
  }
  .lar-box h4{
    font-weight normal;
    line-height 34px;
    font-size: 14px;
    margin-bottom: 0 !important;
    color: #7E8A95;
  }
  .map-box{
    padding 0 30px;
    margin-top 30px;
  }
  #map-container{
    height 260px;
  }
  .floors-split{
    float left;
    line-height 32px;
    padding 0 10px;
  }
  .add-floor-btn{
    cursor: pointer;
    background: url('../../assets/images/xym/add-floor.png') no-repeat left center;
    color: #536EDE;
    padding-left: 18px;
  }
  .add-floor-tip{
    font-style normal;
    font-size: 14px;
    color: #959698;
  }
  .delete-floor-icon{
    float left;
    width 30px;
    height 40px;
    background: url('../../assets/images/xym/delete.png') no-repeat center center;
    margin-left 8px;
    cursor pointer;
  }
  .delete-floor-icon:hover{
    background: url('../../assets/images/xym/delete-on.png') no-repeat center center;
  }
  .dwc-date-icon{
    top: 30px;
    z-index: 99;
  }
  .show-pp{
    line-height: 32px;
    height: 32px;
    margin-bottom: 0 !important;
  }
  

}

@media screen and (max-width: 1360px) {
  #LiftAddResult{
    min-width: 1360px;
  }
}


</style>
