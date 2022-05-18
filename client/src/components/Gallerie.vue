<template>
    
  <v-container fuild class="gap-y-3 bg-yellow-200 "  >

<v-row class="h-16 border-3 border-blue-500" style="width:100vw">

<v-text-field 
hide-details name="dateDebut" 
v-model="search" 
style="width:50vw;"
single-line type="text"  
/>

</v-row>

<v-row class="grid grid-cols-10   border-3 border-red-200">

<v-col v-for="(g,key) in galleries" :key="key" class="grid grid-cols-1 border-3 border-blue-500">

<v-card class="">
    <v-card-title class="text-center">
      <v-col>  <h5>{{g.event.nom}}</h5>
      </v-col>
      <v-col>
<v-btn v-if="user.id_role==1" @click="deleteImage(g.id)">
<v-icon>
mdi-trash-can
</v-icon>
</v-btn>
      </v-col>
    </v-card-title>
      <v-card-subtitle>   {{ g.image.split(".")[0] }} </v-card-subtitle>
<img :src="'/image/'+g.image" class="w-full" width="10vw"/>

</v-card>
    


</v-col>

</v-row>

  </v-container>

</template>


<script>
/* eslint-disable no-unused-vars */
//const { defaults } = require("lodash");
import Axios from 'axios';
//import _ from 'lodash';
export default {
name:"gallerie",
 data(){
 return{
      galleries:[],
       itemParPage:15,
     nbPage:0,
     user:{},
     offset:0,
     total:0,
     page:1,
     search:"",
          api:process.env.VUE_APP_BASE_URL,
    }
 },
 created(){
this.init()
 },
        methods:{
            init(currentPage=1){
               this.page=currentPage >0 ? currentPage:1;
                       let offset=this.itemParPage*(this.page-1);
                       
                Axios.post(this.api+"/galleries",{limit:this.itemParPage,offset:offset,search:this.search}).then(({data} )=>{

                    this.galleries=data.gallerie;
                    this.total=data.total
                  this.user=data.user
                    this.nbPage= Math.round(this.total/this.itemParPage);
                })
            },
            deleteImage(id){

              Axios.delete(this.api+"/galleries",{id:id}).then(({data} )=>{
                  this.init()
                })


            }
        },
            watch:{
      search:function (currentPage) {
        this.init(currentPage);
      }
    }

  
}

</script>
