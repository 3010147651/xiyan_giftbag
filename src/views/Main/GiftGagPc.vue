<template>
  <div>
    <div class="nav_top"></div>
    <span class="kong"></span>
    <div class="main">
      <div class="box-1">
        <button style="z-index: 100">
          <span @click="signOut">退出登录</span>
        </button>
        <div class="left-box">
          <div class="admin">
            <img class="user-img" alt="" :src="defaultHeadImgqq" />
            <span class="user-name"> Admin </span>
            <div class="information">
              <i class="el-icon-s-custom"></i>&nbsp; <a href=""> {{ qq }}</a
              >&nbsp; &nbsp;

              <a href="">ID:{{ uid }}</a>
            </div>
          </div>
          <hr
            style="width: 400px; border-top: 1px; color: #f1f1f1; margin: auto"
          />
          <div class="admin_bottom">
            <div class="integral">
              <div class="surplus">
                剩余积分
                <span class="surplus-data">{{ user.integral }}</span>
              </div>
              <hr
                style="
                  height: 80px;
                  border-left: 1px;
                  color: #f1f1f1;
                  margin: 20px auto;
                "
              />
              <div class="reduce">
                消费积分
                <span class="reduce-data">{{ user.spend }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right-box">
          <p>功能列表 ---</p>
          <div class="service">
            <ul>
              <li @click="cammyCz">
                <a href="javascript:;"><i class="el-icon-coin"></i>积分充值</a>
              </li>
              <li @click="cammyCx">
                <a href="javascript:;">
                  <i class="el-icon-zoom-in"></i>卡密查询</a
                >
              </li>
              <li @click="lqjl">
                <a href="javascript:;">
                  <i class="el-icon-s-goods"></i>领取记录</a
                >
              </li>
              <li @click="gg">
                <a href="javascript:;"> <i class="el-icon-bell"></i>消息通知</a>
              </li>
              <li @click="tolink">
                <a href="javascript:;">
                  <i class="el-icon-share"></i>接口文档</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="box-2">
        <div v-for="(item, index) of giftBagList" :key="index">
          <div class="gift">
            <div class="slide">
              <ul class="img-list">
                <li><img :src="item.giftImage" class="imgs" /></li>
              </ul>
            </div>

            <div class="explain">
              <hr
                style="
                  width: 280px;
                  border-top: 1px;
                  color: #f1f1f1;
                  margin: 10px auto;
                "
              />
              <div class="receive">
                <p>{{ item.giftTitle }}</p>
                <button @click="greet(item.method)">领取</button>
              </div>
              <p>
                注:需花费{{ item.giftIntegral }}积分--到账时间:{{
                  item.giftTime
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {getLoveQQ, receiveGreen} from "@/api/getCammy.js";
import { receiveGreen7 } from "@/api/getCammy.js";
import { queryGiftBagAll } from "@/api/getCammy.js";
import { queryGiftBagAllByName } from "@/api/getCammy.js";
import CommonFooter from "@/components/CommonFooter";
import { getHeadImage } from "@/api/getQQ.js";
import { queryUserNews } from "@/api/getCammy.js";
export default {
  components: { CommonFooter },
  data() {
    return {
      uid: "",
      qq: "",
      giftBagList: [{}],
      drawer: false,
      tit: "",
      isactivi: false,
      place: "",
      placeList: ["超级会员", "豪华绿钻"],
      user: {
        integral: null,
        spend: null,
      },
      info: {},
      defaultHeadImgqq: "",
    };
  },
    mounted() {
         window.ydly = this.ydly;
    //屏幕自适应
     if (/Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(navigator.userAgent) && navigator.userAgent.indexOf("QQ/") == -1) {
                 this.$router.push({ path: "/gift_bag" });
            } else {

            }

    this.qq = localStorage.getItem("qq");
    this.uid = localStorage.getItem("uid");
    this.getQueryUserNews();
    this.getHeadImageqq();
    this.queryGiftBagAll();
    this.place = this.placeList[Math.round(Math.random())];
  },
  methods: {

     ydly(){
        this.$router.push({ path: "/gift_bag" });
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
      console.log(res);
      this.giftBagList = res.data.data;

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

    gg() {
      this.$router.push({ path: "/Information" });
    },
    lqjl() {
      this.$router.push({ path: "/order" });
    },
    cammyCz() {
      this.$router.push({ path: "/recharge" });
    },
    cammyCx() {
      this.$router.push({ path: "/cammyquery" });
    },
    tolink() {
      this.$router.push({ path: "/api" });
    },
    // 获取QQ头像
    getHeadImageqq() {
      this.defaultHeadImgqq =
        " https://q1.qlogo.cn/g?b=qq&nk=" +
        localStorage.getItem("qq") +
        "&s=100";
    },

    //查询用户积分信息
    async getQueryUserNews() {
      const result = await queryUserNews(localStorage.getItem("qq"));
      this.user = result.data.data;
      localStorage.setItem("uid", result.data.data.id);
    },

    //获取用户信息
    async getInfo() {
      try {
        const result = await getHeadImage(localStorage.getItem("qq"));
        console.log(result);
        // this.defaultHeadImg = result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    //退出登录
    async signOut() {
      console.log(123);
      try {
        //删除token
        await this.$store.dispatch("clearToken");

        localStorage.removeItem("qq");
        localStorage.removeItem("token");
        //刷新页面
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },


  },


};
</script>



<style scoped>
.imgs {
  width: 100%;
  height: 100%;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #000000;
}

button {
  color: #ffffff;
  border: none;
  border-radius: 5px;
  background-color: #6699ff;
}

.nav_top {
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 5px 5px rgba(0 0 0 / 10%);
  position: fixed;
  z-index: 100;
}

/*设置版芯*/
.main {
  margin: auto;
  width: 1020px;
}

.kong {
  display: block;
  width: 100%;
  height: 70px;
}

.box-1 {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.box-1 button {
  height: 25px;
  position: absolute;
  top: 20px;
  left: 400px;
}

.box-1 .left-box,
.box-1 .right-box {
  width: 500px;
  height: 250px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0 0 0 / 10%);
}

.box-1 .left-box .admin,
.box-1 .left-box .admin_bottom {
  height: 124px;
  position: relative;
}

.box-1 .left-box .admin .user-img {
  width: 65px;
  height: 65px;
  background-color: #6699ff;
  margin: 30px 20px 0 30px;
}

.box-1 .left-box .admin .user-name {
  font-size: 20px;
  position: absolute;
  top: 35px;
}

.box-1 .left-box .admin .information {
  display: flex;
  align-items: center;
  position: absolute;
  top: 65px;
  left: 115px;
}

.box-1 .left-box .admin .information img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.box-1 .left-box .admin_bottom .integral {
  display: flex;
}

.box-1 .left-box .admin_bottom .integral > .surplus,
.reduce {
  width: 250px;
  font-size: 16px;
  color: #919191;
  text-align: center;
  margin-top: 20px;
  position: relative;
}

.box-1 .left-box .admin_bottom .surplus .surplus-data,
.box-1 .left-box .admin_bottom .reduce .reduce-data {
  font-size: 30px;
  color: #6699ff;
  position: absolute;
  top: 30%;
  left: 45%;
}

.service {
  position: relative;
}
.right-box p {
  margin: 10px;
  font-size: 18px;
}
.right-box .service ul {
  margin: 20px 10px 0 20px;
}

.right-box .service ul li {
  float: left;
  width: 150px;
  height: 50px;

  position: relative;
}
.right-box .service ul li a {
  font-size: 16px;
  color: #919191;
  position: absolute;
  left: 50px;
  top: 15%;
}

.box-2 {
  background-color: #ffffff;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0 0 0 / 10%);
  display: flex;
  flex-wrap: wrap;
}

.box-2 .gift {
  width: 280px;
  padding: 30px;
}

.box-2 .gift .slide {
  height: 160px;
  border-radius: 10px;
  background-color: #919191;
}

.box-2 .gift .slide:hover {
  box-shadow: 0 0 10px rgba(0 0 0 / 50%);
}

.box-2 .explain .receive {
  display: flex;
  justify-content: space-between;
}

.box-2 .explain .receive button {
  width: 50px;
  height: 25px;
}

.box-2 .explain > p {
  font-size: 10px;
  color: #dadada;
}
</style>