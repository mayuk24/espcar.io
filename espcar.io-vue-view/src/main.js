import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
	debug: true,
	connection: io('http://YOUR-HOST:3000/')
}));

new Vue({
  render: h => h(App),
}).$mount('#app')
