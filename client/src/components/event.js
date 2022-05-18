/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import Axios from 'axios';
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import eventPlace from "./event_place.vue"
import Swal from 'sweetalert2'
//import _ from 'lodash';
export default {
name:"event",
components: {
    LMap,
    eventPlace,
    LTileLayer
  },
 data(){
 return{
    dataEvent:{},
     dialog:false,
     user:{},
     disabled:false,
     date: new Date().toISOString().substr(0, 10),
     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     center: [ 49.114910, 6.178810],
     api:process.env.VUE_APP_BASE_URL,
     zoom: 15,
    markers: [
        {id: 1, imageUrl: 'https://img.icons8.com/windows/32/000000/marker.png', coordinates: [  49.114910, 6.178810]},

      ]
    }
 },
    created(){
        console.log("composant events");
        
        const userToken = localStorage.user
            let user = JSON.parse(userToken);
            this.user=user
        this.initialize();

    },
    methods:{
       initialize(){
        console.log("begin init");
                            this.dataEvent=[]
                           let id= this.$route.params.id 
                  Axios.get(this.api+"/api/events/"+id).then( ( {data} )=>{
                this.dataEvent=data;
               
                     Axios.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+this.dataEvent.event.lieu).then(( {data} )=>{
            console.log("coords")
            
      let coords=[+data[0].lat,+data[0].lon]
               this.center=coords;
                this.markers[0].coordinates=coords
                
             
           });

        })

        console.log("end init");
        },
        inscription(){
            let id= this.$route.params.id 
            Axios.post(this.api+"/api/users/inscription",id).then(( {data} )=>{

              Swal.fire({
                title: '',
                text: 'Vous ête inscrit !',
                icon: 'success',
                confirmButtonText: 'ok'
              });
         this.initialize();

            
    
    })
        },
        
        zoomUpdated (zoom) {
            this.zoom = zoom;
            console.log(this.markers)
          },
          centerUpdated (center) {
            this.center = center;
          }
    }
};
