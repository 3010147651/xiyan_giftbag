<template>
  <div>
    <div class="divs" :class="{ divs1: isactivi }">
      >
      <cube-loading class="ld" :class="{ active: isactivi }"></cube-loading>
    </div>
    
    <div class="header">
      <span @click="$router.back(-1)">
        <i class="cubeic-back"></i>
      </span>
    </div>

    <el-steps :active="active" simple>
      <el-step title="1.扫码" icon="el-icon-picture"></el-step>
      <el-step title="2.登录成功"></el-step>
    </el-steps>

    <div class="main">
      <img @click="getCodeImg" :src="imgdata" class="item_img" />
      <div style="height: 20px"></div>
      <el-descriptions
        class="margin-top"
        title=""
        :column="2"
        :size="size"
        border
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            当前登录状态
          </template>
          <font style="color: red"> {{ ifLogin }}</font>
        </el-descriptions-item>
      </el-descriptions>
      <div style="height: 20px"></div>

      <div style="height: 50px"></div>
      <div>
        <el-carousel :interval="6000" type="card" height="200px">
          <el-carousel-item v-for="item in tishi" :key="item">
            <p>{{ item.txt }}</p>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- <div>
        <hr />
        <p>
          1.使用QQ扫码登录，会自动检测，如果检测登录成功，再返回去领取svip
        </p>
         <p>
         2.每隔两秒自动检测一次登录状态
        </p>
         <p>
        3.因为部分人没有权限，所以需要多扫一下这个权限二维码
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getUserById } from "@/api/getCammy.js";
import { getCodes } from "@/api/getLogin.js";
import { getmonitors } from "@/api/getLogin.js";
import { getsvip } from "@/api/getLogin.js";
export default {
  data() {
    return {
        timer: null,
      ifLogin: "未登录",
      active: 0,
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
      qrsigx: "",
      imgdata: "",

      uin: "",

      isactivi: true,
    };
  },

  //定义方法
  methods: {
    //获取二维码
    async getCodeImg() {
      try {
        this.isactivi = false;
        //await:等待异步请求完成,加了这个最外层要加async
        const result = await getCodes();
        //console.log(result);
        this.$message({
          message:
            "获取二维码成功,不要截图扫码,使用另一台手机对着扫码,点击二维码图片可以刷新二维码",
          type: "success",
        });

        this.imgdata = result.data.data.qrcode;
        this.qrsigx = result.data.data.id;
        this.isactivi = true;
        //    console.log(this.qrsig);
      } catch (error) {
        //     console.log(error);
        this.isactivi = true;
        this.$message({
          message: "当前人数较多,服务器爆满,可以尝试刷新页面,重新获取二维码",
          type: "warning",
        });
        return false;
      }
    },

    //二维码监控

    detectFor() {
     this.timer= setInterval(() => {
        this.getmonitors();
      }, 2000);
    },

    async getmonitors() {
      try {
        const result = await getmonitors(this.qrsigx);
        if (result.data.code == -1) {

        } else {
          this.ifLogin = result.data.msg;
          if (this.ifLogin == "扫码登陆成功！") {
            this.active = 2;
            var highestTimeoutId = setTimeout(";");
            for (var i = 0; i < highestTimeoutId; i++) {
              clearTimeout(i);
            }
          } else if (this.ifLogin == "系统错误，请稍后重试或联系管理员。") {
            var highestTimeoutId = setTimeout(";");
            for (var i = 0; i < highestTimeoutId; i++) {
              clearTimeout(i);
            }
            this.ifLogin = "错误请求，请刷新页面";
          }
        }
      } catch (error) {
        alert("服务器请求失败，请等会再来吧");
      }

    },
  },

  mounted() {
    //  this.getCodeImg();
    // this.getmonitors();
    this.getCodeImg();
    this.detectFor();
  },
  beforeDestroy(){
     if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
    }
  },
};
</script>


<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #f6f6f6;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #f6f6f6;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #f6f6f6;
}
p {
  margin: 15px;
  font-size: 16px;
  color: rgb(14, 2, 2);
  line-height: 38px;
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
.main {
  padding: 50px 5% 0;
  text-align: center;
}
//注册
.cube-btn {
  margin-top: 20px;
}
// 登录
.reg {
  display: inline-block;
  margin-top: 30px;
  font-size: 18px;
}
.header {
  display: flex; //flex左右布局
  background-color: #07111b;
  padding: 10px 20px;
  color: #fff;
}
// 返回箭头
.cubeic-back {
  color: #fff;
  margin-right: 5px;
}
//视频标题
.title {
  font-size: 16px;
  width: 80%;
  //超出省略
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.ld {
  position: absolute;
  left: 50%;
  top: 20%;
  z-index: 1001;
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

  background-color: rgba(225, 225, 225, 0.5);
  width: 100%;
  height: 1000px;
  z-index: 1000;
}
</style>