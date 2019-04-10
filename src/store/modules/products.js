import {
  RECEIVE_PRODUCTS,
  CREATE_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  SET_CURRENT_PRODUCT
} from '../mutation-types'
import _ from 'lodash'
// import Vue from 'vue'
// 状态初始化
var state = {
  all: [],
  curr: {}
}

// 状态变化 
const mutations = {
  [RECEIVE_PRODUCTS] (state, products) {
    state.all = products
  },

  [CREATE_PRODUCT] (state, product) {
    state.all.push(product)
  },

  [REMOVE_PRODUCT] (state, product) {
    var products = state.all.concat()
    _.remove(products, (item) => {
      return item.id === product.id
    })
    state.all = products
  },

  [UPDATE_PRODUCT] (state, product) {
    var products = state.all.concat()
    state.all = products.map((item) => {
      if (item.id === product.id) {
        return product
      }
      return item
    })
  },

  [SET_CURRENT_PRODUCT]  (state, product) {
    state.curr = product
  }
}

// actions
const actions = {
  getAllProducts({ commit }, products) {
    commit(RECEIVE_PRODUCTS, products)
  },
  
  createProduct({ commit }, product) {
    commit(CREATE_PRODUCT, product)
  },
  
  removeProduct({ commit }, product) {
    commit(REMOVE_PRODUCT, product)
  },
  
  updateProduct({ commit }, product) {
    commit(UPDATE_PRODUCT, product)
  },
  
  setCurrProduct({ commit }, product) {
    commit(SET_CURRENT_PRODUCT, product)
  }
}

export default {
  state,
  mutations,
  actions
}
