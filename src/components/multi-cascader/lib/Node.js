import _ from 'lodash'
import { _uniq } from '../tool/unit'
let nodeIdSeed = 0
export default class Node {
  constructor (options) {
    this.id = nodeIdSeed++
    this.data = null
    this.parent = null
    this.isLeaf = true
    this.checked = false
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option]
      }
    }
    let store = this.store
    this[store.valueKey] = options[store.valueKey] || null
    this.level = 0
    this.childNodes = []
    if (this.parent) {
      this.level = this.parent.level + 1
      store.maxLevel = Math.max(store.maxLevel, this.level)
      this.totalLabel = this.parent.totalLabel
        ? `${this.parent.totalLabel}${this.store.separator}${this[store.labelKey]}`
        : this[store.labelKey]
      this.showLabel = this.store.showLeafLabel ? this.label : this.totalLabel
    }
    this._idArr = this.parent && this.parent[store.valueKey]
      ? [...this.parent._idArr, this[store.valueKey]]
      : [this[store.valueKey]]
    this.setData(this.data)
  }

  setData (data) {
    let store = this.store
    this.data = data
    this.childNodes = []
    let children
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data
    } else {
      children = this.hasOwnProperty(store.childrenKey) ? this[store.childrenKey] : []
      this.isLeaf = children.length === 0
      this.store.nodesMap[this.id] = this
      this.store.nodeList.push(this)
      this[store.valueKey] = this[store.valueKey]
    }
    children.forEach(child => {
      this.insertChild(child)
    })
  }

  insertChild (child) {
    child = Object.assign(child, {
      parent: this,
      store: this.store
    })
    child = new Node(child)
    this.childNodes.push(child)
  }

  check (checked) {
    // alert("bbb")
    if (this.disabled) { return false }
    this.checked = checked
    this.updateSelectIds(checked, this.id)
    // 如果有子集就全勾选上
    if (this.childNodes) {
      this.childNodes.forEach(child => {
        child.check(checked)
      })
    }
   
    // console.log("this.parent--------------" + this.parent)
    if (this.parent) {
      this.parent.checkedAll()
    }
  }

  checkedAll () {
    
    if (this.childNodes) {
      // 检测数组所有元素是否都符合指定条件
      this.checked = this.childNodes.every(child => child.checked)
      // console.log("this.id---======;;;;;;;;;;;;;;;;;" + this.id)
      this.updateSelectIds(this.checked, this.id)
    }
    if (this.parent) {
      this.parent.checkedAll()
    }
  }

  updateSelectIds (checked, id) {
    let store = this.store
    if (checked) {
      if (this.isLeaf) {
        let tempList = [...store.selectedIds]
        tempList.push(id)
        tempList = _uniq(tempList)
        store.selectedIds = tempList
      }
    } else {
      let tempList = [...store.selectedIds]
      // console.log("tempListtempListtempListtempList" + JSON.stringify(tempList))
      // this.maxLevellist.forEach(item =>{
      //   console.log("this.maxLevellist===" + JSON.stringify(item))
      // })
      // console.log("tempListtempListtempListtempList" + id)
      let index = tempList.findIndex(o => o === id) // 返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
      if (index >= 0) {
        tempList.splice(index, 1)
        // alert(111)
      }
        tempList = _uniq(tempList) //去重
        store.selectedIds = tempList
    }
  }
}
