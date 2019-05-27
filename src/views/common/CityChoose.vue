<template>
  <!-- 区域选择组件 -->
  <div class="city-box">
    <el-cascader placeholder="请选择区域" :options="options" v-model="selectedOptions" size="mini" @change="handleChange"></el-cascader>
  </div>
</template>

<script>
import pcas from '../../utils/citySelector/pcas-code.json'

export default {
  data() {
    return {
      options: [],
      selectedOptions: [],

    }
  },
  mounted() {
    // 一级循环，加载省市下拉选项
    pcas.forEach((item, i) => {
      let obj = {
        value: item.code,
        label: item.name,
        children: []
      }
      if (item.children) {
        // 二级循环
        item.children.forEach((secondItem, secondI) => {
          let secondObj = {
            value: secondItem.code,
            label: secondItem.name,
          }
          if (secondItem.children) {
            secondObj.children = []

            // 三级循环
            secondItem.children.forEach((thirdItem, thirdI) => {
              let thirdObj = {
                value: thirdItem.code,
                label: thirdItem.name,
              }

              if (thirdItem.children) {
                thirdObj.children = []

                // 四级循环
                thirdItem.children.forEach((fourthItem, fourthI) => {
                  let fourthObj = {
                    value: fourthItem.code,
                    label: fourthItem.name,
                  }
                  thirdObj.children.push(fourthObj)
                })
              }
              secondObj.children.push(thirdObj)

            })

          }
          obj.children.push(secondObj)
        })
      }
      this.options.push(obj)

    })

  },
  methods: {
    // 传给父组件
    handleChange(val) {
      this.$emit('childVal', val)
    }


  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
