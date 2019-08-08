<template>
  <div id="LiftPrint">
    <div class="lift-print-wrap">


      <div class="lift-print-title">基本信息</div>
      <table class="lift-print-table">
        <tr>
          <td style="width: 20%;">电梯注册代码</td>
          <td style="width: 30%;">{{ruleForm.regCode}}</td>
          <td style="width: 20%;">内部编号</td>
          <td style="width: 30%;">{{ruleForm.inNum !== '' ? ruleForm.inNum : ''}}</td>
        </tr>
        <tr>
          <td>物业公司</td>
          <td>{{ruleForm.propertyName !== '' ? ruleForm.propertyName : ''}}</td>
          <td>物业电话</td>
          <td>{{ruleForm.propertyPhone !== '' ? ruleForm.propertyPhone : ''}}</td>
        </tr>
        <tr>
          <td>使用单位</td>
          <td>{{ruleForm.userDepartment !== '' ? ruleForm.userDepartment : ''}}</td>
          <td>城市/区域</td>
          <td>{{ruleForm.localArea !== '' ? ruleForm.localArea : ''}}</td>
        </tr>
        <tr>
          <td>详细地址</td>
          <td>{{ruleForm.address !== '' ? ruleForm.address : '--'}}</td>
          <td></td>
          <td></td>
        </tr>
      </table>


      <div class="lift-print-title">出厂信息</div>
      <table class="lift-print-table">
        <tr>
          <td style="width: 20%;">出厂信息</td>
          <td style="width: 30%;">{{ruleForm.elevName !== '' ? ruleForm.elevName : ''}}</td>
          <td style="width: 20%;">型号</td>
          <td style="width: 30%;">{{ruleForm.elevType !== '' ? ruleForm.elevType : ''}}</td>
        </tr>
        <tr>
          <td>电梯品种</td>
          <td>{{ruleForm.elevVar !== '' ? ruleForm.elevVar : ''}}</td>
          <td>出厂编号</td>
          <td>{{ruleForm.elevFacnum !== '' ? ruleForm.elevFacnum : ''}}</td>
        </tr>
        <tr>
          <td>制造单位</td>
          <td>{{ruleForm.manufactName !== '' ? ruleForm.manufactName : ''}}</td>
          <td>制造日期</td>
          <td>{{ruleForm.elevDate !== '' ? ruleForm.elevDate : ''}}</td>
        </tr>
      </table>


      <div class="lift-print-title">技术参数</div>
      <table class="lift-print-table">
        <tr>
          <td style="width: 20%;">额定载重（kg）</td>
          <td style="width: 30%;">{{ruleForm.ratedLoad !== '' ? ruleForm.ratedLoad : ''}}</td>
          <td style="width: 20%;">停层站数</td>
          <td style="width: 30%;">{{ruleForm.stopFnum !== '' ? ruleForm.stopFnum : ''}}</td>
        </tr>
        <tr>
          <td>控制方式</td>
          <td>{{ruleForm.controlMode !== '' ? ruleForm.controlMode : ''}}</td>
          <td>拖动方式</td>
          <td>{{ruleForm.dragMode !== '' ? ruleForm.dragMode : ''}}</td>
        </tr>
        <tr>
          <td>轿厢尺寸（cm）</td>
          <td>
            <span style="margin-right: 7px;">宽:{{special.carSize.kuan !== '' ? special.carSize.kuan : '--'}}</span>
            <span style="margin-right: 7px;">深:{{special.carSize.shen !== '' ? special.carSize.shen : '--'}}</span>
            <span style="margin-right: 7px;">高:{{special.carSize.gao !== '' ? special.carSize.gao : '--'}}</span>
          </td>
          <td>轿门形式</td>
          <td>{{ruleForm.doorForm !== '' ? ruleForm.doorForm : ''}}</td>
        </tr>
        <tr>
          <td>开门尺寸（cm）</td>
          <td>{{ruleForm.doorOsize !== '' ? ruleForm.doorOsize : ''}}</td>
          <td>开门方向</td>
          <td>{{ruleForm.doorOdir !== '' ? ruleForm.doorOdir : ''}}</td>
        </tr>
        <tr>
          <td>曳引方式</td>
          <td>{{ruleForm.tractMode !== '' ? ruleForm.tractMode : ''}}</td>
          <td>额定运行速度（m/s）</td>
          <td>{{ruleForm.ratedSpeed !== '' ? ruleForm.ratedSpeed : ''}}</td>
        </tr>
        <tr>
          <td>轿厢形式</td>
          <td><div v-for="(item, i) in special.carForm" :key="i" style="display: inline-block"><span v-if="i !== 0">、</span>{{item.value}}</div></td>
          <td></td>
          <td></td>
        </tr>
      </table>


      <div class="lift-print-title">维保信息</div>
      <table class="lift-print-table">
        <tr>
          <td style="width: 20%;">投入使用时间</td>
          <td style="width: 30%;">{{ruleForm.statUtime !== '' ? ruleForm.statUtime.substring(0,10) : ''}}</td>
          <td style="width: 20%;">免包期限（年）</td>
          <td style="width: 30%;">{{ruleForm.exemptYear !== '' ? ruleForm.exemptYear : ''}}</td>
        </tr>
        <tr>
          <td>免保开始时间</td>
          <td>{{ruleForm.exemptStime !== '' ? ruleForm.exemptStime.substring(0,10) : ''}}</td>
          <td>免保终止时间</td>
          <td>{{ruleForm.exemptEtime !== '' ? ruleForm.exemptEtime.substring(0,10) : ''}}</td>
        </tr>
        <tr>
          <td>维保合同开始日期</td>
          <td>{{ruleForm.maintenStime !== '' ? ruleForm.maintenStime.substring(0,10) : ''}}</td>
          <td>维保合同终止日期</td>
          <td>{{ruleForm.maintenEtime !== '' ? ruleForm.maintenEtime.substring(0,10) : ''}}</td>
        </tr>
      </table>

      <div class="lift-print-title">业务参数</div>
      <table class="lift-print-table">
        <tr>
          <td style="width: 20%;">顶层高度（cm）</td>
          <td style="width: 30%;">{{ruleForm.topHeight !== '' ? ruleForm.topHeight : ''}}</td>
          <td style="width: 20%;">底坑深度（cm）</td>
          <td style="width: 30%;">{{ruleForm.bottomHeight !== '' ? ruleForm.bottomHeight : ''}}</td>
        </tr>
        <tr>
          <td>井道高度（cm）</td>
          <td>{{ruleForm.wellHeight !== '' ? ruleForm.wellHeight : ''}}</td>
          <td>轿厢高度（cm）</td>
          <td>{{ruleForm.carHeight !== '' ? ruleForm.carHeight : ''}}</td>
        </tr>
        <tr>
          <td>底层（F）</td>
          <td>{{ruleForm.lowLevel !== '' ? ruleForm.lowLevel : ''}}</td>
          <td>顶层（F）</td>
          <td>{{ruleForm.highLevel !== '' ? ruleForm.highLevel : ''}}</td>
        </tr>
        <tr>
          <td>曳引轮直径（cm）</td>
          <td>{{ruleForm.tractCircf !== '' ? ruleForm.tractCircf : ''}}</td>
          <td>载荷控制器电压范围（V）</td>
          <td>
            <div class="clearfix">
              <div style="float: left;">{{special.loadControl.value1 !== '' ? special.loadControl.value1 : '--'}}</div>
              <div class="floors-split" style="padding: 0 7px;">-</div>
              <div style="float: left;">{{special.loadControl.value2 !== '' ? special.loadControl.value2 : '--'}}V</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>对重装置重量（kg）</td>
          <td>{{ruleForm.countWeight !== '' ? ruleForm.countWeight : ''}}</td>
          <td>层高（cm）</td>
          <td>
            <div class="clearfix" v-for="(item, i) in special.floorsHeight" :key="i">
              <div class="clearfix">
                <div style="float: left;">{{item.floor1 !== '' ? item.floor1 : '--'}}</div>
                <div class="floors-split" style="padding: 0 7px;">-</div>
                <div class="show-pp" style="float: left;">{{item.floor2 !== '' ? item.floor2 : '--'}}层</div>
                <div class="floors-split" style="padding: 0;">，高度为</div>
                <div style="float: left;margin-left: 2px;">{{item.height !== '' ? item.height : '--'}}</div>
              </div>
            </div>
        
          </td>
        </tr>

      </table>






    </div>

  </div>
</template>

<script>
import api from '../../api'

export default {
  data() {
    return {
      parentCode: '',

      // 用于初次存储和正式提交
      ruleForm: {
        'regCode': '',
        'inNum': '',
        'propertyName': '',
        'propertyPhone': '',
        'userDepartment': '',
        'localArea': '',
        'areaCode': '',
        'address': '',
        'latLon': '',
        'elevName': '',
        'elevType': '',
        'elevVar': '',
        'elevFacnum': '',
        'manufactName': '',
        'elevDate': '',
        'ratedLoad': '0',
        'stopFnum': '0',
        'controlMode': '轿内按钮控制',
        'dragMode': '交流双速电动机变极调速拖动',
        // 轿厢尺寸特殊处理
        'carSize': '0:0:0',
        'doorForm': '封闭式中分开门',
        'doorOsize': '0',
        'doorOdir': '左开门',
        'tractMode': '半绕1:1吊索法',
        'ratedSpeed': '0',
        'carForm': '0',
        'statUtime': '',
        'exemptYear': '',
        'exemptStime': '',
        'exemptEtime': '',
        'maintenStime': '',
        'maintenEtime': '',

        'topHeight': '',
        'bottomHeight': '',
        'wellHeight': '',
        'carHeight': '',
        'lowLevel': '',
        'highLevel': '',
        'tractCircf': '',
        'loadControl': '',

        'countWeight': '',
        'floorsHeight': '',
        'extend': '',
        
      },

      // 用于页面展示
      special: {
        lng: '',
        lat: '',
        carSize: {
          gao: 0,
          kuan: 0,
          shen: 0
        },
        doorForm: '',
        controlMode: '',
        dragMode: '',
        floorsHeight: [
          {floor1: '', floor2: '', height: ''}
        ],
        loadControl: {
          value1: '',
          value2: ''
        },
        carForm: [
          {value: ''}
        ],
        areaCode: [],
        chooseCity: '',
        test: [1]

      },

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
  },
  mounted() {
    this.getLiftResult()

  },
  methods: {
    // 获取电梯详情
    getLiftResult() {
      let that = this
      api.lift.getLiftResult(this.parentCode).then(res => {
        if (!res.data.data) {
          // this.submitState = 'post'
          // this.ruleForm = this.ruleFormBlank
          // this.special = this.specialBlank
          this.ruleForm.regCode = this.parentCode
          return
        }
        // this.submitState = 'put'
        let detail = res.data.data
        for (var key in detail) {
          this.ruleForm[key] = detail[key]
        }
   
        // 特殊处理字段
        if (this.ruleForm.areaCode !== '') {
          this.special.areaCode = this.transformAreaCode(this.ruleForm.areaCode)
        }
        if (this.ruleForm.carSize !== '') {
          this.special.carSize = this.transformCarSize(this.ruleForm.carSize)
        }
        if (this.ruleForm.floorsHeight !== '') {
          this.special.floorsHeight = this.transformFloorsHeight(this.ruleForm.floorsHeight)
        }
        if (this.ruleForm.carForm !== '') {
          this.special.carForm = this.transformCarForm(this.ruleForm.carForm)
        }
        this.special.loadControl.value1 = this.ruleForm.loadControl.split(',')[0] ? this.ruleForm.loadControl.split(',')[0] : ''
        this.special.loadControl.value2 = this.ruleForm.loadControl.split(',')[1] ? this.ruleForm.loadControl.split(',')[1] : ''

        // m转换成cm
        this.ruleForm.doorOsize = (this.ruleForm.doorOsize * 100).toFixed(1); 
        this.ruleForm.topHeight = (this.ruleForm.topHeight * 100).toFixed(1); 
        this.ruleForm.bottomHeight = (this.ruleForm.bottomHeight * 100).toFixed(1); 
        this.ruleForm.wellHeight = (this.ruleForm.wellHeight * 100).toFixed(1); 
        this.ruleForm.carHeight = (this.ruleForm.carHeight * 100).toFixed(1); 
        this.ruleForm.tractCircf = (this.ruleForm.tractCircf * 100).toFixed(1);
        
        // 跳转到打印页面
        setTimeout(() => {
          // 清除页眉页脚
          var hkey_path;
          hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\InternetExplorer\\PageSetup\\";
          try {
            var RegWsh = new ActiveXObject("WScript.Shell");
            RegWsh.RegWrite(hkey_path + "header", "");
            RegWsh.RegWrite(hkey_path + "footer", "");
          } catch (e) {

          }
          window.print()
        }, 100)

      })

    },

    // 特殊处理获得的areaCode区域码
    transformAreaCode(areaCode) {
      // 字符串转数组
      // "440305005000" => ["44", "4403", "440305", "440305005"]
      if (typeof areaCode == 'string') {
        let province = areaCode.substr(0, 2)
        let city = areaCode.substr(0, 4)
        let region = areaCode.substr(0, 6)
        let street = areaCode.substr(0, 9)
        let cityShow = []
        if (areaCode.length <= 2) {
          cityShow.push(province)
        } else if (areaCode.length > 2 && areaCode.length <= 4 ) {
          cityShow.push(province, city)
        } else if (areaCode.length > 4 && areaCode.length <= 6 ) {
          cityShow.push(province, city, region)
        } else {
          cityShow.push(province, city, region, street)
        }
        return cityShow
      }

      // 数组转字符串
      // ["44", "4403", "440305", "440305005"] => "440305005000"
      if (areaCode instanceof Array) {
        return areaCode[areaCode.length - 1]
      }

      console.log('areaCode传入类型错误')
    },

    // 特殊处理轿厢尺寸
    transformCarSize(carSize) {
      // 字符串转对象
      // '10:20:30' => carSize: {gao: '', shen: '', kuan: ''}
      if (typeof carSize == 'string') {
        let carSizeObj = {}
        // 将m转为cm
        carSizeObj.gao = carSize.split(':')[0] * 100
        carSizeObj.kuan = carSize.split(':')[1] * 100
        carSizeObj.shen = carSize.split(':')[2] * 100
        return carSizeObj
      }

      // 对象转字符串
      // carSize: {gao: '', shen: '', kuan: ''} => '10:20:30'
      if (carSize instanceof Object) {
        if (carSize.gao === '' || carSize.kuan === '' || carSize.shen === '') {
          return ''
        } else {
          // 除以100，将cm转为m
          return carSize.gao / 100 + ':' + carSize.kuan / 100 + ':' + carSize.shen / 100
        }
      }

      console.log('carSize传入类型错误')
    },

    // 特殊处理层高
    transformFloorsHeight(floorsHeight) {
      // 字符串数组重组成新形式数组
      // "[{'floor': '-1, 1', 'height': '5'}, {'floor': '1, 5', 'height' : '4'}]" => [{floor1: '-1', floor2: '1', height: '5'}, {floor1: '1', floor2: '5', height: '4'}]
      if (typeof floorsHeight == 'string') {
        // 将m转换成cm
        let evalFloorsHeight = eval(floorsHeight)
        let floorsHeightArr = []
        evalFloorsHeight.forEach(item => {
          floorsHeightArr.push({
            floor1: item.floor.split(',')[0],
            floor2: item.floor.split(',')[1],
            height: item.height * 100
          })
        })
        return floorsHeightArr
      }

      // 新形式数组重组为字符串数组
      // [{floor1: '-1', floor2: '1', height: '5'}, {floor1: '1', floor2: '5', height: '4'}] => "[{'floor': '-1, 1', 'height': '5'}, {'floor': '1, 5', 'height' : '4'}]"
      if (floorsHeight instanceof Array) {
        // 将cm转化为m
        if (floorsHeight.length === 1 && floorsHeight[0].floor1 === '' && floorsHeight[0].floor2 === '' && floorsHeight[0].height === '') return ''
        let carSizeArrStr = []
        floorsHeight.forEach((item, i) => {
          if (item.floor1 === '' || item.floor2 === '') {
            return true
          } else {
            carSizeArrStr.push({
              floor: item.floor1 + ',' + item.floor2,
              height: item.height / 100
            })
          }
          
        })
        return JSON.stringify(carSizeArrStr)
      }
      
      console.log('floorsHeight传入类型错误')
    },

    // 特殊处理轿厢形式
    transformCarForm(carForm) {
      console.log('carForm传', carForm)
      // 字符串转数组
      // "轿厢形式1:轿厢形式2" => [{value: '轿厢形式1'}, {value: '轿厢形式2'}]
      if (typeof carForm == 'string') {
        let carFormArr = carForm.split(':')
        let carFormArrTrans = []
        carFormArr.forEach(item => {
          carFormArrTrans.push({
            value: item
          })
        })
        return carFormArrTrans
      }

      // 数组转字符串
      // [{value: '轿厢形式1'}, {value: '轿厢形式2'}] => "轿厢形式1:轿厢形式2" 
      if (carForm instanceof Array) {
        let carFormArr = []
        
        carForm.forEach(item => {
          carFormArr.push(item.value)
        })
        if (carFormArr.length === 0) {
          return ''
        } else {
          return carFormArr.join(':')
        }
      }
      
      console.log('carForm传入类型错误')
    },

  },
  components: {

  }
}
</script>

<style>
@page {
  size: auto;
  margin: 0mm;
}
</style>

<style lang="stylus" scoped>
#LiftPrint{
  @import '../../assets/stylus/xymStyle.styl'
    

  background #fff;

  .lift-print-wrap{
    width 670px;
    margin 0 auto;
  }
  .lift-print-title{
    font-size 20px; 
    line-height 50px; 
    margin-top 10px;
    margin-bottom: 4px;
  }
  .lift-print-table{
    width 100%;
    border-top 1px solid #ddd;
    border-left 1px solid #ddd;
  }
  .lift-print-table td{
    border-right 1px solid #ddd;
    border-bottom 1px solid #ddd;
    font-size 14px;
    line-height 20px;
    padding: 10px;
  }
  .floors-split{
    float: left;
    padding: 0 10px;
  }
  
}

</style>
