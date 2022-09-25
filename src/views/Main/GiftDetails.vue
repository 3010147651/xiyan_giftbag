<template>
  <div>
    <!-- 页头 -->
    <div class="head">
      <common-head inputName="礼包详情"></common-head>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <img :src="shopDetail.giftImage" alt="" />
    </div>
    <!-- 商品名称 -->
    <div class="shopName">
      <p>{{ shopDetail.giftTitle }}</p>
      <div class="shopName_d">
        <span>{{ shopDetail.giftIntegral }}积分</span>
        <div>库存:无限</div>
      </div>
    </div>

    <!-- 领取条件 -->
    <div class="condition">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>领取条件</span>
        </div>
        <!-- <div v-for="o in introduce" :key="o" class="text item">
          {{ shopDetail.cv1 }}
        </div> -->
        <div class="text item">
           {{ shopDetail.cv1 }}
        </div>
      </el-card>
    </div>
    <!-- 礼包介绍 -->
    <div class="condition">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>礼包介绍</span>
        </div>
        <!-- <div v-for="o in condition" :key="o" class="text item">
          {{ shopDetail.cv2 }}
        </div> -->
          <div class="text item">
           {{ shopDetail.cv2 }}
         
        </div>
  <!-- {{ shopDetail.cv2 }} -->
       
      </el-card>
    </div>

    <div class="btn-duihuan">
      <!-- <button style="background-color: #67C23A; border-color:#67C23A;"></button>
        <button style="background-color: #409EFF; border-color:#409EFF;"></button> -->
      <el-button type="success" round>积分充值</el-button>
      <el-button type="primary" @click="greet(shopDetail.method)" round
        >立即兑换</el-button
      >
    </div>

    <div class="divs" v-if="isactivi">
      <cube-loading class="ld" :class="{ active: isactivi }"></cube-loading>
    </div>
  </div>
</template>

<script>
import CommonHead from "@/components/CommonHead";
import { hqDetail, receiveGreen, getLoveQQ } from "@/api/getCammy.js";
export default {
  components: {
    CommonHead,
  },
  data() {
    return {
      isactivi: false,

      condition: [
        "兑换须知：虚拟权益兑换后不可退换",
        "到账时间：点击领取秒到账",
        "兑换次数：每个账号一个月可以领取一次",
      ],
      introduce: ["无限制，任意QQ号均可领取"],

      shopDetail: {},
    };
  },

  methods: {
    async hqDetails(iden) {
      const shopDetail = await hqDetail(iden);
      this.shopDetail = shopDetail.data.data;
    },

    //成功消息
    open(message, type) {
      this.$message({
        message: message,
        type: type,
      });
    },

    //点击事件方法分配
    greet: function (event) {
      this[event].call();
    },

    //领取3天绿钻
    async getGreenThree() {
      this.isactivi = true;
      if (localStorage.getItem("token") == null) {
        this.isactivi = false;

        this.open("未登录,请扫码登录后再来领取吧", "error");
        this.$router.push({ path: "/qrcode" });
      } else {
        try {
          const result = await receiveGreen(localStorage.getItem("token"));
          this.isactivi = false;
          const rows = result.data.code;
          console.log(rows);
          switch (rows) {
            case 0:
              this.open("领取成功", "success");
              break;
            case -1:
              this.open("登陆信息过期,请重新扫码登录", "error");
              localStorage.removeItem("token");
              break;
            case -2:
              this.open("库存不足，请稍等会再来领取吧", "error");
              break;
            case -3:
              this.open("积分不足", "error");
              break;
            case -4:
              this.open("请使用当前登录的QQ扫码", "error");
              break;
            case -5:
              this.open("登陆信息过期,请重新扫码登录", "error");
              localStorage.removeItem("token");
              break;
            case -8:
              this.open("领取上限,下个月再来吧", "");
              break;

            default:
              return JsonData.buildError("未知错误,请反馈人工处理", -10);
          }
        } catch (error) {
          this.isactivi = false;
          this.open("登陆信息过期,请重新扫码登录", "error");

          this.$router.push({ path: "/qrcode" });
          localStorage.removeItem("token");
        }
      }
    },

    //领取情侣黄砖
    async getLoveQQ() {
      if (localStorage.getItem("token") == null) {
        this.isactivi = false;

        this.open("未登录,请扫码登录后再来领取吧", "error");
        this.$router.push({ path: "/qrcode" });
      } else {
        try {
          const result = await getLoveQQ(localStorage.getItem("token"));
          this.isactivi = false;
          const rows = result.data.data;
          console.log(rows);
          switch (rows) {
            case 0:
              this.open("配对成功,情侣黄砖已点亮", "success");
              break;
            case -10:
              this.open("你已经提交了邀请", "error");
              break;
              case -3:
              this.open("积分不足", "error");
              break;
            case -3000:
              this.open("登陆信息过期,请重新扫码登录", "error");
              localStorage.removeItem("token");
              break;
            case -1:
              this.open("登陆信息过期,请重新扫码登录", "error");
              localStorage.removeItem("token");
              break;
            case 1:
              this.open("提交成功，6小时内会到哦", "success");
              break;
            default:
              this.open("提交成功，6小时内会到哦", "success");
          }
        } catch (error) {
          this.isactivi = false;
          this.open("登陆信息过期,请重新扫码登录", "error");

          this.$router.push({ path: "/qrcode" });
          localStorage.removeItem("token");
        }
      }
    },
  },

  mounted() {
    this.hqDetails(this.$route.query.shop_id);
  },
};
</script>

<style lang="scss" scoped>
.divs {
  position: absolute;
  left: 0%;
  top: 0%;

  background-color: rgba(225, 225, 225, 0.4);
  width: 100%;
  height: 1000px;
  z-index: 1000;
}

.ld {
  position: absolute;
  left: 50%;
  top: 30%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.head {
  // display: flex;
  // align-items: center;
  // height: 60px;
}
.banner {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  height: 300px;
  width: 100%;

  img {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%) !important;
    border-radius: 8px;
    width: 90%;
    height: 100%;
  }
}

// 领取条件
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  span {
    font-size: 120%;
    font-weight: 900;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.condition {
  margin: 10px auto;
  width: 95%;
  border-radius: 20px;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 12px 0 rgb(0 0 0 / 15%) !important;
}
// 兑换按钮
.btn-duihuan {
  button {
    color: #fff;
    padding: 12px 39px;
    border-radius: 20px;
  }
  padding: 30px 0px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
// 商品名字
.shopName {
  height: 100px;
  // display: flex;
  // align-items: center;
  p {
    margin: 30px;
    font-weight: 900;
    font-size: 150%;
  }
}
.shopName_d {
  padding: 0px 30px;
  display: flex;
  justify-content: space-between;
  span {
    color: #0086f5;
    font-size: 120%;
    font-weight: 700;
  }
  div {
    display: inline-block;
  }
}
</style>>



<style>
/* .el-icon-arrow-right {
  position: absolute;
  right: 10px !important;
  bottom: 10px;
} */
</style>