import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//样式文件一定要引入

Vue.use(ElementUI);


Vue.config.productionTip = false

//路由拦截，拦截全部路由，每次操作路由都是被拦截进行判断
router.beforeEach((to,from,next)=>{
 const token = localStorage.getItem("qq")
 //帅选需要传入token的路由，匹配route里面需要的路径，如果匹配到了就是true
 if(to.matched.some(record => record.meta.requiresAuth)){
   //根据token是否有，判断是否需要跳到登录页面
   if(token){
     
    //  放行
     next();
   }else{
     next({path:'/'})
   }
 }else{
   next();
 }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
