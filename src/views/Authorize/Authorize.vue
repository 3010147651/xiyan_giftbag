<template>
  <div class="main body-bg">
    
    <cube-form :model="model" @submit="submitAuthorize">
      <cube-form-group>
        <!-- <cube-form-item style="display:none" :field="fields[0]"></cube-form-item> -->
        <cube-form-item :field="fields[0]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">使用卡密</cube-button>
      </cube-form-group>
    </cube-form>


<!-- 
    <p></p>
    <p></p>
    <p></p>
    <hr />
    <p></p>
    <el-descriptions title="数据统计" direction="vertical" :column="4" border>
      <el-descriptions-item label="全站总领取人数"
        >{{ sons }}&nbsp; 人</el-descriptions-item
      >
      <el-descriptions-item label="全站总领取svip天数"
        >{{ svipsons }}&nbsp; 天</el-descriptions-item
      >
    </el-descriptions> -->
  </div>
</template>

<script>
import { getCammyStatistics } from "@/api/getCammy.js";
import { getAuthorize } from "@/api/getCammy.js";
import { getUserByCammy } from "@/api/getCammy.js";
import Commpon from "./Commpon.vue";
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
      sons: "null",
      svipsons: "null",
      model: {
       
        key: "",
      },
      fields: [
        // {
        //   type: "input",
        //   modelKey: "uin",
        //   label: "QQ号",
        //   props: {
        //     placeholder: "请输入您要授权的qq号",
        //   },
        //   rules: {
        //     required: true,
        //   },
        //   message: {
        //     required: "QQ号不能为空",
        //   },
        // },

        {
          type: "input",
          modelKey: "key",
          label: "卡密",
          props: {
            placeholder: "请输入卡密",
            type: "input",
            eye: {
              open: false,
            },
          },
          rules: {
            required: true,
          },
          message: {
            required: "卡密不能为空",
          },
        },
      ],
    };
  },

  mounted() {
   
    if (localStorage.getItem("qq") != null) {
      
         //屏幕自适应
     if (/Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(navigator.userAgent) && navigator.userAgent.indexOf("QQ/") == -1) {
                 this.$router.push({ path: "/pers" });
            } else {
                 this.$router.push({ path: "/gift_bagpc" });
            }
    
    
    }
    this.getCount();
  },

  methods: {
    //数据统计
    getCount() {
      getCammyStatistics().then((res) => {
        console.log(res);
        this.sons = res.data.data.CammyCount;
        this.svipsons = res.data.data.svipDate;
      });
    },

    tolink() {
      this.$router.push({ path: "/" });
    },

    selectCammy(model) {

        getUserByCammy(model.key).then((res) => {
          if (res.data.data[0].uin == null) {
          } else {
            this.$createDialog({
              type: "alert",
              title: "系统提示",
              content: "该卡密已被使用，使用者QQ:" + res.data.data[0].uin,
              icon: "cubeic-alert",
            }).show();
          }
        });

    },

   submitAuthorize(e, model) {

      //阻止默认事件提交
      e.preventDefault();

      const reg = /^[A-Za-z-+]+$/;
      console.log(!reg.test(model.key))
      if(!reg.test(model.key)){
        this.$message({
          message: "请输入正确的卡密",
          type: "error",
        });
        return;
      }

      this.selectCammy(model);
      //调用卡密授权
      getAuthorize(localStorage.getItem("quin"), model.key).then((res) => {
        if (res.data.code == 0) {
          this.$createDialog({
            type: "alert",
            title: "系统提示",
            content: "恭喜您,成为本站授权用户,已为您账户添加10积分",
            icon: "cubeic-alert",
          }).show();
          localStorage.setItem("qq",localStorage.getItem("quin"))
        } else {
          const toast = this.$createToast({
            txt: res.data.msg,
            type: "error",
            time: 1500,
          });
          toast.show();
        }
      });
    },

    showBtn() {
      this.$createDialog({
        type: "alert",
        title: "系统提示",
        content:
          "恭喜您,授权成功,在2月28号之前,可以使用你授权的QQ来本系统领取20-80天svip",
        icon: "cubeic-alert",
      }).show();

    },
  },
};
</script>


<style lang="scss" scoped>
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

p {
  margin: 15px;
  line-height: 30px;
  size: 20px;
}

.bgColor {
  height: 100px;
}
</style>