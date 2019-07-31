<template>
  <div id="DetectionDiagnoseC">
    <div class="clearfix">

      <!-- 中间异常详情 -->
      <div class="det-mid">
        <div class="det-mid-diagnose">
          <div class="diagnose-item">
            <div class="diagnose-item-detail">
              <div class="diagnose-item-detail-title">
                <div class="didt-deal-btn">处理</div>
                <div class="didt-h3">门锁回路短接异常</div>
                <div class="didt-date">04-24  14:47:12</div>
              </div>
              <div class="diagnose-item-detail-p">
                系统监测到门机马达 电流≠0A(03-20 16:54:05) 且门锁安全回路的电流≠0A (03-20 16:54:05)
                <br>
                门锁回路短接可能出现开门走梯的严重事故
              </div>
            </div>

            <!-- TODO 图表 所有图表和判断待完成 -->
            <!-- 用遍历、判断进行渲染，命名用后缀-pro区分 -->
            <div class="diagnose-problem-chart">
              <!-- 一级目录：运行环境 -->
              <!-- monitorObject: "0:0:0" "2:0:0" -->
              <!-- v-if="item.code.slice(0,5) == '0:0:0' ||" -->
              <div class="dnProblem-first">
                <div class="dnProblem-first-title">运行环境</div>
                <div class="dnProblem-second">
                  <div class="dnProblem-second-title">机房</div>
                  <!-- v-if="item.code == '0:0:0:1'" -->
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
                      <div class="real-chart" id="real-chart-jfwd-pro"></div>
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
                      <div class="real-chart" id="real-chart-jfsd-pro"></div>
                    </div>
                  </div>



                </div>
                



              </div>



            </div>





          </div>
          <div class="dcc-type-block"></div>
          <div class="diagnose-item">
            <div class="diagnose-item-subTitle">
              <div class="diagnose-item-subTitle-p">电梯运行状态</div>
              <div class="diagnose-item-subTitle-span">当前</div>
            </div>
            <div class="diagnose-item-running clearfix">
              <div class="dnRunning-box">
                <img src="../../assets/images/xym/running-up.png" alt="">
                <div class="dnRunning-box-p">21<span>F</span></div>
              </div>
              <div class="dnRunning-box">
                <img src="../../assets/images/xym/running-speed.png" alt="">
                <div class="dnRunning-box-p">2.9<span>m/s</span></div>
              </div>
              <div class="dnRunning-box">
                <img src="../../assets/images/xym/running-door.png" alt="">
                <div class="dnRunning-box-p">关</div>
              </div>
              <div class="dnRunning-box">
                <img src="../../assets/images/xym/running-weight.png" alt="">
                <div class="dnRunning-box-p">4434<span>kg</span></div>
              </div>

            </div>
          </div>
          <div class="dcc-type-block"></div>
          <div class="diagnose-item">
            <div class="diagnose-item-subTitle">
              <div class="diagnose-item-subTitle-p">数据统计</div>
              <div class="diagnose-item-subTitle-span">本月</div>
            </div>
            <div class="dnStat-top clearfix">
              <div class="dnStat-top-li clearfix">
                <div class="dnStat-top-li-title">平层停梯准确度</div>
                <div class="dnStat-top-li-p">98%</div>
              </div>
              <div class="dnStat-top-li clearfix">
                <div class="dnStat-top-li-title">轿门开合准确度</div>
                <div class="dnStat-top-li-p">80%</div>
              </div>
              <div class="dnStat-top-li clearfix">
                <div class="dnStat-top-li-title">平均运行速度</div>
                <div class="dnStat-top-li-p">2.5m/s</div>
              </div>
              <div class="dnStat-top-li clearfix">
                <div class="dnStat-top-li-title">平均载荷重量</div>
                <div class="dnStat-top-li-p">1600kg</div>
              </div>

            </div>
            <div class="dnStat-bot clearfix">
              <div class="dnStat-bot-box">
                <div class="dnStat-bot-box-title">累计运行里程</div>
                <div class="dnStat-bot-box-data">23456<span>km</span></div>
                <div class="dnStat-bot-box-per">月同比 11% <i class="percent-down"></i></div>
              </div>
              <div class="dnStat-bot-box">
                <div class="dnStat-bot-box-title">电梯启停</div>
                <div class="dnStat-bot-box-data">3290<span>次</span></div>
                <div class="dnStat-bot-box-per">月同比 9% <i class="percent-up"></i></div>
              </div>
              <div class="dnStat-bot-box">
                <div class="dnStat-bot-box-title">轿门开合</div>
                <div class="dnStat-bot-box-data">1345<span>次</span></div>
                <div class="dnStat-bot-box-per">月同比 11% <i class="percent-up"></i></div>
              </div>

            </div>

          </div>


        </div>
        

        
      </div>

      <!-- 右侧图表历史数据 -->
      <div class="det-right">
        <!-- 切换时间 -->
        <div class="det-warn-title">
          <div class="det-warn-title-h">实时监测数据</div> 
          <div class="det-cTime-con clearfix">
            <div class="dcc-btn dcc-btn-left" :class="prevTimeBtn == 'disable' ? 'useless' : ''" @click="changeTime('sub')"></div>
            <div class="dcc-btn-current" :class="currentTimeBtn == 'disable' ? 'useless' : ''">上报时间</div> 
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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

            <div class="dcc-type-block"></div>
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
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
export default {
  data() {
    return {
      // 报警设备列表
      diagnDevicesList: [],

      // 右侧当前数据



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
            // 标志线
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

    }
  },
  mounted() {
    // paramsObj:{"container": "容器id", "unit": "单位", "max": "eTime结束时间", "threshold": "阈值", "dataType": "数据类型，不用的检测值用不同字段", "data": "对应原始数组"}
    // 中间图表和右侧图表要做区分
    this.drawChart1({
      container: 'real-chart-jfwd-pro',
      unit: '℃',
      name: '机房温度',
      max: Date.now(),
      dataType: 'real_data1',
      data: [],
    })

    this.drawChart1({
      container: 'real-chart-jfsd-pro',
      unit: '%',
      name: '机房湿度',
      max: Date.now(),
      dataType: 'real_data2',
      data: [],
    })

  },
  methods: {
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

    // 封装图表1
    drawChart1(obj) {
      const that = this
      let extendObj = {
        container: obj.container, // 容器id
        unit: obj.unit ? obj.unit : '', // 单位
        name: obj.name ? obj.name : '', // 名字
        max: obj.max ? obj.max : '', // 相当于eTime时间戳
        threshold: obj.threshold ? obj.threshold : '', // 报警阈值
        dataType: obj.dataType ? obj.dataType : '', // 不同的数据类型使用不同字段 "real_data1":温度  "real_data2":湿度  "floor":楼层  "real_data":其他
        data: obj.data.length ? obj.data : [] // 数据，需要经过处理
      }

      // 重新处理数据并赋值给extendObj
      let dataArr = []
      // let dataArr = [[1563868712000, 50], [1563868832000, 90], [1563868892000, 100]]
      if (extendObj.data.length) {
        // 重组数据
        extendObj.data.forEach((item, i) => {
          let arr = []
          let value = item[extendObj.dataType]
          arr.push(new Date(item.time).getTime(), value)
          dataArr.push(arr)
        })
      }
      extendObj.data = dataArr

      let chart = this.$echarts.init(document.getElementById(`${extendObj.container}`))
      let options = xymFun.deepClone(that.options)
      options.series[0].data = extendObj.data
      options.series[0].name = extendObj.name
      options.xAxis.max = extendObj.max
      options.xAxis.min = extendObj.max - 10*60*1000
      options.tooltip.formatter = (params,ticket,callback) => {
        var key = params[0].data[0] 
        var value = params[0].data[1]
        key = that.tooltipFormatDate(key)
        // var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + key
        var res = key + '<br>' + params[0].seriesName + '：' + value + extendObj.unit
        return res
      }
      // 如果有阈值，则设置标志线和范围
      if (extendObj.threshold) {
        // 标志线
        options.series[0].markLine = {
          data: [{
              name: '',
              yAxis: parseInt(extendObj.threshold)
          }],
          animation: false,
          symbolSize: 0,
          label: {
            position: 'start'
          },
          lineStyle: {
            normal: {
              type: 'solid',
              color: '#FA4F43',
            },
          }
        }
        // 范围
        options.visualMap.range = []
        options.visualMap.range.push(0, parseInt(extendObj.threshold))
      }
      
      chart.setOption(options)
    },


  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
#DetectionDiagnoseC{
  @import '../../assets/stylus/xymStyle.styl'
  .det-mid-diagnose{
    height 783px;
    overflow auto;
    background #fff;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    border-radius: 8px;
  }
  .diagnose-item{
    background #fff;
    padding: 0 20px 20px;
  }
  .diagnose-item-detail{
    border-bottom: 1px dashed #D8DDDF;
    padding-bottom 16px;
  }
  .diagnose-item-detail-title{
    position relative
    padding-top 20px;
  }
  .didt-deal-btn{
    position absolute;
    right 20px;
    top: 24px;
    font-size: 14px;
    color: #4272FF;
    cursor pointer
  }
  .didt-h3{
    font-size: 20px;
    color: #34414C;
    font-weight bold
  }
  .didt-date{
    font-size: 14px;
    color: #7E8A95;
    margin-top 15px;
  }
  .diagnose-item-detail-p{
    font-size: 14px;
    color: #7E8A95;
    line-height 20px;
    margin-top 14px;
  }
  .dnProblem-first-title{
    font-size: 16px;
    color: #34414C;
    font-weight bold;
    margin-top 20px;
  }
  .dnProblem-second-title{
    font-size: 16px;
    color: #34414C;
    margin-top 16px;
  }
  .diagnose-item-subTitle{
    position relative;
    margin-top 20px;
  }
  .diagnose-item-subTitle-p{
    font-size: 16px;
    color: #34414C;
    font-weight: bold
  }
  .diagnose-item-subTitle-span{
    position absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    color: #7E8A95;
    background: #F5F6F7;
    border-radius: 4px;
    text-align: center;
    width 36px;
    line-height 16px;
  }
  .dnRunning-box{
    box-sizing border-box
    float: left;
    width: 25%;
    text-align center;
    margin-top 20px;
    padding 0 10px;
  }
  .dnRunning-box-p{
    font-size: 24px;
    color: #34414C;
    margin-top 10px;
  }
  .dnRunning-box-p span{
    font-size: 14px;
  }
  .dnStat-top{
    border-bottom: 1px dashed #D8DDDF;
    padding-bottom 20px;
    padding-top 6px;
  }
  .dnStat-top-li{
    float: left;
    width: 50%;
    margin-top 10px;
  }
  .dnStat-top-li-title{
    float: left;
    width: 110px;
    font-size: 14px;
    line-height 20px;
    color: #7E8A95;
  }
  .dnStat-top-li-p{
    float: left;
    font-size: 14px;
    line-height 20px;
    color: #34414C;
  }
  .dnStat-bot-box{
    box-sizing border-box;
    float left
    width: 33%;
    padding: 0 15px;
    margin-top 20px;
  }
  .dnStat-bot-box-title{
    font-size: 14px;
    color: #7E8A95;
  }
  .dnStat-bot-box-data{
    font-size: 24px;
    color: #34414C;
    margin-top 10px;
  }
  .dnStat-bot-box-data span{
    font-size 14px;
  }
  .dnStat-bot-box-per{
    display inline-block
    position relative
    font-size: 12px;
    color: #34414C;
    margin-top 15px;
  }


}

</style>
