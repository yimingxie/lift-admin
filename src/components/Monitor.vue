<template>
  <div id="Monitor">
    <div class="dia-citem clearfix">
      <div class="dia-citem-label">检测项：</div>
      <div class="dia-citem-ib">
        <el-form-item prop="regCode">
          <!-- <el-input v-model="ruleForm.regCode" size="small" placeholder="电梯注册码"></el-input> -->
          <el-cascader ref="moniCascader" placeholder="请选择" :options="options" v-model="selectedOptions" size="small" @change="handleChange" style="width: 100%;"></el-cascader>
        </el-form-item>
      </div>
    </div>
    <div class="dia-citem clearfix" style="padding-bottom: 10px;">
      <div class="dia-citem-label" style="line-height: 22px;">检测内容：</div>
      <div class="dia-citem-ib">
        <el-checkbox-group v-model="checkedMoniObj" @change="checkboxChange">
          <el-checkbox v-for="item in moniObjList" :label="item.id" :key="item.id">{{item.cn_name}}</el-checkbox>
        </el-checkbox-group>
      </div>


    </div>

  </div>
</template>

<script>
import codec from '../utils/codec_v2.json'

export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      checked: true,
      moniObjList: [
        // {"id": 0, "name": "temperature", "cn_name": "温度", "content": "机房温度", "unit": "℃"},
      ],
      checkedMoniObj: [],
      ruleForm: {
        monitorObj: '',
        monitorVal: '',
      },
      rules: {
      },

    }
  },
  mounted() {

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
      this.options.push(obj)

    })

  },
  methods: {
    // 选中检测项，渲染监测内容
    handleChange(arr) {
      // arr[0]
      let firstIndex = arr[0]
      let secondIndex = arr[1]
      let thirdIndex = arr[2]
      let lastSubs = codec.contents[firstIndex].subs[secondIndex].subs[thirdIndex].subs
      this.moniObjList = lastSubs

      console.log('最后一级', lastSubs)
    },

    // 监测内容
    checkboxChange(val) {
      console.log(val)
    }

  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>

#Monitor{
  .dia-citem{
  // padding: 8px 0;
  }
  .dia-citem-ib{
    float left;
    width 80%;
  }
  .dia-citem-label{
    float left;
    width 20%;
    box-sizing: border-box;
    line-height 40px;
    padding-right: 20px;
    font-size: 14px;
    color: #34414C;
    text-align: right;
    white-space: nowrap;
    overflow hidden;
    text-overflow: ellipsis;
  }
  
}

</style>
