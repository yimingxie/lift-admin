<template>

<div id="picList">
 
    <div class="row">
      <div class="column" v-for="(img, index) in images.slice(0, maxShow)" :key="index">
        <img :src="images[index]" class="hover-shadow cursor">
        <div class="picListmaskmask" @click="openModal();currentSlide(index + 1)" ></div>
      </div>
      <!-- 查看更多 -->
      <div class="column cursor" @click="openModal();currentSlide(maxShow + 1)" v-if="images.length > maxShow">
        <div class="readMore"></div>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="centerDialogVisible" title="提示" width="30%" center> -->
      <div id="myModal" class="modal">
        <span class="close cursor" @click="closeModal()">×</span>
        <div class="modal-content">
            <!--大图-->
            <div class="mySlides" v-for="(img, index) in images" :key="index">
                <img :src="images[index]" >
            </div>
 
            <!--上一张，下一张按钮-->
            <a class="prev" @click="plusSlides(-1)" :class="{'unPrev':slideIndex == 1}"></a>
            <a class="next" @click="plusSlides(1)" :class="{'unPrev':slideIndex == images.length}"></a>
 
            <!-- <div class="caption-container">
                <p id="caption"></p>
            </div> -->
 
        </div>
        <!--小图-->
        <div class="thumbList">
          <div class="column" v-for="(img, index) in images" :key="index" @click="currentSlide(index  + 1)">
            <img class="demo cursor" :src="images[index]" alt="2017流行色-Niagara,尼加拉蓝">
            <div class="mask2" >
              <span class="tip">
                <span class="tip1">{{ index + 1 }}</span> / {{ images.length }}
              </span>
            </div> 
          </div>
        </div>
    
      </div>
    <!-- </el-dialog> -->
</div>

</template>
 
<script>
export default {
  name: 'imgUpload',
  props: {
    maxShow: {
      default:4
    },
    images:{
      default:[]
    }
  },
  data () {
   return {
     slideIndex:1,
    //  images:[
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_bQ502kXGow80KFJXa.jpg',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_eD05guAm1I2c8dpw4.jpg',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_gnxeay4ZQ87gMGsVW.jpg',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_eD05guAm1I2c8dpw4.jpg',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_gnxeay4ZQ87gMGsVW.jpg',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_bQ502kXGow80KFJXa.jpg',
    //   'http://192.168.100.89:8080/domino/view/image?filename=GI_css6Ass5R7fgDBoUD.png',
    //  ],
     centerDialogVisible:false
   }
  },
  mounted(){
    this.showSlides(this.slideIndex)
  },
  methods: {
    /*打开模态框*/
    openModal() {
      // this.centerDialogVisible = true
      document.getElementById('myModal').style.display = "block";
    },
    /*关闭模态框*/
    closeModal() {
      // this.centerDialogVisible = false
      document.getElementById('myModal').style.display = "none";
    },
    // 点击箭头切换图片
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    },
	 
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    },
	 
    showSlides(n) {
      // this.centerDialogVisible = true
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("demo");
      // var captionText = document.getElementById("caption");

      if (n > slides.length) {this.slideIndex = slides.length}
      if (n < 1) {this.slideIndex = 1}

      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block";
      dots[this.slideIndex-1].className += " active";
      // captionText.innerHTML = dots[this.slideIndex-1].alt;
    }
  }
 }
</script>
 
<style lang="stylus">
#picList{
  .column {
    float: left;
    margin:8px 18px 0 0;
  }
  .column:last-child{
    margin-right:0 
  }
  .row > .column {
    position relative
    img{
      width: 59px;
      height: 88px;
    }
    &:hover .picListmaskmask {
      opacity: 1;    
    }
  }
  .readMore{
    width: 59px;
    height: 88px;
    background: url('../assets/images/hs/more.png') no-repeat center  #7E8A95;
  }

  // img.hover-shadow {
  //   transition: 0.3s
  // }

  // .hover-shadow:hover {
  //   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  // }
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  
  
  // 图片遮罩层
  .picListmaskmask{
    cursor pointer
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/images/hs/big.png') no-repeat center rgba(52,65,76,0.80);
    color: #ffffff;
    opacity: 0;
  }
  
  /* 模态框-背景*/
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(52, 65, 76, 0.8)
    text-align center;
  }

  /* 模态框-内容*/
  .modal-content {
      position: relative;
      // background-color: #fefefe;
      margin: auto;
      padding: 0;
      // width: 35%;
      // max-width: 1200px;
  }

  /* 模态框-关闭按钮 */
  .close {
    color: white;
    position: absolute;
    top: 10px;
    right: 25px;
    font-size: 35px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #999;
    text-decoration: none;
    cursor: pointer;
  }

  .mySlides {
    display: none;
    text-align: center;
    img{
      height:498px;
      border: 12px solid #fff;

    }
  }

  .cursor {
    cursor: pointer
  }

  /* 模态框-上一张，下一张按钮 */
  .prev, .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: 56px;
      height: 56px;
      padding: 16px;
      margin-top: -50px;
      color: white;
      font-weight: bold;
      font-size: 20px;
      transition: 0.6s ease;
      border-radius: 3px;
      user-select: none;
      -webkit-user-select: none;
      background url('../assets/images/hs/arrow.png') no-repeat left center;
  }
  .prev{
    left: 10%
    /*水平翻转*/
    -webkit-transform:rotateY(180deg);
    transform:rotateY(180deg);
  }
  /* Position the "next button" to the right */
  .next {
    right:10%
  }
  .unPrev{
    background url('../assets/images/hs/arrow1.png') no-repeat left center;
    cursor: not-allowed;
  }
  /*按钮移上去透明度*/
  // .prev:hover, .next:hover {
  //   background-color: rgba(0, 0, 0, 0.45);
  // }

  /* 图片标签(1/4) */
  // .numbertext {
  //     color: #D13076;
  //     font-size: 16px;
  //     padding: 8px 12px;
  //     position: absolute;
  //     top: 0;
  // }
  // img {
  //   margin-bottom: -4px;
  // }
  .caption-container {
    text-align: center;
    // background-color: black;
    padding: 2px 16px;
    color: white;
  }

  .active + .mask2{
    opacity 1
    display: flex;
  }
  .mask2{
    cursor pointer
    position: absolute;
    top: -5px;
    left: 0;
    width: 96px;
    height: 146px;
    line-height: 146px;
    background: rgba(66, 114, 255, 0.8);
    color: #ffffff;
    opacity: 0;
    // display: flex;
    justify-content:center;
    align-items:center;
    z-index 2
    display none
  }

  /* 上箭头 */
  .mask2:before{
    display:block;
    content:'';
    border-width:6px 6px 6px 6px;
    border-style:solid;
    border-color:transparent transparent rgba(66, 114, 255, 0.8) transparent;
    /* 定位 */
    position:absolute;
    left:45%;
    top:-12px;
  }
  .thumbList {
    display: inline-block;
    margin-top: 60px
    .column {
      position: relative;
      display: block;
      width: 96px;
      height: 141px;
      margin: 10px
      padding 3px;
      // border: 3px solid #fff;
    }
    img {
      position: relative;
      width: 100%;
      height: 100%;
      // left: 0px;
      // top: 0px;
    }
    .column:after{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0px;
      right: 0px;
      border: 3px solid #fff;
      height: 100%;
      z-index 1
      background: rgba(52,65,76,0.45);
    }
    .column:hover{
      &:after{
        background: rgba(255,255,255,0.45);
      }
    }
  }
  .tip{
    color rgba(255,255,255,0.7)  
  }
  .tip1{
    font-size:25px;
    color #fff;
  }
  
}
</style>