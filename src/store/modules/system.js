import {
  RECEIVE_MEMBER,
  SWITCH_LAYOUT,
  SET_LOADING_STATUS,
  RECEIVE_ERROR,
  REMOVE_ERROR,
  ADD_NOTICE,
  HIDE_ERROR,
  REMOVE_NOTICES
} from '../mutation-types'
import Vue from 'vue'
import locales from '../../consts/locales/index'
import config from '../../consts/config'
import api from '../../api'

// 状态初始化
var state = {
  currentMember: {},  // 当前成员信息
  layout: 'auth',     // 当前页面布局 ['auth'|'admin']
  loading: false,     // 是否正在加载
  error: {},          // 错误信息
  isShowError: false, // 是否显示错误信息模态窗口
  after: null,        // 后续执行函数
  notices: [],        // 通知信息
  plugins: []         // 插件列表
}

// 状态变化
const mutations = {
  // 接收到帐户成员信息
  [RECEIVE_MEMBER] (state, member) {
    state.currentMember = member
  },

  // 切换布局
  [SWITCH_LAYOUT] (state, layout) {
    state.layout = layout
  },

  [SET_LOADING_STATUS] (state, status) {
    state.loading = status
  },

  // 接收到错误信息
  [RECEIVE_ERROR] (state, error, callback) {
    state.error = error
    state.isShowError = true
    if (typeof callback === 'function') {
      state.after = callback
    } else {
      state.after = null
    }
  },

  // 移除错误信息
  [REMOVE_ERROR] (state) {
    state.error = {}
    state.after && state.after()
  },

  [HIDE_ERROR] (state) {
    state.isShowError = false
  },

  // 加入通知信息
  [ADD_NOTICE] (state, notice) {
    if (!state.notices.length || state.notices[state.notices.length - 1].content !== notice.content) {
      state.notices.push(notice)
    }
  },

  // 移除通知信息
  [REMOVE_NOTICES] (state) {
    state.notices.shift()
  }
}

// actions
const actions = {
    // 设置当前布局
  setLayout({ commit }, layout) {
    commit(SWITCH_LAYOUT, layout)
  },

  // 获取当前帐户成员
  getCurrentMember({ commit }, memberId, vm){
    api.corp.getMember(memberId).then((res) => {
      commit(RECEIVE_MEMBER, res.data)
      // 将用户权限加入localstorage
      window.localStorage.setItem('role', res.data.role)
    }).catch((res) => {
      if (typeof res.data !== 'undefined' && typeof res.data.error !== 'undefined') {
        if (res.data.error.code === 4031003) {
          vm.$router.push('/')
        }
      }
    })
  },

  // 开始加载资源
  setLoadingStatus({ commit }, status){
    commit(SET_LOADING_STATUS, status)
  },

  // 弹出错误提示
  showError({ commit }, error, fn){
    let err = {}
    err.code = error.code
    err.msg = locales[Vue.config.lang].errors[error.code]
    commit(RECEIVE_ERROR, err, fn)
  },

  // 关闭错误提示
  removeError({ commit }){
    commit(REMOVE_ERROR)
  },

  // 移除错误提示
  hideError({ commit }){
    commit(HIDE_ERROR)
  },

  // 显示通知
  showNotice({ commit }, notice){
    commit(ADD_NOTICE, notice)
    window.setTimeout(() => {
      commit(REMOVE_NOTICES)
    }, config.notice.duration)
  }

}

export default {
  state,
  mutations,
  actions
}
