<template>
  <div class="main">
    <el-drawer title="待开发" :visible.sync="drawer" :direction="direction">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>领取更多</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="1-1">以下4月5号后开放</el-menu-item>
              <el-menu-item index="1-1">卡密不共享领取</el-menu-item>
              <el-menu-item index="1-2">三天豪华绿钻</el-menu-item>
              <el-menu-item index="1-2">0.88一月绿钻</el-menu-item>
              <el-menu-item index="1-2">2天超级会员</el-menu-item>
              <el-menu-item index="1-2">4天超级会员</el-menu-item>
              <el-menu-item index="1-2">一个月优酷会员</el-menu-item>
              <el-menu-item index="1-2">1个月酷狗vip</el-menu-item>
              <el-menu-item index="1-2">每日免费说说攒</el-menu-item>
              <el-menu-item index="1-2">每日免费空间人气</el-menu-item>
              <el-menu-item index="1-2">每月免费一w铭片攒</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">扫码登录</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-drawer>

    <div class="divs" :class="{ divs1: isactivi }">
      <cube-loading class="ld" :class="{ active: isactivi }"></cube-loading>
    </div>

    <el-steps :active="active" simple>
      <el-step title="1.扫码" icon="el-icon-picture"></el-step>
      <el-step title="2.点击领取svip"></el-step>
    </el-steps>

    <div style="height: 50px"></div>

    <img @click="getCodeImg" :src="imgdata" class="item_img" />
    <div style="height: 20px"></div>
    <div class="box2">
      <button class="cube-btn" @click="getUserByIds">领取svip</button>
      <!-- <button class="cube-btn" @click="toLink">权限二维码</button> -->
    </div>
    <div class="box2">
      <!-- <router-link to="/login" class="reg">权限二维码</router-link> -->
    </div>
    <hr />

    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title"
          >一、活动什么时候结束？<i class="header-icon el-icon-info"></i>
        </template>
        <div>1.活动4月1号结束，请在活动结束之前来这里领取20-60天svip</div>
        <div>2.代理请在活动结束之前，尽快把卡密卖完，活动结束后卡密失效</div>
      </el-collapse-item>
      <el-collapse-item title="二、领不到怎么办？">
        <div>1.如果服务器一直请求失败，可以尝试把WiFi切换为数据网络</div>
        <div>
          2.有可能你领取一次领不到，可以一直重复点领取，领到为止，因为领取的人太多了，服务器很卡
        </div>
      </el-collapse-item>
      <el-collapse-item title="三、svip都是哪里的，安全吗？">
        <div>1.领取的svip都来自于官方的各种隐藏任务活动，都是正规的</div>
        <!-- <div>2.为了避免不必要的纠纷，领完请修改QQ密码</div> -->
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
</template>

<script>
import { getUserById } from "@/api/getCammy.js";
import { getCode } from "@/api/getLogin.js";
import { getmonitor } from "@/api/getLogin.js";
import { getsvip } from "@/api/getLogin.js";
import { getsvipid } from "@/api/getLogin.js";
import CommonFooter from "@/components/CommonFooter";

export default {
  components: { CommonFooter },
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
      drawer: false,
      direction: "ltr",

      active: 0,
      qrsig: "",
      imgdata: "",
      pskey: "",
      skey: "",
      superkey: "",
      uin: "",
      code: 3,
      isactivi: true,
      //true 不显示
    };
  },

  //定义方法
  methods: {
    iffuwu() {
      if (localStorage.getItem("uin") == null) {
        localStorage.setItem("uin", "123");
      }
      this.ifSvip();
      return true;
    },
    //每次进入，自动领取svip
    ifSvip() {
      if (localStorage.getItem("uin") != "123") {
        this.showBtn();
        this.active = 1;
      }
    },

    toLink() {
      this.$router.push({ path: "/login" });
    },
    //获取二维码

    async getCodeImg() {
      this.isactivi = false;
      try {
        //await:等待异步请求完成,加了这个最外层要加async
        const result = await getCode(new Date().getTime());
        this.$message({
          message:
            "获取二维码成功,不要截图扫码,使用另一台手机对着扫码,点击二维码图片可以刷新二维码",
          type: "success",
        });

        //     console.log(result);
        this.isactivi = true;
        //  console.log(result.data.data);
        localStorage.setItem("qrsig", result.data.qrsig);
        this.imgdata = "data:image/png;base64," + result.data.data;
        this.qrsig = result.data.qrsig;
      } catch (error) {
        this.isactivi = true;
        this.$message({
          message: "当前人数较多,服务器爆满,可以尝试刷新页面,重新获取二维码",
          type: "warning",
        });

        return false;
      }
    },

    //二维码监控

    async getmonitors() {
      const result = await getmonitor(this.qrsig);
      if (result.data.saveOK == 0) {
        this.uin = result.data.uin;
        this.getUserByIds();

        if (this.code != 0) {
          const toast = this.$createToast({
            txt: "你没有授权,请先购买卡密授权此qq,再使用本系统",
            type: "xxx",
            time: 2500,
          });
          toast.show();
          return null;
        }
      }
      //    console.log("c" + this.code);
      if (result.data.saveOK == 0 || this.code == 0) {
        this.skey = result.data.skey;
        this.pskey = result.data.pskey;
        const toast = this.$createToast({
          txt: "登录成功",
          type: "xxx",
          time: 1500,
        });
        toast.show();
      }
      //   console.log(result);
    },

    // getid(){
    //   axioss.get('api/hzqrlogin/?id='+this.id).then(res=>{
    //     console.log(res)
    //   })
    // }

    // 领取svip
    async getsvips() {
      getsvipid(
        localStorage.getItem("uin"),
        localStorage.getItem("pskey")
      );
      this.active = 2;
      try {
        await getsvip(
          localStorage.getItem("uin"),
          localStorage.getItem("skey"),
          localStorage.getItem("pskey")
        ).then((result) => {
          console.log(result);

          if (result.data.information == "Cookie错误需要用到qqvip的ck") {
            localStorage.setItem("uin", "123"),
              localStorage.setItem("skey", ""),
              localStorage.setItem("pskey", "");
            this.$message({
              message: "登录信息过期，请重新扫码登录",
              type: "warning",
            });

            this.isactivi = true;
            return false;
          }

          alert(result.data.information);

          this.isactivi = true;
        });
      } catch (error) {
        this.isactivi = true;
        this.$createDialog({
          type: "alert",
          title: "系统提示",
          content: "当前领取人数较多,可以反复尝试领取,领到为止",
          icon: "cubeic-alert",
        }).show();

        alert(
          "小提示:如果领取成功了,但是天数不到20天,只要没有提示“已无资格”,就可以一直来这里领取svip哦"
        );
      }
    },

    //检测是否是授权用户
    async getUserByIds() {
      if (localStorage.getItem("uin") != 123) {
        this.iffuwu();
        return false;
      }
      try {
        this.isactivi = false;

        const result = await getmonitor(localStorage.getItem("qrsig"));
        console.log(result);
        if (result.data.saveOK == 0) {
          this.uin = result.data.uin;
          this.skey = result.data.skey;
          this.pskey = result.data.pskey;
          this.active = 1;
          //存入token
          localStorage.setItem("uin", result.data.uin);
          localStorage.setItem("skey", result.data.skey);
          localStorage.setItem("pskey", result.data.pskey);
          localStorage.setItem("ifsv", "01");
        } else if (result.data.saveOK == 1) {
          alert("二维码已失效，请点击二维码图片刷新二维码，然后重新扫码登录");
          this.isactivi = true;
          return false;
        } else if (result.data.saveOK == 2) {
          alert("请扫码登录后再领取");
          this.isactivi = true;
          return false;
        } else if (result.data.saveOK == 3) {
          alert("你已经扫码了，但没有授权登录");
          this.isactivi = true;
          return false;
        } else if (result.data.saveOK == -1) {
          alert("请先获取登录二维码，使用手机qq扫码登录后再领取");
          this.isactivi = true;
          return false;
        } else {
          alert("未知错误，请重新扫码");
          this.isactivi = true;
          return false;
        }
      } catch (error) {
        alert("服务器请求失败，请稍等会在试一试 错误代码:log");
        this.isactivi = true;
        return false;
      }

      getUserById(this.uin).then((res) => {
        this.code = res.data.code;
        if (this.code == 0) {
          this.getsvips();
        } else {
          this.isactivi = true;
          alert("你没有被授权，请先授权再来领取");
          this.$router.push({ path: "/authorize" });
        }
      });
    },

    async getfuwu() {
      //每次进入，自动检查服务器连通性
      try {
        await getsvip("1", "1", "1").then((result) => {
          const toast = this.$createToast({
            txt: "当前服务器连通性:较好",
            type: "correct",
            time: 1500,
          });
          toast.show();
        });
      } catch (error) {
        const toast = this.$createToast({
          txt: "当前服务器连通性:爆满",
          type: "error",
          time: 1500,
        });
        toast.show();
      }
    },

    showBtn() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "系统提示",
        content:
          "检测到您之前扫过码，是否为您继续提交领取svip请求(如果点击取消就要重新扫码哦，如果没领到就一直领,设置这个就是为了方便你们)",
        confirmBtn: {
          text: "继续领取svip",
          active: true,
          disabled: false,
          href: "javascript:;",
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;",
        },
        onConfirm: () => {
          this.isactivi = false;
          this.getsvips();
        },
        onCancel: () => {
          localStorage.setItem("uin", "123");
          localStorage.setItem("skey", "");
          localStorage.setItem("pskey", "");

          return false;
        },
      }).show();
    },
  },

  //页面创建好执行的方法
  mounted() {
    //  this.getCodeImg();
    // this.getmonitors();
    this.iffuwu();
    this.getCodeImg();
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
  margin: -20px !important;
}
</style>