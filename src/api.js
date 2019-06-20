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


import corp from './api/corp'
import detail from './api/detail'
import accountApi from './api/accountApi'
import roleApi from './api/roleApi'
import managerApi from './api/managerApi'
import moduleApi from './api/moduleApi'
import log from './api/login'
import corpApi from './api/corpApi'

export default {
  corp,
  detail,
  accountApi,
  roleApi,
  managerApi,
  moduleApi,
  log,
  corpApi
}
