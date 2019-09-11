<template>
  <div id="batchImport" class="main-wrap">
    <div class="row" >

      <div class="panel" >
        <!-- <label :class="{'disabled':importing}" class="el-button el-button--primary btn-upload">
          <input type="file" v-if="clearShow" ref="macFile" name="macFile" @change.prevent="batchImport"/>
          {{ importing ? '正在导入' : '批量导入生产设备' }}
        </label> -->


        <el-upload
          class="el-button el-button--primary btn-upload"
          :headers="{'Content-Type':'multipart/form-data'}"
          :http-request="upLoadHeadPic"
          :action="1"
          :show-file-list="false" 
          
        >
          <!-- accept="csv" -->
          <!-- <img v-if="imageUrl1" :src="imageUrl1" class="avatar"> -->
          <!-- <i v-else class="uploader-icon"></i> -->
          <div class="uploadBtn">批量导入生产设备</div>
          <!-- <div class="uploadTip">图片格式为.jpg/.png；建议图片尺寸为300像素*300像素，图片大小不可超过2M</div> -->
        </el-upload>


        <!-- 表格 Start -->
        <div style="position:relative;;display:flex;">
          &nbsp;
          <el-table :data="getAllAccountJson" style="margin-top:30px">
            <el-table-column prop="devEui" label="devEui">
            </el-table-column>
        
            <!-- <el-table-column prop="name" label="真实姓名">
            </el-table-column> -->
            
            <el-table-column  label="Sn">
              <template slot-scope="scope">
                <span v-if="scope.row.devSn" v-html="scope.row.devSn" ></span>
                <span v-else>--</span>
              </template>
            </el-table-column>
           <el-table-column  label="设备型号">
              <template slot-scope="scope">
                <span v-if="scope.row.devModel" v-html="scope.row.devModel" ></span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="设备类型">
              <template slot-scope="scope">
                <span v-if="scope.row.devType" v-html="scope.row.devType" ></span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="厂商ID">
              <template slot-scope="scope">
                <span v-if="scope.row.manId" v-html="scope.row.manId" ></span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="模组类型">
              <template slot-scope="scope">
                <span v-if="scope.row.modType" v-html="scope.row.modType" ></span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="创建时间">
              <template slot-scope="scope">
                <span v-if="scope.row.createTime" v-html="scope.row.createTime" ></span>
                <span v-else>--</span>
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
  </div>
</template>

<script>
import api from '../../api'
import axios from 'axios'
export default {
  data() {
    return{
      importing: false,
      clearShow: true,
      getAllAccountJson:[],
      queryParam:{
        offset:0,
        limit:10
      },
      totalPageSize:0
      
    }
  },
  mounted() {
    this.getAllAccount()

    
  },
  methods: {
    getAllAccount(){
      api.device.getImportDeviceData(this.queryParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          // this.$message.success(`成功导入${res.data.data}条设备!`)
          this.getAllAccountJson = res.data.data.data.records
          this.totalPageSize = res.data.data.data.total
          console.log("res==" + JSON.stringify(res.data))
         
        } else {

        }
        
      })

    },
     // 每页条数变化
    handleSizeChange(val) {
      this.queryParam.limit = val
      // console.log(`每页 ${val} 条`);
      this.getAllAccount()
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.queryParam.offset = val
      // console.log(`当前页: ${val}`);
      this.getAllAccount()
    },
    // 自定义头像上传方法
    upLoadHeadPic(fileObj) {
      const _file = fileObj.file;
      // const isLt2M = _file.size / 1024 / 1024 < 2;

      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      //   return false;
      // }

      const formData = new FormData()
      formData.append('file', fileObj.file)
      formData.append('type', fileObj.file.type)

      api.device.batchImport(formData).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.$message.success(`成功导入${res.data.data}条设备!`)
          this.getAllAccount()
          // this.imageUrl1 = api.accountApi.viewPic(res.data.data.fileName)
          // this.addStaffForm.avatarUrl = res.data.data.fileName
        } else {
          this.$message.error(res.data.message)
        }
        
      })
    },
    // 批量导入
    // batchImport () {
    //   var file = this.$refs.macFile.files[0]
    //   if (window.File && window.FileReader && window.FileList && window.Blob) {
    //     // console.log('file11111111111::' + JSON.stringify(file))
    //     this.clearShow = false
    //     var reader = new window.FileReader()
    //     // if (!/csv\/\w+/.test(file.type)) {
    //     //   this.clearShow = true
    //     //   this.$message.error("请导入csv格式的文件")
    //     //   // this.showNotice({
    //     //   //   type: 'error',
    //     //   //   content: file.name + this.$t('upload.type_tips')
    //     //   // })
    //     //   return false
    //     // }
    //     console.log("file.type---" + file.type)
    //     reader.onerror = (evt) => {
    //       this.clearShow = true
    //       this.$message.error("文件读取失败")
    //       // this.showNotice({
    //       //   type: 'error',
    //       //   content: this.$t('upload.read_err')
    //       // })
    //     }
    //     this.importing = true
    //     // 读取完成
    //     reader.onloadend = (evt) => {
    //       if (evt.target.readyState === window.FileReader.DONE) {
    //         var macArr = evt.target.result.replace(' ', '').replace(/\r\n/g, '\n').split('\n')
    //         var a = []
    //         macArr.forEach((element, index) => {
    //           if (element !== '') {
    //             a.push(element)
    //           }
    //         })
    //         macArr = a
    //         console.log("macArr===" + macArr)
    //         // api.device.batchImport({'file':macArr}).then((res) => {
    //         //   // alert(11)
    //         //   if (res.status === 200) {
              
    //         //     this.$message.success("设备导入成功!")
    //         //     console.log('res::' + JSON.stringify(res))
            
    //         //     this.clearShow = true
    //         //   }
            
    //         //   this.importing = false
    //         // }).catch((res) => {
    //         //   // this.handleError(res)
    //         //   this.$message.error("导入失败")
    //         //   this.importing = false
    //         //   this.clearShow = true
    //         // })
    //         axios.post("http://192.168.100.89:8080/arctic/risinghf/v1/import/devices",{'file':macArr},

    //         {headers: {'Content-Type': 'multipart/form-data'}}

    //         ).then(result => {
    //           if (res.data.code === 200) {
              
    //             this.$message.success("设备导入成功!")
    //             console.log('res::' + JSON.stringify(res))
            
    //             this.clearShow = true
    //           }
            
    //           this.importing = false
    //         // do something

    //         })


    //       }
    //     }
    //     reader.readAsText(file)
    //   } else {
    //     this.$message.error("您的浏览器过于低级，不支持 HTML5 上传")
    //     // this.showNotice({
    //     //   type: 'error',
    //     //   content: this.$t('upload.compatiblity')
    //     // })
    //   }
    // },
   

    


  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
#batchImport{
  // 基础样式
  .btn{
    display inline-block
    color #fff
    transition background .3s
    // height 28px
    // line-height 28px
    line-height: 1;
    padding: 12px 20px
    font-size 14px
    white-space nowrap
    border-radius: 4px

    &.disabled
    &.disabled:hover{
      background #c4c4c4
      color #fff
      cursor not-allowed
    }
  }
  .btn-import{
    background-color: #409EFF;
    border-color: #409EFF;
    // width 89px
    // height 28px
    padding: 12px 20px
    box-sizing: border-box;
  }
  // 上传按钮
  .btn-upload{
    position relative
    overflow hidden
    cursor pointer
    vertical-align: -14px;
    input[type="file"]{
      position absolute 
      left 0
      top 0
      right 0
      bottom 0
      opacity 0
      cursor pointer
    }
  }
}

</style>
