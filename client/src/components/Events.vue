<template>

    <v-container class="flex flex-column">

<v-row v-for="(cat,key) in listeEvents" :key="key" class=" grid grid-cols-12 grid-rows-6 mt-15">
<v-card class="grid grid-cols-12 w-full">
    <v-card-title   style="background-color:rgba(23, 86, 118, 0.3)">
  <v-row class="w-full grid grid-cols-12 ma-0"> 

   <v-col class=" col-start-1 col-end-3"> <v-icon> mdi-{{cat.icon }} </v-icon> </v-col>
    
    <v-col class=" col-start-3 col-end-12">  {{ cat.categorie }} </v-col>
    
    </v-row>
    </v-card-title>
<v-row class="mt-1"  style="background-color:rgba(23, 86, 118, 0.1)">
<v-col v-for="(evt,key) in cat.events" :key="key">

<v-card class="w-48 ma-5">
 <v-card-title><a :href="'/events/'+evt.id"> {{ evt.nom }}</a></v-card-title>
 <v-card-text> {{ evt.dateDebut | formatDate}} </v-card-text>


 <img :src="'data:image/jpeg;base64,'+evt.affiche" />
   
</v-card>


</v-col>
<v-row>
<v-card-actions>
<v-btn @click="voirCategorie(cat.id)">voir cette categorie</v-btn>
</v-card-actions>
</v-row>
</v-row>

 
</v-card>
</v-row>
    </v-container>
</template>

<script src="./Events.js"></script>
