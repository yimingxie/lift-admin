<template>
  <div id="Monitor">
    <!-- 检测项组件
     -->
    <div>
      <el-cascader ref="moniCascader" placeholder="请选择" :options="moniObjOptions" v-model="selectedMoniObjOptions" clearable size="small" @change="moniObjChange" style="width: 100%;"></el-cascader>
    </div>
  </div>
</template>

<script>
import codec from '../utils/codec_v2.json'

export default {
  props: ['parentMoniObj'],
  data() {
    return {
      moniObjOptions: [],
      selectedMoniObjOptions: this.parentMoniObj,
    }
  },
  mounted() {
    
    // 加载检测项下拉
    this.getMoniObjOptions()

  },
  methods: {

    // 加载检测项下拉
    getMoniObjOptions() {
      // 一级循环，加载省市下拉选项
      codec.contents.forEach((item, i) => {
        let obj = {
          value: item.id,
          label: item.cn_name,
          children: []
        }

        if (item.subs) {
          // 二级循环
          item.subs.forEach((secondItem, secondI) => {
            let secondObj = {
              value: secondItem.id,
              label: secondItem.cn_name,
            }

            if (secondItem.subs) {
              secondObj.children = []

              // 三级循环
              secondItem.subs.forEach((thirdItem, thirdI) => {
                let thirdObj = {
                  value: thirdItem.id,
                  label: thirdItem.cn_name,
                }

                // if (thirdItem.children) {
                //   thirdObj.children = []

                //   // 四级循环
                //   thirdItem.children.forEach((fourthItem, fourthI) => {
                //     let fourthObj = {
                //       value: fourthItem.code,
                //       label: fourthItem.name,
                //     }
                //     this.newFormat[fourthItem.code] = fourthItem.name

                //     thirdObj.children.push(fourthObj)
                //   })
                // }

                secondObj.children.push(thirdObj)

              })

            }
            obj.children.push(secondObj)
          })
        }
        this.moniObjOptions.push(obj)

      })
    },

    // 检测项选中值
    moniObjChange(monitorObj) {
      // this.ruleForm.monitorObj = monitorObj.join(':')
      console.log('选中项', monitorObj)
      this.$emit('selectedMoniObj', monitorObj)
    },

  },
  components: {

  },
  watch: {
    parentMoniObj: {
      handler(newVal) {
        this.selectedMoniObjOptions = newVal
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>



</style>
