<template>
<div class="main-wrap" id="example">

  <div class="row" >
    <div class="panel">
      <el-cascader :filterable="true" class="regionPicker" :options="options" v-model="form.selectedOptions" @change="handleChange" :show-all-levels="false"></el-cascader>
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
      for(var y in pcas){
        // this.options[y].code = pcas[y].code
        var row = {}
        row.value = pcas[y].code
        row.label = pcas[y].name
        row.children = []
        this.options.push(row)
        // this.options[y].name = pcas[y].name
        for(var z in pcas[y].children){
          var child = {}
          child.value = pcas[y].children[z].code;
          child.label = pcas[y].children[z].name;
          // console.log('abc' + JSON.stringify(child))
          this.options[y].children.push(child);
          // this.options[y].children[z].name = pcas[y].children[z].name
          // this.options[y].children[z].code = pcas[y].children[z].code
          // console.log('abc' + JSON.stringify(this.options))
          // console.log('aaa' + JSON.stringify(this.options[y].children[z]))
          // console.log('zzz---' + z);
        }
      }
      // 区域选择 省-市数据 end 
    },
    methods: {
      // 切换地区选择器
      handleChange(value){
        console.log("选择区域代码："+ value)
        this.form.city = this.myAddressCity(value[0])
        this.form.area = this.myAddressarea(value[1])
        // console.log('ddddd=====' + (this.dynamicTags.length +1))
        // this.form.selectedOptions = []
        var len = this.dynamicTags.length
        var flag = true
        if(len === 0){
          this.dynamicTags.push(this.form.area)
        }else{
          for(var i = 0  ; i < len  ; i++){
            console.log('----------------------=====')
            console.log('ddddd=====' + (this.dynamicTags[i]))
            console.log('ddddd=====' + (this.form.area))
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

      myAddressCity:function(value){
        for(var y in pcas){
          if(pcas[y].code == value){
            return value = pcas[y].name
          }
        }
      },
      myAddressarea:function(value){
        for(var y in pcas){
          for(var z in pcas[y].children){
            if(pcas[y].children[z].code == value && value!=undefined){
              return value = pcas[y].children[z].name;
            }
          }
        }
      },
      myAddressMinarea:function(value){
        for(var y in pcas){
          for(var z in pcas[y].children){
            for(var i in pcas[y].children[z].children){
              if(pcas[y].children[z].children[i].code == value && value!=undefined){
                return value = pcas[y].children[z].children[i].name
              }
            }
          }
        }
      },
    }
  }
</script>
<style lang="stylus">
// #example

</style>