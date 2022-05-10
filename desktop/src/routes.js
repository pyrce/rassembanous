import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from './views/HelloWorld.vue'
import partenaires from './views/partenaires.vue'
import event from './views/Event.vue'
import questions from './views/Questionnaire.vue'
import detailquestion from './views/DetailQuestion.vue'
import { authenticationService } from './_services/authentication.service';
import _ from 'lodash';
Vue.use(VueRouter);
const routes = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld,
      meta: { }
    },
    {
        path: '/partenaires',
        component: partenaires,
        meta: { }
      },
      {
        path: '/questions',
        component: questions,
        meta: { }
      },
      {
        path: '/questions/:id',
        component: detailquestion,
        meta: { }
      },
      {
        path: '/events/:id',
        component: event,
        meta: { }
      },
  ]
});


routes.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;

  if (authorize && !_.isEmpty(authorize)) {
    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }
    // // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role.role)) {
      //   // role not authorised so redirect to home page
      return next('/profil');
    } else {
      return next();
    }

  }

  return next();
});

export default routes;