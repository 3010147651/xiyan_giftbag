<template>
  <div>
     <div class="head">
        
        <header>
      <div class="header">
          <span @click="$router.back(-1)">
              <i class="cubeic-back"></i>
          </span>
      </div>
    </header>
    </div>

  <div class="box">
     
     <!-- <div class="wi">

     </div>
     <div class="h1"></div> -->
    <section>
      <iframe
        src="http://fk.zk0.top/"
        align="center"
        hspace="0"
        vspace="0"
        scrolling="auto"
        frameborder="0"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </section>
  </div>
  </div>
</template>

<script>
import CommonHead from "@/components/CommonHead"
export default {
   components:{
      
        CommonHead
       
    },
  
}
</script>

<style scoped>
      .head{
     top: 0px;
    position: absolute;
     background-color: #000000;
    width: 100%;
   
   
}
    
    .header {
    display: flex;   
    padding: 10px 20px;
    color: rgb(7, 7, 7);
}  

.cubeic-back {
    color: #fff;
    margin-right:5px;
}

</style>


<style lang="scss" scoped>


.box{
margin-top: -65px;

}
.wi{
  position: absolute;
  background-color: #ffffff;
  z-index: 100;
  height: 100%;
  width: 70px;
  left: 0;
  top: 37px;
}
.h1{
    position: absolute;
  background-color: #ffffff;
  z-index: 100;
  width: 100%;
  top: 0;
  height: 60px;
}

   	*{
			margin: 0px;
			padding: 0px;
			border: 0px;
		}
		section{
			width:100%;

			
		}
		section iframe{
    
			width: 100%;
			height: 100vh;
		}


</style>