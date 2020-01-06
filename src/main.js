import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

Vue.config.productionTip = false
//vue实例作为事件总线  用于监听每一张图片加载
Vue.prototype.$bus= new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
