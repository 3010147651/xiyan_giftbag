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
      selectedLabelDefault: "/",
      tabs: [
       
        {
          label: "首页",
          icon: "cubeic-home",
          path: "/gift_bag",
        },
      
        {
          label: "个人中心",
          icon: "cubeic-person",
          path: "/pers",
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
  z-index: 999;
  background-color:#fff;
  width: 100%;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
} 
.cube-tab_active {
  
  color:#000;
}
</style>

<style>
  .cube-tab div{
    font-size: .1rem;
  }
  .cubeic-person{
    font-size: 1.8rem;
  }
  .cubeic-home{
     font-size: 1.8rem;
  }
</style>