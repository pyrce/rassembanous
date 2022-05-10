/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import Axios from 'axios';


//import _ from 'lodash';
export default {
name:"event",
components: {

  },
 data(){
 return{
    dataEvent:{},
    partenaires:[],
     dialog:false,
     stand:{},
     api:process.env.VUE_APP_BASE_URL,
     disabled:false,
     date: new Date().toISOString().substr(0, 10),
    }
 },
    created(){
        console.log("composant events");
        
  
        this.initialize();

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
              text: 'prenom',
              value: 'prenom',
            },

            { text: 'stand', value: 'stand' },
          ]
        }
  },
    methods:{
       initialize(){
        console.log("begin init");
                            this.dataEvent=[]
                           let id= this.$route.params.id 
                  Axios.get(this.api+"/events/"+id).then( ( {data} )=>{
                this.dataEvent=data;
              

        })

        console.log("end init");
        },
        inscription(){
            let id= this.$route.params.id 
            Axios.post(this.api+"/events/inscription",id).then(( {data} )=>{
         this.initialize();

            console.log("ok")
    
    })
        },
        
        setStand (idEvent,partenaire) {
       
let idStand=this.dataEvent.listePartenaireEvent.filter(m=>m.id_user==partenaire);

          console.log("event : "+idEvent+", partenaire : "+partenaire+", stand : "+idStand[0].id_stand);
Axios.post(this.api+"/admin/partenaires",{idEvent:idEvent,idPartenaire:partenaire,idStand:idStand[0].id_stand}).then(()=>{
this.initialize();
})
          
          },
     
    }
};
