<template>
  <!-- <canvas height="17px" ref="mainContent">
  </canvas> -->
<!--   <div class="canvas-x-h-main"> -->
      <canvas ref="mainContent" width="300" height="20" style="border:1px solid #d3d3d3;">
    您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
<!--   </div> -->
<!--   <canvas ref="mainContent" width="140" height="100" style="border:1px solid #000;color: #000;">
  您的浏览器不支持 HTML5 canvas 标签。
  </canvas> -->
</template>
<script>
import html2canvas from 'html2canvas';
export default {
  mounted: function () {
    this.$nextTick(function () {
      this.NAxios()
      // this.jtCall()
    })
  },
  methods: {
    toImg (canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      console.log(canvas.toDataURL("image/png"))
      return image;
    },
    NAxios () {
      // var c=this.$refs.mainContent;
      // var ctx=c.getContext("2d");
      // ctx.font="18px Verdana";
      // // 创建一个渐变
      // var gradient=ctx.createLinearGradient(0,0,c.width,0);
      // gradient.addColorStop("0","#000");
      // gradient.addColorStop("1","#000");
      // // 填充一个渐变
      // ctx.fillStyle=gradient;
      // ctx.fillText("足金手镯",0,16);
      //   var image = c.toDataURL("image/png");



        var c=this.$refs.mainContent
        var ctx=c.getContext("2d");
        ctx.font="bold 14px SimHei";
        ctx.fillStyle = '#000';
        ctx.fillText("足金手镯",10,12);
        var image = c.toDataURL("image/png");
        console.log('看你是什么===--', image)
        this.$emit('getCanvasImg', image)

        // var c=this.$refs.mainContent
        // var ctx=c.getContext("2d");
        // ctx.font="bold 26px SimHei";
        // ctx.fillStyle = 'red';
        // ctx.fillText("足金手镯",10,16);
        // var image = c.toDataURL("image/png");
        // console.log('看你是什么===--', image)


        // var mycanvas = document.getElementById("thecanvas");  
        // var mycanvas = this.$refs.mainContent
        // var ctx=mycanvas.getContext("2d");
        // // ctx.font="14px SimHei";
        // ctx.font="italic small-caps bold 14px SimHei"
        // ctx.fillText("足金",10,10, 17);
        // var image = mycanvas.toDataURL("image/png");
        // console.log('看你是什么', image)
        // var w=window.open('about:blank','image from canvas');  
        // w.document.write("<img src='"+image+"' alt='from canvas'/>");  
        // let _self = this
        // return new Promise((resolve, reject) => {
        //   html2canvas(this.$refs.mainContent).then(canvas => {
        //       console.log('截图出单张图片', canvas)
        //       let dataUrl = canvas.toDataURL('image/jpeg');
        //       _self.$emit('getCanvasImg', dataUrl)
        //       reject(dataUrl)
        //   });
        // })
    },
    jtCall () {
      return new Promise((resolve, reject) => {
        apiCall( this.options, this.url).then((res) => {
          if (res.data.state == 200105) {
            reject(res)
          } else {
            resolve(res)
          }
        })
      })
      let _self = this
      html2canvas(this.$refs.mainContent).then(canvas => {
          console.log('截图出单张图片', canvas)
          let dataUrl = canvas.toDataURL('image/jpeg');
          _self.$emit('getCanvasImg', dataUrl)
      });
      // let _self = this
      // let scale = 2;
      // let node = this.$refs.mainContent
      // let canvas = document.createElement('canvas'); //创建一个canvas节点
      // canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
      // let opts = {
      //     backgroundColor: '#ffffff',
      //     scale: scale, // 添加的scale 参数
      //     canvas: canvas, //自定义 canvas
      //     width: 32, //dom 原始宽度
      //     height: 17,
      //     useCORS: true // 【重要】开启跨域配置
      // };
      // html2canvas(node, opts).then(function (canvas) {
      //     let dataUrl = canvas.toDataURL('image/jpeg');
      //     _self.$emit('getCanvasImg', dataUrl)
      // });
    }
  }
}
</script>
<style>
  .canvas-x-h-main{
    color: #000;
    background-color: #fff;
    height: 300px;
    width: 300px;
    border: 2px solid blue;
  }
</style>