import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/logger'
import products from './modules/products'
import system from './modules/system'
import plugins from './modules/plugins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    products,
    system,
    plugins
  },
  strict: debug,
  // middlewares: debug ? [createLogger()] : []
})
