<template>
  <div style="width:100%;height:100%;">
     <!-- @change="changeLabel"
      
      -->
    <el-select
      class="areaSelect"
      style="width:100%;height:100%;"
      v-model="selectedLabels"
      multiple
      :popper-class="innerPopperClass"
      @remove-tag="removeOne"
      :filterable="filterable"
      :filter-method="innerFilterMethod"
      :reserve-keyword="reserveKeyword"
      v-bind="$attrs"
      @blur="handleBlur"
      @visible-change="visibleChange"
      @focus="handleFocus"
      @clear="handleClear"
      :allow-create="false"
    >
      <span slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </span>
      <template v-if="!isSearching">
        <el-option value="__root">
          <div class="ground" @click.stop>
            <render-list
              :only-last="onlyLast"
              :list="root.childNodes"
              :level="1"
              :active-list="activeList"
              @handle-click="handleClick"
              @handle-check="handleCheck"
              :label-key="labelKey"
              :expand-trigger="expandTrigger"
            ></render-list>
            <template v-for="item in maxLevellist"> 
              <!-- id从1开始 -->
              <div
                :class="`floor-item floor-position-left-${item.id + 1}`"
                :key="item.id"
                v-if="item.rendered"
                v-show="activeList.length >= item.id"
              >
                <render-list
                  :only-last="onlyLast"
                  :list="showData[item.id]"
                  :level="item.id + 1"
                  :active-list="activeList"
                  @handle-click="handleClick"
                  @handle-check="handleCheck"
                  :label-key="labelKey"
                  :expand-trigger="expandTrigger"
                ></render-list>
              </div>
            </template>
          </div>
        </el-option>
      </template>
      <template v-if="isSearching">
        <el-option
          v-for="item in searchResult"
          :value="item.showLabel"
          :key="getKey(item)"
        >
          <div style="width:100%;height:100%" @click.stop="selectOne(item)">
            {{item.totalLabel}}
          </div>
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
import TreeStore from './lib/Tree.js'
import renderList from './render-list.vue'
// import _ from 'lodash'
import { _findByObj } from './tool/unit'
export default {
  name: 'el-cascader-multi',
  components: {
    renderList
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    separator: {
      type: String,
      default: '/'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function
    },
    popperClass: {
      type: String,
      default: ''
    },
    reserveKeyword: {
      type: Boolean,
      default: true
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    onlyLast: {
      type: Boolean,
      default: false
    },
    isTwoDimensionValue: {
      type: Boolean,
      default: true
    },
    showLeafLabel: {
      type: Boolean,
      default: false
    },
    selectedLabels: {
      type: Array,
      default: () => [],
      twoWay: true
    },
  },
  data () {
    return {
      // selectedLabels: [], // 源代码注释
      selectedIds: [],
      selectedNodes: [],
      activeClass: 'floor-width-1',
      store: {},
      root: [],
      maxLevellist: [],
      showData: {},
      activeList: [],
      searchText: '',
      searchResult: []
    }
  },
  computed: {
    isSearching () {
      return !(this.searchText.trim() === '')
    },
    innerPopperClass () {
      return `${this.popperClass} multi-cascader ${this.isSearching ? '' : 'multi-cascader-style'} ${this.activeClass}`
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.init()
      }
    },
    value: {
      deep: true,
      handler () {
        // this.init()
        this.updateSelect(this.value, true, true)
      }
    },
    selectedNodes () {
      var util = require("util")
      // console.log("selectedNodes" + util.inspect(this.selectedNodes))
      this.$emit('change', this.selectedNodes.map(o => o[this.isTwoDimensionValue ? '_idArr' : this.valueKey]), this.selectedNodes.map(o => o['totalLabel']))
      // this.$emit('change', this.selectedNodes.map(o => o['label'])) //西长安街街道
      // this.$emit('change', this.selectedNodes.map(o => o['totalLabel'])) //北京市/北京市/西城区/西长安街街道
    }
  },
  methods: {
    // 下拉框出现/隐藏时触发	出现则为 true，隐藏则为 false
    visibleChange (v) {
      this.activeList = []
      this.activeClass = 'floor-width-1'
      if (!v) {
        this.searchText = ''
      }
      this.$emit('visible-change', v)
    },
    // 当 input 失去焦点时触发
    handleBlur (e) {
      this.searchText = ''
      this.$emit('blur', e)
    },
    // 当 input 获得焦点时触发
    handleFocus (e) {
      this.$emit('focus', e)
    },
    // 清空
    handleClear () {
      this.selectedNodes.forEach(node => {
        node.check(false)
      })
      this.$emit('input', [])
      this.$emit('clear')
    },
    // 选择搜索结果其中一项
    selectOneselectOne (item) {
      item.checked = !item.checked
      this.handleCheck(item)
    },
    // 注释掉了
    // changeLabel (v) {
    //   alert(1)
    //   this.store.nodeList.forEach(node => {
    //     node.check(v.includes(node.showLabel))
    //   })
    // },
    // 搜索
    innerFilterMethod (v) {
      this.searchText = v
      let tempResult = this.store.nodeList
      if (v.trim() !== '') {
        this.activeClass = ''
        if (typeof this.filterMethod === 'function') {
          this.searchResult = this.filterMethod(tempResult, v)
        } else {
          tempResult = tempResult.filter(o => o.isLeaf)
          tempResult = tempResult.filter(o => o.showLabel.includes(v))
          this.searchResult = tempResult
        }
      } else {
        this.activeClass = 'floor-width-1'
      }
    },
    getKey () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0
        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    // 点击某一行
    handleClick (node, levelIndex, level) {
      if (this.maxLevellist[level - 1]) {
        this.maxLevellist[level - 1].rendered = true
      }
      this.activeClass = `floor-width-${node.isLeaf ? level : level + 1}`
      let tempList = [...this.activeList]
      if (level < tempList.length) {
        tempList.splice(level)
      }
      tempList[level - 1] = node.id
      this.showData[level] = node.childNodes
      this.activeList = tempList
    },
    // 点击多选框
    handleCheck (node) {
      var util = require("util")
      // console.log("n1111111ode==" + node.childNodes.length)
      node.check(node.checked)
      this.selectedIds = this.store.selectedIds
      // console.log("selectedIds==" + this.selectedIds)
      this.updateSelect(this.store.selectedIds)
      // this.$emit('change', this.selectedNodes.map(o => o[this.isTwoDimensionValue ? '_idArr' : this.valueKey]))
      this.$emit('input', this.selectedNodes.map(o => o[this.isTwoDimensionValue ? '_idArr' : this.valueKey]))
    },
    // 多选模式下移除tag时触发 v:移除的tag值
    removeOne (v) {
      console.log("v==" + v)
      let targetNode = this.selectedNodes.find(o => o.showLabel === v) || {}
      targetNode.checked = false
      this.handleCheck(targetNode)
      this.$emit('remove-tag', v)
    },
    // 更新选择
    updateSelect (data = [], needCheckNode = false, setValue = false) {
      // console.log("================================")
      // console.log("needCheckNode==" + needCheckNode)
      var util = require("util")
      let tempSelectedNodes = []
      let tempSelectedLabels = []
      let tempSelectedIds = []
      // console.log("this.store===" + this.store.nodeList)
      this.store.nodeList.forEach(node => {
        node.checked && node.check(false)
      })
      // console.log("data===" + data.map(o => o['_idArr']))
      // this.selectedNodes.map(o => o['_idArr'])

      data.forEach(o => {
        let targetNode
        if (setValue) {
          targetNode = _findByObj(this.store.nodeList, { [this.isTwoDimensionValue ? '_idArr' : this.valueKey]: o }) || {}
          // targetNode = _.find(this.store.nodeList, { [this.isTwoDimensionValue ? '_idArr' : this.valueKey]: o }) || {}
          tempSelectedIds.push(targetNode.id)
        } else {
          targetNode = this.store.nodesMap[o]
          tempSelectedIds.push(o)
        }

        // console.log("标签---" + util.inspect(targetNode.showLabel))
        
        if (targetNode) {
          // console.log(122)
          needCheckNode && targetNode.check(true)
          tempSelectedNodes.push(targetNode)
          // console.log("tempSelectedNodes：：" + tempSelectedNodes[0]._idArr)
          tempSelectedLabels.push(targetNode.showLabel)
          // console.log("showLabel::" + JSON.stringify(targetNode.parent))
        }
      })
      this.selectedNodes = tempSelectedNodes
      // this.selectedLabels = tempSelectedLabels //源代码注释
      this.selectedIds = tempSelectedIds
      // console.log("selectedNodes:::" + util.inspect(this.selectedNodes))
      // console.log("selectedLabels:::" + JSON.stringify(this.selectedLabels))
    },
    init () {
      var util = require("util")
      this.store = new TreeStore({
        data: this.data,
        separator: this.separator,
        valueKey: this.valueKey,
        labelKey: this.labelKey,
        childrenKey: this.childrenKey,
        showLeafLabel: this.showLeafLabel
      })
      this.root = this.store.root
      // console.log("root::" + util.inspect(this.root))
      // 除了第一级，下面还有几级
      this.maxLevellist = Array.from({ length: this.store.maxLevel - 1 }, (v, i) => {
        this.showData[i + 1] = []
        return {
          id: i + 1,
          rendered: false
        }
      })
      this.maxLevellist.forEach(item =>{
        // console.log("this.maxLevellist===" + JSON.stringify(item))
      })
      this.updateSelect(this.value, true, true)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">
.el-select-dropdown.el-popper.is-multiple.multi-cascader {
  .el-select-dropdown__item.selected::after {
    top: 0;
  }
}
.el-select-dropdown.el-popper.is-multiple.multi-cascader-style{
  min-width: 160px!important;
  .el-select-dropdown__list {
    padding: 0;
    position: relative;
  }
  .el-select-dropdown__item {
    padding: 0;
    height: 216px;
    &.hover {
      background-color: #fff;
    }
  }
  .li-style {
    height: 34px;
    padding: 0px 20px;
    box-sizing: border-box;
    list-style: none;
    width: 160px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 34px;
    // &:hover{
    //   background-color:  rgba(66,114,255,0.10);
    // }
    &.selected {
      color: #4272FF;
    }
    &.active-li {
      // background-color:  rgba(66,114,255,0.10);
      color: #4272FF;
    }
    .li-label-style{
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-right: 15px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .li-label-icon {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(0, -50%);
      }
      .el-checkbox {
        margin-right: 10px;
      }
    }
  }
  .ground {
    width: 100%;
    height: 204px;
    padding: 6px 0;
  }
  .floor-item {
    width: 160px;
    padding: 6px 0;
    border-left: 1px solid #eee;
    position: absolute;
    top: 0;
    height: 204px;
    overflow-y: auto;
    overflow-x: hidden;
  }

}
.multi-cascader-style {
  p {
    margin: 0;
    padding: 0;
  }
  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
.areaSelect{
  .el-tag__close.el-icon-close{
    display: none!important;
  }
  .el-tag{
    font-size: 14px!important;
    max-width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  // .el-select__tags-text{
  //   text-overflow:ellipsis;表示文本超出用省略号代替
  // }
}

$width: 160px;
@each $i in [1,2,3,4,5,6,7,8,9,10] {
  .multi-cascader-style.floor-width-#{$i} {
    width: $i * $width;
  }
  .multi-cascader-style .floor-position-left-#{$i} {
    left: ($i - 1) * $width;
  }
}
</style>
