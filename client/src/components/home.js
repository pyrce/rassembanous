//const { defaults } = require("lodash");
/* eslint-disable no-unused-vars */
import Axios from 'axios';
import router from '../routes';
//import _ from 'lodash';
import { VueCardCarousel } from "vue-card-carousel";
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import eventPlace from "./event_place.vue"
import Swal from 'sweetalert2'
import  Layout from "../layouts/Layout.js"
export default {
name:"home",
components: {
    VueCardCarousel,   
     LMap,
    eventPlace,
    LTileLayer
  },
 data(){
 return{
     listeCurrentEvent:[],
     lastEvents:[],
     dialog:false,
     monted:false,
     message:{},
     disabled:false,
     showUser:false,
     user:{},
          api:process.env.VUE_APP_BASE_URL,
     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     center: [ 49.114910, 6.178810],
     zoom: 15,
    markers: [
        {id: 1, imageUrl: 'https://img.icons8.com/windows/32/000000/marker.png', coordinates: [  49.114910, 6.178810]},

      ],
     headerOpt: { isVisible: true, backgroundColor: "green" },
     footerOpt: { isVisible: false },
     date: new Date().toISOString().substr(0, 10),

    }
 },
    created(){
        console.log("composant home");
        console.log(Layout)
  
     //   this.initialize();

           
    },
    mounted(){
        this.initialize();
    },
    methods:{
        initialize(){
          
                            this.listeCurrentEvent=[]
                  Axios.get(this.api+"/api/events",{params:{limit:6,offset:0}}).then(( {data} )=>{
                      console.log("data")
         
                    this.listeCurrentEvent=data.currentEvents;
           
        })


        },
        becomePartner(){
            this.$router.push("/partner");
        },GetUser(){
    
            console.log("get user event")
            Layout.methods.getUser();
                
        },
        loadEvent(){
                this.monted=true
                this.getUser();
        },
        seeMap(id){
            let evt=this.listeCurrentEvent.filter( ( item )=>
            item.id==id
       
        )[0]

        Axios.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+evt.lieu).then(( {data} )=>{
            console.log("coords")
    
            if(data[0]){
      let coords=[+data[0].lat,+data[0].lon]
      
               this.center=coords;
                this.markers[0].coordinates=coords
                this.centerUpdated(this.center)
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Impossible de trouvez cette adresse',
                    icon: 'error',
                    confirmButtonText: 'ok'
                  })
            }
           });

        },
        zoomUpdated (zoom) {
            this.zoom = zoom;
            console.log(this.markers)
          },
          centerUpdated (center) {
            this.center = center;
          },
        getAllevent(){
            router.push('/allevents/')
        },
        sendMessage(){
            let data={}
                data["email"]=this.message.email;
                data["objet"]=this.message.objet;
                data["message"]=this.message.message;

                Axios.post(this.api+"/api/contact",data).then(( {data} )=>{
                        this.message={};
         
      })
            },
     gotoEvent(id){
            console.log(id)
            this.$router.push("/events/"+id);
        },
        },
   
    
};
