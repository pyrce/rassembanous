<template>

    <v-container>

        <!-- event to get new desktop info from child component -->
   
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


        </template>

      </v-data-table>

       

    </v-container>
</template>

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
                align: 'start',
                sortable: false,
                value: 'nom',
              },
              {
                text: 'Prix',
                value: 'prix',
              },
              { text: 'date debut', value: 'dateDebut' },
              { text: 'date fin', value: 'dateFin' },
              { text: '', value: 'actions' },
            ]
          }
    },
    methods:{
        getEvents(currentPage){
          
                            this.listeCurrentEvent=[]

                                    
                            let offset=this.itemParPage*currentPage-1;
                        this.page=currentPage
                    
                  Axios.post("/events",{id:user.userId,limit:this.itemParPage,offset:offset}).then(( {data} )=>{

                    this.listeEvents=data.listEvents;
                    this.total=data.total
                
                    this.nbPage= Math.round(this.total/this.itemParPage);
        })


        },
        handleEvent(id){
this.$router.push("/myevents/"+id);
        }
    }
};

</script>
