import Vue from 'vue'
import Vuetify from 'vuetify';
import router from './routes';
import 'vuetify/dist/vuetify.min.css';
import Layout from './layouts/Layout.vue';

Vue.config.productionTip = false
Vue.use(Vuetify);

import moment from 'moment'
import './assets/tailwind.css'


Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
  })

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    router: router,
    render: h => h(Layout)
})

export default new Vuetify(app);