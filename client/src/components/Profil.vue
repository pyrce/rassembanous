<template>
    
                <v-card class="elevation-12" >
      <v-toolbar dark color="primary">
        <v-toolbar-title> </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
<v-row>
<v-col> Nom </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="user.nom"
              :rules="[ v => !!v || 'Nom est requis']"
            ></v-text-field>
         
            </v-col>

     <v-col> Prenom </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="user.prenom"
              :rules="[ v => !!v || 'Prenom est requis']"
            ></v-text-field></v-col>       
    </v-row>

    <v-row>
<v-col> login </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="user.login"
              :rules="[ v => !!v || 'login est requis']"
            ></v-text-field></v-col>

     <v-col> email </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="user.email"
              :rules="[ v => !!v || 'email est requis']"
            ></v-text-field></v-col>       
    </v-row>

<v-row>
<v-col> Mot de passe </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              type="password"
              v-model="user.password"
              :rules="[ v => !!v || 'Mot de passe est requis']"
            ></v-text-field></v-col>

     <v-col> Confirmation mot de passe </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="confirm_password"
              :rules="[ v => !!v || 'Titre est requis']"
            ></v-text-field></v-col>       
    </v-row>

    <v-row class="grid grid-cols-12" >
     <v-col class="grid col-start-1 col-span-2"> Adresse </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              class="grid col-start-2 col-span-10"
              outlined
              required
              v-model="user.adresse"
              :rules="[ v => !!v || 'Adresse est requis']"
            ></v-text-field></v-col> 
    </v-row>
      </v-card-text>

                </v-card>
</template>

<script>
import Axios from 'axios';

export default {
name:"layout",
 data(){
 return{
user:{},
     api:process.env.VUE_APP_BASE_URL,
showUser:true
    }

 },
    created(){
      this.getUser();
    },
methods:{
  getUser(){

Axios.get(this.api+"/user/profil").then(( {data} )=>{
console.log(data)
         if(!data.msg){
this.user=data
         }else{
       
       this.$router.push("/403")
         }

        })
  }
},



}
</script>
