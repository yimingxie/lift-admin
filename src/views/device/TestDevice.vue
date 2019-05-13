<template>
  <div id="TestDevice">
    <div class="container">
      <h1>测试设备列表页</h1>

      

      <div style="margin-top: 20px;position: relative;">
        <div style="position: absolute;top: 0;right: 0;">
          <el-button type="danger" @click="goAdd">添加设备</el-button>
        </div>
        <div style="display: inline-block;width: 300px;">
          <el-input v-model="query.title" placeholder="请输入内容" @keyup.enter.native="getDeviceList"></el-input>
        </div>
        <el-button type="primary" @click="getDeviceList">搜索</el-button>
      </div>

      <div class="clearfix" style="margin-top: 20px;">
        <div class="choose">
          <b>在线状态：</b>
          <span v-for="(item, i) in choose.theOnline.list" :key="i" :class="{on: i == choose.theOnline.current}" @click="changeOnline(i, item.code)">{{item.name}}</span>
        </div>
        <div class="choose">
          <b>使用状态：</b>
          <span v-for="(item, i) in choose.status.list" :key="i" :class="{on: i == choose.status.current}" @click="changeStatus(i, item.code)">{{item.name}}</span>
        </div>
        <div class="choose">
          <b>设备类型：</b>
          <span v-for="(item, i) in choose.type.list" :key="i" :class="{on: i == choose.type.current}" @click="changeType(i, item.name)">{{item.name}}</span>
        </div>
      </div>

      <!-- TODO -->
      <div class="clearfix" style="margin-top: 20px;">
        <div class="selected-list">
          <b>已选条件：</b>
          <!-- <span v-for="(item, i) in selectedList" :key="i">{{item.name}}</span> -->
          <el-tag v-for="(item, i) in selectedList" :key="i" closable @close="selectedClose(item, i)"> {{item.name}}</el-tag>
        </div>

      </div>
      

      <div class="device-list">

        <table style="width: 100%">
          <tr>
            <th style="width: 10%">设备ID</th>
            <th style="width: 10%">设备类型</th>
            <th style="width: 10%">设备型号</th>
            <th style="width: 10%">设备名称</th>
            <th style="width: 10%">电梯注册代码</th>
            <th style="width: 10%">维保单位</th>
            <th style="width: 10%">在线状态</th>
            <th style="width: 10%">使用状态</th>
            <th style="width: 20%">操作</th>
          </tr>
          <tr v-for="item in deviceList" :key="item.devEUI">
            <td>{{item.devEUI}}</td>
            <td>{{item.devType}}</td>
            <td>{{item.devModel}}</td>
            <td>{{item.devName}}</td>
            <td>{{item.elevatorRegistrationCode}}</td>
            <td>{{item.maintenanceUnitName}}</td>
            <td>{{item.theOnline ? "在线" : "离线"}}</td>
            <td>
              <el-switch v-model="item.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </td>
            <td>
              <router-link :to="{path: '/test-device-detail', query: {id: item.devEUI}}">查看</router-link>
              <router-link :to="{path: '/test-device-edit', query: {id: item.devEUI}}">编辑</router-link>
            </td>
          </tr>
        </table>

        <div v-if="deviceList.length == 0" style="text-align: center; padding: 10px">暂无数据</div>
      </div>


    </div>

  </div>
</template>

<script>
import HTTP from '../../utils/http.js'

export default {
  data() {
    return {
      search: '',
      deviceList: [],
      btn: true,
      query: {
        title: '',
        theOnline: -1,
        status: -1,
        type: ''
      },
      selectedList: [],
      choose: {
        theOnline: {
          current: 0,
          list: [
            {name: '全部', code: -1},
            {name: '在线', code: 1},
            {name: '下线', code: 0}
          ]
        },
        status: {
          current: 0,
          list: [
            {name: '全部', code: -1},
            {name: '启动', code: 1},
            {name: '停用', code: 0}
          ]
        },
        type: {
          current: 0,
          list: [
            {name: '全部'},
            {name: '传感器'},
            {name: '控制器'},
            {name: '监控器'}
          ]
        }

      }

    }
  },
  mounted() {

    this.$store.commit('SWITCH_LAYOUT', 'admin')
    this.getDeviceList()

  },
  methods: {
    // 获取设备列表
    getDeviceList() {
      let url = 'http://192.168.100.89:9090/gi/test/devices?query=' + JSON.stringify(this.query)
      console.log(JSON.stringify(this.query))
      // if (queryObj) {
      //   url = url + '?query=' + JSON.stringify(queryObj)
      // }
      var encodedURL = encodeURI(url)
      console.log(encodedURL)

      HTTP.get(encodedURL).then(res => {
        console.log(res)
        this.deviceList = res.data.result.records
      })

    },

    // 搜索设备
    searchDevice(){
      this.getDeviceList()
    },

    // 筛选-在线状态
    changeOnline(index, code) {
      this.choose.theOnline.current = index
      this.query.theOnline = code
      // 更新已选条件
      this.getSelectedList()
      this.getDeviceList()
      
    },

    // 筛选-使用状态
    changeStatus(index, code) {
      this.choose.status.current = index
      this.query.status = code
      // 更新已选条件
      this.getSelectedList()
      this.getDeviceList()
    },

    // 筛选-设备类型
    changeType(index, name) {
      this.choose.type.current = index
      this.query.type = name
      // 更新已选条件
      this.getSelectedList()
      this.getDeviceList()
    },

    // 跳转添加页面
    goAdd() {
      this.$router.push('test-device-add')
    },

    // 已选条件
    getSelectedList() {
 
      let theOnlineIndex = this.choose.theOnline.current
      // 如果条件为[全部]，则不渲染
      let theOnlineName = this.choose.theOnline.list[theOnlineIndex].name == '全部' ? '' : this.choose.theOnline.list[theOnlineIndex].name
      let statusIndex = this.choose.status.current
      let statusName = this.choose.status.list[statusIndex].name == '全部' ? '' : this.choose.status.list[statusIndex].name
      let typeIndex = this.choose.type.current
      let typeName = this.choose.type.list[typeIndex].name == '全部' ? '' : this.choose.type.list[typeIndex].name


      // this.selectedList = [
      //   {name: theOnlineName},
      //   {name: statusName},
      //   {name: typeName},
      // ]

      this.selectedList = []
      if (theOnlineName !== '') {
        this.selectedList.push({name: theOnlineName})
      }
      if (statusName !== '') {
        this.selectedList.push({name: statusName})
      }
      if (typeName !== '') {
        this.selectedList.push({name: typeName})
      }
    },

    // 标签关闭
    selectedClose(tag, index) {
      this.choose.theOnline.list.forEach(item => {
        if (item.name == tag.name) {
          this.choose.theOnline.current = 0
          this.query.theOnline = -1
        }
      })
      this.choose.status.list.forEach(item => {
        if (item.name == tag.name) {
          this.choose.status.current = 0
          this.query.status = -1
        }
      })
      this.choose.type.list.forEach(item => {
        if (item.name == tag.name) {
          this.choose.type.current = 0
          this.query.type = ''
        }
      })

      this.selectedList.splice(index, 1); // 删除标签
      this.getDeviceList() // 重新查询
    },


    handleClick(value) {
      console.log(value)
    }

  },
  components: {

  }
}
</script>

<style lang="stylus">
#TestDevice{

  .container{
    position: relative;
    padding: 100px 20px 20px 240px;
  }
  .choose{
    float: left;
    margin-right: 20px;
  }
  .choose span{
    display: inline-block;
    padding: 5px;
    cursor: pointer;
  }
  .choose span.on{
    color: white;
    background: #409EFF;
  }
  .device-list{
    background: #fff;
    margin-top: 20px;
  }
  .device-list table{
    border-top: 1px solid #000;
    border-left: 1px solid #000;
  }
  .device-list th{
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .device-list td{
    padding: 5px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .selected-list span{
    margin-right 10px;
  }

}


</style>
