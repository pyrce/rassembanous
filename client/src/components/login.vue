<template>
    
 <v-card>
    <v-card-title>
      <v-row> 
 Login 

        </v-row>
    </v-card-title>
    <v-card-text>

      <v-row>
<v-col>Login</v-col>
<v-col>            <v-text-field
              name="login"
              label="titre"
              outlined
              required
              v-model="login"
              :rules="[ v => !!v || 'Login est requis']"
            ></v-text-field></v-col>
      </v-row>

            <v-row>
<v-col>Mot de passe</v-col>
<v-col>            <v-text-field
              name="password"
              label="titre"
              outlined
              required
              v-model="password"
              :rules="[ v => !!v || 'mot de passe est requis']"
            ></v-text-field></v-col>
      </v-row>
    </v-card-text>
          <v-card-actions>
        <v-btn @click="connect">Validate</v-btn>
      </v-card-actions>
</v-card>

</template>
<script>
import Axios from 'axios';
/* eslint-disable no-unused-vars */
export default ({
name:"login",
 data(){
 return{
login:"",
password:""

    }
 },
 methods:{
     connect(){
         Axios.post("http://localhost:3500/identifier",{login:this.login,password:this.password}).then( ({data})=>{
         
          localStorage.user=data.token
              this.$router.push('/')
         } )
     }
 }
})
</script>
