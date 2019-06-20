import {
  RECEIVE_MEMBER,
  SWITCH_LAYOUT,
} from '../mutation-types'
import api from '../../api'

// 状态初始化
var state = {
  layout: 'auth',     // 当前页面布局 ['auth'|'admin']
  currentMember: {},  // 当前成员信息
}

const getters = {   //实时监听state值的变化(最新状态)
  isShow(state) {  //方法名随意,主要是来承载变化的layout的值
     return state.layout
  },
  getChangedNum(){  //方法名随意,主要是用来承载变化的currentMember的值
     return state.currentMember
  }
};

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

}

// actions
const actions = {
  // // 设置当前布局
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
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
