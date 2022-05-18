<template>
    <v-container  class="grid grid-cols-12  h-45">
 <v-card class="elevation-12 h-45 w-full grid col-start-3 col-end-10">
  <v-card-title  class="titles justify-center">
 
 Login 

      
    </v-card-title>
    <v-card-text class="mt-3 formulaire">

      <v-row>
<v-col>Login</v-col>
<v-col>            <v-text-field
              name="login"
              label="login"
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
              label="mot de passe"
              outlined
              type="password"
              required
              v-model="password"
              :rules="[ v => !!v || 'mot de passe est requis']"
            ></v-text-field></v-col>
      </v-row>

                <v-card-actions class="grid grid-cols-12">
        <v-btn @click="connect" class="grid col-start-10">Validate</v-btn>
      </v-card-actions>
        <div class="msg" ref="msg"></div>
    </v-card-text>

    
</v-card>
    </v-container>
</template>

<script src="http//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
import Axios from 'axios';
/* eslint-disable no-unused-vars */
export default ({
name:"login",
 data(){
 return{
login:"",
password:"",
     api:process.env.VUE_APP_BASE_URL,
    }
 },
 methods:{
     connect(){
         Axios.post(this.api+"/api/identifier",{login:this.login,password:this.password}).then( ({data})=>{
         
         if(data.msg!="KO"){
          localStorage.user=data.token
this.$emit("loginEvent");
              this.$router.push('/')
         }else{
  
      Swal.fire({
        title: 'Error!',
        text: 'utilisateur non trouvé',
        icon: 'error',
        confirmButtonText: 'ok'
      })

         
         }
         } )
     }
 }
})
</script>
