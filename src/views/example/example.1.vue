<template>
<div class="main-wrap" id="example">

  <div class="row">
    <div class="panel">
      <el-cascader 
        ref="cascaderAddr"
        :filterable="true" 
        class="regionPicker" 
        :options="options" 
        change-on-select 
        v-model="form.selectedOptions" 
        @change="handleChange" 
        :show-all-levels="false">
      </el-cascader>
      <div class="tag">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
      </div>
    </div>
  </div>

  <div class="row" >
    <div class="panel">

      <div class="block">
        <span class="demonstration">默认</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

    </div>
  </div>

</div>
</template>

<script>
  // import { globalMixins } from '../../mixins'
  let pcas = require("../../utils/citySelector/pcas-code.json")
  export default {
    name: 'Settings',

    layout: 'admin',

    components: {
    },

    data () {
      return {
        value6: '',
        options: [],
        form: {
          city : '',
          area : '',
          minarea : '',
          // selectedOptions: ["44","4403"],//地区筛选数组
          selectedOptions: [],//地区筛选数组
        },
        dynamicTags: [],
      }
    },
    created() {
      
    },
    mounted() {
      // 区域选择 省-市数据
      // for(var y in pcas){
      //   var row = {}
      //   row.value = pcas[y].code
      //   row.label = pcas[y].name
      //   row.children = []
      //   this.options.push(row)
      //   for(var z in pcas[y].children){
      //     var child = {}
      //     child.value = pcas[y].children[z].code;
      //     child.label = pcas[y].children[z].name;
      //     this.options[y].children.push(child);
       
      //   }
      // }
      // 区域选择 省-市数据 end 
      var areaOptions = []
      var  newFormat = {}
      pcas.forEach((item, i) => {
        let obj = {
          value: item.code,
          label: item.name,
          children: []
        }
        newFormat[item.code] = item.name

        if (item.children) {
          // 二级循环
          item.children.forEach((secondItem, secondI) => {
            let secondObj = {
              value: secondItem.code,
              label: secondItem.name,
            }
            newFormat[secondItem.code] = secondItem.name

            if (secondItem.children) {
              secondObj.children = []

              // 三级循环
              secondItem.children.forEach((thirdItem, thirdI) => {
                let thirdObj = {
                  value: thirdItem.code,
                  label: thirdItem.name,
                }
                newFormat[thirdItem.code] = thirdItem.name


                if (thirdItem.children) {
                  thirdObj.children = []

                  // 四级循环
                  thirdItem.children.forEach((fourthItem, fourthI) => {
                    let fourthObj = {
                      value: fourthItem.code,
                      label: fourthItem.name,
                    }
                    newFormat[fourthItem.code] = fourthItem.name

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
      // 切换地区选择器
      handleChange(value){
        console.log(value, this.$refs['cascaderAddr'].currentLabels)
        var areaLable = this.$refs['cascaderAddr'].currentLabels
        this.form.selectedOptions = []
        console.log("选择区域代码："+ value)
        // this.form.city = this.myAddressCity(value[0])
        // this.form.area = this.myAddressarea(value[1])
        // console.log('ddddd=====' + (this.dynamicTags.length +1))
        // this.form.selectedOptions = []
        var len = this.dynamicTags.length
        var flag = true
        if(len === 0){
          this.dynamicTags.push(areaLable.pop())
        } else {
          // 判断是否已存在
          for(var i = 0  ; i < len  ; i++){
            // console.log('----------------------=====')
            // console.log('ddddd=====' + (this.dynamicTags[i]))
            // console.log('ddddd=====' + (this.form.area))
            if( this.dynamicTags[i] === this.form.area){
              flag = false
            }
          }
          if(flag){
            this.dynamicTags.push(this.form.area)
          }
        }
        
      },
      // 关闭标签
      handleClose(tag) {
        console.log('tag=====' + this.dynamicTags.indexOf(tag))
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
    }
  }
</script>
<style lang="stylus">
// #example

</style>