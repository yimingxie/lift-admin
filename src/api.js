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


import accountApi from './api/accountApi'
import roleApi from './api/roleApi'
import managerApi from './api/managerApi'
import moduleApi from './api/moduleApi'
import log from './api/login'
import corpApi from './api/corpApi'
import detection from './api/detection'
import lift from './api/lift'
import device from './api/device'
import mapApi from './api/mapApi'
import taskApi from './api/taskApi'

export default {
  accountApi,
  roleApi,
  managerApi,
  moduleApi,
  log,
  corpApi,
  detection,
  lift,
  device,
  mapApi,
  taskApi
}
