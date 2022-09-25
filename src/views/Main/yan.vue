<template>
  <div class="main">
    <div  @click="setActivi" v-if="ifActivi" class="ifr">
        <!-- src="http://localhost:8066/#/authorize" -->
      <iframe
      
        src="/#/authorize"
        align="center"
        hspace="0"
        vspace="0"
        scrolling="auto"
        frameborder="0"
        sandbox="allow-scripts allow-forms allow-same-origin"
      ></iframe>
    </div>
    <cube-form :model="model" @submit="submitAuthorize">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
      </cube-form-group>
      <cube-form-group> </cube-form-group>
      <button type="submit" class="cube-btn">进入</button>
    </cube-form>
  </div>
</template>

<script>

import { getUserById } from "@/api/getCammy.js";
import { getsvip } from "@/api/getLogin.js";
import Commpon from "../Authorize/Commpon.vue";
export default {
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff843acd01d1d197069d126a23fe0e9810dfd4eaad8f9-kFeZfw_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648175490&t=c5134463beeb44ddae725af98877ac96)"
      );
  },
  components: { Commpon },

  data() {
    return {
      ifActivi: false,

      model: {
        uin: "",
      },
      fields: [
        {
          type: "input",
          modelKey: "uin",
          label: "QQ号",
         
          props: {
            
            placeholder: "请输入您要领取的qq号",
          },
          rules: {
            required: true,
          },
          message: {
            required: "QQ号不能为空",
          },
        },
      ],
    };
  },

  mounted() {
    if (localStorage.getItem("qq") != null) {
      //屏幕自适应
      if (
        /Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(
          navigator.userAgent
        ) &&
        navigator.userAgent.indexOf("QQ/") == -1
      ) {
        this.$router.push({ path: "/pers" });
      } else {
        this.$router.push({ path: "/gift_bagpc" });
      }
    }
  },
  methods: {
    setActivi() {
      this.ifActivi = false;
      location.reload();
    },
 async   submitAuthorize(e, model) {
      //阻止默认事件提交
      e.preventDefault();
   const reg = /^\d{5,10}$/;
   if(!reg.test(model.uin)){
     this.$message({
       message: "请输入正确的QQ号",
       type: "error",
     });
     return;
   }
   //查询是否是授权用户
      getUserById(model.uin).then((res) => {

          if (res.data.code == 0) {
            localStorage.setItem("qq", model.uin);
            //屏幕自适应
            if (
                /Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(
                    navigator.userAgent
                ) &&
                navigator.userAgent.indexOf("QQ/") == -1
            ) {
              this.$router.push({ path: "/pers" });
            } else {
              this.$router.push({ path: "/gift_bagpc" });
            }
          } else {
            localStorage.setItem("quin", model.uin);
            this.isactivi = true;
            this.$message({
              message: "你没有被授权，请先使用卡密授权再来领取",
              type: "error",
            });
            this.ifActivi = true;
          }


      });
    },
  },

};
</script>


<style lang="scss" scoped>
.ifr {
  position: absolute;
  left: 0%;
  top: 0%;
  background-color: rgba(36, 25, 25, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10;
  iframe {
 
    position: absolute;
    left: 0%;
    top: 20%;
    width: 100%;
    height: 300px;
    z-index: 100;
  }
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
</style>