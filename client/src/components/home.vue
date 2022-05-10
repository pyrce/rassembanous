<template>

    <v-container class="grid gap-y-10" style="height:120vh" :loginEvent="GetUser()">

        <!-- event to get new desktop info from child component -->
   <div class="flex">
  <v-row class="grid border-2  mt-10 col-start-3 col-end-6" >

<v-col class="grid col-start-3 col-end-6">

<v-row v-for="(evt,key) in listeCurrentEvent" :key="key" class="grid grid-cols-12 h-24 shadow-lg shadow-black-300">

<v-col class=" grid  grid-flow-row auto-rows-max col-start-1 cols-span-8 h-24">
 <span class="titre"> {{ evt.nom }} - {{ evt.lieu.nomLieu }}</span>
 <span>{{ evt.lieu.nomLieu }} </span>
<span>{{ evt.dateDebut | formatDate }} </span>

</v-col>

<v-col class=" grid col-start-10  col-span-2 grid-cols-2  h-24  ">
  
<v-btn class="" @click="seeMap(evt.id)"> <v-icon> mdi-map-marker </v-icon> </v-btn>
  
<v-btn class="" @click="gotoEvent(evt.id)"><v-icon> mdi-magnify </v-icon> </v-btn>
</v-col>

</v-row>

</v-col>

<v-col class="grid grid-cols-6">
 <l-map
   :center="center"
   :zoom="zoom"
   class="map grid col-start-1 col-end-6"
   ref="map"
   @update:zoom="zoomUpdated"
   @update:center="centerUpdated"
 >

   <l-tile-layer
     :url="url"
   >
   </l-tile-layer>

<v-row v-if="markers[0]">
<eventPlace
      v-for="marker in markers"
      :key="marker.id"
      :marker="marker"
>

</eventPlace>
</v-row>
   </l-map>
</v-col>
    </v-row>

    
</div>


  <v-row class="grid  grid-cols-12 h-24 ">
  <v-col class="flex justify-center ">
<v-btn @click="getAllevent()" class="grid col-start-5">  Voir tous les evenements</v-btn>
  </v-col>
</v-row>   


<v-row class=" h-48 flex flex-column align-center" style="background-color:rgba(222, 212, 190, 1)">

<v-row> <h4>Vous voulez devenir partenaire ?</h4> </v-row>
<v-row> <v-btn @click="becomePartner()">devenir partenaire</v-btn></v-row>

</v-row>


<div class="grid grid-cols-12">
<v-row class="border-2 border-red-100 pa-10 grid col-start-3" style="width:55vw;">

<v-row class="grid grid-cols-12 w-full">

<v-col class="grid col-start-1 col-end-6">
Email :
</v-col>
<v-col class="grid col-start-6 col-end-12">
  <v-text-field hide-details v-model="message.email" single-line type="email" :rules="[ v => !!v || 'Ce champs est requis']"/>
</v-col>
</v-row>


<v-row class="grid grid-cols-12 w-full">
<v-col class="grid col-start-1 col-end-6">
Objet :
</v-col>
<v-col class="grid col-start-1 col-end-6">
  <v-text-field hide-details v-model="message.objet" single-line type="text" :rules="[ v => !!v || 'Ce champs est requis']"/>
</v-col>
</v-row>



<v-row class="grid grid-cols-12 w-full">
Message :
</v-row>
<v-row class="grid grid-cols-12 w-full">
<v-textarea name="name" label="label" v-model="message.message" outline></v-textarea>
</v-row>

<v-row class="grid grid-cols-12 w-full">
<v-btn @click="sendMessage">Envoyer</v-btn>
</v-row>
  </v-row>

  </div>
    </v-container>
</template>

<script src="./home.js"></script>
<style >
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap');

 .map {
   position: relative;
   width: 60%;
   height: 25%;
   overflow :hidden
 }

  .vcc {
    height: 10vh;
    width: 20vw;
  }

</style>