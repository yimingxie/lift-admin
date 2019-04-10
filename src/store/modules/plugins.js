import {
  RECEIVE_PLUGINS,
  CREATE_PLUGIN,
  REMOVE_PLUGIN,
  UPDATE_PLUGIN
} from '../mutation-types'
import _ from 'lodash'

// 状态初始化
var state = {
  all: []
}

// 状态变化
const mutations = {
  [RECEIVE_PLUGINS] (state, plugins) {
    state.all = plugins
  },

  [CREATE_PLUGIN] (state, plugin) {
    state.all.push(plugin)
  },

  [REMOVE_PLUGIN] (state, plugin) {
    var plugins = state.all.concat()
    _.remove(plugins, (item) => {
      return item.id === plugin.id
    })
    state.all = plugins
  },

  [UPDATE_PLUGIN] (state, plugin) {
    var plugins = state.all.concat()
    state.all = plugins.map((item) => {
      if (item.id === plugin.id) {
        return plugin
      }
      return item
    })
  }
}

// actions
const actions = {
  getAllPlugin ({ commit }, plugin) {
    commit(types.RECEIVE_PLUGINS, plugin)
  },
  
  createPlugin ({ commit }, plugin) {
    commit(types.CREATE_PLUGIN, plugin)
  },
  
  removePlugin ({ commit }, plugin) {
    commit(types.REMOVE_PLUGIN, plugin)
  },
  
  updatePlugin ({ commit }, plugin) {
    commit(types.UPDATE_PLUGIN, plugin)
  }
}

export default {
  state,
  mutations,
  actions
}
