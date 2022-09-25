<template>
  <div class="main">
    <cube-form :model="model" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
        <cube-form-item :field="fields[2]">
        
        </cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">注册</cube-button>
      </cube-form-group>
    </cube-form>

    <router-link to="/login" class="reg">登录</router-link>
  </div>
</template>

<script>
//引入注册接口
import { registerApi } from "@/api/getData.js";
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
          modelKey: "nameValue",
          label: "名称",
          props: {
            placeholder: "请输入名称",
          },
          rules: {
            required: true,
          },
          message: {
            required: "名称不能为空",
          },
        },
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
      //调用注册业务
      registerApi(model.phoneValue, model.pwdValue, model.nameValue).then(
        (res) => {
          if (res.data.code == 0) {
            const toast = this.$createToast({
              txt: "注册成功",
              type: "correct",
              time: 1500,
            });

            toast.show();
          }else{
               const toast = this.$createToast({
              txt: "注册失败,该手机号已经被注册过了",
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