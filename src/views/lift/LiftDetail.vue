<template>
  <div id="LiftDetail">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/lift-list')">数字电梯</span>
        <em>/</em>
        <span class="on">电梯档案</span>
      </div>

      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{ruleForm.inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{ruleForm.regCode}}</li>
            <li><span>电梯负责人：</span>{{liftPerson ? liftPerson : '无'}}</li>
            <li><span>电梯地址：</span>{{ruleForm.localArea}} {{ruleForm.address}}</li>
          </ul>
        </div>
        <div v-if="submitState == 'put'" class="lift-detail-operate clearfix">
          <div class="lift-detail-operate-btn lift-detail-operate-btn-gray" @click="cancelSave">取消</div>
          <div class="lift-detail-operate-btn lift-detail-operate-btn-blue" @click="submit">保存</div>
        </div>
        <div v-else class="lift-detail-operate clearfix">
          <div class="lift-detail-operate-btn" @click="goPrint">打印</div>
          <div class="lift-detail-operate-btn lift-detail-operate-btn-blue" @click="goEdit">编辑档案</div>
        </div>
      </div>

 

      <div class="lift-list clearfix">
        <!-- 左侧导航 -->
        <div class="lift-detail-nav">
          <div class="lift-detail-nav-p" :class="{on: menuActive == 'jbxx'}" @click="jump(0)">基本信息</div>
          <div class="lift-detail-nav-p" :class="{on: menuActive == 'ccxx'}" @click="jump(1)">出厂信息</div>
          <div class="lift-detail-nav-p" :class="{on: menuActive == 'jscs'}" @click="jump(2)">技术参数</div>
          <div class="lift-detail-nav-p" :class="{on: menuActive == 'wbxx'}" @click="jump(3)">维保信息</div>
          <div class="lift-detail-nav-p" :class="{on: menuActive == 'ywcs'}" @click="jump(4)">业务参数</div>

        </div>


 
        <!-- 右侧详情 -->
        <div class="la-result-container" id="lift-detail-wrap">
          <el-form :model="ruleForm" :rules="rules" ref="laForm">
            <div class="lar-wrap">
              <div class="lar-item" id="jbxx_type">
                <div class="lift-detail-form-title">基本信息</div>
                <div class="lar-con clearfix">
                  <el-form-item prop="regCode" class="lar-box">
                    <h4>电梯注册代码</h4>
                    <p class="show-pp">{{ruleForm.regCode}}</p>
                    <!-- <el-input v-model="ruleForm.regCode" size="small" v-else></el-input> -->
                  </el-form-item>
                  <el-form-item prop="inNum" class="lar-box">
                    <h4>内部编号</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.inNum" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.inNum !== '' ? ruleForm.inNum : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="propertyName" class="lar-box">
                    <h4>物业公司</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.propertyName" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.propertyName !== '' ? ruleForm.propertyName : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="propertyPhone" class="lar-box">
                    <h4>物业电话</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.propertyPhone" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.propertyPhone !== '' ? ruleForm.propertyPhone : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="userDepartment" class="lar-box">
                    <h4>使用单位</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.userDepartment" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.userDepartment !== '' ? ruleForm.userDepartment : '--'}}</p>
                  </el-form-item>

                  <!-- 省市区街道级联 -->
                  <el-form-item prop="areaCode" class="lar-box">
                    <h4>城市/区域</h4>
                    <!-- 待确认 貌似不允许修改 -->
                    <!-- <city-choose v-if="submitState == 'put'" @childVal="getCity" :selectCity="special.areaCode"></city-choose> -->
                    <p class="show-pp">{{ruleForm.localArea !== '' ? ruleForm.localArea : '--'}}</p>
                  </el-form-item>

                  <el-form-item prop="address" class="lar-box" style="width: 50%">
                    <h4>详细地址</h4>
                    <!-- 待确认 貌似不允许修改 -->
                    <!-- <el-input v-if="submitState == 'put'" v-model="ruleForm.address" size="small" id="address" @input="searchMap()"></el-input> -->
                    <p class="show-pp">{{ruleForm.address !== '' ? ruleForm.address : '--'}}</p>
                  </el-form-item>
                  
                </div>

                <div class="map-box">
                  <div id="map-container"></div>
                </div>  
              </div>

              <div class="lar-item" id="ccxx_type">
                <div class="lift-detail-form-title">出厂信息</div>
                <div class="lar-con clearfix">
                  <el-form-item prop="elevName" class="lar-box">
                    <h4>电梯名称</h4>
                    <!-- 不允许修改 -->
                    <!-- <el-input v-if="submitState == 'put'" v-model="ruleForm.elevName" size="small"></el-input> -->
                    <p class="show-pp">{{ruleForm.elevName !== '' ? ruleForm.elevName : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="elevType" class="lar-box">
                    <h4>型号</h4>
                    <!-- 不允许修改 -->
                    <!-- <el-input v-if="submitState == 'put'" v-model="ruleForm.elevType" size="small"></el-input> -->
                    <p class="show-pp">{{ruleForm.elevType !== '' ? ruleForm.elevType : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="elevVar" class="lar-box">
                    <h4>电梯品种</h4>
                    <!-- 不允许修改 -->
                    <!-- <el-input v-if="submitState == 'put'" v-model="ruleForm.elevVar" size="small"></el-input> -->
                    <p class="show-pp">{{ruleForm.elevVar !== '' ? ruleForm.elevVar : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="elevFacnum" class="lar-box">
                    <h4>出厂编号</h4>
                    <!-- 不允许修改 -->
                    <!-- <el-input v-if="submitState == 'put'" v-model="ruleForm.elevFacnum" size="small"></el-input> -->
                    <p class="show-pp">{{ruleForm.elevFacnum !== '' ? ruleForm.elevFacnum : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="manufactName" class="lar-box">
                    <h4>制造单位</h4>
                    <!-- 不允许修改 -->
                    <!-- <el-input v-if="submitState == 'put'" v-model="ruleForm.manufactName" size="small"></el-input> -->
                    <p class="show-pp">{{ruleForm.manufactName !== '' ? ruleForm.manufactName : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="elevDate" class="lar-box">
                    <h4>制造日期</h4>
                    <!-- 不允许修改 -->
                    <!-- <div v-if="submitState == 'put'" class="dwc-date-icon"></div> -->
                    <!-- <el-date-picker v-if="submitState == 'put'" v-model="ruleForm.elevDate" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker> -->
                    <p class="show-pp">{{ruleForm.elevDate !== '' ? ruleForm.elevDate : '--'}}</p>
                  </el-form-item>

                </div>

              </div>

              <div class="lar-item" id="jscs_type">
                <div class="lift-detail-form-title">技术参数</div>
                <div class="lar-con clearfix">
                  <el-form-item prop="ratedLoad" class="lar-box">
                    <h4>额定载重（kg）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.ratedLoad" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.ratedLoad !== '' ? ruleForm.ratedLoad : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="stopFnum" class="lar-box">
                    <h4>停层站数</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.stopFnum" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.stopFnum !== '' ? ruleForm.stopFnum : '--'}}</p>
                  </el-form-item>

                  <el-form-item prop="controlMode" class="lar-box">
                    <h4>控制方式</h4>
                    <div v-if="submitState == 'put'">
                      <div v-if="ruleForm.controlMode && ruleForm.controlMode == '其他'">
                        <el-input v-model="special.controlMode" size="small" placeholder="请输入控制方式"></el-input>
                      </div>
                      <el-select v-model="ruleForm.controlMode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                        <el-option v-for="item in controlModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <p class="show-pp" v-else>{{ruleForm.controlMode !== '' ? ruleForm.controlMode : '--'}}</p>
                  </el-form-item>

                  <el-form-item prop="dragMode" class="lar-box">
                    <h4>拖动方式</h4>
                    <div v-if="submitState == 'put'">
                      <div v-if="ruleForm.dragMode && ruleForm.dragMode == '其他'">
                        <el-input v-model="special.dragMode" size="small" placeholder="请输入拖动方式"></el-input>
                      </div>
                      <el-select v-model="ruleForm.dragMode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                        <el-option v-for="item in dragModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <p class="show-pp" v-else>{{ruleForm.dragMode !== '' ? ruleForm.dragMode : '--'}}</p>
                  </el-form-item>
                  
                  
                  <!-- 数据要特殊处理 -->
                  <el-form-item prop="carSize" class="lar-box">
                    <h4>轿厢尺寸（cm）</h4>
                    <div class="clearfix">
                      <div style="float: left; width: 30%; margin-right: 5%;">
                        <el-input v-if="submitState == 'put'" v-model="special.carSize.kuan" size="small" placeholder="宽度"></el-input>
                        <p class="show-pp" v-else>宽：{{special.carSize.kuan !== '' ? special.carSize.kuan : '--'}}</p>
                      </div>
                      <div style="float: left; width: 30%; margin-right: 5%;">
                        <el-input v-if="submitState == 'put'" v-model="special.carSize.shen" size="small" placeholder="深度"></el-input>
                        <p class="show-pp" v-else>深：{{special.carSize.shen !== '' ? special.carSize.shen : '--'}}</p>
                      </div>
                      <div style="float: left; width: 30%">
                        <el-input v-if="submitState == 'put'" v-model="special.carSize.gao" size="small" placeholder="高度"></el-input>
                        <p class="show-pp" v-else>高：{{special.carSize.gao !== '' ? special.carSize.gao : '--'}}</p>
                      </div>

                    </div>
                  </el-form-item>

                  <el-form-item prop="doorForm" class="lar-box">
                    <h4>轿门形式</h4>
                    <div v-if="submitState == 'put'">
                      <div v-if="ruleForm.doorForm && ruleForm.doorForm == '其他'">
                        <el-input v-model="special.doorForm" size="small" placeholder="请输入轿门形式"></el-input>
                      </div>
                      <el-select v-model="ruleForm.doorForm" placeholder="请选择" size="small" style="width: 100%;" v-else>
                        <el-option v-for="item in doorFormOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <p class="show-pp" v-else>{{ruleForm.doorForm !== '' ? ruleForm.doorForm : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="doorOsize" class="lar-box">
                    <h4>开门尺寸（cm）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.doorOsize" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.doorOsize !== '' ? ruleForm.doorOsize : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="doorOdir" class="lar-box">
                    <h4>开门方向</h4>
                    <el-select v-if="submitState == 'put'" v-model="ruleForm.doorOdir" placeholder="请选择" size="small" style="width: 100%;">
                      <el-option v-for="item in doorOdirOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <p class="show-pp" v-else>{{ruleForm.doorOdir !== '' ? ruleForm.doorOdir : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="tractMode" class="lar-box">
                    <h4>曳引方式</h4>
                    <div v-if="submitState == 'put'">
                      <div v-if="ruleForm.tractMode && ruleForm.tractMode == '其他'">
                        <el-input v-model="special.tractMode" size="small" placeholder="请输入曳引方式"></el-input>
                      </div>
                      <el-select v-model="ruleForm.tractMode" placeholder="请选择" size="small" style="width: 100%;" v-else>
                        <el-option v-for="item in tractModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <p class="show-pp" v-else>{{ruleForm.tractMode !== '' ? ruleForm.tractMode : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="ratedSpeed" class="lar-box">
                    <h4>额定运行速度（m/s）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.ratedSpeed" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.ratedSpeed !== '' ? ruleForm.ratedSpeed : '--'}}</p>
                  </el-form-item>
                  
                  <div style="width: 100%;overflow: hidden;">
                    <el-form-item prop="carForm" class="lar-box" style="width: 100%;">
                      <h4>轿厢形式</h4>
                      <div v-if="submitState == 'put'">
                        <div class="clearfix" v-for="(item, i) in special.carForm" :key="i">
                          <div style="float: left; width: 22%;margin-bottom: 3px;">
                            <el-input v-model="item.value" size="small" placeholder="请输入"></el-input>
                          </div>
                          <div class="delete-floor-icon" @click="deleteCarForm(i)" v-if="i > 0"></div>
                        </div>
                      </div>
                      <p class="show-pp" v-else style="height: auto;">
                        <span v-for="(item, i) in special.carForm" :key="i" style="display: block;">{{item.value}}</span>
                      </p>
                    </el-form-item>
                  </div>

                  <div v-if="submitState == 'put'" class="add-floor clearfix">
                    <div class="lar-box" style="width: 100%;">
                      <span class="add-floor-btn" @click="addCarForm">添加轿厢形式</span>
                    </div>
                  </div>
                  
                </div>

              </div>

              <div class="lar-item" id="wbxx_type">
                <div class="lift-detail-form-title">维保信息</div>

                <div class="lar-con clearfix">
                  <el-form-item prop="statUtime" class="lar-box">
                    <h4>投入使用时间</h4>
                    <div v-if="submitState == 'put'" class="dwc-date-icon"></div>
                    <el-date-picker v-if="submitState == 'put'" v-model="ruleForm.statUtime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                    <p class="show-pp" v-else>{{ruleForm.statUtime !== '' ? ruleForm.statUtime.substring(0,10) : '--'}}</p>

                  </el-form-item>
                  <el-form-item prop="exemptYear" class="lar-box">
                    <h4>免包期限（年）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.exemptYear" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.exemptYear !== '' ? ruleForm.exemptYear : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="exemptStime" class="lar-box">
                    <h4>免保开始时间</h4>
                    <div v-if="submitState == 'put'" class="dwc-date-icon"></div>
                    <el-date-picker v-if="submitState == 'put'" v-model="ruleForm.exemptStime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                    <p class="show-pp" v-else>{{ruleForm.exemptStime !== '' ? ruleForm.exemptStime.substring(0,10) : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="exemptEtime" class="lar-box">
                    <h4>免保终止时间</h4>
                    <div v-if="submitState == 'put'" class="dwc-date-icon"></div>
                    <el-date-picker v-if="submitState == 'put'" v-model="ruleForm.exemptEtime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                    <p class="show-pp" v-else>{{ruleForm.exemptEtime !== '' ? ruleForm.exemptEtime.substring(0,10) : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="maintenStime" class="lar-box">
                    <h4>维保合同开始日期</h4>
                    <div v-if="submitState == 'put'" class="dwc-date-icon"></div>
                    <el-date-picker v-if="submitState == 'put'" v-model="ruleForm.maintenStime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                    <p class="show-pp" v-else>{{ruleForm.maintenStime !== '' ? ruleForm.maintenStime.substring(0,10) : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="maintenEtime" class="lar-box">
                    <h4>维保合同终止日期</h4>
                    <div v-if="submitState == 'put'" class="dwc-date-icon"></div>
                    <el-date-picker v-if="submitState == 'put'" v-model="ruleForm.maintenEtime" type="date" placeholder="选择日期" prefix-icon="test-icon" value-format="yyyy-MM-dd" size="small" style="width: 100%"></el-date-picker>
                    <p class="show-pp" v-else>{{ruleForm.maintenEtime !== '' ? ruleForm.maintenEtime.substring(0,10) : '--'}}</p>
                  </el-form-item>

                </div>

              </div>

              <div class="lar-item" id="ywcs_type">
                <div class="lift-detail-form-title">业务参数</div>
                <div class="lar-con clearfix">
                  <div class="clearfix">
                  </div>
                  <el-form-item prop="topHeight" class="lar-box">
                    <h4>顶层高度（cm）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.topHeight" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.topHeight !== '' ? ruleForm.topHeight : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="bottomHeight" class="lar-box">
                    <h4>底坑深度（cm）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.bottomHeight" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.bottomHeight !== '' ? ruleForm.bottomHeight : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="wellHeight" class="lar-box">
                    <h4>井道高度（cm）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.wellHeight" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.wellHeight !== '' ? ruleForm.wellHeight : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="carHeight" class="lar-box">
                    <h4>轿厢高度（cm）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.carHeight" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.carHeight !== '' ? ruleForm.carHeight : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="lowLevel" class="lar-box">
                    <h4>底层（F）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.lowLevel" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.lowLevel !== '' ? ruleForm.lowLevel : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="highLevel" class="lar-box">
                    <h4>顶层（F）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.highLevel" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.highLevel !== '' ? ruleForm.highLevel : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="tractCircf" class="lar-box">
                    <h4>曳引轮直径（cm）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.tractCircf" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.tractCircf !== '' ? ruleForm.tractCircf : '--'}}</p>
                  </el-form-item>
                  <el-form-item prop="loadControl" class="lar-box">
                    <h4>载荷控制器电压范围（V）</h4>
                    <!-- <el-input v-model="ruleForm.loadControl" size="small"></el-input> -->
                    <div v-if="submitState == 'put'" class="clearfix">
                      <div style="float: left; width: 40%;">
                        <el-form-item prop="loadControl1">
                          <el-input v-model="ruleForm.loadControl1" size="small" placeholder="范围"></el-input>
                        </el-form-item>
                      </div>
                      <div class="floors-split">-</div>
                      <div style="float: left; width: 40%;">
                        <el-form-item prop="loadControl2">
                          <el-input v-model="ruleForm.loadControl2" size="small" placeholder="范围"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div v-else class="clearfix">
                      <p class="show-pp" style="float: left;">{{ruleForm.loadControl1 !== '' ? ruleForm.loadControl1 : '--'}}</p>
                      <div class="floors-split" style="padding: 0 7px;">-</div>
                      <p class="show-pp" style="float: left;">{{ruleForm.loadControl2 !== '' ? ruleForm.loadControl2 : '--'}}V</p>
                    </div>
                  </el-form-item>
                  <el-form-item prop="countWeight" class="lar-box">
                    <h4>对重装置重量（kg）</h4>
                    <el-input v-if="submitState == 'put'" v-model="ruleForm.countWeight" size="small"></el-input>
                    <p class="show-pp" v-else>{{ruleForm.countWeight !== '' ? ruleForm.countWeight : '--'}}</p>
                  </el-form-item>

                  <div style="width: 100%;overflow: hidden;">
                    <div class="lar-box" style="width: 100%;">
                      <h4>层高（cm）</h4>
                      <div class="clearfix">
                        <div v-if="submitState == 'put'" style="float: left; width: 8%;">
                          <el-form-item
                            v-for="(item, index) in ruleForm.floorsHeightFloor1"
                            :key="item.key"
                            :prop="'floorsHeightFloor1.' + index + '.floor1'"
                            :rules="{
                              required: true, message: '必填', trigger: 'blur'
                            }"
                          >
                            <el-input v-model="item.floor1" size="small"></el-input>
                          </el-form-item>
                        </div>
                        <div v-else style="float: left;">
                          <div class="show-pp" v-for="(item, index) in ruleForm.floorsHeightFloor1" :key="index">{{item.floor1 !== '' ? item.floor1 : '--'}}</div>
                        </div>

                        <div class="floors-split" :class="submitState == 'put' ? 'on' : ''">
                          <div class="floors-split-p" v-for="(item, index) in ruleForm.floorsHeightH" :key="index">-</div>
                        </div>

                        <div v-if="submitState == 'put'" style="float: left; width: 8%;">
                          <el-form-item
                            v-for="(item, index) in ruleForm.floorsHeightFloor2"
                            :key="item.key"
                            :prop="'floorsHeightFloor2.' + index + '.floor2'"
                            :rules="{
                              required: true, message: '必填', trigger: 'blur'
                            }"
                          >
                            <el-input v-model="item.floor2" size="small"></el-input>
                          </el-form-item>
                        </div>
                        <div v-else style="float: left;">
                          <div class="show-pp" v-for="(item, index) in ruleForm.floorsHeightFloor2" :key="index">{{item.floor2 !== '' ? item.floor2 : '--'}}层</div>
                        </div>

                        <div class="floors-split" :class="submitState == 'put' ? 'on' : ''">
                          <div class="floors-split-p" v-for="(item, index) in ruleForm.floorsHeightH" :key="index">高度为</div>
                        </div>

                        <div v-if="submitState == 'put'" style="float: left; width: 12%;">
                          <el-form-item
                            v-for="(item, index) in ruleForm.floorsHeightH"
                            :key="item.key"
                            :prop="'floorsHeightH.' + index + '.height'"
                            :rules="{
                              required: true, message: '必填', trigger: 'blur'
                            }"
                          >
                            <el-input v-model="item.height" size="small"></el-input>
                          </el-form-item>
                        </div>
                        <div v-else style="float: left;">
                          <div class="show-pp" v-for="(item, index) in ruleForm.floorsHeightH" :key="index">{{item.height !== '' ? item.height : '--'}}</div>
                        </div>
                        <div v-if="submitState == 'put'" style="float: left; width: 38px;">
                          <div style="width: 30px; height: 32px; margin-bottom: 22px;"></div> <!-- 占位div -->
                          <div v-for="(item, i) in ruleForm.floorsHeightH" :key="i">
                            <div class="delete-floor-icon" style="margin-bottom: 22px;" @click="deleteFloor(i)" v-if="i>0"></div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>

                  <div class="add-floor clearfix" v-if="submitState == 'put'">
                    <div class="lar-box" style="width: 100%;">
                      <span class="add-floor-btn" @click="addFloor">添加层高</span>
                      <em class="add-floor-tip">（负楼层默认为负号，如“-1”，不可为“B1”）</em>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div class="lift-detail-height-block"></div>


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
import CityChoose from '../../components/CityChoose'
import Footer from '../common/fotter'

export default {
  data() {
    // 自定义校验
    // var exemptEtimeCheck = ()
    return {
      parentCode: '',
      submitState: 'post', // 判断录入电梯(post)还是编辑电梯(put)，查询电梯(get)
      flag: true, // 滚动节流阀
      menuActive: 'jbxx',
      liftPerson: '',

      
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

        // 特殊处理数据，方便校验
        'loadControl1': '',
        'loadControl2': '',
        floorsHeightFloor1: [
          {floor1: ''}
        ],
        floorsHeightFloor2: [
          {floor2: ''}
        ],
        floorsHeightH: [
          {height: ''}
        ],
        
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

        // 特殊处理数据，方便校验
        'loadControl1': '',
        'loadControl2': '',
        floorsHeightFloor1: [
          {floor1: ''}
        ],
        floorsHeightFloor2: [
          {floor2: ''}
        ],
        floorsHeightH: [
          {height: ''}
        ],
        
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
          gao: 0,
          kuan: 0,
          shen: 0
        },
        doorForm: '',
        controlMode: '',
        dragMode: '',
        floorsHeight: [
          {floor1: '', floor2: '', height: ''}
        ],
        loadControl: {
          value1: '',
          value2: ''
        },
        carForm: [
          {value: ''}
        ],
        areaCode: [],
        chooseCity: '',
        test: [1]

      },
      // 用于存放单个电梯原始数据
      list: {},
      rules: {

        regCode: [{ required: true, message: '必填', trigger: 'blur' }],
        areaCode: [{ required: true, message: '必填', trigger: 'change' }],
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
        loadControl1: [{ required: true, message: '必填', trigger: 'blur' }],
        loadControl2: [{ required: true, message: '必填', trigger: 'blur' }],
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
    // 获取电梯负责人
    this.getLiftPerson()

    // 滚动高亮
    this.scrollMenu()

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
        this.ruleForm.loadControl1 = this.ruleForm.loadControl.split(',')[0] ? this.ruleForm.loadControl.split(',')[0] : ''
        this.ruleForm.loadControl2 = this.ruleForm.loadControl.split(',')[1] ? this.ruleForm.loadControl.split(',')[1] : ''
        this.special.lng = detail.latLon.split(',')[0]
        this.special.lat = detail.latLon.split(',')[1]

        // m转换成cm
        this.ruleForm.doorOsize = (this.ruleForm.doorOsize * 100).toFixed(1); 
        this.ruleForm.topHeight = (this.ruleForm.topHeight * 100).toFixed(1); 
        this.ruleForm.bottomHeight = (this.ruleForm.bottomHeight * 100).toFixed(1); 
        this.ruleForm.wellHeight = (this.ruleForm.wellHeight * 100).toFixed(1); 
        this.ruleForm.carHeight = (this.ruleForm.carHeight * 100).toFixed(1); 
        this.ruleForm.tractCircf = (this.ruleForm.tractCircf * 100).toFixed(1); 



        this.searchMap(detail.latLon)
      })

    },

    // 获取电梯负责人
    getLiftPerson() {
      this.liftPerson = ''
      let personArr = []
      api.lift.getLiftPerson(this.parentCode).then(res => {
        if (res.data.data.personOne) {
          personArr.push(res.data.data.personOne)
        }
        if (res.data.data.personTwo) {
          personArr.push(res.data.data.personTwo)
        }
        this.liftPerson = personArr.join('、')
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
        // 将m转为cm
        carSizeObj.gao = carSize.split(':')[0] * 100
        carSizeObj.kuan = carSize.split(':')[1] * 100
        carSizeObj.shen = carSize.split(':')[2] * 100
        return carSizeObj
      }

      // 对象转字符串
      // carSize: {gao: '', shen: '', kuan: ''} => '10:20:30'
      if (carSize instanceof Object) {
        if (carSize.gao === '' || carSize.kuan === '' || carSize.shen === '') {
          return ''
        } else {
          // 除以100，将cm转为m
          return carSize.gao / 100 + ':' + carSize.kuan / 100 + ':' + carSize.shen / 100
        }
      }

      console.log('carSize传入类型错误')
    },

    // 特殊处理层高
    transformFloorsHeight(floorsHeight) {
      const that = this
      // 字符串数组分解为3个数组
      // "[{'floor': '-1, 1', 'height': '5'}, {'floor': '1, 5', 'height' : '4'}]" => [{floor1: '-1', floor2: '1', height: '5'}, {floor1: '1', floor2: '5', height: '4'}]
      if (typeof floorsHeight == 'string') {
        // 将m转换成cm
        let evalFloorsHeight = eval(floorsHeight)
        this.ruleForm.floorsHeightFloor1 = []
        this.ruleForm.floorsHeightFloor2 = []
        this.ruleForm.floorsHeightH = []
        evalFloorsHeight.forEach(item => {
          this.ruleForm.floorsHeightFloor1.push({floor1: item.floor.split(',')[0]})
          this.ruleForm.floorsHeightFloor2.push({floor2: item.floor.split(',')[1]})
          this.ruleForm.floorsHeightH.push({height: (item.height * 100).toFixed(1)})
        })
      }

      // 新形式数组重组为字符串数组
      else {
        let carSizeArrStr = []
        this.ruleForm.floorsHeightFloor1.forEach((item, i) => {
          carSizeArrStr.push({
            floor: item.floor1 + ',' + that.ruleForm.floorsHeightFloor2[i].floor2,
            height: that.ruleForm.floorsHeightH[i].height / 100
          })
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

    // 锚点平滑跳转
    jump(index) {
      let that = this
      let jumpArr = document.querySelectorAll('.lar-item')
      let scrollWrap = document.getElementById('lift-detail-wrap')
  

      if (this.flag) {
        that.flag = false
        let scrollWrapTop = scrollWrap.offsetTop
        let total = jumpArr[index].offsetTop - scrollWrapTop - 30 // 目标卷曲位置
        let currentDistance = scrollWrap.scrollTop // 当前卷曲位置
        let step = Math.floor(total / 20)

        // 若需要平滑滚动
        // if (total > currentDistance) {
        //   smoothDown()
        // } else {
        //   let newTotal = currentDistance - total
        //   step = Math.floor(newTotal / 20)
        //   smoothUp()
        // }

        // 若不需要平滑滚动
        scrollWrap.scrollTop = total
        that.flag = true

        // 向下
        function smoothDown() {
          if (currentDistance < total) {
            clearTimeout(timer)
            currentDistance += step
            scrollWrap.scrollTop = currentDistance
            let timer = setTimeout(smoothDown, 10)
          } else {
            scrollWrap.scrollTop = total
            that.flag = true
          }
        }

        // 向上
        function smoothUp () {
          if (currentDistance > total) {
            clearTimeout(timer)
            currentDistance -= step
            scrollWrap.scrollTop = currentDistance
            let timer = setTimeout(smoothUp, 10)
          } else {
            scrollWrap.scrollTop = total
            that.flag = true
          }
        }
      }

    },


    // 滚动高亮
    scrollMenu() {
      let that = this
      let scrollWrap = document.getElementById('lift-detail-wrap')

      let d = 80 // 提前多少距离高亮
      let scrollWrapTop = scrollWrap.offsetTop + d 
      let boxATop = document.getElementById('jbxx_type').offsetTop - scrollWrapTop
      let boxBTop = document.getElementById('ccxx_type').offsetTop - scrollWrapTop
      let boxCTop = document.getElementById('jscs_type').offsetTop - scrollWrapTop
      let boxDTop = document.getElementById('wbxx_type').offsetTop - scrollWrapTop
      let boxETop = document.getElementById('ywcs_type').offsetTop - scrollWrapTop
    

      var scrollFun = function () {
        var current_offset_top = scrollWrap.scrollTop; // 卷曲的高度
        // console.log(current_offset_top)

        if (current_offset_top < boxBTop) {
          that.menuActive = "jbxx";
        } else if (current_offset_top >= boxBTop && current_offset_top < boxCTop) {
          that.menuActive = "ccxx";
        } else if (current_offset_top >= boxCTop && current_offset_top < boxDTop) {
          that.menuActive = "jscs";
        } else if (current_offset_top >= boxDTop && current_offset_top < boxETop) {
          that.menuActive = "wbxx";
        } else {
          that.menuActive = "ywcs";
        }

      }

      scrollWrap.addEventListener('scroll', scrollFun)

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

    // TODO 搜索地图，待同步
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
        var markerOptions = {
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
          // draggable: true
        }
        if (that.submitState == 'put') {
          markerOptions.draggable = true
          // 点击添加点
          map.on('click', (e) => {
            map.clearMap()
            that.special.lng = e.lnglat.lng
            that.special.lat = e.lnglat.lat
            addMarker(e.lnglat.lng, e.lnglat.lat)
          });
        }

        marker = new AMap.Marker(markerOptions);

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
      // this.special.floorsHeight.push({
      //   floor1: '',
      //   floor2: '',
      //   height: '',
      // })
      this.ruleForm.floorsHeightFloor1.push({floor1: ''})
      this.ruleForm.floorsHeightFloor2.push({floor2: ''})
      this.ruleForm.floorsHeightH.push({height: ''})
    },

    // 删除层高
    deleteFloor(i) {
      // this.special.floorsHeight.splice(i, 1)
      console.log('删除', i)
      this.ruleForm.floorsHeightFloor1.splice(i, 1)
      this.ruleForm.floorsHeightFloor2.splice(i, 1)
      this.ruleForm.floorsHeightH.splice(i, 1)

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
      this.ruleForm.areaCode = arr[arr.length - 1] || ""
      this.special.areaCode = arr
      this.special.chooseCity = cityName
      this.ruleForm.localArea = cityName.join(' ')
      this.searchMap()
    },

    // 取消提交？
    cancel() {
      this.$router.push({
        path: '/lift-list'
      })
    },

    // 取消编辑
    cancelSave() {
      // this.submitState = 'get'
      this.$router.push({
        path: '/lift-detail',
        query: {
          regCode: this.parentCode,
          submitState: 'get'
        }
      })
      // this.$router.go(0)
    },

    // 跳转编辑
    goEdit() {
      // this.submitState = 'put'
      this.$router.push({
        path: '/lift-detail',
        query: {
          regCode: this.parentCode,
          submitState: 'put'
        }
      })
      // this.$router.go(0)
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
          this.ruleForm.floorsHeight = this.transformFloorsHeight()
          this.ruleForm.carForm = this.transformCarForm(this.special.carForm)
          this.ruleForm.loadControl = this.ruleForm.loadControl1 + ',' + this.ruleForm.loadControl2
          

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
          if (!this.special.lng || !this.special.lat) return this.$message.error('请点击地图确定电梯具体位置')

          // cm转换成m
          this.ruleForm.doorOsize = this.ruleForm.doorOsize / 100
          this.ruleForm.topHeight = this.ruleForm.topHeight / 100
          this.ruleForm.bottomHeight = this.ruleForm.bottomHeight / 100
          this.ruleForm.wellHeight = this.ruleForm.wellHeight / 100
          this.ruleForm.carHeight = this.ruleForm.carHeight / 100
          this.ruleForm.tractCircf = this.ruleForm.tractCircf / 100
          
          console.log('this.ruleForm', this.ruleForm)

          api.lift.editLift(this.ruleForm).then(res => {
            console.log('put', res)
            if (res.data.code == '200') {
              that.$message.success(`${res.data.message}`)
              // this.submitState = 'get'

              that.$router.push({
                path: '/lift-detail',
                query: {
                  regCode: that.parentCode,
                  submitState: 'get'
                }
              })
              // that.$router.go(0)
            } else {
              that.$message.error(`${res.data.message}`)
            }
          })


        } else {
          console.log('error',this.ruleForm)
        }
      })
    },

    // 跳转到打印页面
    goPrint() {
      this.$router.push({
        path: '/lift-print',
        query: {
          regCode: this.parentCode
        }
      })
    },

  },
  components: {
    'footer-temp': Footer,
    'city-choose': CityChoose,
  }
}
</script>

<style>
  
/* 地图marker样式 */
#LiftDetail .point{
  position: relative;
  width: 48px;
  height: 48px;
  margin-left: -16px;
  margin-top: -24px;
}
#LiftDetail .point-light{
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
#LiftDetail .point-circle{
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

#LiftDetail{
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height 1;
  }

  .lift-list{
    background none;
  }
  .la-result-container{
    float: left;
    width: 82%;
    // height: 716px;
    height: calc(100vh - 390px)
    min-height: 390px;
    background: #fff;
    overflow: auto;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
  }
  .lar-wrap{
    padding 1px 10px 30px;
  }
  .lar-item{
    margin-top 30px;
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
    height 32px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lift-detail-height-block{
    height: 360px;
  }
  .floors-split.on .floors-split-p{
    margin-bottom: 22px;
  }
  

}

@media screen and (max-width: 1360px) {
  #LiftDetail{
    min-width: 1360px;
  }
}


</style>
