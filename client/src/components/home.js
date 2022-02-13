//const { defaults } = require("lodash");
import Axios from 'axios';
import router from '../routes';
//import _ from 'lodash';
export default {
name:"home",
 data(){
 return{
     listeCurrentEvent:[],
     lastEvents:[],
     dialog:false,
     disabled:false,
     date: new Date().toISOString().substr(0, 10),

    }
 },
    created(){
        console.log("composant home");
        
  
        this.initialize();
           
    },
    methods:{
        initialize(){
          
                            this.listeCurrentEvent=[]
                  Axios.get("http://localhost:3500/events",{params:{limit:5,offset:0}}).then(( {data} )=>{
                      console.log("data")
               console.log(typeof data);
                    this.listeCurrentEvent=data.currentEvents;
                    this.lastEvents=data.lastEvents;
        })


        },
        getEventRecent(){
            router.push('/allevents/recent')
        },
        getEventPasse(){
            router.push('/allevents/past')
        },
        gotoEvent(id){
            console.log(id)
            this.$router.push("/events/"+id);
        }
    }
};
