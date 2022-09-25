<template>
  <div>
    <common-head></common-head>
    <div class="main">
      <div class="divs" :class="{ divs1: isactivi }">
        <cube-loading class="ld" :class="{ active: isactivi }"></cube-loading>
      </div>

      <el-steps :active="active" simple>
        <el-step title="1.扫码" icon="el-icon-picture"></el-step>
        <el-step title="2.登录成功"></el-step>
      </el-steps>

      <div style="height: 50px"></div>

      <img @click="getCodeImg" :src="imgdata" class="item_img" />
      <div style="height: 20px"></div>
      <!-- <div class="box2">
      <button class="cube-btn" @click="getmonitors">领取7天绿钻</button>
     <button class="cube-btn" @click="toLink">权限二维码</button>
    </div> -->

      <div style="height: 20px"></div>
      <el-descriptions class="margin-top" title="" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            当前登录状态
          </template>
          <font style="color: red"> {{ ifLogin }}</font>
        </el-descriptions-item>
      </el-descriptions>
      <div style="height: 20px"></div>

      <div style="height: 30px"></div>
      <div>
        <!-- <el-carousel :interval="6000" type="card" height="200px">
          <el-carousel-item v-for="item in tishi" :key="item">
            <p>{{ item.txt }}</p>
          </el-carousel-item>
        </el-carousel> -->
      </div>

      <div class="box2">
        <!-- <router-link to="/login" class="reg">权限二维码</router-link> -->
      </div>
      <hr />

      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title"
            >一、为什么二维码扫不出来？<i class="header-icon el-icon-info"></i>
          </template>
          <div>直接截图使用QQ扫码是扫不出来的，这个是官方限制的</div>
          <div>1.可以使用另一台手机对着扫码,或者电脑</div>
          <div>2.如果你要截图扫码，请使用Tim扫码</div>
        </el-collapse-item>
        <el-collapse-item title="二、怎么刷新二维码？">
          <div>点击二维码图片即可刷新二维码</div>
        </el-collapse-item>
        <el-collapse-item title="三、领取的礼包都是哪里的，安全吗？">
          <div>领取的礼包都来自于官方的各种隐藏任务活动，都是正规的</div>
        </el-collapse-item>
        <el-collapse-item title="帮助">
          <div>
            亲亲，每次操作都有弹窗提示，自己看弹窗提示操作就好哦，不要都不看就去问客服，每天都有几万人使用本系统，客服很忙的
          </div>
        </el-collapse-item>
      </el-collapse>

      <!-- <div >
      <p>1.活动2月28号结束，请在活动结束之前来这里领取</p>
      <p>2.如果服务器一直请求失败，可以尝试把WiFi切换为数据网络</p>
      <p style="color: red">
        亲亲，每次操作都有弹窗提示，自己看弹窗提示操作就好哦，不要都不看就去问客服，每天都有几万人使用本系统，客服很忙的
      </p>
      <p></p>
      <hr />
    </div> -->
    </div>
  </div>
</template>

<script>
import { getUserById } from "@/api/getCammy.js";
// import { getCode } from "@/api/getLogin.js";
// import { getmonitor } from "@/api/getLogin.js";
import CommonHead from "@/components/CommonHead";
import { getCode } from "@/api/getCammy.js";
import { inspectCode } from "@/api/getCammy.js";
import { receiveGreen7 } from "@/api/getCammy.js";

export default {
  components: {
    CommonHead,
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff843acd01d1d197069d126a23fe0e9810dfd4eaad8f9-kFeZfw_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648175490&t=c5134463beeb44ddae725af98877ac96) "
      );
  },

  data() {
    return {
      timer: null,
      ifLogin: "未登录",

      tishi: [
        {
          txt: "1.每隔两秒系统会自动检测一次，如果检测登录成功，再返回去领取svip",
        },
        {
          txt: "  2.如果你登录成功了，在这个页面多等几秒，没有检测登录成功，就不要返回",
        },
        {
          txt: "  3.因为部分人没有权限，所以需要多扫一下这个权限二维码",
        },
      ],

      drawer: false,
      direction: "ltr",
      active: 0,
      qrsig: "",
      imgdata: "",
      code: 3,
      isactivi: true,
      //true 不显示
    };
  },

  //定义方法
  methods: {
    //获取二维码
    async getCodeImg() {
      this.isactivi = false;
      try {
        //await:等待异步请求完成,加了这个最外层要加async
        const result = await getCode();
        this.$message({
          message: "获取二维码成功",
          type: "success",
        });

        //     console.log(result);
        this.isactivi = true;
        localStorage.setItem("qrsig", result.data.data.qrsig);
        this.imgdata = result.data.data.imgBase64;
        //  this.qrsig = result.data.qrsig;
      } catch (error) {
        this.isactivi = true;
        this.$message({
          message: "当前人数较多,服务器爆满,可以尝试刷新页面,重新获取二维码",
          type: "warning",
        });

        return false;
      }
    },

    //七天
    //  async lqGreen7() {

    //   if (localStorage.getItem("token") == null) {

    //     // this.$router.push({ path: "/qrcode" });
    //   } else {
    //     try {
    //       const result = await receiveGreen7(localStorage.getItem("token"));

    //       const rows = result.data.code;
    //       console.log(result)
    //       switch (rows) {
    //         case 0:
    //           alert("领取成功")
    //           this.open("领取成功", "success");
    //           break;
    //         case -1:
    //           alert("你已经领取过了")
    //           this.open("已经领取过了", "error");
    //           // localStorage.removeItem("token");
    //           break;

    //         default:
    //           return JsonData.buildError("未知错误,请反馈人工处理", -10);
    //       }
    //     } catch (error) {

    //       console.log(error);
    //     }
    //   }
    // },

    //二维码监控
    detectFor() {
      this.timer = setInterval(() => {
        this.getmonitors();
      }, 3000);
    },

    //二维码监控
    async getmonitors() {
      try {
        const result = await inspectCode(localStorage.getItem("qrsig"));
        if (result.data.code == 0) {
          this.ifLogin = "扫码登陆成功！";
          console.log(result.data.data);
          localStorage.setItem("token", result.data.data);

          //关闭定时器
          clearInterval(this.timer);
          this.active = 2;
          const toast = this.$createToast({
            txt: "登录成功",
            type: "xxx",
            time: 1500,
          });

          toast.show();
        } else {
          const toast = this.$createToast({
            txt: (result.data.msg).match(/[\u4e00-\u9fa5]+/g)[0],
            type: "xxx",
            time: 1500,
          });
          toast.show();
        }
      } catch (error) {
        console.log("bug");
      }
    },
  },

  //页面创建好执行的方法
  mounted() {
    this.getCodeImg();

    if (localStorage.getItem("token") != null) {
       this.active=2;
      this.ifLogin = "已登录,无需扫码";
    } else {
      this.detectFor();
    }
  },

  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
    }
  },
};
</script>


<style lang="scss" scoped>
.menu {
  background-color: rgba(247, 243, 243, 0.1) !important;
  position: absolute;
  left: 10px;
  top: 10px;
}
.item_img {
  font-size: 0; //消除图片元素产生的间隙
  box-shadow: 0 4px 11px 0 rgba(43, 51, 59, 0.6); //设置图片阴影，rgba前三个参数是颜色编码，最后一个是透明度
  border-radius: 8px; //设置图片圆角
}

img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
}
p {
  margin: 15px;
  line-height: 30px;
  font-size: 15px;
}

.main {
  padding: 50px 5% 0;
  text-align: center;
}
//注册
.cube-btn {
  margin: 10px;
  margin-top: 20px;
}
// 登录
.reg {
  display: inline-block;
  margin-top: 30px;
  font-size: 18px;
}
.ld {
  position: absolute;
  left: 50%;
  top: 2%;
}
.active {
  display: none;
}
.divs1 {
  display: none;
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
.box2 {
  display: flex;
}
</style>

<style>
.el-col.el-col-12 {
  width: 100% !important;
}

.el-drawer.ltr {
  width: 200px !important;
}
.el-drawer {
  background-color: #545c64 !important;
}

::-webkit-scrollbar {
  display: none;
}

.el-menu {
  border-right: solid 1px #545c64;
}

.cf {
  margin: 0px !important;
}
</style>