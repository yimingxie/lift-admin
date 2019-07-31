<template>
  <div id="DetChartComp">
    <!-- 右侧实时监测数据 -->
    <div class="">
      <!-- 切换时间 -->
      <div class="det-warn-title">
        <div class="det-warn-title-h">实时监测数据</div> 
        <div class="det-cTime-con clearfix">
          <div class="dcc-btn dcc-btn-left" :class="prevTimeBtn == 'disable' ? 'useless' : ''" @click="changeTime('sub')"></div>
          <div class="dcc-btn-current" v-if="diagnId" :class="currentWarnBtn == 'disable' ? 'useless' : ''" @click="changeTimeToWarn()">故障时</div> 
          <div class="dcc-btn-current" v-else :class="currentTimeBtn == 'disable' ? 'useless' : ''" @click="changeTimeToCurrent(Date.now())">实时</div>

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
                    <div class="dccb-data-p1"><span>{{jfwdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{jfsdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{jffsVal}}</span>m/s</div>
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
                    <div class="dccb-data-p1"><span>{{jdwdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{jdsdVal}}</span>%</div>
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
                    <div class="dccb-data-p1"><span>{{jfdydyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jfdydlVal}}</span>A</div>
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
                    <div class="dccb-data-p1"><span>{{msaqhldyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{msaqhldlVal}}</span>A</div>
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
                    <div class="dccb-data-p1"><span>{{aqkgmldyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jxkgdyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jskgdysVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jskgdyxVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{qpjskgdysVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{pcgyqdyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{ddjdydyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{ddjdydlVal}}</span>A</div>
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
                    <div class="dccb-data-p1"><span>{{ddjwkwdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{ddjwkzdVal}}</span>μm</div>
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
                    <div class="dccb-data-p1"><span>{{ddjzcwdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{ddjzczdVal}}</span>μm</div>
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
                    <div class="dccb-data-p1"><span>{{zdqdydyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{zdqdydlVal}}</span>A</div>
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
                    <div class="dccb-data-p1"><span>{{zdqxqwdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{zdqzwwdVal}}</span>℃</div>
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
                    <div class="dccb-data-p1"><span>{{xsqsdVal}}</span>m/s</div>
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
                    <div class="dccb-data-p1"><span>{{xsqqsVal}}</span>rpm</div>
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
              <div class="dcc-item-title">轿顶</div>
              <div class="dcc-box">
                <div class="dcc-box-data clearfix">
                  <div class="dccb-data-icon">
                    <img src="../../assets/images/xym/dianya.png" alt="">
                  </div>
                  <div class="dccb-data-p">
                    <div class="dccb-data-p1"><span>{{jdzhkzqdyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jdjxkgdyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jdmjmddyVal}}</span>V</div>
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
                    <div class="dccb-data-p1"><span>{{jdmjmddlVal}}</span>A</div>
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
                    <div class="dccb-data-p1"><span>{{jxwzVal}}</span>楼</div>
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
                    <div class="dccb-data-p1"><span>{{jxxtzdVal}}</span>μm</div>
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
                    <div class="dccb-data-p1"><span>{{jddgzdVal}}</span>μm</div>
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
                    <div class="dccb-data-p1"><span>{{jdcmkhVal}}</span></div>
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
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'

export default {
  data() {
    return {
      parentCode: '',
      diagnId: '',
      // 实时监测数据
      prevTimeBtn: 'able',
      nextTimeBtn: 'disable',
      currentTimeBtn: 'disable',
      currentWarnBtn: 'disable',
      flag: true, // 用于滚动节流
      menuActive: 'yxhj',
      changeTimeNum: 0,
      timer: null,
      chartTimer: null,

      // 实时值
      jfwdVal: 0,
      jfsdVal: 0,
      jffsVal: 0,
      jdwdVal: 0,
      jdsdVal: 0,
      jfdydyVal: 0,
      jfdydlVal: 0,
      msaqhldyVal: 0,
      msaqhldlVal: 0,
      aqkgmldyVal: 0,
      jxkgdyVal: 0,
      jskgdysVal: 0,
      jskgdyxVal: 0,
      qpjskgdysVal: 0,
      pcgyqdyVal: 0,
      ddjdydyVal: 0,
      ddjdydlVal: 0,
      ddjwkwdVal: 0,
      ddjwkzdVal: 0,
      ddjzcwdVal: 0,
      ddjzczdVal: 0,
      zdqdydyVal: 0,
      zdqdydlVal: 0,
      zdqxqwdVal: 0,
      zdqzwwdVal: 0,
      xsqsdVal: 0,
      xsqqsVal: 0,
      jdzhkzqdyVal: 0,
      jdjxkgdyVal: 0,
      jdmjmddyVal: 0,
      jdmjmddlVal: 0,
      jxwzVal: 0,
      jxxtzdVal: 0,
      jddgzdVal: 0,
      jdcmkhVal: 0,

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

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
    this.diagnId = this.$route.query.diagnId ? this.$route.query.diagnId : ''
    console.log(this.diagnId)
  },
  mounted() {

    // 滚动高亮
    this.scrollMenu()

    // 获取所有实时图表监测数据
    this.getChartDataSum()

  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.timer)
    clearTimeout(this.chartTimer)
    this.timer = null
    this.chartTimer = null
  },
  methods: {
    // 实时监测数据定时器
    setTimer() {
      const that = this
      if (that.timer) clearInterval(that.timer)
      this.timer = setInterval(() => {
        that.getChartDataSum()
      }, 10000) // 10秒TODO
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
      this.currentWarnBtn = 'able'
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

    // 回到实时时间
    changeTimeToCurrent(timestamp) {
      this.changeTimeNum = 0
      this.currentTimeBtn = 'disable'
      this.prevTimeBtn = 'able'
      this.nextTimeBtn = 'disable'
      this.getChartDataSum('', timestamp)
    },

    // 回到上报时间
    changeTimeToWarn() {
      this.changeTimeNum = 0
      this.currentWarnBtn = 'disable'
      this.getChartDataSum()
    },

    // 请求所有实时图表监测数据
    getChartDataSum(stime, etime) {
      const that = this
      let regCode = this.parentCode
      let nowTime = Date.now()
      var step = 10 * 60 * 1000 // 十分钟
      var etime = etime || nowTime + this.changeTimeNum * step
      // 进入实时面板
      if (!this.$route.query.diagnId) {
        if (etime >= nowTime) {
          this.nextTimeBtn = 'disable'
          this.currentTimeBtn = 'disable'
          etime = nowTime
          this.setTimer() // TODO开启定时器
        } else {
          this.nextTimeBtn = 'able'
          this.currentTimeBtn = 'able'
        }

      } 
      // 进入详情页
      // TODO 根据url传参获取告警时间设置endTime值，并且不开启定时器
      // /app/elevator/diaginInfo/{diaginId}
      else {
        etime = parseInt(this.$route.query.timestamp) + this.changeTimeNum * step
        if (etime >= nowTime) {
          this.nextTimeBtn = 'disable'
        } else {
          this.nextTimeBtn = 'able'
        }

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
        clearTimeout(this.chartTimer)
        let resList = res.data.data || {}
        console.log('请求所有图表数据', res.data)
        this.chartTimer = setTimeout(() => {
           this.drawChart1({container: 'real-chart-jfwd',unit: '℃',name: '机房温度',max: etime,dataType: 'real_data',data: resList['0:0:0:1']})
          this.drawChart1({container: 'real-chart-jfsd',unit: '%',name: '机房湿度',max: etime,dataType: 'real_data',data: resList['0:0:0:2']})
          this.drawChart1({container: 'real-chart-jffs',unit: 'm/s',name: '机房风速',max: etime,dataType: 'real_data',data: resList['0:0:0:3']})
          this.drawChart1({container: 'real-chart-jdwd',unit: '℃',name: '井道温度',max: etime,dataType: 'real_data',data: resList['2:0:0:1']})
          this.drawChart1({container: 'real-chart-jdsd',unit: '%',name: '井道湿度',max: etime,dataType: 'real_data',data: resList['2:0:0:2']})
          this.drawChart1({container: 'real-chart-jfdydy',unit: 'V',name: '机房电源电压',max: etime,dataType: 'real_data',data: resList['0:1:0:5']})
          this.drawChart1({container: 'real-chart-jfdydl',unit: 'A',name: '机房电源电流',max: etime,dataType: 'real_data',data: resList['0:1:0:4']})
          this.drawChart1({container: 'real-chart-msaqhldy',unit: 'V',name: '门锁安全回路电压',max: etime,dataType: 'real_data',data: resList['0:2:1:5']})
          this.drawChart1({container: 'real-chart-msaqhldl',unit: 'A',name: '门锁安全回路电流',max: etime,dataType: 'real_data',data: resList['0:2:1:4']})
          this.drawChart1({container: 'real-chart-aqkghldy',unit: 'V',name: '安全开关回路电压',max: etime,dataType: 'real_data',data: resList['0:2:2:5']})
          this.drawChart1({container: 'real-chart-jxkgdy',unit: 'V',name: '检修开关电压',max: etime,dataType: 'real_data',data: resList['0:2:3:5']})
          this.drawChart1({container: 'real-chart-jskgdys',unit: 'V',name: '（上）减速开关电压',max: etime,dataType: 'real_data',data: resList['0:2:4:5']})
          this.drawChart1({container: 'real-chart-jskgdyx',unit: 'V',name: '（下）减速开关电压',max: etime,dataType: 'real_data',data: resList['0:2:5:5']})
          this.drawChart1({container: 'real-chart-qpjskgdys',unit: 'V',name: '（上）强迫减速开关电压',max: etime,dataType: 'real_data',data: resList['0:2:6:5']})
          this.drawChart1({container: 'real-chart-pcgyqdy',unit: 'V',name: '平层感应器电压',max: etime,dataType: 'real_data',data: resList['0:2:8:5']})
          this.drawChart1({container: 'real-chart-ddjdydy',unit: 'V',name: '电动机电源电压',max: etime,dataType: 'real_data',data: resList['0:3:0:5']})
          this.drawChart1({container: 'real-chart-ddjdydl',unit: 'A',name: '电动机电源电流',max: etime,dataType: 'real_data',data: resList['0:3:0:4']})
          this.drawChart1({container: 'real-chart-ddjwkwd',unit: '℃',name: '电动机外壳温度',max: etime,dataType: 'real_data',data: resList['0:3:1:1']})
          this.drawChart1({container: 'real-chart-ddjwkzd',unit: 'μm',name: '电动机外壳振动',max: etime,dataType: 'real_data',data: resList['0:3:1:6']})
          this.drawChart1({container: 'real-chart-ddjzcwd',unit: '℃',name: '电动机轴承温度',max: etime,dataType: 'real_data',data: resList['0:3:2:1']})
          this.drawChart1({container: 'real-chart-ddjzczd',unit: 'μm',name: '电动机轴承振动',max: etime,dataType: 'real_data',data: resList['0:3:2:6']})
          this.drawChart1({container: 'real-chart-zdqdydy',unit: 'V',name: '制动器电源电压',max: etime,dataType: 'real_data',data: resList['0:4:0:5']})
          this.drawChart1({container: 'real-chart-zdqdydl',unit: 'A',name: '制动器电源电流',max: etime,dataType: 'real_data',data: resList['0:4:0:4']})
          this.drawChart1({container: 'real-chart-zdqxqwd',unit: '℃',name: '制动器线圈温度',max: etime,dataType: 'real_data',data: resList['0:4:1:1']})
          this.drawChart1({container: 'real-chart-zdqzwwd',unit: '℃',name: '制动器闸瓦温度',max: etime,dataType: 'real_data',data: resList['0:4:2:1']})
          this.drawChart1({container: 'real-chart-xsqsd',unit: 'm/s',name: '限速器速度',max: etime,dataType: 'real_data',data: resList['0:5:0:7']})
          this.drawChart1({container: 'real-chart-xsqqs',unit: 'rpm',name: '限速器圈数',max: etime,dataType: 'real_data',data: resList['0:5:0:8']})
          this.drawChart1({container: 'real-chart-jdzhkzqdy',unit: 'V',name: '轿顶载荷控制器电压',max: etime,dataType: 'real_data',data: resList['1:0:3:5']})
          this.drawChart1({container: 'real-chart-jdjxkgdy',unit: 'V',name: '轿顶检修开关电压',max: etime,dataType: 'real_data',data: resList['1:0:1:5']})
          this.drawChart1({container: 'real-chart-jdmjmddy',unit: 'V',name: '轿顶门机马达电压',max: etime,dataType: 'real_data',data: resList['1:0:2:5']})
          this.drawChart1({container: 'real-chart-jdmjmddl',unit: 'A',name: '轿顶门机马达电流',max: etime,dataType: 'real_data',data: resList['1:0:2:4']})
          this.drawChart1({container: 'real-chart-jxwz',unit: 'F',name: '轿厢位置',max: etime,dataType: 'floor',data: resList['1:2:0:9']})
          this.drawChart1({container: 'real-chart-jxxtzd',unit: 'μm',name: '轿厢箱体振动',max: etime,dataType: 'real_data',data: resList['1:2:1:6']})
          this.drawChart1({container: 'real-chart-jddgzd',unit: 'μm',name: '井道导轨振动',max: etime,dataType: 'real_data',data: resList['2:1:1:6']})
          this.drawChart1({container: 'real-chart-jdcmkh',unit: '',name: '井道层门开合',max: etime,dataType: 'real_data',data: resList['2:1:0:10']})
        }, 300)
       
        // 给实时数据赋值
        this.jfwdVal = resList['0:0:0:1'] ? resList['0:0:0:1'][0].real_data : this.jfwdVal
        this.jfsdVal = resList['0:0:0:2'] ? resList['0:0:0:2'][0].real_data : this.jfsdVal
        this.jffsVal = resList['0:0:0:3'] ? resList['0:0:0:3'][0].real_data : this.jffsVal
        this.jdwdVal = resList['2:0:0:1'] ? resList['2:0:0:1'][0].real_data : this.jdwdVal
        this.jdsdVal = resList['2:0:0:2'] ? resList['2:0:0:2'][0].real_data : this.jdsdVal
        this.jfdydyVal = resList['0:1:0:5'] ? resList['0:1:0:5'][0].real_data : this.jfdydyVal
        this.jfdydlVal = resList['0:1:0:4'] ? resList['0:1:0:4'][0].real_data : this.jfdydlVal
        this.msaqhldyVal = resList['0:2:1:5'] ? resList['0:2:1:5'][0].real_data : this.msaqhldyVal
        this.msaqhldlVal = resList['0:2:1:4'] ? resList['0:2:1:4'][0].real_data : this.msaqhldlVal
        this.aqkgmldyVal = resList['0:2:2:5'] ? resList['0:2:2:5'][0].real_data : this.aqkgmldyVal
        this.jxkgdyVal = resList['0:2:3:5'] ? resList['0:2:3:5'][0].real_data : this.jxkgdyVal
        this.jskgdysVal = resList['0:2:4:5'] ? resList['0:2:4:5'][0].real_data : this.jskgdysVal
        this.jskgdyxVal = resList['0:2:5:5'] ? resList['0:2:5:5'][0].real_data : this.jskgdyxVal
        this.qpjskgdysVal = resList['0:2:6:5'] ? resList['0:2:6:5'][0].real_data : this.qpjskgdysVal
        this.pcgyqdyVal = resList['0:2:8:5'] ? resList['0:2:8:5'][0].real_data : this.pcgyqdyVal
        this.ddjdydyVal = resList['0:3:0:5'] ? resList['0:3:0:5'][0].real_data : this.ddjdydyVal
        this.ddjdydlVal = resList['0:3:0:4'] ? resList['0:3:0:4'][0].real_data : this.ddjdydlVal
        this.ddjwkwdVal = resList['0:3:1:1'] ? resList['0:3:1:1'][0].real_data : this.ddjwkwdVal
        this.ddjwkzdVal = resList['0:3:1:6'] ? resList['0:3:1:6'][0].real_data : this.ddjwkzdVal
        this.ddjzcwdVal = resList['0:3:2:1'] ? resList['0:3:2:1'][0].real_data : this.ddjzcwdVal
        this.ddjzczdVal = resList['0:3:2:6'] ? resList['0:3:2:6'][0].real_data : this.ddjzczdVal
        this.zdqdydyVal = resList['0:4:0:5'] ? resList['0:4:0:5'][0].real_data : this.zdqdydyVal
        this.zdqdydlVal = resList['0:4:0:4'] ? resList['0:4:0:4'][0].real_data : this.zdqdydlVal
        this.zdqxqwdVal = resList['0:4:1:1'] ? resList['0:4:1:1'][0].real_data : this.zdqxqwdVal
        this.zdqzwwdVal = resList['0:4:2:1'] ? resList['0:4:2:1'][0].real_data : this.zdqzwwdVal
        this.xsqsdVal = resList['0:5:0:7'] ? resList['0:5:0:7'][0].real_data : this.xsqsdVal
        this.xsqqsVal = resList['0:5:0:8'] ? resList['0:5:0:8'][0].real_data : this.xsqqsVal
        this.jdzhkzqdyVal = resList['1:0:3:5'] ? resList['1:0:3:5'][0].real_data : this.jdzhkzqdyVal
        this.jdjxkgdyVal = resList['1:0:1:5'] ? resList['1:0:1:5'][0].real_data : this.jdjxkgdyVal
        this.jdmjmddyVal = resList['1:0:2:5'] ? resList['1:0:2:5'][0].real_data : this.jdmjmddyVal
        this.jdmjmddlVal = resList['1:0:2:4'] ? resList['1:0:2:4'][0].real_data : this.jdmjmddlVal
        this.jxwzVal = resList['1:2:0:9'] ? resList['1:2:0:9'][0].floor : this.jxwzVal
        this.jxxtzdVal = resList['1:2:1:6'] ? resList['1:2:1:6'][0].real_data : this.jxxtzdVal
        this.jddgzdVal = resList['2:1:1:6'] ? resList['2:1:1:6'][0].real_data : this.jddgzdVal
        this.jdcmkhVal = resList['2:1:0:10'] ? resList['2:1:0:10'][0].real_data : this.jdcmkhVal
        


      })
    },

    // 图表自适应
    chartResponse() {
      const that = this
      let jfwd = that.$echarts.getInstanceByDom(document.getElementById("real-chart-jfwd"));

      setTimeout(() => {
        window.addEventListener("resize", function() {
          jfwd.resize();
        })
      }, 300)
    },

    // 锚点平滑跳转
    jump(index) {
      let that = this
      let jumpArr = document.querySelectorAll('.dcc-type')
      let scrollWrap = document.getElementById('det-ca-chartCon')
  

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
            clearInterval(timer)
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
      const that = this
      let extendObj = {
        container: obj.container, // 容器id
        unit: obj.unit ? obj.unit : '', // 单位
        name: obj.name ? obj.name : '', // 名字
        max: obj.max ? obj.max : '', // 相当于eTime时间戳
        threshold: obj.threshold ? obj.threshold : '', // 报警阈值
        dataType: obj.dataType ? obj.dataType : '', // 不同的数据类型使用不同字段 "real_data":温度  "real_data":湿度  "floor":楼层  "real_data":其他
        data: obj.data && obj.data.length ? obj.data : [] // 数据，需要经过处理
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
#DetChartComp{
  @import '../../assets/stylus/xymStyle.styl'

  background: #fff


}

</style>
