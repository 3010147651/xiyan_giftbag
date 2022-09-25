<template>
  <div>
    <el-container>
      <el-main>
        <div>
          <img :src="defaultHeadImgqq" alt="头像" />
          <div class="jf">
            <div>
              <h1>李白</h1>
            </div>
            <div>剩余积分: <span>{{user.integral}}</span></div>
            <div>消费积分: <span>{{user.spend}}</span></div>
          </div>
        </div>
      </el-main>
    </el-container>

    <!-- <div class="container">
      <div class="p_top">
        <div>
          <img :src="defaultHeadImgqq" alt="头像" />
         
        </div>
       
      </div>
    </div> -->

    <div>
      <el-card class="box-card">
        <div @click="cammyCz" class="text item">
          <i class="el-icon-coin"></i>
          积分充值
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="cammyCx" class="text item">
          <i class="el-icon-zoom-in"></i>
          卡密查询
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="lqjl" class="text item">
          <i class="el-icon-s-goods"></i>
          领取记录
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="gg"  class="text item">
          <i class="el-icon-bell"></i>
          消息通知
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="tolink" class="text item">
          <i class="el-icon-share"></i>
          接口文档
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>
    </div>
    <button class="green" @click="signOut">退出登录</button>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import { getHeadImage } from "@/api/getQQ.js";
import { queryUserNews } from "@/api/getCammy.js";

export default {
  components: {
    CommonFooter,
  },
  data() {
    return {
      user:{
        integral:null,
        spend:null
      },
      info: {},
      defaultHeadImgqq: "",
    };
  },

  //带缓存
  computed: {
    getToken() {
      return this.$store.state.token;
    },
  },
  methods: {
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
      this.user = result.data.data
      localStorage.setItem("uid", result.data.data.id)
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
  mounted() {
        //屏幕自适应
     if (/Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(navigator.userAgent) && navigator.userAgent.indexOf("QQ/") == -1) {
                 this.$router.push({ path: "/gift_bag" });
            } else {
                 this.$router.push({ path: "/gift_bagpc" });
            }
     this.getQueryUserNews();
    this.getHeadImageqq();
  },
};
</script>


<style lang="scss" scoped>
.container {
  // 顶部头像区域
  .p_top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff843acd01d1d197069d126a23fe0e9810dfd4eaad8f9-kFeZfw_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648175490&t=c5134463beeb44ddae725af98877ac96");
    div {
      text-align: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50px;
      }
      p {
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }
}
img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
// 退出登录
.green {
  display: block;
  background-color: #2c3f54;
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
}
.jf {
  display: inline-block;
  position: absolute;
  right: 38%;
  top: 3%;
  div {
    margin: 5px;
  }
  h1 {
    font-weight: 900 !important;
    font-size: 18px;
    margin: 0px 0px 10px 0px;
  }
  span {
    color: #f56c6c;
  }
}
</style>

<style >
.el-container {
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff843acd01d1d197069d126a23fe0e9810dfd4eaad8f9-kFeZfw_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648175490&t=c5134463beeb44ddae725af98877ac96");
}
.el-icon-arrow-right {
  position: absolute;
  right: 30px;
}
</style>