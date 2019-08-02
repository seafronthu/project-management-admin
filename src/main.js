import '@a/js/global'
import Vue from 'vue'
import '@a/css/common.styl'
import '@a/css/theme.styl'
import '@a/css/animate.styl'
import App from './App.vue'
import router from './routes'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
