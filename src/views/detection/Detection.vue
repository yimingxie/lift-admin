<template>
  <div id="ed">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/lift-list')">数字电梯</span>
        <em>/</em>
        <span class="on">电梯检测</span>
      </div>

      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{regCode}}</li>
            <li><span>电梯负责人：</span>{{liftPerson ? liftPerson : '无'}}</li>
            <li><span>电梯地址：</span>{{localArea}} {{address}}</li>
          </ul>
        </div>
        <div class="det-heading-search">
          <search-code :code="parentCode" @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="det-content clearfix">

        <!-- 左侧 -->
        <!-- 异常告警列表 -->
        <div class="det-warn">
          <div class="det-warn-title">
            <div class="det-warn-title-h">异常告警</div>
          </div>
          <div class="det-warn-choose clearfix">
            <div class="dwc-box" style="width: 56%;">
              <!-- <div class="dwc-date-icon" :class="triggleTime ? 'hideIcon' : ''"></div> -->
              <div class="dwc-box-line"></div>
              <!-- <el-date-picker v-model="triggleTime" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd" prefix-icon="test-icon" style="width: 100%;" @change="changeTriggleTime"></el-date-picker> -->
              <el-date-picker
                v-model="triggleTime"
                type="daterange"
                value-format="yyyy-MM-dd" 
                style="width: 100%;" 
                @change="changeTriggleTime"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

            </div>
            <div class="dwc-box" style="width: 22%">
              <div class="dwc-box-line"></div>
              <el-select v-model="diagnType" placeholder="类型" @change="changeDiagnType">
                <el-option v-for="item in diagnTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="dwc-box" style="width: 22%;">
              <el-select v-model="processed" placeholder="进度" @change="changeProcessed">
                <el-option v-for="item in processedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>

          <div class="det-warn-list" id="det-warn-list">
            <div class="dw-list" id="dw-list">
              <div class="dw-list-box" v-for="(item, i) in warnList" :key="i">
                <div class="dwlb-p">
                  <h4>{{item.reason}}</h4>
                  <!-- 管道符 过滤器 -->
                  <p>{{item.diagnType | changeDiagnType}} {{item.triggleTime}}</p>
                </div>
                <div class="dwlb-rate" :class="item.processed == 0 ? 'no-deal' : ''">{{item.processed | changeProcessed}}</div>
              </div>
              <div v-show="isLoading" style="text-align: center;padding: 10px;">
                <img src="../../assets/images/xym/loading.gif" alt="">
              </div>
            </div>
          </div>
          
        </div>

        <!-- 中间 -->
        <div class="det-mid">
          <!-- 实时运行状态 -->
          <div class="det-mid-status">
            <div class="dms-title">
              <h4>实时运行状态</h4>
              <div class="dms-title-balance">平衡系数 ></div>
            </div>
            <div class="dms-lift clearfix">
              <div class="dms-lift-pic">
                <img src="../../assets/images/xym/lift.png" alt="">
              </div>
              <div class="dms-lift-derection">
                <div class="dmsl-dt dmsl-dt-up">
                  <div class="dmsl-dt-up-on"></div>
                </div>
                <div class="dmsl-dt-floor">
                  <h4><span>{{curRunData.floor}}</span>F</h4>
                  <p>当前楼层</p>
                </div>
                <div class="dmsl-dt dmsl-dt-down">
                  <div class="dmsl-dt-down-on"></div>
                </div>
              </div>
              <div class="dms-lift-data">
                <div class="dmsl-data">
                  <h4><span>{{curRunData.speed}}</span>m/s</h4>
                  <p>运行速度</p>
                </div>
                <div class="dmsl-data">
                  <h4><span>{{curRunData.prox}}</span></h4>
                  <p>轿门状态</p>
                </div>
                <div class="dmsl-data">
                  <h4><span>1600</span>kg</h4>
                  <p>当前荷载</p>
                </div>
              </div>
            </div>
            <div class="dms-lift-info clearfix">
              <div class="dmsl-data">
                <h4><span>7821</span>km</h4>
                <p>月累计运行里程</p>
              </div>
              <div class="dmsl-data">
                <h4><span>12</span>年<span>1</span>个月</h4>
                <p>电梯年限</p>
              </div>
              <div class="dmsl-data">
                <h4><span>234345</span>次</h4>
                <p>月启停次数</p>
              </div>
              <div class="dmsl-data">
                <h4><span>1582</span>小时</h4>
                <p>月运行时长</p>
              </div>
              <div class="dmsl-data">
                <h4><span>121</span>次</h4>
                <p>钢丝绳月折弯次数</p>
              </div>

            </div>

          </div>

          <!-- 作业记录 -->
          <div class="det-mid-log">
            <div class="det-warn-title">
              <div class="det-warn-title-h">作业记录</div>
              <span class="dm-go-detail">全部作业 ></span></div>
            <div class="dm-log-content">
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>


            </div>


          </div>


        </div>

        <!-- 右侧实时监测数据 -->
        <div class="det-right">
          <!-- 切换时间 -->
          <div class="det-warn-title">
            <div class="det-warn-title-h">实时监测数据</div> 
            <div class="det-cTime-con clearfix">
              <div class="dcc-btn dcc-btn-left" :class="prevTimeBtn == 'disable' ? 'useless' : ''" @click="changeTime('sub')"></div>
              <div class="dcc-btn-current" :class="currentTimeBtn == 'disable' ? 'useless' : ''">实时</div> 
              <div class="dcc-btn dcc-btn-right" :class="nextTimeBtn == 'disable' ? 'useless' : ''" @click="changeTime('add')"></div>
            </div>
          </div>

          <div class="det-ca clearfix">
            <div class="det-ca-menu">
              <div class="detcm-box" :class="{current: menuActive == 'yxhj'}" @click="jump(0)">
                <div class="detcm-icon detcm-icon-yxhj"></div>
                <div class="detcm-box-p">运行环境</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'dyg'}" @click="jump(1)">
                <div class="detcm-icon detcm-icon-dyg"></div>
                <div class="detcm-box-p">电源柜</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'kzg'}" @click="jump(2)">
                <div class="detcm-icon detcm-icon-kzg"></div>
                <div class="detcm-box-p">控制柜</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'ddj'}" @click="jump(3)">
                <div class="detcm-icon detcm-icon-ddj"></div>
                <div class="detcm-box-p">电动机</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'zdq'}" @click="jump(4)">
                <div class="detcm-icon detcm-icon-zdq"></div>
                <div class="detcm-box-p">制动器</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'xsq'}" @click="jump(5)">
                <div class="detcm-icon detcm-icon-xsq"></div>
                <div class="detcm-box-p">限速器</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'jd'}" @click="jump(6)">
                <div class="detcm-icon detcm-icon-jd"></div>
                <div class="detcm-box-p">轿顶</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'jx'}" @click="jump(7)">
                <div class="detcm-icon detcm-icon-jx"></div>
                <div class="detcm-box-p">轿厢</div>
              </div>
              <div class="detcm-box" :class="{current: menuActive == 'jingdao'}" @click="jump(8)">
                <div class="detcm-icon detcm-icon-jingdao"></div>
                <div class="detcm-box-p">井道部件</div>
              </div>
           

            </div>

            <div class="det-ca-chartCon" id="det-ca-chartCon">
              <!-- 运行环境 -->
              <div class="dcc-type" id="yxhj_type">
                <!-- 二级目录 -->
                <div class="dcc-item">
                  <div class="dcc-item-title">机房</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/wendu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">机房温度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jfwd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/shidu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">机房湿度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jfsd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/fengsu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>m/s</div>
                        <div class="dccb-data-p2">机房风速</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jffs"></div>
                    </div>
                  </div>
                </div>
                <div class="dcc-item">
                  <div class="dcc-item-title">井道</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/wendu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">井道温度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdwd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/shidu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>%</div>
                        <div class="dccb-data-p2">井道湿度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdsd"></div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="dcc-type" id="dyg_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">电源柜</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">机房电源电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jfdydy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianliu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>A</div>
                        <div class="dccb-data-p2">机房电源电流</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jfdydl"></div>
                    </div>
                  </div>


                </div>

              </div>
              <div class="dcc-type" id="kzg_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">控制柜</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">门锁安全回路电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-msaqhldy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianliu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>A</div>
                        <div class="dccb-data-p2">门锁安全回路电流</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-msaqhldl"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">安全开关回路电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-aqkghldy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">检修开关电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jxkgdy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">（上）减速开关电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jskgdys"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">（下）减速开关电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jskgdyx"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">（上）强迫减速开关电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-qpjskgdys"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">平层感应器电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-pcgyqdy"></div>
                    </div>
                  </div>

                </div>

              </div>
              <div class="dcc-type" id="ddj_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">电动机</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">电动机电源电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-ddjdydy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianliu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>A</div>
                        <div class="dccb-data-p2">电动机电源电流</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-ddjdydl"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/wendu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">电动机外壳温度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-ddjwkwd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/zhendong.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>μm</div>
                        <div class="dccb-data-p2">电动机外壳振动</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-ddjwkzd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/wendu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">电动机轴承温度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-ddjzcwd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/zhendong.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>μm</div>
                        <div class="dccb-data-p2">电动机轴承振动</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-ddjzczd"></div>
                    </div>
                  </div>
                  


                </div>

              </div>
              <div class="dcc-type" id="zdq_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">制动器</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">制动器电源电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-zdqdydy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianliu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>A</div>
                        <div class="dccb-data-p2">制动器电源电流</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-zdqdydl"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/wendu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">制动器线圈温度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-zdqxqwd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/wendu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>℃</div>
                        <div class="dccb-data-p2">制动器闸瓦温度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-zdqzwwd"></div>
                    </div>
                  </div>


                </div>
              </div>
              <div class="dcc-type" id="xsq_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">限速器</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/sudu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>m/s</div>
                        <div class="dccb-data-p2">限速器速度</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-xsqsd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/quanshu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>rpm</div>
                        <div class="dccb-data-p2">限速器圈数</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-xsqqs"></div>
                    </div>
                  </div>
         

                </div>
              </div>
              <div class="dcc-type" id="jd_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">限速器</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">轿顶载荷控制器电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdzhkzqdy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">轿顶检修开关电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdjxkgdy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianya.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>V</div>
                        <div class="dccb-data-p2">轿顶门机马达电压</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdmjmddy"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianliu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>A</div>
                        <div class="dccb-data-p2">轿顶门机马达电流</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdmjmddl"></div>
                    </div>
                  </div>

                </div>


              </div>
              <div class="dcc-type" id="jx_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">轿厢</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/dianliu.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>楼</div>
                        <div class="dccb-data-p2">轿厢位置</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jxwz"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/zhendong.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>μm</div>
                        <div class="dccb-data-p2">轿厢箱体振动</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jxxtzd"></div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="dcc-type" id="jingdao_type">
                <div class="dcc-item">
                  <div class="dcc-item-title">井道</div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/zhendong.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>36</span>μm</div>
                        <div class="dccb-data-p2">井道导轨振动</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jddgzd"></div>
                    </div>
                  </div>
                  <div class="dcc-box">
                    <div class="dcc-box-data clearfix">
                      <div class="dccb-data-icon">
                        <img src="../../assets/images/xym/kaihe.png" alt="">
                      </div>
                      <div class="dccb-data-p">
                        <div class="dccb-data-p1"><span>开</span></div>
                        <div class="dccb-data-p2">井道层门开合</div>
                      </div>
                    </div>
                    <div class="dcc-box-chart">
                      <div class="real-chart" id="real-chart-jdcmkh"></div>
                    </div>
                  </div>

                </div>


              </div>
              
              <div class="height-block"></div>
              
            </div> 

          </div>


        </div>





      </div>


      
    



    </div>
  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
import Footer from '../common/fotter'
import SearchCode from '../../components/SearchCode'

export default {
  data() {
    return {
      parentCode: '',
      liftPerson: '',
      dateNow: '',
      prevTimeBtn: 'able',
      nextTimeBtn: 'disable',
      currentTimeBtn: 'disable',
      isLoading: false,
      isScroll: true, // 滚动加载节流阀
      dtID: 'test001',
      scrollAllow: true,
      historyTime: '',
      timeOn: 'now',
      direction: 'stop',
      flag: true, // 用于滚动节流
      dataX: ['60s', '55s', '50s', '45s', '40s', '35s', '30s', '25s', '20s', '15s', '10s', '5s', '0s'],
      dataValue: [],

      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

      // 告警列表筛选
      triggleTime: '',
      diagnTypeOptions: [
        {value: '-1', label: '全部'},
        {value: '0', label: '事件'},
        {value: '1', label: '故障'},
        {value: '2', label: '违规'},
        {value: '3', label: '预警'},
      ],
      diagnType: '',
      processedOptions: [
        {value: '0', label: '未处理'},
        {value: '1', label: '处理中'},
        {value: '2', label: '已完成'},

       
      ],
      processed: '',
      warnList: [],
      warnParams: {
        offset : 1,
        limit : 20,
        regCode: "",
        diagnType: -1,
        processed: -1,
        startDate: '2019-1-1',
        endDate: '2019-7-18',
      },

      // 实时运行状态
      curRunData: {
        "move": "",
        "floor": 0,
        "speed": 0,
        "height": 0,
        "prox": "关"
      },

      // 实时监测
      menuActive: 'yxhj',
      changeTimeNum: 0,
      timer: '',
      warnListTimer: '',

      


      // 温湿度配置
      options: {
        tooltip: {
          trigger: "axis",
          confine: true,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          axisPointer: {
            lineStyle: {
              color: '#1D1B25',
            }
          },
          // formatter: function (params,ticket,callback) {
          //   var key = params[0].data[0] 
          //   var value = params[0].data[1]
          //   key = this.tooltipFormatDate(key)
          //   // var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + key
          //   var res = key + '<br>' + params[0].seriesName + '：' + value + '℃'
          //   return res
            
          // },
     
        },
        xAxis: {
          type: 'time',
          // inverse: true,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            // formatter: '{value}s',
            color: '#C2C7CC',
            margin: 12
          },
          min: 1561969680000,
          max: 1561970280000,
          interval: 300000,
          // splitNumber: 3,
          // name: '0',
          nameLocation: 'start',
          nameTextStyle: {
            color: '#C2C7CC'
          },
          splitLine: {
            show: false,
          },
          // nameGap: 6,
          axisLine: {
            lineStyle: {
              color: '#C2C7CC'
            }
          },
          // data: []
        },
        yAxis: {
          axisLabel: {
            // show: false,
            color: '#C2C7CC'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#C2C7CC'
            }
          },
          splitLine: {
            show: false,
          },
          splitNumber: 1,
        },
        grid: {
          top: '8px',  
          left: '50px',  
          right: '26px',  
          bottom: '24px'
        },  
        visualMap: { //区间内控制显示颜色
          show: false,
          dimension: 1,
          type: 'continuous',
          range: [0, 500],
          inRange: {
            color: ['#4272FF']
          },
          outOfRange: {
            color: ['#FA4F43']
          }
        },
        series: [
          {
            name: "机房温度",
            type: "line",
            // symbolSize: 0,
            showSymbol: false,
            smooth: true,
            lineStyle: {
              width: 3
            },
            // markLine: {
            //   data: [{
            //       name: '',
            //       yAxis: 60
            //   }],
            //   animation: false,
            //   symbolSize: 0,
            //   label: {
            //     position: 'start'
            //   },
            //   lineStyle: {
            //     normal: {
            //       type: 'solid',
            //       color: '#FA4F43',
            //     },
            //   }
            // },
            data: [[1561969701319, 10], [1561969732203, 20], [1561969748970, 40], [1561969759235, 80]]
          },    
        ]
      },

      // 回路配置
      options2: {
        tooltip: {
          trigger: "axis",
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          axisPointer: {
            lineStyle: {
              color: '#1D1B25',
            }
          },
          formatter: '{a}: {c}℃<br /> '
        },
        xAxis: {
          type: 'value',
          // inverse: true,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}s',
            color: '#66667F',
            margin: 12
          },
          min: 0,
          max: 60,
          interval: 10,
          name: '(℃)',
          nameLocation: 'start',
          nameTextStyle: {
            color: '#66667F'
          },
          splitLine: {
            show: false,
          },
          // nameGap: 6,
          axisLine: {
            lineStyle: {
              color: '#303240'
            }
          },
          // data: []
        },
        yAxis: {
          interval: 1,
          splitNumber: 1,
          axisTick: {
            show: false
          },
          axisLabel: {
            // show: true,
            color: '#66667F',
            formatter: function (value, index) {
              if (value == 0) {
                return '异常'
              }
              if (value == 1) {
                return '正常'
              }
              // return '异常'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#303240'
            }
          },
          splitLine: {
            show: false,
          },
      
        },
        grid: {
          top: '20px',  
          left: '50px',  
          right: '26px',  
          bottom: '24px'
        }, 
        visualMap: { //区间内控制显示颜色
          show: false,
          dimension: 1,
          type: 'continuous',
          range: [0, 0.01],
          inRange: {
            color: ['#E75561']
          },
          outOfRange: {
            color: ['#29DDB6']
          }
        },
        series: [
          {
            name: "A类",
            type: "line",
            step: true,
            showSymbol: false,
            lineStyle: {
              width: 2
            },
            // markLine: {
            //   data: [
            //     {
            //       name: '异常',
            //       yAxis: 0
            //     },
            //   ],
            //   animation: false,
            //   symbolSize: 0,
            //   label: {
            //     position: 'start'
            //   },
            //   lineStyle: {
            //     normal: {
            //       type: 'solid',
            //       color: '#66667F',
            //     },
            //   }
            // },
            data: []
          },
          
        ]
      }

    };
  },
  created() {
    this.parentCode = this.$route.query.regCode
  },
  mounted() {

    // 获取电梯负责人
    this.getLiftPerson()

    // 获取电梯详情
    this.getLiftDetail()

    // 滚动高亮
    this.scrollMenu()

    // 获取电梯实时运行状态
    this.getEleRunData()

    // 获取所有实时图表监测数据
    this.getChartDataSum()

    // 开启告警定时器
    // this.setWarnListTimer()

    // 开启实时监测数据定时器
    this.setTimer()

    this.chartResponse() // TODO自适应

    // 异常列表滚动加载
    this.warnScroll() 


  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.timer)
    clearInterval(this.warnListTimer)
    this.timer = null
    this.warnListTimer = null
  },
  methods: {
    // 异常告警定时器
    setWarnListTimer() {
      const that = this
      if (that.warnListTimer) clearInterval(that.warnListTimer)
      this.warnListTimer = setInterval(() => {
        that.getWarnList()
      }, 5000) // 5秒TODO
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

    // 实时监测数据定时器
    setTimer() {
      const that = this
      if (that.timer) clearInterval(that.timer)
      this.timer = setInterval(() => {
        that.getChartDataSum()
      }, 10000) // 10秒TODO
    },

    // 封装时间
    formatDate(){
        // date = new Date(date);
        var date = new Date(Date.now())
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var m1 = date.getMinutes();
        var s = date.getSeconds();
        m = m < 10 ? ("0" + m) : m;
        d = d < 10 ? ("0" + d) : d;
        return y + "." + m + "." + d
    },

    // 转换tooltip时间戳
    tooltipFormatDate(timestamp) {
      var date = new Date(timestamp)
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var m1 = date.getMinutes();
      var s = date.getSeconds();
      m = m < 10 ? ("0" + m) : m;
      d = d < 10 ? ("0" + d) : d;
      h = h < 10 ? ("0" + h) : h;
      m1 = m1 < 10 ? ("0" + m1) : m1;
      s = s < 10 ? ("0" + s) : s;
      return m + '-' + d + ' ' + h + ':' + m1 + ':' + s
    },

    // 改变时间维度
    changeTime(type) {
      this.isScroll = true
      if (type == 'add') {
        if (this.nextTimeBtn == 'disable') return
        this.changeTimeNum ++
      } else {
        if (this.prevTimeBtn == 'disable') return
        this.changeTimeNum --
      }
      clearInterval(this.timer)
      this.getChartDataSum()
    },
    
    // 获取电梯实时运行状态
    getEleRunData() {
      api.detection.getElevatorData(this.parentCode).then(res => {
        console.log('电梯实时运行状态数据', res.data.data[this.parentCode])
        let detail = res.data.data[this.parentCode]
        this.curRunData.move = detail.move
        this.curRunData.floor = detail.floor
        this.curRunData.height = detail.height
        this.curRunData.speed = parseFloat(detail.speed).toFixed(2)
        this.curRunData.prox = detail.prox == '"01"' ? '开' : '关'
      })
    },

    // 请求所有实时图表监测数据
    getChartDataSum(stime, etime) {
      const that = this
      let regCode = this.parentCode
      let nowTime = Date.now()
      var step = 10 * 60 * 1000 // 十分钟
      var etime = etime || nowTime + this.changeTimeNum * step
      if (etime >= nowTime) {
        this.nextTimeBtn = 'disable'
        this.currentTimeBtn = 'disable'
        etime = nowTime
        this.setTimer() // 开启定时器
      } else {
        this.nextTimeBtn = 'able'
        this.currentTimeBtn = 'able'
      }

      var stime = stime || etime - step

      
   
      let params = [
        {monitorObject: "0:0:0", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:0:0", monitorVal: "2", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:0:0", monitorVal: "3", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:0:0", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:0:0", monitorVal: "2", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:1:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:1:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:1", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:1", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:2", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:3", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:4", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:5", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:6", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:8", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:1", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:2", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:2", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:1", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:2", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:5:0", monitorVal: "7", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:5:0", monitorVal: "8", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:3", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:1", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:2", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:2", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:2:0", monitorVal: "9", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:2:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:1:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:1:0", monitorVal: "10", regCode: regCode, stime: stime, etime: etime},

      ]

      api.detection.getMonitorData(params).then(res => {
        let resList = res.data.data || {}
        that.drawJFWD(etime, resList['0:0:0:1'])
        that.drawJFSD(etime, resList['0:0:0:2'])
        that.drawJFFS(etime, resList['0:0:0:3'])
        that.drawJDWD(etime, resList['2:0:0:1'])
        that.drawJDSD(etime, resList['2:0:0:2'])
        that.drawJFDYDY(etime, resList['0:1:0:5'])
        that.drawJFDYDL(etime, resList['0:1:0:4'])
        that.drawMSAQHLDY(etime, resList['0:2:1:5'])
        that.drawMSAQHLDL(etime, resList['0:2:1:4'])
        that.drawAQKGHLDY(etime, resList['0:2:2:5'])
        that.drawJXKGDY(etime, resList['0:2:3:5'])
        that.drawJSKGDYS(etime, resList['0:2:4:5'])
        that.drawJSKGDYX(etime, resList['0:2:5:5'])
        that.drawQPJSKGDYS(etime, resList['0:2:6:5'])
        that.drawPCGYQDY(etime, resList['0:2:8:5'])
        that.drawDDJDYDY(etime, resList['0:3:0:5'])
        that.drawDDJDYDL(etime, resList['0:3:0:4'])
        that.drawDDJWKWD(etime, resList['0:3:1:1'])
        that.drawDDJWKZD(etime, resList['0:3:1:6'])
        that.drawDDJZCWD(etime, resList['0:3:2:1'])
        that.drawDDJZCZD(etime, resList['0:3:2:6'])
        that.drawZDQDYDY(etime, resList['0:4:0:5'])
        that.drawZDQDYDL(etime, resList['0:4:0:4'])
        that.drawZDQXQWD(etime, resList['0:4:1:1'])
        that.drawZDQZWWD(etime, resList['0:4:2:1'])
        that.drawXSQSD(etime, resList['0:5:0:7'])
        that.drawXSQQS(etime, resList['0:5:0:8'])
        that.drawJDZHKZDY(etime, resList['1:0:3:5'])
        that.drawJDJXKGDY(etime, resList['1:0:1:5'])
        that.drawJDMJMDDY(etime, resList['1:0:2:5'])
        that.drawJDMJMDDL(etime, resList['1:0:2:4'])
        that.drawJXWZ(etime, resList['1:2:0:9'])
        that.drawJXXTZD(etime, resList['1:2:1:6'])
        that.drawJDDGZD(etime, resList['2:1:1:6'])
        that.drawJDCMKH(etime, resList['2:1:0:10'])
      })
    },

    // 图表自适应
    chartResponse() {
      const that = this
      setTimeout(() => {
        let jfwd = that.$echarts.getInstanceByDom(document.getElementById("real-chart-jfwd"));

        window.addEventListener("resize", function() {
          jfwd.resize();

        })

      }, 300)

    },

  
    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/detection',
        query: {
          regCode: val
        }
      })
      console.log('pp', this.parentCode)
    },

    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
        console.log('res', res)
        let detail = res.data.data
        this.regCode = detail.regCode
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address

        // 查询异常告警列表
        this.getWarnList()
      })
    },

    // 查询异常告警列表
    getWarnList() {
      this.warnParams.regCode = this.parentCode
      api.detection.getWarnList(this.warnParams).then(res => {
        console.log('异常告警', res)
        this.warnList = res.data.data.records
      })

    },

    // 异常告警列表滚动加载
    warnScroll() {
      const that = this
      var divscroll = document.getElementById('dw-list');

      divscroll.addEventListener('scroll', () => {
        var wholeHeight = divscroll.scrollHeight; // div总高度
        var scrollTop = divscroll.scrollTop; // 卷曲高度
        var divHeight = divscroll.clientHeight; // div可见高度

        // 已滚到底部
        if(scrollTop + divHeight >= wholeHeight && that.isScroll){
          that.isScroll = false // 防止多次请求
          that.isLoading = true
          that.warnParams.offset += 1
          api.detection.getWarnList(that.warnParams).then(res => {
            setTimeout(() => {
              that.isLoading = false
              // 如果为空数组，则不允许往下滚动加载
              if (res.data.data.records.length > 0) {
                that.isScroll = true
                let warnListMore = res.data.data.records
                that.warnList = that.warnList.concat(warnListMore)
              }
            }, 1000)
          })
          .catch(err => {
            console.log('下拉请求失败，请重试', err)
            that.isLoading = false
            that.isScroll = true
          })
        }
        // if(scrollTop == 0){
        //     alert('滚动到头部了！');
        // }

      })

    },

    // 异常告警日期筛选
    changeTriggleTime(triggleTime) {
      this.isScroll = true
      this.warnParams.startDate = triggleTime[0]
      this.warnParams.endDate = triggleTime[1]
      this.getWarnList()
    },

    // 异常告警类型筛选
    changeDiagnType(diagnType) {
      this.isScroll = true
      this.warnParams.diagnType = diagnType
      this.getWarnList()
    },

    // 异常告警进度筛选
    changeProcessed(processed) {
      this.isScroll = true
      this.warnParams.processed = processed
      this.getWarnList()
    },

    // 锚点平滑跳转
    jump(index) {
      let that = this
      // this.activeStep = index
      // 用 class="step-jump" 添加锚点
      let jumpArr = document.querySelectorAll('.dcc-type')
      // let testContent = document.getElementById('testContent')
      // let scrollbar1 = document.getElementById('scrollbar1')
      let scrollWrap = document.getElementById('det-ca-chartCon')
      // if (stage && stage == 'first') {
      //   this.scrollAllow = true
      // } else {
      //   this.scrollAllow = false
      // }
      // this.scrollMenu()


      // switch(index) {
      //   case 0:
      //     that.menuActive = 'yxhj';
      //     break;
      //   case 1:
      //     that.menuActive = 'dyg';
      //     break;
      //   case 2:
      //     that.menuActive = 'kzg';
      //     break;
      //   case 3:
      //     that.menuActive = 'ddj';
      //     break;
      //   case 4:
      //     that.menuActive = 'zdq';
      //     break;
      //   case 5:
      //     that.menuActive = 'xsq';
      //     break;
      //   case 6:
      //     that.menuActive = 'jd';
      //     break;
      //   case 7:
      //     that.menuActive = 'jx';
      //     break;
      //   case 8:
      //     that.menuActive = 'jingdao';
      //     break;
      // }

      if (this.flag) {
        that.flag = false
        let scrollWrapTop = scrollWrap.offsetTop
        let total = jumpArr[index].offsetTop - scrollWrapTop // 目标卷曲位置
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
      let scrollWrap = document.getElementById('det-ca-chartCon')

      let d = 80 // 提前多少距离高亮
      let scrollWrapTop = scrollWrap.offsetTop + d 
      let boxATop = document.getElementById('yxhj_type').offsetTop - scrollWrapTop
      let boxBTop = document.getElementById('dyg_type').offsetTop - scrollWrapTop
      let boxCTop = document.getElementById('kzg_type').offsetTop - scrollWrapTop
      let boxDTop = document.getElementById('ddj_type').offsetTop - scrollWrapTop
      let boxETop = document.getElementById('zdq_type').offsetTop - scrollWrapTop
      let boxFTop = document.getElementById('xsq_type').offsetTop - scrollWrapTop
      let boxGTop = document.getElementById('jd_type').offsetTop - scrollWrapTop
      let boxHTop = document.getElementById('jx_type').offsetTop - scrollWrapTop
      let boxJTop = document.getElementById('jingdao_type').offsetTop - scrollWrapTop

      var scrollFun = function () {
        var current_offset_top = scrollWrap.scrollTop; // 卷曲的高度
        // console.log(current_offset_top)

        if (current_offset_top < boxBTop) {
          that.menuActive = "yxhj";
        } else if (current_offset_top >= boxBTop && current_offset_top < boxCTop) {
          that.menuActive = "dyg";
        } else if (current_offset_top >= boxCTop && current_offset_top < boxDTop) {
          that.menuActive = "kzg";
        } else if (current_offset_top >= boxDTop && current_offset_top < boxETop) {
          that.menuActive = "ddj";
        } else if (current_offset_top >= boxETop && current_offset_top < boxFTop) {
          that.menuActive = "zdq";
        } else if (current_offset_top >= boxFTop && current_offset_top < boxGTop) {
          that.menuActive = "xsq";
        } else if (current_offset_top >= boxGTop && current_offset_top < boxHTop) {
          that.menuActive = "jd";
        } else if (current_offset_top >= boxHTop && current_offset_top < boxJTop) {
          that.menuActive = "jx";
        } else {
          that.menuActive = "jingdao";
        }

      }

      scrollWrap.addEventListener('scroll', scrollFun)

    },

    

    
    // 封装图表1
    drawChart1(obj) {
      // 待封装：visualMap范围，markline阈值
      let extendObj = {
        container: obj.container,
        unit: obj.unit ? obj.unit : '',
        name: obj.name ? obj.name : '',
        max: obj.max ? obj.max : '', // 相当于eTime
        data: obj.data ? obj.data : []
      }
      let that = this
      let chart = this.$echarts.init(document.getElementById(`${extendObj.container}`))
      let options = xymFun.deepClone(that.options)
      options.series[0].data = extendObj.data
      options.series[0].name = extendObj.name
      options.xAxis.max = extendObj.max
      options.xAxis.min = extendObj.max - 10*60*1000
      options.tooltip.formatter = (params,ticket,callback) => {
        var key = params[0].data[0] 
        var value = params[0].data[1]
        key = this.tooltipFormatDate(key)
        // var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + key
        var res = key + '<br>' + params[0].seriesName + '：' + value + extendObj.unit
        return res
      },
      chart.setOption(options)
    },

    // 机房温度
    drawJFWD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data1)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jfwd',
        unit: '℃',
        name: '机房温度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 机房湿度
    drawJFSD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data2)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jfsd',
        unit: '%',
        name: '机房湿度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 机房风速
    drawJFFS(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jffs',
        unit: 'm/s',
        name: '机房风速',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 井道温度
    drawJDWD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data1)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdwd',
        unit: '℃',
        name: '井道温度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 井道湿度
    drawJDSD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data2)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdsd',
        unit: '%',
        name: '井道湿度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 机房电源电压
    drawJFDYDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jfdydy',
        unit: 'V',
        name: '机房电源电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 机房电源电流
    drawJFDYDL(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jfdydl',
        unit: 'A',
        name: '机房电源电流',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 门锁安全回路电压
    drawMSAQHLDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-msaqhldy',
        unit: 'V',
        name: '门锁安全回路电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 门锁安全回路电流
    drawMSAQHLDL(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-msaqhldl',
        unit: 'A',
        name: '门锁安全回路电流',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 安全开关回路电压
    drawAQKGHLDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-aqkghldy',
        unit: 'V',
        name: '安全开关回路电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 检修开关电压
    drawJXKGDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jxkgdy',
        unit: 'V',
        name: '检修开关电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // （上）减速开关电压
    drawJSKGDYS(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jskgdys',
        unit: 'V',
        name: '（上）减速开关电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // （下）减速开关电压
    drawJSKGDYX(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jskgdyx',
        unit: 'V',
        name: '（下）减速开关电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // （上）强迫减速开关电压
    drawQPJSKGDYS(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-qpjskgdys',
        unit: 'V',
        name: '（上）强迫减速开关电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 平层感应器电压
    drawPCGYQDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-pcgyqdy',
        unit: 'V',
        name: '平层感应器电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 电动机电源电压
    drawDDJDYDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-ddjdydy',
        unit: 'V',
        name: '电动机电源电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 电动机电源电流
    drawDDJDYDL(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-ddjdydl',
        unit: 'A',
        name: '电动机电源电流',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 电动机外壳温度
    drawDDJWKWD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data1)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-ddjwkwd',
        unit: '℃',
        name: '电动机外壳温度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 电动机外壳振动
    drawDDJWKZD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-ddjwkzd',
        unit: 'μm',
        name: '电动机外壳振动',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 电动机轴承温度
    drawDDJZCWD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data1)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-ddjzcwd',
        unit: '℃',
        name: '电动机轴承温度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 电动机轴承振动
    drawDDJZCZD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-ddjzczd',
        unit: 'μm',
        name: '电动机轴承振动',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 制动器电源电压
    drawZDQDYDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-zdqdydy',
        unit: 'V',
        name: '制动器电源电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 制动器电源电流
    drawZDQDYDL(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-zdqdydl',
        unit: 'A',
        name: '制动器电源电流',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 制动器线圈温度
    drawZDQXQWD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data1)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-zdqxqwd',
        unit: '℃',
        name: '制动器线圈温度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 制动器闸瓦温度
    drawZDQZWWD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data1)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-zdqzwwd',
        unit: '℃',
        name: '制动器闸瓦温度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 限速器速度
    drawXSQSD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-xsqsd',
        unit: 'm/s',
        name: '限速器速度',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 限速器圈数
    drawXSQQS(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-xsqqs',
        unit: 'rpm',
        name: '限速器圈数',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 轿顶载荷控制器电压
    drawJDZHKZDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdzhkzqdy',
        unit: 'V',
        name: '轿顶载荷控制器电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 轿顶检修开关电压
    drawJDJXKGDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdjxkgdy',
        unit: 'V',
        name: '轿顶检修开关电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 轿顶门机马达电压
    drawJDMJMDDY(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdmjmddy',
        unit: 'V',
        name: '轿顶门机马达电压',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 轿顶门机马达电流
    drawJDMJMDDL(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdmjmddl',
        unit: 'A',
        name: '轿顶门机马达电流',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 轿厢位置
    drawJXWZ(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.floor)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jxwz',
        unit: 'F',
        name: '轿厢位置',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 轿厢箱体振动
    drawJXXTZD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jxxtzd',
        unit: 'μm',
        name: '轿厢箱体振动',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 井道导轨振动
    drawJDDGZD(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jddgzd',
        unit: 'μm',
        name: '井道导轨振动',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },

    // 井道层门开合
    drawJDCMKH(etime, data) {
      let dataArr = []
      if (data) {
        // 重组数据
        data.forEach((item, i) => {
          let arr = []
          arr.push(new Date(item.time).getTime(), item.real_data)
          dataArr.push(arr)
        })
      }
      let obj = {
        container: 'real-chart-jdcmkh',
        unit: '',
        name: '井道层门开合',
        max: etime,
        data: dataArr,
      }
      this.drawChart1(obj)
    },




    
  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    
  },
  filters: {
    // 转换故障类型
    changeDiagnType(value) {
      if (value == 1) {
        return '故障'
      } else if (value == 2) {
        return '违规'
      } else if (value == 3) {
        return '预警'
      } else {
        return '事件'
      }
    },

    // 转换处理进度
    changeProcessed(value) {
      if (value == 1) {
        return '处理中'
      } else if (value == 2) {
        return '已完成'
      } else {
        return '未处理'
      }
    },
  },
};
</script>


<style>
#ed .el-input__inner{
  background: none;
  border: none;
}
#ed .el-range-input{
  background: none;
  margin-top: -2px;
}
#ed .el-date-editor .el-range-separator{
  width: auto;
}
</style>


<style lang="stylus" scoped>

#ed {
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height: 1;
  }
  



  // ggggggggggg
  .det-content{
    margin: 20px;
  }
  .det-warn{
    float: left;
    background: #FFFFFF;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    border-radius: 8px;
    height: 783px;
    width: 28%;
  }
  .det-warn-title{
    position: relative;
  }
  .det-warn-title-h{
    font-size: 16px;
    font-weight: bold;
    color: #34414C;
    line-height: 60px;
    padding: 0 20px;
  }
  .dwc-box{
    position: relative;
    float: left;
    width: 33.3%;
  }
  .det-warn-choose{
    background: #F5F6F7;
  }
  .dwc-date-icon{
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 40px;
    background: url('../../assets/images/xym/date.png') no-repeat center center;
  }
  .dwc-box-line{
    position: absolute;
    top: 13px;
    right: -3px;
    height: 14px;
    width: 1px;
    background: #D8DDDF;
  }
  .dw-list{
    padding: 0 20px;
    height: 660px;
    overflow: auto;
  }
  .dw-list-box{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px dashed #D8DDDF;
    cursor: pointer;
  }
  .dwlb-p {
    padding-right: 64px;
  }
  .dwlb-p h4{
    font-size: 14px;
    color: #34414C;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dwlb-p p{
    font-size: 14px;
    color: #7E8A95;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dwlb-rate{
    position: absolute;
    top: 27px;
    right: 0px;
    font-size: 14px;
    color: #34414C;
  }
  .dwlb-rate.no-deal{
    color: #FA4F43;
  }
  .height-block{
    height: 520px
  }

 

}



</style>
