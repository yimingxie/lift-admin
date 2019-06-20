<template>
  <div style="padding-bottom: 600px;">
    <h1>电梯列表页</h1>
    <div class="lift-list">
      <el-form :model="ruleForm" :rules="rules">
        <div class="el-input-box">
          <el-form-item label="" prop="name">
            <el-input v-model="ruleForm.name" placeholder="用户名"></el-input>
          </el-form-item>
        </div>
        
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="" prop="age">
          <el-input type="text" v-model="ruleForm.age" placeholder="年龄"></el-input>
        </el-form-item>

        <el-form-item label="" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" placeholder="手机"></el-input>
        </el-form-item>

        <el-switch v-model="value" :width="width" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form>

      <el-table :data="tableData" border @select="selectSingle" @select-all="selectAll" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column sortable prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>


      <div style="margin-top: 20px;">
        <el-cascader :options="options" change-on-select v-model="selectedOptions" @change="cascaderChange"></el-cascader>
      </div>

      <div style="margin-top: 20px;">
        <el-button type="button" @click="dialogVisible = true">点击打开 Dialog</el-button>
      </div>

      <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" @close="tableClose">
        <span>表格</span>
        <div>
          确定删除吗？
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    

    </div>

    

  </div>
</template>

<script>
import pcas from '../../utils/citySelector/pcas-code.json'
import api from '../../api'

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入年龄'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      let regFormat = /^1[34578]\d{9}$/
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      if (!(regFormat.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      
      input: '',
      value: true,
      width: 100,

      // 弹框属性
      dialogVisible: false,


      // 表单检验属性
      ruleForm: {
        name: '',
        password: '',
        age: '',
        phone: ''
      },

      // 表单校验规则
      rules: {
        name: [
          {required: true, message: '提示：请输入用户名', trigger: 'blur'},
          {min: 2, max: 6, message: '提示：长度在2-6个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '提示：请输入密码', trigger: 'blur'},
        ],
        age: [
          {validator: checkAge, trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      },

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],

      // 级联数据
      options: [],
      selectedOptions: []
    }
  },
  mounted() {
    this.$store.commit('SWITCH_LAYOUT', 'admin')

    api.detail.getD9().then(res => {
      console.log(res)
    })


    // 一级循环
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
    selectSingle(arr, row) {
      // console.log(arr, row)
    },
    selectAll(arr) {
      console.log(arr)
    },
    cascaderChange(value) {
      console.log(value)

    },
    open() {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
    },
    tableClose() {
      alert(1)
    }

  },
  components: {

  }
}
</script>

<style scoped>
.lift-list{
  padding-left: 250px;
  padding-top: 100px;
  padding-right: 60px;
}
.el-input-box{
  width: 80%;
}

</style>
