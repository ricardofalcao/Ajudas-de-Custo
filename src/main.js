import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

Vue.config.productionTip = false

axios.get(process.env.BASE_URL + 'config.json').then(response => {
  Vue.prototype.$config = response.data;

  new Vue({
    render: h => h(App),
  }).$mount('#app')
});
