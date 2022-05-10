//const { defaults } = require("lodash");
/* eslint-disable no-unused-vars */
import Axios from 'axios';
//import _ from 'lodash';
import Swal from 'sweetalert2'
export default {
name:"partenaire",
 data(){
 return{
      partenaire:{},
      isFollowed:false,
      listevents:[],
     dialog:false,
     api:process.env.VUE_APP_BASE_URL,
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
                  Axios.get(this.api+"/partenaires/"+id).then(( {data} )=>{
         
                    this.partenaire=data.partenaire;
                    this.listevents=data.listEvents;
                    this.isFollowed=data.isFollowed;
        
        })


        }
        ,
        suivrePart(id){
            Axios.post(this.api+"/partenaires/follow",id).then(( {data} )=>{
                if(data.msg!="KO"){
                console.log("init")
         this.initialize();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Vous devez être connecté!',
                      })
                }
    
    })
        }
    }
};
