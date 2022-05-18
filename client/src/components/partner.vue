<template>
    
                <v-card class="elevation-12" >
      <v-toolbar dark color="primary">
        <v-toolbar-title> </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
           <v-form ref="form">
<v-row>
<v-col> Nom </v-col>
   <v-col>         <v-text-field
              name="titre"
              label="titre"
              outlined
              required
              v-model="user.nom"
              :rules="[ v => !!v || 'Nom est requis']"
            ></v-text-field></v-col>

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
              type="password"
              v-model="confirm_password"
              :rules="[ [v => !!v || 'ce champ est requis'],(user.password === confirm_password) || 'Les mots de passes ne correspondent pas']"
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
       </v-form>
      </v-card-text>
<v-card-actions>
  <div class="grid grid-cols-12"> 
<v-btn @click="register" class="grid col-start-10 col-span-3"> s'enregistrer</v-btn>
</div>
</v-card-actions>
                </v-card>
</template>


<script>
import Axios from 'axios';

export default {
name:"layout",
 data(){
 return{
user:{},
confirm_password:"",
showUser:false
    }

 },
    created(){

    },
methods:{
  register(){
     const result = this.$refs.form.validate();
     console.log(result)

     if(result){
let data={}
data["nom"]=this.user.nom;
data["prenom"]=this.user.prenom;
data["login"]=this.user.login;
data["password"]=this.user.password;
data["adresse"]=this.user.adresse;
data["email"]=this.user.email;


Axios.post("/api/users/partner",data).then(( )=>{

this.$router.push("/")
        })
     }
  }
},



}
</script>
