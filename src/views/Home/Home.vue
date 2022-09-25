<template>
 <div>
      <!-- 首页轮播图 -->
  <home-banner :banners = "banners"></home-banner>
  <!-- 视频列表 -->
  <video-list :videoList = "VideoList"></video-list>

  <common-footer></common-footer>
 </div>
 
</template>


<script>
import HomeBanner from "./component/Banner";
import VideoList from "./component/VideoList";
import commonFooter from "@/components/CommonFooter";
import { getBanner, getVideoList } from "@/api/getData.js";

// cnpm run serve

export default {
  //注册组件
  components: {
    HomeBanner,
    VideoList,
    commonFooter,
  },
  //声明数据源
  data() {
    return {
      banners: [],
      VideoList: [],
    };
  },

  //定义方法
  methods: {
    //获取轮播图
    async getBannerData() {
      try {
        //await:等待异步请求完成,加了这个最外层要加async
        const result = await getBanner();
        if (result.data.code == 0) {
          this.banners = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    //   console.log(this.banners)
    },

    //获取视频列表
    async getVList() {
      try {
        const result = await getVideoList();
        if (result.data.code == 0) {
          this.VideoList = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  //页面创建好执行的方法
  mounted() {
    this.getBannerData();
    this.getVList();
  },

};
</script>


<style lang="scss" scoped>
</style>