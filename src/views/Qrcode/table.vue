<template>
    <div>
      <button @click="hqid">1111111111111111111111 </button>
           <button @click="hqbdc">1222222222222222222222 </button>
            <input type="text" v-model="sjc">
    </div>
</template>

<script>
import { hquId,hqbd } from "@/api/getCammy.js";
export default {
    name: 'WorkspaceTable',

    data() {
        return {
            sjc:"",
            id:""
        };
    },

    mounted() {
        
    },

    methods: {
         //获取二维码
    async hqid() {
      try {
        const result = await hquId(this.sjc);
  

         this.id = result.data.data
         console.log(result);
        
      } catch (error) {
      }
    },


      async hqbdc() {
      try {
       const tb =  await hqbd(this.id)
        console.log(tb.data.data);
      } catch (error) {
        return false;
      }
    },
    },
};
</script>

<style lang="scss" scoped>

</style>