<template>
  <div class="main">
        <common-head inputName="领取记录" ></common-head>

    <div class="list" v-if="orders.length > 0">
      <div class="box" v-for="(item, index) of orders" :key="index">
        <!-- <router-link :to="{path:'coursedtail',query:{video_id:item.video_id}}" > -->
        <!-- <h2>{{item.name}}</h2> -->
        <div class="smallbox">
          <div class="imgdiv">
            <div>
              <span>
                {{ item.name }}
              </span>
            </div>
            <img :src="item.picture" />
          </div>
          <div class="textdiv">
            <p class="price">
              <el-tag effect="plain" type="danger" size="medium "
                >领取花费积分: {{ item.integral }}</el-tag
              >
            </p>
            <p class="price">
              <el-tag effect="plain" type="" size="medium "
                >当前剩余积分: {{ item.surplus }}</el-tag
              >
            </p>
            <p class="price">
              <el-tag effect="plain" type="success" size="medium "
                >领取时间: {{ item.newdate }}</el-tag
              >
            </p>
          </div>
        </div>

        <!-- </router-link> -->
      </div>
    </div>

    <div class="no_order" v-else>
      <p>暂无领取记录</p>
    </div>
  </div>
</template>


<script>
import CommonHead from "@/components/CommonHead";
import { getOrderList } from "@/api/getCammy.js";

export default {
  components: {
    CommonHead,
  },

  data() {
    return {
      orders: [],
    };
  },
  methods: {
    jiami(str) {
    
        var hash = 5381;
        for (var i = 0, len = str.length; i < len; ++i) {
          hash += (hash << 5) + str.charAt(i).charCodeAt();
        }
        return hash + "3010";

    },

    //获取视频详情
    async getOrders() {
      const uid = localStorage.getItem("uid");
     const key = await   this.jiami(uid)

      try {
        const result = await getOrderList(uid, key);
        if (result.data.code == 0) {
          this.orders = result.data.data || [];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>


<style lang="scss" scoped>
.list {
 
  border-radius: 8px; //设置图片圆角
  padding: 0 20px;
}

// 视频个体
.box {
 
 
  padding: 20px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  // 标题
  .title {
    font-size: 14px;
    margin-bottom: 15px;
  }
  // 订单详情
  .smallbox {
    //flex左右排列，两端对齐
    display: flex;
    justify-content: space-between;
    .imgdiv {
      width: auto;
      height: 90px;
      flex-shrink: 0;
      span {
        font-weight: 800;
      }
      img {
        width: 150px;
        height: 95%;
        border-radius: 10px;
        margin: 10px 0;
      }
    }
    .textdiv p {
      margin-top: 10px;
      padding-left: 10px;
    }
  }
}

.no_order {
  margin-top: 50px;
  text-align: center;
}
</style>