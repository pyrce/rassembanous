/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import axios from 'axios';
//import _ from 'lodash';


export default {
name:"ajout_event",
  data: () => ({
     event:{
       isPublic:0
     },
     partenaires:[],
     search:"",
     liste:[],
     headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    }
 }),
    methods:{
        getListePartenaires(val){
          
          axios.get("http://localhost:3500/partenaires/list",{params:{s:val}}).then(data=>{

    this.partenaires=data.data;
})  
        },
        async submit() {
            const result = await this.$refs.form.validate();
            console.log(result)
            let event = {}

            event["nom"] = this.event.nom
            event["dateDebut"] =  this.event.dateDebut
            event["dateFin"] =  this.event.dateFin
            event["nbPlace"] =  this.event.nbPlace
            event["prix"] =  this.event.prix
            event["lieu"] =  this.event.lieu
            event["dateLimit"] =  this.event.dateLimit
            event["isPublic"] =  this.event.isPublic
            event["description"] =  this.event.description
            event["partenaires"] = this.partenaires;

            axios.post("http://localhost:3500/events",event).then(msg=>{
                console.log("add")
            })
          }
    },
    watch: {
        search: {
          deep: true,
          handler(val) {
           
            this.getListePartenaires(val)
          }
        }
      }
};
