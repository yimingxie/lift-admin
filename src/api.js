/**
 * API统一入口
 *
 * 调用方式：
    import api from '../api'
    api.product.get(productId).then((res) => {
      // 请求状态
      console.log(res.status)
      // 请求头信息
      console.log(res.headers())
      // 赋值
      this.$set('someData', response.data)
    }, (res) => {
      // 失败回调
    })
 */

// import sms from './api/sms'
import corp from './api/corp'
import detail from './api/detail'
import liftDevices from './api/liftDevices'
import log from './api/log'
import permission from './api/permission'
// import dataStorage from './api/data-storage'
// import device from './api/device'
// import email from './api/email'
// import firmware from './api/firmware'
// import user from './api/user'
// import statistics from './api/statistics'
// import product from './api/product'
// import empower from './api/empower'
// import dataTable from './api/data-table'
// import alert from './api/alert'
// import app from './api/app'
// // import plugin from './api/plugin'
// import upload from './api/upload'
// import diet from './api/diet'
// import dataForward from './api/data-forward'
// import snapshot from './api/snapshot'
// import warranty from './api/warranty'
// // import helpdesk from './api/helpdesk'
// import diagnosis from './api/diagnosis'
// import role from './api/role'

export default {
  // sms,
  corp,
  detail,
  liftDevices,
  log,
  permission
  // dataStorage,
  // device,
  // email,
  // firmware,
  // user,
  // statistics,
  // product,
  // empower,
  // dataTable,
  // alert,
  // app,
  // // plugin,
  // upload,
  // diet,
  // dataForward,
  // snapshot,
  // warranty,
  // // helpdesk,
  // diagnosis,
  // role
}
