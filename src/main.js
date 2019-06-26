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
// import globalMixins from './utils/mixins'
import tab from "./components/tab";

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { DatePicker } from 'ant-design-vue'
// import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/lib/datepicker/style/css'
// Vue.use(globalMixins)

// 引入自定义组件。index.js是组件的默认入口
// import Loading from './components/loading/loading'
// 引入自定义组件。index.js是组件的默认入口
// import message from './components/message/message'
// Vue.prototype.$message = message;
// Vue.use(Loading);/
Vue.use(DatePicker)

Vue.component('tab', tab)

// Vue.prototype.$moment = moment;//赋值使用
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

// Vue.prototype.$mixins = globalMixins

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
