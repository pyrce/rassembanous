//const { defaults } = require("lodash");
/* eslint-disable no-unused-vars */
import Axios from 'axios';
//import _ from 'lodash';
export default {
name:"home",
 data(){
 return{
     listeEvents:[],
     dialog:false,
     disabled:false,
     itemParPage:15,
     nbPage:0,
     offset:0,
     total:0,
     api:process.env.VUE_APP_BASE_URL,
     page:1,
     date: new Date().toISOString().substr(0, 10),

    }
 },
    created(){
        
  
        this.getEvents();
           
    },
    methods:{
        getEvents(currentPage){
          
                            this.listeCurrentEvent=[]

                                    
                            let offset=this.itemParPage*currentPage-1;
                        this.page=currentPage
                  Axios.post(this.api+"/allevent",{limit:this.itemParPage,offset:offset}).then(( {data} )=>{

                    this.listeEvents=data.listEvents;
                   // this.total=data.total
                
                    this.nbPage= Math.round(this.total/this.itemParPage);
        })


        },
        voirCategorie(catId){
            this.$router.push("/events/category/"+catId)
        }
    }
};
