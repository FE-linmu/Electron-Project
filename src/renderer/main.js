import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'


//配置element-ui

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//VueHighcharts的配置
import VueHighcharts from 'vue-highcharts';

Vue.use(VueHighcharts);



//引入socket.io配置连接

import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://118.123.14.36:3000');



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
