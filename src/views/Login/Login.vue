<template>
  <div class="main">
    <cube-form :model="model" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>

      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">登录</cube-button>
      </cube-form-group>
    </cube-form>

    <router-link to="/register" class="reg">注册</router-link>
  </div>
</template>

<script>
//引入注册接口
import { loginApi } from "@/api/getData.js";
export default {
  data() {
    return {
      model: {
        phone: "",
        pwd: "",
        name: "",
      },
      fields: [
       
        {
          type: "input",
          modelKey: "phoneValue",
          label: "手机号",
          props: {
            placeholder: "请输入手机",
          },
          rules: {
            required: true,
          },
          message: {
            required: "手机号不能为空",
          },
        },

        {
          type: "input",
          modelKey: "pwdValue",
          label: "密码",
          props: {
            placeholder: "请输入密码",
            type: "password",
            eye: {
              open: false,
            },
          },
          rules: {
            required: true,
          },
          message: {
            required: "密码不能为空",
          },
        },

      
      ],
    };
  },

  methods: {
    submitHandler(e, model) {
      //阻止默认事件提交
      e.preventDefault();
      //调用登录业务
      loginApi(model.phoneValue, model.pwdValue).then(
        (res) => {
          if (res.data.code == 0) {
              //取token，存起来
              localStorage.setItem('token',res.data.data)
                //把token传入store，用于全局
                 this.$store.dispatch('setToken', res.data.data);

              //跳转页面
              this.$router.push({path:'/'})


          }else{
               const toast = this.$createToast({
              txt: "用户名或密码错误",
              type: "error",
              time: 1500,
            });
             toast.show();
          }
        }
      );
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
</style>