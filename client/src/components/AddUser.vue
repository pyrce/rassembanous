<template>
     <v-dialog
        v-model="addUserDialogue"
        width="1200"
      >
  
 <v-card>
          <v-card-title class="text-h5 grey lighten-2 mb-5">
           Ajout utilisateur
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
<v-row class="grid col-start-1 col-span-5 w-42">
<v-col>Role </v-col>
<v-col>
          <v-select
            :items="roles"
            item-text="role"
            v-model="user.id_role"
            item-value="id"
            label="Select"
            persistent-hint
            single-line
          ></v-select>

</v-col>
</v-row>
<v-row>
<v-col> Mot de passe </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="mot de passe"
              outlined
              required
               type="password"
              v-model="user.password"
              :rules="[ v => !!v || 'Mot de passe est requis']"
            ></v-text-field></v-col>

     <v-col> Confirmation mot de passe </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="mot de passe"
              outlined
              required
               type="password"
              v-model="confirm_password"
              :rules="[ v => !!v || 'ce champ est requis']"
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
              @click="addUser()"
            >
         Ajouter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>



/* eslint-disable no-unused-vars */
import Axios from 'axios';

export default {
name:"AddUser",
props:['addUserDialog','roles'],
 data(){
 return{
     addUserDialogue:false,
          api:process.env.VUE_APP_BASE_URL,
     user:{token:null}
    }
 },
mounted(){

 this.init();
},
methods:{
            addUser(){
          let data={};
          data["nom"]=this.user.nom;
data["prenom"]=this.user.prenom;
data["login"]=this.user.login;
data["adresse"]=this.user.adresse;
data["email"]=this.user.email;
data["token"]=this.user.token;
data["password"]=this.user.password;
data["id_role"]=this.user.id_role;
Axios.post(this.api+"/admin/users/add",{data:data}).then( ({data})=>{
console.log('redraw')
  this.$emit("redraw")
})

        },   init(){
this.addUserDialogue=this.addUserDialog
    }
}
}
</script>
