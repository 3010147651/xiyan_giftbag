<template>
<div>
    
        <common-head inputName="积分充值" ></common-head>
  <div class="main body-bg">
   
    <cube-form :model="model" @submit="submitAuthorize">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
      
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">充值积分</cube-button>
      </cube-form-group>
    </cube-form>

</div>

  </div>
</template>

<script>
import CommonHead from "@/components/CommonHead";
import { getAuthorize } from "@/api/getCammy.js";
import { getUserByCammy } from "@/api/getCammy.js";

export default {
      components: {
    CommonHead,
  },
  // beforeCreate() {
  //   document
  //     .querySelector("body")
  //     .setAttribute(
  //       "style",
  //       "background-image: url(http://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F07c9beb315fb8fbb0631dadc0a88ef641f5d32617fbf-TeQ4lN_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647841836&t=cf72b597f9dcaa40d474fe8d972a24be)"
  //     );
  // },

  data() {
    return {
   
      model: {

        key: "",
      },
      fields: [
       
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

  },

  methods: {


    selectCammy(model) {
         const reg = /^[A-Za-z]+$/;
       if(!reg.test(model.key)){
           this.$message({
            message: "请输入正确的卡密",
            type: "error",
          });
          return false;
       }
      getUserByCammy(model.key).then((res) => {
        console.log(res.data.data[0].uin);
        if (res.data.data[0].uin == null) {
        } else {
          this.$createDialog({
            type: "alert",
            title: "系统提示",
            content:
              "该卡密已被使用，使用者QQ:" +
              res.data.data[0].uin ,
            icon: "cubeic-alert",
          }).show();
        }
      });
    },

    submitAuthorize(e, model) {
      //阻止默认事件提交
      e.preventDefault();

      this.selectCammy(model);
      //调用卡密充值
      getAuthorize(localStorage.getItem("qq"), model.key).then((res) => {
        if (res.data.code == 0) {
          //  console.log(res);
          //跳转页面
          // this.$router.push({path:'/'})
          this.$createDialog({
            type: "alert",
            title: "系统提示",
            content:
              "充值成功，积分+10",
            icon: "cubeic-alert",
          }).show();
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