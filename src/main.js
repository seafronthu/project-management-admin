import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import Antd from 'ant-design-vue'

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
