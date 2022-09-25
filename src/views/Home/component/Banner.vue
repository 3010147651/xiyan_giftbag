<template>
  <div>
    <cube-slide :data="banners">
      <cube-slide-item v-for="(item, index) in banners" :key="index">
        <a :href="item.url" target="_blank" >
          <img :src="item.img" style="width: 100%" />
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
    //获取父组件传递来的值
  props: {
    banners: {
      //类型
      type: Array,
      //是否必须
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>