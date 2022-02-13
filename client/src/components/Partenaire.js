//const { defaults } = require("lodash");
import Axios from 'axios';
//import _ from 'lodash';
export default {
name:"partenaire",
 data(){
 return{
      partenaire:{},
      listevents:[],
     dialog:false,
     disabled:false,

    }
 },
    created(){
this.initialize();
    },
    methods:{
        initialize(){
          
                            this.partenaire=[]
                            let id= this.$route.params.id 
                  Axios.get("http://localhost:3500/partenaires/"+id).then(( {data} )=>{
         
                    this.partenaire=data.partenaire;
                    this.listevents=data.listEvents;
        
        })


        }
    }
};
