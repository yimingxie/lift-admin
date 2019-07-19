<template>
  <div style="margin-top:160px">
    <el-upload 
      class="avatar-uploader"
      action="111"
      ref="upload"
      :http-request="upLoad"
      :show-file-list="true"
      :on-change="change"
      :drag="true"
      :auto-upload="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
    
    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->


    <form enctype="multipart/form-data" method="post" name="fileinfo" @submit="tijiao">
        <label>Your email address:</label>
        <input type="email" autocomplete="on" autofocus name="userid" placeholder="email"  size="32" maxlength="64" /><br />
        <label>Custom file label:</label>
        <input type="text" name="filelabel" size="12" maxlength="32" /><br />
        <label>File to stash:</label>
        <input type="file" name="file" />
        <input type="submit" value="Stash the file!" />
        <button slot="trigger" size="small" type="submit">提交</button>
    </form>
    <div></div>

    <!-- 折叠面板 -->
    <div class="panel">
      <div class="panel-header" id="header1">
        Lorem ipsum dolor sit.
      </div>
      <div class="panel-body" id="body1">
        <div class="panel-inner">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dignissimos, nisi quo cumque sed ab quod nobis voluptatum iusto rem, quis velit explicabo dolore adipisci. Nam culpa, minima earum odit!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates corrupti labore velit, facere quas tenetur repellendus quae, minima incidunt exercitationem, nulla sequi ducimus itaque in explicabo. In est deleniti architecto.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dignissimos, nisi quo cumque sed ab quod nobis voluptatum iusto rem, quis velit explicabo dolore adipisci. Nam culpa, minima earum odit!
        </div>

      </div>
    </div>
    <!-- 折叠面板 end-->
    <!-- 折叠面板 -->
    <div class='callapce'>
      <div class='collapse-item'>
        <div class='item-hd' data-flag='0'>
          <div class='title'>一致性 Consistency</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn'>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </div>
      <div class='collapse-item'>
        <div class='item-hd' data-flag='1'>
          <div class='title'>反馈 Feedback</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn'>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
        </div>
      </div>
      <div class='collapse-item'>
        <div class='item-hd' data-flag='2'>
          <div class='title'>效率 Efficiency</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn'>
          简化流程：设计简洁直观的操作流程；
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </div>
      <div class='collapse-item'>
        <div class='item-hd' data-flag='3'>
          <div class='title'>可控 Controllability</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn'>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          
        </div>
      </div>
    </div>
    <!-- 折叠面板 end-->


  </div>
</template>
<script>
  import OSS from 'ali-oss'
  export default {
    data() {
      return {
        imageUrl: '',
        liConHeight: 50, // 两行文字的高度
       list:[
         {'title':'注册是支行信息如何进行填写？','showContent':false},
         {'title':'注册是支行信息如何进行填写？','showContent':false}]
      };
    },
    mounted() {
      /* ---------------------------------------------------------- */
        let addEvent = document.addEventListener ?
          (elem,type,listener,useCapture)=>{
            elem.addEventListener(type,listener,useCapture);
          }	:
          (elem,type,listener,useCapture)=>{
            elem.attachEvent('on'+type,listener);
          };
        let addClass = (node,className)=>{
          let current = node.className||'';
          if((' '+current+' ').indexOf(' '+className+' ')===-1){
            node.className = current?(current+' '+className):className;
          }
        }
        let delClass = (node,className)=>{
          let current = node.className||'';
          node.className = (' '+current+' ').replace(' '+className+' ',' ').trim();
        }
        let $ = selector=>{
          return [].slice.call(document.querySelectorAll(selector));
        };
        let oItemHds = $('.item-hd');
        let oItemMns = $('.item-mn');
        let oDownImgs = $('.downImg');
        
        for(let oItemHd of oItemHds){
          addEvent(oItemHd,'click',(ev)=>{
            let flag = ev.currentTarget.dataset.flag;
            
            if(flag){
              console.log('flag:',flag);
              let oItemMn = oItemMns[flag];
              let oDownImg = oDownImgs[flag];
              let current = oItemMn.className||'';
              let className = 'show';
              for(var aaa = 0; aaa<4; aaa++ ){
                delClass(oItemMns[aaa],className);
                console.log(aaa)
              }
              if((' '+current+' ').indexOf(' '+className+' ')===-1){
                addClass(oItemMn,className);
                addClass(oDownImg,'rotate');
              }else{
                delClass(oItemMn,className);
                delClass(oDownImg,'rotate');
              }
        
            }
          })
        }

/* ---------------------------------------------------------- */
        var form = document.forms.namedItem("fileinfo");
        form.addEventListener('submit', function(ev) {

            var oOutput = document.querySelector("div"),
                oData = new FormData(form);

            oData.append("CustomField", "This is some extra data");
            console.log('oData-----' + oData);
            var oReq = new XMLHttpRequest();
            oReq.open("POST", "stash.php", true);
            oReq.onload = function(oEvent) {
                if (oReq.status == 200) {
                  oOutput.innerHTML = "Uploaded!";
                } else {
                  oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
                }
            };

            oReq.send(oData);
            ev.preventDefault();
        }, false); 

/* ---------------------------------------------------------- */
        var header = document.querySelector('#header1')
        var body = document.querySelector('#body1')

        header.addEventListener('click', function() {
          var height = body.getBoundingClientRect().height
          console.log("body.getBoundingClientRect()===" + JSON.stringify(body.getBoundingClientRect()))
          console.log("height===" + height)
          if (height) {
            body.style.height = height + 'px'
            var f = document.body.offsetHeight
            body.style.height = '0px'
          } else {
            body.style.height = 'auto'
            height = body.getBoundingClientRect().height
            body.style.height = '0'
            var f = document.body.offsetHeight
            body.style.height = height + 'px'
          }
        })

/* ---------------------------------------------------------- */
    },
    methods: {
      changeContent:function(index){
        var temp = this.list
        temp[index].showContent = ! temp[index].showContent
        this.list = temp
      },
      tijiao(){
            
            
      },
      submitUpload(){
        // this.$refs.upload.trigger();
      },
      change(file){
          //在添加文件之前判断图片是否符合要求
        console.log('1111111111-----' + file); // [object Object]
        const suffix = file.name.substr(file.name.indexOf("."));
        const isJPG = (suffix === '.jpg' || suffix === '.png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 和 png 格式!');
            return
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            return
        }
        
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      upLoad(file) {
        const formData = new FormData(); 
        formData.append('file', file.file); 
        console.log("formData====" + formData) // [object FormData]
        console.log("file===" + file) //[object Object]
        console.log("上传文件ing。。。。" + JSON.stringify(file))
        // this.$http.uploadHttp('/udb/api/v1/oss/fileUpload', formData).then((res) => {
        //   console.log(res); 
        //   console.log('上传成功'); 
        //   if (res.data.code === 0) { 
        //     this.successUrl = res.data.response; 
        //     // 请求之后将返回的URL给修改的接口在进行一次修改请求 
        //     this.headUrl = res.data.response; 
        //     // 请求成功之后赋给头像的URL 
        //     this.$message('头像上传成功'); 
        //     this.$store.dispatch('person/setAvatar', this.successUrl); 
        //     const obj = { headUrl: this.successUrl }; 
        //     this.edit(obj); 
        //     // this.getAccount();
        //     } else {
        //       this.$message('头像上传失败'); 
        //     } 
        // });
        var that=this
        //  这里是OSS
        // const client = new OSS.Wrapper({
        var f=file.file
        console.log('1111111111111111;;;;' + JSON.stringify(f))
        const Name=f.name
        console.log(Name)
        const suffix = Name.substr(Name.indexOf("."));
        const obj=this.timestamp();
        const storeAs = 'header/'+obj+suffix  //  路径+时间戳+后缀名
        console.log(storeAs)

        const client = new OSS({
            region: 'oss-cn-shenzhen',  
            accessKeyId: 'LTAIUtSRnle5i4FE',
            accessKeySecret: 'nie0kPjlgZgtvS5x6uw2DeL4bLZPbf',
            bucket: 'save-photo'
        });
        client.multipartUpload(storeAs, f).then(function (result){
            console.log(result.res.requestUrls)
        })

        async function put () {
          try {
            let result = await client.put(storeAs, f);
            console.log(result);
          } catch (e) {
            console.log(e);
          }
        }

        put();
      }, 
      //  时间戳
      timestamp:function(){
          const time = new Date();
          const y = time.getFullYear();
          const m = time.getMonth()+1;
          const d = time.getDate();
          const h = time.getHours();
          const mm = time.getMinutes();
          const s = time.getSeconds();  
          const ms = time.getMilliseconds()  
          return ""+y+this.Add0(m)+this.Add0(d)+this.Add0(h)+this.Add0(mm)+this.Add0(s)+this.Add0(ms);  
      },
      Add0:function(m){
          return m<10?'0'+m : m;  
      },
      handleAvatarSuccess(res, file) {
        console.log("file====" + JSON.stringify(res)) //[object Object]
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
          // 在上传之前判断图片是否符合要求
        console.log("222222222-----" + file) // [object File]
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 和 png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style>
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
/* ---------------------------------- */
  .panel {
    border-radius: 4px;
    overflow: hidden;
  }

  .panel-header {
    background-color: #2196F3;
    padding: 5px 10px;
    -webkit-user-select: none;
  } 

  .panel-body {
    background-color: #447094;
    transition: height .5s;
    box-sizing: border-box;
  }

  .panel-inner {
    padding: 5px 10px;
  }

/* ---------------------------------- */
  .newslist ul li p {
    font-size: 14px;
    color: #555;
    line-height: 25px;
    height: 50px;
    overflow: hidden;
    transition: height .3s;
  }
  /* ---------------------------------- */
  .callapce{
	padding:20px;
	border:1px solid #ebeef5;
	border-radius:4px;
	--down-lh:48px; 
	--img-down:12px;
}
.collapse-item{
	background-color: #fff;
	border-bottom: 1px solid #ebeef5;
        color: #303133;
        font-size: 13px;
        text-align: justify;
}
.collapse-item:first-child{
	border-top: 1px solid #ebeef5;
}
.item-hd{
	position:relative;
	height: var(--down-lh);
        line-height: var(--down-lh);
        cursor: pointer;
}
.item-hd .title{
	display:inline-block;
}
.item-hd .collapse-down{
	float: right;
	display:inline-block;
	margin-right: 8px;
}
.item-hd .downImg{
	width:var(--img-down);
	height:var(--img-down);
	vertical-align: middle;
	transform:rotate(-90deg);
	transition: all .3s linear;
}
.item-hd .downImg.rotate{
	transform: rotate(0);
}
.item-mn{
	overflow:hidden;
	max-height: 0;
	box-sizing: border-box;
	font-size: 13px;
	color: #303133;
	/* transition: all .3s ease-in-out; */
  transition: all .3s linear;
  background: #ddacac;
}
.show{
	/* 这里max-height设置一个足够大的数，但不能太大 */
	transition-timing-function: ease-in;
	max-height:200px;
	padding-bottom: 20px;
}

</style>





