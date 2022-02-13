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
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/events/:id',
            name:"event",
            component: event,
        },
        {
            path: '/ajoutevent',
            meta:{requiresAuth: true,role:1},
            component: ajout_event,
        },
        {
            path: '/partenaires',
       
            component: partenaires,
        },
        {
            path: '/partenaires/:id',
     
            component: partenaire,
        },
        {
            path: '/allevents/:type',

            component: events,
        },
        {
            path: '/login',

            component: login,
        },  
        {
            path: '/403',

            component: nonAuthorise,
        },  
    {
        path: '/profil',
        meta:{requiresAuth: true},
        component: profil,
    }, 
    {
        path: '/Signup',

        component: Signup,
    }, 
        {
            path: '/',

            component: home,
        },
        
    ]
})

router.beforeEach((to, from, next) => {
    const { requiresAuth,role } = to.meta;
    if (requiresAuth && !_.isEmpty(requiresAuth)) {
    const userToken=localStorage.user
    var base64Payload = userToken.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    let user=JSON.parse(payload.toString());
    console.log("user token")
console.log(user)
        if (!user) {
            // not logged in so redirect to login page with the return url
            return next({ path: "/login", query: { returnUrl: to.path } });
        }

        if ( user.role!=role ) {
            // role not authorised so redirect to home page
            return next({ path: "/" });
        }
    }
    next();
});
export default router;