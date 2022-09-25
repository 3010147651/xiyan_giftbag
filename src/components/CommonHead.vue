<template>
    <!-- 页头 -->
    <div @click="$router.back(-1)" class="head">
      <el-page-header  :content="inputName"   title="返回"> </el-page-header>
   
    </div>
    <!-- <div class="head">
        
        <header>
      <div class="header">
          <span @click="$router.back(-1)">
              <i class="cubeic-back"></i>
          </span>
      </div>
    </header>
    </div> -->
</template>

<script>
export default {
    props: ["inputName"]
}
</script>

<style lang="scss" scoped>

.head {
padding-left: 20px;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: .1px solid rgb(220, 215, 215);

}

// .head{
//      top: 0;
//     position: absolute;
//      background-color: rgb(24, 33, 87);
//     width: 100%;
   
   
// }
    
//     .header {
   
//     display: flex;//flex左右布局
     
//     padding: 10px 20px;
//     color: rgb(7, 7, 7);
// }  
// // 返回箭头
// .cubeic-back {
//     color: #fff;
//     margin-right:5px;
// }

</style>