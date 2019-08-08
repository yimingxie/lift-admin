<template>
<div id="department" class="main-wrap">
  <div class="bread-nav">
    <router-link to="/staff">
      <span>员工管理</span>
    </router-link>
    <em>/</em>
    <span class="on">部门管理</span>
  </div>
  <div>
    <div class="row" >

      <div class="panel">
        <div class="title"><div class="label1">部门管理</div></div>
   
        <div class="subSelect">
    
          <!-- <el-cascader 
            filterable 
            class="regionPicker" 
            :options="regionOptions" 
            v-model="form.selectedOptions" 
            @change="handleChange" 
            :show-all-levels="false">
          </el-cascader> -->
          <div class="llct-area">
            <city-choose @childVal="selectCity"></city-choose>
          </div>
        </div>
        <div class="subBtns">
          <button class="btn blueBtn" @click="add_dialogForm">添加部门</button>
          <search-input v-model.trim="searchKey" placeholderValue="搜索部门名称">
            <span slot="btn" class="search_btn" @click="searchAccount()" @keyup.enter.native="searchAccount()"></span>
          </search-input>
        </div>
        <div class="splitBar"></div>

        <!-- 表格 Start -->
        <div style="position:relative;;display:flex;">
          &nbsp;
          <el-table :data="getAllAccountJson" style="margin-top:30px">
            <el-table-column prop="depName" label="部门">
            </el-table-column>
        
            <el-table-column label="区域-片区">
              <template slot-scope="scope">
                <span class="areaTdStyle" v-html="scope.row.areaName"></span>
              </template>
            </el-table-column>
            <el-table-column prop="staffTotal" label="员工数量">
            </el-table-column>
            <el-table-column prop="manager" label="部门负责人">
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">
                <span v-html="scope.row.createTime.substring(0,10)"></span>
              </template>
            </el-table-column>
            
          
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                2.prevent就相当于..event.preventDefault() -->
                <el-button @click.native.prevent="editAccount(scope.$index, scope.row)" type="text">编辑
                </el-button>
                <el-button style="color: #E9645D;" @click.native.prevent="deleteDepartment(scope.$index, scope.row)" type="text">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          &nbsp;
        </div>
        <!-- 表格 End -->
        
        <!-- 分页 Start -->
        <div class="pagination_block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="queryParam.offset"
            :page-sizes="[10, 20, 30]"
            :page-size="queryParam.limit"
            layout="prev, pager, next, sizes, jumper"
            :total="totalPageSize">
          </el-pagination>
        </div>
        <!-- 分页 End -->

      </div>
      
    </div>
    <!-- 添加账号  弹窗  Start -->
    <el-dialog width="662px" title="添加部门" :visible.sync="add_dialogFormVisible">
      <el-form :model="addAccountForm" :label-width="formLabelWidth">
        <el-form-item label="部门名称:" prop="name">
          <el-input v-model="addAccountForm.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="addAccountForm.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        -->
      
        <!-- <el-form-item label="部门负责人：" prop="userId" >
          <el-input v-model="addAccountForm.userId" auto-complete="off" clearable></el-input>
          <el-select v-model="addAccountForm.user_id" placeholder="请选择部门管理人">
            <el-option
              v-for="item in rolesJson"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="管辖区域：" prop="areaCode" >
          <choiceindex :selectedLabels="selectedAreaLabels" clearable @change="regionChange" :is-two-dimension-value="false" v-model="checkList" :data="regionOptions"></choiceindex>

          
        </el-form-item>
      </el-form>
      <div slot="footer"  class="dialog-footer tac">
        <el-button @click="add_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="confirmAddDepartment()" class="dialogSure">确 认</el-button>
      </div>
    </el-dialog>
    <!--添加账号  弹窗 End -->
    <!-- 编辑账号  弹窗  Start -->
    <el-dialog  width="662px" title="编辑部门" :visible.sync="edit_dialogFormVisible" custom-class="addAccount">
       <el-form :model="EditAccountForm" :label-width="formLabelWidth">
        <el-form-item label="部门名称:" prop="name">
          <el-input v-model="EditAccountForm.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="addAccountForm.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        -->
      
        <el-form-item label="部门负责人：" prop="userId" >
          <!-- <el-input v-model="addAccountForm.userId" auto-complete="off" clearable></el-input> -->
          <el-select v-model="EditAccountForm.userId" placeholder="请选择部门管理人">
            <el-option
              v-for="item in getAllStaffJson"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管辖区域：" prop="areaCode">
          <choiceindex :selectedLabels="selectedAreaLabels" clearable @change="regionChange" :is-two-dimension-value="false" v-model="editAreaCode" :data="regionOptions"></choiceindex>
        </el-form-item>
      </el-form>
      <div slot="footer"  class="dialog-footer tac">
        <el-button @click="edit_dialogFormVisible = false" class="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="confirmEdit()" class="dialogSure">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 编辑账号 弹窗 End -->
    <fotter></fotter>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import CityChoose from '../../components/CityChoose2'
import choiceindex from "../../components/multi-cascader/multi-cascader"; //级联选择多选 完成
import newArea from "../../utils/newArea";
import pcas from '../../utils/citySelector/pcas-code.json'

export default {
  data() {
    return {
      totalPageSize:0, // 总页数
      queryParam:{
        offset:1,
        limit:10,
        column: "create_time",
        order: false,
        queryStr: "",
        corpId:window.localStorage.getItem('corpId'),
        depName:'',
        areaCode:''
      },
      getAllAccountJson: [],
      formLabelWidth: '106px',
      add_dialogFormVisible:false,
      addAccountForm: {
        corpId:window.localStorage.getItem('corpId'),
        name:'',
        areaCode: '',
        path:'1'
      },
      EditAccountForm: {
        // name:'',
        areaCode: '',
        managerName:'',
        userId:'',
        id:''
      },
      editAreaCode:[],
      searchKey:'',
      selectedDpt:'',
      departments:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
      }],
      checkList:[],
      regionOptions: [],
      newFormat: {},
      checkAreaList: [],
      selectedAreaLabels: [],
      getAllStaffJson: [],
      edit_dialogFormVisible:false,
      queryStaffParam:{
        offset:0,
        limit:50,
        column: "create_time",
        order: false,
        corpId:window.localStorage.getItem('corpId'),
        depId:"", // 部门ID
        accountStatus:"-1",// 账号状态
        worksStatus:"-1", // 作业状态
        phone:"",
        staffName:"",
      },
      queryAccountParam:{
        offset:1,
        limit:10,
        column: "create_time",
        order: false,
        queryStr: "",
        corpId:window.localStorage.getItem('corpId'),
        phone:'',
        name:''
      },
    }
  },
  components: {
    'search-input': SearchInput,
    'fotter': fotter,
    'city-choose': CityChoose,
    choiceindex, //级联

  },
  mounted() {
    this.getAllDepartmentData()
    // this.getAllStaffData()
    this.getAllAccountData()
    // 一级循环，加载省市下拉选项
    // ----------------------省市区数据-----------------
    pcas.forEach((item, i) => {
      let obj = {
        value: item.code,
        label: item.name,
        children: []
      }
      this.newFormat[item.code] = item.name

      if (item.children) {
        // 二级循环
        item.children.forEach((secondItem, secondI) => {
          let secondObj = {
            value: secondItem.code,
            label: secondItem.name,
          }
          this.newFormat[secondItem.code] = secondItem.name

          if (secondItem.children) {
            secondObj.children = []

            // 三级循环
            secondItem.children.forEach((thirdItem, thirdI) => {
              let thirdObj = {
                value: thirdItem.code,
                label: thirdItem.name,
              }
              this.newFormat[thirdItem.code] = thirdItem.name


              if (thirdItem.children) {
                thirdObj.children = []

                // 四级循环
                thirdItem.children.forEach((fourthItem, fourthI) => {
                  let fourthObj = {
                    value: fourthItem.code,
                    label: fourthItem.name,
                  }
                  this.newFormat[fourthItem.code] = fourthItem.name

                  thirdObj.children.push(fourthObj)
                })
              }
              secondObj.children.push(thirdObj)

            })

          }
          obj.children.push(secondObj)
        })
      }
      this.regionOptions.push(obj)

    })
    // ----------------------省市区数据-end----------------
    // this.regionOptions = newArea.newAreaOption()
  },
  methods: {
    
    // 打开添加部门弹窗
    add_dialogForm(){
      this.add_dialogFormVisible = true
      this.checkList = []
      this.addAccountForm.name = ''
    },
    
    // 选择部门管辖区域
    regionChange(val, totalLabel) {
      this.selectedAreaLabels = [] // 重置
      var util = require("util")
      // 重置联动数据 
      // this.regionOptions2 = []
      // console.log("所选区域码:" +  JSON.stringify(totalLabel));
      // this.checkList2 = this.checkList

      // alert(this.checkList.length)
      // var checkArr = this.checkList.split(",")
      if(val.length > 0){
        var sheng = val[0].substring(0,2)
        var shi = val[0].substring(0,4)
        var qu = []
        for(var i = 0 ; i< val.length; i++){
          // 去重
          
          // qu.forEach(item =>{
          //   if(item !== this.checkList[i].substring(0,6)){
            qu.push(val[i].substring(0,6))
            // 去重
            qu = this.uniq(qu)
          //   }
          // })
          // console.log("所选区：" + qu)
        }
        // var aaa = this.regionOptions.filter(item => item.code === '11')

        console.log("省：" + sheng)
        console.log("市：" + shi)
        console.log("区：" + qu)
        var checkListNew = [] // 片区数组截取前6位
        this.checkAreaList = val
        var pianquLength = 0 //同区的片区个数
        // 将所有片区截取前6位
        val.forEach(item => {
          checkListNew.push(item.substring(0, 6))

        })
        // 选择的区循环，判断是否全选
        qu.forEach(quitem =>{
          pianquLength = this.getSameNum(quitem,checkListNew)
          // 如果全选区 则只传此区的code
          console.log("this.checkAreaList====" + this.checkAreaList) 
          // 判断片区总数是否与选中片区个数相等 若相等 则为全选
          if(this.ifCheckAllQu(quitem, pianquLength)){
            for(var i = 0; i < this.checkAreaList.length; i++){
              console.log("quitem::::" + quitem)
              if(this.checkAreaList[i].substring(0,6) === quitem){
                this.checkAreaList[i] = this.checkAreaList[i].substring(0,6)
              }
            }
          }
          this.checkAreaList = this.uniq(this.checkAreaList) // 去重
        })

        console.log("checkListNew==" + checkListNew)
        console.log("pianquLength==" + pianquLength)
        console.log("checkAreaList=" + this.checkAreaList)
        var dest = [],
          map = {};
        for(var i = 0; i < totalLabel.length; i++) {
            var ai = {
              "qu" : totalLabel[i].split("/")[2],
              "pianqu": totalLabel[i].split("/")[3]
            }
          if(!map[ai.qu]) {
            dest.push({
              name: ai.qu,
              data: [ai.pianqu]
            });
            map[ai.qu] = ai;
          } else {
            for(var j = 0; j < dest.length; j++){
              var dj = dest[j];
              if(dj.name == ai.qu) {
                dj.data.push(ai.pianqu);
                break;
              }
            }
          }
          // console.log("所选区域码ai:" +  JSON.stringify(ai))
        }
        // console.log("所选区域码:" +  JSON.stringify(dest));
        dest.forEach(item =>{
          // console.log("item.data=========" + item.data[0])
          // 如果区全选
          if(this.ifCheckAllQu(item.name, item.data.length)){
            this.selectedAreaLabels.push(item.name + "-全部")
          } else  {
            if (item.data[0] !== undefined){
              var labelItem = item.name + "-" + item.data
            } else {
              var labelItem = item.name + "-全部"
            }
            this.selectedAreaLabels.push(labelItem)
          }
         
        })
        
        
      }
    },
    // 判断是否全选区
     /**
     * 获取数组中相同元素的个数
     * @param qu 区code码或区名称
     * @param pianQuLength 片区的个数
     */
    ifCheckAllQu(qu,pianQuLength){
      var BreakException= {}; // 用于终止循环
      var flag = false
      try {
        this.regionOptions.forEach(item1 => {
          // console.log("item4::" + JSON.stringify(item1))
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {

              if((item3.label === qu && item3.children.length === pianQuLength)|| (item3.value === qu && item3.children.length === pianQuLength)){
                flag = true
                console.log("true!")
                // this.selectedArea.push(item3.label)
                throw BreakException;
              }
              else {
                flag = false
              }
            })
          })
        })
      } catch(e) {
        if (e!==BreakException) throw e;
      }
      console.log("flag===" + flag)
      if(flag){
        return true
      }
    },
     /**
     * 获取数组中相同元素的个数
     * @param val 相同的元素
     * @param arr 传入数组
     */
    getSameNum(val,arr){
      var processArr = arr.filter(function(value) {
          return value == val;
      })
      return processArr.length;
    },
    // 去重
    uniq(array){
      var temp = []; //一个新的临时数组
      for(var i = 0; i < array.length; i++){
          if(temp.indexOf(array[i]) == -1){
              temp.push(array[i]);
          }
      }
      return temp;
    },
    getAllAccountData(){
      api.accountApi.getAccounts(this.queryAccountParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllStaffJson = res.data.data.records
          // this.totalPageSize = res.data.data.total

        } else {
          this.getAllStaffJson = []
        }
        
      }).catch((res) => {
        
      })
    },
     // 查询所有账户
    getAllStaffData(){
      api.accountApi.getStaffs(this.queryStaffParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllStaffJson = res.data.data.records

        } else {
          this.getAllStaffJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
     
    },
    // 区域筛选
    selectCity(cityArr, cnName) {
      this.queryParam.depName = ''
      this.queryParam.areaCode = cityArr[cityArr.length-1] || ""
      // console.log(cnName)
      this.getAllDepartmentData()
    },
    // 查询所有部门
    getAllDepartmentData(){
      api.accountApi.getDepartments(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getAllAccountJson = res.data.data.records
          newArea.getAreaName("440303001,440303003,440303004,440303005,440303006,440303007,440303008,440303009,440303010")
          this.getAllAccountJson.forEach(item =>{
            var areaName = newArea.getAreaName(item.areaCode).join('   ')
            Vue.set(item, 'areaName', areaName)
          })
          this.totalPageSize = res.data.data.total

        } else {
          this.getAllAccountJson = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
      
    },
  

    // 每页条数变化
    handleSizeChange(val) {
      this.queryParam.limit = val
      // console.log(`每页 ${val} 条`);
      this.getAllDepartmentData()
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.queryParam.offset = val
      // console.log(`当前页: ${val}`);
      this.getAllDepartmentData()
    },
    

    // 确认添加账号
    confirmAddDepartment() {
      console.log('submit!');
      this.addAccountForm.areaCode = this.checkAreaList.join(",")
      api.accountApi.createDepartment(this.addAccountForm).then((res) => {
        this.adding = false
        
        if (res.data.code === 200) {
          // 修改角色
          // this.bindRoleForm.userId = 
          // api.accountApi.accountBindRole(this.bindRoleForm).then((res) => {
          //   if (res.data.code === 200) {
          this.$message.success('创建成功！');
          this.getAllDepartmentData()
          this.add_dialogFormVisible = false
             
          //   }
          // }).catch((res) => {
          //   this.$message.error(res.data.message);
          // })
          
        } else {
          this.$message.error(res.data.message);
          
        }
        // this.resetAdd()
      }).catch((res) => {
        // this.handleError(res)
        // this.adding = false
      })
    },
    // 编辑账号
    editAccount(index, row){
      console.log("111" + JSON.stringify(row))
      this.EditAccountForm.id = row.id
      this.EditAccountForm.userId = row.userId
      this.EditAccountForm.name = row.depName
      this.editAreaCode = row.areaCode.split(",")
      this.edit_dialogFormVisible = true
    },
   
    // 确认修改
    confirmEdit(){
      this.getAllStaffJson.forEach(item => {
        if(item.id === this.EditAccountForm.userId) {
          this.EditAccountForm.managerName = item.staffName
        }
      })
      this.EditAccountForm.areaCode = this.checkAreaList.join(',')
      // 修改账号名
      api.accountApi.editDepartment(this.EditAccountForm).then((res) => {
        
        if (res.data.code === 200) {
          this.$message.success('编辑成功！');
          this.edit_dialogFormVisible = false
          this.getAllDepartmentData()          
        }else {
          this.$message.error(res.data.message);
        }
      }).catch((res) => {
        
      })
      
    },

    // 删除部门
    deleteDepartment(index, row){
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        api.accountApi.deleteDepartment(row.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success('删除成功！');
            this.getAllDepartmentData()
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((res) => {
          this.$message.error(res.data.message);
        })

      }).catch(() => {
        this.$message.info("取消删除");            
      });
      
    },
    // 搜索真实姓名/手机号
    searchAccount(){
      this.queryParam.depName = this.searchKey
      this.getAllDepartmentData()
    }

  },
}
</script>

<style lang="stylus">
#department
  .bread-nav
    margin 0 -10px
    padding: 0 20px;
    height: 52px;
    line-height: 52px;
    background: #fff;
    border-bottom: 1px solid #e9e9e9;
    span 
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      &.on
        color: #34414C;
    em
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      margin: 0 10px;
  
  .llct-area
    float left;
    width 120px;
    height 30px;
    .el-cascader__label, .el-input__inner
      padding-left:0!important
      border: none!important;
  .areaTdStyle
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px 0 0 
</style>
