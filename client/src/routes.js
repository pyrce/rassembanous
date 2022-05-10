/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';
//import Dashboard from './views/Dashboard.vue';
import home from './components/home.vue';
import _ from "lodash";
import events from "./components/Events.vue";
import event from "./components/Event.vue";
import ajout_event from "./components/ajout_event.vue";
import partenaires from "./components/Partenaires.vue";
import partenaire from "./components/Partenaire.vue";
import login from "./components/login.vue";
import nonAuthorise from "./components/403.vue";
import Signup from "./components/Signup.vue";
import profil from "./components/Profil.vue";
import Admin from "./components/Admin.vue";
import Gallerie from "./components/Gallerie.vue";
import Partner from "./components/partner.vue";
import MyEvents from "./components/MyEvents.vue";
import MyEvent from "./components/MyEvent.vue"
import categoryEvent from "./components/CategoryEvent.vue"
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/events/:id',
            name: "event",
            component: event,
            meta: { requiresAuth: false },
        },
        {
            path: '/ajoutevent',
            meta: { requiresAuth: true, role: [1, 3] },
            component: ajout_event,
        },
        {
            path: '/partenaires',
            meta: { requiresAuth: false },
            component: partenaires,
        },
        {
            path: '/partenaires/:id',
            meta: { requiresAuth: false },
            component: partenaire,
        },
        {
            path: '/allevents',
            meta: { requiresAuth: false },
            component: events,
        },
        {
            path: '/events/category/:id',
            meta: { requiresAuth: false },
            component: categoryEvent,
        },
        {
            path: '/login',
            meta: { requiresAuth: false },
            component: login,
        }, {
            path: '/gallerie',
            meta: { requiresAuth: false },
            component: Gallerie,
        },
        {
            path: '/403',
            meta: { requiresAuth: false },
            component: nonAuthorise,
        },
        {
            path: '/profil/:id',
            meta: { requiresAuth: true,role:[1,2,3] },
            component: profil,
        },
        {
            path: '/Signup',
            meta: { requiresAuth: false },
            component: Signup,
        }, 
        {
            path: '/admin',
            meta: { requiresAuth: true, role: [1] },
            component: Admin,
        },
        {
            path: '/partner',
            // meta:{requiresAuth: true,role:1},
            component: Partner,
        },
        {
            path: '/',
            meta: { requiresAuth: false },
            component: home,
        },
        {
            path: '/MyEvents',
            meta: { requiresAuth: true, role: [3] },
            component: MyEvents,
        },
        {
            path: '/MyEvents/:id',
            meta: { requiresAuth: true, role: [3] },
            component: MyEvent,
        },

    ]
})

router.beforeEach((to, from, next) => {
    const { requiresAuth, role } = to.meta;

    if (requiresAuth == true) {

        const userToken = localStorage.user

        if (userToken != "undefined") {

            let user = JSON.parse(userToken);

            if (!user) {
                // not logged in so redirect to login page with the return url
                return next({ path: "/login", query: { returnUrl: to.path } });
            }

            if (user.role && role.indexOf(user.role) < 0) {
                // role not authorised so redirect to home page
                return next({ path: "/403" });
            }

        } else {
            return next({ path: "/" });
        }


    }
    next();
});
export default router;