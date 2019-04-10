import * as types from '../mutation-types'

export const getAllProducts = ({ dispatch }, products) => {
  dispatch(types.RECEIVE_PRODUCTS, products)
}

export const createProduct = ({ dispatch }, product) => {
  dispatch(types.CREATE_PRODUCT, product)
}

export const removeProduct = ({ dispatch }, product) => {
  dispatch(types.REMOVE_PRODUCT, product)
}

export const updateProduct = ({ dispatch }, product) => {
  dispatch(types.UPDATE_PRODUCT, product)
}

export const setCurrProduct = ({ dispatch }, product) => {
  dispatch(types.SET_CURRENT_PRODUCT, product)
}
