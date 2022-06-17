import Vue from 'vue'
import App from './App.vue'
import store from './store'


// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store, // Vuex的仓库 store
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
}).$mount('#app')
// console.log(vm);