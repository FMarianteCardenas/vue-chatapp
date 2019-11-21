import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import io from 'socket.io-client'

Vue.config.productionTip = false
window.Event = new Vue();
Vue.prototype.socket = io('https://restservercursonodejs.herokuapp.com')

Vue.prototype.base_url = 'https://restservercursonodejs.herokuapp.com'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
