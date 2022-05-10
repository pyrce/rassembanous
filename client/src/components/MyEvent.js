/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import Axios from 'axios';

//import _ from 'lodash';
export default {
name:"event",
 data(){
 return{
    dataEvent:{},
    categories:[],
     dialog:false,
     disabled:false,
     api:process.env.VUE_APP_BASE_URL,
     date: new Date().toISOString().substr(0, 10),

    }
 },
    created(){

  
        this.initialize();

    },
    methods:{
       initialize(){
        console.log("begin init");
                            this.dataEvent=[]
                           let id= this.$route.params.id 
                  Axios.post(this.api+"/partenaires/events/get",{id:id}).then( ( {data} )=>{
                this.dataEvent=data.event;
                this.categories=data.categories

        })

        console.log("end init");
        },submit() {
            //    this.$refs.form.validate();
             
               let event = {}
   
               event["nom"] = this.dataEvent.nom
               event["dateDebut"] =  this.dataEvent.dateDebut
               event["dateFin"] =  this.dataEvent.dateFin
               event["nbPlace"] =  this.dataEvent.nbPlace
               event["prix"] =  this.dataEvent.prix
               event["lieu"] =  this.dataEvent.lieu
               event["dateLimit"] =  this.dataEvent.dateLimit
               event["isPublic"] =  this.dataEvent.isPublic
               event["description"] =  this.dataEvent.description
               event["partenaires"] = this.partenaires;
               event["affiche"] = JSON.stringify(this.dataEvent.affiche)
              
   
//    const fd=new FormData();
//    fd.append("nom",this.event.nom);
//    fd.append("dateDebut",this.event.dateDebut);
//    fd.append("dateFin",this.event.dateFin);
//    fd.append("nbPlace",this.event.nbPlace);
//    fd.append("prix",this.event.prix);
//    fd.append("lieu",this.event.lieu);
//    fd.append("dateLimit",this.event.dateLimit);
//    fd.append("isPublic",this.event.isPublic);
//    fd.append("description",this.event.description);
//    fd.append("partenaires",this.event.partenaires);
//    fd.append("affiche",this.event.affiche,this.event.affiche.name);
   
   
   
Axios.post(this.api+"/events/"+this.dataEvent.id,{event:event,id:this.dataEvent.id},{ headers: {
                 'content-type': 'application/json'
               }}) .then(msg=>{
                  this.$router.push("/MyEvents");
               })
   
   
             },

    }
};
