import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import service from './services'
import './plugins/element-ui'
import { preventReClick, defaultImg } from './directive/index'
import './assets/styles/normalize.css'

Vue.config.productionTip = false;

Vue.use(preventReClick)
Vue.use(defaultImg)
Vue.use(service)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
