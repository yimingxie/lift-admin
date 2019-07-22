<template>
  <div class="performanceBox">
    <!-- 级联选择器多选 -->
    <!-- <el-cascader-multi @change="change()" clearable is-two-dimension-value="false" v-model="checkList" :data="data"> </el-cascader-multi> -->
    <choiceindex clearable filterable @change="change" :is-two-dimension-value="false" v-model="checkList" :data="data"></choiceindex>

    <div class="rz-picter">
      <img :src="avatar" class="img-avatar">
      <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
    </div>

  </div>
</template>
<script>
// 引用上边创建的MultipleChoice文件夹下的index出口文件就好了。
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
import api from 'api'
let pcas = require("../../utils/citySelector/pcas-code.json")
export default {
  components: {
    choiceindex,
  },
  data() {
    return {
      data:[], // 与element级联选择器格式一致
      checkList: [],
      avatar: '',
    };
  },
  mounted(){
    var  newFormat = {}
    // 区域选择 省-市数据
    // 一级循环，加载省市下拉选项
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
      this.data.push(obj)

    })
  },
  methods: {
    change(val){
      console.log("区域码:" + this.checkList)
    },
    changeImage(e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that.avatar = this.result
      }
      console.log("file===" + JSON.stringify(file))
      api.accountApi.uploadPic({"file" : file.raw}).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          // this.getAllDepJson = res.data.data.records
          // this.totalPageSize = res.data.data.total

        } else {
          // this.getAllDepJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
    },
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss">

</style>

