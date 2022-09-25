<template>
  <div>
        <common-head inputName="卡密查询"></common-head>

   <div  class="main body-bg">
        <cube-form :model="model" @submit="submitAuthorize">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">查询</cube-button>
      </cube-form-group>
    </cube-form>

    <p></p>
    <p></p>

    <div v-if="isNone">
      <el-descriptions class="margin-top" title="卡密详情" :column="1" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            卡密
          </template>
          {{ cammy.key }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            使用者QQ
          </template>
          {{ cammy.uin }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            卡密创建时间
          </template>
          {{ cammy.newdate }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            卡密使用时间
          </template>
          {{ cammy.enddate }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
   </div>

  </div>
</template>

<script>
import { getUserByCammy } from "@/api/getCammy.js";
import CommonHead from "@/components/CommonHead"
export default {
   components:{
      
        CommonHead
       
    },
  data() {
    return {
      isNone: false,
      cammy: [
        {
          key: "",
          uin: "",
          newdate: "",
          enddate: "",
        },
      ],

      model: {
        key: "",
      },
      fields: [
        {
          type: "input",
          modelKey: "key",
          label: "卡密",
          props: {
            placeholder: "请输入需要查询的卡密",
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

  methods: {
    submitAuthorize(e, model) {
             const reg = /^[A-Za-z]+$/;
       if(!reg.test(model.key)){
           this.$message({
            message: "请输入正确的卡密",
            type: "error",
          });
          return false;
       }

      this.cammy.key == "" ? (this.isNone = false) : (this.isNone = true);
      //阻止默认事件提交
      e.preventDefault();
      getUserByCammy(model.key).then((res) => {
   this.cammy = res.data.data[0];
       
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
  margin-bottom: 120px;
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

<style>
.cube-btn{
  background:rgb(41, 44, 54, .9);
  border: 1px solid #2c3e50;
  border-radius: 25px;
  padding:12px 16px;
  margin-top: 50px !important;
  color: #fff;
}
</style>