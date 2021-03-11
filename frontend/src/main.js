import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import * as VueGoogleMaps from 'vue2-google-maps'
import './styles/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB00l9MonZLr7WMMVv1QPChmMo9WpTxpE8',
    libraries: 'places',
  },
})

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
