import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'


Vue.use(Vuex)

//plugin para persistir los datos de vuex
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  state: {
      //base_url:'http://localhost:3000',
      usuario:null,
      authenticated:false,
      headers:null,
      drawer:false,
  },
  mutations: {
    setSession(state,credenciales){
        state.authenticated = true
        state.usuario = credenciales.usuario
        state.token = credenciales.token
        state.headers = 
        {
          headers:{
            'Content-Type':'application/json;charset=utf-8',
            'Authorization':`${state.token}`
          }
        }
    },
    removeSession(state){
      state.authenticated = false
      state.user = null
      state.token = null
      state.headers = null
      router.push('/login')
    },
  },
  actions: {
    iniciarSession({commit,state},datos){
      commit('setSession',datos)
    },
  },
  plugins: [
    createPersistedState({
        paths: ['usuario','authenticated','token','headers']
    })
  ],
  modules: {
  }
})
