/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import axios from 'axios';
//import _ from 'lodash';


export default {
name:"ajout_event",
  data: () => ({
     event:{
       isPublic:1,
      description:""
     },
     select:{},
     calid:false,
     api:process.env.VUE_APP_BASE_URL,
     file:undefined,
     partenaires:[],
     categories:[],
     lieus:[],
     search:"",
     liste:[],
 }),created(){
this.getListCategories();
this.getListLieus();
 },
    methods:{
        getListePartenaires(val){
          
          axios.get(this.api+"/api/partenaires/list",{params:{s:val}}).then(data=>{

    this.partenaires=data.data;
})  
        },getListCategories(){
          axios.get(this.api+"/api/categories").then(data=>{

    this.categories=data.data;
})  
        },getListLieus(){
          axios.get(this.api+"/api/lieu").then(data=>{

    this.lieus=data.data;
})  
        },
         submit() {
         //    this.$refs.form.validate();
          
            let event = {}

            event["nom"] = this.event.nom
            event["dateDebut"] =  this.event.dateDebut
            event["dateFin"] =  this.event.dateFin
            event["nbPlace"] =  this.event.nbPlace
            event["prix"] =  this.event.prix
            event["id_lieu"] =  this.event.id_lieu
            event["id_categorie"] =  this.event.id_categorie
            event["dateLimit"] =  this.event.dateLimit
            event["isPublic"] =  this.event.isPublic
            event["description"] =  this.event.description
            event["partenaires"] = this.partenaires;
            event["affiche"] = JSON.stringify(this.event.affiche)
           

// const fd=new FormData();
// fd.append("nom",this.event.nom);
// fd.append("dateDebut",this.event.dateDebut);
// fd.append("dateFin",this.event.dateFin);
// fd.append("nbPlace",this.event.nbPlace);
// fd.append("prix",this.event.prix);
// fd.append("lieu",this.event.lieu);
// fd.append("dateLimit",this.event.dateLimit);
// fd.append("isPublic",this.event.isPublic);
// fd.append("description",this.event.description);
// fd.append("partenaires",this.event.partenaires);
//fd.append("affiche",this.event.affiche,this.event.affiche.name);



            axios.post(this.api+"/api/events",event,{ headers: {
              'content-type': 'application/json'
            }}) .then(msg=>{
               this.$router.push("/")
            })


          },
          handleFileUpload(){
            console.log("file change")
      console.log(this.$refs.file.files)
            this.file =this.$refs.file.files

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
