<template>
  <div class="box_lb">
    <div class="menu_box">
      <!-- <i @click="drawer = true" class="el-icon-s-unfold menu"></i> -->
      <div class="menu_box_sm">
        <div class="ipt">
          <div @click="sm" class="ewms">
            <img src="@/assets/123.png" alt="" />
          </div>
          <input
          @focus = "iptFocus"
          @blur= "iptBlur"
            ref="sousuo"
            id="search"
            :placeholder="place"
            type="text"
            v-model="tit"
            class="search"
          />
          <div @click="queryGiftBagAllByName" class="ssuo">搜索</div>
        </div>
      </div>
    </div>

    <el-drawer title="菜单" :visible.sync="drawer" direction="ltr">
      <span>我来啦!</span>
    </el-drawer>

    <div class="card-box" v-for="(item, index) of giftBagList" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ item.giftTitle }}</span>

  <router-link :to="{path:'/gift_details',query:{shop_id:item.iden}}" >
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            >领取</el-button
          >
           </router-link>

              <!-- @click="greet(item.method)" -->
        </div>
        <div v-for="o in 1" :key="o" class="text item">
          <div class="time-box">
            <el-tag>需要花费积分:{{ item.giftIntegral }}</el-tag>
            <el-tag class="time" type="success"
              >到账时间: {{ item.giftTime }}</el-tag
            >
          </div>
          <div>
            <div class="block">
              <img :src="item.giftImage" class="imgs" />
            </div>
          </div>
        </div>
      </el-card>
    </div>

   
    <div class="cf">
      <common-footer></common-footer>

      <div class="divs" v-if="isactivi">
        <cube-loading class="ld" :class="{ active: isactivi }"></cube-loading>
      </div>
    </div>
  </div>
</template>



<script>


// sea.onblur = function () {};



import { receiveGreen } from "@/api/getCammy.js";
import { receiveGreen7 } from "@/api/getCammy.js";
import { queryGiftBagAll } from "@/api/getCammy.js";
import { queryGiftBagAllByName } from "@/api/getCammy.js";
import CommonFooter from "@/components/CommonFooter";
export default {
  components: { CommonFooter },
  data() {
    return {
      a:1,
      giftBagList: [{}],
      drawer: false,
      tit: "",
      isactivi: false,
      place: "",
      placeList: ["超级会员", "豪华绿钻"],
    };
  },
 
  methods: {

    iptFocus(){
     this.place = ""
    },

    iptBlur(){
       this.place = this.placeList[Math.round(Math.random())];
    },

    //点击事件方法分配
    greet: function (event) {
      this[event].call();
    },
    

    sm() {
      this.$router.push({ path: "/qrcode" });
    },

    //获取礼包列表
    async queryGiftBagAll() {
      const res = await queryGiftBagAll();
      this.giftBagList = res.data.data;
      console.log(this.giftBagList);
    },

    //模糊查询
    async queryGiftBagAllByName() {
      console.log(this.tit);
      this.tit == "" ? (this.tit = this.place) : "";

      const res = await queryGiftBagAllByName(this.tit);
      this.giftBagList = res.data.data;
      this.giftBagList[0] == undefined
        ? this.open("您输入的关键字无对应礼包", "error")
        : "";
    },

    //成功消息
    open(message, type) {
      this.$message({
        message: message,
        type: type,
      });
    },

    //领取svip
    getSvipTwo() {
      this.$router.push({ path: "/main" });
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

    //七天

    async getGreenSeven() {
      this.isactivi = true;
      if (localStorage.getItem("token") == null) {
        this.isactivi = false;
        this.open("未登录,请扫码登录后再来领取吧", "error");
        this.$router.push({ path: "/qrcode" });
      } else {
        try {
          const result = await receiveGreen7(localStorage.getItem("token"));

          this.isactivi = false;
          const rows = result.data.code;

          switch (rows) {
            case 0:
              this.open("领取成功", "success");
              break;
            case -1:
              this.open("已经领取过了", "error");
              // localStorage.removeItem("token");
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
    pcly() {
      this.$router.push({ path: "/gift_bagpc" });
    },
  },

  mounted() {

    window.pcly = this.pcly;
    //屏幕自适应
    if (
      /Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(
        navigator.userAgent
      ) &&
      navigator.userAgent.indexOf("QQ/") == -1
    ) {
    } else {
      this.$router.push({ path: "/gift_bagpc" });
    }

    this.queryGiftBagAll();
    this.place = this.placeList[Math.round(Math.random())];
  },
};
</script>



<style lang="scss" scoped>
.ewms {
  float: left;
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 25px;
    height: 25px;
  }
}
.ipt {
  width: 100%;
  height: 35px;
  border-radius: 30px;
  border: 1px solid #000000;
  input {
    outline: none;
    height: 100%;
    width: 50%;
    border: 2px;
    margin-left: 5px;
  }
}

.ssuo {
  width: 80px;
  height: 100%;
  background-color: rgb(41, 44, 54, 0.9);
  display: inline-block;
  border-radius: 30px;
  float: right;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu_box_sm {
  width: 90%;
}
.menu_box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;

  background-color: #ffffff;
  z-index: 100;
}

.menu {
  background-color: rgba(247, 243, 243, 0.1) !important;
  position: absolute;
  left: 10px;
  top: 10px;
  color: #ffffff;
}

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
  top: 2%;
}

.cf {
  margin: 0px !important;
}
.time-box {
  margin-bottom: 10px;
}
.time {
  float: right;
}
.box_lb {
  width: 100%;
  padding-bottom: 10px;
  position: relative;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.card-box {
  width: 90%;
  margin: 10px auto;

  border-radius: 20px;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 12px 0 rgb(0 0 0 / 30%) !important;
}
.box-card {
  width: 300px;
  margin: auto;
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
.imgs {
  width: 100%;
  height: 100%;
}

.el-card__body1 {
  padding: 10px !important;
}
</style>

<style>
.el-card {
  border: 0px !important;
}

.el-card__header {
  padding: 8px 20px !important;
  line-height: 20px;
  font-weight: 900;
}

.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 0px 0px 0 rgb(0 0 0 / 30%) !important;
}
</style>
