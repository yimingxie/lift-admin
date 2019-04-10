import * as types from '../mutation-types'

export const getAllPlugin = ({ dispatch }, plugin) => {
  dispatch(types.RECEIVE_PLUGINS, plugin)
}

export const createPlugin = ({ dispatch }, plugin) => {
  dispatch(types.CREATE_PLUGIN, plugin)
}

export const removePlugin = ({ dispatch }, plugin) => {
  dispatch(types.REMOVE_PLUGIN, plugin)
}

export const updatePlugin = ({ dispatch }, plugin) => {
  dispatch(types.UPDATE_PLUGIN, plugin)
}
