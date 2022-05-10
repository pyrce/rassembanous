<template>
     <v-dialog
        v-model="editUser"
        width="1200"
      >
  
 <v-card>
          <v-card-title class="text-h5 grey lighten-2 mb-5">
            Modifier utilisateur
          </v-card-title>
  
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


     <v-row class="grid col-start-1 col-span-2"> Adresse </v-row>
   <v-row>         <v-text-field
              name="titre"
              label="titre"
              class="grid col-start-2 col-span-10"
              outlined
              required
              v-model="user.adresse"
              :rules="[ v => !!v || 'Adresse est requis']"
            ></v-text-field></v-row> 

          
          
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="updateUser(user.id)"
            >
             Mettre a jour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>

/* eslint-disable no-unused-vars */
import Axios from 'axios';

export default {
name:"ModifUser",
props:['user','editDialog'],
 data(){
 return{
     editUser:false,
          api:process.env.VUE_APP_BASE_URL,
    }
 },
mounted(){

 this.init();
},
methods:{
            updateUser(id){
          let data={};
          data["nom"]=this.user.nom;
data["prenom"]=this.user.prenom;
data["login"]=this.user.login;
data["adresse"]=this.user.adresse;
data["email"]=this.user.email;

Axios.put(this.api+"/admin/users",{id:id,data:data}).then( ({data})=>{
console.log('redraw')
  this.$emit("redraw")
})

        },   init(){
this.editUser=this.editDialog
    }
}
}
</script>
