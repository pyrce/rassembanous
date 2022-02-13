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

    }
 },
    created(){
this.initialize();
    },
    methods:{
        initialize(){
          
                            this.partenaires=[]
                  Axios.get("http://localhost:3500/partenaires").then(( {data} )=>{
         
console.log(data)
                    this.partenaires=data;
        
        })


        }
    }
};
