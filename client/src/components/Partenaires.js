//const { defaults } = require("lodash");
import Axios from 'axios';
//import _ from 'lodash';
export default {
name:"partenaires",
 data(){
 return{
      partenaires:[],
     dialog:false,
     disabled:false,
     api:process.env.VUE_APP_BASE_URL,
    }
 },
    created(){
this.initialize();
    },
    methods:{
        initialize(){
          
                            this.partenaires=[]
                  Axios.get(this.api+"/api/partenaires").then(( {data} )=>{
         
                    this.partenaires=data;
        
        })


        },
        voirPart(id){
            this.$router.push("/partenaires/"+id)
        }
    }
};
