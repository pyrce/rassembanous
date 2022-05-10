<template>
  <v-container  class="grid grid-cols-11 grid-flow-row auto-rows-max" style="height:120vh">

<v-col class=" grid grid-cols-10 h-24 ma-10 col-start-1 col-end-6">

<v-row  class=" grid grid-cols-10 h-24 ma-10 col-start-1 col-end-10">
  <span class="titre h-12 w-full mb-10">Date et lieu</span>

<v-row v-if="dataEvent.estTermine==1">
Dernienre représentation le {{ dataEvent.event.dateDebut | formatDate }}

{{ dataEvent.event.lieu.nomLieu  }}
</v-row>

<v-row v-else>

<v-row v-if="dataEvent.estInscrit==1">
Vous êtes déjà inscrit

</v-row>

<v-row v-else>
  {{ dataEvent.event.lieu.nomLieu  }} à
  {{ dataEvent.event.dateDebut | formatDate }}
  <v-row class="grid-grid-cols-10 mt-10">
  <v-btn @click="inscription" class="mt-5">s'inscrire </v-btn>
  </v-row>
</v-row>
</v-row>
  {{ dataEvent.event.lieu.nomLieu }} - {{ dataEvent.event.lieu.adresse }}
</v-row>



<v-row class=" grid grid-cols-10 h-24 ma-10 col-start-1 col-end-10">
  <span class="titre h-12 w-full mb-10">Description</span>

<v-row >
 {{ dataEvent.event.description }}


</v-row>

</v-row>


<v-row class=" grid grid-cols-10 h-24 ma-10 col-start-1 col-end-10">
  <span class="titre h-12 w-full mb-10">Tarif</span>

<v-row >
Plein Tarif :  {{ dataEvent.event.prix }}€
</v-row>

</v-row>

</v-col>
<v-col class="grid grid-cols-10 ">

 <l-map
   :center="center"
   :zoom="zoom"
   class="map"
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


  </v-container>
</template>

<style scoped>
 .map {
   position: absolute;
   width: 40%;
   height: 20%;
   overflow :hidden
 }

</style>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="./event.js"></script>