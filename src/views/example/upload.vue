<template>

 <!-- <el-upload
  ref="imgUpload"
  :on-success="imgSuccess"
  accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
  :headers="headerMsg"
  :action="upLoadUrl"
  multiple>
  <el-button type="primary">上传图片</el-button>
 </el-upload> -->
 <div>
  <el-upload
    class="avatar-uploader"
    :action="upLoadUrl"
    :show-file-list="false"
    :on-success="imgSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <div>{{ pic }}</div>
 </div>

</template>
 
<script>
//  import {getAliOSSCreds} from '@/api/common' // 向后端获取 OSS秘钥信息
//  import {createId} from '@/utils' // 一个生产唯一的id的方法
 import OSS from 'ali-oss'
 import api from 'api'
 export default {
  name: 'imgUpload',
  data () {
   return {
     headerMsg:{'G-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjM1MDc3ODQsImFjY291bnQiOiJhZG1pbiJ9.C2sEUzeMm7OuUoF7fKsv0NE4EQrshsqC0NPjw3rnfdI'},
     upLoadUrl:'http://192.168.100.7:8080/domino/upload/image',
     imageUrl:'',
     pic:'',
   }
  },
  methods: {
   // 上传图片成功
   imgSuccess (res, file, fileList) {
    console.log(res)
    console.log(file)
    console.log(fileList)  // 这里可以获得上传成功的相关信息
    var picName = file.response.data.fileName
    this.imageUrl = URL.createObjectURL(file.raw);
    api.accountApi.viewPic(picName).then((res) => {
      // if(res.data.code === 200 && res.data.message === 'success'){
      console.log("res===" + JSON.stringify(res))
      this.pic =URL.createObjectURL(res.data)
      // }
      // console.log("res.data.code" + res.data.data.records[0])s
    }).catch((res) => {
      
    })
   },
   beforeAvatarUpload(){

   },
  }
 }
</script>
 
<style lang="stylus">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>