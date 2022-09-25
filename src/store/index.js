import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem("qq") || ''
  },
  //同步修改
  mutations: {
    SET_TOKEN:(state,qq)=>{
      state.qq = qq
    }
  },
  //异步调用
  actions: {
    setToken(context,qq){
      context.commit('SET_TOKEN',qq)
    },
    clearToken(context){
      context.commit('SET_TOKEN','')
    }
  },
  modules: {
  }
})
