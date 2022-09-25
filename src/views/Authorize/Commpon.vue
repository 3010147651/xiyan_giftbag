<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabelSlots"
      @click="changHandler"
    >
      <cube-tab
        v-for="(item) in tabs"
        :icon="item.icon"
        :label="item.label"
        :key="item.path"
        :value="item.path"
      >
     
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelDefault: "/authorize",
      tabs: [
       
        {
          label: "卡密授权",
          icon: "cubeic-home",
          path: "/authorize",
        },
        {
          label: "领取svip",
          icon: "cubeic-like",
          path: "/",
        },
      
      ],
    };
  },
  methods:{
    changHandler(path){
      if(path != this.$route.path){
        this.$router.push(path)
      }
    }
  },
  created(){
    this.selectedLabelSlots = this.$route.path
  }
};
</script>

<!--SCSS是一种CSS预处理语言, scoped 是指这个scss样式 只作用于当前组件-->
<style lang="scss" scoped>
.tab {
  position: fixed;
  bottom: 0;
  left: -1px;
  z-index: 999;
  background-color:#fff;

  width: 100%;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.3);
} 
.cube-tab_active {
  color: #ff6f01;
}
</style>