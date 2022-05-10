<template>

    <v-container>

        <!-- event to get new desktop info from child component -->
   <v-btn @click="getEvents()"> get event </v-btn>
      <v-data-table
        :headers="headers"
        :items="listeEvents"
        item-key="id"
        class="elevation-1 w-full"
      >
        <template  #[`item.dateDebut`]="{ item }" >

{{ item.dateDebut | formatDate }}
        </template>

        <template  #[`item.dateFin`]="{ item }" >

{{ item.dateFin | formatDate }}
        </template>


        <template  #[`item.actions`]="{ item }" >

<v-btn @click="goTo(item.id)">voir </v-btn>

        </template>

      </v-data-table>

       

    </v-container>
</template>
    <script src="https://cdn.tailwindcss.com"></script>
<script>
//const { defaults } = require("lodash");
/* eslint-disable no-unused-vars */
import Axios from 'axios';
//import _ from 'lodash';
export default {
name:"MyEvents",
 data(){
 return{
     listeEvents:[],
     dialog:false,
     disabled:false,
     itemParPage:15,
     nbPage:0,
     offset:0,
     total:0,
     api:process.env.VUE_APP_BASE_URL,
     page:1,
     date: new Date().toISOString().substr(0, 10),

    }
 },
    created(){
        
  
        this.getEvents();
           
    },
    computed:{
        headers () {
            return [
              {
                text: 'nom',
                align: 'center',
                sortable: false,
                value: 'nom',
                 class:"tableHeader"
              },
              {
                text: 'Prix',
                value: 'prix',
                                align: 'center',
                                 class:"tableHeader"
              },
              { text: 'date debut', value: 'dateDebut',   align: 'center',                class:"tableHeader" },
              { text: 'date fin', value: 'dateFin'  ,  align: 'center' ,            class:"tableHeader" },
              { text: '', value: 'actions',   align: 'center',                 class:"tableHeader" },
            ]
          }
    },
    methods:{
        getEvents(currentPage){
          
                            this.listeCurrentEvent=[]

                                    
                            let offset=this.itemParPage*currentPage-1;
                        this.page=currentPage
                    
                  Axios.get(this.api+"/events",{limit:this.itemParPage,offset:offset}).then(( {data} )=>{

                    this.listeEvents=data.currentEvents;
                    this.total=data.total
                
                    this.nbPage= Math.round(this.total/this.itemParPage);
        })


        },
        goTo(id){
          this.$router.push("/events/"+id);
        },
        handleEvent(id){
this.$router.push("/myevents/"+id);
        }
    }
};

</script>
