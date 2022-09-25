import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home/Home.vue";
import CourseDetai from "../views/CourseDetail/CourseDetail.vue";
import Login from "../views/Main/login.vue";
import Order from "../views/Personal/son/order.vue";
import Pay from "../views/Pay/Pay.vue";
import Personal from "../views/Personal/Personal.vue";

import Register from "../views/Register/Register.vue";
import Main from "../views/Main/Main.vue";
import Authorize from "../views/Authorize/Authorize.vue";
import yan from "../views/Main/yan.vue";
import Api from "../views/Personal/son/Api.vue";
import CammyQuery from "../views/Personal/son/CammyQuery.vue";
import Information from "../views/Personal/son/Information.vue";
import Recharge from "../views/Personal/son/Recharge.vue";
import Txsp from "../views/Personal/son/Txsp.vue";
import Qrcode from "../views/Qrcode/Qrcode.vue";
import table from "../views/Qrcode/table.vue";
import GiftBag from "../views/Main/GiftGag.vue";
import GiftBagPc from "../views/Main/GiftGagPc.vue";

import GiftDetails from "../views/Main/GiftDetails.vue";


Vue.use(VueRouter)

const routes = [
  {
    path:"/table",
    name:"table",
    component:table,
    
  },
  {
    path:"/gift_details",
    name:"GiftDetails",
    component:GiftDetails,
    meta:{requiresAuth:false}
  },
  {
    path:"/pers",
    name:"Pers",
    meta:{requiresAuth:true},
    component:() =>import("../views/Personal/Pers.vue")
  },
  {
    path:"/txsp",
    name:"Txsp",
    component:Txsp,
  },
  {
    path:"/gift_bagpc",
    name:"GiftBagPc",
    component:() =>import( "../views/Main/GiftGagPc.vue"),

    meta:{requiresAuth:true}
  },
  {
    path:"/gift_bag",
    name:"GiftBag",
    component:() =>import( "../views/Main/GiftGag.vue"),
    meta:{requiresAuth:true}
  },
  {
    path:"/qrcode",
    name:"Qrcode",
    component:Qrcode,
  },
  {
    path:"/recharge",
    name:"Recharge",
    component:Recharge,
    meta:{requiresAuth:true}
  },
  {
    path:"/information",
    name:"Information",
    component:Information,
    meta:{requiresAuth:true}
  },
  {
    path:"/cammyquery",
    name:"CammyQuery",
    component:CammyQuery,
    meta:{requiresAuth:true}
  },
  {
    path:"/main",
    name:"Main",
    component:Main,
    meta:{requiresAuth:true}
  },
  {
    path:"/api",
    name:"Api",
    component:Api,
    meta:{requiresAuth:false}
  },
  {
    path:"/",
    name:"yan",
    component:yan
  },
  {
    path:"/authorize",
    name:"Authorize",
    component:Authorize
  },
    {
      path:"/home",
      name:"Home",
      component:Home,
      meta:{requiresAuth:true}
    },
    {
      path:"/coursedetai",
      name:"CourseDetai",
      component:CourseDetai,
      meta:{requiresAuth:true}
    },
    {
      path:"/login",
      name:"Login",
      component:Login,
      meta:{requiresAuth:true}
    },
    {
      path:"/order",
      name:"Order",
      component:Order,
       meta:{requiresAuth:true}
    },
    {
      path:"/pay",
      name:"Pay",
      component:Pay,
      meta:{requiresAuth:true}
    },
    {
      path:"/personal",
      name:"Personal",
      component:Personal,
      meta:{requiresAuth:true}
    },
    {
      path:"/register",
      name:"Register",
      component:Register
    },
]

const router = new VueRouter({
  // mode:'history',
  routes
})

export default router
