<template>
<v-container>

    <v-row>
 <v-col>  {{ questionnaire.libelle }} - {{ questionnaire.questionnaire.nom }} </v-col>
<v-col> <v-btn @click="()=>{ this.$router.push('/questions') }" > retour </v-btn>  </v-col>
   </v-row>

      <v-data-table
        :headers="headers"
        :items="questionnaire.questions"
        item-key="id"
        class="elevation-1 w-full"
      >
        <template  #[`item.totalUser`]="{ item }" >

{{ item.users.length }}
        </template>
        <template  #[`item.total`]="{ item }" >

{{ getRating(item.users) }}

      <v-rating
        v-model="rating"
        half-increments
      ></v-rating>

        </template>



      </v-data-table>

 

</v-container>
</template>

<script>
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
    questionnaire:{},
    rating:0,
         api:process.env.VUE_APP_BASE_URL,
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
              text: 'question',
              align: 'center',
              sortable: false,
              value: 'question',
                            class:"tableHeader"
            },
         {
              text: "Nombre de réponse",
              value: 'totalUser',
              align: 'center',
                            class:"tableHeader"
            },
            {
              text: 'Rating',
              value: 'total',
              align: 'center',
                            class:"tableHeader"
            },
 
     
          ]
        }
  },
    methods:{
       initialize(){
        console.log("begin init");
                            this.dataEvent=[]
                           let id= this.$route.params.id 
                  Axios.post(this.api+"/questions/"+id).then( ( {data} )=>{
                this.questionnaire=data;
              

        })

        console.log("end init");
        },
getRating(users){

let somme=0
users.forEach(element => {
    somme+=element.stars
});
somme/=users.length
this.rating=somme
}
        
    }
};

</script>
