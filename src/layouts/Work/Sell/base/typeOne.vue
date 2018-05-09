<template>
  <div class="sell-type-one-main">
      <div class="dia-title" slot="title">
          <img src="~static/img/piliang.png">
          <h3>选择录入方式</h3>
      </div>
      <div class="list-wrap first-wrap">
          <div class="btn-wrap">
              <li @click="dropdownEvents(1)">回收（旧料）</li>
              <li @click="dropdownEvents(2)">换货（旧料）</li>
          </div>
      </div>
      <div class="footer">

      </div>
  </div>
</template>
<script>
export default {
  methods: {
    dropdownEvents (parm) {
      this.$emit('dropdownEvents', parm)
    }
  }
}
</script>
<style lang="scss" scoped>
.sell-type-one-main {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 10;
    .dia-title {
        width: 78px;
        position: absolute;
        top:24px;
        left: 50%;
        margin-left: -39px;
        img {
            display: block;
            margin: 0 auto;
            width: 46px;
            height: 46px;
            margin-bottom: 12px;
        }
        h3 {
            font-size: 12px;
            color:#333;
            text-align: center;
        }
    }
    .list-wrap {
        width: 320px;
        height: 271px;
        padding-top: 180px;
        margin-bottom: 130px;
        .btn-wrap {
            width: 180px;
            // height: 70px;
            margin: 0 auto;
            li {
                display: block;
                height: 40px;
                font-style: normal;
                text-align:center;
                background-color: rgb(244, 244, 244);
                color: #2993f8;
                // background: #2993f8;
                // color:#fff;
                font-size: 14px;
                line-height: 40px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.6s;
                &:hover{
                    background: #2993f8;
                    color: #fff;
                }
            }
            li:nth-child(2) {
                margin-top: 40px;
                // color: #2993f8;
               // background-color: rgb(244, 244, 244);
            }
        }
        .left-list {
            width: 108px;
            height: 100%;
            border-right: 1px solid #f1f2f3;
            float: left;
            overflow-x: hidden;
            overflow-y: auto;
            li {
                width: 108px;
                height: 41px;
                border-bottom: 1px solid #f1f2f3;
                line-height: 41px;
                font-size: 14px;
                color:#333;
                text-align: center;
                cursor: pointer;
                .active-block {
                    display: none;
                }
            }
            li:hover {
                background:#f6f7f8;
                color: #2993f8;
            }
            li.active {
                .active-block {
                    display: block;
                    height: 100%;
                    float: left;
                    width: 3px;
                    background:#2993f8;
                }
            }
        }
        .right-list {
            width: 211px;
            height: 100%;
            float: left;
            overflow-x: hidden;
            overflow-y: auto;
            li {
                width: 192px;
                height: 41px;
                line-height: 41px;
                font-size: 14px;
                color:#333;
                cursor: pointer;
                margin-left: 19px;
            }
            li:hover {
                background:#f6f7f8;
                color: #2993f8;
            }
            li.active {
                color:#2993f8;
            }
        }
    }
    .footer {
        height: 50px;
        width: 100%;
        float: left;
        border-top: 1px solid #f1f2f3;
        padding-left: 22px;
        padding-right: 22px;
        line-height: 50px;
        padding-top: 0;
        background:#fff;
        .footer-left {
            height: 100%;
            float: left;
            font-size: 14px;
            color:#999999;
            cursor: pointer;
        }
        .footer-right {
            height: 100%;
            float: right;
            span {
                float: left;
                font-size: 14px;
                cursor: pointer;
                color: #333;
            }
            span:nth-child(1) {
                margin-right: 15px;
                color: #999;
            }
        }
    }
}
</style>