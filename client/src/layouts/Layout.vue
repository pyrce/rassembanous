<template>

  <v-app>
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"/>
          <link
      href="./layout.css"
      rel="stylesheet"/>
      <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <v-main >
      <v-container fluid style="padding:0;">
    
   <div class="h-32 grid grid-cols-12" id="headers" >

<v-col id="nav" class=" grid grid-flow-col auto-cols-max gap-x-10 col-start-2 col-span-8">
                  
                     <router-link class=" nav" to="/"><i class="fas fa-home"></i> Home</router-link> 
                       <router-link class=" nav" to="/about"><i class="fas fa-home"></i> Qui somme nous</router-link> 
    <router-link class=" nav" to="/partenaires"><i class="far fa-newspaper"></i> Partenaires</router-link>
    
        <router-link v-if="user.id_role && user.id_role!=2" class=" nav" to="/ajoutevent"><i class="fas fa-plus-circle"></i> Ajout evenement</router-link>

         <router-link class=" nav" to="/gallerie"><i class="fas fa-plus-circle"></i> Gallerie</router-link>
<router-link v-if="user.id_role==1" class=" nav" to="/admin"><i class="fas fa-plus-circle"></i> Admin</router-link>
<router-link v-if="user.id_role==3" class=" nav" to="/MyEvents"><i class="fas fa-plus-circle"></i> Mes events</router-link>

</v-col>

<v-col class="h-24 grid grid-cols-2 gap-2 col-start-10 col-span-4">

<v-col v-if="showUser==true" id="login" class="grid h-12 grid-cols-2 rounded-lg">

   <v-icon @click="logout"> mdi-power-standby </v-icon>
<a  @click="profil(user.id)" class="">  {{ user.nom+' '+user.prenom }}</a>
  </v-col>

  <div v-else class="h-8 grid grid-cols-4 col-start-8 col-span-4 ">
    

<a href="#" @click="login">Login</a> 


<a href="#" @click="signup">s'inscrire</a>

       
  </div>

</v-col>

</div>

<div  class="h-48 grid grid-cols-12" id="header">

</div>
   <router-view ></router-view>
   
      </v-container>
      
    </v-main>
  </v-app>
</template>
<style scoped>

</style>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="./Layout.js">

</script>
