//const { defaults } = require("lodash");
/* eslint-disable no-unused-vars */
import Axios from 'axios';
//import _ from 'lodash';
export default {
name:"MyEvents",
 data(){
 return{
     listeEvents:[],
     dialog:false,
     disabled:false,
     itemParPage:15,
     nbPage:0,
     offset:0,
     total:0,
     page:1,
     api:process.env.VUE_APP_BASE_URL,
     date: new Date().toISOString().substr(0, 10),

    }
 },
    created(){
        
  
        this.getEvents();
           
    },
    computed:{
        headers () {
            return [
              {
                text: 'nom',
                align: 'start',
                sortable: false,
                value: 'nom',
              },
              {
                text: 'Prix',
                value: 'prix',
              },
              { text: 'date debut', value: 'dateDebut' },
              { text: 'date fin', value: 'dateFin' },
              { text: '', value: 'actions' },
            ]
          }
    },
    methods:{
        getEvents(currentPage){
          
                            this.listeCurrentEvent=[]

                                    
                            let offset=this.itemParPage*currentPage-1;
                        this.page=currentPage
                        const userToken=localStorage.user
                        let user=JSON.parse(userToken);
                  Axios.post(this.api+"/api/partenaires/events",{id:user.userId,limit:this.itemParPage,offset:offset}).then(( {data} )=>{

                    this.listeEvents=data.listEvents;
                    this.total=data.total
                
                    this.nbPage= Math.round(this.total/this.itemParPage);
        })
console.log("events")

        },
        handleEvent(id){
this.$router.push("/myevents/"+id);
        }
    }
};
