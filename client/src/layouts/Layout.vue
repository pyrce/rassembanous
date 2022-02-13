<template>

  <v-app>
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"/>
    <v-main class="bg-tea-400">
      <v-container fluid>
    
   <div class="h-32 grid grid-cols-1 lg:grid-cols-12" id="header" >

<div class="h-8 grid border-2 border-rose-600 gap-32 grid-cols-1 lg:grid-cols-11 col-start-1 col-end-11">
                  
                     <router-link class="w-24 nav" to="/"><i class="fas fa-home"></i> Home</router-link> 
    <router-link class="w-32 nav" to="/partenaires"><i class="far fa-newspaper"></i> Partenaires</router-link>
    
        <router-link v-if="user.role==1" class="w-48 nav" to="/ajoutevent"><i class="fas fa-plus-circle"></i> Ajout evenement</router-link>

</div>

<div v-if="showUser==true" class="bg-red-200 h-8 rounded-lg">
<a  @click="profil(user.id)">  {{ user.nom }}</a>
  </div>

  <div v-else>
    <v-btn @click="login">Login</v-btn>
        <v-btn @click="signup">s'inscrire</v-btn>
  </div>
</div>
   <router-view></router-view>
   
      </v-container>
      
    </v-main>
  </v-app>
</template>
<style scoped>
#header{

background-image: url("/image/header.jpg");
background-position: 35% 80%;
background-size: 25%;
background-repeat: space;
}

.nav{
color:white;
}

.v-btn {
  background-color: #F50756;
}
</style>


<script>
import Axios from 'axios';

export default {
name:"layout",
 data(){
 return{
user:{},
showUser:false
    }

 },
    created(){
      this.getUser();
    },
methods:{
  getUser(){
Axios.post("http://localhost:3500/users").then(( {data} )=>{

console.log("user connecte")
console.log(data)
         if(!data.msg){
this.user=data
this.showUser=true
         }else{
           console.log("user not found")
         }

        })
  },
  login(){
  this.$router.push("/login");
},
signup(){
    this.$router.push("/signup");
},
profil(){
      this.$router.push("/profil");
}
},



}
</script>
