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
     itemParPage:1,
     nbPage:0,
     offset:0,
     total:0,
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
                            let type= this.$route.params.type
                                    
                            let offset=this.itemParPage*currentPage-1;
                            console.log("offset");
                            console.log(offset);
                        this.page=currentPage
                  Axios.post("http://localhost:3500/allevent",{limit:this.itemParPage,offset:offset,type:type}).then(( {data} )=>{

                    this.listeEvents=data.listEvents;
                    this.total=data.total
                
                    this.nbPage= Math.round(this.total/this.itemParPage);
        })


        }
    }
};
