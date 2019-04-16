// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router-config'
import vuex from 'vuex'
import store from './store/index'
import i18nobject from 'vue-i18n'
import VueForm from 'vue-form'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import {globalMixins} from './utils/mixins'
// Vue.use(globalMixins)
Vue.prototype.$mixins = globalMixins

Vue.use(ElementUI)
// 多语言配置文件
import locales from './consts/locales/index'
// 过滤器
import * as filters from './filters/filters'
// 注册全局过滤器
// ------------------------------
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
// 加载多语言插件
// 手动切换语言设置 `Vue.config.lang = 'en-us'`
// 详见：https://github.com/kazupon/vue-i18n
Vue.use(i18nobject)
// Vue.use(i18n, {
//   i18n: function(path, options) {
//     let value = i18n.t(path, options)
//     if (value !== null && value !== undefined) {
//       return value
//     }
//     return ''
//   }
// })
Vue.config.lang = 'zh-cn'
const i18n = new i18nobject({
  locale: 'zh-cn',
  messages: locales
})
Vue.use(vuex)
// 加载表单验证插件
// 详见：https://github.com/fergaldoyle/vue-form
Vue.use(VueForm)

// 全局挂在echarts
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  i18n,
  components: { App },
  template: '<App/>'
})
