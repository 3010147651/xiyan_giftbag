<template>
        <div>
            <div id="app">
			<div class="top"></div>

			<div class="my">
				<div class="my-sbox">
					<div class="my-information">
						<div class="tx">
							<img class="touxiang"
								:src="defaultHeadImgqq" 
								alt="" />
							<span class="name">用户</span>
						</div>
						<img  @click="sm" class="erweima"
                           
							src="@/assets/124.png"
							alt="" />
					</div>
					<div class="a">
						<div class="b">
							<div class="c">
								<b>{{user.integral}}</b>
								<div>当前积分</div>
							</div>
						</div>
						<div class="hr">
							
						</div>
						<div class="b">
							<div class="c">
								<b>{{user.spend}}</b>
								<div>消费积分</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="buttom">
                <div class="z-buttom"></div>
                       <div>
      <el-card class="box-card">
        <div @click="cammyCz" class="text item">
          <i class="el-icon-coin"></i>
          积分充值
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="cammyCx" class="text item">
          <i class="el-icon-zoom-in"></i>
          卡密查询
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="lqjl" class="text item">
          <i class="el-icon-s-goods"></i>
          领取记录
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="gg"  class="text item">
          <i class="el-icon-bell"></i>
          消息通知
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      <el-card class="box-card">
        <div @click="tolink" class="text item">
          <i class="el-icon-share"></i>
          接口文档
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-card>

      
    </div>
     <button class="green" @click="signOut">退出登录</button>
            </div>
            
		</div>
        <common-footer></common-footer>
        </div>
</template>



<script>


import CommonFooter from "@/components/CommonFooter";
import { getHeadImage } from "@/api/getQQ.js";
import { queryUserNews } from "@/api/getCammy.js";
export default {
      components: {
    CommonFooter,
  },
  data() {
    return {
      user:{
        integral:null,
        spend:null
      },
      info: {},
      defaultHeadImgqq: "",
    };
  },
    
    //带缓存
  computed: {
    getToken() {
      return this.$store.state.token;
    },
  },

    mounted() {
     
     window.pcly = this.pcly;
    if (/Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i.test(navigator.userAgent) && navigator.userAgent.indexOf("QQ/") == -1) {
               
            } else {
                 this.$router.push({ path: "/gift_bagpc" });
            }
     this.getQueryUserNews();
    this.getHeadImageqq();
  },

  methods: {
    pcly(){
        this.$router.push({ path: "/gift_bagpc" });
    },
       sm() {
      this.$router.push({ path: "/qrcode" });
    },
    gg() {
      this.$router.push({ path: "/Information" });
    },
    lqjl() {
      this.$router.push({ path: "/order" });
    },
    cammyCz() {
      this.$router.push({ path: "/recharge" });
    },
    cammyCx() {
      this.$router.push({ path: "/cammyquery" });
    },
    tolink() {
      this.$router.push({ path: "/api" });
    },
    // 获取QQ头像
    getHeadImageqq() {
      this.defaultHeadImgqq =
        " https://q1.qlogo.cn/g?b=qq&nk=" +
        localStorage.getItem("qq") +
        "&s=100";
    },

    //查询用户积分信息
    async getQueryUserNews() {
      const result = await queryUserNews(localStorage.getItem("qq"));
      this.user = result.data.data
      localStorage.setItem("uid", result.data.data.id)
    },

    //获取用户信息
    async getInfo() {
      try {
        const result = await getHeadImage(localStorage.getItem("qq"));
        console.log(result);
        // this.defaultHeadImg = result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    //退出登录
    async signOut() {
      try {
        //删除token
        await this.$store.dispatch("clearToken");

        localStorage.removeItem("qq");
          localStorage.removeItem("token");
        //刷新页面
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },



    
}
</script>

<style scoped>
.el-icon-arrow-right{
  color: #000000;
}

 i{
   color: #ffaa00;
 }
    .green {
  display: block;
  background-color: #2c3f54;
  border: none;
  outline: none;
  width: 80%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;

}

			#app {
				width: 100%;
				height: 100%;
				position: absolute;
			}
            .buttom{

            }
            .z-buttom{
                width: 100%;
                height: 60px;
            }

			.top {
				height: 27%;
				width: 100%;
				background-color: rgb(41, 44, 54, .9);
			}

			.my {
				position: absolute;
				top: 3%;
				left: 0;
				right: 0;
				margin: auto;
				z-index: 1000;
				width: 86%;
				height: 31%;
				border-radius: 3%;
				background-color: #1d2027;
        background-image: url("https://img0.baidu.com/it/u=939131204,502428536&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=300");
				box-shadow: 0 3px 20px 0 rgb(0 0 0 / 60%) !important;
			}

			.my-information {
				height: 22%;
				display: flex;
				justify-content: space-between;
				margin: 30px;
			}

			.touxiang {
				float: left;
				width: 50px;
				height: 50px;
				border-radius: 50px;
			}

			.tx {
				margin: 1px;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.name {
				font-size: 15px;
				color: #fff;
				margin-left: 10px;
			}

			.erweima {
                margin-top: 15px;
				float: right;
				height: 50%;
			}

			.my-sbox {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
			}

			.a {
				display: flex;
				width: 100%;
				height: 50%;
				justify-content: center;
				align-items: center;
			}
			.hr{
				height: 30%;
				width: 1px;
				background-color: white;
			}
			.b {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				/* flex-direction: row;
                display: inline-block;
                justify-content: center;
                align-items: center;
                 */
				color: #ffb81e;
				width: 100%;
				height: 100%;
			}

			.b b {
				font-size: 42px;
			}

			.c div {
		
				color: #FFFFFF;
                margin-top: 3px;
			}
</style>