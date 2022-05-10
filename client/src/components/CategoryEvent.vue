<template>
    <v-container>

<v-row>
<v-col v-for="(evts,key) in listeEvents" :key="key" >

    <v-card class="w-1/5 h-86 bg bg-red-200">
<v-card-title>
{{evts.nom}}
</v-card-title>
    <v-card-content>

{{ evts.lieu.nomLieu }}<br>
Date de début : {{ evts.dateDebut | formatDate }} <br>
Date de fin : {{ evts.dateFin | formatDate }}

 <img :src="'/image/'+evts.affiche" class="w-72" />
    </v-card-content>
    </v-card>

</v-col>

</v-row>


    </v-container>
</template>

<script>
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
                    let catid=this.$route.params.id 
                  Axios.post("/allevent",{limit:this.itemParPage,id_categorie:catid,offset:offset}).then(( {data} )=>{

                    this.listeEvents=data.listEvents[0].events;
                   // this.total=data.total
                
                    this.nbPage= Math.round(this.total/this.itemParPage);
        })


        },

    }
};

</script>
