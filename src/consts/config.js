/**
 * 项目基本配置
 * @type {Object}
 */
// let protocol = process.env.NODE_ENV !== 'production' ? 'https:' : window.location.protocol
let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol

// 测试服务器地址
// const DEFAULT_API_SERVER = 'http://api-test.GiDomino.cn:8887'
// 测试图表
// const DEFAULT_API_SERVER = 'http://120.26.244.72:8887'
// 海曼
// const DEFAULT_API_SERVER = 'http://ic.heiman.cn:8887'
// 开发者本地
// const DEFAULT_API_SERVER: 'http://localhost:8887',
// 正式地址
// const DEFAULT_API_SERVER = `${protocol}//home.topway.cn`
const DEFAULT_API_SERVER = `${protocol}//iot.gidomino.com/gi-api`
// const DEFAULT_API_SERVER = `${protocol}//192.168.0.88:8080/giapi`
// const DEFAULT_API_SERVER = `${protocol}//192.168.100.2/gi-api`

// 插件服务器地址
const PLUGIN_SERVER = 'http://plugin.GiDomino.cn'

export const API_SERVER = {
  // 默认
  default: process.env.API_SERVER || DEFAULT_API_SERVER,

  // 菜谱
  recipe: `${PLUGIN_SERVER}/39352b6f8d224064832bcec9b96958d1`,


  // 延保
  warranty: 'http://test.plugin.GiDomino.cn:3000/module/warranty'
}

export const COUNT_PER_PAGE = 10

export const DEVICE_TYPES = {
  'wificamera': 'WIFI摄像头',
  'neutral1': '单键单火开关', // ok
  'neutral2': '双键单火开关', // ok
  'magnet': '门磁', // ok
  'magnet.aq2': 'magnet 门磁', // ok
  'ht': '温湿度传感器', // ok
  '86plug': '入墙插座', // ok
  'plug': '智能插座', // ok
  'plug.aq1': 'plug 插座', // ok
  'motion': '人体红外感应', // ok
  'motion.aq2': 'motion 红外感应', // ok
  'switch': '开关', // ok
  'switch.aq2': 'switch 开关', // ok
  'rgbw_light': 'RGBW灯', // ok
  'weather': '温湿度传感器', // ok

  // 1	zigbee信号中转器	gateway.hsgw.h
  'gateway.hsgw.h': 'zigbee信号中转器',

  // 2	红外传感器	motion.hsms.h
  'motion.hsms.h': '红外传感器',

  // 3	红外传感器－欧	motion.hsms.ho
  'motion.hsms.ho': '红外传感器－欧',

  // 4	门磁传感器	magnet.hsds.h
  'magnet.hsds.h': '门磁传感器',

  // 5	门磁传感器－欧	magnet.hsds.ho
  'magnet.hsds.ho': '门磁传感器－欧',

  // 6	燃气传感器	motion.hscg.h
  'motion.hscg.h': '燃气传感器',
  // 7	烟雾传感器	motion.hssa.h
  'motion.hssa.h': '烟雾传感器',

  // 8	烟雾传感器－欧	motion.hssa.ho
  'motion.hssa.ho': '烟雾传感器－欧',

  // 9	温湿度传感器	motion.hsht.h
  'motion.hsht.h': '温湿度传感器',

  // 10	水浸传感器	motion.hswl.h
  'motion.hswl.h': '水浸传感器',

  // 11	水浸传感器－欧	motion.hswl.ho
  'motion.hswl.ho': '水浸传感器－欧',

  // 12	智能室内警笛	alarm.hswd.h
  'alarm.hswd.h': '智能室内警笛',

  // 13	10A智能计量插座	plug.hsgb10a.h
  'plug.hsgb10a.h': '10A智能计量插座',

  // 14	16A智能计量插座	plug.hsgb16a.h
  'plug.hsgb16a.h': '16A智能计量插座',

  // 15	一路照明开关	switch.sw1a.h
  'switch.sw1a.h': '一路照明开关',

  // 16	二路照明开关	switch.sw2a.h
  'switch.sw2a.h': '二路照明开关',

  // 17	三路照明开关	switch.sw3a.h
  'switch.sw3a.h': '三路照明开关',

  // 18	智能门锁	lock.hsdl.h
  'lock.hsdl.h': '智能门锁',

  // 19	智能窗帘电机	curtain.hscm.h
  'curtain.hscm.h': '智能窗帘电机',

  // 20	WIFI计量插座10A	plug.wsgb10a.h
  'plug.wsgb10a.h': 'WIFI计量插座10A',

  // 21	WIFI计量插座16A	plug.wsgb16a.h
  'plug.wsgb16a.h': 'WIFI计量插座16A',

  // 22	无线红外遥控器	rc.wsirc.h
  'rc.wsirc.h': '无线红外遥控器',

  // 23	WIFI 燃气传感器	motion.ws2cg.h
  'motion.ws2cg.h': 'WIFI 燃气传感器',

  // 24	智能网络旋转型摄像机"	camera.hs1ipc.h
  'camera.hs1ipc.h': '智能网络旋转型摄像机',

  // 25	智能网络卡片型摄像机	camera.hs2ipc.h
  'camera.hs2ipc.h': '智能网络卡片型摄像机',

  // 26	智能卡片摄像机	camera.hs3ipc.h
  'camera.hs3ipc.h': '智能卡片摄像机',

  // 27	门窗传感器	motion.hsds.h
  'motion.hsds.h': '门窗传感器',

  //  28	人体红外传感器	motionh.hsms.h
  'motionh.hsms.h': '人体红外传感器',

  // 29	燃气报警器	alarm.hscg.h
  'alarm.hscg.h': '燃气报警器',

  // 30	烟雾报警器	alarm.hssa.h
  'alarm.hssa.h': '烟雾报警器',

  // 31	水浸报警器	alarm.hswl.h
  'alarm.hswl.h': '水浸报警器'
}

export default {
  // 表格每页记录数
  pageCount: 10,

  // 验证码
  verifycode: {
    // 刷新等待间隔(单位:秒)
    duration: 90
  },

  notice: {
    // 通知存活时长，默认(2000毫秒)
    duration: 2000
  }
}
