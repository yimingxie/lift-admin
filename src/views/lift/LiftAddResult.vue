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
                  <el-form-item prop="reg_code" class="lar-box">
                    <h4>电梯注册代码</h4>
                    <!-- <p v-if="list.reg_code && list.reg_code !== ''">{{list.reg_code}}</p> -->
                    <p v-if="submitState == 'put'">{{ruleForm.reg_code}}</p>
                    <el-input v-model="ruleForm.reg_code" size="small" v-else></el-input>
                  </el-form-item>
                  <el-form-item prop="in_num" class="lar-box">
                    <h4>内部编号</h4>
                    <el-input v-model="ruleForm.in_num" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="property_name" class="lar-box">
                    <h4>物业公司</h4>
                    <el-input v-model="ruleForm.property_name" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="property_phone" class="lar-box">
                    <h4>物业电话</h4>
                    <el-input v-model="ruleForm.property_phone" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="user_department" class="lar-box">
                    <h4>使用单位</h4>
                    <el-input v-model="ruleForm.user_department" size="small"></el-input>
                  </el-form-item>

                  <!-- 省市区街道级联 -->
                  <el-form-item prop="area_code" class="lar-box">
                    <h4>城市/区域</h4>
                    <city-choose @childVal="getCity" :selectCity="special.area_code"></city-choose>
                  </el-form-item>

                  <el-form-item prop="address" class="lar-box">
                    <h4>详细地址</h4>
                    <el-input v-model="ruleForm.address" size="small" id="address" @input="searchMap"></el-input>
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
                  <el-form-item prop="elev_name" class="lar-box">
                    <h4>电梯名称</h4>
                    <el-input v-model="ruleForm.elev_name" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="elev_type" class="lar-box">
                    <h4>型号</h4>
                    <el-input v-model="ruleForm.elev_type" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="elev_var" class="lar-box">
                    <h4>电梯品种</h4>
                    <el-input v-model="ruleForm.elev_var" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="elev_facnum" class="lar-box">
                    <h4>出厂编号</h4>
                    <el-input v-model="ruleForm.elev_facnum" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="manufact_name" class="lar-box">
                    <h4>制造单位</h4>
                    <el-input v-model="ruleForm.manufact_name" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="elev_date" class="lar-box">
                    <h4>制造日期</h4>
                    <el-date-picker v-model="ruleForm.elev_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>

                </div>

              </div>

              <div class="lar-item">
                <div class="lar-item-title greenInfo">
                  <i>3</i><span>技术参数</span>
                </div>
                <div class="lar-con clearfix">
                  <el-form-item prop="rated_load" class="lar-box">
                    <h4>额定载重（kg）</h4>
                    <el-input v-model="ruleForm.rated_load" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="stop_fnum" class="lar-box">
                    <h4>停层站数</h4>
                    <el-input v-model="ruleForm.stop_fnum" size="small"></el-input>
                  </el-form-item>

                  <el-form-item prop="control_mode" class="lar-box">
                    <h4>控制方式</h4>
                    <div v-if="ruleForm.control_mode && ruleForm.control_mode == '其他'">
                      <el-input v-model="special.control_mode" size="small" placeholder="请输入控制方式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.control_mode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in controlModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item prop="drag_mode" class="lar-box">
                    <h4>拖动方式</h4>
                    <div v-if="ruleForm.drag_mode && ruleForm.drag_mode == '其他'">
                      <el-input v-model="special.drag_mode" size="small" placeholder="请输入拖动方式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.drag_mode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in dragModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  
                  
                  <!-- 数据要特殊处理 -->
                  <el-form-item prop="car_size" class="lar-box">
                    <h4>轿厢尺寸（m）</h4>
                    <div class="clearfix">
                      <div style="float: left; width: 30%; margin-right: 5%;">
                        <el-input v-model="special.car_size.kuan" size="small" placeholder="宽度"></el-input>
                      </div>
                      <div style="float: left; width: 30%; margin-right: 5%;">
                        <el-input v-model="special.car_size.shen" size="small" placeholder="深度"></el-input>
                      </div>
                      <div style="float: left; width: 30%">
                        <el-input v-model="special.car_size.gao" size="small" placeholder="高度"></el-input>
                      </div>

                    </div>
                  </el-form-item>

                  <el-form-item prop="door_form" class="lar-box">
                    <h4>轿门形式</h4>
                    <div v-if="ruleForm.door_form && ruleForm.door_form == '其他'">
                      <el-input v-model="special.door_form" size="small" placeholder="请输入轿门形式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.door_form" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in doorFormOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="door_osize" class="lar-box">
                    <h4>开门尺寸（m）</h4>
                    <el-input v-model="ruleForm.door_osize" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="door_odir" class="lar-box">
                    <h4>开门方向</h4>
                    <el-select v-model="ruleForm.door_odir" placeholder="请选择" size="small" style="width: 100%;">
                      <el-option v-for="item in doorOdirOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="tract_mode" class="lar-box">
                    <h4>曳引方式</h4>
                    <div v-if="ruleForm.tract_mode && ruleForm.tract_mode == '其他'">
                      <el-input v-model="special.tract_mode" size="small" placeholder="请输入曳引方式"></el-input>
                    </div>
                    <el-select v-model="ruleForm.tract_mode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                      <el-option v-for="item in tractModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="rated_speed" class="lar-box">
                    <h4>额定运行速度（m/s）</h4>
                    <el-input v-model="ruleForm.rated_speed" size="small"></el-input>
                  </el-form-item>

                  

                  <div style="width: 100%;overflow: hidden;">
                    <el-form-item prop="car_form" class="lar-box" style="width: 100%;">
                      <h4>轿厢形式</h4>
                      <div class="clearfix" v-for="(item, i) in special.car_form" :key="i">
                        <div style="float: left; width: 22%">
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
                  <el-form-item prop="stat_utime" class="lar-box">
                    <h4>投入使用时间</h4>
                    <el-date-picker v-model="ruleForm.stat_utime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="exempt_year" class="lar-box">
                    <h4>免包期限（年）</h4>
                    <el-input v-model="ruleForm.exempt_year" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="exempt_stime" class="lar-box">
                    <h4>免保开始时间</h4>
                    <el-date-picker v-model="ruleForm.exempt_stime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="exempt_etime" class="lar-box">
                    <h4>免保终止时间</h4>
                    <el-date-picker v-model="ruleForm.exempt_etime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="mainten_stime" class="lar-box">
                    <h4>维保合同开始日期</h4>
                    <el-date-picker v-model="ruleForm.mainten_stime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="mainten_etime" class="lar-box">
                    <h4>维保合同终止日期</h4>
                    <el-date-picker v-model="ruleForm.mainten_etime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
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
                  <el-form-item prop="top_height" class="lar-box">
                    <h4>顶层高度（m）</h4>
                    <el-input v-model="ruleForm.top_height" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="bottom_height" class="lar-box">
                    <h4>底坑深度（m）</h4>
                    <el-input v-model="ruleForm.bottom_height" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="well_height" class="lar-box">
                    <h4>井道高度（m）</h4>
                    <el-input v-model="ruleForm.well_height" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="car_height" class="lar-box">
                    <h4>轿厢高度（m）</h4>
                    <el-input v-model="ruleForm.car_height" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="low_level" class="lar-box">
                    <h4>底层（F）</h4>
                    <el-input v-model="ruleForm.low_level" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="high_level" class="lar-box">
                    <h4>顶层（F）</h4>
                    <el-input v-model="ruleForm.high_level" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="tract_circf" class="lar-box">
                    <h4>曳引轮周长（m）</h4>
                    <el-input v-model="ruleForm.tract_circf" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="load_control" class="lar-box">
                    <h4>载荷控制器</h4>
                    <el-input v-model="ruleForm.load_control" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="count_weight" class="lar-box">
                    <h4>对重装置重量（kg）</h4>
                    <el-input v-model="ruleForm.count_weight" size="small"></el-input>
                  </el-form-item>

                  <div style="width: 100%;overflow: hidden;">
                    <el-form-item prop="floors_height" class="lar-box" style="width: 100%;">
                      <h4>层高（m）</h4>
                      <div class="clearfix" v-for="(item, i) in special.floors_height" :key="i">
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
import CityChoose from '../../components/CityChoose'
import Footer from '../common/fotter'

export default {
  data() {
    return {
      parentCode: '',
      submitState: 'post', // 判断录入电梯(post)还是编辑电梯(put)
      
      ruleForm2: {
        'reg_code': '007',
        'in_num': 'DT001',
        'property_name': '维保公司',
        'property_phone': '110',
        'user_department': '通用互联',
        'local_area': '深圳市',
        'area_code': ["44", "4403"],
        'address': '花园城数码大厦',
        'lat_lon': '109.412695,24.310411',
        'elev_name': '三菱ABC',
        'elev_type': '型号',
        'elev_var': '电梯品种',
        'elev_facnum': '出厂编号',
        'manufact_name': '制造单位',
        'elev_date': '2018-06-1',
        'rated_load': 99,
        'stop_fnum': '停层站数',
        'control_mode': 0,
        'drag_mode': '1',
        // 轿厢尺寸特殊处理
        'car_size': '30:60:50',
        'door_form': '1',
        'door_osize': 66,
        'door_odir': '1',
        'tract_mode': '0',
        'rated_speed': 888,
        'car_form': '轿厢形式1:轿厢形式2',
        'stat_utime': '2018-06-18',
        'exempt_year': 0,
        'exempt_stime': '2018-06-18',
        'exempt_etime': '2018-08-18',
        'mainten_stime': '2018-06-18',
        'mainten_etime': '2018-08-18',

        'top_height': 99,
        'bottom_height': 321,
        'well_height': 564564,
        'car_height': 777,
        'low_level': 2,
        'high_level': 100,
        'tract_circf': 999,
        'load_control': '荷载控制器',

        'count_weight': 99,
        'floors_height': '[{"floor": "-1, 1", "height": "5"}, {"floor": "1, 5", "height" : "4"}, {"floor": "5, 35", "height": "3.5"}]',
        'extend': '',
        
      },

      // 用于重置的空参数
      ruleFormBlank: {
        'reg_code': '',
        'in_num': '',
        'property_name': '',
        'property_phone': '',
        'user_department': '',
        'local_area': '',
        'area_code': '',
        'address': '',
        'lat_lon': '',
        'elev_name': '',
        'elev_type': '',
        'elev_var': '',
        'elev_facnum': '',
        'manufact_name': '',
        'elev_date': '',
        'rated_load': '',
        'stop_fnum': '',
        'control_mode': '',
        'drag_mode': '',
        // 轿厢尺寸特殊处理
        'car_size': '',
        'door_form': '',
        'door_osize': '',
        'door_odir': '',
        'tract_mode': '',
        'rated_speed': '',
        'car_form': '',
        'stat_utime': '',
        'exempt_year': '',
        'exempt_stime': '',
        'exempt_etime': '',
        'mainten_stime': '',
        'mainten_etime': '',

        'top_height': '',
        'bottom_height': '',
        'well_height': '',
        'car_height': '',
        'low_level': '',
        'high_level': '',
        'tract_circf': '',
        'load_control': '',

        'count_weight': '',
        'floors_height': '',
        'extend': '',
        
      },

      // 正式提交的json参数
      ruleForm: {
        'reg_code': '',
        'in_num': '',
        'property_name': '',
        'property_phone': '',
        'user_department': '',
        'local_area': '',
        'area_code': '',
        'address': '',
        'lat_lon': '',
        'elev_name': '',
        'elev_type': '',
        'elev_var': '',
        'elev_facnum': '',
        'manufact_name': '',
        'elev_date': '',
        'rated_load': '',
        'stop_fnum': '',
        'control_mode': '',
        'drag_mode': '',
        // 轿厢尺寸特殊处理
        'car_size': '',
        'door_form': '',
        'door_osize': '',
        'door_odir': '',
        'tract_mode': '',
        'rated_speed': '',
        'car_form': '',
        'stat_utime': '',
        'exempt_year': '',
        'exempt_stime': '',
        'exempt_etime': '',
        'mainten_stime': '',
        'mainten_etime': '',

        'top_height': '',
        'bottom_height': '',
        'well_height': '',
        'car_height': '',
        'low_level': '',
        'high_level': '',
        'tract_circf': '',
        'load_control': '',

        'count_weight': '',
        'floors_height': '',
        'extend': '',
        
      },

      // 用于重置的空参数
      specialBlank: {
        lng: '',
        lat: '',
        car_size: {
          gao: '',
          kuan: '',
          shen: ''
        },
        door_form: '',
        control_mode: '',
        drag_mode: '',
        floors_height: [
          {floor1: '', floor2: '', height: ''}
        ],
        car_form: [
          {value: ''}
        ],
        area_code: [],
        chooseCity: '',

      },
      
      // 需要特殊处理的字段
      // 用于页面展示
      special: {
        lng: '',
        lat: '',
        car_size: {
          gao: '',
          kuan: '',
          shen: ''
        },
        door_form: '',
        control_mode: '',
        drag_mode: '',
        floors_height: [
          {floor1: '', floor2: '', height: ''}
        ],
        car_form: [
          {value: ''}
        ],
        area_code: [],
        chooseCity: '',

      },
      // 用于存放单个电梯原始数据
      list: {},
      rules: {
        reg_code: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        in_num: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        area_code: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        top_height: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        elev_date: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        stat_utime: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        well_height: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        bottom_height: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        car_height: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        tract_circf: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        low_level: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        high_level: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
   
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
    this.parentCode = this.$route.query.reg_code
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
          this.submitState = 'post'
          this.ruleForm = this.ruleFormBlank
          this.special = this.specialBlank
          this.ruleForm.reg_code = this.parentCode
          return
        }
        this.submitState = 'put'
        let detail = res.data.data
        for (var key in detail) {
          this.ruleForm[key] = detail[key]
        }
   
        // 特殊处理字段
        if (this.ruleForm.area_code !== '') {
          this.special.area_code = this.transformAreaCode(this.ruleForm.area_code)
        }
        if (this.ruleForm.car_size !== '') {
          this.special.car_size = this.transformCarSize(this.ruleForm.car_size)
        }
        if (this.ruleForm.floors_height !== '') {
          this.special.floors_height = this.transformFloorsHeight(this.ruleForm.floors_height)
        }
        if (this.ruleForm.car_form !== '') {
          this.special.car_form = this.transformCarForm(this.ruleForm.car_form)
        }

        this.searchMap(detail.lat_lon)
      })

    },

    // 特殊处理获得的area_code区域码
    transformAreaCode(area_code) {
      // 字符串转数组
      // "440305005000" => ["44", "4403", "440305", "440305005"]
      if (typeof area_code == 'string') {
        let province = area_code.substr(0, 2)
        let city = area_code.substr(0, 4)
        let region = area_code.substr(0, 6)
        let street = area_code.substr(0, 9)
        let cityShow = []
        if (area_code.length <= 2) {
          cityShow.push(province)
        } else if (area_code.length > 2 && area_code.length <= 4 ) {
          cityShow.push(province, city)
        } else if (area_code.length > 4 && area_code.length <= 6 ) {
          cityShow.push(province, city, region)
        } else {
          cityShow.push(province, city, region, street)
        }
        return cityShow
      }

      // 数组转字符串
      // ["44", "4403", "440305", "440305005"] => "440305005000"
      if (area_code instanceof Array) {
        return area_code[area_code.length - 1]
      }

      console.log('area_code传入类型错误')
    },

    // 特殊处理轿厢尺寸
    transformCarSize(car_size) {
      // 字符串转对象
      // '10:20:30' => car_size: {gao: '', shen: '', kuan: ''}
      if (typeof car_size == 'string') {
        let carSizeObj = {}
        carSizeObj.gao = car_size.split(':')[0]
        carSizeObj.kuan = car_size.split(':')[1]
        carSizeObj.shen = car_size.split(':')[2]
        return carSizeObj
      }

      // 对象转字符串
      // car_size: {gao: '', shen: '', kuan: ''} => '10:20:30'
      if (car_size instanceof Object) {
        if (car_size.gao === '' || car_size.kuan === '' || car_size.shen === '') {
          return ''
        } else {
          return car_size.gao + ':' + car_size.kuan + ':' + car_size.shen
        }
      }

      console.log('car_size传入类型错误')
    },

    // 特殊处理层高
    transformFloorsHeight(floors_height) {
      // 字符串数组重组成新形式数组
      // "[{'floor': '-1, 1', 'height': '5'}, {'floor': '1, 5', 'height' : '4'}]" => [{floor1: '-1', floor2: '1', height: '5'}, {floor1: '1', floor2: '5', height: '4'}]
      if (typeof floors_height == 'string') {
        let evalFloorsHeight = eval(floors_height)
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
      if (floors_height instanceof Array) {
        if (floors_height.length === 1 && floors_height[0].floor1 === '' && floors_height[0].floor2 === '' && floors_height[0].height === '') return ''
        let carSizeArrStr = []
        floors_height.forEach((item, i) => {
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
      
      console.log('floors_height传入类型错误')
    },

    // 特殊处理轿厢形式
    transformCarForm(car_form) {
      console.log('car_form传', car_form)
      // 字符串转数组
      // "轿厢形式1:轿厢形式2" => [{value: '轿厢形式1'}, {value: '轿厢形式2'}]
      if (typeof car_form == 'string') {
        let carFormArr = car_form.split(':')
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
      if (car_form instanceof Array) {
        let carFormArr = []
        
        car_form.forEach(item => {
          carFormArr.push(item.value)
        })
        if (carFormArr.length === 0) {
          return ''
        } else {
          return carFormArr.join(':')
        }
      }
      
      console.log('car_form传入类型错误')
    },

    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/lift-add-result',
        query: {
          reg_code: val
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
    searchMap(lat_lon) {
      let that = this

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

      if (lat_lon) {
        let lng = lat_lon.split(',')[0]
        let lat = lat_lon.split(',')[1]
        addMarker(lng, lat)
        map.setCenter([lng, lat]); //设置地图中心点
        console.log('gggggg', lng, lat)
        return

      }

      // 搜索
      let keywords = this.special.chooseCity + this.ruleForm.address
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
      this.special.floors_height.push({
        floor1: '',
        floor2: '',
        height: '',
      })
    },

    // 删除层高
    deleteFloor(i) {
      this.special.floors_height.splice(i, 1)
    },

    // 添加轿厢形式
    addCarForm() {
      this.special.car_form.push({
        value: ''
      })
    },

    // 删除轿厢形式
    deleteCarForm(i) {
      this.special.car_form.splice(i, 1)
    },

    // 获取省市区联动值
    getCity(arr, cityName) {
      this.ruleForm.area_code = arr[arr.length - 1]
      this.special.area_code = arr
      this.special.chooseCity = cityName
      this.ruleForm.local_area = cityName.join(' ')
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
          alert('submit')

          // 特殊处理字段
          this.ruleForm.area_code = this.transformAreaCode(this.special.area_code)
          this.ruleForm.car_size = this.transformCarSize(this.special.car_size)
          this.ruleForm.floors_height = this.transformFloorsHeight(this.special.floors_height)
          console.log('qu', this.special.floors_height)
          this.ruleForm.car_form = this.transformCarForm(this.special.car_form)
          if (this.ruleForm.door_form == '其他') {
            this.ruleForm.door_form = this.special.door_form
          }
          if (this.ruleForm.control_mode == '其他') {
            this.ruleForm.control_mode = this.special.control_mode
          }
          if (this.ruleForm.drag_mode == '其他') {
            this.ruleForm.drag_mode = this.special.drag_mode
          }
          if (this.ruleForm.tract_mode == '其他') {
            this.ruleForm.tract_mode = this.special.tract_mode
          }
          this.ruleForm.lat_lon = `${this.special.lng}, ${this.special.lat}`

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
                that.$message.success(`${res.data.message}`)
              } else {
                that.$message.error(`${res.data.message}`)
              }
            })
          }

        } else {
          console.log('error', this.ruleForm)
        }
      })
    }

  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    'city-choose': CityChoose,
  }
}
</script>

<style>
  .la-search-box .lsearch-input{
    height: 40px !important;
    font-size: 16px !important;
  }
  .la-search-box .llcb-search-tips{
    top: 52px !important;
  }
  .la-search-box .lsearch-submit{
    height: 38px !important;
  }
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
    margin-top 4px;
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
  .form-btn{
    text-align: center;
    border-top: 1px solid #D8DDDF;
    padding 30px 0;
  }
  .la-btn{
    width 208px;
    height 36px;
    color: #fff;
    border-radius: 24px;
    margin: 0 20px;
    cursor: pointer;
  }
  .la-btn-cancel{
    background: #7E8A95;
    box-shadow: 0 8px 20px -10px rgba(66,114,255,0.60);
  }
  .la-btn-submit{
    background-image: linear-gradient(90deg, #4272FF 0%, #6159FF 100%);
    box-shadow: 0 8px 20px -10px rgba(66,114,255,0.60);
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
  

}

@media screen and (max-width: 1360px) {
  #LiftAddResult{
    min-width: 1360px;
  }
}


</style>
