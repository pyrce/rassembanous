import Vue from 'vue';
import Vuetify from 'vuetify';
import Routes from './routes.js';
import Layout from './layouts/Layout.vue';
import 'vuetify/dist/vuetify.min.css';
import moment from 'moment'


Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
  })

// Vue config
Vue.use(Vuetify);

// Main component
new Vue({
  el: '#app',
  vuetify: new Vuetify({}),
  router: Routes,
  render: h => h(Layout)
});