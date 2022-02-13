/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import Axios from 'axios';
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import eventPlace from "./event_place.vue"
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
     disabled:false,
     date: new Date().toISOString().substr(0, 10),
     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     center: [ 49.114910, 6.178810],
     zoom: 15,
    markers: [
        {id: 1, imageUrl: 'https://img.icons8.com/windows/32/000000/marker.png', coordinates: [  49.114910, 6.178810]},

      ]
    }
 },
    created(){
        console.log("composant events");
        
  
        this.initialize();

    },
    methods:{
       initialize(){
        console.log("begin init");
                            this.dataEvent=[]
                           let id= this.$route.params.id 
                  Axios.get("http://localhost:3500/events/"+id).then( ( {data} )=>{
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
            Axios.post("/events/inscription",id).then(( {data} )=>{
         this.initialize();

            console.log("ok")
    
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
